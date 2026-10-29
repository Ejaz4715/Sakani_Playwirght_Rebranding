'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OffersPage = void 0;
const OffersObjects_1 = require('@objects/OffersObjects');
const DEFAULT_TIMEOUT = 30_000;
class OffersPage {
  constructor(page) {
    this.page = page;
  }
  async openSakaniOffers() {
    const offersLink = this.page.getByRole(OffersObjects_1.OffersObjects.sakaniOffers.role, { name: OffersObjects_1.OffersObjects.sakaniOffers.name });
    await this.page.locator(OffersObjects_1.OffersObjects.servicesButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(OffersObjects_1.OffersObjects.servicesButton).hover();
    await offersLink.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await offersLink.click();
    await this.page.waitForTimeout(2000);
  }
  sortByButton() {
    return this.page.getByRole(OffersObjects_1.OffersObjects.sortByButton.role, { name: OffersObjects_1.OffersObjects.sortByButton.name });
  }
  sortOption(option) {
    return this.page.locator('button').filter({ hasText: option });
  }
  // Opens "ترتيب حسب" and selects the given option (e.g. "من الأحدث إلى الأقدم")
  async sortOffersBy(option) {
    await this.sortByButton().click();
    await this.sortOption(option).click();
  }
  // Reopens "ترتيب حسب" and checks the given option is the selected one
  async isSortOptionSelected(option) {
    await this.sortByButton().click();
    await this.sortOption(option).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    const isSelected = (await this.sortOption(option).getAttribute('aria-selected')) === 'true';
    await this.page.keyboard.press('Escape');
    return isSelected;
  }
  // ---------- Filters ----------
  filterResultsButton() {
    return this.page.getByRole(OffersObjects_1.OffersObjects.filterResultsButton.role, { name: OffersObjects_1.OffersObjects.filterResultsButton.name });
  }
  filterOption(option) {
    return this.page.getByRole('dialog').getByRole('button', { name: option, exact: true });
  }
  async openFilters() {
    await this.filterResultsButton().click();
    await this.page.getByRole('dialog').waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
  }
  // Selects every given option in the filters dialog (e.g. "التسوق", "أونلاين")
  async selectFilterOptions(options) {
    for (const option of options) {
      await this.filterOption(option).click();
    }
  }
  async isFilterOptionSelected(option) {
    return (await this.filterOption(option).getAttribute('aria-pressed')) === 'true';
  }
  // Clicks "بحث" and waits for the filters dialog to close
  async searchWithFilters() {
    await this.page.getByRole('dialog').getByRole(OffersObjects_1.OffersObjects.filterSearchButton.role, { name: OffersObjects_1.OffersObjects.filterSearchButton.name }).click();
    await this.page.getByRole('dialog').waitFor({ state: 'hidden', timeout: DEFAULT_TIMEOUT });
  }
  // Clicks "مسح" inside the filters dialog
  async clearFilters() {
    await this.page.getByRole('dialog').getByRole(OffersObjects_1.OffersObjects.clearFiltersButton.role, { name: OffersObjects_1.OffersObjects.clearFiltersButton.name }).click();
  }
  // "تصفية النتائج" when no filters are applied, "تصفية النتائج (4)" after applying 4 filters
  async getFilterResultsButtonText() {
    await this.filterResultsButton().waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return (await this.filterResultsButton().innerText()).trim();
  }
}
exports.OffersPage = OffersPage;
