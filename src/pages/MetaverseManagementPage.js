'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.MetaverseManagementPage = void 0;
const MetaverseManagementObjects_1 = require('@objects/MetaverseManagementObjects');
const DEFAULT_TIMEOUT = 30_000;
class MetaverseManagementPage {
  constructor(page) {
    this.page = page;
  }
  async clickOnMetaverseManagement() {
    await this.page.locator(MetaverseManagementObjects_1.MetaverseManagementObjects.metaverseManagementButton).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(MetaverseManagementObjects_1.MetaverseManagementObjects.metaverseManagementButton).click();
  }
  async clickOnMetaverseManagementAccess() {
    await this.page.locator(MetaverseManagementObjects_1.MetaverseManagementObjects.metaverseManagementButton).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(MetaverseManagementObjects_1.MetaverseManagementObjects.metaverseManagementButton).click();
    const metaverseAccess = this.page.getByRole(MetaverseManagementObjects_1.MetaverseManagementObjects.metaversAccessLink.role, {
      name: MetaverseManagementObjects_1.MetaverseManagementObjects.metaversAccessLink.name,
    });
    await metaverseAccess.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await metaverseAccess.click();
  }
  async clickOnFirstActiveUser() {
    const activeUser = this.page
      .getByRole(MetaverseManagementObjects_1.MetaverseManagementObjects.firstUserRow.role, { name: MetaverseManagementObjects_1.MetaverseManagementObjects.firstUserRow.name })
      .first();
    await activeUser.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await activeUser.click();
  }
  async blockUser() {
    const blockButton = this.page.getByRole(MetaverseManagementObjects_1.MetaverseManagementObjects.blockButton.role, {
      name: MetaverseManagementObjects_1.MetaverseManagementObjects.blockButton.name,
    });
    await blockButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await blockButton.click();
    const confirmButton = this.page.getByRole(MetaverseManagementObjects_1.MetaverseManagementObjects.confirmButton.role, {
      name: MetaverseManagementObjects_1.MetaverseManagementObjects.confirmButton.name,
    });
    await confirmButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await confirmButton.click();
  }
  async isUserBlocked() {
    const blockingButton = this.page.getByRole(MetaverseManagementObjects_1.MetaverseManagementObjects.blockingCancelButton.role, {
      name: MetaverseManagementObjects_1.MetaverseManagementObjects.blockingCancelButton.name,
    });
    await blockingButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await blockingButton.isVisible();
  }
  async isUserActive() {
    const blockingButton = this.page.getByRole(MetaverseManagementObjects_1.MetaverseManagementObjects.blockButton.role, {
      name: MetaverseManagementObjects_1.MetaverseManagementObjects.blockButton.name,
    });
    await blockingButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await blockingButton.isVisible();
  }
  async clickOnSakaniMetaverse() {
    await this.page.locator(MetaverseManagementObjects_1.MetaverseManagementObjects.sakniMetaverseLink).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(MetaverseManagementObjects_1.MetaverseManagementObjects.sakniMetaverseLink).click();
  }
  async clickOnSakaniMetaverseAccessButton() {
    await this.page.locator(MetaverseManagementObjects_1.MetaverseManagementObjects.sakaniMetverseAccessButton).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(MetaverseManagementObjects_1.MetaverseManagementObjects.sakaniMetverseAccessButton).click();
  }
  async clickOnSakaniMetaverseRequests() {
    await this.page.locator(MetaverseManagementObjects_1.MetaverseManagementObjects.metaverseRequests).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(MetaverseManagementObjects_1.MetaverseManagementObjects.metaverseRequests).click();
  }
  async fillIdentityNumber(identityNumber) {
    await this.page.locator(MetaverseManagementObjects_1.MetaverseManagementObjects.identityNumberTextField).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(MetaverseManagementObjects_1.MetaverseManagementObjects.identityNumberTextField).fill(identityNumber);
  }
  async clickOnSearch() {
    const searchButton = this.page.getByRole(MetaverseManagementObjects_1.MetaverseManagementObjects.searchButton.role, {
      name: MetaverseManagementObjects_1.MetaverseManagementObjects.searchButton.name,
    });
    await searchButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await searchButton.click();
    await this.page.waitForTimeout(3000);
  }
  async clickOnUnBlockedFromCompanyAdminView() {
    const unBlockedButton = this.page.getByText(MetaverseManagementObjects_1.MetaverseManagementObjects.unBlockedRadioButtonText);
    await unBlockedButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await unBlockedButton.check();
  }
  async confirmUnBlockingFromCompanyAdminView() {
    const unBlockedButton = this.page.locator(MetaverseManagementObjects_1.MetaverseManagementObjects.unBlockingConfirmationButton);
    await unBlockedButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await unBlockedButton.click();
    await this.page.waitForTimeout(3000);
  }
  async isSapaUserBlocked() {
    await this.page.waitForTimeout(3000);
    return await this.page.locator(MetaverseManagementObjects_1.MetaverseManagementObjects.userBlockingText).isVisible();
  }
  async isSapaUserBlockedFromCompanyAdminView() {
    const blockingRadioButton = this.page.getByText(MetaverseManagementObjects_1.MetaverseManagementObjects.blockedRadioButtonText);
    return blockingRadioButton.isChecked();
  }
}
exports.MetaverseManagementPage = MetaverseManagementPage;
