'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookingAndSelectPaymentMethodPage = void 0;
const test_1 = require('@playwright/test');
const BookingAndSelectPaymentMethodObjects_1 = require('@objects/BookingAndSelectPaymentMethodObjects');
class BookingAndSelectPaymentMethodPage {
  constructor(page) {
    this.page = page;
  }
  async clickVisibleButton(locator) {
    await locator.scrollIntoViewIfNeeded().catch(() => {});
    await (0, test_1.expect)(locator).toBeVisible({ timeout: 90000 });
    await locator.click({ force: true });
  }
  async checkOnTermAndCondition() {
    const termsCheckbox = this.page.locator(BookingAndSelectPaymentMethodObjects_1.BookingAndSelectPaymentMethodObjects.termsCheckbox.xpath);
    await (0, test_1.expect)(termsCheckbox).toBeVisible({ timeout: 90000 });
    await termsCheckbox.click();
  }
  async clickOnPayBookingFeesButton() {
    const payBookingFeesButton = this.page.locator(BookingAndSelectPaymentMethodObjects_1.BookingAndSelectPaymentMethodObjects.payBookingFeesButton.xpath);
    await this.page.waitForTimeout(2000); // Wait for 5 seconds before checking visibility
    await this.clickVisibleButton(payBookingFeesButton);
  }
  async clickOnApproveAndContinueIfVisible() {
    const approveAndContinueButton = this.page.locator(BookingAndSelectPaymentMethodObjects_1.BookingAndSelectPaymentMethodObjects.approveAndcontinueButton.xpath);
    await this.page.waitForTimeout(4000);
    if (await approveAndContinueButton.isVisible().catch(() => false)) {
      await this.clickVisibleButton(approveAndContinueButton);
    }
  }
  async clickOnSelectPaymentMethodButton() {
    const selectPaymentMethodButton = this.page.locator(BookingAndSelectPaymentMethodObjects_1.BookingAndSelectPaymentMethodObjects.selectPaymentMehtButton.xpath);
    await this.clickVisibleButton(selectPaymentMethodButton);
  }
  async clickOnFlexiblePaymentRadioButton() {
    const flexiblePaymentRadioButton = this.page.locator(BookingAndSelectPaymentMethodObjects_1.BookingAndSelectPaymentMethodObjects.flexiblePaymentRadioButton.xpath);
    await this.clickVisibleButton(flexiblePaymentRadioButton);
  }
  async clickOnCashPaymentRadioButton() {
    const cashPaymentRadioButton = this.page.locator(BookingAndSelectPaymentMethodObjects_1.BookingAndSelectPaymentMethodObjects.cashPaymentRadioButton.xpath);
    await this.clickVisibleButton(cashPaymentRadioButton);
  }
  async clickOnElectronicFinancePaymentRadioButton() {
    const electronicFinancePaymentRadioButton = this.page.locator(BookingAndSelectPaymentMethodObjects_1.BookingAndSelectPaymentMethodObjects.electronicFinancePaymentRadioButton.xpath);
    await this.clickVisibleButton(electronicFinancePaymentRadioButton);
  }
  async clickOnSaveAndContinueButton() {
    const saveAndContinueButton = this.page.locator(BookingAndSelectPaymentMethodObjects_1.BookingAndSelectPaymentMethodObjects.saveAndContinueButton.xpath);
    await this.page.waitForTimeout(5000); // Wait for 5 seconds before checking visibility
    await (0, test_1.expect)(saveAndContinueButton).toBeVisible({ timeout: 90000 });
    await saveAndContinueButton.click();
  }
  async clickOnSignContractButton() {
    const signContractButton = this.page.locator(BookingAndSelectPaymentMethodObjects_1.BookingAndSelectPaymentMethodObjects.signContractButton.xpath);
    await (0, test_1.expect)(signContractButton).toBeVisible({ timeout: 90000 });
    await signContractButton.click();
  }
  async clickOnBookingDetailsButton() {
    const bookingDetailsButton = this.page.locator(BookingAndSelectPaymentMethodObjects_1.BookingAndSelectPaymentMethodObjects.bookingDetailsButton.xpath);
    await this.clickVisibleButton(bookingDetailsButton);
  }
  async getUnitCode() {
    const unitCodeHeading = this.page.locator(BookingAndSelectPaymentMethodObjects_1.BookingAndSelectPaymentMethodObjects.unitCode.xpath);
    await (0, test_1.expect)(unitCodeHeading).toBeVisible({ timeout: 90000 });
    const headingText = await unitCodeHeading.innerText();
    const unitCodeMatch = headingText.match(/(\d+(?:\s*-\s*\d+)+)\s*$/);
    if (!unitCodeMatch) {
      throw new Error(`Could not extract unit code from: ${headingText}`);
    }
    return unitCodeMatch[1].replace(/\s+/g, '');
  }
  async validateSelectedPaymentType(type) {
    const paymentTypeText = this.page.locator(BookingAndSelectPaymentMethodObjects_1.BookingAndSelectPaymentMethodObjects.paymentTypeText(type));
    await (0, test_1.expect)(paymentTypeText, 'Payment type text is not found').toBeVisible({ timeout: 20000 });
  }
}
exports.BookingAndSelectPaymentMethodPage = BookingAndSelectPaymentMethodPage;
