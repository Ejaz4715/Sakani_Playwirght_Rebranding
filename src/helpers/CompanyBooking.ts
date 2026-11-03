import { expect, Page } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { DataHelper } from '@helpers/DataHelper';
import { logStep } from '@helpers/LogSteps';
import { sakaniUserLogin } from '@helpers/SakaniUserLogin';
import { backToSakani } from '@helpers/UserBooksAndPaysFlexible';

const LONG_TIMEOUT = 90_000;

/**
 * Developer approves the companies sales contract of the project saved in the given service's data.
 */
export async function developerApprovesCompanySalesContract(page: Page, service: string) {
  const data = DataHelper.readData().services[service];
  const environments = DataHelper.readData().environments;
  const app = new WebApp(page);

  await logStep('Step 01: Navigate to partners portal > Login as developer');
  await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
  await app.developerProjectPage.loginDeveloper(data.developerUserId);
  await app.developerProjectPage.switchRoleToDeveloper();

  await logStep('Step 02: Search for the project > Open it');
  await app.developerProjectPage.openProjectBySearch(data.projectName);

  await logStep('Step 03: Open companies sales contracts > Approve the sales contract');
  await app.developerProjectPage.openSalesContractsTab();
  await app.developerProjectPage.clickOnCompanies();
  await app.developerProjectPage.viewAndApproveSalesContract();
  await app.developerProjectPage.approveUnitSpecification();
  await app.developerProjectPage.fillOtp('1234');
  await app.developerProjectPage.verifyOtp();
}

/**
 * Developer books a unit for the company user (ID + CR) on the project saved in the given service's data.
 */
export async function developerBooksUnitForCompany(page: Page, service: string, companyUserId: string, companyCR: string) {
  const data = DataHelper.readData().services[service];
  const environments = DataHelper.readData().environments;
  const app = new WebApp(page);

  await logStep('Step 01: Navigate to partners portal > Login as developer');
  await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
  await app.developerProjectPage.loginDeveloper(data.developerUserId);
  await app.developerProjectPage.switchRoleToDeveloper();

  await logStep('Step 02: Start new booking for a company user > Search by CR and ID');
  await app.developerProjectPage.bookUnitsForCompanies(companyUserId, companyCR, data.projectName);
  await page.waitForTimeout(10000);

  await logStep('Step 03: Select a unit that is not taken > Keep booking');
  await app.developerProjectPage.selectAvailableCompanyUnitAndKeepBooking();

  await logStep('Step 04: Select the bank');
  await app.developerProjectPage.clickOnBankDropdown();
  await app.developerProjectPage.selectCRMBank();
  await app.developerProjectPage.clickOnNextButton();

  await logStep('Step 05: Confirm the booking > Verify company booking is confirmed');
  await app.developerProjectPage.confirmBookingForCompanies();
  expect(await app.developerProjectPage.isCompanyBookingConfirmed()).toBe(true);
}

/**
 * Company user (company bene or non-bene) logs in to pre-beta and completes the company booking:
 * حجوزاتي > الشركات > حجوزات الشركة > booking details > pay the booking fees > توقيع العقد > اعتماد > OTP > تحقق > تم.
 * The company unit code is saved to the given service's data for the developer confirmation.
 */
export async function companyUserPaysAndSignsContract(page: Page, service: string, companyUserId: string) {
  const app = new WebApp(page);

  await sakaniUserLogin(page, companyUserId);

  await logStep('Step 02: Profile > حجوزاتي > الشركات > حجوزات الشركة > Open the booking details');
  await app.bookingPage.openCompanyBookingsFromProfileMenu();
  await app.bookingPage.openBookingDetails();

  await logStep('Step 03: Save the company unit code to test data');
  const companyUnitCode = await app.bookingPage.getBookedUnitCode();
  DataHelper.updateServiceData(service, 'companyUnitCode', companyUnitCode);

  await logStep('Step 04: ادفع رسوم الحجز > ادفع الرسوم > Pay by mada card');
  await app.bookingPage.payBookingFeesFromBookingDetails();
  await app.paymentGatewayPage.fillCardDetails();
  await app.bookingPage.waitForPaymentSuccess();

  await logStep('Step 05: Back to pre-beta > Refresh > Login again if needed > حجوزاتي > الشركات > حجوزات الشركة > Open the booking details');
  await backToSakani(page, companyUserId);
  await app.bookingPage.openCompanyBookingsFromProfileMenu();
  await app.bookingPage.openBookingDetails();

  await logStep('Step 06: توقيع العقد > اعتماد > OTP > تحقق > Verify the contract is signed (تم)');
  await app.bookingPage.openSignContractFromBookingDetails();
  await app.bookingPage.signSalesContract();
  await app.bookingPage.verifyContractSigned();
}

/**
 * Developer confirms the company booking of the unit saved in the given service's data (companyUnitCode).
 */
export async function developerConfirmsCompanyBooking(page: Page, service: string) {
  const data = DataHelper.readData().services[service];
  const environments = DataHelper.readData().environments;
  const app = new WebApp(page);

  await logStep('Step 01: Navigate to partners portal > Login as developer');
  await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
  await app.developerProjectPage.loginDeveloper(data.developerUserId);
  await app.developerProjectPage.switchRoleToDeveloper();

  await logStep('Step 02: Confirm the company booking > Verify success message');
  await app.developerProjectPage.confirmCompanyBooking(data.companyUnitCode);
  await expect.poll(() => app.developerProjectPage.isSuccessfulConfirmationMessageVisible(), { timeout: LONG_TIMEOUT }).toBe(true);
}
