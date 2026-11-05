import { expect, Page, test } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { DataHelper } from '@helpers/DataHelper';
import { logStep } from '@helpers/LogSteps';
import { addOffplanProjectForMultipleBooking } from '@helpers/AddOffplanProject';
import { developerApprovesSalesContract } from '@helpers/DeveloperApproveSalesContract';
import { addFlexiblePaymentSchedule } from '@helpers/AddFlexiblePaymentSchedule';
import { developerBooksUnits } from '@helpers/DeveloperBookUnits';

const SERVICE = 'FlexiblePaymentPhase3';

// ===================================================== Test steps =====================================================

// Project setup (TC-01 only): the project name and the flexible payment schedule name are saved in test-data.json for the next test cases
async function createProjectSteps(page: Page) {
  const data = DataHelper.readData().services[SERVICE];
  const environments = DataHelper.readData().environments;
  const portalUrls = [environments.adminPortalUrl, environments.sapaPortalUrl, environments['pre-beta'].userPortalUrl];
  const app = new WebApp(page);

  await logStep('Pre-condition 01: Admin creates a new project');
  await addOffplanProjectForMultipleBooking(page, SERVICE, 'Doctor test');
  const projectName = DataHelper.readData().services[SERVICE].projectName;

  await logStep('Pre-condition 02: Developer approves the sales contract');
  await app.loginPage.clearLoginSession(portalUrls);
  await developerApprovesSalesContract(page, SERVICE);

  await logStep('Pre-condition 03: Developer adds a flexible payment schedule');
  await app.loginPage.clearLoginSession(portalUrls);
  await addFlexiblePaymentSchedule(page, SERVICE);

  await logStep('Pre-condition 04: Admin enables comprehensive booking and payment collection automation');
  await app.loginPage.clearLoginSession(portalUrls);
  await app.adminProjectPage.login(environments.adminPortalUrl, data.adminUsername, data.adminPassword);
  await app.adminProjectPage.openProjects();
  await app.resaleOfUnitsPage.fillProjectName(projectName);
  await app.resaleOfUnitsPage.clickProjectSearchButton();
  await app.resaleOfUnitsPage.clickSearchedProjectResult(projectName);
  await page.waitForTimeout(10000);
  await app.paymentTrackingPage.clickOnProjectSettings();
  await app.paymentTrackingPage.clickOnUseGeneralSettingSwitch();
  await app.paymentTrackingPage.clickOnPaymentCollectionAutomationSwitch();
  await app.paymentTrackingPage.clickOnSaveButton();
  await app.paymentTrackingPage.verifySaveSuccessToast();
}

async function individualUserBookingSteps(page: Page, userKey: string, unitsCount: number) {
  const data = DataHelper.readData().services[SERVICE];
  const environments = DataHelper.readData().environments;
  const portalUrls = [environments.adminPortalUrl, environments.sapaPortalUrl, environments['pre-beta'].userPortalUrl];
  const userId = data[userKey];
  const scheduleTitleAr = data.scheduleTitleAr;
  const app = new WebApp(page);

  await logStep(`Pre-condition 05: Developer books ${unitsCount} unit(s) for the user on the project ${data.projectName}`);
  await app.loginPage.clearLoginSession(portalUrls);
  await developerBooksUnits(page, SERVICE, unitsCount, userId);

  await logStep('Step 01: Open pre-beta (Sakani) > Login with Nafath as the user');
  await app.loginPage.clearLoginSession(portalUrls);
  await app.loginPage.gotoHomePage(environments['pre-beta'].userPortalUrl);
  await app.loginPage.loginToPreBetaWithNafath(userId);

  await logStep('Step 02: Profile > حجوزاتي > Open the booking details');
  await app.paymentFlexiblePhase3Page.openMyBookingsFromProfileMenu();
  await app.bookingPage.openBookingDetails();

  await logStep('Step 03: ادفع رسوم الحجز > ادفع الرسوم > Pay by mada card > Wait until the payment page is loaded');
  await app.paymentFlexiblePhase3Page.payBookingFeesFromBookingDetails();
  await app.paymentGatewayPage.fillCardDetails();
  await app.paymentFlexiblePhase3Page.waitForPaymentSuccess();

  await logStep('Step 04: Back to Sakani > Refresh > Login again if needed > حجوزاتي > Open the booking details');
  await app.loginPage.openPreBetaAndLoginIfLoggedOut(environments['pre-beta'].userPortalUrl, userId);
  await app.paymentFlexiblePhase3Page.openMyBookingsFromProfileMenu();
  await app.bookingPage.openBookingDetails();

  await logStep('Step 05: اختر طريقة الدفع > Select the flexible payment schedule > حفظ ومتابعة');
  await app.paymentFlexiblePhase3Page.openSelectPaymentMethod();
  await app.paymentFlexiblePhase3Page.selectPaymentSchedule(scheduleTitleAr);
  await app.paymentFlexiblePhase3Page.clickSaveAndContinueButton();

  await logStep('Step 06: Sign the sales contract: اعتماد > OTP > تحقق');
  await app.unitBookingPage.signSalesContract();

  await logStep('Step 07: Back to Sakani > حجوزاتي > Open the booking details > Verify the payment schedule (جدول الدفع) is displayed');
  await app.loginPage.openPreBetaAndLoginIfLoggedOut(environments['pre-beta'].userPortalUrl, userId);
  await app.paymentFlexiblePhase3Page.openMyBookingsFromProfileMenu();
  await app.bookingPage.openBookingDetails();
  await app.paymentFlexiblePhase3Page.verifyPaymentScheduleDisplayed();
}

