'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const testData_1 = require('@data/testData');
const LogSteps_1 = require('@helpers/LogSteps');
pages_fixture_1.test.describe('Register Interest', () => {
  pages_fixture_1.test.beforeEach(async ({ registerInterestPage }) => {
    await registerInterestPage.openForProject(testData_1.PROJECTS.registerInterest);
    await registerInterestPage.expectLoaded();
  });
  (0, pages_fixture_1.test)('TC_01 The form opens scoped to the originating project', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ registerInterestPage, page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the form for the scoped project');
    await (0, pages_fixture_1.expect)(page).toHaveURL(new RegExp(`project_id=${testData_1.PROJECTS.registerInterest}`));
    await (0, LogSteps_1.logStep)('Step 02: Validate the default form fields are visible');
    await (0, pages_fixture_1.expect)(registerInterestPage.heading.first()).toBeVisible();
    await (0, pages_fixture_1.expect)(registerInterestPage.citySelect.first()).toBeVisible();
    await (0, pages_fixture_1.expect)(registerInterestPage.destinationsSelect.first()).toBeVisible();
    await (0, pages_fixture_1.expect)(registerInterestPage.projectsSelect.first()).toBeVisible();
  });
  (0, pages_fixture_1.test)('TC-02 Submit is disabled while the form is empty', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ registerInterestPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Verify submit is disabled on an empty form');
    await (0, pages_fixture_1.expect)(registerInterestPage.submitButton).toBeDisabled();
  });
  (0, pages_fixture_1.test)('TC-03 Name alone does not enable submit', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ registerInterestPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Fill only the name field');
    await registerInterestPage.fillLead({ name: testData_1.REGISTER_INTEREST_LEAD.name });
    await (0, LogSteps_1.logStep)('Step 02: Confirm submit stays disabled');
    await (0, pages_fixture_1.expect)(registerInterestPage.submitButton).toBeDisabled();
  });
  (0, pages_fixture_1.test)('TC-04 Name plus a valid mobile enables submit', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ registerInterestPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Fill the name and valid phone number');
    await registerInterestPage.fillLead({
      name: testData_1.REGISTER_INTEREST_LEAD.name,
      phone: testData_1.REGISTER_INTEREST_LEAD.phone,
    });
    await (0, LogSteps_1.logStep)('Step 02: Confirm submit is enabled');
    await (0, pages_fixture_1.expect)(registerInterestPage.submitButton).toBeEnabled();
  });
  (0, pages_fixture_1.test)('TC-05 Email is optional', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ registerInterestPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Fill the required fields without an email');
    await registerInterestPage.fillLead({
      name: testData_1.REGISTER_INTEREST_LEAD.name,
      phone: testData_1.REGISTER_INTEREST_LEAD.phone,
      email: '',
    });
    await (0, LogSteps_1.logStep)('Step 02: Validate the form remains submit-ready');
    await (0, pages_fixture_1.expect)(registerInterestPage.submitButton).toBeEnabled();
  });
  (0, pages_fixture_1.test)('TC-06 City selection is optional', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ registerInterestPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Fill the required fields without choosing a city');
    await registerInterestPage.fillLead({
      name: testData_1.REGISTER_INTEREST_LEAD.name,
      phone: testData_1.REGISTER_INTEREST_LEAD.phone,
    });
    await (0, LogSteps_1.logStep)('Step 02: Verify submit still works without a city');
    await (0, pages_fixture_1.expect)(registerInterestPage.submitButton).toBeEnabled();
  });
  for (const email of testData_1.REGISTER_INTEREST_LEAD.invalidEmails) {
    (0, pages_fixture_1.test)(`TC-07 Invalid email "${email}" blocks submission`, { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ registerInterestPage }) => {
      await (0, LogSteps_1.logStep)(`Step 01: Fill the form with invalid email ${email}`);
      await registerInterestPage.fillLead({
        name: testData_1.REGISTER_INTEREST_LEAD.name,
        phone: testData_1.REGISTER_INTEREST_LEAD.phone,
        email,
      });
      await (0, LogSteps_1.logStep)('Step 02: Confirm the format error blocks submit');
      await (0, pages_fixture_1.expect)(registerInterestPage.submitButton).toBeDisabled();
      await (0, pages_fixture_1.expect)(registerInterestPage.formatError.first()).toBeVisible();
    });
  }
  (0, pages_fixture_1.test)('TC-08 A too-short mobile reports its required length', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ registerInterestPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Enter a too-short mobile number');
    await registerInterestPage.fillLead({
      name: testData_1.REGISTER_INTEREST_LEAD.name,
      phone: testData_1.REGISTER_INTEREST_LEAD.shortPhone,
    });
    await (0, LogSteps_1.logStep)('Step 02: Validate the validation message prevents submission');
    await (0, pages_fixture_1.expect)(registerInterestPage.submitButton).toBeDisabled();
    const messages = await registerInterestPage.validationMessages();
    (0, pages_fixture_1.expect)(messages.join(' | ')).toContain(testData_1.REGISTER_INTEREST_LEAD.errors.tooShort);
  });
  (0, pages_fixture_1.test)('TC-09 The mobile field enforces the Saudi +966 5 mask', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ registerInterestPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Fill the phone field with a valid mobile number');
    await registerInterestPage.fillLead({ phone: testData_1.REGISTER_INTEREST_LEAD.phone });
    await (0, LogSteps_1.logStep)('Step 02: Confirm the number is masked to the Saudi pattern');
    (0, pages_fixture_1.expect)(await registerInterestPage.phoneInput.inputValue()).toMatch(/^\+966\s?5/);
  });
  (0, pages_fixture_1.test)('TC-10 A numeric-only name does not enable submission on its own', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ registerInterestPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Enter a numeric-only name');
    await registerInterestPage.fillLead({ name: '1234', phone: '' });
    await (0, LogSteps_1.logStep)('Step 02: Ensure the form still blocks submit');
    await (0, pages_fixture_1.expect)(registerInterestPage.submitButton).toBeDisabled();
  });
  (0, pages_fixture_1.test)(
    'TC-11 An over-long name is accepted or capped without breaking the form',
    { annotation: [{ product: 'Marketplace', type: 'non-critical' }] },
    async ({ registerInterestPage }) => {
      const longName = 'ا'.repeat(300);
      await (0, LogSteps_1.logStep)('Step 01: Enter a very long name');
      await registerInterestPage.fillLead({
        name: longName,
        phone: testData_1.REGISTER_INTEREST_LEAD.phone,
      });
      await (0, LogSteps_1.logStep)('Step 02: Confirm the field keeps working without crashing');
      const stored = await registerInterestPage.nameInput.inputValue();
      (0, pages_fixture_1.expect)(stored.length).toBeGreaterThan(0);
      await (0, pages_fixture_1.expect)(registerInterestPage.nameInput).toBeVisible();
    }
  );
  (0, pages_fixture_1.test)('TC-12 Back leaves the form without submitting', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ registerInterestPage, page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Fill the form and prepare to leave');
    await registerInterestPage.fillLead({
      name: testData_1.REGISTER_INTEREST_LEAD.name,
      phone: testData_1.REGISTER_INTEREST_LEAD.phone,
    });
    await (0, LogSteps_1.logStep)('Step 02: Click the back action and confirm navigation changes');
    await registerInterestPage.backButton.click({ force: true });
    await pages_fixture_1.expect.poll(() => new URL(page.url()).pathname, { timeout: 90_000 }).not.toMatch(/\/app\/register-interest/);
  });
  (0, pages_fixture_1.test)('TC-13 An unknown project id still renders a usable form', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ registerInterestPage, page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the form with an unknown project ID');
    await registerInterestPage.openForProject(99999999);
    await (0, LogSteps_1.logStep)('Step 02: Verify the form still renders gracefully');
    await (0, pages_fixture_1.expect)(registerInterestPage.nameInput).toBeVisible({ timeout: 150_000 });
    (0, pages_fixture_1.expect)(page.url()).toContain('project_id=99999999');
  });
  (0, pages_fixture_1.test)('TC-14 Submitting a complete lead reaches a terminal state', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ registerInterestPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Fill the form with a complete lead');
    await registerInterestPage.fillLead({
      name: testData_1.REGISTER_INTEREST_LEAD.name,
      phone: testData_1.REGISTER_INTEREST_LEAD.phone,
      email: testData_1.REGISTER_INTEREST_LEAD.email,
    });
    await (0, pages_fixture_1.expect)(registerInterestPage.submitButton).toBeEnabled();
    await (0, LogSteps_1.logStep)('Step 02: Submit the lead and check for bot challenge or success state');
    await registerInterestPage.submit();
    const challenged = await registerInterestPage.isBotChallengeVisible(15_000);
    pages_fixture_1.test.skip(challenged, 'BLOCKED: bot challenge presented on submit from this origin');
    await (0, pages_fixture_1.expect)(registerInterestPage.successMessage.first()).toBeVisible({ timeout: 60_000 });
  });
});
