'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.RecommendationsPage = void 0;
const test_1 = require('@playwright/test');
const RecommendationsObjects_1 = require('@objects/RecommendationsObjects');
const DEFAULT_TIMEOUT = 30_000;
class RecommendationsPage {
  constructor(page) {
    this.page = page;
  }
  async clickOnRecommendations() {
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.recommendationsLink).waitFor({ timeout: DEFAULT_TIMEOUT });
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.recommendationsLink).click();
  }
  async openRecommendationsForm() {
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.recommendationsFormLink).waitFor({ timeout: DEFAULT_TIMEOUT });
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.recommendationsFormLink).click();
  }
  async selectFirstRegion() {
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.regionTextField).waitFor({ timeout: DEFAULT_TIMEOUT });
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.regionTextField).click();
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.firstOptionFromDropdownMenus).click();
  }
  async selectFirstCity() {
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.cityTextField).waitFor({ timeout: DEFAULT_TIMEOUT });
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.cityTextField).click();
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.firstOptionFromDropdownMenus).click();
  }
  async selectDistrict() {
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.districtTextField).waitFor({ timeout: DEFAULT_TIMEOUT });
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.districtTextField).click();
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.firstOptionFromDropdownMenus).click();
  }
  async selectProjectType(projectType = 'وحدات جاهزة') {
    const { role, name } = RecommendationsObjects_1.RecommendationsObjects.selectProjectType(projectType);
    await this.selectChip(this.page.getByRole(role, { name }));
  }
  async selectUnitType(unitType = 'شقة') {
    const { role, name } = RecommendationsObjects_1.RecommendationsObjects.selectUnitType(unitType);
    await this.selectChip(this.page.getByRole(role, { name }));
  }
  async selectBedRoomsNumber(bedRoomsNumber = 3) {
    await this.selectChip(this.page.locator(RecommendationsObjects_1.RecommendationsObjects.selectNumberOfBedrooms(bedRoomsNumber)));
  }
  async selectBathroomsNumber(bathroomsNumber = 3) {
    await this.selectChip(this.page.locator(RecommendationsObjects_1.RecommendationsObjects.selectNumberOfBathrooms(bathroomsNumber)));
  }
  async clickOnSave() {
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.saveButton).waitFor({ timeout: DEFAULT_TIMEOUT });
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.saveButton).click();
  }
  async isPreferenceSavedSuccessfully() {
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.preferenceSaveStatusText).waitFor({ timeout: DEFAULT_TIMEOUT });
    return await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.preferenceSaveStatusText).isVisible();
  }
  async setMinimumPrice(price = 100000) {
    const label = this.page.getByText(RecommendationsObjects_1.RecommendationsObjects.minimumPriceLabel, { exact: true });
    const priceField = this.page.locator('div').filter({ has: label }).last().getByRole('textbox');
    await priceField.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await priceField.fill(String(price));
    await priceField.blur();
  }
  async clickOnContinue() {
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.continueButton).waitFor({ timeout: DEFAULT_TIMEOUT });
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.continueButton).click();
  }
  async selectChip(chip) {
    await chip.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    const classes = (await chip.getAttribute('class')) ?? '';
    if (!classes.split(/\s+/).includes('active')) {
      await chip.click();
    }
    await (0, test_1.expect)(chip).toHaveClass(/\bactive\b/, { timeout: DEFAULT_TIMEOUT });
  }
  async clickOnForYou() {
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.forYouButton).waitFor({ timeout: DEFAULT_TIMEOUT });
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.forYouButton).click();
  }
  async isGuestRecommendationCardVisible() {
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.guestRecommendationText).waitFor({ timeout: DEFAULT_TIMEOUT });
    return await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.guestRecommendationText).isVisible();
  }
  async enterNationalId(nationalId) {
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.nationalIdTextField).waitFor({ timeout: DEFAULT_TIMEOUT });
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.nationalIdTextField).fill(nationalId);
  }
  async clickOnSearch() {
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.searchButton).waitFor({ timeout: DEFAULT_TIMEOUT });
    await this.page.locator(RecommendationsObjects_1.RecommendationsObjects.searchButton).click();
    await this.page.waitForTimeout(2000);
  }
}
exports.RecommendationsPage = RecommendationsPage;
