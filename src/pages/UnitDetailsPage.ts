import { UnitBookingObjects } from '@objects/UnitBookingObjects';
import { UnitDetailsObjects } from '@objects/UnitDetailsObjects';
import { expect, Page } from '@playwright/test';

export class UnitDetailsPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async reserveUnit() {
    const reserveButton = this.page.getByRole(UnitDetailsObjects.reserveButton.role, { name: UnitDetailsObjects.reserveButton.name });
    await this.page.waitForTimeout(3000);
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(2000);
    await reserveButton.waitFor({ state: 'visible', timeout: 30000 });
    await reserveButton.click();
  }

  async clickSignSalesContract() {
    const signContractButton = this.page.getByRole('link', {
      name: 'توقيع العقد',
    });
    await expect(signContractButton).toBeVisible({ timeout: 12000 });
    await this.page.waitForTimeout(12000);
    await signContractButton.click();
  }

  async clickSignAnnex() {
    const signAnnexButton = this.page.getByRole('button', { name: 'توقيع الملحق' });
    await expect(signAnnexButton).toBeVisible({ timeout: 12000 });
    await this.page.waitForTimeout(12000);
    await signAnnexButton.click();
  }

  async validateUnavailableMessage() {
    const unavailableMessageLocator = this.page.locator("//app-offplan-buttons-tpl//span[text()='هذا المشروع غير متاح للحجز حالياً']");
    try {
      await expect(unavailableMessageLocator).toBeVisible({ timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async viewAnnexContract() {
    const viewAnnexContractButton = this.page.locator(UnitBookingObjects.viewAnnexContractPDF.xpath);
    await expect(viewAnnexContractButton).toBeVisible({ timeout: 12000 });
    await viewAnnexContractButton.click();
    const annexHeading = this.page.getByRole(UnitBookingObjects.viewAnnexPopupHeading.role, { name: UnitBookingObjects.viewAnnexPopupHeading.name });
    await expect(annexHeading).toBeVisible({ timeout: 10000 });
  }

  async closeAnnexContractViewer() {
    const closeAnnexContractButton = this.page.locator(UnitBookingObjects.closeAnnexPDFButton.xpath);
    await expect(closeAnnexContractButton).toBeVisible({ timeout: 12000 });
    await closeAnnexContractButton.click();
    await this.page.waitForTimeout(3000);
    const annexHeading = this.page.getByRole(UnitBookingObjects.viewAnnexPopupHeading.role, { name: UnitBookingObjects.viewAnnexPopupHeading.name });
    await expect(annexHeading).not.toBeVisible({ timeout: 10000 });
  }
}
