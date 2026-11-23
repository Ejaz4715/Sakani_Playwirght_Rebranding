import { Page, expect, Locator } from '@playwright/test';
import { CommonMethods } from '@pages/utils/CommonMethods';
import { ApplicationPendingPopupObjects } from '@objects/ApplicationPendingPopupObjects';

export class ApplicationPendingPopupPage {
  page: Page;
  defaultTimeout: number | undefined;

  readonly commonMethod: CommonMethods;

  constructor(page: Page) {
    this.page = page;
    this.commonMethod = new CommonMethods(page);
  }
  async clickOnBookings() {
    // await this.commonMethod.clickElement();
  }
}
