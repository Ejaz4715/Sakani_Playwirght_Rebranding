'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PaymentConfirmationPage = void 0;
// @ts-nocheck
const test_1 = require('@playwright/test');
const PaymentConfirmationObjects_1 = require('@objects/PaymentConfirmationObjects');
class PaymentConfirmationPage {
  constructor(page) {
    this.page = page;
  }
  async click(locator) {
    await (0, test_1.expect)(locator).toBeVisible(90000);
    await locator.click();
  }
  async check(locator) {
    await (0, test_1.expect)(locator).toBeVisible(90000);
    await locator.check();
  }
  async closePayment() {
    const closeButton = this.page.locator(PaymentConfirmationObjects_1.PaymentConfirmationObjects.closeButton.xpath);
    await this.click(closeButton);
  }
  async expectSuccessMessage() {
    const successMessage = this.page.locator(PaymentConfirmationObjects_1.PaymentConfirmationObjects.successMessage);
    await (0, test_1.expect)(successMessage).toBeVisible(); //'تم اكتمال الحجز بنجاح! - it was contains
  }
}
exports.PaymentConfirmationPage = PaymentConfirmationPage;
