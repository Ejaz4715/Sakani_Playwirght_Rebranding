import { Page } from '@playwright/test';
import { OffersObjects } from '@objects/OffersObjects';
import { ConveyanceObjects } from '@objects/ConveyanceObjects';

const DEFAULT_TIMEOUT = 30_000;

export class ConveyancePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openConveyancePage() {
    const conveyance = this.page.getByRole(ConveyanceObjects.conveyancePageLink.role, { name: ConveyanceObjects.conveyancePageLink.name });
    await this.page.locator(ConveyanceObjects.servicesButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ConveyanceObjects.servicesButton).hover();
    await conveyance.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await conveyance.click();
    await this.page.waitForTimeout(2000);
  }

  async isConveyancePageVisible() {
    await this.page.locator(ConveyanceObjects.conveyanceHeaderText).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await this.page.locator(ConveyanceObjects.conveyanceHeaderText).isVisible();
  }

  async startService() {
    await this.page.getByRole(ConveyanceObjects.startServiceButton.role, { name: ConveyanceObjects.startServiceButton.name }).click();
  }

  // Shown after starting the service when the user has no active booking: "عذراً - لايوجد لديك حجز نشط"
  async isNoActiveBookingMessageVisible() {
    const title = this.page.getByText(ConveyanceObjects.noActiveBookingTitle, { exact: true });
    const message = this.page.getByText(ConveyanceObjects.noActiveBookingMessage, { exact: true });
    await message.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return (await title.isVisible()) && (await message.isVisible());
  }

  // Profile > أنشطتي > خدمة إفراغ الأراضي
  async openConveyanceActivities() {
    await this.page.getByText(ConveyanceObjects.myActivitiesMenuItem, { exact: true }).click();
    await this.page.getByText(ConveyanceObjects.conveyanceActivity, { exact: true }).click();
  }

  async openRequestsTab(tabName: string) {
    await this.page.getByRole('tab', { name: tabName, exact: true }).click();
  }

  async isRequestsTabSelected(tabName: string) {
    const tab = this.page.getByRole('tab', { name: tabName, exact: true });
    await tab.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return (await tab.getAttribute('aria-selected')) === 'true';
  }
}
