// @ts-nocheck
const path = require('path');
import { expect, Page } from '@playwright/test';
import { MarketplaceLandingObjects } from '@objects/MarketplaceLandingObjects';

export class MarketplaceLandingPage {
  page: Page;
  DEFAULT_TIMEOUT = 30_000;
  constructor(page: Page) {
    this.page = page;
  }
  async click(locator) {
    await locator.click();
  }
  async check(locator) {
    await locator.check();
  }
  async openSearch() {
    const searchButton = this.page.locator(MarketplaceLandingObjects.searchButton.xpath);
    await this.click(searchButton);
  }

  async searchForProject(projectName) {
    const searchInput = this.page.locator(MarketplaceLandingObjects.searchInput.xpath);
    await searchInput.fill(projectName);
    const projectResult = this.page.locator(MarketplaceLandingObjects.projectResultModal).getByText(projectName, { exact: true });
    await this.click(projectResult);
  }

  async clickSearchedResultIfTextMatches(expectedText: string) {
    const searchInput = this.page.getByRole(MarketplaceLandingObjects.searchInput.role, { name: MarketplaceLandingObjects.searchInput.name });
    await searchInput.fill(expectedText);
    const searchedResult = this.page.locator(MarketplaceLandingObjects.searchedResutl.xpath);
    await expect(searchedResult).toHaveText(expectedText);
    await searchedResult.click();
  }

  async openReadyMadeUniy() {
    const readyMadeUnitCard = this.page.locator(MarketplaceLandingObjects.readyMadeUnitCard.xpath).first();

    await expect(readyMadeUnitCard).toBeVisible({ timeout: 90000 });
    await readyMadeUnitCard.click();
  }
  async openResidentialUnit() {
    const unit = this.page.locator("//app-marketplace-unit-model-card-v6/descendant::span[text() ='SAR']").first();
    await unit.waitFor({ state: 'visible', timeout: 30000 });
    await unit.click();
  }

