'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UnitComparisonPage = void 0;
const test_1 = require('@playwright/test');
const UnitComparisonObjects_1 = require('@objects/UnitComparisonObjects');
class UnitComparisonPage {
  constructor(page) {
    this.page = page;
  }
  async clickProjectHeaderCompareButton() {
    const projectHeaderCompareButton = this.page
      .locator(UnitComparisonObjects_1.UnitComparisonObjects.projectHeaderCompareButton.containerSelector)
      .getByRole(UnitComparisonObjects_1.UnitComparisonObjects.projectHeaderCompareButton.role, {
        name: UnitComparisonObjects_1.UnitComparisonObjects.projectHeaderCompareButton.name,
      });
    await (0, test_1.expect)(projectHeaderCompareButton).toBeVisible({ timeout: 90000 });
    await projectHeaderCompareButton.click();
  }
  async clickCompareButton() {
    const compareButton = this.page.getByRole(UnitComparisonObjects_1.UnitComparisonObjects.compareButton.role, { name: UnitComparisonObjects_1.UnitComparisonObjects.compareButton.name });
    await (0, test_1.expect)(compareButton).toBeVisible({ timeout: 90000 });
    await compareButton.click();
  }
  async verifyComparisonHeadingIsVisible() {
    const comparisonHeading = this.page.getByRole(UnitComparisonObjects_1.UnitComparisonObjects.comparisonHeading.role, { name: UnitComparisonObjects_1.UnitComparisonObjects.comparisonHeading.name });
    await (0, test_1.expect)(comparisonHeading).toBeVisible({ timeout: 90000 });
  }
}
exports.UnitComparisonPage = UnitComparisonPage;
