'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PaymentGatewayPage = void 0;
// @ts-nocheck
const { Page, expect } = require('@playwright/test');
const PaymentGatewayObjects_1 = require('@objects/PaymentGatewayObjects');
const UnitBookingObjects_1 = require('@objects/UnitBookingObjects');
class PaymentGatewayPage {
  constructor(page) {
    this.page = page;
  }
  async click(locator) {
    await locator.click();
  }
  async check(locator) {
    await locator.check();
  }
  async fillCardDetails() {
    const madaPaymentTitle = this.page.getByTitle(UnitBookingObjects_1.UnitBookingObjects.madaPaymentTitle.title);
    await expect(madaPaymentTitle).toBeVisible({ timeout: 120000 });
    await this.click(madaPaymentTitle);
    const cardNumber = this.page.locator(PaymentGatewayObjects_1.PaymentGatewayObjects.cardNumberFrame).contentFrame().getByRole(PaymentGatewayObjects_1.PaymentGatewayObjects.cardNumberInput.role, {
      name: PaymentGatewayObjects_1.PaymentGatewayObjects.cardNumberInput.name,
    });
    await cardNumber.fill('4464040000000007');
    const expiryDateInput = this.page.getByRole(PaymentGatewayObjects_1.PaymentGatewayObjects.expiryDateInput.role, { name: PaymentGatewayObjects_1.PaymentGatewayObjects.expiryDateInput.name });
    await expiryDateInput.fill('10 / 52');
    const cardHolderNameInput = this.page.getByRole(PaymentGatewayObjects_1.PaymentGatewayObjects.cardHolderNameInput.role, {
      name: PaymentGatewayObjects_1.PaymentGatewayObjects.cardHolderNameInput.name,
    });
    await cardHolderNameInput.fill('cvv2');
    const cvvInput = this.page.locator(PaymentGatewayObjects_1.PaymentGatewayObjects.cvvFrame).contentFrame().getByRole(PaymentGatewayObjects_1.PaymentGatewayObjects.cvvInput.role, {
      name: PaymentGatewayObjects_1.PaymentGatewayObjects.cvvInput.name,
    });
    await cvvInput.fill('222');
    const payNowButton = this.page.getByRole(PaymentGatewayObjects_1.PaymentGatewayObjects.payNowButton.role, { name: PaymentGatewayObjects_1.PaymentGatewayObjects.payNowButton.name });
    await this.click(payNowButton);
  }
}
exports.PaymentGatewayPage = PaymentGatewayPage;
