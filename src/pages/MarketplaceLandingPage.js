'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.MarketplaceLandingPage = void 0;
// @ts-nocheck
const path = require('path');
const test_1 = require('@playwright/test');
const MarketplaceLandingObjects_1 = require('@objects/MarketplaceLandingObjects');
class MarketplaceLandingPage {
  constructor(page) {
    this.DEFAULT_TIMEOUT = 30_000;
    this.page = page;
  }
  async click(locator) {
    await locator.click();
  }
  async check(locator) {
    await locator.check();
  }
  async openSearch() {
    const searchButton = this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.searchButton.xpath);
    await this.click(searchButton);
  }
  async searchForProject(projectName) {
    const searchInput = this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.searchInput.xpath);
    await searchInput.fill(projectName);
    const projectResult = this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.projectResultModal).getByText(projectName, { exact: true });
    await this.click(projectResult);
  }
  async clickSearchedResultIfTextMatches(expectedText) {
    const searchInput = this.page.getByRole(MarketplaceLandingObjects_1.MarketplaceLandingObjects.searchInput.role, { name: MarketplaceLandingObjects_1.MarketplaceLandingObjects.searchInput.name });
    await searchInput.fill(expectedText);
    const searchedResult = this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.searchedResutl.xpath);
    await (0, test_1.expect)(searchedResult).toHaveText(expectedText);
    await searchedResult.click();
  }
  async openReadyMadeUniy() {
    const readyMadeUnitCard = this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.readyMadeUnitCard.xpath).first();
    await (0, test_1.expect)(readyMadeUnitCard).toBeVisible({ timeout: 90000 });
    await readyMadeUnitCard.click();
  }
  async openResidentialUnit() {
    const unit = this.page.locator("//app-marketplace-unit-model-card-v6/descendant::span[text() ='SAR']").first();
    await unit.waitFor({ state: 'visible', timeout: 30000 });
    await unit.click();
  }
  async expandProfileDropDownMenu() {
    await this.page.waitForTimeout(1000);
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.profileDropDown).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.profileDropDown).click();
    await this.page.waitForTimeout(1000);
  }
  async openProfileManagement() {
    await this.expandProfileDropDownMenu();
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.profileManagement).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.profileManagement).click();
    await this.page.waitForTimeout(1000);
  }
  async clickOnNews() {
    await this.page.keyboard.press('PageDown');
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.news).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.news).click();
    await this.page.waitForTimeout(3000);
  }
  async clickOnServices() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.services).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.services).click();
    await this.page.waitForTimeout(3000);
  }
  async clickOnAllServices() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.allServicesButton).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.allServicesButton).click();
    await this.page.waitForTimeout(3000);
  }
  async clickOnEligibilityCheckerLink() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.eligibilityCheckerLink).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.eligibilityCheckerLink).click();
    await this.page.waitForTimeout(3000);
  }
  async clickOnRealStateTaxExemptionLink() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.realStateTaxExemptionLink).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.realStateTaxExemptionLink).click();
    await this.page.waitForTimeout(3000);
  }
  async clickOnFinancialAdvisoryLink() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.financialAdvisoryLink).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.financialAdvisoryLink).click();
    await this.page.waitForTimeout(3000);
  }
  async clickOnTermsAndConditionsLink() {
    await this.page.keyboard.press('PageDown');
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.termsAndConditionsLink).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.termsAndConditionsLink).click();
    await this.page.waitForTimeout(3000);
  }
  async clickOnExecutiveRegulationLink() {
    await this.page.keyboard.press('PageDown');
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.executiveRegulationLink).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.executiveRegulationLink).click();
    await this.page.waitForTimeout(3000);
  }
  async clickOnSupportAndHelpLink() {
    await this.page.keyboard.press('PageDown');
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.supportAndHelpLink).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.supportAndHelpLink).click();
    await this.page.waitForTimeout(3000);
  }
  async clickOnSupportAndHelpFAQLink() {
    await this.page.keyboard.press('PageDown');
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.supportAndHelpFAQLink).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.supportAndHelpFAQLink).click();
    await this.page.waitForTimeout(3000);
  }
  async clickOnOffPlanProjectsProductLink() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.offPlanProjectsProductLink).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.offPlanProjectsProductLink).click();
    await this.page.waitForTimeout(3000);
  }
  async clickOnReadyUnitsProductLink() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.readyUnitsProductLink).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.readyUnitsProductLink).click();
    await this.page.waitForTimeout(3000);
  }
  async clickOnLandsProductLink() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.landsProductLink).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.landsProductLink).click();
    await this.page.waitForTimeout(3000);
  }
  async isOffPlanProductPageVisible() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.offPlanProductHeaderText).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    return await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.offPlanProductHeaderText).isVisible();
  }
  async isReadyUnitsProductPageVisible() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.readyUnitProductHeaderText).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    return await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.readyUnitProductHeaderText).isVisible();
  }
  async isLandsProductPageVisible() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.landsProductHeaderText).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    return await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.landsProductHeaderText).isVisible();
  }
  async searchFor(searchQuery) {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.searchTextField).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.searchTextField).fill(searchQuery);
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.searchIcon).click();
  }
  async isSearchResultsCardVisible() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.searchResultsCard).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.searchResultsCard).isVisible();
  }
  async getSearchResultsCardText() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.searchResultsCardText).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.searchResultsCardText).textContent();
  }
  async clickFinancingShowMore() {
    await this.page
      .locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.financingShowMore.container)
      .getByText(MarketplaceLandingObjects_1.MarketplaceLandingObjects.financingShowMore.text, { exact: true })
      .click();
  }
  async expectUpdateProjectNameIsVisible(name) {
    const bankName = await this.page.locator('#financing').getByText(name, { exact: true });
    await (0, test_1.expect)(bankName, 'The update bank is not present in the project details page').toBeVisible({ timeout: 20000 });
  }
  async isDestinationSectionVisible() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.destinationSection).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.destinationSection).isVisible();
  }
  async isInsightsAndTrendsSectionVisible() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.insightsAndTrendsSection).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.insightsAndTrendsSection).isVisible();
  }
  async clickOnTheFirstDestinationCard() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.firstDestinationCard).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.firstDestinationCard).click();
  }
  async getFirstDestinationCardName() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.firstDestinationCardName).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return (await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.firstDestinationCardName).innerText()).trim();
  }
  async getActiveDestinationCardName() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.activeDestinationCardName).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return (await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.activeDestinationCardName).innerText()).trim();
  }
  async getFirstDestinationCardUrl() {
    return await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.firstDestinationCardLink).getAttribute('href');
  }
  async openFirstDestinationCardInNewTab() {
    const context = this.page.context();
    const pagesBefore = context.pages().length;
    const marketplaceUrl = this.page.url();
    const [newTab] = await Promise.all([context.waitForEvent('page', { timeout: this.DEFAULT_TIMEOUT }), this.clickOnTheFirstDestinationCard()]);
    await newTab.waitForLoadState('domcontentloaded');
    (0, test_1.expect)(context.pages().length, 'Exactly one new tab should be opened').toBe(pagesBefore + 1);
    (0, test_1.expect)(this.page.url(), 'The marketplace tab should stay on the same page').toBe(marketplaceUrl);
    return newTab;
  }
  async isProjectVisibleInTab(tab, projectName) {
    const projectTitle = tab.getByText(projectName).first();
    await projectTitle.waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return await projectTitle.isVisible();
  }
  async closeTab(tab) {
    const context = this.page.context();
    const pagesBefore = context.pages().length;
    await tab.close();
    (0, test_1.expect)(context.pages().length, 'The project tab should be closed').toBe(pagesBefore - 1);
    await this.page.bringToFront();
  }
  async slideToLeft() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.leftSliderIcon).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.leftSliderIcon).click();
    await this.page.waitForTimeout(3000);
  }
  async slideToRight() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.rightSliderIcon).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.rightSliderIcon).click();
    await this.page.waitForTimeout(3000);
  }
  async filterProjectsBy(option) {
    await this.page
      .getByRole(MarketplaceLandingObjects_1.MarketplaceLandingObjects.filterResultsButton.role, { name: MarketplaceLandingObjects_1.MarketplaceLandingObjects.filterResultsButton.name })
      .click();
    const filterDialog = this.page.getByRole('dialog');
    await filterDialog.getByRole('button', { name: option, exact: true }).click();
    await filterDialog
      .getByRole(MarketplaceLandingObjects_1.MarketplaceLandingObjects.filterSearchButton.role, { name: MarketplaceLandingObjects_1.MarketplaceLandingObjects.filterSearchButton.name })
      .click();
    await filterDialog.waitFor({ state: 'hidden', timeout: this.DEFAULT_TIMEOUT });
  }
  async getProjectCardsCount() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.projectCard).first().waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.projectCard).count();
  }
  async getProjectCardsText() {
    await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.projectCard).first().waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return await this.page.locator(MarketplaceLandingObjects_1.MarketplaceLandingObjects.projectCard).allInnerTexts();
  }
  async isFilterApplied(option) {
    const filterChip = this.page.getByRole('button', { name: option, exact: true }).first();
    await filterChip.waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return await filterChip.isVisible();
  }
  async sortProjectsBy(option) {
    await this.page.getByRole(MarketplaceLandingObjects_1.MarketplaceLandingObjects.sortByButton.role, { name: MarketplaceLandingObjects_1.MarketplaceLandingObjects.sortByButton.name }).click();
    await this.page.getByText(option, { exact: true }).click();
  }
  async isSortOptionSelected(option) {
    await this.page.getByRole(MarketplaceLandingObjects_1.MarketplaceLandingObjects.sortByButton.role, { name: MarketplaceLandingObjects_1.MarketplaceLandingObjects.sortByButton.name }).click();
    const sortOption = this.page.locator('button', { hasText: option });
    await sortOption.waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    const isSelected = (await sortOption.getAttribute('aria-selected')) === 'true';
    await this.page.keyboard.press('Escape');
    return isSelected;
  }
}
exports.MarketplaceLandingPage = MarketplaceLandingPage;