async function createCompanyProjectSteps(page: Page) {
  const data = DataHelper.readData().services[SERVICE];
  const environments = DataHelper.readData().environments;
  const portalUrls = [environments.adminPortalUrl, environments.sapaPortalUrl, environments['pre-beta'].userPortalUrl];
  const individualProjectName = data.projectName;
  const app = new WebApp(page);

  await logStep('Pre-condition 01: Admin creates a new project with company units');
  await addOffplanProjectForMultipleBooking(page, SERVICE, 'Doctor test', true);
  const projectName = DataHelper.readData().services[SERVICE].projectName;
  DataHelper.updateServiceData(SERVICE, 'companyProjectName', projectName);

  await logStep('Pre-condition 02: Developer approves the sales contract');
  await app.loginPage.clearLoginSession(portalUrls);
  await developerApprovesSalesContract(page, SERVICE);

  await logStep('Pre-condition 03: Developer adds a flexible payment schedule');
  await app.loginPage.clearLoginSession(portalUrls);
  await addFlexiblePaymentSchedule(page, SERVICE);

  await logStep('Pre-condition 04: Developer approves the companies sales contract');
  await app.loginPage.clearLoginSession(portalUrls);
  await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
  await app.developerProjectPage.loginDeveloper(data.developerUserId);
  await app.developerProjectPage.switchRoleToDeveloper();
  await app.developerProjectPage.openProjectBySearch(projectName);
  await app.developerProjectPage.openSalesContractsTab();
  await app.developerProjectPage.clickOnCompanies();
  await app.developerProjectPage.viewAndApproveSalesContract();
  await app.developerProjectPage.approveUnitSpecification();
  await app.developerProjectPage.fillOtp('1234');
  await app.developerProjectPage.verifyOtp();

  // Keep the individual project for TC-02 / TC-05
  DataHelper.updateServiceData(SERVICE, 'projectName', individualProjectName);
}

