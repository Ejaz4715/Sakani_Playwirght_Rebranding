import { expect, test } from '@fixtures/pages.fixture';
import { logStep } from '@helpers/LogSteps';
import { DataHelper } from '@helpers/DataHelper';
import { WebApp } from '@base-class/web-app';
import { NewMortgageCalculatorObjects } from '@objects/NewMortgageCalculatorObjects';
import { calculateExpectedMaxPropertyPrice, calculateExpectedMortgage, NewMortgageInput } from '@pages/NewMortgageCalculatorPage';

const SERVICE = 'new-mortgage-calculator';

const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;

const ROUNDING_TOLERANCE = 1;

const annotation = { annotation: [{ product: 'Rebranding', type: 'non-critical' } as any] };

/**
 * Mortgage calculator (rebranded v6 page) — SAKANI-44613.
 * The calculator must follow the banks' flat-rate mechanism:
 * interest = (price - down payment) * rate * years, installment = (financed amount + interest) / months.
 * The calculator is public, so no login is needed.
 */
test.describe('New Mortgage Calculator', () => {
  let app: WebApp;

  test.beforeEach(async ({ page }) => {
    app = new WebApp(page);
    await app.newMortgageCalculatorPage.openMortgageCalculatorPage(readEnvironments().preBeta.userPortalUrl);
  });

  test('TC-01 Verify the installment follows the bank flat-rate formula for valid input', annotation, async () => {
    const data = readServiceData();
    const input: NewMortgageInput = data.validInput;

    await logStep('Step 01: Fill the calculator with valid input');
    await app.newMortgageCalculatorPage.fillCalculatorForm(input);

    await logStep('Step 02: Click calculate');
    await app.newMortgageCalculatorPage.clickCalculate();
    expect(await app.newMortgageCalculatorPage.isResultVisible()).toBe(true);

    await logStep('Step 03: Verify monthly payment, total financing and total interest match the formula');
    const actual = await app.newMortgageCalculatorPage.getResultFigures();
    const expected = calculateExpectedMortgage(data.validInput);
    expect(Math.abs(actual.monthlyPayment - expected.monthlyPayment)).toBeLessThanOrEqual(ROUNDING_TOLERANCE);
    expect(Math.abs(actual.totalFinancingWithProfit - expected.totalFinancingWithProfit)).toBeLessThanOrEqual(ROUNDING_TOLERANCE);
    expect(Math.abs(actual.totalInterest - expected.totalInterest)).toBeLessThanOrEqual(ROUNDING_TOLERANCE);
  });

  for (const [index, scenario] of (readServiceData().formulaScenarios as Required<NewMortgageInput>[]).entries()) {
    test(`TC-02.${index + 1} Verify the formula for price ${scenario.propertyPrice}, rate ${scenario.annualInterestRate}%, ${scenario.fundingPeriodYears} years`, annotation, async () => {
      const data = readServiceData();

      await logStep('Step 01: Fill the calculator with the scenario values');
      await app.newMortgageCalculatorPage.fillCalculatorForm({ ...data.validInput, ...scenario });

      await logStep('Step 02: Click calculate');
      await app.newMortgageCalculatorPage.clickCalculate();
      expect(await app.newMortgageCalculatorPage.isResultVisible()).toBe(true);

      await logStep('Step 03: Verify the result figures match the bank formula');
      const actual = await app.newMortgageCalculatorPage.getResultFigures();
      const expected = calculateExpectedMortgage(scenario);
      expect(Math.abs(actual.monthlyPayment - expected.monthlyPayment), `monthly payment ${actual.monthlyPayment} vs ${expected.monthlyPayment}`).toBeLessThanOrEqual(ROUNDING_TOLERANCE);
      expect(Math.abs(actual.totalFinancingWithProfit - expected.totalFinancingWithProfit), `total financing ${actual.totalFinancingWithProfit} vs ${expected.totalFinancingWithProfit}`).toBeLessThanOrEqual(ROUNDING_TOLERANCE);
      expect(Math.abs(actual.totalInterest - expected.totalInterest), `total interest ${actual.totalInterest} vs ${expected.totalInterest}`).toBeLessThanOrEqual(ROUNDING_TOLERANCE);
    });
  }

  test('TC-03 Verify zero interest rate returns no interest and an equal split of the financed amount', annotation, async () => {
    const data = readServiceData();

    await logStep('Step 01: Fill the calculator with a zero interest rate');
    await app.newMortgageCalculatorPage.fillCalculatorForm({ ...data.validInput, annualInterestRate: 0 });

    await logStep('Step 02: Click calculate');
    await app.newMortgageCalculatorPage.clickCalculate();
    expect(await app.newMortgageCalculatorPage.isResultVisible()).toBe(true);

    await logStep('Step 03: Verify interest is zero and the installment is the financed amount over the months');
    const actual = await app.newMortgageCalculatorPage.getResultFigures();
    const financedAmount = data.validInput.propertyPrice - data.validInput.downPaymentAmount;
    expect(actual.totalInterest).toBe(0);
    expect(actual.totalFinancingWithProfit).toBe(financedAmount);
    expect(Math.abs(actual.monthlyPayment - financedAmount / (data.validInput.fundingPeriodYears * 12))).toBeLessThanOrEqual(ROUNDING_TOLERANCE);
  });

  test('TC-04 Verify the installment above the debt burden ratio shows the highest possible property price', annotation, async () => {
    const data = readServiceData();
    const input = { ...data.validInput, ...data.debtBurdenInput };

    await logStep('Step 01: Fill the calculator with income too low for the installment');
    await app.newMortgageCalculatorPage.fillCalculatorForm(input);

    await logStep('Step 02: Click calculate');
    await app.newMortgageCalculatorPage.clickCalculate();

    // Above the debt burden ratio no installment is shown, only the highest possible property price
    await logStep('Step 03: Verify the highest possible property price follows the debt burden ratio');
    const maxPropertyPrice = await app.newMortgageCalculatorPage.getMaxPropertyPrice();
    expect(Math.abs(maxPropertyPrice - calculateExpectedMaxPropertyPrice(input))).toBeLessThanOrEqual(ROUNDING_TOLERANCE);
  });

  test('TC-05 Verify the result summary shows the entered data, down payment percentage and end date', annotation, async () => {
    const data = readServiceData();
    const input = data.validInput;

    await logStep('Step 01: Fill the calculator with valid input and calculate');
    await app.newMortgageCalculatorPage.fillCalculatorForm(input);
    await app.newMortgageCalculatorPage.clickCalculate();
    expect(await app.newMortgageCalculatorPage.isResultVisible()).toBe(true);

    await logStep('Step 02: Verify income, liabilities and interest rate in the summary');
    expect(await app.newMortgageCalculatorPage.getResultAmount(NewMortgageCalculatorObjects.summaryMonthlyIncomeLabel)).toBe(input.monthlyIncome);
    expect(await app.newMortgageCalculatorPage.getResultAmount(NewMortgageCalculatorObjects.summaryLiabilitiesLabel)).toBe(input.monthlyLiabilities);
    expect(await app.newMortgageCalculatorPage.getSummaryValue(NewMortgageCalculatorObjects.summaryInterestRateLabel)).toBe(`${input.annualInterestRate}%`);

    await logStep('Step 03: Verify the down payment percentage and the funding end date');
    const downPaymentPercentage = Math.round((input.downPaymentAmount / input.propertyPrice) * 100);
    expect(await app.newMortgageCalculatorPage.getSummaryValue(NewMortgageCalculatorObjects.summaryDownPaymentPercentageLabel)).toBe(`${downPaymentPercentage}%`);
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + input.fundingPeriodYears);
    const expectedEndDate = `${String(endDate.getDate()).padStart(2, '0')}/${String(endDate.getMonth() + 1).padStart(2, '0')}/${endDate.getFullYear()}`;
    expect(await app.newMortgageCalculatorPage.getSummaryValue(NewMortgageCalculatorObjects.summaryFundingPeriodLabel)).toContain(expectedEndDate);
  });

  test('TC-06 Verify the beneficiary result keeps the flat-rate relation between its figures', annotation, async () => {
    const data = readServiceData();
    const input = data.validInput;

    await logStep('Step 01: Answer yes to the beneficiary question');
    await app.newMortgageCalculatorPage.fillCalculatorForm({ ...input, isBeneficiary: true });
    expect(await app.newMortgageCalculatorPage.isIncludeRedfQuestionVisible()).toBe(true);

    await logStep('Step 02: Do not include the support in the down payment and calculate');
    await app.newMortgageCalculatorPage.selectIncludeRedfInDownPayment(false);
    await app.newMortgageCalculatorPage.clickCalculate();
    expect(await app.newMortgageCalculatorPage.isResultVisible()).toBe(true);

    await logStep('Step 03: Verify interest = financed amount * rate * years and installment = total / months');
    const actual = await app.newMortgageCalculatorPage.getResultFigures();
    const financedAmount = actual.totalFinancingWithProfit - actual.totalInterest;
    expect(Math.abs(actual.totalInterest - financedAmount * (input.annualInterestRate / 100) * input.fundingPeriodYears)).toBeLessThanOrEqual(ROUNDING_TOLERANCE);
    expect(Math.abs(actual.monthlyPayment - actual.totalFinancingWithProfit / (input.fundingPeriodYears * 12))).toBeLessThanOrEqual(ROUNDING_TOLERANCE);
  });

  test('TC-07 Verify an empty form shows required field errors', annotation, async () => {
    const data = readServiceData();

    await logStep('Step 01: Click calculate without filling the form');
    await app.newMortgageCalculatorPage.clickCalculate();

    await logStep('Step 02: Verify required field errors are shown and no result is calculated');
    expect(await app.newMortgageCalculatorPage.getRequiredFieldErrorsCount()).toBeGreaterThan(0);
    expect(await app.newMortgageCalculatorPage.getFormErrorMessages()).toContain(data.errors.required);
    expect(await app.newMortgageCalculatorPage.isResultVisible(5000)).toBe(false);
  });

  test('TC-08 Verify a first home down payment below the minimum percentage is rejected', annotation, async () => {
    const data = readServiceData();
    const input = data.validInput;
    const minimumDownPayment = (input.propertyPrice * data.minimumDownPaymentPercentage.first) / 100;

    await logStep('Step 01: Enter a down payment below the first home minimum');
    await app.newMortgageCalculatorPage.fillCalculatorForm({ ...input, homeType: 'first', downPaymentAmount: minimumDownPayment - 1000 });
    await app.newMortgageCalculatorPage.clickCalculate();

    await logStep('Step 02: Verify the down payment range error shows the minimum');
    const errors = (await app.newMortgageCalculatorPage.getFormErrorMessages()).join(' | ');
    expect(errors).toContain(data.errors.downPaymentRangePrefix);
    expect(errors).toContain(minimumDownPayment.toLocaleString('en-US'));
    expect(await app.newMortgageCalculatorPage.isResultVisible(5000)).toBe(false);
  });

  test('TC-09 Verify a second home requires a higher minimum down payment', annotation, async () => {
    const data = readServiceData();
    const input = data.validInput;
    const minimumDownPayment = (input.propertyPrice * data.minimumDownPaymentPercentage.second) / 100;

    await logStep('Step 01: Select second home with a down payment below its minimum');
    await app.newMortgageCalculatorPage.fillCalculatorForm({ ...input, homeType: 'second' });
    await app.newMortgageCalculatorPage.clickCalculate();

    await logStep('Step 02: Verify the down payment range error shows the second home minimum');
    const errors = (await app.newMortgageCalculatorPage.getFormErrorMessages()).join(' | ');
    expect(errors).toContain(data.errors.downPaymentRangePrefix);
    expect(errors).toContain(minimumDownPayment.toLocaleString('en-US'));
    expect(await app.newMortgageCalculatorPage.isResultVisible(5000)).toBe(false);
  });

  test('TC-10 Verify a down payment above the property price is rejected', annotation, async () => {
    const data = readServiceData();
    const input = data.validInput;

    await logStep('Step 01: Enter a down payment above the property price');
    await app.newMortgageCalculatorPage.fillCalculatorForm({ ...input, downPaymentAmount: input.propertyPrice + 100000 });
    await app.newMortgageCalculatorPage.clickCalculate();

    await logStep('Step 02: Verify the down payment exceeds price error');
    expect(await app.newMortgageCalculatorPage.getFormErrorMessages()).toContain(data.errors.downPaymentExceedsPrice);
    expect(await app.newMortgageCalculatorPage.isResultVisible(5000)).toBe(false);
  });

  test('TC-11 Verify monthly income outside the allowed range is rejected', annotation, async () => {
    const data = readServiceData();

    await logStep('Step 01: Enter income below the minimum and calculate');
    await app.newMortgageCalculatorPage.fillCalculatorForm({ ...data.validInput, monthlyIncome: data.incomeRange.min - 1 });
    await app.newMortgageCalculatorPage.clickCalculate();

    await logStep('Step 02: Verify the income range error');
    expect(await app.newMortgageCalculatorPage.getFormErrorMessages()).toContain(data.errors.incomeRange);

    await logStep('Step 03: Enter income above the maximum and calculate');
    await app.newMortgageCalculatorPage.enterMonthlyIncome(data.incomeRange.max + 1);
    await app.newMortgageCalculatorPage.clickCalculate();

    await logStep('Step 04: Verify the income range error');
    expect(await app.newMortgageCalculatorPage.getFormErrorMessages()).toContain(data.errors.incomeRange);
    expect(await app.newMortgageCalculatorPage.isResultVisible(5000)).toBe(false);
  });

  test('TC-12 Verify edit data keeps the entered values and clear all resets them', annotation, async () => {
    const data = readServiceData();

    await logStep('Step 01: Calculate with valid input');
    await app.newMortgageCalculatorPage.fillCalculatorForm(data.validInput);
    await app.newMortgageCalculatorPage.clickCalculate();
    expect(await app.newMortgageCalculatorPage.isResultVisible()).toBe(true);

    await logStep('Step 02: Click edit data and verify the values are kept');
    await app.newMortgageCalculatorPage.clickEditData();
    expect(await app.newMortgageCalculatorPage.getInputValues()).toEqual(['500,000', '4', '25,000', '2,000', '80,000']);

    await logStep('Step 03: Click clear all and verify every field is empty');
    await app.newMortgageCalculatorPage.clickClearAll();
    expect(await app.newMortgageCalculatorPage.getInputValues()).toEqual(['', '', '', '', '']);
  });

  test('TC-13 Verify recalculating with a new funding period updates the installment by the formula', annotation, async () => {
    const data = readServiceData();
    const input = data.validInput;

    await logStep('Step 01: Calculate with the initial funding period');
    await app.newMortgageCalculatorPage.fillCalculatorForm(input);
    await app.newMortgageCalculatorPage.clickCalculate();
    const first = await app.newMortgageCalculatorPage.getResultFigures();

    await logStep('Step 02: Edit the data, change the funding period and recalculate');
    await app.newMortgageCalculatorPage.clickEditData();
    await app.newMortgageCalculatorPage.selectFundingPeriod(10);
    await app.newMortgageCalculatorPage.clickCalculate();
    const second = await app.newMortgageCalculatorPage.getResultFigures();

    await logStep('Step 03: Verify the new result replaces the old one and matches the formula');
    expect(second.monthlyPayment).not.toBe(first.monthlyPayment);
    const expected = calculateExpectedMortgage({ ...input, fundingPeriodYears: 10 });
    expect(Math.abs(second.monthlyPayment - expected.monthlyPayment)).toBeLessThanOrEqual(ROUNDING_TOLERANCE);
    expect(Math.abs(second.totalInterest - expected.totalInterest)).toBeLessThanOrEqual(ROUNDING_TOLERANCE);
  });
});
