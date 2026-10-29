'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FiltersPage = void 0;
const test_1 = require('@playwright/test');
const FiltersObjects_1 = require('@objects/FiltersObjects');
class FiltersPage {
  constructor(page) {
    this.page = page;
  }
  async validateElementExists(elementObject) {
    let element;
    if ('xpath' in elementObject) {
      element = this.page.locator(elementObject.xpath);
    } else if ('role' in elementObject) {
      element = this.page.getByRole(elementObject.role, {
        name: elementObject.name,
        exact: elementObject.exact,
      });
    } else {
      element = this.page.getByText(elementObject.text, {
        exact: elementObject.exact,
      });
    }
    await (0, test_1.expect)(element.first()).toBeVisible({ timeout: 90000 });
  }
  async clickElement(elementObject, index = 0) {
    let element;
    if ('xpath' in elementObject) {
      element = this.page.locator(elementObject.xpath);
    } else if ('role' in elementObject) {
      element = this.page.getByRole(elementObject.role, {
        name: elementObject.name,
        exact: elementObject.exact,
      });
    } else {
      element = this.page.getByText(elementObject.text, {
        exact: elementObject.exact,
      });
    }
    const target = element.nth(index);
    await (0, test_1.expect)(target).toBeVisible({ timeout: 90000 });
    await target.click();
  }
  async verifyElementValueAttribute(elementObject, expectedValue, index = 0) {
    const element = (
      'xpath' in elementObject
        ? this.page.locator(elementObject.xpath)
        : this.page.getByRole(elementObject.role, {
            name: elementObject.name,
            exact: elementObject.exact,
          })
    ).nth(index);
    // await expect(element).toBeVisible({ timeout: 90000 });
    await (0, test_1.expect)(element).toHaveAttribute('value', expectedValue);
  }
  async fillInputField(inputObject, value) {
    const input = this.page.locator(inputObject.xpath);
    await (0, test_1.expect)(input).toBeVisible({ timeout: 90000 });
    await input.fill(String(value));
  }
  async clearInputField(inputObject) {
    const input = this.page.locator(inputObject.xpath);
    await (0, test_1.expect)(input).toBeVisible({ timeout: 90000 });
    await input.fill('');
  }
  async clickOnPropertiesForSaleButton() {
    const button = this.page.getByRole(FiltersObjects_1.FiltersObjects.propertiesForSaleButton.role, { name: FiltersObjects_1.FiltersObjects.propertiesForSaleButton.name });
    await (0, test_1.expect)(button).toBeVisible({ timeout: 90000 });
    await button.click();
  }
  async clickOnOffPlanSaleUnits() {
    const option = this.page.locator(FiltersObjects_1.FiltersObjects.offPlanSaleUnits.xpath);
    await (0, test_1.expect)(option).toBeVisible({ timeout: 90000 });
    await option.click();
  }
  async clickOnReadyMadeUnits() {
    const option = this.page.locator(FiltersObjects_1.FiltersObjects.readyMadeUnits.xpath);
    await (0, test_1.expect)(option).toBeVisible({ timeout: 90000 });
    await option.click();
  }
  async clickOnFilterResultButton() {
    const button = this.page.locator(FiltersObjects_1.FiltersObjects.filterResultButton.xpath);
    await (0, test_1.expect)(button).toBeVisible({ timeout: 90000 });
    await button.click();
  }
  async clickOnClearFiltersButton() {
    const button = this.page.getByRole(FiltersObjects_1.FiltersObjects.clearFiltersButton.role, { name: FiltersObjects_1.FiltersObjects.clearFiltersButton.name });
    await (0, test_1.expect)(button).toBeVisible({ timeout: 90000 });
    await button.click();
  }
  async clickOnSearchButton() {
    const button = this.page.getByRole(FiltersObjects_1.FiltersObjects.searchButton.role, { name: FiltersObjects_1.FiltersObjects.searchButton.name });
    await (0, test_1.expect)(button).toBeVisible({ timeout: 90000 });
    await button.click();
  }
}
exports.FiltersPage = FiltersPage;
