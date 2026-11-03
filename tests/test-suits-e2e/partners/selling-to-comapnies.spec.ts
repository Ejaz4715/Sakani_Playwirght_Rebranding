import { expect, test } from '@fixtures/pages.fixture';
import { WebApp } from '@base-class/web-app';
import { DateUtils } from '@pages/utils/DateUtils';
import { Locator, Page } from '@playwright/test';
import { DataHelper } from '@helpers/DataHelper';
import { logStep } from '@helpers/LogSteps';
import { addOffplanProjectForCompanies } from '@helpers/AddCompanyOffplanProject';

const fs = require('fs');
const path = require('path');

const DEFAULT_TIMEOUT = 30_000;
const LONG_TIMEOUT = 90_000;

async function waitAndClick(locator: Locator, timeout = DEFAULT_TIMEOUT) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.click();
}

const SERVICE = 'selling-to-companies';

const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;
const writeServiceData = (key: string, value: any) => DataHelper.updateServiceData(SERVICE, key, value);

const unitCheckbox = (page: Page, row: number) => page.locator(`//datatable-row-wrapper[${row}]/datatable-body-row/div[3]/datatable-body-cell/div/div/app-sapa-checkbox-v2/div/div/input/..`);

test.describe('Selling to companies', () => {
  let companyUnitCode: string;
  test('TC-01 Admin adds new offplan moh land project for selling unit to company', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    await addOffplanProjectForCompanies(page, SERVICE);
  });

  test('TC-02 Developer adds payment schedules', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const projectName = data.projectName;
    const developerUserId = data.developerUserId;

    await logStep('Step 01: Navigate to partners portal > Login as developer');
    await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await app.developerProjectPage.loginDeveloper(developerUserId);
    await app.developerProjectPage.switchRoleToDeveloper();

    await logStep('Step 02: Search for the project > Open it');
    await app.developerProjectPage.openProjectBySearch(projectName);

    await logStep('Step 03: Open payment schedules > Add cash payment schedule');
    await app.developerProjectPage.openPaymentSchedulesTab();
    await app.developerProjectPage.addPaymentSchedule({
      type: 'cash',
      scheduleName: 'Cash 22',
      completionPercentageOneValue: '100',
      percentageOneValue: '50',
      completionPercentageTwoValue: '100',
      percentageTwoValue: '50',
    });
  });

  test('TC-03 Developer approves sales contract for companies', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const projectName = data.projectName;
    const developerUserId = data.developerUserId;

    await logStep('Step 01: Navigate to partners portal > Login as developer');
    await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await app.developerProjectPage.loginDeveloper(developerUserId);
    await app.developerProjectPage.switchRoleToDeveloper();

    await logStep('Step 02: Search for the project > Open it');
    await app.developerProjectPage.openProjectBySearch(projectName);

    await logStep('Step 03: Open companies sales contracts > Approve the sales contract');
    await app.developerProjectPage.openSalesContractsTab();
    await app.developerProjectPage.clickOnCompanies();
    await app.developerProjectPage.viewAndApproveSalesContract();
    await app.developerProjectPage.approveUnitSpecification();
    await app.developerProjectPage.fillOtp('1234');
    await app.developerProjectPage.verifyOtp();
  });

  test('TC-04 Developer create new booking for a company user', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const developerUserId = data.developerUserId;
    const projectName = data.projectName;

    await logStep('Step 01: Navigate to partners portal > Login as developer');
    await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await app.developerProjectPage.loginDeveloper(developerUserId);
    await app.developerProjectPage.switchRoleToDeveloper();

    await logStep('Step 02: Start new booking for a company user > Search by ID and CR');
    await app.developerProjectPage.bookUnitsForCompanies(data.companyUser, data.companyCR, projectName);

    await page.waitForTimeout(10000);

    await logStep('Step 03: Select the unit > Keep booking');
    await waitAndClick(unitCheckbox(page, 1));

    await app.developerProjectPage.clickOnNextButton();
    await app.developerProjectPage.clickOnKeepBooking();

    await logStep('Step 04: Select the bank');
    // Select the bank
    await app.developerProjectPage.clickOnBankDropdown();
    await app.developerProjectPage.selectCRMBank();
    await app.developerProjectPage.clickOnNextButton();
    await page.waitForTimeout(1000);

    await logStep('Step 05: Confirm the booking > Verify company booking is confirmed');
    await app.developerProjectPage.confirmBookingForCompanies();

    expect(await app.developerProjectPage.isCompanyBookingConfirmed()).toBe(true);
  });

  test('TC-05 User pays the invoices for all units', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const companyUserId = data.companyUser;
    const userPortalUrl = environments.userPortalUrl;

    await logStep('Step 01: Navigate to user portal > Login as company user');
    await app.loginPage.gotoHomePage(userPortalUrl);
    //await app.loginPage.acceptCookies();
    await app.loginPage.openLogin();
    await app.loginPage.loginWithNafath(companyUserId);
    await app.loginPage.waitForNafathPromptToDisappear();
    //await app.loginPage.continueNewUserPopup();
    //await app.loginPage.handlePushNotificationPopup();

    await logStep('Step 02: Navigate to companies > Company reservations > Active bookings > Not billed');
    await app.marketplaceLandingPage.openProfileManagement();
    await app.offPlanBasketMultipleBookingPage.clickOnCompanies();
    await app.offPlanBasketMultipleBookingPage.clickOnCompanyReservations();
    await app.offPlanBasketMultipleBookingPage.clickOnCompanyActiveBookings();
    await app.offPlanBasketMultipleBookingPage.clickOnNotBilled();
    await page.waitForTimeout(2000);

    await logStep('Step 03: Save the company unit code to test data');
    companyUnitCode = await app.offPlanBasketMultipleBookingPage.getCompanyUnitCode();
    writeServiceData('companyUnitCode', companyUnitCode);

    await logStep('Step 04: Show booking details > Pay the reservation fees');
    await app.offPlanBasketMultipleBookingPage.clickOnShowDetails();
    await page.waitForTimeout(2000);
    await app.offPlanBasketMultipleBookingPage.clickOnCompanyReservationFeesPayment();
    await app.paymentGatewayPage.fillCardDetails();
    await page.waitForTimeout(5000);
  });

  test('TC-06 User signs sale contract for all units', async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const companyUserId = data.companyUser;
    const userPortalUrl = environments.userPortalUrl;

    await logStep('Step 01: Navigate to user portal > Login as company user');
    await app.loginPage.gotoHomePage(userPortalUrl);
    //await app.loginPage.acceptCookies();
    await app.loginPage.openLogin();
    await app.loginPage.loginWithNafath(companyUserId);
    await app.loginPage.waitForNafathPromptToDisappear();
    //await app.loginPage.continueNewUserPopup();
    //await app.loginPage.handlePushNotificationPopup();

    await logStep('Step 02: Navigate to companies > Company reservations > Active bookings > Ready for sign');
    await app.marketplaceLandingPage.openProfileManagement();
    await app.offPlanBasketMultipleBookingPage.clickOnCompanies();
    await app.offPlanBasketMultipleBookingPage.clickOnCompanyReservations();
    await app.offPlanBasketMultipleBookingPage.clickOnCompanyActiveBookings();
    await app.offPlanBasketMultipleBookingPage.clickOnReadyForSign();

    await logStep('Step 03: Select the unit > Continue');
    await app.offPlanBasketMultipleBookingPage.clickOnUnit1CheckBox();
    await app.offPlanBasketMultipleBookingPage.clickOnContinue();

    await logStep('Step 04: Agree on the sale contract > Verify OTP > Verify contract is signed');
    await app.offPlanBasketMultipleBookingPage.clickOnProjectCheckBox();
    await app.offPlanBasketMultipleBookingPage.clickOnAgreeOnAll();

    await app.offPlanBasketMultipleBookingPage.typeVerifyOtpCode();
    await app.offPlanBasketMultipleBookingPage.clickOnVerify();

    await expect.poll(() => app.offPlanBasketMultipleBookingPage.isSuccessfulContractSignMessage(), { timeout: LONG_TIMEOUT }).toBe(true);
  });

  test('TC-07 Developer confirms the bookings for companies', async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const developerUserId = data.developerUserId;

    await logStep('Step 01: Navigate to partners portal > Login as developer');
    await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await app.developerProjectPage.loginDeveloper(developerUserId);
    await app.developerProjectPage.switchRoleToDeveloper();

    await logStep('Step 02: Confirm the company booking > Verify success message');
    await app.developerProjectPage.confirmCompanyBooking(data.companyUnitCode);
    await expect.poll(() => app.developerProjectPage.isSuccessfulConfirmationMessageVisible(), { timeout: LONG_TIMEOUT }).toBe(true);
  });
});
