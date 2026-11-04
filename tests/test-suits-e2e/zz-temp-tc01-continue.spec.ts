// TEMP: continues TC-03 from Step 04 on the company project (companyProjectName in test-data.json), delete after use
import { expect, test } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { DataHelper } from '@helpers/DataHelper';
import { logStep } from '@helpers/LogSteps';

const SERVICE = 'FlexiblePaymentPhase3';

test('TEMP Continue TC-03 from Step 04 on the company project', async ({ page }) => {
  test.setTimeout(0);
  const data = DataHelper.readData().services[SERVICE];
  const environments = DataHelper.readData().environments;
  const portalUrls = [environments.adminPortalUrl, environments.sapaPortalUrl, environments['pre-beta'].userPortalUrl];
  const companyUserId = data.companyBeneUser;
  const app = new WebApp(page);

  await logStep('Step 04: Open Sakani > Login > حجوزات الشركة > Open the booking details > Save the unit code');
  await app.loginPage.clearLoginSession(portalUrls);
  await app.loginPage.gotoHomePage(environments['pre-beta'].userPortalUrl);
  await app.loginPage.loginToPreBetaWithNafath(companyUserId);
  await app.paymentFlexiblePhase3Page.openCompanyBookingsFromProfileMenu();
  await app.bookingPage.openBookingDetails();
  const companyUnitCode = await app.paymentFlexiblePhase3Page.getUnitCodeFromBookingDetails();

  await logStep('Step 05: توقيع العقد > اعتماد > OTP > تحقق > Verify the contract is signed (تم)');
  await app.paymentFlexiblePhase3Page.openSignContractFromBookingDetails();
  await app.unitBookingPage.signSalesContract();
  await app.paymentFlexiblePhase3Page.verifyContractSigned();

  await logStep('Step 06: Developer > حجوزات الشركة > Search the unit > Confirm the company booking > Verify success message');
  await app.loginPage.clearLoginSession(portalUrls);
  await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
  await app.developerProjectPage.loginDeveloper(data.developerUserId);
  await app.developerProjectPage.switchRoleToDeveloper();
  await app.developerProjectPage.confirmCompanyBooking(companyUnitCode);
  await expect.poll(() => app.developerProjectPage.isSuccessfulConfirmationMessageVisible(), { timeout: 90000 }).toBe(true);
});
