import { test } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { logStep } from '@helpers/LogSteps';
import { DataHelper } from '@helpers/DataHelper';
import { RegistrationObjects } from '@objects/RegistrationObjects';

const SERVICE = 'registration';

const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;

test.describe('User registration and check eligibility', () => {
  test('TC-01 New user register', { annotation: [{ product: 'Shared Product', type: 'critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const userPortalUrl = environment.userPortalUrl;

    await logStep('Step 01: Open the user portal and login as new user');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.loginPage.acceptCookies();
    await app.loginPage.openLogin();
    await app.registrationPage.incrementNewUserId();
    await app.registrationPage.clickContinueButton();
    await app.loginPage.waitForNafathPromptToDisappear();
    await app.registrationPage.clickContinueButton();

    await logStep('Step 02: Fill new phone and email > Continue');
    await app.registrationPage.fillRandomMobilePhone();
    await app.registrationPage.fillRandomEmail();
    await app.registrationPage.checkTermsAndConditions();
    await app.registrationPage.clickContinueButton();
    await app.registrationPage.fillOtp('1234');
    await app.registrationPage.isNewUserContinueButtonVisible();
  });
  test('TC-02 Check the eligibility for the user', { annotation: [{ product: 'Gov Support', type: 'critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const userPortalUrl = environment.userPortalUrl;
    const newUserId = data.newUserId;

    await logStep('Step 01: Open the user portal and login');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.loginPage.acceptCookies();
    await app.loginPage.openLogin();
    await app.loginPage.loginWithNafath(newUserId);
    await app.loginPage.waitForNafathPromptToDisappear();
    await app.loginPage.continueNewUserPopup();
    await app.loginPage.handlePushNotificationPopup();

    await logStep('Step 02: Navigate to user profile > Click on check eligibility');
    await app.marketplaceLandingPage.openProfileManagement();
    await app.registrationPage.clickEligibilityCheckButton();
    await app.registrationPage.checkEligibilityTerms();
    await app.registrationPage.clickAcceptTermsButton();
    await app.registrationPage.checkAdditionalEligibilityCheckboxes();
    await app.registrationPage.clickContinueButton();

    await logStep('Step 03: Select current region and city> Select preferred region, city and district');
    await app.registrationPage.selectDropdownOption(RegistrationObjects.currentRegion, RegistrationObjects.riyadhOption);
    await app.registrationPage.selectDropdownOption(RegistrationObjects.currentCity, RegistrationObjects.shaqraOption);
    await app.registrationPage.selectDropdownOption(RegistrationObjects.preferredRegion, RegistrationObjects.makkahOption);
    await app.registrationPage.selectDropdownOption(RegistrationObjects.preferredCity, RegistrationObjects.jeddahOption);
    await app.registrationPage.selectDropdownOption(RegistrationObjects.preferredDistrict, RegistrationObjects.districtOption);
    await logStep('Step 04: Select current living status - rent');
    await app.registrationPage.selectDropdownOption(RegistrationObjects.currentLivingStatus, RegistrationObjects.rentalHouseOption);

    await logStep('Step 05: Enter family Ids and DOBs if exist');
    await app.registrationPage.fillAllMatchingFields(RegistrationObjects.guardianId, '1000239030');
    await app.registrationPage.fillAllMatchingFields(RegistrationObjects.guardianDob, '14000210');
    await app.registrationPage.fillAllMatchingFields(RegistrationObjects.fatherId, '1000233030');
    await app.registrationPage.fillAllMatchingFields(RegistrationObjects.fatherDob, '13800210');
    await app.registrationPage.fillAllMatchingFields(RegistrationObjects.motherId, '1000239030');
    await app.registrationPage.fillAllMatchingFields(RegistrationObjects.motherDob, '13900210');
    await app.registrationPage.clickConfirmButton();

    await logStep('Step 06: Verify the eligibility status');
    await app.registrationPage.getEligibilityResult();
  });
  test('TC-03 Submit financial advisory', { annotation: [{ product: 'Gov Support', type: 'critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const userPortalUrl = environment.userPortalUrl;
    const newUserId = data.newUserId;

    await logStep('Step 01: Open the user portal and login');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.loginPage.acceptCookies();
    await app.loginPage.openLogin();
    await app.loginPage.loginWithNafath(newUserId);
    await app.loginPage.waitForNafathPromptToDisappear();
    await app.loginPage.continueNewUserPopup();
    await app.loginPage.handlePushNotificationPopup();

    await logStep('Step 02: Navigate to user profile > Click on financial advisory');
    await app.marketplaceLandingPage.openProfileManagement();
    await app.registrationPage.clickFinancialAdvisoryLink();

    await logStep('Step 03: Start the service > Fill the required information');
    await app.registrationPage.clickStartNowButton();
    await app.registrationPage.clickStartServiceLink();
    await app.registrationPage.selectDropdownOption(RegistrationObjects.typeOfWorkDropdownList, RegistrationObjects.typeOfWorkOption);
    await app.registrationPage.selectDropdownOption(RegistrationObjects.bankDropdownList, RegistrationObjects.bankOption);
    await app.registrationPage.fillInputField(RegistrationObjects.monthlySalaryInputfield, 5000);
    await app.registrationPage.fillInputField(RegistrationObjects.homeAllowanceInputfield, 3000);
    await app.registrationPage.fillInputField(RegistrationObjects.additionalIncomeInputfield, 2500);
    await app.registrationPage.fillInputField(RegistrationObjects.personalSavingsInputfield, 5000);
    await app.registrationPage.fillInputField(RegistrationObjects.downPaymentAmountInputfield, 2500);
    await app.registrationPage.fillInputField(RegistrationObjects.monthlyObligationsInputfield, 5000);
    await app.registrationPage.fillInputField(RegistrationObjects.monthRemainingInputfield, 6);
    await app.registrationPage.clickReadyUnitsFromMarketText();
    await app.registrationPage.checkReadyUnitsCheckbox();

    await logStep('Step 04: Submit then verify the success message');
    await app.registrationPage.clickSubmitButton();
    await app.auctionPage.validateCongratulationsMessage();
  });

  test('TC-04 Verify that if no active booking then book', { annotation: [{ product: 'Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const userId = data.userId;
    const preBeta = environments['pre-beta'].userPortalUrl;
    const projectName = data.projectName;

    await logStep('Step 01: Open the user portal and login');
    await app.loginPage.gotoHomePage(preBeta);
    await app.commonMethods.unifiedSakaniLogin(userId);
    // await app.loginPage.openPreBetaLogin();
    // await app.loginPage.preBetaLoginWithNafath(userId);
    // await app.loginPage.waitForNafathPromptToDisappear();
    // await app.loginPage.continuePreBetaNewUserPopup();
    // await app.loginPage.handlePushNotificationPopup();

    await logStep('Step 02: Navigate to user profile > Open active booking then check if any active booking available');
    await app.bookingPage.openActiveBookings();
    test.skip(await app.registrationPage.isViewDetailsButtonVisible(), 'User already has an active booking; booking flow is not applicable');

    await logStep('Step 02: Find the project and open its unit model');
    await app.marketplaceLandingPage.openSearch();
    await app.marketplaceLandingPage.searchForProject(projectName);
    await app.projectDetailsPage.openUnitsAndScroll();

    await logStep('Step 03: Open a unit and start the booking');
    const page1Promise = page.waitForEvent('popup');
    await app.marketplaceLandingPage.openResidentialUnit();
    const page1 = await page1Promise;
    const page2Promise = page1.waitForEvent('popup');
    {
      const unitApp = new WebApp(page1);
      await unitApp.projectUnitsPage.openUnitInPopup(1);
    }
    const page2 = await page2Promise;
    {
      let bookingPage = page2;
      let bookingApp = new WebApp(bookingPage);

      await logStep('Step 04: Confirm terms and conditions');
      await bookingApp.unitDetailsPage.reserveUnit();
      // await bookingApp.unitBookingPage.acceptTermsAndConfirm();
      await bookingApp.bookingAndSelectPaymentMethodPage.checkOnTermAndCondition();
      await bookingApp.bookingAndSelectPaymentMethodPage.clickOnApproveAndContinueIfVisible();
      await bookingApp.bookingAndSelectPaymentMethodPage.clickOnPayBookingFeesButton();

      await logStep('Step 05: Pay booking fees and validate payment success');
      await bookingApp.paymentGatewayPage.fillCardDetails();
      await bookingApp.paymentConfirmationPage.closePayment();
      await bookingApp.paymentConfirmationPage.expectSuccessMessage();
    }
  });
  test(
    'TC-05 Verify that the financial advisory service displays Active Booking Detected when the user has an active booking',
    { annotation: [{ product: 'Rebranding', type: 'critical' }] as any },
    async ({ page }) => {
      await logStep('Step 00: Read data from json relative to the service');
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new WebApp(page);
      const userId = data.userId;
      const preBeta = environments['pre-beta'].userPortalUrl;

      await logStep('Step 01: Open the user portal and login');
      await app.loginPage.gotoHomePage(preBeta);
      await app.commonMethods.unifiedSakaniLogin(userId);

      await logStep('Step 02: Navigate to user profile > Click on financial advisory');
      await app.marketplaceLandingPage.expandProfileDropDownMenu();
      await app.marketplaceLandingPage.openProfileManagement();
      await app.registrationPage.clickFinancialAdvisoryLink();

      await logStep('Step 03: Start the service > Verify you have active message is present');
      await app.registrationPage.clickStartNowButton();
      await app.registrationPage.clickStartServiceLink();
      await app.registrationPage.verifyYouHaveActiveMessage();
    }
  );
  test(
    'TC-06 Verify That the Financial Advisory Service Displays the Saudi Citizen Only Notice for Non-Saudi Users',
    { annotation: [{ product: 'Rebranding', type: 'critical' }] as any },
    async ({ page }) => {
      await logStep('Step 00: Read data from json relative to the service');
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new WebApp(page);
      const nonSaudiUserId = data.nonSaudiUserId;
      const preBeta = environments['pre-beta'].userPortalUrl;

      await logStep('Step 01: Open the user portal and login');
      await app.loginPage.gotoHomePage(preBeta);
      await app.commonMethods.unifiedSakaniLogin(nonSaudiUserId);

      await logStep('Step 02: Navigate to user profile > Verify financial advisory option not present');
      await app.marketplaceLandingPage.openProfileManagement();
      await app.registrationPage.verifyFanaticalAdvisoryButtonNotPresent();
    }
  );
});
