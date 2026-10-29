'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.SalesChannel_TargetAudiencePage = void 0;
const SalesChannels_TargetAudienceObjects_1 = require('@objects/SalesChannels_TargetAudienceObjects');
const path = require('path');
const DEFAULT_TIMEOUT = 30_000;
const LONG_TIMEOUT = 90_000;
class SalesChannel_TargetAudiencePage {
  constructor(page) {
    this.page = page;
    this.defaultTimeout = 60000;
  }
  async clickOnAdvancedSearch() {
    await this.page.getByText(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.advancedSearchButton).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.getByText(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.advancedSearchButton).click();
  }
  async clickOnUnitDetails() {
    const unitDetailsButton = this.page.getByRole(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.unitDetailsButton.role, {
      name: SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.unitDetailsButton.name,
    });
    await unitDetailsButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await unitDetailsButton.click();
  }
  async clickOnSearch() {
    const unitDetailsButton = this.page.getByRole(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.searchButton.role, {
      name: SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.searchButton.name,
    });
    await unitDetailsButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await unitDetailsButton.click();
    await this.page.waitForTimeout(3000);
  }
  async checkCheckbox(selector) {
    const checkbox = this.page.locator(selector);
    await checkbox.waitFor({ state: 'attached', timeout: DEFAULT_TIMEOUT });
    await checkbox.check({ force: true });
  }
  async selectMobileSalesChannel() {
    await this.checkCheckbox(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.mobileSalesChannel);
  }
  async selectOpsTeamSalesChannel() {
    await this.checkCheckbox(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.opsTeamSalesChannel);
  }
  async selectPartnerSalesChannel() {
    await this.checkCheckbox(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.partnerSalesChannel);
  }
  async selectThirdPartySalesChannel() {
    await this.checkCheckbox(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.thirdPartySalesChannel);
  }
  async selectWebSalesChannel() {
    await this.checkCheckbox(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.webSalesChannel);
  }
  async selectBeneficiaryTargetAudience() {
    await this.checkCheckbox(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.beneficiaryTargetAudience);
  }
  async selectCharityTargetAudience() {
    await this.checkCheckbox(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.charityTargetAudience);
  }
  async selectCompanyTargetAudience() {
    await this.checkCheckbox(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.companyTargetAudience);
  }
  async selectNonBeneficiaryTargetAudience() {
    await this.checkCheckbox(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.nonBeneficiaryTargetAudience);
  }
  async selectTanmwiTargetAudience() {
    await this.checkCheckbox(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.tanmwiTargetAudience);
  }
  async isSearchResultsTableVisible() {
    await this.page.locator(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.searchResultsTable).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await this.page.locator(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.searchResultsTable).isVisible();
  }
  async selectSearchUsingUnitCode() {
    await this.page.locator(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.searchItemsSelector).first().waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.searchItemsSelector).first().click();
    await this.page.locator(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.unitCodeOptionSelector).first().waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.unitCodeOptionSelector).first().click();
  }
  async fillUnitCode(unitCode) {
    await this.page.locator(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.unitCodeField).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.unitCodeField).fill(unitCode);
  }
  async isSearchResultEmpty() {
    await this.page.locator(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.emptyResultsTable).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await this.page.locator(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.emptyResultsTable).isVisible();
  }
  async isBookingNotAvailable() {
    await this.page.locator(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.noBookingText).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await this.page.locator(SalesChannels_TargetAudienceObjects_1.SalesChannels_TargetAudienceObjects.noBookingText).isVisible();
  }
}
exports.SalesChannel_TargetAudiencePage = SalesChannel_TargetAudiencePage;
