'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const testData_1 = require('@data/testData');
const Header_1 = require('@components/Header');
const LogSteps_1 = require('@helpers/LogSteps');
pages_fixture_1.test.describe('User authentication validation', () => {
  (0, pages_fixture_1.test)('TC-01 Login page renders the identity form', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ loginPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the login page');
    await loginPage.open();
    await (0, LogSteps_1.logStep)('Step 02: Verify the login title and identity form');
    await (0, pages_fixture_1.expect)(loginPage.page).toHaveTitle(/Login|تسجيل الدخول/);
    await loginPage.expectFormRendered();
    await (0, pages_fixture_1.expect)(loginPage.usernameInput).toHaveAttribute('placeholder', /Enter your ID|أدخل معرفك/i);
  });
  (0, pages_fixture_1.test)('TC-02 Full login through Nafath lands on the marketplace', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ loginPage, page }) => {
    const captcha = page.waitForResponse((r) => r.url().includes(testData_1.API.captcha) && r.request().method() === 'POST', { timeout: 120_000 });
    const sessionCheck = page.waitForResponse((r) => r.url().includes(testData_1.API.sessionCheck) && r.request().method() === 'POST', { timeout: 120_000 });
    await (0, LogSteps_1.logStep)('Step 01: Open the login form and continue with the national ID');
    await loginPage.open();
    await loginPage.continueWithId(testData_1.TEST_USER.nationalId);
    await (0, LogSteps_1.logStep)('Step 02: Wait for server-side captcha and session validation');
    (0, pages_fixture_1.expect)((await captcha).status(), 'reCAPTCHA validation should pass').toBe(200);
    (0, pages_fixture_1.expect)((await sessionCheck).ok()).toBeTruthy();
    await (0, LogSteps_1.logStep)('Step 03: Confirm the Nafath modal');
    await (0, pages_fixture_1.expect)(loginPage.nafathModal).toBeVisible({ timeout: 60_000 });
    await (0, pages_fixture_1.expect)(loginPage.nafathModalIdInput).toHaveValue(testData_1.TEST_USER.nationalId);
    const challengeNumber = await loginPage.confirmNafathModal();
    (0, pages_fixture_1.expect)(challengeNumber, 'Nafath should display a challenge number').toMatch(/^\d{1,3}$/);
    await (0, LogSteps_1.logStep)('Step 04: Complete authentication and confirm marketplace entry');
    await loginPage.waitForAuthenticated();
    await (0, pages_fixture_1.expect)(page).toHaveURL(/\/app\/marketplace/);
    await new Header_1.Header(page).expectAuthenticated();
  });
  (0, pages_fixture_1.test)('TC-03 User can log out', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const header = new Header_1.Header(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Log out from the authenticated session');
    await header.logout();
    await (0, LogSteps_1.logStep)('Step 02: Validate the login option is visible again');
    await (0, pages_fixture_1.expect)(header.loginButton.first()).toBeVisible({ timeout: 90_000 });
  });
});
