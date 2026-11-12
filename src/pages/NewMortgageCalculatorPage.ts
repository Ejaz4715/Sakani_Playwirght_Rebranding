import { expect, Page } from '@playwright/test';
import { NewMortgageCalculatorObjects, resultAmountXpath, resultSummaryXpath } from '@objects/NewMortgageCalculatorObjects';

const DEFAULT_TIMEOUT = 30_000;

// Banks cap the monthly installment at 55% of the monthly income minus the existing liabilities
export const DEBT_BURDEN_RATIO = 0.55;

export type HomeType = 'first' | 'second';

export interface NewMortgageInput {
  propertyPrice?: number;
  annualInterestRate?: number;
  monthlyIncome?: number;
  monthlyLiabilities?: number;
  fundingPeriodYears?: number;
  homeType?: HomeType;
  downPaymentAmount?: number;
  isBeneficiary?: boolean;
  includeRedfInDownPayment?: boolean;
}

export interface NewMortgageResult {
  monthlyPayment: number;
  totalFinancingWithProfit: number;
  totalInterest: number;
}

/**
 * Bank (flat rate) mechanism:
 * financed amount = property price - down payment
 * total interest  = financed amount * annual rate * years
 * monthly payment = (financed amount + total interest) / (years * 12)
 */
export function calculateExpectedMortgage(input: Required<Pick<NewMortgageInput, 'propertyPrice' | 'downPaymentAmount' | 'annualInterestRate' | 'fundingPeriodYears'>>): NewMortgageResult {
  const financedAmount = input.propertyPrice - input.downPaymentAmount;
  const totalInterest = financedAmount * (input.annualInterestRate / 100) * input.fundingPeriodYears;
  const totalFinancingWithProfit = financedAmount + totalInterest;
  return {
    monthlyPayment: totalFinancingWithProfit / (input.fundingPeriodYears * 12),
    totalFinancingWithProfit,
    totalInterest,
  };
}

/** Highest property price the bank allows when the installment exceeds the debt burden ratio. */
export function calculateExpectedMaxPropertyPrice(input: Required<Pick<NewMortgageInput, 'monthlyIncome' | 'monthlyLiabilities' | 'downPaymentAmount' | 'annualInterestRate' | 'fundingPeriodYears'>>): number {
  const allowedMonthlyPayment = input.monthlyIncome * DEBT_BURDEN_RATIO - input.monthlyLiabilities;
  const maxFinancedAmount = (allowedMonthlyPayment * input.fundingPeriodYears * 12) / (1 + (input.annualInterestRate / 100) * input.fundingPeriodYears);
  return maxFinancedAmount + input.downPaymentAmount;
}

/** "SAR 8,400" / "8,400" -> 8400 */
export const parseAmount = (text: string) => Number(text.replace(/[^\d.]/g, ''));

