'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CreatingAnAdvertisingCampaignPage = void 0;
const test_1 = require('@playwright/test');
const DataHelper_1 = require('@helpers/DataHelper');
class CreatingAnAdvertisingCampaignPage {
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
  async fillInputField(inputObject, value) {
    const input =
      'xpath' in inputObject
        ? this.page.locator(inputObject.xpath)
        : this.page.getByRole(inputObject.role, {
            name: inputObject.name,
            exact: inputObject.exact,
          });
    await input.waitFor({ state: 'visible' });
    await input.fill(String(value));
  }
  async selectAllInputFieldText(inputObject) {
    const input = this.page.locator(inputObject.xpath);
    await input.waitFor({ state: 'visible' });
    await input.press('Control+A');
  }
  async saveRequestNumber(requestNumberObject) {
    const requestNumberElement = this.page.locator(requestNumberObject.xpath);
    await requestNumberElement.waitFor({ state: 'visible' });
    const requestNumber = (await requestNumberElement.innerText()).trim();
    if (!requestNumber) {
      throw new Error('The request number element is empty.');
    }
    DataHelper_1.DataHelper.updateServiceData('creating-an-advertising-campaign', 'requestNumber', requestNumber);
  }
}
exports.CreatingAnAdvertisingCampaignPage = CreatingAnAdvertisingCampaignPage;
