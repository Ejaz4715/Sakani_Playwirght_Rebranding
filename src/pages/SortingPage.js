'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.SortingPage = void 0;
const test_1 = require('@playwright/test');
const SortingObjects_1 = require('@objects/SortingObjects');
class SortingPage {
  constructor(page) {
    this.page = page;
  }
  async getFirstFiveProjectNames() {
    const projectNames = this.page.locator(SortingObjects_1.SortingObjects.projectsNames.xpath);
    await (0, test_1.expect)(projectNames.nth(4)).toBeVisible({ timeout: 90000 });
    const names = await projectNames.allTextContents();
    return names.slice(0, 5).map((name) => name.trim());
  }
  async verifyProjectNamesChanged(previousProjectNames) {
    await test_1.expect.poll(() => this.getFirstFiveProjectNames(), { timeout: 90000 }).not.toEqual(previousProjectNames);
  }
  async clickOnSortingBasedOnButton() {
    const sortingButton = this.page.locator(SortingObjects_1.SortingObjects.sortingBasedOnButton.xpath);
    await (0, test_1.expect)(sortingButton).toBeVisible({ timeout: 90000 });
    await sortingButton.click();
  }
  async clickOnRecommendedOption() {
    const recommendedOption = this.page.getByText(SortingObjects_1.SortingObjects.recommendedOption.text);
    await (0, test_1.expect)(recommendedOption).toBeVisible({ timeout: 90000 });
    await recommendedOption.click();
  }
  async clickOnMostPopularOption() {
    const mostPopularOption = this.page.getByText(SortingObjects_1.SortingObjects.mostPopularOption.text);
    await (0, test_1.expect)(mostPopularOption).toBeVisible({ timeout: 90000 });
    await mostPopularOption.click();
  }
  async clickOnNewestFirstOption() {
    const newestFirstOption = this.page.getByText(SortingObjects_1.SortingObjects.newestFirstOption.text);
    await (0, test_1.expect)(newestFirstOption).toBeVisible({ timeout: 90000 });
    await newestFirstOption.click();
  }
  async clickOnOldestFirstOption() {
    const oldestFirstOption = this.page.getByText(SortingObjects_1.SortingObjects.oldestFirstOption.text);
    await (0, test_1.expect)(oldestFirstOption).toBeVisible({ timeout: 90000 });
    await oldestFirstOption.click();
  }
  async clickOnPriceHighToLowOption() {
    const priceHighToLowOption = this.page.getByText(SortingObjects_1.SortingObjects.priceHighToLowOption.text);
    await (0, test_1.expect)(priceHighToLowOption).toBeVisible({ timeout: 90000 });
    await priceHighToLowOption.click();
  }
  async clickOnPriceLowToHighOption() {
    const priceLowToHighOption = this.page.getByText(SortingObjects_1.SortingObjects.priceLowToHighOption.text);
    await (0, test_1.expect)(priceLowToHighOption).toBeVisible({ timeout: 90000 });
    await priceLowToHighOption.click();
  }
}
exports.SortingPage = SortingPage;
