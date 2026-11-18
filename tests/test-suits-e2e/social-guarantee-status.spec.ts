import { expect, test } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { DateUtils } from '@pages/utils/DateUtils';
import { DataHelper } from '@helpers/DataHelper';
import { logStep } from '@helpers/LogSteps';
import path from 'node:path';

const SERVICE = 'social-guarantee-status';
const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;

test.describe('Social Guarantee Status', () => {
  test('SAK-1570-01 Partner - Validate the Social Guarantee field is displayed in the create individual booking journey for a beneficiary included in Social Security', { annotation: [{ product: 'Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const includedUserId = data.includedUserId;
    const developerUserId = data.developerUserId;

    await logStep('Step 01: Navigate to partners portal > Login as developer');
    await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await app.commonMethods.unifiedSakaniLogin(developerUserId);
    await app.partnersLoginPage.switchRoleToDeveloper();

    await logStep('Step 02: Start new individual booking > Enter user id > Click on search');
    await app.socialGuaranteeStatusPage.clickOnManageReservation();
    await app.socialGuaranteeStatusPage.clickOnIndividualReservation();
    await app.socialGuaranteeStatusPage.clickOnNewReservationButton();
    await app.socialGuaranteeStatusPage.fillNationalId(includedUserId);
    await app.socialGuaranteeStatusPage.clickOnSearchButton();

    await logStep('Step 03: Verify the social security status field is present');
    await app.socialGuaranteeStatusPage.verifySocialGuaranteeStatusIsPresent();
  });
  test('SAK-1570-02 Partner - Validate the Social Guarantee field is hidden in the create individual booking journey for a beneficiary not included in Social Security', { annotation: [{ product: 'Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const notIncludedUserId = data.notIncludedUserId;
    const developerUserId = data.developerUserId;

    await logStep('Step 01: Navigate to partners portal > Login as developer');
    await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await app.commonMethods.unifiedSakaniLogin(developerUserId);
    await app.partnersLoginPage.switchRoleToDeveloper();

    await logStep('Step 02: Start new individual booking > Enter user id > Click on search');
    await app.socialGuaranteeStatusPage.clickOnManageReservation();
    await app.socialGuaranteeStatusPage.clickOnIndividualReservation();
    await app.socialGuaranteeStatusPage.clickOnNewReservationButton();
    await app.socialGuaranteeStatusPage.fillNationalId(notIncludedUserId);
    await app.socialGuaranteeStatusPage.clickOnSearchButton();

    await logStep('Step 03: Verify the social security status field is hidden');
    await app.socialGuaranteeStatusPage.verifySocialGuaranteeStatusIsNotPresent();
  });
  test('SAK-1570-03 Partner - Validate the Social Guarantee field is displayed in the individual booking details after the booking is created', { annotation: [{ product: 'Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const includedUserId = data.includedUserId;
    const projectName = data.projectName;
    const developerUserId = data.developerUserId;
    const bankName = 'بنك الأهلي السعودي';

    await logStep('Step 01: Navigate to partners portal > Login as developer');
    await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await app.commonMethods.unifiedSakaniLogin(developerUserId);
    await app.partnersLoginPage.switchRoleToDeveloper();

    await logStep('Step 02: Start new individual booking > Enter user id');
    await app.developerProjectPage.bookUnitsForCustomers(includedUserId, projectName);
    await page.waitForTimeout(5000);

    await logStep('Step 03: Select unit and move to financial information page');
    await app.developerProjectPage.selectUnitCheckbox(1);
    await app.developerProjectPage.clickOnNextButton();
    await app.developerProjectPage.clickSelectAndContinue();
    await app.developerProjectPage.clickContinueBookingButton();

    await logStep('Step 04: Select the bank and confirm the booking > Verify booking list is visible');
    await app.developerProjectPage.selectBank(bankName);
    await app.developerProjectPage.clickOnNextButton();
    await app.developerProjectPage.clickOnConfirmationButton();
    await logStep('Step 05: Verify the reservation is successful');
    await app.developerProjectPage.validateSuccessReservationPopup();
    await logStep('Step 06: Click on view details > Validate the social guarantee status is present');
    await app.socialGuaranteeStatusPage.clickOnViewDetailsButton();
    await app.socialGuaranteeStatusPage.verifySocialGuaranteeStatusIsPresent();
  });
  test('SAK-1570-04 Partner - Validate the Social Guarantee field is hidden in the individual booking details for a beneficiary not included in Social Security', { annotation: [{ product: 'Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const notIncludedUserId = data.notIncludedUserId;
    const projectName = data.projectName;
    const developerUserId = data.developerUserId;
    const bankName = 'بنك الأهلي السعودي';

    await logStep('Step 01: Navigate to partners portal > Login as developer');
    await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await app.commonMethods.unifiedSakaniLogin(developerUserId);
    await app.partnersLoginPage.switchRoleToDeveloper();

    await logStep('Step 02: Start new individual booking > Enter user id');
    await app.developerProjectPage.bookUnitsForCustomers(notIncludedUserId, projectName);
    await page.waitForTimeout(5000);

    await logStep('Step 03: Select unit and move to financial information page');
    await app.developerProjectPage.selectUnitCheckbox(1);
    await app.developerProjectPage.clickOnNextButton();
    // await app.developerProjectPage.clickSelectAndContinue();
    await app.developerProjectPage.clickContinueBookingButton();

    await logStep('Step 04: Select the bank and confirm the booking > Verify booking list is visible');
    await app.developerProjectPage.selectBank(bankName);
    await app.developerProjectPage.clickOnNextButton();
    await app.developerProjectPage.clickOnConfirmationButton();
    await logStep('Step 05: Verify the reservation is successful');
    await app.developerProjectPage.validateSuccessReservationPopup();
    await logStep('Step 06: Click on view details > Validate the social guarantee status is hidden');
    await app.socialGuaranteeStatusPage.clickOnViewDetailsButton();
    await app.socialGuaranteeStatusPage.verifySocialGuaranteeStatusIsNotPresent();
  });
  test('SAK-1570-05 Admin - Validate the Social Guarantee field is displayed in the Admin portal booking details for a beneficiary included in Social Security', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const adminPortalUrl = environment.adminPortalUrl;
    const adminUsername = data.adminUsername;
    const adminPassword = data.adminPassword;
    const includedUserId = data.includedUserId;
    const projectName = data.projectName;

    await logStep('Step 01: Login to admin portal');
    await app.adminProjectPage.login(adminPortalUrl, adminUsername, adminPassword);

    await logStep('Step 02: Navigate to bookings > Search by national id');
    await app.paymentTrackingPage.clickOnBeneficiariesSideMenu();
    await app.socialGuaranteeStatusPage.clickOnBookings();
    await app.socialGuaranteeStatusPage.searchForNationalId(includedUserId);

    await logStep('Step 03: Click on search > Search for project name > Select first result');
    await app.paymentTrackingPage.clickOnSearchButtonForUnit();
    await app.socialGuaranteeStatusPage.searchForProject(projectName);
    await app.paymentTrackingPage.clickOnSearchButtonForUnit();
    await app.paymentTrackingPage.clickOnSearchResult();

    await logStep('Step 04: Validate the social guarantee status is present');
    await app.socialGuaranteeStatusPage.verifySocialGuaranteeStatusIsPresentFromAdmin();
  });
  test('SAK-1570-06 Admin - Validate the Social Guarantee field is hidden in the Admin portal booking details for a beneficiary not included in Social Security', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const adminPortalUrl = environment.adminPortalUrl;
    const adminUsername = data.adminUsername;
    const adminPassword = data.adminPassword;
    const notIncludedUserId = data.notIncludedUserId;
    const projectName = data.projectName;

    await logStep('Step 01: Login to admin portal');
    await app.adminProjectPage.login(adminPortalUrl, adminUsername, adminPassword);

    await logStep('Step 02: Navigate to bookings > Search by national id');
    await app.paymentTrackingPage.clickOnBeneficiariesSideMenu();
    await app.socialGuaranteeStatusPage.clickOnBookings();
    await app.socialGuaranteeStatusPage.searchForNationalId(notIncludedUserId);

    await logStep('Step 03: Click on search > Search for project name > Select first result');
    await app.paymentTrackingPage.clickOnSearchButtonForUnit();
    await app.socialGuaranteeStatusPage.searchForProject(projectName);
    await app.paymentTrackingPage.clickOnSearchButtonForUnit();
    await app.paymentTrackingPage.clickOnSearchResult();

    await logStep('Step 04: Validate the social guarantee status is hidden');
    await app.socialGuaranteeStatusPage.verifySocialGuaranteeStatusIsNotPresentFromAdmin();
  });
});
