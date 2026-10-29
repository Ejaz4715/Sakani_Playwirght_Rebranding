'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FlexiblePaymentPage = void 0;
const test_1 = require('@playwright/test');
const FlexiblePaymentObjects_1 = require('@objects/FlexiblePaymentObjects');
let DEFAULT_TIMEOUT = 30_000;
class FlexiblePaymentPage {
  constructor(page) {
    this.page = page;
  }
  async clickOnFinancialManagement() {
    const finacialManagemnt = this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.finacialManagemnt.xpath);
    await (0, test_1.expect)(finacialManagemnt).toBeVisible({ timeout: 90000 });
    await finacialManagemnt.click();
  }
  async clickOnPaymentSchedules() {
    const paymentSchedules = this.page.getByRole(FlexiblePaymentObjects_1.FlexiblePaymentObjects.paymentSchedules.role, {
      name: FlexiblePaymentObjects_1.FlexiblePaymentObjects.paymentSchedules.name,
    });
    await (0, test_1.expect)(paymentSchedules).toBeVisible({ timeout: 90000 });
    await paymentSchedules.click();
  }
  async clickOnNewSchedulesButton() {
    const newScheduleButton = this.page.getByRole(FlexiblePaymentObjects_1.FlexiblePaymentObjects.newScheduleButton.role, {
      name: FlexiblePaymentObjects_1.FlexiblePaymentObjects.newScheduleButton.name,
    });
    await (0, test_1.expect)(newScheduleButton).toBeVisible({ timeout: 90000 });
    await newScheduleButton.click();
  }
  async enterScheduleNameInArabic(arabicName) {
    const scheduleNameInArabicInputfield = this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.scheduleNameInArabicInputfield.xpath);
    await (0, test_1.expect)(scheduleNameInArabicInputfield).toBeVisible({ timeout: 90000 });
    await scheduleNameInArabicInputfield.fill(arabicName);
  }
  async enterScheduleNameInEnglish(englishName) {
    const scheduleNameInArabicInputfield = this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.scheduleNameInEnglishInputfield.xpath);
    await (0, test_1.expect)(scheduleNameInArabicInputfield).toBeVisible({ timeout: 90000 });
    await scheduleNameInArabicInputfield.fill(englishName);
  }
  async selectScheduleType(scheduleType) {
    const scheduleTypeDropdownList = this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.scheduleTypeDropdownList.xpath);
    const scheduleTypeOptions = {
      completionPercentage: FlexiblePaymentObjects_1.FlexiblePaymentObjects.completionPercentageOption,
      specificPeriod: FlexiblePaymentObjects_1.FlexiblePaymentObjects.specificPeriodOption,
    };
    const scheduleTypeOption = this.page.getByRole(scheduleTypeOptions[scheduleType].role, { name: scheduleTypeOptions[scheduleType].name });
    await (0, test_1.expect)(scheduleTypeDropdownList).toBeVisible({ timeout: 90000 });
    await scheduleTypeDropdownList.click();
    await (0, test_1.expect)(scheduleTypeOption).toBeVisible({ timeout: 90000 });
    await scheduleTypeOption.click();
  }
  async fillFirstPaymentPaidPercentage(value) {
    const firstPaymentPaidPercentageInputfield = this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.firstPaymentPaidPercentageInputfield.xpath);
    await (0, test_1.expect)(firstPaymentPaidPercentageInputfield).toBeVisible({ timeout: 90000 });
    await firstPaymentPaidPercentageInputfield.fill(String(value));
  }
  async fillFirstPaymentCompletionPercentage(value) {
    const firstPaymentCompletionPercentageInputfield = this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.firstPaymentCompletionPercentageInputfield.xpath);
    await (0, test_1.expect)(firstPaymentCompletionPercentageInputfield).toBeVisible({ timeout: 90000 });
    await firstPaymentCompletionPercentageInputfield.fill(String(value));
  }
  async fillSecondPaymentPaidPercentage(value) {
    const secondPaymentPaidPercentageInputfield = this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.secondPaymentPaidPercentageInputfield.xpath);
    await (0, test_1.expect)(secondPaymentPaidPercentageInputfield).toBeVisible({ timeout: 90000 });
    await secondPaymentPaidPercentageInputfield.fill(String(value));
  }
  async fillSecondPaymentCompletionPercentage(value) {
    const secondPaymentCompletionPercentageInputfield = this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.secondPaymentCompletionPercentageInputfield.xpath);
    await (0, test_1.expect)(secondPaymentCompletionPercentageInputfield).toBeVisible({ timeout: 90000 });
    await secondPaymentCompletionPercentageInputfield.fill(String(value));
  }
  async fillThirdPaymentPaidPercentage(value) {
    const thirdPaymentPaidPercentageInputfield = this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.thirdPaymentPaidPercentageInputfield.xpath);
    await (0, test_1.expect)(thirdPaymentPaidPercentageInputfield).toBeVisible({ timeout: 90000 });
    await thirdPaymentPaidPercentageInputfield.fill(String(value));
  }
  async fillThirdPaymentCompletionPercentage(value) {
    const thirdPaymentCompletionPercentageInputfield = this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.thirdPaymentCompletionPercentageInputfield.xpath);
    await (0, test_1.expect)(thirdPaymentCompletionPercentageInputfield).toBeVisible({ timeout: 90000 });
    await thirdPaymentCompletionPercentageInputfield.fill(String(value));
  }
  async clickOnNextButton() {
    const nextButton = this.page.getByRole(FlexiblePaymentObjects_1.FlexiblePaymentObjects.nextButton.role, {
      name: FlexiblePaymentObjects_1.FlexiblePaymentObjects.nextButton.name,
    });
    await (0, test_1.expect)(nextButton).toBeVisible({ timeout: 90000 });
    await nextButton.click();
  }
  async serachByprojectName(value) {
    const projectNameInputfield = this.page.getByRole(FlexiblePaymentObjects_1.FlexiblePaymentObjects.projectNameInputfield.role, {
      name: FlexiblePaymentObjects_1.FlexiblePaymentObjects.projectNameInputfield.name,
    });
    await (0, test_1.expect)(projectNameInputfield).toBeVisible({ timeout: 90000 });
    await projectNameInputfield.fill(String(value));
  }
  async checkOnProjectNameSearchedResult() {
    const projectResultChecbox = this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.projectResultChecbox.xpath);
    await (0, test_1.expect)(projectResultChecbox).toBeVisible({ timeout: 90000 });
    await projectResultChecbox.click();
  }
  async enterBenefitPercentage(text) {
    const benefitPercenatge = this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.benefitPercenatgeInput.xpath);
    await benefitPercenatge.fill(text);
  }
  async clickOnConfirmButton() {
    const confirmButton = this.page.getByRole(FlexiblePaymentObjects_1.FlexiblePaymentObjects.confirmButton.role, {
      name: FlexiblePaymentObjects_1.FlexiblePaymentObjects.confirmButton.name,
    });
    await (0, test_1.expect)(confirmButton).toBeVisible({ timeout: 90000 });
    await confirmButton.click();
  }
  async verifyTheSuccessfulMessage() {
    const successfulMessage = this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.successfulMessage.xpath);
    await (0, test_1.expect)(successfulMessage).toBeVisible({ timeout: 90000 });
  }
  async searchScheduleByTitle(title) {
    const scheduleSearchInputfield = this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.scheduleSearchInputfield.xpath);
    await (0, test_1.expect)(scheduleSearchInputfield).toBeVisible({ timeout: 90000 });
    await scheduleSearchInputfield.fill(title);
  }
  async clickOnScheduleDetails() {
    const scheduleDetailsButton = this.page.getByRole(FlexiblePaymentObjects_1.FlexiblePaymentObjects.scheduleDetailsButton.role, {
      name: FlexiblePaymentObjects_1.FlexiblePaymentObjects.scheduleDetailsButton.name,
    });
    await (0, test_1.expect)(scheduleDetailsButton).toBeVisible({ timeout: 90000 });
    await scheduleDetailsButton.click();
  }
  async clickOnDeleteSchedule() {
    const deleteScheduleButton = this.page.getByRole(FlexiblePaymentObjects_1.FlexiblePaymentObjects.deleteScheduleButton.role, {
      name: FlexiblePaymentObjects_1.FlexiblePaymentObjects.deleteScheduleButton.name,
    });
    await (0, test_1.expect)(deleteScheduleButton).toBeVisible({ timeout: 90000 });
    await deleteScheduleButton.click();
  }
  async clickOnEditSchedule() {
    const editScheduleButton = this.page.getByRole(FlexiblePaymentObjects_1.FlexiblePaymentObjects.editScheduleButton.role, {
      name: FlexiblePaymentObjects_1.FlexiblePaymentObjects.editScheduleButton.name,
    });
    await (0, test_1.expect)(editScheduleButton).toBeVisible({ timeout: 90000 });
    await editScheduleButton.click();
  }
  async clickOnScheduleDeletedMessage() {
    const scheduleDeletedMessage = this.page.getByText(FlexiblePaymentObjects_1.FlexiblePaymentObjects.scheduleDeletedMessage.text);
    await (0, test_1.expect)(scheduleDeletedMessage).toBeVisible({ timeout: 90000 });
    await scheduleDeletedMessage.click();
  }
  async selectPlanTypeMonthly() {
    const planTypeDropdownList = this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.planTypeDropdownList.xpath);
    const planTypeOption = this.page.getByRole(FlexiblePaymentObjects_1.FlexiblePaymentObjects.planTypeOption.role, { name: FlexiblePaymentObjects_1.FlexiblePaymentObjects.planTypeOption.name });
    await (0, test_1.expect)(planTypeDropdownList).toBeVisible({ timeout: 90000 });
    await planTypeDropdownList.click();
    await (0, test_1.expect)(planTypeOption).toBeVisible({ timeout: 90000 });
    await planTypeOption.click();
  }
  async enterPlanPeriod(value) {
    const planPeriodInputfield = this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.planPeriodInputfield.xpath);
    await (0, test_1.expect)(planPeriodInputfield).toBeVisible({ timeout: 90000 });
    await planPeriodInputfield.fill(value);
  }
  async clickOnCashPayment() {
    await this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.payCash.css).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.payCash.css).click();
  }
  async clickOnCustomerDropdownMenu() {
    await this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.customerTypeDropdown.xpath).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.customerTypeDropdown.xpath).click();
  }
  async selectIndividualCustomersType() {
    await this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.individualCustomersType.xpath).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.individualCustomersType.xpath).click();
  }
  async fillNationalIdentity(nationalIdentity) {
    await this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.nationalIdentityField.xpath).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.nationalIdentityField.xpath).fill(nationalIdentity);
  }
  async clickOnSearch() {
    await this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.searchButton.xpath).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.searchButton.xpath).click();
  }
  async viewTheBookedUnitDetails() {
    await this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.bookedUnitDetailsIcon.xpath).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.bookedUnitDetailsIcon.xpath).click();
  }
  async clickGoToDetailsButton() {
    await this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.goToDetailsButton.xpath).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.goToDetailsButton.xpath).click();
  }
  async getBenefitPercenategValue() {
    await this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.benefitPercenategValue.xpath).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    const benefitValue = await this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.benefitPercenategValue.xpath).textContent();
    return benefitValue;
  }
  async confirmTheCashPayment() {
    await this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.cashPaymentConfirmationButton.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.cashPaymentConfirmationButton.xpath).click();
    await this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.cashPaymentPopUpAcceptButton.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.cashPaymentPopUpAcceptButton.xpath).click();
  }
  //Rebranding:
  async verifyFlexibleSchedulePaymentIsVisible(value) {
    const flexibleSchedulePayment = this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.flexibleSchedulePayment.xpath).getByText(value).first();
    await (0, test_1.expect)(flexibleSchedulePayment).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  }
  async clickViewDetailsForFlexibleSchedule(value) {
    const scheduleText = this.page.getByText(value, { exact: true }).first();
    const scheduleContainer = scheduleText.locator("xpath=ancestor::div[.//button[normalize-space(.)='عرض التفاصيل']][1]");
    const viewDetailsButton = this.page
      .locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.viewDetailsButton.xpath)
      .and(scheduleContainer.getByRole('button', { name: 'عرض التفاصيل', exact: true }));
    await (0, test_1.expect)(viewDetailsButton).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await viewDetailsButton.click();
  }
  async verifyTheInstallmentsDetailsIsPresent() {
    const installmentsDetails = this.page.locator(FlexiblePaymentObjects_1.FlexiblePaymentObjects.installmentsDetails.xpath);
    await (0, test_1.expect)(installmentsDetails).toBeVisible({ timeout: 90000 });
  }
}
exports.FlexiblePaymentPage = FlexiblePaymentPage;
