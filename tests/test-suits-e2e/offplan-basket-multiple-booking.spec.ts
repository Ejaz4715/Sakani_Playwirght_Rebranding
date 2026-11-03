import { expect, test } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { addOffplanProjectForMultipleBooking } from '@helpers/AddOffplanProject';
import { developerApprovesSalesContract } from '@helpers/DeveloperApproveSalesContract';
import { developerBooksUnits } from '@helpers/DeveloperBookUnits';
import { DataHelper } from '@helpers/DataHelper';
import { logStep } from '@helpers/LogSteps';

const SERVICE = 'offPlan-basket-multiple-booking';

const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;
const writeServiceData = (key: string, value: any) => DataHelper.updateServiceData(SERVICE, key, value);

const LONG_TIMEOUT = 90_000;

test.describe('OffPlan unit basket - Multiple units booking ', () => {
  let unit1Code: string;
  let unit2Code: string;

  test(
    'TC-01 Admin adds a new offplan project for (unit basket mulitple booking) ',
    {
      annotation: [
        {
          product: 'DoctorTest',
          type: 'critical',
        },
      ] as any,
    },
    async ({ page }) => {
      await addOffplanProjectForMultipleBooking(page, SERVICE);
    }
  );

  test(
    'TC-02 Developer approves sales contract',
    {
      annotation: [
        {
          product: 'Marketplace',
          type: 'critical',
        },
      ] as any,
    },
    async ({ page }) => {
      await developerApprovesSalesContract(page, SERVICE);
    }
  );

  test(
    'TC-03 Developer books multiple units',
    {
      annotation: [
        {
          product: 'Marketplace',
          type: 'critical',
        },
      ] as any,
    },
    async ({ page }) => {
      await developerBooksUnits(page, SERVICE, 2);
    }
  );

  test(
    'TC-04 User pays the invoices for all units',
    {
      annotation: [
        {
          product: 'Marketplace',
          type: 'critical',
        },
      ] as any,
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new WebApp(page);
      const sakaniUserId = data.sakaniUserId;
      const userPortalUrl = environments.userPortalUrl;

      await logStep('Step 01: Navigate to user portal > Login');
      await app.loginPage.gotoHomePage(userPortalUrl);
      await app.loginPage.acceptCookies();
      await app.loginPage.openLogin();
      await app.loginPage.loginWithNafath(sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continueNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();

      await logStep('Step 02: Navigate to my activities > Active bookings > Not billed');
      await app.marketplaceLandingPage.openProfileManagement();
      await app.offPlanBasketMultipleBookingPage.clickMyActivities();
      await app.offPlanBasketMultipleBookingPage.clickOnBookings();
      await app.offPlanBasketMultipleBookingPage.clickOnActiveBooking();
      await app.offPlanBasketMultipleBookingPage.clickOnNotBilled();

      await logStep('Step 03: Save the booked unit codes to test data');
      unit1Code = await app.offPlanBasketMultipleBookingPage.getUnit1Code();
      unit2Code = await app.offPlanBasketMultipleBookingPage.getUnit2Code();
      writeServiceData('unit1Code', unit1Code);
      writeServiceData('unit2Code', unit2Code);

      await logStep('Step 04: Select all units > Pay the invoices > Verify payment is successful');
      await app.offPlanBasketMultipleBookingPage.clickOnUnit1CheckBox();
      await app.offPlanBasketMultipleBookingPage.clickOnUnit2CheckBox();
      await app.offPlanBasketMultipleBookingPage.clickOnPayBills();
      await app.paymentGatewayPage.fillCardDetails();

      await expect.poll(() => app.offPlanBasketMultipleBookingPage.isSuccessfulPayment(), { timeout: LONG_TIMEOUT }).toBe(true);
    }
  );

  test('TC-05 User signs sale contract for all units', async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const sakaniUserId = data.sakaniUserId;
    const userPortalUrl = environments.userPortalUrl;

    await logStep('Step 01: Navigate to user portal > Login');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.loginPage.acceptCookies();
    await app.loginPage.openLogin();
    await app.loginPage.loginWithNafath(sakaniUserId);
    await app.loginPage.waitForNafathPromptToDisappear();
    await app.loginPage.continueNewUserPopup();
    await app.loginPage.handlePushNotificationPopup();

    await logStep('Step 02: Navigate to my activities > Active bookings > Ready for sign');
    await app.marketplaceLandingPage.openProfileManagement();
    await app.offPlanBasketMultipleBookingPage.clickMyActivities();
    await app.offPlanBasketMultipleBookingPage.clickOnBookings();
    await app.offPlanBasketMultipleBookingPage.clickOnActiveBooking();
    await app.offPlanBasketMultipleBookingPage.clickOnReadyForSign();

    await logStep('Step 03: Select all units > Continue');
    await app.offPlanBasketMultipleBookingPage.clickOnUnit1CheckBox();
    await app.offPlanBasketMultipleBookingPage.clickOnUnit2CheckBox();
    await app.offPlanBasketMultipleBookingPage.clickOnContinue();

    await logStep('Step 04: Agree on the sale contract > Verify OTP > Verify contract is signed');
    await app.offPlanBasketMultipleBookingPage.clickOnProjectCheckBox();
    await app.offPlanBasketMultipleBookingPage.clickOnAgreeOnAll();

    await app.offPlanBasketMultipleBookingPage.typeVerifyOtpCode();
    await app.offPlanBasketMultipleBookingPage.clickOnVerify();

    await expect.poll(() => app.offPlanBasketMultipleBookingPage.isSuccessfulContractSignMessage(), { timeout: LONG_TIMEOUT }).toBe(true);
  });

  test('TC-06 Developer confirms the bookings', async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const developerUserId = data.developerUserId;

    await logStep('Step 01: Navigate to partners portal > Login as developer');
    await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await app.developerProjectPage.loginDeveloper(developerUserId);
    await app.developerProjectPage.switchRoleToDeveloper();

    await logStep('Step 02: Confirm the first unit booking > Verify success message');
    await app.developerProjectPage.confirmBooking(data.unit1Code);
    await expect.poll(() => app.developerProjectPage.isSuccessfulConfirmationMessageVisible(), { timeout: LONG_TIMEOUT }).toBe(true);

    await logStep('Step 03: Confirm the second unit booking > Verify success message');
    await app.developerProjectPage.closeConfirmationModal();

    await app.developerProjectPage.switchRoleToDeveloper();
    await app.developerProjectPage.confirmBooking(data.unit2Code);
    await expect.poll(() => app.developerProjectPage.isSuccessfulConfirmationMessageVisible(), { timeout: LONG_TIMEOUT }).toBe(true);
  });
});
