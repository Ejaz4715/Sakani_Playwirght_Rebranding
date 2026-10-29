'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const test_1 = require('@playwright/test');
const web_app_1 = require('@base-class/web-app');
const DateUtils_1 = require('@pages/utils/DateUtils');
const DataHelper_1 = require('@helpers/DataHelper');
const LogSteps_1 = require('@helpers/LogSteps');
const node_path_1 = __importDefault(require('node:path'));
const SERVICE = 'offPlan-basket-multiple-booking';
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
const writeServiceData = (key, value) => DataHelper_1.DataHelper.updateServiceData(SERVICE, key, value);
const DEFAULT_TIMEOUT = 30_000;
const LONG_TIMEOUT = 90_000;
async function waitAndClick(locator, timeout = DEFAULT_TIMEOUT) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.click();
}
async function waitAndFill(locator, value, timeout = DEFAULT_TIMEOUT) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.fill(value);
}
const unitCheckbox = (page, row) => page.locator(`//datatable-row-wrapper[${row}]/datatable-body-row/div[3]/datatable-body-cell/div/div/app-sapa-checkbox-v2/div/div/input/..`);
test_1.test.describe('OffPlan unit basket - Multiple units booking ', () => {
  let unit1Code;
  let unit2Code;
  (0, test_1.test)(
    'TC-01 Admin adds a new offplan project for (unit basket mulitple booking) ',
    {
      annotation: [
        {
          product: 'Marketplace',
          type: 'critical',
        },
      ],
    },
    async ({ page }) => {
      test_1.test.setTimeout(120000);
      await (0, LogSteps_1.logStep)('Step 00: Read data from json relative to the service');
      const environment = readEnvironments();
      const data = readServiceData();
      const app = new web_app_1.WebApp(page);
      const projectName = `Automation Project Offplan ${new Date()
        .toISOString()
        .replace(/[-:T.]/g, '')
        .slice(0, 14)}`;
      DataHelper_1.DataHelper.updateServiceData(SERVICE, 'projectName', projectName);
      await (0, LogSteps_1.logStep)('Step 01: Login to admin portal as a super admin');
      await app.adminProjectPage.login(environment.adminPortalUrl, data.adminUsername, data.adminPassword);
      await (0, LogSteps_1.logStep)('Step 02: Navigate to add new project');
      await app.adminProjectPage.clickInternalInventory();
      await app.adminProjectPage.clickProjectsLink();
      await app.adminProjectPage.clickAddNewProjectButton();
      await (0, LogSteps_1.logStep)('Step 03: Enter project details and save');
      await app.adminProjectPage.fillProjectName(projectName);
      await app.adminProjectPage.selectProjectType('مشاريع البيع على الخارطة على أراضي الوزارة');
      await app.adminProjectPage.selectRegion('الرياض');
      await app.adminProjectPage.selectCity('الخرج');
      await app.adminProjectPage.selectDeveloperName('شركة الضاحية المثالية للتطوير والاستثمار العقاري');
      await app.adminProjectPage.toggleBookableOn();
      await app.adminProjectPage.selectProjectStatus('متاح');
      await app.adminProjectPage.fillWafiLicenseExpiryDate(DateUtils_1.DateUtils.getDateWithOffset(600));
      await app.adminProjectPage.selectSubsidyType('دعم عيني كامل');
      await app.adminProjectPage.fillMaxSubsidyAmount('2');
      await app.adminProjectPage.fillProjectAgreementDate('2026-01-01');
      await app.adminProjectPage.fillProjectLicenseNumber('665334');
      await app.adminProjectPage.fillProjectLicenseDate(DateUtils_1.DateUtils.getDateWithOffsetAndFormat(600, 'YYYY-MM-DD'));
      await app.adminProjectPage.fillEscrowAccountName('Sakani Test User');
      await app.adminProjectPage.fillEscrowAccountNumber('SA1111111111111111111111');
      await app.adminProjectPage.selectBank('بنك الأهلي السعودي');
      await app.adminProjectPage.fillDeductionPercentage('2');
      await app.adminProjectPage.fillDeedIssueCityArabic('الرياض');
      await app.adminProjectPage.fillDeedIssueCityEnglish('Riyadh');
      await app.adminProjectPage.fillDeedDate('01/01/2026');
      await app.adminProjectPage.clickSaveButton();
      await app.adminProjectPage.validateProjectSavedToastMessage();
      await (0, LogSteps_1.logStep)('Step 04: Link the project to AZM');
      await app.adminProjectPage.linkProjectToAzm();
      await (0, LogSteps_1.logStep)('Step 05: Select participating banks');
      await app.adminProjectPage.expectFinancingEntitiesVisible();
      await app.adminProjectPage.clickFinancingEntities();
      await app.adminProjectPage.expectSelectAllRowsVisible();
      await app.adminProjectPage.clickSelectAllRows();
      await app.adminProjectPage.clickSaveButton();
      await (0, LogSteps_1.logStep)('Step 06: Import and commit project units');
      await app.adminProjectPage.clickUnitsTab();
      await app.adminProjectPage.expectImportNewUnitButtonVisible();
      await app.adminProjectPage.clickImportNewUnitButton();
      await app.adminProjectPage.expectResidentialUnitTypeVisible();
      await app.adminProjectPage.openResidentialUnitTypeDropdown();
      await app.adminProjectPage.selectApartmentUnitType();
      const unitsImportFilePath = node_path_1.default.join(process.cwd(), 'src', 'data', 'Offplan_MOH.xlsx');
      await app.adminProjectPage.uploadUnitsFile(unitsImportFilePath);
      await app.adminProjectPage.clickImportSaveButton();
      await app.adminProjectPage.waitForUnitImportCompletion();
      await app.adminProjectPage.clickApproveButton();
      await app.adminProjectPage.clickConfirmButton();
      await app.adminProjectPage.waitForImportConfirmation();
      await app.adminProjectPage.clickBackButton();
      await (0, LogSteps_1.logStep)('Step 07: Upload project media and enter media details');
      await app.adminProjectPage.clickProjectMediaTab();
      const bannerImagePath = node_path_1.default.join(process.cwd(), 'src', 'data', 'Sample image.jpg');
      await app.adminProjectPage.uploadBannerImage(bannerImagePath);
      await app.adminProjectPage.clickUploadButton();
      await app.adminProjectPage.selectDisplayMethod('Hero');
      await app.adminProjectPage.fillDetailsTitleArabic(projectName);
      await app.adminProjectPage.fillDetailsTitleEnglish(projectName);
      await app.adminProjectPage.fillFirstUnitReadyDate('2026-01-01');
      await app.adminProjectPage.fillNameArabic(projectName);
      await app.adminProjectPage.fillNameEnglish(projectName);
      await app.adminProjectPage.fillSummaryArabic('ملخص المشروع'.repeat(10));
      await app.adminProjectPage.fillSummaryEnglish('Project Summary'.repeat(10));
      await app.adminProjectPage.fillDescriptionArabic('الوصف (باللغة العربية)'.repeat(10));
      await app.adminProjectPage.fillDescriptionEnglish('Description EN'.repeat(10));
      await app.adminProjectPage.fillStartingPrice('500000');
      await app.adminProjectPage.fillLatitude('1.1');
      await app.adminProjectPage.fillLongitude('1.1');
      await app.adminProjectPage.expectMediaUploadComplete(0);
      await app.adminProjectPage.fillGuaranteeAfterServices('Test guarantee after services');
      await app.adminProjectPage.clickMediaSaveButton();
      await (0, LogSteps_1.logStep)('Step 08: Approve project media');
      await app.adminProjectPage.clickProjectDetailsTab();
      await app.adminProjectPage.clickRequestMediaApprovalButton();
      await app.adminProjectPage.clickAcceptUploadedMediaButton();
      await app.adminProjectPage.clickKeepProjectUnpublishedButton();
      await app.adminProjectPage.clickSaveButton();
      await app.adminProjectPage.validateProjectSavedToastMessage();
      await (0, LogSteps_1.logStep)('Step 09: Publish the unit model');
      await app.adminProjectPage.clickUnitModelsSection();
      await app.adminProjectPage.clickUnitModelCell();
      await app.adminProjectPage.clickSaveButton();
      await app.adminProjectPage.clickMediaDraftSection();
      await app.adminProjectPage.clickSaveButton();
      await app.adminProjectPage.clickRequestMediaApprovalButton();
      await app.adminProjectPage.clickAcceptUploadedMediaButton();
      await app.adminProjectPage.clickPublishUnitButton();
      await app.adminProjectPage.clickUnitModelLink();
      await (0, LogSteps_1.logStep)('Step 10: Set project availability');
      await app.adminProjectPage.clickProjectDetailsText();
      await app.adminProjectPage.selectProjectStatus('متاح');
      await app.adminProjectPage.selectAvailableProjectStatus();
      await app.adminProjectPage.clickSaveButton();
      await (0, LogSteps_1.logStep)('Step 11: Publish the project and validate the toast message');
      await app.adminProjectPage.enableAvailableForBookingToggle();
      await app.adminProjectPage.publishProject();
      await app.adminProjectPage.clickSaveButton();
      await app.adminProjectPage.validateProjectSavedToastMessage();
      await (0, LogSteps_1.logStep)('Step 10: Activate multiple units booking for non-beneficiary > Verify setting is saved');
      await page.keyboard.press('PageDown');
      await waitAndClick(page.locator("//span[contains(text(), 'إعدادات المشاريع')]"));
      await waitAndClick(page.locator('//mat-tab-body[1]/div/div/form/div[2]/div[4]/div[2]/div/div[2]/div[5]/mat-slide-toggle[1]/div/button'));
      await waitAndClick(page.locator('//mat-tab-body[1]/div/div/form/div[2]/div[4]/div[2]/div/div[2]/div[5]/mat-slide-toggle[2]/div/button'));
      await waitAndFill(page.locator("input[formcontrolname='maximum_booking_per_non_beneficiary']"), '5');
      await page.keyboard.press('PageDown');
      await app.adminProjectPage.clickSaveButton();
      await app.adminProjectPage.validateProjectSavedToastMessage();
      (0, test_1.expect)(await page.locator("input[formcontrolname='maximum_booking_per_non_beneficiary']").inputValue()).toEqual('5');
    }
  );
  (0, test_1.test)(
    'TC-02 Developer approves sales contract',
    {
      annotation: [
        {
          product: 'Marketplace',
          type: 'critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const projectName = data.projectName;
      const developerUserId = data.developerUserId;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
      await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
      await app.developerProjectPage.loginDeveloper(developerUserId);
      await app.developerProjectPage.switchRoleToDeveloper();
      await (0, LogSteps_1.logStep)('Step 02: Search for the project > Open it');
      await app.developerProjectPage.openProjectBySearch(projectName);
      await (0, LogSteps_1.logStep)('Step 03: Approve the sales contract > Verify approval success message');
      await app.developerProjectPage.openSalesContractsTab();
      await app.developerProjectPage.viewAndApproveSalesContract();
      await app.developerProjectPage.approveUnitSpecification();
      await app.developerProjectPage.fillOtp('1234');
      await app.developerProjectPage.verifyOtp();
      await app.developerProjectPage.verifyApprovalSuccessMessage();
    }
  );
  (0, test_1.test)(
    'TC-03 Developer books multiple units',
    {
      annotation: [
        {
          product: 'Marketplace',
          type: 'critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const projectName = data.projectName;
      const nationalId = data.sakaniUserId;
      const developerUserId = data.developerUserId;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
      await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
      await app.developerProjectPage.loginDeveloper(developerUserId);
      await app.developerProjectPage.switchRoleToDeveloper();
      await (0, LogSteps_1.logStep)('Step 02: Start new booking > Search customer by ID > Select the project');
      await app.developerProjectPage.bookUnitsForCustomers(nationalId, projectName);
      await page.waitForTimeout(10000);
      await (0, LogSteps_1.logStep)('Step 03: Select multiple units');
      await waitAndClick(unitCheckbox(page, 1));
      await waitAndClick(unitCheckbox(page, 2));
      await (0, LogSteps_1.logStep)('Step 04: Confirm the booking > Verify booking list is visible');
      await app.developerProjectPage.clickOnNextButton();
      await app.developerProjectPage.clickOnConfirmationButton();
      (0, test_1.expect)(await app.developerProjectPage.isBookingListButtonVisible()).toBe(true);
    }
  );
  (0, test_1.test)(
    'TC-04 User pays the invoices for all units',
    {
      annotation: [
        {
          product: 'Marketplace',
          type: 'critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const sakaniUserId = data.sakaniUserId;
      const userPortalUrl = environments.userPortalUrl;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to user portal > Login');
      await app.loginPage.gotoHomePage(userPortalUrl);
      await app.loginPage.acceptCookies();
      await app.loginPage.openLogin();
      await app.loginPage.loginWithNafath(sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continueNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();
      await (0, LogSteps_1.logStep)('Step 02: Navigate to my activities > Active bookings > Not billed');
      await app.marketplaceLandingPage.openProfileManagement();
      await app.offPlanBasketMultipleBookingPage.clickMyActivities();
      await app.offPlanBasketMultipleBookingPage.clickOnBookings();
      await app.offPlanBasketMultipleBookingPage.clickOnActiveBooking();
      await app.offPlanBasketMultipleBookingPage.clickOnNotBilled();
      await (0, LogSteps_1.logStep)('Step 03: Save the booked unit codes to test data');
      unit1Code = await app.offPlanBasketMultipleBookingPage.getUnit1Code();
      unit2Code = await app.offPlanBasketMultipleBookingPage.getUnit2Code();
      writeServiceData('unit1Code', unit1Code);
      writeServiceData('unit2Code', unit2Code);
      await (0, LogSteps_1.logStep)('Step 04: Select all units > Pay the invoices > Verify payment is successful');
      await app.offPlanBasketMultipleBookingPage.clickOnUnit1CheckBox();
      await app.offPlanBasketMultipleBookingPage.clickOnUnit2CheckBox();
      await app.offPlanBasketMultipleBookingPage.clickOnPayBills();
      await app.paymentGatewayPage.fillCardDetails();
      await test_1.expect.poll(() => app.offPlanBasketMultipleBookingPage.isSuccessfulPayment(), { timeout: LONG_TIMEOUT }).toBe(true);
    }
  );
  (0, test_1.test)('TC-05 User signs sale contract for all units', async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const sakaniUserId = data.sakaniUserId;
    const userPortalUrl = environments.userPortalUrl;
    await (0, LogSteps_1.logStep)('Step 01: Navigate to user portal > Login');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.loginPage.acceptCookies();
    await app.loginPage.openLogin();
    await app.loginPage.loginWithNafath(sakaniUserId);
    await app.loginPage.waitForNafathPromptToDisappear();
    await app.loginPage.continueNewUserPopup();
    await app.loginPage.handlePushNotificationPopup();
    await (0, LogSteps_1.logStep)('Step 02: Navigate to my activities > Active bookings > Ready for sign');
    await app.marketplaceLandingPage.openProfileManagement();
    await app.offPlanBasketMultipleBookingPage.clickMyActivities();
    await app.offPlanBasketMultipleBookingPage.clickOnBookings();
    await app.offPlanBasketMultipleBookingPage.clickOnActiveBooking();
    await app.offPlanBasketMultipleBookingPage.clickOnReadyForSign();
    await (0, LogSteps_1.logStep)('Step 03: Select all units > Continue');
    await app.offPlanBasketMultipleBookingPage.clickOnUnit1CheckBox();
    await app.offPlanBasketMultipleBookingPage.clickOnUnit2CheckBox();
    await app.offPlanBasketMultipleBookingPage.clickOnContinue();
    await (0, LogSteps_1.logStep)('Step 04: Agree on the sale contract > Verify OTP > Verify contract is signed');
    await app.offPlanBasketMultipleBookingPage.clickOnProjectCheckBox();
    await app.offPlanBasketMultipleBookingPage.clickOnAgreeOnAll();
    await app.offPlanBasketMultipleBookingPage.typeVerifyOtpCode();
    await app.offPlanBasketMultipleBookingPage.clickOnVerify();
    await test_1.expect.poll(() => app.offPlanBasketMultipleBookingPage.isSuccessfulContractSignMessage(), { timeout: LONG_TIMEOUT }).toBe(true);
  });
  (0, test_1.test)('TC-06 Developer confirms the bookings', async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const developerUserId = data.developerUserId;
    await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
    await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await app.developerProjectPage.loginDeveloper(developerUserId);
    await app.developerProjectPage.switchRoleToDeveloper();
    await (0, LogSteps_1.logStep)('Step 02: Confirm the first unit booking > Verify success message');
    await app.developerProjectPage.confirmBooking(data.unit1Code);
    await test_1.expect.poll(() => app.developerProjectPage.isSuccessfulConfirmationMessageVisible(), { timeout: LONG_TIMEOUT }).toBe(true);
    await (0, LogSteps_1.logStep)('Step 03: Confirm the second unit booking > Verify success message');
    await app.developerProjectPage.closeConfirmationModal();
    await app.developerProjectPage.switchRoleToDeveloper();
    await app.developerProjectPage.confirmBooking(data.unit2Code);
    await test_1.expect.poll(() => app.developerProjectPage.isSuccessfulConfirmationMessageVisible(), { timeout: LONG_TIMEOUT }).toBe(true);
  });
});
