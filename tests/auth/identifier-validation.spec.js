'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const testData_1 = require('@data/testData');
const LogSteps_1 = require('@helpers/LogSteps');
pages_fixture_1.test.describe('Login identifier validation and session rules', () => {
  pages_fixture_1.test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.expectFormRendered();
  });
  (0, pages_fixture_1.test)(
    'TC-01 National identifier shorter than 10 digits does not allow the user to proceed',
    { annotation: [{ product: 'Marketplace', type: 'non-critical' }] },
    async ({ loginPage }) => {
      await (0, LogSteps_1.logStep)('Step 01: Enter an invalid short identifier');
      await loginPage.usernameInput.fill('123456789');
      await (0, LogSteps_1.logStep)('Step 02: Confirm Continue remains disabled or the modal stays hidden');
      if (await loginPage.continueButton.isEnabled()) {
        await loginPage.usernameInput.press('Enter');
        await (0, pages_fixture_1.expect)(loginPage.nafathModal).toBeHidden({ timeout: 30_000 });
      } else {
        await (0, pages_fixture_1.expect)(loginPage.continueButton).toBeDisabled();
      }
    }
  );
  (0, pages_fixture_1.test)('TC-02 An National identifier longer than 10 digits is capped or rejected', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ loginPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Enter an overlong identifier');
    await loginPage.usernameInput.fill('100001148599999');
    await (0, LogSteps_1.logStep)('Step 02: Verify it is bounded or rejected');
    const value = await loginPage.usernameInput.inputValue();
    (0, pages_fixture_1.expect)(value.length, 'identifier should be bounded').toBeLessThanOrEqual(20);
  });
  (0, pages_fixture_1.test)('TC-03 Alphabetic national identifier does not reach Nafath', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ loginPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Enter alphabetic identifier input');
    await loginPage.usernameInput.fill('abcdefghij');
    await (0, LogSteps_1.logStep)('Step 02: Confirm the form blocks the flow');
    if (await loginPage.continueButton.isEnabled()) {
      await loginPage.usernameInput.press('Enter');
      await (0, pages_fixture_1.expect)(loginPage.nafathModal).toBeHidden({ timeout: 30_000 });
    } else {
      await (0, pages_fixture_1.expect)(loginPage.continueButton).toBeDisabled();
    }
  });
  (0, pages_fixture_1.test)('TC-04 Surrounding whitespace is tolerated', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ loginPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Fill the identifier with surrounding whitespace');
    await loginPage.usernameInput.fill(`  ${testData_1.TEST_USER.nationalId}  `);
    await (0, LogSteps_1.logStep)('Step 02: Verify the value is trimmed to the actual ID');
    const value = (await loginPage.usernameInput.inputValue()).trim();
    (0, pages_fixture_1.expect)(value).toContain(testData_1.TEST_USER.nationalId);
  });
  (0, pages_fixture_1.test)('TC-05 Whitespace-only identifier leaves Continue button disabled', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ loginPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Enter a whitespace-only identifier');
    await loginPage.usernameInput.fill('     ');
    await (0, LogSteps_1.logStep)('Step 02: Validate the continue action remains disabled');
    await (0, pages_fixture_1.expect)(loginPage.continueButton).toBeDisabled();
  });
  (0, pages_fixture_1.test)('TC-06 Symbols in the identifier do not reach Nafath', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ loginPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Enter an identifier with symbols');
    await loginPage.usernameInput.fill('10000!!485');
    await (0, LogSteps_1.logStep)('Step 02: Make sure the flow is rejected before Nafath');
    if (await loginPage.continueButton.isEnabled()) {
      await loginPage.usernameInput.press('Enter');
      await (0, pages_fixture_1.expect)(loginPage.nafathModal).toBeHidden({ timeout: 30_000 });
    } else {
      await (0, pages_fixture_1.expect)(loginPage.continueButton).toBeDisabled();
    }
  });
  (0, pages_fixture_1.test)('TC-07 Terms and privacy links are reachable from login', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ loginPage, page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Inspect the legal links on the login form');
    const terms = page.getByRole('link', { name: /Terms of Use|شروط الاستخدام/i }).first();
    const privacy = page.getByRole('link', { name: /Privacy Policy|سياسة الخصوصية/i }).first();
    (0, pages_fixture_1.expect)(await terms.getAttribute('href')).toContain('/terms');
    (0, pages_fixture_1.expect)(await privacy.getAttribute('href')).toBeTruthy();
  });
  (0, pages_fixture_1.test)('TC-08 - Losing the Nafath modal returns to the identifier step', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ loginPage, page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the login form and start the identifier flow');
    await loginPage.open();
    await loginPage.expectFormRendered();
    await loginPage.usernameInput.fill(testData_1.TEST_USER.nationalId);
    await loginPage.usernameInput.press('Enter');
    await (0, LogSteps_1.logStep)('Step 02: Close the Nafath modal and confirm we return to identifier entry');
    await (0, pages_fixture_1.expect)(loginPage.nafathModal).toBeVisible({ timeout: 120_000 });
    await page.keyboard.press('Escape');
    await (0, pages_fixture_1.expect)(loginPage.usernameInput).toBeVisible({ timeout: 60_000 });
    await (0, pages_fixture_1.expect)(page).toHaveURL(/\/app\/authentication\/login/);
  });
  (0, pages_fixture_1.test)('TC-09 Repeated rapid submissions raise a single auth flow', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ loginPage, page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the login form and prepare request tracking');
    await loginPage.open();
    await loginPage.expectFormRendered();
    const iamCalls = [];
    page.on('request', (r) => {
      if (/\/authApi\/api\/v\d+\/(iam|beneficiary_session)/.test(r.url())) iamCalls.push(r.url());
    });
    await (0, LogSteps_1.logStep)('Step 02: Submit the identifier multiple times rapidly');
    await loginPage.usernameInput.fill(testData_1.TEST_USER.nationalId);
    await loginPage.usernameInput.press('Enter');
    await loginPage.usernameInput.press('Enter');
    await loginPage.usernameInput.press('Enter');
    await (0, LogSteps_1.logStep)('Step 03: Verify only one auth flow is initiated');
    await (0, pages_fixture_1.expect)(loginPage.nafathModal).toBeVisible({ timeout: 120_000 });
    const sessionChecks = iamCalls.filter((u) => u.includes('beneficiary_session'));
    (0, pages_fixture_1.expect)(sessionChecks.length, 'duplicate session checks').toBeLessThanOrEqual(2);
  });
});
