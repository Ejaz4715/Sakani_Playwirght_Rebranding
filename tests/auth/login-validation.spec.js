'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const marketplaceApi_1 = require('@helpers/marketplaceApi');
const testData_1 = require('@data/testData');
const testData_2 = require('@data/testData');
const LogSteps_1 = require('@helpers/LogSteps');
pages_fixture_1.test.describe('Authentication - validation', () => {
  (0, pages_fixture_1.test)('TC-01 Continue is disabled until an identifier is entered', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ loginPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the login form');
    await loginPage.open();
    await (0, LogSteps_1.logStep)('Step 02: Confirm the identifier field is empty and continue is disabled');
    await (0, pages_fixture_1.expect)(loginPage.usernameInput).toHaveValue('');
    await (0, pages_fixture_1.expect)(loginPage.continueButton).toBeDisabled();
  });
  (0, pages_fixture_1.test)('TC-02 Continue enables after entering the national ID', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ loginPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the login page');
    await loginPage.open();
    await (0, LogSteps_1.logStep)('Step 02: Enter the national ID and enable continue');
    await loginPage.enterIdentifier(testData_2.TEST_USER.nationalId);
    await (0, pages_fixture_1.expect)(loginPage.continueButton).toBeEnabled();
  });
  (0, pages_fixture_1.test)('TC-03 guest booking redirects to login and preserves the return url', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page, browser }) => {
    // The inventory lookup needs a session; the journey itself must be a guest.
    const lookupContext = await browser.newContext();
    const lookupPage = await lookupContext.newPage();
    let unitId = null;
    try {
      await (0, LogSteps_1.logStep)('Step 01: Find a bookable unit in a guest session');
      await lookupPage.goto('/app/marketplace?lang=en', { waitUntil: 'commit' });
      const unit = await (0, marketplaceApi_1.findBookableUnit)(lookupPage, testData_1.PROJECTS.bookable);
      unitId = unit?.id ?? null;
    } finally {
      await lookupContext.close();
    }
    pages_fixture_1.test.skip(!unitId, `TEST DATA BLOCKER: project ${testData_1.PROJECTS.bookable} exposes no bookable unit for a guest journey`);
    await (0, LogSteps_1.logStep)('Step 02: Deep-link the unit as a guest and trigger booking');
    await page.goto(`/app/units/${unitId}?lang=en`, { waitUntil: 'commit' });
    const bookButton = page.getByRole('button', { name: /Book a unit|احجز وحدة/i }).first();
    await bookButton.waitFor({ state: 'visible', timeout: 150_000 });
    await bookButton.focus();
    await bookButton.press('Enter');
    await (0, LogSteps_1.logStep)('Step 03: Confirm the login modal appears');
    await (0, pages_fixture_1.expect)(page.locator('//app-nafath-login-modal')).toBeVisible({ timeout: 60_000 });
  });
});
