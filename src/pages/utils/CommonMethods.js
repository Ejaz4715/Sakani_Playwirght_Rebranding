'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CommonMethods = void 0;
const test_1 = require('@playwright/test');
const DeveloperObjects_1 = require('@objects/DeveloperObjects');
class CommonMethods {
  constructor(page) {
    this.page = page;
  }
  getElement(elementObject) {
    return 'xpath' in elementObject
      ? this.page.locator(elementObject.xpath)
      : 'role' in elementObject
        ? this.page.getByRole(elementObject.role, {
            name: elementObject.name,
            exact: elementObject.exact,
          })
        : this.page.getByText(elementObject.text, {
            exact: elementObject.exact,
          });
  }
  async getFirstVisibleMatch(elementObject, description) {
    const visibleMatches = this.getElement(elementObject).filter({ visible: true });
    await (0, test_1.expect)(visibleMatches.first(), `Expected at least one visible ${description}`).toBeVisible();
    const visibleCount = await visibleMatches.count();
    if (visibleCount === 0) {
      throw new Error(`No visible ${description} found`);
    }
    return visibleMatches.first();
  }
  /**
   * Clicks on a locator if it is visible.
   * @param elementObject The page object describing the element to click.
   * @param options Timeout options.
   */
  async clickIfVisible(elementObject, options = {}) {
    const element = this.getElement(elementObject);
    try {
      await element.waitFor({ state: 'visible', timeout: options.timeout ?? 5000 });
    } catch (error) {
      if (error instanceof Error && error.name === 'TimeoutError') {
        return;
      }
      throw error;
    }
    await element.click(options);
  }
  async clickElement(elementObject) {
    const element = this.getElement(elementObject);
    await element.waitFor({ state: 'visible' });
    await element.click();
  }
  async hoverElement(elementObject) {
    const element = this.getElement(elementObject);
    await element.waitFor({ state: 'visible' });
    await element.hover();
  }
  async verifyElementVisible(elementObject) {
    const element = this.getElement(elementObject);
    await (0, test_1.expect)(element).toBeVisible();
  }
  async verifyElementNotVisible(elementObject) {
    const element = this.getElement(elementObject);
    await (0, test_1.expect)(element).toBeHidden();
  }
  async verifyEitherElementVisible(firstElement, secondElement) {
    const first = this.getElement(firstElement);
    const second = this.getElement(secondElement);
    await test_1.expect.poll(async () => (await first.isVisible()) || (await second.isVisible())).toBe(true);
  }
  async fill(inputField, value) {
    const input = this.getElement(inputField);
    await (0, test_1.expect)(input).toBeVisible();
    await input.fill(value);
  }
  async press(inputField, key) {
    const input = this.getElement(inputField);
    await (0, test_1.expect)(input).toBeVisible();
    await input.press(key);
  }
  async uploadFile(inputField, file) {
    const input = this.getElement(inputField);
    await input.setInputFiles(file);
  }
  async unifiedSakaniLogin(nationalId) {
    const loginButton = this.page.locator(DeveloperObjects_1.DeveloperObjects.loginButton.xpath);
    await loginButton.waitFor({ state: 'visible', timeout: 20000 });
    await loginButton.click();
    const acceptCookiesButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.acceptCookiesButton.role, { name: DeveloperObjects_1.DeveloperObjects.acceptCookiesButton.name }).first();
    await acceptCookiesButton.waitFor({ state: 'visible', timeout: 20000 });
    await acceptCookiesButton.click();
    // The cookie modal fades out; wait for it and its backdrop so they don't block the next click
    await this.page
      .locator(DeveloperObjects_1.DeveloperObjects.acceptCookiesModal)
      .waitFor({ state: 'hidden', timeout: 15000 })
      .catch(() => {});
    await this.page
      .locator('.modal-backdrop')
      .waitFor({ state: 'detached', timeout: 15000 })
      .catch(() => {});
    const usernameInput = this.page.locator(DeveloperObjects_1.DeveloperObjects.usernameInput.xpath);
    await usernameInput.waitFor({ state: 'visible', timeout: 20000 });
    await usernameInput.fill(nationalId);
    const loginToButton = this.page.locator(DeveloperObjects_1.DeveloperObjects.loginToButton.xpath);
    await loginToButton.waitFor({ state: 'visible', timeout: 20000 });
    await loginToButton.click();
    const continueButton = this.page.locator(DeveloperObjects_1.DeveloperObjects.continueButton.xpath);
    await continueButton.waitFor({ state: 'visible', timeout: 20000 });
    await continueButton.click();
    const nafathModal = this.page.locator('//app-nafath-login-modal');
    await nafathModal.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    while (await nafathModal.isVisible().catch(() => false)) {
      await this.page.waitForTimeout(3000);
    }
  }
  async fillAllMatchingFields(fieldObject, value) {
    const fields = this.page.locator(fieldObject.xpath);
    const fieldCount = await fields.count();
    if (fieldCount === 0) {
      throw new Error(`No fields found for selector: ${fieldObject.xpath}`);
    }
    if (Array.isArray(value) && value.length !== fieldCount) {
      throw new Error(`Expected ${fieldCount} values for matching fields, received ${value.length}`);
    }
    for (let index = 0; index < fieldCount; index++) {
      const field = fields.nth(index);
      await field.waitFor({ state: 'visible' });
      await field.fill(Array.isArray(value) ? value[index] : value);
    }
    return fieldCount;
  }
  async selectDropdownOption(dropdownObject, optionObject) {
    const dropdowns = this.getElement(dropdownObject).filter({ visible: true });
    await (0, test_1.expect)(dropdowns.first(), 'Expected at least one visible dropdown').toBeVisible();
    const dropdownCount = await dropdowns.count();
    if (dropdownCount === 0) {
      throw new Error('No visible dropdowns found');
    }
    if (Array.isArray(optionObject) && optionObject.length !== dropdownCount) {
      throw new Error(`Expected ${dropdownCount} dropdown options, received ${optionObject.length}`);
    }
    for (let index = 0; index < dropdownCount; index++) {
      const dropdown = dropdowns.nth(index);
      await dropdown.waitFor({ state: 'visible' });
      await dropdown.click();
      const selectedOptionObject = Array.isArray(optionObject) ? optionObject[index] : optionObject;
      const option = await this.getFirstVisibleMatch(selectedOptionObject, 'dropdown option');
      await option.click();
    }
    return dropdownCount;
  }
}
exports.CommonMethods = CommonMethods;
