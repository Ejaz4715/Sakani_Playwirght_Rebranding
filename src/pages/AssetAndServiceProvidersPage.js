'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AssetAndServiceProvidersPage = void 0;
const test_1 = require('@playwright/test');
class AssetAndServiceProvidersPage {
  constructor(page) {
    this.page = page;
  }
  async clickElement(elementObject) {
    const element =
      'xpath' in elementObject
        ? this.page.locator(elementObject.xpath)
        : 'role' in elementObject
          ? this.page.getByRole(elementObject.role, {
              name: elementObject.name,
              exact: elementObject.exact,
            })
          : this.page.getByText(elementObject.text, {
              exact: elementObject.exact,
            });
    await element.waitFor({ state: 'visible' });
    await element.click();
  }
  async verifyElementVisible(elementObject) {
    const element =
      'xpath' in elementObject
        ? this.page.locator(elementObject.xpath)
        : 'role' in elementObject
          ? this.page.getByRole(elementObject.role, {
              name: elementObject.name,
              exact: elementObject.exact,
            })
          : this.page.getByText(elementObject.text, {
              exact: elementObject.exact,
            });
    await (0, test_1.expect)(element).toBeVisible();
  }
}
exports.AssetAndServiceProvidersPage = AssetAndServiceProvidersPage;
