'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UnitDetailsPage = void 0;
// @ts-nocheck
const UnitDetailsObjects_1 = require('@objects/UnitDetailsObjects');
const test_1 = require('@playwright/test');
class UnitDetailsPage {
  constructor(page) {
    this.page = page;
  }
  async click(locator) {
    await locator.click();
  }
  async check(locator) {
    await locator.check();
  }
  async reserveUnit() {
    const reserveButton = this.page.getByRole(UnitDetailsObjects_1.UnitDetailsObjects.reserveButton.role, { name: UnitDetailsObjects_1.UnitDetailsObjects.reserveButton.name });
    await this.page.waitForTimeout(3000);
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(2000);
    await reserveButton.waitFor({ state: 'visible', timeout: 30000 });
    await this.click(reserveButton);
  }
  async openSalesContract() {
    const contractHeading = this.page.getByRole('heading', {
      name: 'توقيع عقد البيع',
      exact: true,
    });
    await (0, test_1.expect)(contractHeading).toBeVisible({ timeout: 12000 });
    // await contractHeading.waitFor({ state: "visible", timeout: 120000 });
    // await expect(contractHeading).toBeVisible({ timeout: 120000 });
    await this.page.waitForTimeout(12000);
    await contractHeading.click();
  }
  async approveSalesContract(otp = ['1', '2', '3', '4']) {
    await this.page.getByRole('button', { name: 'اعتماد' }).click();
    const otpInputs = this.page.getByRole('textbox');
    for (let index = 0; index < otp.length; index++) {
      await otpInputs.nth(index).fill(otp[index]);
    }
    await this.page.getByRole('button', { name: 'تحقق', exact: true }).click();
    await this.page.getByRole('button', { name: 'إغلاق' }).click();
  }
  async validateUnavailableMessage() {
    const unavailableMessageLocator = this.page.locator("//app-offplan-buttons-tpl//span[text()='هذا المشروع غير متاح للحجز حالياً']");
    try {
      await (0, test_1.expect)(unavailableMessageLocator).toBeVisible({ timeout });
      return true;
    } catch (error) {
      return false;
    }
  }
}
exports.UnitDetailsPage = UnitDetailsPage;
