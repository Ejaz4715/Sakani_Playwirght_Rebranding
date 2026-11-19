import { expect, Locator, Page } from '@playwright/test';
import { PaymentConfirmationObjects } from '@objects/PaymentConfirmationObjects';

export class PaymentConfirmationPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async click(locator: any) {
    await expect(locator).toBeVisible({ timeout: 90000 });
    await locator.click();
  }

  async check(locator: any) {
    await expect(locator).toBeVisible({ timeout: 90000 });
    await locator.check();
  }

  async closePayment() {
    const closeButton = this.page.locator(PaymentConfirmationObjects.closeButton.xpath);
    await this.click(closeButton);
  }

  async expectSuccessMessage() {
    const successMessage = this.page.locator(PaymentConfirmationObjects.successMessage.xpath);
    await expect(successMessage).toBeVisible();
  }
}
