import { LoginObjects } from '@objects/LoginObjects';
import { expect, Page } from '@playwright/test';
export class LoginPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async click(locator: any) {
    await locator.click();
  }

  async check(locator: any) {
    await locator.check();
  }

  async gotoHomePage(url: string) {
    await this.page.goto(url);
  }

  async acceptCookies() {
    const acceptCookiesButton = this.page.getByRole(LoginObjects.acceptCookiesButton.role, { name: LoginObjects.acceptCookiesButton.name }).filter({ visible: true }).first();
    await this.click(acceptCookiesButton);

    // The cookie modal fades out; wait for it and its backdrop so they don't block the next click
    await this.page
      .locator(LoginObjects.acceptCookiesModal)
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
    const loginButton = this.page.locator(LoginObjects.loginButton);
    await this.click(loginButton);

    const continueWithNafathButton = this.page.getByRole(LoginObjects.continueWithNafathButton.role, { name: LoginObjects.continueWithNafathButton.name });
    await this.click(continueWithNafathButton);
  }

  async loginWithNafath(nationalId: string) {
    const nafathInput = this.page.getByRole(LoginObjects.nafathIdInput.role, {
      name: LoginObjects.nafathIdInput.name,
    });
    await nafathInput.click();
    await nafathInput.fill(nationalId);

    const continueButton = this.page.getByRole(LoginObjects.continueButton.role, { name: LoginObjects.continueButton.name });
    await this.click(continueButton);
  }

  async waitForNafathPromptToDisappear() {
    const nafathPromptHeading = this.page.getByRole(LoginObjects.nafathPromptHeading.role, { name: LoginObjects.nafathPromptHeading.name });

    try {
      await nafathPromptHeading.waitFor({ state: 'visible', timeout: 15000 });
      await nafathPromptHeading.waitFor({ state: 'hidden', timeout: 30000 });
    } catch {
      // If the prompt never appears or is already gone, continue.
    }
  }

  async continueNewUserPopup() {
    const newUserContinueButton = this.page.getByRole(LoginObjects.newUserContinueButton.role, { name: LoginObjects.newUserContinueButton.name });
    if (await newUserContinueButton.isVisible().catch(() => false)) {
      await this.page.waitForTimeout(300);
      await newUserContinueButton.click({ force: true });
    }
  }

  async handlePushNotificationPopup() {
    const allowNotificationsButton = this.page.getByRole(LoginObjects.allowNotificationsButton.role, { name: LoginObjects.allowNotificationsButton.name });

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
    const loginButton = this.page.locator(LoginObjects.preBetaLoginButton).first();
    const continueWithNafathButton = this.page.locator(LoginObjects.preBetaContinueWithNafathButton).first();

    // The header button can be clicked before the page finishes loading and do nothing, so retry until the login page opens
    await expect(async () => {
      // Only click the header button while the login page hasn't opened yet
      if (!(await continueWithNafathButton.isVisible())) {
        await loginButton.click({ timeout: 10000 });
      }
      await expect(continueWithNafathButton).toBeVisible({ timeout: 10000 });
      // In debug mode (PWDEBUG) time spent paused counts against the limit, so don't limit it there (0 = no limit)
    }).toPass({ timeout: process.env.PWDEBUG ? 0 : 60000 });

    await this.acceptPreBetaCookies();
    await this.click(continueWithNafathButton);
  }

  // The cookies banner opens a moment after the login page and blocks clicks on it, so wait for it, accept it and wait until it closes
  async acceptPreBetaCookies() {
    const acceptCookiesButton = this.page.getByRole(LoginObjects.acceptCookiesButton.role, { name: LoginObjects.acceptCookiesButton.name });

    try {
      await acceptCookiesButton.waitFor({ state: 'visible', timeout: 10000 });
    } catch {
      // Banner not shown (already accepted); continue with the flow.
      return;
    }
    await this.click(acceptCookiesButton);
    await acceptCookiesButton.waitFor({ state: 'hidden', timeout: 15000 });
  }

  // Accepts the cookies banner only if it is showing, so it is safe to call when it was already accepted
  async acceptCookiesIfVisible() {
    const acceptCookiesButton = this.page.getByRole(LoginObjects.acceptCookiesButton.role, { name: LoginObjects.acceptCookiesButton.name });
    if (await acceptCookiesButton.isVisible()) {
      await this.click(acceptCookiesButton);
    }
  }

  // The login page is open when its "المتابعة مع نفاذ" button is shown
  async verifyPreBetaLoginPageDisplayed() {
    await expect(this.page.locator(LoginObjects.preBetaContinueWithNafathButton).first()).toBeVisible({ timeout: 30000 });
  }

  async preBetaLoginWithNafath(nationalId: string) {
    await this.page.locator(LoginObjects.preBetaNafathIdField).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(LoginObjects.preBetaNafathIdField).fill(nationalId);

    await this.page.locator(LoginObjects.preBetaNafathContinueButton).waitFor({ state: 'visible', timeout: 30_000 });
    await this.page.locator(LoginObjects.preBetaNafathContinueButton).click();
  }

  async continuePreBetaNewUserPopup() {
    const newUserContinueButton = this.page.locator(LoginObjects.preBetaPrivacyPolicyContinueButton);

    try {
      await newUserContinueButton.waitFor({ state: 'visible', timeout: 30000 });
      await newUserContinueButton.click();
      await newUserContinueButton.waitFor({ state: 'hidden', timeout: 30000 });
    } catch {
      // Privacy policy popup not present; continue with the flow.
    }
  }
}
