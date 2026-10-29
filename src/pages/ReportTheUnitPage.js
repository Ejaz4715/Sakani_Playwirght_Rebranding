'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReportTheUnitPage = void 0;
const test_1 = require('@playwright/test');
const ReportTheUnitObjects_1 = require('@objects/ReportTheUnitObjects');
class ReportTheUnitPage {
  constructor(page) {
    this.page = page;
  }
  async selectRentalProperty() {
    const marketPlaceDropdownList = this.page.locator(ReportTheUnitObjects_1.ReportTheUnitObjects.marketPlaceDropdownList.xpath);
    await (0, test_1.expect)(marketPlaceDropdownList).toBeVisible({ timeout: 90000 });
    await marketPlaceDropdownList.click();
    const rentalPurposeOption = this.page.locator(ReportTheUnitObjects_1.ReportTheUnitObjects.rentalPurposeOption.xpath);
    await (0, test_1.expect)(rentalPurposeOption).toBeVisible({ timeout: 90000 });
    await rentalPurposeOption.click();
  }
  async openFirstMarketUnit() {
    const popupPromise = this.page.waitForEvent('popup');
    const firstMarketUnit = this.page.locator(ReportTheUnitObjects_1.ReportTheUnitObjects.marketUnitCard).first();
    await (0, test_1.expect)(firstMarketUnit).toBeVisible({ timeout: 90000 });
    await firstMarketUnit.click();
    return popupPromise;
  }
  async clickReportUnitLink() {
    const reportUnitLink = this.page.getByText(ReportTheUnitObjects_1.ReportTheUnitObjects.reportUnitLink, { exact: true });
    await (0, test_1.expect)(reportUnitLink).toBeVisible({ timeout: 90000 });
    await reportUnitLink.click();
  }
  async selectReportCategory() {
    const reportCategoryDropdown = this.page.getByRole(ReportTheUnitObjects_1.ReportTheUnitObjects.reportCategoryDropdown.role);
    await (0, test_1.expect)(reportCategoryDropdown).toBeVisible({ timeout: 90000 });
    await reportCategoryDropdown.selectOption(ReportTheUnitObjects_1.ReportTheUnitObjects.reportCategoryDropdown.value);
  }
  async selectIncorrectPropertyPriceReason() {
    const incorrectPropertyPriceOption = this.page.getByRole(ReportTheUnitObjects_1.ReportTheUnitObjects.incorrectPropertyPriceOption.role, {
      name: ReportTheUnitObjects_1.ReportTheUnitObjects.incorrectPropertyPriceOption.name,
    });
    await (0, test_1.expect)(incorrectPropertyPriceOption).toBeVisible({ timeout: 90000 });
    await incorrectPropertyPriceOption.check();
  }
  async clickSubmitButton() {
    const submitButton = this.page.getByRole(ReportTheUnitObjects_1.ReportTheUnitObjects.submitButton.role, { name: ReportTheUnitObjects_1.ReportTheUnitObjects.submitButton.name });
    await (0, test_1.expect)(submitButton).toBeVisible({ timeout: 90000 });
    await submitButton.click();
  }
  async verifyReportSubmittedSuccessfully() {
    const successHeading = this.page.getByRole(ReportTheUnitObjects_1.ReportTheUnitObjects.successHeading.role, { name: ReportTheUnitObjects_1.ReportTheUnitObjects.successHeading.name });
    await (0, test_1.expect)(successHeading).toBeVisible({ timeout: 90000 });
  }
}
exports.ReportTheUnitPage = ReportTheUnitPage;
