import { test } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { logStep } from '@helpers/LogSteps';
import { BookingCancellationObjects } from '@objects/BookingCancellationObjects';
import { DataHelper } from '@helpers/DataHelper';

const SERVICE = 'ready-made-project';
const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;
const readPreBetaEnvironments = () => DataHelper.readData().environments['preBeta'].userPortalUrl;

test.describe('View Proejct and unit of Readymade', () => {
  test('TC-01 Verify user viewing the project', { annotation: [{ product: 'Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environment = readEnvironments();
    const app = new WebApp(page);
    const sakaniUserId = data.sakaniUserId;
    const userPortalUrl = environment.userPortalUrl;
    const projectNameView = data.projectNameView;

    await logStep('Step 01: Open the user portal and login');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.loginPage.acceptCookies();
    await app.loginPage.openLogin();
    await app.loginPage.loginWithNafath(sakaniUserId);
    await app.loginPage.waitForNafathPromptToDisappear();
    await app.loginPage.continueNewUserPopup();
    await app.loginPage.handlePushNotificationPopup();

    await logStep('Step 02: Verify project sections are present');
    await app.marketplaceLandingPage.openSearch();
    await app.marketplaceLandingPage.clickSearchedResultIfTextMatches(projectNameView);
    await app.bookingPage.verifyElementVisibility(BookingCancellationObjects.projectInfoSection, true);
    await app.bookingPage.verifyElementVisibility(BookingCancellationObjects.brochureAndMasterplanSection, true);
    await app.bookingPage.verifyElementVisibility(BookingCancellationObjects.projectUnitsTypesSection, true);
    await app.bookingPage.verifyElementVisibility(BookingCancellationObjects.projectFacilitiesSection, true);
    await app.bookingPage.verifyElementVisibility(BookingCancellationObjects.projectInsightSection, true);
    await app.bookingPage.verifyElementVisibility(BookingCancellationObjects.participatinBanksSection, true);
    await app.bookingPage.verifyElementVisibility(BookingCancellationObjects.projectContactsSection, true);
    await app.bookingPage.verifyElementVisibility(BookingCancellationObjects.projectUnitsSection, true);
  });

  test('TC-02 Verify user viewing the unit', { annotation: [{ product: 'Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environment = readEnvironments();
    const app = new WebApp(page);
    const sakaniUserId = data.sakaniUserId;
    const userPortalUrl = environment.userPortalUrl;
    const projectNameView = data.projectNameView;

    await logStep('Step 01: Open the user portal and login');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.loginPage.acceptCookies();
    await app.loginPage.openLogin();
    await app.loginPage.loginWithNafath(sakaniUserId);
    await app.loginPage.waitForNafathPromptToDisappear();
    await app.loginPage.continueNewUserPopup();
    await app.loginPage.handlePushNotificationPopup();
    await logStep('Step 02: Find the project and open its unit model');
    await app.marketplaceLandingPage.openSearch();
    await app.marketplaceLandingPage.clickSearchedResultIfTextMatches(projectNameView);
    await app.projectDetailsPage.openUnitsAndScroll();
    await logStep('Step 03: Open a unit and start the booking');
    await app.marketplaceLandingPage.openReadyMadeUnit();
    await logStep('Step 04: Verify unit sections are present');
    await app.bookingPage.verifyElementVisibility(BookingCancellationObjects.projectInfoSection, true);
    await app.bookingPage.verifyElementVisibility(BookingCancellationObjects.brochureCard, true);
    await app.bookingPage.verifyElementVisibility(BookingCancellationObjects.masterplanCard, true);
    await app.bookingPage.verifyElementVisibility(BookingCancellationObjects.licenseAndAdvertismentSection, true);
    await app.bookingPage.verifyElementVisibility(BookingCancellationObjects.unitDetailsSection, true);
    await app.bookingPage.verifyElementVisibility(BookingCancellationObjects.projectFacilitiesSection, true);
    await app.bookingPage.verifyElementVisibility(BookingCancellationObjects.husngAssistancentSection, true);
    await app.bookingPage.verifyElementVisibility(BookingCancellationObjects.participatinBanksSection, true);
    await app.bookingPage.verifyElementVisibility(BookingCancellationObjects.projectContactsSection, true);
  });

  //Rebranding
  test('TC-03 User books ready made unit', { annotation: [{ product: 'Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    const app = new WebApp(page);
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readPreBetaEnvironments();
    const sakaniUserId = data.sakaniUserId;
    const userPortalUrl = environments;
    const projectNameBooking = data.projectNameBooking;

    await logStep('Step 01: Open the user portal and login');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.commonMethods.unifiedSakaniLogin(sakaniUserId);

    await logStep('Step 02: Find the project and open its unit model');
    await app.marketplaceLandingPage.openSearch();
    await app.marketplaceLandingPage.searchForProject(projectNameBooking);
    await app.projectDetailsPage.openUnitsAndScroll();

    await logStep('Step 03: Open a unit and start the booking');
    await app.marketplaceLandingPage.openReadyMadeUnit();
    await app.unitDetailsPage.reserveUnit();

    await logStep('Step 04: Confirm terms and conditions');
    await app.bookingPage.checkOnTermsAndConditions();

    await logStep('Step 05: Click on confirm booking then verify the confirmation booking success message');
    await app.bookingPage.clickOnConfirmBookingButton();
    await app.bookingPage.verifyConfirmBookingSuccessMessageIsPresent();
  });

  test('TC-04 User cancels a ready made booking', { annotation: [{ product: 'Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readPreBetaEnvironments();
    const app = new WebApp(page);
    const sakaniUserId = data.sakaniUserId;
    const userPortalUrl = environments;

    await logStep('Step 01: Open user portal > Log in with Nafath');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.commonMethods.unifiedSakaniLogin(sakaniUserId);

    await logStep('Step 02: Open active bookings');
    await app.bookingPage.openActiveBookings();

    await logStep('Step 03: Open booking details');
    await app.bookingPage.openBookingDetails();

    await logStep('Step 04: Cancel the booking and validate cancellation success message');
    await app.bookingPage.cancelBooking();
    await app.bookingPage.expectCancellationSuccess();
  });
});
