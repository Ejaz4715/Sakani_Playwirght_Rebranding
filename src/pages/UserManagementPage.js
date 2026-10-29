'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserManagementPage = void 0;
const UserManagementObjects_1 = require('@objects/UserManagementObjects');
class UserManagementPage {
  constructor(page) {
    this.page = page;
  }
  async clickUserManagementLink() {
    const link = this.page.getByRole(UserManagementObjects_1.UserManagementObjects.userManagementLink.role, { name: UserManagementObjects_1.UserManagementObjects.userManagementLink.name });
    await link.waitFor({ state: 'visible' });
    await link.click();
  }
  async clickSearchButton() {
    const button = this.page.getByRole(UserManagementObjects_1.UserManagementObjects.searchButton.role, { name: UserManagementObjects_1.UserManagementObjects.searchButton.name });
    await button.waitFor({ state: 'visible' });
    await button.click();
  }
  async clickDeleteIconButton(userId) {
    const userRow = this.page.locator('datatable-body-row').filter({ has: this.page.getByText(userId, { exact: true }) });
    const button = userRow.locator(UserManagementObjects_1.UserManagementObjects.deleteIconButton.xpath);
    if (await button.isVisible()) {
      await button.click();
    }
  }
}
exports.UserManagementPage = UserManagementPage;
