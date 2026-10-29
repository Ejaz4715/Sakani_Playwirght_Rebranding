'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const EligibilityCheckPage_1 = require('@pages/EligibilityCheckPage');
const LogSteps_1 = require('@helpers/LogSteps');
pages_fixture_1.test.describe('Eligibility check', () => {
  (0, pages_fixture_1.test)('TC-01 The wizard opens with all four steps', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const eligibility = new EligibilityCheckPage_1.EligibilityCheckPage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the eligibility wizard');
    await eligibility.open();
    await eligibility.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Verify all four wizard steps are rendered');
    await (0, pages_fixture_1.expect)(authenticatedPage).toHaveURL(/\/app\/eligibility\/check/);
    (0, pages_fixture_1.expect)(await eligibility.stepLabels()).toEqual(['Terms and Conditions', 'Acknowledgement', 'Verify Information', 'Financial Advisory']);
  });
  (0, pages_fixture_1.test)('TC-02 Continue is disabled until the terms are accepted', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const eligibility = new EligibilityCheckPage_1.EligibilityCheckPage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the eligibility wizard');
    await eligibility.open();
    await eligibility.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Validate continue remains disabled before acceptance');
    await (0, pages_fixture_1.expect)(eligibility.agreeCheckbox).not.toBeChecked();
    await (0, pages_fixture_1.expect)(eligibility.agreeButton).toBeDisabled();
  });
  (0, pages_fixture_1.test)('TC-03 Accepting the terms enables continue', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const eligibility = new EligibilityCheckPage_1.EligibilityCheckPage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the eligibility wizard');
    await eligibility.open();
    await eligibility.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Accept the terms and verify continue becomes enabled');
    await eligibility.acceptTerms();
    await (0, pages_fixture_1.expect)(eligibility.agreeCheckbox).toBeChecked();
    await (0, pages_fixture_1.expect)(eligibility.agreeButton).toBeEnabled();
  });
  (0, pages_fixture_1.test)('TC-04 Unticking the terms disables continue again', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const eligibility = new EligibilityCheckPage_1.EligibilityCheckPage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the eligibility wizard');
    await eligibility.open();
    await eligibility.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Accept the terms and then uncheck them');
    await eligibility.acceptTerms();
    await (0, pages_fixture_1.expect)(eligibility.agreeButton).toBeEnabled();
    await eligibility.uncheckTerms();
    await (0, LogSteps_1.logStep)('Step 03: Verify continue disables again after unchecking');
    await (0, pages_fixture_1.expect)(eligibility.agreeCheckbox).not.toBeChecked();
    await (0, pages_fixture_1.expect)(eligibility.agreeButton).toBeDisabled();
  });
  (0, pages_fixture_1.test)('TC-05 The wizard is not reachable when logged out', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Attempt to open the eligibility wizard while logged out');
    await page.goto('/app/eligibility/check?lang=en', { waitUntil: 'commit' });
    await (0, LogSteps_1.logStep)('Step 02: Confirm the app redirects away from the protected page');
    await pages_fixture_1.expect
      .poll(() => new URL(page.url()).pathname, {
        timeout: 150_000,
        message: 'A guest must be redirected away from the eligibility wizard',
      })
      .not.toMatch(/\/app\/eligibility\/check/);
    await (0, pages_fixture_1.expect)(page.locator('#agreeTermsConditions')).toHaveCount(0);
  });
});