export class NewMortgageCalculatorPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async openMortgageCalculatorPage(userPortalUrl: string) {
    await this.page.goto(new URL(NewMortgageCalculatorObjects.pagePath, userPortalUrl).toString());
    const rejectCookiesButton = this.page.getByRole(NewMortgageCalculatorObjects.rejectCookiesButton.role, { name: NewMortgageCalculatorObjects.rejectCookiesButton.name }).filter({ visible: true }).first();
    await rejectCookiesButton.click({ timeout: 10_000 }).catch(() => {});
    await expect(this.page.locator(NewMortgageCalculatorObjects.calculatorForm.xpath)).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  }

  async isCalculatorFormVisible() {
    await this.page.locator(NewMortgageCalculatorObjects.calculatorForm.xpath).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await this.page.locator(NewMortgageCalculatorObjects.calculatorForm.xpath).isVisible();
  }

  async enterPropertyPrice(value: number) {
    const propertyPriceInputfield = this.page.locator(NewMortgageCalculatorObjects.propertyPriceInputfield.xpath);
    await expect(propertyPriceInputfield).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await propertyPriceInputfield.fill(String(value));
  }

  async enterAnnualInterestRate(value: number) {
    const annualInterestRateInputfield = this.page.locator(NewMortgageCalculatorObjects.annualInterestRateInputfield.xpath);
    await expect(annualInterestRateInputfield).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await annualInterestRateInputfield.fill(String(value));
  }

  async enterMonthlyIncome(value: number) {
    const monthlyIncomeInputfield = this.page.locator(NewMortgageCalculatorObjects.monthlyIncomeInputfield.xpath);
    await expect(monthlyIncomeInputfield).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await monthlyIncomeInputfield.fill(String(value));
  }

  async enterMonthlyLiabilities(value: number) {
    const monthlyLiabilitiesInputfield = this.page.locator(NewMortgageCalculatorObjects.monthlyLiabilitiesInputfield.xpath);
    await expect(monthlyLiabilitiesInputfield).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await monthlyLiabilitiesInputfield.fill(String(value));
  }

  async enterDownPaymentAmount(value: number) {
    const downPaymentAmountInputfield = this.page.locator(NewMortgageCalculatorObjects.downPaymentAmountInputfield.xpath);
    await expect(downPaymentAmountInputfield).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await downPaymentAmountInputfield.fill(String(value));
  }

  async selectFundingPeriod(years: number) {
    const fundingPeriodDropdownList = this.page.locator(NewMortgageCalculatorObjects.fundingPeriodDropdownList.xpath);
    await expect(fundingPeriodDropdownList).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await fundingPeriodDropdownList.click();

    const fundingPeriodOption = this.page.getByRole('option', { name: `${years} سنة`, exact: true });
    await expect(fundingPeriodOption).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await fundingPeriodOption.click();
  }

  async selectHomeType(homeType: HomeType) {
    const homeTypeDropdownList = this.page.locator(NewMortgageCalculatorObjects.homeTypeDropdownList.xpath);
    const homeTypeOptions = {
      first: NewMortgageCalculatorObjects.firstHomeOption,
      second: NewMortgageCalculatorObjects.secondHomeOption,
    };
    const homeTypeOption = this.page.getByRole(homeTypeOptions[homeType].role, { name: homeTypeOptions[homeType].name, exact: true });

    await expect(homeTypeDropdownList).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await homeTypeDropdownList.click();

    await expect(homeTypeOption).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await homeTypeOption.click();
  }

  // The radio inputs are visually hidden (sr-only), so they are checked with force
  async selectBeneficiary(isBeneficiary: boolean) {
    const beneficiaryRadio = this.page.locator(isBeneficiary ? NewMortgageCalculatorObjects.beneficiaryYesRadio.xpath : NewMortgageCalculatorObjects.beneficiaryNoRadio.xpath);
    await beneficiaryRadio.check({ force: true });
  }

  async selectIncludeRedfInDownPayment(include: boolean) {
    const includeRedfRadio = this.page.locator(include ? NewMortgageCalculatorObjects.includeRedfInDownPaymentYesRadio.xpath : NewMortgageCalculatorObjects.includeRedfInDownPaymentNoRadio.xpath);
    await includeRedfRadio.check({ force: true });
  }

  async isIncludeRedfQuestionVisible() {
    return await this.page.getByText(NewMortgageCalculatorObjects.includeRedfInDownPaymentQuestion).isVisible();
  }

  /** Fills only the fields present on `data`; omitted fields are left untouched. */
  async fillCalculatorForm(data: NewMortgageInput) {
    if (data.propertyPrice !== undefined) await this.enterPropertyPrice(data.propertyPrice);
    if (data.annualInterestRate !== undefined) await this.enterAnnualInterestRate(data.annualInterestRate);
    if (data.monthlyIncome !== undefined) await this.enterMonthlyIncome(data.monthlyIncome);
    if (data.monthlyLiabilities !== undefined) await this.enterMonthlyLiabilities(data.monthlyLiabilities);
    if (data.fundingPeriodYears !== undefined) await this.selectFundingPeriod(data.fundingPeriodYears);
    if (data.homeType !== undefined) await this.selectHomeType(data.homeType);
    if (data.downPaymentAmount !== undefined) await this.enterDownPaymentAmount(data.downPaymentAmount);
    if (data.isBeneficiary !== undefined) await this.selectBeneficiary(data.isBeneficiary);
    if (data.includeRedfInDownPayment !== undefined) await this.selectIncludeRedfInDownPayment(data.includeRedfInDownPayment);
  }

  async clickCalculate() {
    const calculateButton = this.page
      .getByRole(NewMortgageCalculatorObjects.calculateButton.role, { name: NewMortgageCalculatorObjects.calculateButton.name })
      .or(this.page.getByRole(NewMortgageCalculatorObjects.recalculateButton.role, { name: NewMortgageCalculatorObjects.recalculateButton.name, exact: true }))
      .first();
    await expect(calculateButton).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await calculateButton.click();
  }

  async clickClearAll() {
    const clearAllButton = this.page.getByRole(NewMortgageCalculatorObjects.clearAllButton.role, { name: NewMortgageCalculatorObjects.clearAllButton.name });
    await expect(clearAllButton).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await clearAllButton.click();
  }

  // On narrow screens the result replaces the form and "edit data" brings it back; on desktop the form stays next to the result
  async clickEditData() {
    const editDataButton = this.page.getByRole(NewMortgageCalculatorObjects.editDataButton.role, { name: NewMortgageCalculatorObjects.editDataButton.name });
    if (await editDataButton.isVisible()) {
      await editDataButton.click();
    }
    await expect(this.page.locator(NewMortgageCalculatorObjects.calculatorForm.xpath)).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  }

  async isResultVisible(timeout = DEFAULT_TIMEOUT) {
    return await this.page
      .locator(resultAmountXpath(NewMortgageCalculatorObjects.monthlyPaymentLabel))
      .waitFor({ state: 'visible', timeout })
      .then(() => true)
      .catch(() => false);
  }

  async getResultAmount(label: string) {
    const amount = this.page.locator(resultAmountXpath(label));
    await expect(amount).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    return parseAmount(await amount.innerText());
  }

  async getResultFigures(): Promise<NewMortgageResult> {
    return {
      monthlyPayment: await this.getResultAmount(NewMortgageCalculatorObjects.monthlyPaymentLabel),
      totalFinancingWithProfit: await this.getResultAmount(NewMortgageCalculatorObjects.totalFinancingWithProfitLabel),
      totalInterest: await this.getResultAmount(NewMortgageCalculatorObjects.totalInterestLabel),
    };
  }

  async getMaxPropertyPrice() {
    return await this.getResultAmount(NewMortgageCalculatorObjects.maxPropertyPriceLabel);
  }

  async getSummaryValue(label: string) {
    const value = this.page.locator(resultSummaryXpath(label));
    await expect(value).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    return (await value.innerText()).trim();
  }

  async getFormErrorMessages() {
    const errors = this.page.locator(NewMortgageCalculatorObjects.formErrorMessages.xpath);
    await errors.first().waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return (await errors.allInnerTexts()).map((text) => text.trim());
  }

  async getRequiredFieldErrorsCount() {
    const requiredFieldError = this.page.locator(NewMortgageCalculatorObjects.requiredFieldError.xpath);
    await requiredFieldError.first().waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await requiredFieldError.count();
  }

  async getInputValues() {
    return [
      await this.page.locator(NewMortgageCalculatorObjects.propertyPriceInputfield.xpath).inputValue(),
      await this.page.locator(NewMortgageCalculatorObjects.annualInterestRateInputfield.xpath).inputValue(),
      await this.page.locator(NewMortgageCalculatorObjects.monthlyIncomeInputfield.xpath).inputValue(),
      await this.page.locator(NewMortgageCalculatorObjects.monthlyLiabilitiesInputfield.xpath).inputValue(),
      await this.page.locator(NewMortgageCalculatorObjects.downPaymentAmountInputfield.xpath).inputValue(),
    ];
  }
}
