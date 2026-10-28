import { expect, test } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { DataHelper } from '@helpers/DataHelper';
import { logStep } from '@helpers/LogSteps';

const SERVICE = 'flexible-payment-schedule';
const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;

test.describe('Add flexible payment schedules', () => {
  test('TC-01 Add flexible payment schedule (Completion percentage)', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    await logStep('Step 00: Read data from json relative to the service');
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const projectName = data.projectName;
    const developerUserId = data.developerUserId;
    const sapaPortalUrl = environment.sapaPortalUrl;

    await logStep('Step 01: Login as developer to sapa portal and open the project');
    await app.partnersLoginPage.gotoAuth(sapaPortalUrl);
    await app.partnersLoginPage.loginToSapaPortal(developerUserId);
    await app.partnersLoginPage.switchRoleToDeveloper();

    await logStep('Step 02: Define the schedule name in AR and EN');
    const scheduleTitleAr = `جدول دفع مرن لخدمات أتمتة الاختبارات ${new Date()
      .toISOString()
      .replace(/[-:T.]/g, '')
      .slice(0, 14)}`;

    const scheduleTitleEn = `Automation Flexible Payment Schedule ${new Date()
      .toISOString()
      .replace(/[-:T.]/g, '')
      .slice(0, 14)}`;

    DataHelper.updateServiceData(SERVICE, 'scheduleTitleAr', scheduleTitleAr);
    DataHelper.updateServiceData(SERVICE, 'scheduleTitleEn', scheduleTitleEn);

    await logStep('Step 03: Navigate to financials management > Payment Schedules');
    await app.flexiblePaymentPage.clickOnFinancialManagement();
    await app.flexiblePaymentPage.clickOnPaymentSchedules();

    await logStep('Step 04: Navigate to add new flexible payment schedule > Provide basic details');
    await app.flexiblePaymentPage.clickOnNewSchedulesButton();
    await app.flexiblePaymentPage.enterScheduleNameInArabic(scheduleTitleAr);
    await app.flexiblePaymentPage.enterScheduleNameInEnglish(scheduleTitleEn);
    await app.flexiblePaymentPage.selectScheduleType('completionPercentage');
    await app.flexiblePaymentPage.clickOnNextButton();

    await logStep('Step 05: Select the payment percenatge and completion percentage of all the installments');
    await app.flexiblePaymentPage.fillFirstPaymentPaidPercentage(50);
    await app.flexiblePaymentPage.fillFirstPaymentCompletionPercentage(20);
    await app.flexiblePaymentPage.fillSecondPaymentPaidPercentage(30);
    await app.flexiblePaymentPage.fillSecondPaymentCompletionPercentage(30);
    await app.flexiblePaymentPage.fillThirdPaymentPaidPercentage(20);
    await app.flexiblePaymentPage.fillThirdPaymentCompletionPercentage(100);
    await app.flexiblePaymentPage.clickOnNextButton();

    await logStep('Step 06: Search and select project');
    await app.flexiblePaymentPage.serachByprojectName(projectName);
    await app.flexiblePaymentPage.checkOnProjectNameSearchedResult();
    await app.flexiblePaymentPage.clickOnNextButton();

    await logStep('Step 07: Review the summary and move to next section');
    await app.flexiblePaymentPage.clickOnNextButton();

    await logStep('Step 08: Confirm the schedule > Validate the success message');
    await app.flexiblePaymentPage.clickOnConfirmButton();
    await app.flexiblePaymentPage.verifyTheSuccessfulMessage();
  });

  //Rebranding

  test('TC-02 Verify payment schedules are present', { annotation: [{ product: 'Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const userId = data.userId;
    const preBeta = environments['pre-beta'].userPortalUrl;
    const projectName = data.projectName;
    const scheduleTitleAr = data.scheduleTitleAr;

    await logStep('Step 01: Open the user portal and login');
    await app.loginPage.gotoHomePage(preBeta);
    await app.commonMethods.unifiedSakaniLogin(userId);
    // await app.loginPage.openPreBetaLogin();
    // await app.loginPage.preBetaLoginWithNafath(userId);
    // await app.loginPage.waitForNafathPromptToDisappear();
    // await app.loginPage.continuePreBetaNewUserPopup();
    // await app.loginPage.handlePushNotificationPopup();

    await logStep('Step 02: Find the project and open its unit model');
    await app.marketplaceLandingPage.openSearch();
    await app.marketplaceLandingPage.searchForProject(projectName);

    await logStep('Step 03: Verify the flexible payment schedule are present');
    await app.flexiblePaymentPage.verifyFlexibleSchedulePaymentIsVisible(scheduleTitleAr);
  });
  test('TC-03 Verify installments are available', { annotation: [{ product: 'Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const userId = data.userId;
    const preBeta = environments['pre-beta'].userPortalUrl;
    const projectName = data.projectName;
    const scheduleTitleAr = data.scheduleTitleAr;

    await logStep('Step 01: Open the user portal and login');
    await app.loginPage.gotoHomePage(preBeta);
    await app.commonMethods.unifiedSakaniLogin(userId);
    // await app.loginPage.openPreBetaLogin();
    // await app.loginPage.preBetaLoginWithNafath(userId);
    // await app.loginPage.waitForNafathPromptToDisappear();
    // await app.loginPage.continuePreBetaNewUserPopup();
    // await app.loginPage.handlePushNotificationPopup();

    await logStep('Step 02: Find the project and open its unit model');
    await app.marketplaceLandingPage.openSearch();
    await app.marketplaceLandingPage.searchForProject(projectName);

    await logStep('Step 03: Verify the installments details are present');
    await app.flexiblePaymentPage.verifyFlexibleSchedulePaymentIsVisible(scheduleTitleAr);
    await app.flexiblePaymentPage.clickViewDetailsForFlexibleSchedule(scheduleTitleAr);
    await app.flexiblePaymentPage.verifyTheInstallmentsDetailsIsPresent();
  });

  // test('TC-04 User book a unit', { annotation: [{ product: 'Rebranding', type: 'critical' }] as any }, async ({ page }) => {
  //   await logStep('Step 00: Read data from json relative to the service');
  //   const data = readServiceData();
  //   const environments = readEnvironments();
  //   const app = new WebApp(page);
  //   const userId = data.userId;
  //   const preBeta = environments['pre-beta'].userPortalUrl;
  //   const projectName = data.projectName;

  //   await logStep('Step 01: Open the user portal and login');
  //   await app.loginPage.gotoHomePage(preBeta);
  //   await app.commonMethods.unifiedSakaniLogin(userId);
  //   // await app.loginPage.openPreBetaLogin();
  //   // await app.loginPage.preBetaLoginWithNafath(userId);
  //   // await app.loginPage.waitForNafathPromptToDisappear();
  //   // await app.loginPage.continuePreBetaNewUserPopup();
  //   // await app.loginPage.handlePushNotificationPopup();

  //   await logStep('Step 02: Find the project and open its unit model');
  //   await app.marketplaceLandingPage.openSearch();
  //   await app.marketplaceLandingPage.searchForProject(projectName);
  //   await app.projectDetailsPage.openUnitsAndScroll();

  //   await logStep('Step 03: Open a unit and start the booking');
  //   const page1Promise = page.waitForEvent('popup');
  //   await app.marketplaceLandingPage.openResidentialUnit();
  //   const page1 = await page1Promise;
  //   const page2Promise = page1.waitForEvent('popup');
  //   {
  //     const unitApp = new WebApp(page1);
  //     await unitApp.projectUnitsPage.openUnitInPopup(1);
  //   }
  //   const page2 = await page2Promise;
  //   {
  //     let bookingPage = page2;
  //     let bookingApp = new WebApp(bookingPage);

  //     await logStep('Step 04: Confirm terms and conditions');
  //     await bookingApp.unitDetailsPage.reserveUnit();
  //     // await bookingApp.unitBookingPage.acceptTermsAndConfirm();
  //     await bookingApp.bookingAndSelectPaymentMethodPage.checkOnTermAndCondition();
  //     await bookingApp.bookingAndSelectPaymentMethodPage.clickOnApproveAndContinueIfVisible();
  //     await bookingApp.bookingAndSelectPaymentMethodPage.clickOnPayBookingFeesButton();

  //     await logStep('Step 05: Pay booking fees and validate payment success');
  //     await bookingApp.paymentGatewayPage.fillCardDetails();
  //     await bookingApp.paymentConfirmationPage.closePayment();
  //     await bookingApp.paymentConfirmationPage.expectSuccessMessage();
  //   }
  // });

  // test('TC-05 User signs sales contract of booked unit', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
  //   await logStep('Step 00: Read data from json relative to the service');
  //   const data = readServiceData();
  //   const environments = readEnvironments();
  //   const app = new WebApp(page);
  //   const userId = data.userId;
  //   const preBeta = environments['pre-beta'].userPortalUrl;

  //   await logStep('Step 01: Open the user portal and login');
  //   await app.loginPage.gotoHomePage(preBeta);
  //   await app.commonMethods.unifiedSakaniLogin(userId);

  //   await logStep('Step 03: Open active bookings');
  //   await app.bookingPage.openActiveBookings();

  //   await logStep('Step 04: Capture booked unit code and save to test data');
  //   const bookedUnitCode = await app.bookingPage.getBookedUnitCode();
  //   expect(bookedUnitCode).toBeTruthy();
  //   DataHelper.updateServiceData('flexible-payment-schedule', 'bookedUnitCode', bookedUnitCode);

  //   await logStep('Step 05: Open booking details');
  //   await app.bookingPage.openBookingDetails();

  //   await logStep('Step 06: Sign and verify the sales contract signed message');
  //   await app.bookingAndSelectPaymentMethodPage.clickOnSignContractButton();
  //   await app.unitBookingPage.clickOnApproveButton();
  //   await app.unitBookingPage.enterOtp();
  //   await app.unitBookingPage.clickOnVerifyButton();
  //   await app.unitBookingPage.clickOnDoneButton();
  // });
  test('TC-05 Edit payment schedule (Completion percentage)', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    await logStep('Step 00: Read data from json relative to the service');
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const developerUserId = data.developerUserId;
    const sapaPortalUrl = environment.sapaPortalUrl;
    const scheduleTitleAr = data.scheduleTitleAr;
    const benefitPercenatage = '5';

    await logStep('Step 01: Login as developer to sapa portal and open the project');
    await app.partnersLoginPage.gotoAuth(sapaPortalUrl);
    await app.partnersLoginPage.loginToSapaPortal(developerUserId);
    await app.partnersLoginPage.switchRoleToDeveloper();

    await logStep('Step 02: Navigate to financials management > Payment Schedules');
    await app.flexiblePaymentPage.clickOnFinancialManagement();
    await app.flexiblePaymentPage.clickOnPaymentSchedules();

    await logStep('Step 03: Search for a schedule > View details of the schedule');
    await app.flexiblePaymentPage.searchScheduleByTitle(scheduleTitleAr);
    await page.waitForTimeout(5000);
    await app.flexiblePaymentPage.clickOnScheduleDetails();

    await logStep('Step 04: Edit schedule > Add Benefit percentage and confirm the update');
    await app.flexiblePaymentPage.clickOnEditSchedule();
    const valBefore = await app.flexiblePaymentPage.getBenefitPercenategValue();
    expect(Number(valBefore?.replace('%', '').trim())).toEqual(0);
    await app.flexiblePaymentPage.clickOnNextButton();
    await app.flexiblePaymentPage.clickOnNextButton();
    await app.flexiblePaymentPage.clickOnNextButton();
    await app.flexiblePaymentPage.enterBenefitPercentage(benefitPercenatage);
    await app.flexiblePaymentPage.clickOnNextButton();
    await app.flexiblePaymentPage.clickOnConfirmButton();

    await logStep('Step 04: Validate the success update message > Validate the value is reflected in the details schedule details page');
    await app.flexiblePaymentPage.verifyTheSuccessfulMessage();
    await app.flexiblePaymentPage.clickGoToDetailsButton();
    const valAfter = await app.flexiblePaymentPage.getBenefitPercenategValue();
    expect(Number(valAfter?.replace('%', '').trim())).toEqual(Number(benefitPercenatage));
  });

  test('TC-06 Delete flexible payment schedule (Completion percentage)', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    await logStep('Step 00: Read data from json relative to the service');
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const developerUserId = data.developerUserId;
    const sapaPortalUrl = environment.sapaPortalUrl;
    const scheduleTitleAr = data.scheduleTitleAr;
    const scheduleTitleEn = data.scheduleTitleEn;

    await logStep('Step 01: Login as developer to sapa portal and open the project');
    await app.partnersLoginPage.gotoAuth(sapaPortalUrl);
    await app.partnersLoginPage.loginToSapaPortal(developerUserId);
    await app.partnersLoginPage.switchRoleToDeveloper();

    await logStep('Step 02: Navigate to financials management > Payment Schedules');
    await app.flexiblePaymentPage.clickOnFinancialManagement();
    await app.flexiblePaymentPage.clickOnPaymentSchedules();

    await logStep('Step 03: Search for a schedule > View details of the schedule');
    await app.flexiblePaymentPage.searchScheduleByTitle(scheduleTitleAr);
    await page.waitForTimeout(5000);
    await app.flexiblePaymentPage.clickOnScheduleDetails();

    await logStep('Step 04: Delete schedule');
    await app.flexiblePaymentPage.clickOnDeleteSchedule();
    await page.waitForTimeout(2000);
    await app.flexiblePaymentPage.clickOnDeleteSchedule();

    await logStep('Step 04: Validate the toast message');
    await app.flexiblePaymentPage.clickOnScheduleDeletedMessage();
  });

  test('TC-07 Add flexible payment schedule (Specific period)', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    await logStep('Step 00: Read data from json relative to the service');
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const projectName = data.projectName;
    const developerUserId = data.developerUserId;
    const sapaPortalUrl = environment.sapaPortalUrl;

    await logStep('Step 01: Login as developer to sapa portal and open the project');
    await app.partnersLoginPage.gotoAuth(sapaPortalUrl);
    await app.partnersLoginPage.loginToSapaPortal(developerUserId);
    await app.partnersLoginPage.switchRoleToDeveloper();

    await logStep('Step 02: Define the schedule name in AR and EN');
    const scheduleTitleAr = `جدول دفع مرن لخدمات أتمتة الاختبارات ${new Date()
      .toISOString()
      .replace(/[-:T.]/g, '')
      .slice(0, 14)}`;

    const scheduleTitleEn = `Automation Flexible Payment Schedule ${new Date()
      .toISOString()
      .replace(/[-:T.]/g, '')
      .slice(0, 14)}`;

    DataHelper.updateServiceData('flexible-payment-schedule', 'scheduleTitleAr', scheduleTitleAr);
    DataHelper.updateServiceData('flexible-payment-schedule', 'scheduleTitleEn', scheduleTitleEn);

    await logStep('Step 03: Navigate to financials management > Payment Schedules');
    await app.flexiblePaymentPage.clickOnFinancialManagement();
    await app.flexiblePaymentPage.clickOnPaymentSchedules();

    await logStep('Step 04: Navigate to add new flexible payment schedule > Provide basic details');
    await app.flexiblePaymentPage.clickOnNewSchedulesButton();
    await app.flexiblePaymentPage.enterScheduleNameInArabic(scheduleTitleAr);
    await app.flexiblePaymentPage.enterScheduleNameInEnglish(scheduleTitleEn);

    await logStep('Step 05: Select schedule type to be specific period');
    await app.flexiblePaymentPage.selectScheduleType('specificPeriod');
    await app.flexiblePaymentPage.selectPlanTypeMonthly();
    await app.flexiblePaymentPage.enterPlanPeriod('36');
    await app.flexiblePaymentPage.clickOnNextButton();

    await logStep('Step 06: Review the monthly payments plan and move to next section');
    await app.flexiblePaymentPage.clickOnNextButton();

    await logStep('Step 07: Search and select project');
    await app.flexiblePaymentPage.serachByprojectName(projectName);
    await app.flexiblePaymentPage.checkOnProjectNameSearchedResult();
    await app.flexiblePaymentPage.clickOnNextButton();

    await logStep('Step 08: Review the summary and move to next section');
    await app.flexiblePaymentPage.clickOnNextButton();

    await logStep('Step 09: Confirm the schedule > Validate the success message');
    await app.flexiblePaymentPage.clickOnConfirmButton();
    await app.flexiblePaymentPage.verifyTheSuccessfulMessage();
  });

  test('TC-08 Delete flexible payment schedule (Specific period)', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    await logStep('Step 00: Read data from json relative to the service');
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const developerUserId = data.developerUserId;
    const sapaPortalUrl = environment.sapaPortalUrl;
    const scheduleTitleAr = data.scheduleTitleAr;
    const scheduleTitleEn = data.scheduleTitleEn;

    await logStep('Step 01: Login as developer to sapa portal and open the project');
    await app.partnersLoginPage.gotoAuth(sapaPortalUrl);
    await app.partnersLoginPage.loginToSapaPortal(developerUserId);
    await app.partnersLoginPage.switchRoleToDeveloper();

    await logStep('Step 02: Navigate to financials management > Payment Schedules');
    await app.flexiblePaymentPage.clickOnFinancialManagement();
    await app.flexiblePaymentPage.clickOnPaymentSchedules();

    await logStep('Step 03: Search for a schedule > View details of the schedule');
    await app.flexiblePaymentPage.searchScheduleByTitle(scheduleTitleAr);
    await page.waitForTimeout(5000);
    await app.flexiblePaymentPage.clickOnScheduleDetails();

    await logStep('Step 04: Delete schedule');
    await app.flexiblePaymentPage.clickOnDeleteSchedule();
    await page.waitForTimeout(2000);
    await app.flexiblePaymentPage.clickOnDeleteSchedule();

    await logStep('Step 04: Validate the toast message');
    await app.flexiblePaymentPage.clickOnScheduleDeletedMessage();
  });
});
