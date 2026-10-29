'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UnitBookingPage = void 0;
// @ts-nocheck
const UnitBookingObjects_1 = require('@objects/UnitBookingObjects');
const test_1 = require('@playwright/test');
class UnitBookingPage {
  constructor(page) {
    this.page = page;
  }
  async click(locator) {
    await locator.click();
  }
  async check(locator) {
    await locator.check();
  }
  async acceptTermsAndConfirm() {
    const termsCheckbox = this.page.locator(UnitBookingObjects_1.UnitBookingObjects.termsCheckbox);
    await this.click(termsCheckbox);
    const confirmButton = this.page.getByRole(UnitBookingObjects_1.UnitBookingObjects.confirmButton.role, { name: UnitBookingObjects_1.UnitBookingObjects.confirmButton.name });
    await this.click(confirmButton);
    const payBookingFeeButton = this.page.getByRole(UnitBookingObjects_1.UnitBookingObjects.payBookingFeeButton.role, { name: UnitBookingObjects_1.UnitBookingObjects.payBookingFeeButton.name });
    await this.click(payBookingFeeButton);
  }
  async acceptAuctionTerms() {
    await this.page
      .getByRole('checkbox', {
        name: 'أؤكد قراءتي وفهمي وموافقتي على الشروط والأحكام',
      })
      .check();
  }
  async signMohLandBookingContract(otp = ['1', '2', '3', '4']) {
    await this.page
      .getByRole('checkbox', {
        name: 'لقد قرأت وفهمت الشروط والأحكام الخاصة بالعقد *',
      })
      .check();
    await this.page.getByRole('button', { name: 'قبول وتوقيع' }).click();
    const otpInputs = this.page.getByRole('textbox', { name: '-' });
    for (let index = 0; index < otp.length; index++) {
      await otpInputs.nth(index).fill(otp[index]);
    }
    await this.page.getByRole('button', { name: 'تحقق' }).click();
    await this.page.getByRole('button', { name: 'إغلاق' }).click();
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
    await this.page.getByRole('button', { name: 'إغلاق' }).click();
  }
  async clickOnApproveButton() {
    const approveButton = this.page.locator(UnitBookingObjects_1.UnitBookingObjects.approveButton.xpath);
    await (0, test_1.expect)(approveButton).toBeVisible({ timeout: 90000 });
    await approveButton.click();
  }
  async enterOtp(otp = ['1', '2', '3', '4']) {
    const otpCode = this.page.locator(UnitBookingObjects_1.UnitBookingObjects.otpCode.xpath);
    for (let index = 0; index < otp.length; index++) {
      await otpCode.nth(index).fill(otp[index]);
    }
  }
  async clickOnVerifyButton() {
    const verifyButton = this.page.locator(UnitBookingObjects_1.UnitBookingObjects.verifyButton.xpath);
    await (0, test_1.expect)(verifyButton).toBeVisible({ timeout: 90000 });
    await verifyButton.click();
  }
  async clickOnDoneButton() {
    const doneButton = this.page.locator(UnitBookingObjects_1.UnitBookingObjects.doneButton.xpath);
    await (0, test_1.expect)(doneButton).toBeVisible({ timeout: 90000 });
    await doneButton.click();
  }
  async expectSalesContractSuccess() {
    const { expect } = require('@playwright/test');
    await expect(this.page.getByRole('heading', { name: 'تهانينا' })).toBeVisible();
  }
}
exports.UnitBookingPage = UnitBookingPage;
