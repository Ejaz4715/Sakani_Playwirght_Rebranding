'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.LoginPage = void 0;
const test_1 = require('@playwright/test');
const BasePage_1 = require('./BasePage');
const CookieConsent_1 = require('./components/CookieConsent');
class LoginPage extends BasePage_1.BasePage {
  constructor(page) {
    super(page);
    this.path = '/app/authentication/login';
    this.cookies = new CookieConsent_1.CookieConsent(page);
    this.usernameInput = page.locator('#username');
    this.continueButton = page
      .locator('button')
      .filter({ hasText: /^\s*(المتابعة|Continue)\s*$/ })
      .first();
    this.nafathButton = page
      .locator('button')
      .filter({ hasText: /المتابعة مع نفاذ|Continue with Nafath/i })
      .first();
    this.termsText = page.getByText(/I accept Sakani|أوافق على/i);
    this.botChallenge = page.locator('input[id^="cf-chl"], iframe[src*="challenges.cloudflare.com"], iframe[src*="/recaptcha/bframe"]');
    this.modalWindow = page.locator('ngb-modal-window');
    this.nafathModal = this.modalWindow.filter({
      hasText: /Login with nafath|تسجيل الدخول عبر نفاذ/i,
    });
    this.nafathModalIdInput = this.nafathModal.locator('input[type="tel"], input').last();
    this.nafathModalContinue = this.nafathModal
      .locator('button')
      .filter({ hasText: /^\s*(Continue|المتابعة)\s*$/ })
      .first();
    this.nafathPushHeading = page.getByRole('heading', { name: /Open nafath App|افتح تطبيق نفاذ/i });
    this.nafathChallengeNumber = page.locator('ngb-modal-window .nafath-number, ngb-modal-window h1');
    this.customerInfoHeading = page.getByRole('heading', { name: /تأكيد معلوماتك|Confirm your information/i });
    this.customerContactDetailsHeading = page.getByRole('heading', { name: /أضف تفاصيلك|Add your details/i });
  }
  async open() {
    await this.gotoUntilReady(this.usernameInput);
    await this.cookies.accept();
  }
  async expectFormRendered() {
    await (0, test_1.expect)(this.usernameInput).toBeVisible();
    await (0, test_1.expect)(this.continueButton).toBeVisible();
    await (0, test_1.expect)(this.nafathButton).toBeVisible();
  }
  async enterIdentifier(identifier) {
    await this.usernameInput.fill(identifier);
  }
  async submitIdentifier() {
    await (0, test_1.expect)(this.continueButton).toBeEnabled();
    await this.usernameInput.press('Enter');
  }
  async continueWithId(identifier) {
    await this.enterIdentifier(identifier);
    await this.submitIdentifier();
  }
  async isBotChallengeVisible(timeout = 8000) {
    return this.botChallenge
      .first()
      .waitFor({ state: 'visible', timeout })
      .then(() => true)
      .catch(() => false);
  }
  async confirmNafathModal() {
    await (0, test_1.expect)(this.nafathModal).toBeVisible({ timeout: 60_000 });
    await (0, test_1.expect)(this.nafathModalContinue).toBeEnabled();
    await this.nafathModalContinue.click();
    await (0, test_1.expect)(this.nafathPushHeading).toBeVisible({ timeout: 60_000 });
    const text = await this.modalWindow.first().innerText();
    return (text.match(/\b(\d{1,3})\b/) ?? ['', ''])[1];
  }
  async waitForAuthenticated(timeout = 180_000) {
    await this.page.waitForURL((url) => !url.toString().includes('/authentication/login'), {
      waitUntil: 'commit',
      timeout,
    });
  }
  async login(identifier) {
    await this.open();
    await this.continueWithId(identifier);
    await this.confirmNafathModal();
    await this.waitForAuthenticated();
  }
  async confirmCustomerInformationIfShown(timeout = 10_000) {
    const shown = await this.customerInfoHeading
      .waitFor({ state: 'visible', timeout })
      .then(() => true)
      .catch(() => false);
    if (!shown) return;
    await this.continueButton.click();
  }
}
exports.LoginPage = LoginPage;
