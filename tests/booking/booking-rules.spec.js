'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const testData_1 = require('@data/testData');
const LogSteps_1 = require('@helpers/LogSteps');
const marketplaceApi_1 = require('@helpers/marketplaceApi');
const path = require('path');
const web_app_1 = require('@base-class/web-app');
const fs = require('fs');
function readTestData() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'test-data.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
pages_fixture_1.test.describe('Booking - business rules', () => {
  (0, pages_fixture_1.test)('TC-01 A non-bookable project rejects does not allow to user to book a unit', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page }) => {
    pages_fixture_1.test.setTimeout(0);
    const app = new web_app_1.WebApp(page);
    await (0, LogSteps_1.logStep)('Step 01: Open the non-bookable unit detail page');
    await page.goto('https://pre-sakani.housingapps.sa/app/units/174918');
    await (0, LogSteps_1.logStep)('Step 02: Validate the unavailable-booking message is shown');
    await app.unitDetailsPage.validateUnavailableMessage();
  });
  (0, pages_fixture_1.test)(
    'TC-02 Non-beneficiary account can only book non-beneficiary projects',
    { annotation: [{ product: 'Marketplace', type: 'non-critical' }] },
    async ({ authenticatedPage }) => {
      const page = authenticatedPage;
      await (0, LogSteps_1.logStep)('Step 01: Read the authenticated profile and available units');
      const me = await (0, marketplaceApi_1.getBeneficiary)(page);
      (0, pages_fixture_1.expect)(me.is_non_beneficiary, 'Fixture account should be a non-beneficiary').toBe(testData_1.TEST_USER.isNonBeneficiary);
      (0, pages_fixture_1.expect)(me.decrypted_national_id_number).toBe(testData_1.TEST_USER.nationalId);
      const units = await (0, marketplaceApi_1.getAvailableUnits)(page, testData_1.PROJECTS.bookable);
      (0, pages_fixture_1.expect)(units.length).toBeGreaterThan(0);
      // Every unit carries an explicit segment; the journey must pick a non_bene one.
      for (const unit of units) {
        (0, pages_fixture_1.expect)(unit.targetSegments.length, `Unit ${unit.unitName} should declare target segments`).toBeGreaterThan(0);
      }
      const bookable = await (0, marketplaceApi_1.findBookableNonBeneUnit)(page, testData_1.PROJECTS.bookable);
      await (0, LogSteps_1.logStep)('Step 02: Confirm the bookable unit belongs to the non-beneficiary segment');
      (0, pages_fixture_1.expect)(bookable.targetSegments).toContain('non_bene');
      (0, pages_fixture_1.expect)(bookable.bookingStatus).toBe('available');
    }
  );
  (0, pages_fixture_1.test)('TC-03 Eligibility status is reflected on the profile', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Load the authenticated profile and inspect eligibility data');
    const me = await (0, marketplaceApi_1.getBeneficiary)(authenticatedPage);
    // Drives which products, prices and payment methods the account is offered.
    (0, pages_fixture_1.expect)(me.is_non_beneficiary).toBe(true);
    (0, pages_fixture_1.expect)(me.purchase_power).toBeGreaterThan(0);
    (0, pages_fixture_1.expect)(me.number_of_active_bookings_by_project).toBeDefined();
  });
});