async function companyUserBookingSteps(page: Page, userKey: string, crKey: string) {
  const data = DataHelper.readData().services[SERVICE];
  const environments = DataHelper.readData().environments;
  const portalUrls = [environments.adminPortalUrl, environments.sapaPortalUrl, environments['pre-beta'].userPortalUrl];
  const companyUserId = data[userKey];
  const companyCR = data[crKey];
  const projectName = data.companyProjectName;
  const app = new WebApp(page);

  await logStep(`Pre-condition 05: Developer books a unit for the company user on the project ${projectName} > Select the bank > Confirm`);
  await app.loginPage.clearLoginSession(portalUrls);
  await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
  await app.developerProjectPage.loginDeveloper(data.developerUserId);
  await app.developerProjectPage.switchRoleToDeveloper();
  await app.developerProjectPage.bookUnitsForCompanies(companyUserId, companyCR, projectName);
  await page.waitForTimeout(10000);
  await app.developerProjectPage.selectAvailableCompanyUnitAndKeepBooking();
  await app.developerProjectPage.clickOnBankDropdown();
  await app.developerProjectPage.selectCRMBank();
  await app.developerProjectPage.clickOnNextButton();
  await app.developerProjectPage.confirmBookingForCompanies();
  expect(await app.developerProjectPage.isCompanyBookingConfirmed()).toBe(true);

  await logStep('Step 01: Open pre-beta (Sakani) > Login with Nafath as the company user');
  await app.loginPage.clearLoginSession(portalUrls);
  await app.loginPage.gotoHomePage(environments['pre-beta'].userPortalUrl);
  await app.loginPage.loginToPreBetaWithNafath(companyUserId);

  await logStep('Step 02: Profile > حجوزاتي > الشركات > حجوزات الشركة > Open the booking details > Save the unit code');
  await app.paymentFlexiblePhase3Page.openCompanyBookingsFromProfileMenu();
  await app.bookingPage.openBookingDetails();
  const companyUnitCode = await app.paymentFlexiblePhase3Page.getUnitCodeFromBookingDetails();

  await logStep('Step 03: ادفع رسوم الحجز > ادفع الرسوم > Pay by mada card > Wait until the payment page is loaded');
  await app.paymentFlexiblePhase3Page.payBookingFeesFromBookingDetails();
  await app.paymentGatewayPage.fillCardDetails();
  await app.paymentFlexiblePhase3Page.waitForPaymentSuccess();

  await logStep('Step 04: Back to Sakani > Refresh > Login again if needed > حجوزات الشركة > Open the booking details');
  await app.loginPage.openPreBetaAndLoginIfLoggedOut(environments['pre-beta'].userPortalUrl, companyUserId);
  await app.paymentFlexiblePhase3Page.openCompanyBookingsFromProfileMenu();
  await app.bookingPage.openBookingDetails();

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
}

// ===================================================== Test cases =====================================================

test(
  'TC-01 End-to-End Booking, Payment, and Status Update Flow Using Fixed Payment Schedule for a Bene User With Addition',
  { annotation: [{ product: 'Sakani _Rebranding', type: 'critical' }] as any },
  async ({ page }) => {
    test.setTimeout(0);
    await createProjectSteps(page);
    await individualUserBookingSteps(page, 'beneUser', 1);
  }
);

test(
  'TC-02 End-to-End Booking, Payment, and Status Update Flow Using Fixed Payment Schedule for a Non-Bene User With Addition',
  { annotation: [{ product: 'Sakani _Rebranding', type: 'critical' }] as any },
  async ({ page }) => {
    test.setTimeout(0);
    await individualUserBookingSteps(page, 'nonBeneUser', 1);
  }
);

test(
  'TC-03 End-to-End Booking, Payment, and Status Update Flow Using Fixed Payment Schedule for a Company Bene User With Addition',
  { annotation: [{ product: 'Sakani _Rebranding', type: 'critical' }] as any },
  async ({ page }) => {
    test.setTimeout(0);
    await createCompanyProjectSteps(page);
    await companyUserBookingSteps(page, 'companyBeneUser', 'companyBeneCR');
  }
);

test(
  'TC-04 End-to-End Booking, Payment, and Status Update Flow Using Fixed Payment Schedule for a Company Non-Bene User With Addition',
  { annotation: [{ product: 'Sakani _Rebranding', type: 'critical' }] as any },
  async ({ page }) => {
    test.setTimeout(0);
    await companyUserBookingSteps(page, 'companyNonBeneUser', 'companyNonBeneCR');
  }
);

test(
  'TC-05 End-to-End Booking, Payment, and Status Update Flow Using Fixed Payment Schedule for a Unit Basket for a Bene User',
  { annotation: [{ product: 'Sakani _Rebranding', type: 'critical' }] as any },
  async ({ page }) => {
    test.setTimeout(0);
    await individualUserBookingSteps(page, 'unitBasketUser', 2);
  }
);
