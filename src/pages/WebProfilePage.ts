import { expect, Page } from '@playwright/test';
import { WebProfileObjects } from '@objects/WebProfile';

const DEFAULT_TIMEOUT = 30_000;
const LONG_TIMEOUT = 90_000;

export class WebProfilePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Favorites filter tabs
  async clickDestinationsTab() {
    const destinationsTab = this.page.getByRole(WebProfileObjects.destinationsTab.role, { name: WebProfileObjects.destinationsTab.name, exact: WebProfileObjects.destinationsTab.exact });
    await destinationsTab.waitFor({ state: 'visible', timeout: LONG_TIMEOUT });
    await destinationsTab.click();
  }

  async clickProjectsTab() {
    const projectsTab = this.page.getByText(WebProfileObjects.projectsTab.text, { exact: true }).first();
    await projectsTab.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await projectsTab.click();
  }

  async clickUnitModelsTab() {
    const unitModelsTab = this.page.getByText(WebProfileObjects.unitModelsTab.text, { exact: true }).first();
    await unitModelsTab.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await unitModelsTab.click();
  }

  async clickUnitsTab() {
    const unitsTab = this.page.getByText(WebProfileObjects.unitsTab.text, { exact: true }).first();
    await unitsTab.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await unitsTab.click();
  }

  async clickServicesTab() {
    const servicesTab = this.page.getByText(WebProfileObjects.servicesTab.text, { exact: true }).first();
    await servicesTab.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await servicesTab.click();
  }

  async verifyEmptyMessageOrItemsDisplayed() {
    const emptyMessage = this.page.getByText(WebProfileObjects.emptyFavoritesMessage.text, { exact: true }).first();
    const items = this.page.locator(WebProfileObjects.favoriteItemCard).first();
    await expect(emptyMessage.or(items).first()).toBeVisible({ timeout: DEFAULT_TIMEOUT });

    if (await items.isVisible()) {
      await expect(items).toBeVisible();
    } else {
      await expect(emptyMessage).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    }
  }

  // Clicks التفضيلات from the profile side menu
  async navigateToPreferences() {
    const preferences = this.page.getByText(WebProfileObjects.preferencesText.text, { exact: true }).first();
    await preferences.waitFor({ state: 'visible', timeout: LONG_TIMEOUT });
    await preferences.click();
  }

  async navigateToInterestRegistered() {
    const interestRegistered = this.page.getByText(WebProfileObjects.interestRegisteredText.text, { exact: true }).first();
    await interestRegistered.waitFor({ state: 'visible', timeout: LONG_TIMEOUT });
    await interestRegistered.click();
  }

  // Clicks أنشطتي from the profile side menu
  async navigateToMyActivities() {
    const myActivities = this.page.getByText(WebProfileObjects.myActivities.text, { exact: true }).first();
    await myActivities.waitFor({ state: 'visible', timeout: LONG_TIMEOUT });
    await myActivities.click();
  }

  async navigateToinregisteredWaitingList() {
    const myActivities = this.page.getByText(WebProfileObjects.registeredWaitingList.text, { exact: true }).first();
    await myActivities.waitFor({ state: 'visible', timeout: LONG_TIMEOUT });
    await myActivities.click();
  }

  // Waiting list tabs
  async clickWaitingListActiveTab() {
    const activeTab = this.page.getByText(WebProfileObjects.waitingListActiveTab.text, { exact: true }).first();
    await activeTab.waitFor({ state: 'visible', timeout: LONG_TIMEOUT });
    await activeTab.click();
  }

  async clickWaitingListCancelledTab() {
    const cancelledTab = this.page.getByText(WebProfileObjects.waitingListCancelledTab.text, { exact: true }).first();
    await cancelledTab.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await cancelledTab.click();
  }

  async verifyNoActiveWaitingListMessageOrItemsDisplayed() {
    const emptyMessage = this.page.getByText(WebProfileObjects.noActiveWaitingListMessage.text, { exact: true }).first();
    const items = this.page.locator(WebProfileObjects.favoriteItemCard).first();
    await expect(emptyMessage.or(items).first()).toBeVisible({ timeout: DEFAULT_TIMEOUT });

    if (await items.isVisible()) {
      await expect(items).toBeVisible();
    } else {
      await expect(emptyMessage).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    }
  }

  async verifyNoCancelledWaitingListMessageOrItemsDisplayed() {
    const emptyMessage = this.page.getByText(WebProfileObjects.noCancelledWaitingListMessage.text, { exact: true }).first();
    const items = this.page.locator(WebProfileObjects.favoriteItemCard).first();
    await expect(emptyMessage.or(items).first()).toBeVisible({ timeout: DEFAULT_TIMEOUT });

    if (await items.isVisible()) {
      await expect(items).toBeVisible();
    } else {
      await expect(emptyMessage).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    }
  }

  //Register intrested tabs
  async clickInterestedDestinationsTab() {
    const destinationsTab = this.page.getByText(WebProfileObjects.interestedDestinationsText.text, { exact: true }).first();
    await destinationsTab.waitFor({ state: 'visible', timeout: LONG_TIMEOUT });
    await destinationsTab.click();
  }

  async clickRealEstateBrokersTab() {
    const realEstateBrokersTab = this.page.locator(WebProfileObjects.realEstateBrokersXPath.xpath).first();
    await realEstateBrokersTab.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await realEstateBrokersTab.click();
  }

  async clickInterestedProjectsTab() {
    const projectsTab = this.page.getByText(WebProfileObjects.interestedProjectsText.text, { exact: true }).first();
    await projectsTab.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await projectsTab.click();
  }

  async clickDevelopersTab() {
    const developersTab = this.page.getByText(WebProfileObjects.developersText.text, { exact: true }).first();
    await developersTab.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await developersTab.click();
  }

  // If the "no interested items" message is displayed assert it, otherwise the tab has items, so assert they are displayed
  async verifyNoInterestedItemsMessageOrItemsDisplayed() {
    const emptyMessage = this.page.getByText(WebProfileObjects.noInterestedItemsMessage.text, { exact: true }).first();
    const items = this.page.locator(WebProfileObjects.favoriteItemCard).first();
    await expect(emptyMessage.or(items).first()).toBeVisible({ timeout: DEFAULT_TIMEOUT });

    if (await items.isVisible()) {
      await expect(items).toBeVisible();
    } else {
      await expect(emptyMessage).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    }
  }
}
