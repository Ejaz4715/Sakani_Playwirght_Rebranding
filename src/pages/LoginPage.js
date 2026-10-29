'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.LoginPage = void 0;
const LoginObjects_1 = require('@objects/LoginObjects');
const test_1 = require('@playwright/test');
class LoginPage {
  constructor(page) {
    this.page = page;
  }
  async click(locator) {
    await locator.click();
  }
  async check(locator) {
    await locator.check();
  }
  async gotoHomePage(url) {
    await this.page.goto(url);
  }
  async acceptCookies() {
    // const acceptCookiesModal = this.page.locator(LoginObjects.acceptCookiesModal);
    // await this.click(acceptCookiesModal);
    const acceptCookiesButton = this.page
      .getByRole(LoginObjects_1.LoginObjects.acceptCookiesButton.role, { name: LoginObjects_1.LoginObjects.acceptCookiesButton.name })
      .filter({ visible: true })
      .first();
    await this.click(acceptCookiesButton);
    // The cookie modal fades out; wait for it and its backdrop so they don't block the next click
    await this.page
      .locator(LoginObjects_1.LoginObjects.acceptCookiesModal)
      .waitFor({ state: 'hidden', timeout: 15000 })
      .catch(() => {});
    await this.page
      .locator('.modal-backdrop')
      .waitFor({ state: 'detached', timeout: 15000 })
      .catch(() => {});
    // const closeCookiesModal = this.page.locator(LoginObjects.closeCookiesModal);
    // await this.click(closeCookiesModal);
  }
  async openLogin() {
    const loginButton = this.page.locator(LoginObjects_1.LoginObjects.loginButton);
    await this.click(loginButton);
    const continueWithNafathButton = this.page.getByRole(LoginObjects_1.LoginObjects.continueWithNafathButton.role, { name: LoginObjects_1.LoginObjects.continueWithNafathButton.name });
    await this.click(continueWithNafathButton);
  }
  async loginWithNafath(nationalId) {
    const nafathInput = this.page.getByRole(LoginObjects_1.LoginObjects.nafathIdInput.role, {
      name: LoginObjects_1.LoginObjects.nafathIdInput.name,
    });
    await nafathInput.click();
    await nafathInput.fill(nationalId);
    const continueButton = this.page.getByRole(LoginObjects_1.LoginObjects.continueButton.role, { name: LoginObjects_1.LoginObjects.continueButton.name });
    await this.click(continueButton);
  }
  async waitForNafathPromptToDisappear() {
    const nafathPromptHeading = this.page.getByRole(LoginObjects_1.LoginObjects.nafathPromptHeading.role, { name: LoginObjects_1.LoginObjects.nafathPromptHeading.name });
    try {
      await nafathPromptHeading.waitFor({ state: 'visible', timeout: 15000 });
      await nafathPromptHeading.waitFor({ state: 'hidden', timeout: 30000 });
    } catch {
      // If the prompt never appears or is already gone, continue.
    }
  }
  async continueNewUserPopup() {
    const newUserContinueButton = this.page.getByRole(LoginObjects_1.LoginObjects.newUserContinueButton.role, { name: LoginObjects_1.LoginObjects.newUserContinueButton.name });
    if (await newUserContinueButton.isVisible().catch(() => false)) {
      await this.page.waitForTimeout(300);
      await newUserContinueButton.click({ force: true });
    }
  }
  async handlePushNotificationPopup() {
    const allowNotificationsButton = this.page.getByRole(LoginObjects_1.LoginObjects.allowNotificationsButton.role, { name: LoginObjects_1.LoginObjects.allowNotificationsButton.name });
    try {
      await allowNotificationsButton.waitFor({
        state: 'visible',
        timeout: 5000,
      });
      await allowNotificationsButton.click({ force: true });
    } catch {
      // Notification popup not present; continue with the flow.
    }
  }
  async openPreBetaLogin() {
    const loginButton = this.page.locator(LoginObjects_1.LoginObjects.preBetaLoginButton).first();
    const continueWithNafathButton = this.page.getByRole(LoginObjects_1.LoginObjects.continueWithNafathButton.role, { name: LoginObjects_1.LoginObjects.continueWithNafathButton.name });
    // The header button can be clicked before the page finishes loading and do nothing, so retry until the login page opens
    await (0, test_1.expect)(async () => {
      await this.click(loginButton);
      await (0, test_1.expect)(continueWithNafathButton).toBeVisible({ timeout: 10000 });
    }).toPass({ timeout: 60000 });
    await this.click(continueWithNafathButton);
  }
  async preBetaLoginWithNafath(nationalId) {
    await this.page.locator(LoginObjects_1.LoginObjects.preBetaNafathIdField).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(LoginObjects_1.LoginObjects.preBetaNafathIdField).fill(nationalId);
    await this.page.locator(LoginObjects_1.LoginObjects.preBetaNafathContinueButton).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(LoginObjects_1.LoginObjects.preBetaNafathContinueButton).click();
  }
  async continuePreBetaNewUserPopup() {
    const newUserContinueButton = this.page.locator(LoginObjects_1.LoginObjects.preBetaPrivacyPolicyContinueButton);
    try {
      await newUserContinueButton.waitFor({ state: 'visible', timeout: 30000 });
      await newUserContinueButton.click();
      await newUserContinueButton.waitFor({ state: 'hidden', timeout: 30000 });
    } catch {
      // Privacy policy popup not present; continue with the flow.
    }
  }
}
exports.LoginPage = LoginPage;
