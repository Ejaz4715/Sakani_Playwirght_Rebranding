'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CashPaymentPage = void 0;
const test_1 = require('@playwright/test');
const CashPaymentObjects_1 = require('@objects/CashPaymentObjects');
class CashPaymentPage {
  constructor(page) {
    this.page = page;
  }
  async clickOnSchedulePaymentCard() {
    const schedulePaymentCard = this.page.locator(CashPaymentObjects_1.CashPaymentObjects.sechudlePaymentCard.xpath);
    (0, test_1.expect)(schedulePaymentCard).toBeVisible({ timeout: 90000 });
    schedulePaymentCard.click();
  }
  async clickOnCashPaymentLink() {
    const cashPaymentLink = this.page.getByRole(CashPaymentObjects_1.CashPaymentObjects.cashPaymentLink.role, { name: CashPaymentObjects_1.CashPaymentObjects.cashPaymentLink.name });
    await (0, test_1.expect)(cashPaymentLink).toBeVisible({ timeout: 90000 });
    await cashPaymentLink.click();
  }
  async selectCustomerType() {
    const customerTypeDropdown = this.page.locator(CashPaymentObjects_1.CashPaymentObjects.customerTypeDropdown.xpath);
    await (0, test_1.expect)(customerTypeDropdown).toBeVisible({ timeout: 90000 });
    await customerTypeDropdown.click();
    const customerTypeOption = this.page.getByRole(CashPaymentObjects_1.CashPaymentObjects.customerTypeOption.role, { name: CashPaymentObjects_1.CashPaymentObjects.customerTypeOption.name });
    await (0, test_1.expect)(customerTypeOption).toBeVisible({ timeout: 90000 });
    await customerTypeOption.click();
  }
  async fillIDNumber(idNumber) {
    const iDNumberInputfield = this.page.locator(CashPaymentObjects_1.CashPaymentObjects.iDNumberInputfield.xpath);
    await (0, test_1.expect)(iDNumberInputfield).toBeVisible({ timeout: 90000 });
    await iDNumberInputfield.fill(idNumber);
  }
  async clickSearchButton() {
    const searchButton = this.page.getByRole(CashPaymentObjects_1.CashPaymentObjects.searchButton.role, { name: CashPaymentObjects_1.CashPaymentObjects.searchButton.name });
    await (0, test_1.expect)(searchButton).toBeVisible({ timeout: 90000 });
    await searchButton.click();
  }
  async clickShowPasswordIcon() {
    const showPasswordIcon = this.page.locator(CashPaymentObjects_1.CashPaymentObjects.showPasswordIcon.selector);
    await this.page.waitForTimeout(4000); // Wait for 5 seconds before checking visibility
    await (0, test_1.expect)(showPasswordIcon).toBeVisible({ timeout: 90000 });
    await showPasswordIcon.click();
  }
  async clickDocumentCashPaymentButton() {
    const documentCashPaymentButton = this.page.getByRole(CashPaymentObjects_1.CashPaymentObjects.documentCashPaymentButton.role, {
      name: CashPaymentObjects_1.CashPaymentObjects.documentCashPaymentButton.name,
    });
    await (0, test_1.expect)(documentCashPaymentButton).toBeVisible({ timeout: 90000 });
    await documentCashPaymentButton.click();
  }
  async clickConfirmYesButton() {
    const confirmYesButton = this.page.getByRole(CashPaymentObjects_1.CashPaymentObjects.confirmYesButton.role, { name: CashPaymentObjects_1.CashPaymentObjects.confirmYesButton.name });
    await (0, test_1.expect)(confirmYesButton).toBeVisible({ timeout: 90000 });
    await confirmYesButton.click();
  }
  async expectCashPaymentSuccess() {
    const successMessage = this.page.getByText(CashPaymentObjects_1.CashPaymentObjects.successMessage.text, { exact: true });
    await (0, test_1.expect)(successMessage).toBeVisible({ timeout: 90000 });
  }
  async signSalesContract(otp = ['1', '2', '3', '4']) {
    await this.page.waitForTimeout(9000);
    await this.page.getByRole('button', { name: 'اعتماد' }).click();
    const otpInputs = this.page.getByRole('textbox');
    for (let index = 0; index < otp.length; index++) {
      await otpInputs.nth(index).fill(otp[index]);
    }
    await this.page.getByRole('button', { name: 'تحقق', exact: true }).click();
    await this.page.waitForTimeout(7000);
  }
  async verifyUserIsSigned() {
    const bookingDetailsButton = this.page.locator(CashPaymentObjects_1.CashPaymentObjects.bookingDetailsButton.xpath);
    await (0, test_1.expect)(bookingDetailsButton).toBeVisible({ timeout: 90000 });
  }
}
exports.CashPaymentPage = CashPaymentPage;
