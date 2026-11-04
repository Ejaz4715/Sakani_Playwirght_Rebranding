// @ts-nocheck
import { UnitBookingObjects } from '@objects/UnitBookingObjects';
import { expect, Page } from '@playwright/test';

export class UnitBookingPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async click(locator) {
    await locator.click();
  }

  async check(locator) {
    await locator.check();
  }

  async acceptTermsAndConfirm() {
    const termsCheckbox = this.page.locator(UnitBookingObjects.termsCheckbox);
    await this.click(termsCheckbox);

    const confirmButton = this.page.getByRole(UnitBookingObjects.confirmButton.role, { name: UnitBookingObjects.confirmButton.name });
    await this.click(confirmButton);

    const payBookingFeeButton = this.page.getByRole(UnitBookingObjects.payBookingFeeButton.role, { name: UnitBookingObjects.payBookingFeeButton.name });
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
    // Wait until the sales contract page is loaded (the contract document is loaded and اعتماد is enabled) before approving
    await this.page.waitForLoadState('load');
    await this.page.waitForLoadState('networkidle', { timeout: 60000 }).catch(() => {});
    const approveButton = this.page.getByRole('button', { name: 'اعتماد' });
    await expect(approveButton).toBeVisible({ timeout: 90000 });
    // The contract can fail to load (لا يمكن للنظام تحميل عقد البيع، يرجى تحديث الصفحة) and اعتماد stays disabled, so refresh the page until it is enabled
    for (let attempt = 0; attempt < 5 && !(await approveButton.isEnabled()); attempt++) {
      if (await this.page.getByText(UnitBookingObjects.contractLoadErrorText).isVisible()) {
        await this.page.reload();
        await this.page.waitForLoadState('networkidle', { timeout: 60000 }).catch(() => {});
      }
      await expect(approveButton)
        .toBeEnabled({ timeout: 30000 })
        .catch(() => {});
    }
    await expect(approveButton).toBeEnabled({ timeout: 30000 });
    await approveButton.click();
    const otpInputs = this.page.getByRole('textbox');
    await otpInputs.first().waitFor({ state: 'visible', timeout: 30000 });
    // On pre-beta the OTP can be filled and verified automatically (the inputs are disabled), then don't type it again
    if (await otpInputs.first().isEditable()) {
      for (let index = 0; index < otp.length; index++) {
        await otpInputs.nth(index).fill(otp[index]);
      }
      await this.page.getByRole('button', { name: 'تحقق', exact: true }).click();
    }
    await this.page.waitForTimeout(7000);
    // Wait until the page is loaded after verifying the OTP
    await this.page.waitForLoadState('networkidle', { timeout: 60000 }).catch(() => {});
    // The page can show خطأ تقني instead of the success popup while the contract is signed, then there is no إغلاق button
    const closeButton = this.page.getByRole('button', { name: 'إغلاق' });
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }
  }

  async expectSalesContractSuccess() {
    const { expect } = require('@playwright/test');
    await expect(this.page.getByRole('heading', { name: 'تهانينا' })).toBeVisible();
  }
}
