'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PartnersLoginPage = void 0;
// @ts-nocheck
const test_1 = require('@playwright/test');
const path = require('path');
const DeveloperObjects_1 = require('@objects/DeveloperObjects');
class PartnersLoginPage {
  constructor(page) {
    this.page = page;
    this.defaultTimeout = 60000;
  }
  async waitForVisible(locator) {
    await (0, test_1.expect)(locator).toBeVisible({ timeout: this.defaultTimeout });
  }
  async clickIfVisible(locator, options = {}) {
    const timeout = options.timeout ?? 5000;
    const isVisible = await locator.isVisible({ timeout }).catch(() => false);
    if (isVisible) {
      await locator.click();
    }
  }
  async gotoAuth(url) {
    await this.page.goto(url);
  }
  async fillNationalId(nationalId) {
    const usernameInput = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.usernameInput.role, { name: DeveloperObjects_1.DeveloperObjects.usernameInput.name });
    await this.waitForVisible(usernameInput);
    await usernameInput.fill(nationalId);
  }
  async clickContinueButton() {
    const continueButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.continueButton.role, {
      name: DeveloperObjects_1.DeveloperObjects.continueButton.name,
      exact: DeveloperObjects_1.DeveloperObjects.continueButton.exact,
    });
    await this.waitForVisible(continueButton);
    await continueButton.click();
  }
  async confirmIdentityIfRequired() {
    const nafathModal = this.page.locator(DeveloperObjects_1.DeveloperObjects.nafathModel);
    await nafathModal.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    while (await nafathModal.isVisible().catch(() => false)) {
      await this.page.waitForTimeout(3000);
    }
    await this.page.waitForTimeout(3000);
    const verificationButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.verifyOTPButton.role, { name: DeveloperObjects_1.DeveloperObjects.verifyOTPButton.name });
    if (await verificationButton.isVisible({ timeout: 15000 }).catch(() => false)) {
      await verificationButton.click();
      const otpInput = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.otpDigitInput.role, { name: DeveloperObjects_1.DeveloperObjects.otpDigitInput.name });
      await otpInput.nth(0).fill('1');
      await otpInput.nth(1).fill('2');
      await otpInput.nth(2).fill('3');
      await otpInput.nth(3).fill('4');
      await this.page.getByRole(DeveloperObjects_1.DeveloperObjects.confirmAndContinueButton.role, { name: DeveloperObjects_1.DeveloperObjects.confirmAndContinueButton.name }).click();
      await this.page.getByRole(DeveloperObjects_1.DeveloperObjects.goToDashboardButton.role, { name: DeveloperObjects_1.DeveloperObjects.goToDashboardButton.name }).click();
    }
  }
  async waitForProfileIcon() {
    const profileIcon = this.page.locator(DeveloperObjects_1.DeveloperObjects.profileIcon);
    await this.waitForVisible(profileIcon);
  }
  async clickProfileIcon() {
    const profileIcon = this.page.locator(DeveloperObjects_1.DeveloperObjects.profileIcon);
    await this.waitForVisible(profileIcon);
    await profileIcon.click();
  }
  async clickSwitchRoleButton() {
    const switchRoleButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.switchRoleButton.role, { name: DeveloperObjects_1.DeveloperObjects.switchRoleButton.name });
    await this.waitForVisible(switchRoleButton);
    await switchRoleButton.click();
  }
  async clickDeveloperRole() {
    const developerRole = this.page.getByText(DeveloperObjects_1.DeveloperObjects.developerRoleText);
    await this.waitForVisible(developerRole);
    await developerRole.click();
  }
  async dismissNewServiceAlertPopUp() {
    const cancelButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.cancelButtonOnPopUp.role, { name: DeveloperObjects_1.DeveloperObjects.cancelButtonOnPopUp.name });
    await this.clickIfVisible(cancelButton.first());
  }
  async loginToSapaPortal(nationalId) {
    await this.fillNationalId(nationalId);
    await this.clickContinueButton();
    await this.confirmIdentityIfRequired();
    await this.waitForProfileIcon();
    await this.page.waitForTimeout(3000);
    await this.dismissNewServiceAlertPopUp();
  }
  async switchRoleToDeveloper() {
    await this.clickProfileIcon();
    await this.clickSwitchRoleButton();
    await this.clickDeveloperRole();
    await this.page.waitForTimeout(3000);
    await this.dismissNewServiceAlertPopUp();
  }
}
exports.PartnersLoginPage = PartnersLoginPage;
