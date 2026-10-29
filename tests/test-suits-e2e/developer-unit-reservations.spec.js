'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const test_1 = require('@playwright/test');
const web_app_1 = require('@base-class/web-app');
const DataHelper_1 = require('@helpers/DataHelper');
const LogSteps_1 = require('@helpers/LogSteps');
const SERVICE = 'developer-unit-reservation';
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
test_1.test.describe('Update unit price from partners', () => {
  (0, test_1.test)('TC-01 - Developer books a unit for a non-bene user in offplan private project', { annotation: [{ product: 'Marketplace', type: 'critical' }] }, async ({ page }) => {
    await (0, LogSteps_1.logStep)('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const nationalId = data.sakaniUserIdNonEligible;
    const unitCode = data.unitCodeOffplanPrivate;
    const developerUserId = data.developerUserId;
    const bankName = 'بنك الأهلي السعودي';
    await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
    await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await app.developerProjectPage.loginDeveloper(developerUserId);
    await app.developerProjectPage.switchRoleToDeveloper();
    await (0, LogSteps_1.logStep)('Step 02: Start new individual booking > Enter user id');
    await app.developerProjectPage.bookUnitsForCustomersUsingUnitCode(nationalId, unitCode);
    await page.waitForTimeout(5000);
    await (0, LogSteps_1.logStep)('Step 03: Select unit and move to financial information page');
    await app.developerProjectPage.selectUnitCheckbox(1);
    await app.developerProjectPage.clickOnNextButton();
    await app.developerProjectPage.clickContinueBookingButton();
    await (0, LogSteps_1.logStep)('Step 04: Select the bank and confirm the booking > Verify booking list is visible');
    await app.developerProjectPage.selectBank(bankName);
    await app.developerProjectPage.clickOnNextButton();
    await app.developerProjectPage.clickOnConfirmationButton();
    await (0, LogSteps_1.logStep)('Step 05: Verify the reservation is successful');
    await app.developerProjectPage.validateSuccessReservationPopup();
  });
  (0, test_1.test)(
    'TC-02 Developer verifies the reservation is present and cancels it (non-bene, offplan private)',
    { annotation: [{ product: 'Marketplace', type: 'critical' }] },
    async ({ page }) => {
      test_1.test.setTimeout(0);
      await (0, LogSteps_1.logStep)('Step 00: Read data from json relative to the service');
      const environment = readEnvironments();
      const data = readServiceData();
      const app = new web_app_1.WebApp(page);
      const developerUserId = data.developerUserId;
      const sapaPortalUrl = environment.sapaPortalUrl;
      const unitCode = data.unitCodeOffplanPrivate;
      await (0, LogSteps_1.logStep)('Step 01: Login as developer to sapa portal');
      await app.developerProjectPage.gotoAuth(sapaPortalUrl);
      await app.developerProjectPage.loginDeveloper(developerUserId);
      await app.developerProjectPage.switchRoleToDeveloper();
      await (0, LogSteps_1.logStep)('Step 02: Navigate to individual bookings and validate the booking is available by unit code');
      await app.developerProjectPage.navigateToIndividualBookings();
      await app.developerProjectPage.searchBookingByUnitCode(unitCode);
      await app.developerProjectPage.filterBookingsByStatus('عرض السعر');
      await app.developerProjectPage.viewDetailsOfSearchedBooking();
      await (0, LogSteps_1.logStep)('Step 03: Navigate to booking details and cancel the booking');
      await app.discountOnReservedUnitsPage.clickOnBookingsTab();
      await (0, LogSteps_1.logStep)('Step 04: Select cancellation reason and confirm the reservation cancellation');
      await app.discountOnReservedUnitsPage.selectCancellationReasonOption();
      await app.discountOnReservedUnitsPage.clickOnCancelBookingButton();
      await app.discountOnReservedUnitsPage.clickOnContinueCancellationButton();
      await app.discountOnReservedUnitsPage.clickOnNoButton();
      await (0, LogSteps_1.logStep)('Step 05: Enter OTP and verify');
      await app.discountOnReservedUnitsPage.fillCancellationOtpCodeInput(1234);
      await app.discountOnReservedUnitsPage.clickOnVerifyCancellationCodeButton();
      await (0, LogSteps_1.logStep)('Step 06: Validate the message');
      await app.discountOnReservedUnitsPage.verifyBeneficiaryCancellationToastSuccessMessage();
    }
  );
  (0, test_1.test)('TC-03 - Developer books a unit for a beneficiary user in offplan moh land project', { annotation: [{ product: 'Marketplace', type: 'critical' }] }, async ({ page }) => {
    await (0, LogSteps_1.logStep)('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const nationalId = data.sakaniUserIdEligible;
    const unitCode = data.unitCodeOffplanMoh;
    const developerUserId = data.developerUserId;
    const bankName = 'بنك الأهلي السعودي';
    await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
    await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await app.developerProjectPage.loginDeveloper(developerUserId);
    await app.developerProjectPage.switchRoleToDeveloper();
    await (0, LogSteps_1.logStep)('Step 02: Start new individual booking > Enter user id');
    await app.developerProjectPage.bookUnitsForCustomersUsingUnitCode(nationalId, unitCode);
    await page.waitForTimeout(5000);
    await (0, LogSteps_1.logStep)('Step 03: Select unit and move to financial information page');
    await app.developerProjectPage.selectUnitCheckbox(1);
    await app.developerProjectPage.clickOnNextButton();
    await app.developerProjectPage.clickSelectAndContinue();
    await app.developerProjectPage.clickContinueBookingButton();
    await (0, LogSteps_1.logStep)('Step 04: Select the bank and confirm the booking > Verify booking list is visible');
    await app.developerProjectPage.selectBank(bankName);
    await app.developerProjectPage.clickOnNextButton();
    await app.developerProjectPage.clickOnConfirmationButton();
    await (0, LogSteps_1.logStep)('Step 05: Verify the reservation is successful');
    await app.developerProjectPage.validateSuccessReservationPopup();
  });
  (0, test_1.test)(
    'TC-04 Developer verifies the reservation is present and cancels it (beneficiary, offplan moh land)',
    { annotation: [{ product: 'Marketplace', type: 'critical' }] },
    async ({ page }) => {
      test_1.test.setTimeout(0);
      await (0, LogSteps_1.logStep)('Step 00: Read data from json relative to the service');
      const environment = readEnvironments();
      const data = readServiceData();
      const app = new web_app_1.WebApp(page);
      const developerUserId = data.developerUserId;
      const sapaPortalUrl = environment.sapaPortalUrl;
      const unitCode = data.unitCodeOffplanMoh;
      await (0, LogSteps_1.logStep)('Step 01: Login as developer to sapa portal');
      await app.developerProjectPage.gotoAuth(sapaPortalUrl);
      await app.developerProjectPage.loginDeveloper(developerUserId);
      await app.developerProjectPage.switchRoleToDeveloper();
      await (0, LogSteps_1.logStep)('Step 02: Navigate to individual bookings and validate the booking is available by unit code');
      await app.developerProjectPage.navigateToIndividualBookings();
      await app.developerProjectPage.searchBookingByUnitCode(unitCode);
      await app.developerProjectPage.filterBookingsByStatus('عرض السعر');
      await app.developerProjectPage.viewDetailsOfSearchedBooking();
      await (0, LogSteps_1.logStep)('Step 03: Navigate to booking details and cancel the booking');
      await app.discountOnReservedUnitsPage.clickOnBookingsTab();
      await (0, LogSteps_1.logStep)('Step 04: Select cancellation reason and confirm the reservation cancellation');
      await app.discountOnReservedUnitsPage.selectCancellationReasonOption();
      await app.discountOnReservedUnitsPage.clickOnCancelBookingButton();
      await app.discountOnReservedUnitsPage.clickOnContinueCancellationButton();
      await app.discountOnReservedUnitsPage.clickOnNoButton();
      await app.discountOnReservedUnitsPage.clickOnYesButton();
      await (0, LogSteps_1.logStep)('Step 05: Enter OTP and verify');
      await app.discountOnReservedUnitsPage.fillCancellationOtpCodeInput(1234);
      await app.discountOnReservedUnitsPage.clickOnVerifyCancellationCodeButton();
      await (0, LogSteps_1.logStep)('Step 06: Validate the message');
      await app.discountOnReservedUnitsPage.verifyBeneficiaryCancellationToastSuccessMessage();
    }
  );
});