  async expandProfileDropDownMenu() {
    await this.page.waitForTimeout(1000);
    await this.page.locator(MarketplaceLandingObjects.profileDropDown).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects.profileDropDown).click();
    await this.page.waitForTimeout(1000);
  }

  async openProfileManagement() {
    await this.expandProfileDropDownMenu();
    await this.page.locator(MarketplaceLandingObjects.profileManagement).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects.profileManagement).click();
    await this.page.waitForTimeout(1000);
  }

  async clickOnNews() {
    await this.page.keyboard.press('PageDown');
    await this.page.locator(MarketplaceLandingObjects.news).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects.news).click();
    await this.page.waitForTimeout(3000);
  }

  async clickOnServices() {
    await this.page.locator(MarketplaceLandingObjects.services).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects.services).click();
    await this.page.waitForTimeout(3000);
  }

  async clickOnAllServices() {
    await this.page.locator(MarketplaceLandingObjects.allServicesButton).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects.allServicesButton).click();
    await this.page.waitForTimeout(3000);
  }

  async clickOnEligibilityCheckerLink() {
    await this.page.locator(MarketplaceLandingObjects.eligibilityCheckerLink).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects.eligibilityCheckerLink).click();
    await this.page.waitForTimeout(3000);
  }

  async clickOnRealStateTaxExemptionLink() {
    await this.page.locator(MarketplaceLandingObjects.realStateTaxExemptionLink).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects.realStateTaxExemptionLink).click();
    await this.page.waitForTimeout(3000);
  }

  async clickOnFinancialAdvisoryLink() {
    await this.page.locator(MarketplaceLandingObjects.financialAdvisoryLink).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects.financialAdvisoryLink).click();
    await this.page.waitForTimeout(3000);
  }

  async clickOnTermsAndConditionsLink() {
    await this.page.keyboard.press('PageDown');
    await this.page.locator(MarketplaceLandingObjects.termsAndConditionsLink).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects.termsAndConditionsLink).click();
    await this.page.waitForTimeout(3000);
  }

  async clickOnExecutiveRegulationLink() {
    await this.page.keyboard.press('PageDown');
    await this.page.locator(MarketplaceLandingObjects.executiveRegulationLink).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects.executiveRegulationLink).click();
    await this.page.waitForTimeout(3000);
  }

  async clickOnSupportAndHelpLink() {
    await this.page.keyboard.press('PageDown');
    await this.page.locator(MarketplaceLandingObjects.supportAndHelpLink).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects.supportAndHelpLink).click();
    await this.page.waitForTimeout(3000);
  }

  async clickOnSupportAndHelpFAQLink() {
    await this.page.keyboard.press('PageDown');
    await this.page.locator(MarketplaceLandingObjects.supportAndHelpFAQLink).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(MarketplaceLandingObjects.supportAndHelpFAQLink).click();
    await this.page.waitForTimeout(3000);
  }

  async clickOnOffPlanProjectsProductLink() {
    await this.page.locator(MarketplaceLandingObjects.offPlanProjectsProductLink).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(MarketplaceLandingObjects.offPlanProjectsProductLink).click();
    await this.page.waitForTimeout(3000);
  }

  async clickOnReadyUnitsProductLink() {
    await this.page.locator(MarketplaceLandingObjects.readyUnitsProductLink).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(MarketplaceLandingObjects.readyUnitsProductLink).click();
    await this.page.waitForTimeout(3000);
  }

  async clickOnLandsProductLink() {
    await this.page.locator(MarketplaceLandingObjects.landsProductLink).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(MarketplaceLandingObjects.landsProductLink).click();
    await this.page.waitForTimeout(3000);
  }

  async isOffPlanProductPageVisible() {
    await this.page.locator(MarketplaceLandingObjects.offPlanProductHeaderText).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    return await this.page.locator(MarketplaceLandingObjects.offPlanProductHeaderText).isVisible();
  }

  async isReadyUnitsProductPageVisible() {
    await this.page.locator(MarketplaceLandingObjects.readyUnitProductHeaderText).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    return await this.page.locator(MarketplaceLandingObjects.readyUnitProductHeaderText).isVisible();
  }

  async isLandsProductPageVisible() {
    await this.page.locator(MarketplaceLandingObjects.landsProductHeaderText).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    return await this.page.locator(MarketplaceLandingObjects.landsProductHeaderText).isVisible();
  }

  async searchFor(searchQuery: string) {
    await this.page.locator(MarketplaceLandingObjects.searchTextField).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects.searchTextField).fill(searchQuery);
    await this.page.locator(MarketplaceLandingObjects.searchIcon).click();
  }

  async isSearchResultsCardVisible() {
    await this.page.locator(MarketplaceLandingObjects.searchResultsCard).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return await this.page.locator(MarketplaceLandingObjects.searchResultsCard).isVisible();
  }

  async getSearchResultsCardText() {
    await this.page.locator(MarketplaceLandingObjects.searchResultsCardText).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return await this.page.locator(MarketplaceLandingObjects.searchResultsCardText).textContent();
  }

  async clickFinancingShowMore() {
    await this.page.locator(MarketplaceLandingObjects.financingShowMore.container).getByText(MarketplaceLandingObjects.financingShowMore.text, { exact: true }).click();
  }

  async expectUpdateProjectNameIsVisible(name: string) {
    const bankName = await this.page.locator('#financing').getByText(name, { exact: true });
    await expect(bankName, 'The update bank is not present in the project details page').toBeVisible({ timeout: 20000 });
  }

  async isDestinationSectionVisible() {
    await this.page.locator(MarketplaceLandingObjects.destinationSection).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return await this.page.locator(MarketplaceLandingObjects.destinationSection).isVisible();
  }

  async isInsightsAndTrendsSectionVisible() {
    await this.page.locator(MarketplaceLandingObjects.insightsAndTrendsSection).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return await this.page.locator(MarketplaceLandingObjects.insightsAndTrendsSection).isVisible();
  }

  async clickOnTheFirstDestinationCard() {
    await this.page.locator(MarketplaceLandingObjects.firstDestinationCard).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects.firstDestinationCard).click();
  }

  async getFirstDestinationCardName() {
    await this.page.locator(MarketplaceLandingObjects.firstDestinationCardName).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return (await this.page.locator(MarketplaceLandingObjects.firstDestinationCardName).innerText()).trim();
  }

  async getActiveDestinationCardName() {
    await this.page.locator(MarketplaceLandingObjects.activeDestinationCardName).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return (await this.page.locator(MarketplaceLandingObjects.activeDestinationCardName).innerText()).trim();
  }

  async getFirstDestinationCardUrl() {
    return await this.page.locator(MarketplaceLandingObjects.firstDestinationCardLink).getAttribute('href');
  }

  async openFirstDestinationCardInNewTab() {
    const context = this.page.context();
    const pagesBefore = context.pages().length;
    const marketplaceUrl = this.page.url();

    const [newTab] = await Promise.all([context.waitForEvent('page', { timeout: this.DEFAULT_TIMEOUT }), this.clickOnTheFirstDestinationCard()]);
    await newTab.waitForLoadState('domcontentloaded');

    expect(context.pages().length, 'Exactly one new tab should be opened').toBe(pagesBefore + 1);
    expect(this.page.url(), 'The marketplace tab should stay on the same page').toBe(marketplaceUrl);
    return newTab;
  }

  async isProjectVisibleInTab(tab: Page, projectName: string) {
    const projectTitle = tab.getByText(projectName).first();
    await projectTitle.waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return await projectTitle.isVisible();
  }

  async closeTab(tab: Page) {
    const context = this.page.context();
    const pagesBefore = context.pages().length;
    await tab.close();
    expect(context.pages().length, 'The project tab should be closed').toBe(pagesBefore - 1);
    await this.page.bringToFront();
  }

  async slideToLeft() {
    await this.page.locator(MarketplaceLandingObjects.leftSliderIcon).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects.leftSliderIcon).click();
    await this.page.waitForTimeout(3000);
  }

  async slideToRight() {
    await this.page.locator(MarketplaceLandingObjects.rightSliderIcon).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    await this.page.locator(MarketplaceLandingObjects.rightSliderIcon).click();
    await this.page.waitForTimeout(3000);
  }

  async filterProjectsBy(option: string) {
    await this.page.getByRole(MarketplaceLandingObjects.filterResultsButton.role, { name: MarketplaceLandingObjects.filterResultsButton.name }).click();
    const filterDialog = this.page.getByRole('dialog');
    await filterDialog.getByRole('button', { name: option, exact: true }).click();
    await filterDialog.getByRole(MarketplaceLandingObjects.filterSearchButton.role, { name: MarketplaceLandingObjects.filterSearchButton.name }).click();
    await filterDialog.waitFor({ state: 'hidden', timeout: this.DEFAULT_TIMEOUT });
  }

  async getProjectCardsCount() {
    await this.page.locator(MarketplaceLandingObjects.projectCard).first().waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return await this.page.locator(MarketplaceLandingObjects.projectCard).count();
  }

  async getProjectCardsText() {
    await this.page.locator(MarketplaceLandingObjects.projectCard).first().waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return await this.page.locator(MarketplaceLandingObjects.projectCard).allInnerTexts();
  }

  async isFilterApplied(option: string) {
    const filterChip = this.page.getByRole('button', { name: option, exact: true }).first();
    await filterChip.waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return await filterChip.isVisible();
  }

  async sortProjectsBy(option: string) {
    await this.page.getByRole(MarketplaceLandingObjects.sortByButton.role, { name: MarketplaceLandingObjects.sortByButton.name }).click();
    await this.page.getByText(option, { exact: true }).click();
  }

  async isSortOptionSelected(option: string) {
    await this.page.getByRole(MarketplaceLandingObjects.sortByButton.role, { name: MarketplaceLandingObjects.sortByButton.name }).click();
    const sortOption = this.page.locator('button', { hasText: option });
    await sortOption.waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    const isSelected = (await sortOption.getAttribute('aria-selected')) === 'true';
    await this.page.keyboard.press('Escape');
    return isSelected;
  }
}
