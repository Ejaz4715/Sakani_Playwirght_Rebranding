import { expect, test } from '@playwright/test';
import path from 'node:path';
import { WebApp } from '@base-class/web-app';
import { DateUtils } from '@pages/utils/DateUtils';
import { DataHelper } from '@helpers/DataHelper';
import { logStep } from '@helpers/LogSteps';

const SERVICE = 'FlexiblePaymentPhaseThree';

const getData = () => DataHelper.readData().services[SERVICE];
const getEnvironments = () => DataHelper.readData().environments;

test.describe('Flexible payment - Phase 3', () => {
  test(
    'TC-01 End-to-End Booking, Payment, and Status Update Flow Using Fixed Payment Schedule for a Bene User With Addition',
    {
      annotation: [{ product: 'Rebranding', type: 'critical' }] as any,
    },
    async ({ page }) => {
      test.setTimeout(1_200_000);
      const data = getData();
      const environments = getEnvironments();
      const portalUrls = [environments.adminPortalUrl, environments.sapaPortalUrl, environments.preBeta.userPortalUrl];
      const userId = data.beneUser;
      const unitsCount = 1;
      const app = new WebApp(page);
      const projectName = `Doctor test ${new Date()
        .toISOString()
        .replace(/[-:T.]/g, '')
        .slice(0, 14)}`;
      DataHelper.updateServiceData(SERVICE, 'projectName', projectName);
      await logStep('Pre-condition 01: Admin creates a new project > Activate multiple units booking for non-beneficiary');
      await logStep('Pre-Conditions 01.1:Login to the admin portal > Add new Project');
      await app.adminProjectPage.login(environments.adminPortalUrl, data.adminUsername, data.adminPassword);
      await app.adminProjectPage.clickInternalInventory();
      await app.adminProjectPage.clickProjectsLink();
      await app.adminProjectPage.clickAddNewProjectButton();

      await logStep('Pre-condition 01.2: Enter project details and save');
      await app.adminProjectPage.fillProjectName(projectName);
      await app.adminProjectPage.selectProjectType('مشاريع البيع على الخارطة على أراضي الوزارة');
      await app.adminProjectPage.selectRegion('الرياض');
      await app.adminProjectPage.selectCity('الخرج');
      await app.adminProjectPage.selectDeveloperName('شركة الضاحية المثالية للتطوير والاستثمار العقاري');
      await app.adminProjectPage.toggleBookableOn();
      await app.adminProjectPage.selectProjectStatus('متاح');
      await app.adminProjectPage.fillWafiLicenseExpiryDate(DateUtils.getDateWithOffset(600));
      await app.adminProjectPage.selectSubsidyType('دعم عيني كامل');
      await app.adminProjectPage.fillMaxSubsidyAmount('2');
      await app.adminProjectPage.fillProjectAgreementDate('01/01/2026');
      await app.adminProjectPage.fillProjectLicenseNumber('665334');
      await app.adminProjectPage.fillProjectLicenseDate(DateUtils.getDateWithOffsetAndFormat(600, 'DD/MM/YYYY'));
      await app.adminProjectPage.fillEscrowAccountName('Sakani Test User');
      await app.adminProjectPage.fillEscrowAccountNumber('SA1111111111111111111111');
      await app.adminProjectPage.selectBank('بنك الأهلي السعودي');
      await app.adminProjectPage.fillDeductionPercentage('2');
      await app.adminProjectPage.fillDeedIssueCityArabic('الرياض');
      await app.adminProjectPage.fillDeedIssueCityEnglish('Riyadh');
      await app.adminProjectPage.fillDeedDate('01/01/2026');
      await app.adminProjectPage.clickSaveButton();
      await app.adminProjectPage.validateProjectSavedToastMessage();

      await logStep('Pre-condition 01.3: Link the project to AZM');
      await app.adminProjectPage.linkProjectToAzm();

      await logStep('Pre-condition 01.5: Import the project units > Verify the import is done (تم إكمال الإجراء) > Approve');
      await app.adminProjectPage.clickUnitsTab();
      await app.adminProjectPage.expectImportNewUnitButtonVisible();
      await app.adminProjectPage.clickImportNewUnitButton();
      await app.adminProjectPage.expectResidentialUnitTypeVisible();
      await app.adminProjectPage.openResidentialUnitTypeDropdown();
      await app.adminProjectPage.selectApartmentUnitType();
      await app.adminProjectPage.uploadUnitsFile(path.join(process.cwd(), 'src', 'data', 'Offplan_MOH.xlsx'));
      await app.adminProjectPage.clickImportSaveButton();
      await app.adminProjectPage.waitForUnitImportCompletion();
      await app.adminProjectPage.expectUnitImportDone();
      await app.adminProjectPage.clickApproveButton();
      await app.adminProjectPage.clickConfirmButton();
      await app.adminProjectPage.waitForImportConfirmation();
      await app.adminProjectPage.backToProjectFromUnitsImport();

      await logStep('Pre-condition 01.6: Upload project media and enter media details');
      await app.adminProjectPage.clickProjectMediaTab();
      await app.adminProjectPage.uploadBannerImage(path.join(process.cwd(), 'src', 'data', 'Sample image.jpg'));
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

      await logStep('Pre-condition 01.7: Approve project media');
      await app.adminProjectPage.reloadAndSaveProjectMediaAgain();
      await app.adminProjectPage.clickProjectDetailsTab();
      await app.adminProjectPage.clickRequestMediaApprovalButton();
      await app.adminProjectPage.clickAcceptUploadedMediaButton();
      await app.adminProjectPage.clickKeepProjectUnpublishedButton();
      await app.adminProjectPage.clickSaveButton();
      await app.adminProjectPage.validateProjectSavedToastMessage();

      await logStep('Step 05: Select participating banks');
      await app.adminProjectPage.expectFinancingEntitiesVisible();
      await app.adminProjectPage.clickFinancingEntities();
      await app.adminProjectPage.expectSelectAllRowsVisible();
      await app.adminProjectPage.clickSelectAllRows();
      await app.adminProjectPage.expectSelectAllRowsChecked();
      await app.adminProjectPage.clickSaveButton();
      await app.adminProjectPage.validateProjectSavedToastMessage();

      await logStep('Pre-condition 01.8: Publish the unit model');
      await app.adminProjectPage.clickUnitModelsSection();
      await app.adminProjectPage.clickUnitModelCell();
      await app.adminProjectPage.clickSaveButton();
      await app.adminProjectPage.clickMediaDraftSection();
      await app.adminProjectPage.clickSaveButton();
      await app.adminProjectPage.clickRequestMediaApprovalButton();
      await app.adminProjectPage.clickAcceptUploadedMediaButton();
      await app.adminProjectPage.clickPublishUnitButton();
      await app.adminProjectPage.clickUnitModelLink();

      await logStep('Pre-condition 01.9: Set project availability');
      await app.adminProjectPage.clickProjectDetailsText();
      await app.adminProjectPage.selectProjectStatus('متاح');
      await app.adminProjectPage.selectAvailableProjectStatus();
      await app.adminProjectPage.clickSaveButton();

      await logStep('Pre-condition 01.10: Publish the project and validate the toast message');
      await app.adminProjectPage.enableAvailableForBookingToggle();
      await app.adminProjectPage.publishProject();
      await app.adminProjectPage.clickSaveButton();
      await app.adminProjectPage.validateProjectSavedToastMessage();

      await logStep('Pre-condition 01.11: Project settings > Activate multiple units booking for non-beneficiary');
      await app.adminProjectPage.expandProjectSettingsSection();
      await app.adminProjectPage.activateMultipleBookingToggles();
      await app.adminProjectPage.fillMaxBookingPerNonBene('5');
      await app.adminProjectPage.clickSaveButton();
      await app.adminProjectPage.validateProjectSavedToastMessage();

      await logStep('Pre-condition 02: Developer approves the sales contract');

      await logStep('Pre-condition 02.1: Partners portal > Login as developer > Open the project');
      await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
      await app.partnersLoginPage.loginToSapaPortalBeta(data.developerUserId);
      await app.developerProjectPage.switchRoleToDeveloper();
      await app.developerProjectPage.openProjectBySearch(projectName);

      await logStep('Pre-condition 02.2: Approve the sales contract > Verify approval success message');
      await app.developerProjectPage.openSalesContractsTab();
      await app.developerProjectPage.viewAndApproveSalesContract();
      await app.developerProjectPage.approveUnitSpecification();
      await app.developerProjectPage.fillOtp('1234');
      await app.developerProjectPage.verifyOtp();
      await app.developerProjectPage.verifyApprovalSuccessMessage();

      await logStep('Pre-condition 03: Developer adds a flexible payment schedule');
      const timestamp = new Date()
        .toISOString()
        .replace(/[-:T.]/g, '')
        .slice(0, 14);
      const scheduleTitleAr = `جدول دفع مرن لخدمات أتمتة الاختبارات ${timestamp}`;
      const scheduleTitleEn = `Automation Flexible Payment Schedule ${timestamp}`;
      DataHelper.updateServiceData(SERVICE, 'scheduleTitleAr', scheduleTitleAr);
      DataHelper.updateServiceData(SERVICE, 'scheduleTitleEn', scheduleTitleEn);

      await logStep('Pre-condition 03.1: Login as developer > Financial management > Payment schedules');
      await app.partnersLoginPage.gotoAuth(environments.sapaPortalUrl);
      await app.partnersLoginPage.loginToSapaPortal(data.developerUserId);
      await app.partnersLoginPage.switchRoleToDeveloper();
      await app.flexiblePaymentPage.clickOnFinancialManagement();
      await app.flexiblePaymentPage.clickOnPaymentSchedules();

      await logStep('Pre-condition 03.2: New schedule > Enter the schedule name in AR and EN > Completion percentage');
      await app.flexiblePaymentPage.clickOnNewSchedulesButton();
      await app.flexiblePaymentPage.enterScheduleNameInArabic(scheduleTitleAr);
      await app.flexiblePaymentPage.enterScheduleNameInEnglish(scheduleTitleEn);
      await app.flexiblePaymentPage.selectScheduleType('completionPercentage');
      await app.flexiblePaymentPage.clickOnNextButton();

      await logStep('Pre-condition 03.3: Enter the payment and completion percentages of the installments');
      await app.flexiblePaymentPage.fillFirstPaymentPaidPercentage(50);
      await app.flexiblePaymentPage.fillFirstPaymentCompletionPercentage(20);
      await app.flexiblePaymentPage.fillSecondPaymentPaidPercentage(30);
      await app.flexiblePaymentPage.fillSecondPaymentCompletionPercentage(30);
      await app.flexiblePaymentPage.fillThirdPaymentPaidPercentage(20);
      await app.flexiblePaymentPage.fillThirdPaymentCompletionPercentage(100);
      await app.flexiblePaymentPage.clickOnNextButton();

      await logStep('Pre-condition 03.4: Select the project > Review the summary > Confirm > Verify the success message');
      await app.flexiblePaymentPage.serachByprojectName(projectName);
      await app.flexiblePaymentPage.checkOnProjectNameSearchedResult();
      await app.flexiblePaymentPage.clickOnNextButton();
      await app.flexiblePaymentPage.clickOnNextButton();
      await app.flexiblePaymentPage.clickOnConfirmButton();
      await app.flexiblePaymentPage.verifyTheSuccessfulMessage();

      await logStep('Pre-condition 04: Admin enables comprehensive booking and payment collection automation');
      await page.context().clearCookies();
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

      await logStep(`Pre-condition 05: Developer books ${unitsCount} unit(s) for the user on the project ${projectName}`);
      await page.context().clearCookies();

      await logStep('Pre-condition 05.1: Partners portal > Login as developer > New booking > Search the customer > Select the project');
      await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
      await app.partnersLoginPage.loginToSapaPortalBeta(data.developerUserId);
      await app.developerProjectPage.switchRoleToDeveloper();
      await app.developerProjectPage.bookUnitsForCustomers(userId, projectName);
      await page.waitForTimeout(10000);
      await logStep(`Pre-condition 05.2: Select ${unitsCount} unit(s)`);
      await app.developerProjectPage.selectUnitCheckbox(1);

      await logStep('Pre-condition 05.3: Financial details > Select the bank (single unit only) > Confirm the booking > Verify the booking is created');
      await app.developerProjectPage.clickOnNextButton();
      await app.developerProjectPage.clickContinueBookingButton();
      await app.developerProjectPage.selectBank('بنك الأهلي السعودي');
      await app.developerProjectPage.clickOnNextButton();
      await app.developerProjectPage.clickOnConfirmationButton();
      await app.developerProjectPage.validateSuccessReservationPopup();

      await logStep('Step 01: Open pre-beta (Sakani) > Login with Nafath as the user');
      await page.context().clearCookies();
      await app.loginPage.gotoHomePage(environments.preBeta.userPortalUrl);
      await app.commonMethods.unifiedSakaniLogin(userId);

      await logStep('Step 02: Profile > حجوزاتي > Open the booking details');
      await app.PaymentflexiblePhaseThree.openMyBookingsFromProfileMenu();
      await app.bookingPage.openBookingDetails();

      await logStep('Step 03: ادفع رسوم الحجز > ادفع الرسوم > Pay by mada card > Wait until the payment page is loaded');
      await app.PaymentflexiblePhaseThree.payBookingFeesFromBookingDetails();
      await app.paymentGatewayPage.fillCardDetails();
      await app.PaymentflexiblePhaseThree.waitForPaymentSuccess();

      await logStep('Step 04: Back to Sakani > Refresh > Login again if needed > حجوزاتي > Open the booking details');
      await app.PaymentflexiblePhaseThree.openPreBetaAndLoginIfLoggedOut(environments.preBeta.userPortalUrl, userId);
      await app.PaymentflexiblePhaseThree.openMyBookingsFromProfileMenu();
      await app.bookingPage.openBookingDetails();

      await logStep('Step 05: اختر طريقة الدفع > Select the flexible payment schedule > حفظ ومتابعة');
      await app.PaymentflexiblePhaseThree.openSelectPaymentMethod();
      await app.PaymentflexiblePhaseThree.selectPaymentSchedule(scheduleTitleAr);
      await app.PaymentflexiblePhaseThree.clickSaveAndContinueButton();

      await logStep('Step 06: Sign the sales contract: اعتماد > OTP > تحقق');
      await app.unitBookingPage.signSalesContract();

      await logStep('Step 07: Back to Sakani > حجوزاتي > Open the booking details > Verify the payment schedule (جدول الدفع) is displayed');
      await app.PaymentflexiblePhaseThree.openPreBetaAndLoginIfLoggedOut(environments.preBeta.userPortalUrl, userId);
      await app.PaymentflexiblePhaseThree.openMyBookingsFromProfileMenu();
      await app.bookingPage.openBookingDetails();
      await app.PaymentflexiblePhaseThree.verifyPaymentScheduleDisplayed();
    }
  );

  test(
    'TC-02 End-to-End Booking, Payment, and Status Update Flow Using Fixed Payment Schedule for a Non-Bene User With Addition',
    {
      annotation: [{ product: 'Rebranding', type: 'critical' }] as any,
    },
    async ({ page }) => {
      const data = getData();
      const environments = getEnvironments();
      const portalUrls = [environments.adminPortalUrl, environments.sapaPortalUrl, environments.preBeta.userPortalUrl];
      const userId = data.nonBeneUser;
      const unitsCount = 1;
      const projectName = data.projectName;
      const scheduleTitleAr = data.scheduleTitleAr;
      const app = new WebApp(page);

      await logStep(`Pre-condition 05: Developer books ${unitsCount} unit(s) for the user on the project ${projectName}`);
      await page.context().clearCookies();

      await logStep('Pre-condition 05.1: Partners portal > Login as developer > New booking > Search the customer > Select the project');
      await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
      await app.partnersLoginPage.loginToSapaPortalBeta(data.developerUserId);
      await app.developerProjectPage.switchRoleToDeveloper();
      await app.developerProjectPage.bookUnitsForCustomers(userId, projectName);
      await page.waitForTimeout(10000);

      await logStep(`Pre-condition 05.2: Select ${unitsCount} unit(s)`);
      await app.developerProjectPage.selectUnitCheckbox(1);

      await logStep('Pre-condition 05.3: Financial details > Select the bank (single unit only) > Confirm the booking > Verify the booking is created');
      await app.developerProjectPage.clickOnNextButton();
      await app.developerProjectPage.clickContinueBookingButton();
      await app.developerProjectPage.selectBank('بنك الأهلي السعودي');
      await app.developerProjectPage.clickOnNextButton();
      await app.developerProjectPage.clickOnConfirmationButton();
      await app.developerProjectPage.validateSuccessReservationPopup();

      await logStep('Step 01: Open pre-beta (Sakani) > Login with Nafath as the user');
      await page.context().clearCookies();
      await app.loginPage.gotoHomePage(environments.preBeta.userPortalUrl);
      await app.commonMethods.unifiedSakaniLogin(userId);

      await logStep('Step 02: Profile > حجوزاتي > Open the booking details');
      await app.PaymentflexiblePhaseThree.openMyBookingsFromProfileMenu();
      await app.bookingPage.openBookingDetails();

      await logStep('Step 03: ادفع رسوم الحجز > ادفع الرسوم > Pay by mada card > Wait until the payment page is loaded');
      await app.PaymentflexiblePhaseThree.payBookingFeesFromBookingDetails();
      await app.paymentGatewayPage.fillCardDetails();
      await app.PaymentflexiblePhaseThree.waitForPaymentSuccess();

      await logStep('Step 04: Back to Sakani > Refresh > Login again if needed > حجوزاتي > Open the booking details');
      await app.PaymentflexiblePhaseThree.openPreBetaAndLoginIfLoggedOut(environments.preBeta.userPortalUrl, userId);
      await app.PaymentflexiblePhaseThree.openMyBookingsFromProfileMenu();
      await app.bookingPage.openBookingDetails();

      await logStep('Step 05: اختر طريقة الدفع > Select the flexible payment schedule > حفظ ومتابعة');
      await app.PaymentflexiblePhaseThree.openSelectPaymentMethod();
      await app.PaymentflexiblePhaseThree.selectPaymentSchedule(scheduleTitleAr);
      await app.PaymentflexiblePhaseThree.clickSaveAndContinueButton();

      await logStep('Step 06: Sign the sales contract: اعتماد > OTP > تحقق');
      await app.unitBookingPage.signSalesContract();

      await logStep('Step 07: Back to Sakani > حجوزاتي > Open the booking details > Verify the payment schedule (جدول الدفع) is displayed');
      await app.PaymentflexiblePhaseThree.openPreBetaAndLoginIfLoggedOut(environments.preBeta.userPortalUrl, userId);
      await app.PaymentflexiblePhaseThree.openMyBookingsFromProfileMenu();
      await app.bookingPage.openBookingDetails();
      await app.PaymentflexiblePhaseThree.verifyPaymentScheduleDisplayed();
    }
  );

  test(
    'TC-03 End-to-End Booking, Payment, and Status Update Flow Using Fixed Payment Schedule for a Company Bene User With Addition',
    {
      annotation: [{ product: 'Rebranding', type: 'critical' }] as any,
    },
    async ({ page }) => {
      test.setTimeout(1_200_000);
      const data = getData();
      const environments = getEnvironments();
      const individualProjectName = data.projectName;
      const companyUserId = data.companyBeneUser;
      const companyCR = data.companyBeneCR;
      const app = new WebApp(page);

      const projectName = `Doctor test ${new Date()
        .toISOString()
        .replace(/[-:T.]/g, '')
        .slice(0, 14)}`;
      DataHelper.updateServiceData(SERVICE, 'projectName', projectName);

      await logStep('Pre-condition 01: Admin creates a new project with company units');

      await logStep('Pre-Conditions 01.1:Login to the admin portal > Add new Project');
      await app.adminProjectPage.login(environments.adminPortalUrl, data.adminUsername, data.adminPassword);
      await app.adminProjectPage.clickInternalInventory();
      await app.adminProjectPage.clickProjectsLink();
      await app.adminProjectPage.clickAddNewProjectButton();

      await logStep('Pre-condition 01.2: Enter project details and save');
      await app.adminProjectPage.fillProjectName(projectName);
      await app.adminProjectPage.selectProjectType('مشاريع البيع على الخارطة على أراضي الوزارة');
      await app.adminProjectPage.selectRegion('الرياض');
      await app.adminProjectPage.selectCity('الخرج');
      await app.adminProjectPage.selectDeveloperName('شركة الضاحية المثالية للتطوير والاستثمار العقاري');
      await app.adminProjectPage.toggleBookableOn();
      await app.adminProjectPage.selectProjectStatus('متاح');
      await app.adminProjectPage.fillWafiLicenseExpiryDate(DateUtils.getDateWithOffset(600));
      await app.adminProjectPage.selectSubsidyType('دعم عيني كامل');
      await app.adminProjectPage.fillMaxSubsidyAmount('2');
      await app.adminProjectPage.fillProjectAgreementDate('01/01/2026');
      await app.adminProjectPage.fillProjectLicenseNumber('665334');
      await app.adminProjectPage.fillProjectLicenseDate(DateUtils.getDateWithOffsetAndFormat(600, 'DD/MM/YYYY'));
      await app.adminProjectPage.fillEscrowAccountName('Sakani Test User');
      await app.adminProjectPage.fillEscrowAccountNumber('SA1111111111111111111111');
      await app.adminProjectPage.selectBank('بنك الأهلي السعودي');
      await app.adminProjectPage.fillDeductionPercentage('2');
      await app.adminProjectPage.fillDeedIssueCityArabic('الرياض');
      await app.adminProjectPage.fillDeedIssueCityEnglish('Riyadh');
      await app.adminProjectPage.fillDeedDate('01/01/2026');
      await app.adminProjectPage.clickSaveButton();
      await app.adminProjectPage.validateProjectSavedToastMessage();

      await logStep('Pre-condition 01.3: Link the project to AZM');
      await app.adminProjectPage.linkProjectToAzm();

      await logStep('Pre-condition 01.5: Import the project units > Verify the import is done (تم إكمال الإجراء) > Approve');
      await app.adminProjectPage.clickUnitsTab();
      await app.adminProjectPage.expectImportNewUnitButtonVisible();
      await app.adminProjectPage.clickImportNewUnitButton();
      await app.adminProjectPage.expectResidentialUnitTypeVisible();
      await app.adminProjectPage.openResidentialUnitTypeDropdown();
      await app.adminProjectPage.selectApartmentUnitType();
      await app.adminProjectPage.uploadUnitsFile(path.join(process.cwd(), 'src', 'data', 'OffPlanCompany.xlsx'));
      await app.adminProjectPage.clickImportSaveButton();
      await app.adminProjectPage.waitForUnitImportCompletion();
      await app.adminProjectPage.expectUnitImportDone(); //  new Meythod to Check The Unit already imported
      await app.adminProjectPage.clickApproveButton();
      await app.adminProjectPage.clickConfirmButton();
      await app.adminProjectPage.waitForImportConfirmation();
      await app.adminProjectPage.backToProjectFromUnitsImport(); // new methods to conferm the Project form imported sucessfully

      await logStep('Pre-condition 01.6: Upload project media and enter media details');
      await app.adminProjectPage.clickProjectMediaTab();
      await app.adminProjectPage.uploadBannerImage(path.join(process.cwd(), 'src', 'data', 'Sample image.jpg'));
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

      await logStep('Pre-condition 01.7: Approve project media');
      await app.adminProjectPage.reloadAndSaveProjectMediaAgain(); // mew Method to check the project media allready Saved
      await app.adminProjectPage.clickProjectDetailsTab();
      await app.adminProjectPage.clickRequestMediaApprovalButton();
      await app.adminProjectPage.clickAcceptUploadedMediaButton();
      await app.adminProjectPage.clickKeepProjectUnpublishedButton();
      await app.adminProjectPage.clickSaveButton();
      await app.adminProjectPage.validateProjectSavedToastMessage();

      await logStep('Step 05: Select participating banks');
      await app.adminProjectPage.expectFinancingEntitiesVisible();
      await app.adminProjectPage.clickFinancingEntities();
      await app.adminProjectPage.expectSelectAllRowsVisible();
      await app.adminProjectPage.clickSelectAllRows();
      await app.adminProjectPage.expectSelectAllRowsChecked();
      await app.adminProjectPage.clickSaveButton();
      await app.adminProjectPage.validateProjectSavedToastMessage();

      await logStep('Pre-condition 01.8: Publish the unit model');
      await app.adminProjectPage.clickUnitModelsSection();
      await app.adminProjectPage.clickUnitModelCell();
      await app.adminProjectPage.clickSaveButton();
      await app.adminProjectPage.clickMediaDraftSection();
      await app.adminProjectPage.clickSaveButton();
      await app.adminProjectPage.clickRequestMediaApprovalButton();
      await app.adminProjectPage.clickAcceptUploadedMediaButton();
      await app.adminProjectPage.clickPublishUnitButton();
      await app.adminProjectPage.clickUnitModelLink();

      await logStep('Pre-condition 01.9: Set project availability');
      await app.adminProjectPage.clickProjectDetailsText();
      await app.adminProjectPage.selectProjectStatus('متاح');
      await app.adminProjectPage.selectAvailableProjectStatus();
      await app.adminProjectPage.clickSaveButton();

      await logStep('Pre-condition 01.10: Publish the project and validate the toast message');
      await app.adminProjectPage.enableAvailableForBookingToggle();
      await app.adminProjectPage.publishProject();
      await app.adminProjectPage.clickSaveButton();
      await app.adminProjectPage.validateProjectSavedToastMessage();

      DataHelper.updateServiceData(SERVICE, 'companyProjectName', projectName);
      await logStep('Pre-condition 02: Developer approves the sales contract');
      await logStep('Pre-condition 02.1: Partners portal > Login as developer > Open the project');
      await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
      await app.partnersLoginPage.loginToSapaPortalBeta(data.developerUserId);
      await app.developerProjectPage.switchRoleToDeveloper();
      await app.developerProjectPage.openProjectBySearch(projectName);

      await logStep('Pre-condition 02.2: Approve the sales contract for Company > Verify approval success message');
      await app.developerProjectPage.openSalesContractsTab();
      await app.developerProjectPage.clickOnCompanies();
      await app.developerProjectPage.viewAndApproveSalesContract();
      await app.developerProjectPage.approveUnitSpecification();
      await app.developerProjectPage.fillOtp('1234');
      await app.developerProjectPage.verifyOtp();
      await app.developerProjectPage.verifyApprovalSuccessMessage();
      await logStep('Pre-condition 03: Developer adds a flexible payment schedule');
      const timestamp = new Date()
        .toISOString()
        .replace(/[-:T.]/g, '')
        .slice(0, 14);
      const scheduleTitleAr = `جدول دفع مرن لخدمات أتمتة الاختبارات ${timestamp}`;
      const scheduleTitleEn = `Automation Flexible Payment Schedule ${timestamp}`;
      DataHelper.updateServiceData(SERVICE, 'scheduleTitleAr', scheduleTitleAr);
      DataHelper.updateServiceData(SERVICE, 'scheduleTitleEn', scheduleTitleEn);

      await logStep('Pre-condition 03.1: Login as developer > Financial management > Payment schedules');
      await app.partnersLoginPage.gotoAuth(environments.sapaPortalUrl);
      await app.partnersLoginPage.loginToSapaPortal(data.developerUserId);
      await app.partnersLoginPage.switchRoleToDeveloper();
      await app.flexiblePaymentPage.clickOnFinancialManagement();
      await app.flexiblePaymentPage.clickOnPaymentSchedules();

      await logStep('Pre-condition 03.2: New schedule > Enter the schedule name in AR and EN > Completion percentage');
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
      await logStep('Pre-condition 04: Admin enables comprehensive booking and payment collection automation');
      await page.context().clearCookies();
      await app.adminProjectPage.login(environments.adminPortalUrl, data.adminUsername, data.adminPassword);
      await app.adminProjectPage.openProjects();
      await app.resaleOfUnitsPage.fillProjectName(projectName);
      await app.resaleOfUnitsPage.clickProjectSearchButton();
      await app.resaleOfUnitsPage.clickSearchedProjectResult(projectName);
      await page.waitForTimeout(10000);
      await app.paymentTrackingPage.clickOnProjectSettings();
      //await app.paymentTrackingPage.clickOnUseGeneralSettingSwitch();
      await app.paymentTrackingPage.clickonpaymentCollectionCompanySwitch();
      await app.paymentTrackingPage.clickOnSaveButton();
      await app.paymentTrackingPage.verifySaveSuccessToast();

      DataHelper.updateServiceData(SERVICE, 'projectName', individualProjectName);
      await logStep(`Pre-condition 06: Developer books a unit for the company user on the project ${projectName} > Select the bank > Confirm`);
      await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
      await app.partnersLoginPage.loginToSapaPortalBeta(data.developerUserId);
      await app.developerProjectPage.switchRoleToDeveloper();
      await app.developerProjectPage.bookUnitsForCompanies(companyUserId, companyCR, projectName);
      await page.waitForTimeout(10000);
      await app.developerProjectPage.selectUnitCheckbox(1);
      await app.developerProjectPage.clickOnNextButton();
      await app.developerProjectPage.clickOnKeepBooking();
      await app.developerProjectPage.selectBank('بنك الأهلي السعودي');

      await app.developerProjectPage.clickOnNextButton();
      await app.developerProjectPage.confirmBookingForCompanies();
      expect(await app.developerProjectPage.isCompanyBookingConfirmed()).toBe(true);

      await logStep('Step 01: Open pre-beta (Sakani) > Login with Nafath as the company user');
      await page.context().clearCookies();
      await app.loginPage.gotoHomePage(environments.preBeta.userPortalUrl);
      await app.commonMethods.unifiedSakaniLogin(companyUserId);

      await logStep('Step 02: Profile > الشركات > حجوزات الشركة > الحجوزات النشطة > غير مفوترة > Save the unit code');
      await app.marketplaceLandingPage.openProfileManagement();
      await app.PaymentflexiblePhaseThree.openMyBookingsFromProfileMenu();
      await app.offPlanBasketMultipleBookingPage.clickOnCompanies();
      await app.offPlanBasketMultipleBookingPage.clickOnCompanyReservations();
      await app.offPlanBasketMultipleBookingPage.clickOnCompanyActiveBookings();
      await app.offPlanBasketMultipleBookingPage.clickOnNotBilled();
      const bookingHeading = page.getByRole('heading', { name: /الحجز لوحدة رقم/ }).first();
      if (!(await bookingHeading.isVisible({ timeout: 10000 }).catch(() => false))) {
        await app.offPlanBasketMultipleBookingPage.clickOnShowDetails();
      }
      const companyUnitCode = await app.PaymentflexiblePhaseThree.getUnitCodeFromBookingDetails();
      await logStep('Step 03: ادفع رسوم الحجز > ادفع الرسوم > Pay by mada card > Wait until the payment is done');
      await app.PaymentflexiblePhaseThree.payBookingFeesFromBookingDetails();
      await app.paymentGatewayPage.fillCardDetails();
      await app.PaymentflexiblePhaseThree.waitForPaymentSuccess();
      await logStep('Step 04: Back to Sakani > Login again if needed > الشركات > حجوزات الشركة > الحجوزات النشطة > جاهز للتوقيع');
      await app.PaymentflexiblePhaseThree.openPreBetaAndLoginIfLoggedOut(environments.preBeta.userPortalUrl, companyUserId);
      await app.marketplaceLandingPage.openProfileManagement();
      await app.PaymentflexiblePhaseThree.openMyBookingsFromProfileMenu();
      await app.offPlanBasketMultipleBookingPage.clickOnCompanies();
      await app.offPlanBasketMultipleBookingPage.clickOnCompanyReservations();
      await app.PaymentflexiblePhaseThree.VerifyPaiedstatusRequest();
      await app.PaymentflexiblePhaseThree.ClickonrequestDetailes();

      await logStep('Step 05: اختر طريقة الدفع > Select the flexible payment schedule > حفظ ومتابعة');
      await app.PaymentflexiblePhaseThree.openSelectPaymentMethod();
      await app.PaymentflexiblePhaseThree.selectPaymentSchedule(scheduleTitleAr);
      await app.PaymentflexiblePhaseThree.clickSaveAndContinueButton();

      await logStep('Step 06: Sign the sales contract: اعتماد > OTP > تحقق');
      await app.unitBookingPage.signSalesContract();

      await logStep('Step 07: Back to Sakani > حجوزاتي > Open the booking details > Verify the payment schedule (جدول الدفع) is displayed');
      await app.PaymentflexiblePhaseThree.openPreBetaAndLoginIfLoggedOut(environments.preBeta.userPortalUrl, companyUserId);
      await app.marketplaceLandingPage.openProfileManagement();
      await app.PaymentflexiblePhaseThree.openMyBookingsFromProfileMenu();
      await app.offPlanBasketMultipleBookingPage.clickOnCompanies();
      await app.offPlanBasketMultipleBookingPage.clickOnCompanyReservations();
      await app.PaymentflexiblePhaseThree.VerifyPaiedstatusRequest();
      await app.PaymentflexiblePhaseThree.ClickonrequestDetailes();
      await app.PaymentflexiblePhaseThree.ClickonpaymentplanButton();
      await app.PaymentflexiblePhaseThree.VerifypaymentScheduleDetails();
    }
  );

  test(
    'TC-04 End-to-End Booking, Payment, and Status Update Flow Using Fixed Payment Schedule for a Company Non-Bene User With Addition',
    {
      annotation: [{ product: 'Rebranding', type: 'critical' }] as any,
    },
    async ({ page }) => {
      test.setTimeout(1_200_000);
      const data = getData();
      const environments = getEnvironments();
      const companyUserId = data.companyNonBeneUser;
      const companyCR = data.companyNonBeneCR;
      const projectName = data.companyProjectName;
      const scheduleTitleAr = data.scheduleTitleAr;
      const app = new WebApp(page);

      await logStep(`Pre-condition 06: Developer books a unit for the company user on the project ${projectName} > Select the bank > Confirm`);
      await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
      await app.partnersLoginPage.loginToSapaPortalBeta(data.developerUserId);
      await app.developerProjectPage.switchRoleToDeveloper();
      await app.developerProjectPage.bookUnitsForCompanies(companyUserId, companyCR, projectName);
      await page.waitForTimeout(10000);
      await app.developerProjectPage.selectUnitCheckbox(1);
      await app.developerProjectPage.clickOnNextButton();
      await app.developerProjectPage.clickOnKeepBooking();
      await app.developerProjectPage.selectBank('بنك الأهلي السعودي');

      await app.developerProjectPage.clickOnNextButton();
      await app.developerProjectPage.confirmBookingForCompanies();
      expect(await app.developerProjectPage.isCompanyBookingConfirmed()).toBe(true);

      await logStep('Step 01: Open pre-beta (Sakani) > Login with Nafath as the company user');
      await page.context().clearCookies();
      await app.loginPage.gotoHomePage(environments.preBeta.userPortalUrl);
      await app.commonMethods.unifiedSakaniLogin(companyUserId);

      await logStep('Step 02: Profile > الشركات > حجوزات الشركة > الحجوزات النشطة > غير مفوترة > Save the unit code');
      await app.marketplaceLandingPage.openProfileManagement();
      await app.PaymentflexiblePhaseThree.openMyBookingsFromProfileMenu();
      await app.offPlanBasketMultipleBookingPage.clickOnCompanies();
      await app.offPlanBasketMultipleBookingPage.clickOnCompanyReservations();
      await app.offPlanBasketMultipleBookingPage.clickOnCompanyActiveBookings();
      await app.offPlanBasketMultipleBookingPage.clickOnNotBilled();
      const bookingHeading = page.getByRole('heading', { name: /الحجز لوحدة رقم/ }).first();
      if (!(await bookingHeading.isVisible({ timeout: 10000 }).catch(() => false))) {
        await app.offPlanBasketMultipleBookingPage.clickOnShowDetails();
      }
      const companyUnitCode = await app.PaymentflexiblePhaseThree.getUnitCodeFromBookingDetails();

      await logStep('Step 03: ادفع رسوم الحجز > ادفع الرسوم > Pay by mada card > Wait until the payment is done');
      await app.PaymentflexiblePhaseThree.payBookingFeesFromBookingDetails();
      await app.paymentGatewayPage.fillCardDetails();
      await app.PaymentflexiblePhaseThree.waitForPaymentSuccess();

      await logStep('Step 04: Back to Sakani > Login again if needed > الشركات > حجوزات الشركة > الحجوزات النشطة > جاهز للتوقيع');
      await app.PaymentflexiblePhaseThree.openPreBetaAndLoginIfLoggedOut(environments.preBeta.userPortalUrl, companyUserId);
      await app.marketplaceLandingPage.openProfileManagement();
      await app.PaymentflexiblePhaseThree.openMyBookingsFromProfileMenu();
      await app.offPlanBasketMultipleBookingPage.clickOnCompanies();
      await app.offPlanBasketMultipleBookingPage.clickOnCompanyReservations();
      await app.PaymentflexiblePhaseThree.VerifyPaiedstatusRequest();
      await app.PaymentflexiblePhaseThree.ClickonrequestDetailes();

      await logStep('Step 05: اختر طريقة الدفع > Select the flexible payment schedule > حفظ ومتابعة');
      await app.PaymentflexiblePhaseThree.openSelectPaymentMethod();
      await app.PaymentflexiblePhaseThree.selectPaymentSchedule(scheduleTitleAr);
      await app.PaymentflexiblePhaseThree.clickSaveAndContinueButton();

      await logStep('Step 06: Sign the sales contract: اعتماد > OTP > تحقق');
      await app.unitBookingPage.signSalesContract();

      await logStep('Step 07: Back to Sakani > حجوزاتي > Open the booking details > Verify the payment schedule (جدول الدفع) is displayed');
      await app.PaymentflexiblePhaseThree.openPreBetaAndLoginIfLoggedOut(environments.preBeta.userPortalUrl, companyUserId);
      await app.marketplaceLandingPage.openProfileManagement();
      await app.PaymentflexiblePhaseThree.openMyBookingsFromProfileMenu();
      await app.offPlanBasketMultipleBookingPage.clickOnCompanies();
      await app.offPlanBasketMultipleBookingPage.clickOnCompanyReservations();
      await app.PaymentflexiblePhaseThree.VerifyPaiedstatusRequest();
      await app.PaymentflexiblePhaseThree.ClickonrequestDetailes();
      await app.PaymentflexiblePhaseThree.ClickonpaymentplanButton();
      await app.PaymentflexiblePhaseThree.VerifypaymentScheduleDetails();
    }
  );

  test(
    'TC-05 End-to-End Booking, Payment, and Status Update Flow Using Fixed Payment Schedule for a Unit Basket for a Bene User',
    {
      annotation: [{ product: 'Rebranding', type: 'critical' }] as any,
    },
    async ({ page }) => {
      test.setTimeout(1_200_000);
      const data = getData();
      const environments = getEnvironments();
      const portalUrls = [environments.adminPortalUrl, environments.sapaPortalUrl, environments.preBeta.userPortalUrl];
      const userId = data.unitBasketUser;
      const unitsCount = 2;
      const projectName = data.projectName;
      const scheduleTitleAr = data.scheduleTitleAr;
      const app = new WebApp(page);

      await logStep(`Pre-condition 05: Developer books ${unitsCount} unit(s) for the user on the project ${projectName}`);
      await page.context().clearCookies();

      await logStep('Pre-condition 05.1: Partners portal > Login as developer > New booking > Search the customer > Select the project');
      await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
      await app.partnersLoginPage.loginToSapaPortalBeta(data.developerUserId);
      await app.developerProjectPage.switchRoleToDeveloper();
      await app.developerProjectPage.bookUnitsForCustomers(userId, projectName);
      await page.waitForTimeout(10000);

      await logStep(`Pre-condition 05.2: Select ${unitsCount} unit(s)`);
      await app.developerProjectPage.selectUnitCheckbox(1);
      await app.developerProjectPage.selectUnitCheckbox(2);

      await logStep('Pre-condition 05.3: التالي > Summary of the 2 units > تأكيد > Verify the booking is created (تأكيد الحجز popup)');
      await app.developerProjectPage.clickOnNextButton();
      await app.developerProjectPage.clickOnConfirmationButton();
      await app.developerProjectPage.validateSuccessReservationPopup();

      await logStep('Step 01: Open pre-beta (Sakani) > Login with Nafath as the user');
      await page.context().clearCookies();
      await app.loginPage.gotoHomePage(environments.preBeta.userPortalUrl);
      await app.commonMethods.unifiedSakaniLogin(userId);

      await logStep('Step 02: Profile > حجوزاتي > Open the booking details');
      await app.PaymentflexiblePhaseThree.openMyBookingsFromProfileMenu();
      await app.bookingPage.openBookingDetails();

      await logStep('Step 03: ادفع رسوم الحجز > ادفع الرسوم > Pay by mada card > Wait until the payment page is loaded');
      await app.PaymentflexiblePhaseThree.payBookingFeesFromBookingDetails();
      await app.paymentGatewayPage.fillCardDetails();
      await app.PaymentflexiblePhaseThree.waitForPaymentSuccess();

      await logStep('Step 04: Back to Sakani > Refresh > Login again if needed > حجوزاتي > Open the booking details');
      await app.PaymentflexiblePhaseThree.openPreBetaAndLoginIfLoggedOut(environments.preBeta.userPortalUrl, userId);
      await app.PaymentflexiblePhaseThree.openMyBookingsFromProfileMenu();
      await app.bookingPage.openBookingDetails();

      await logStep('Step 05: اختر طريقة الدفع > Select the flexible payment schedule > حفظ ومتابعة');
      await app.PaymentflexiblePhaseThree.openSelectPaymentMethod();
      await app.PaymentflexiblePhaseThree.selectPaymentSchedule(scheduleTitleAr);
      await app.PaymentflexiblePhaseThree.clickSaveAndContinueButton();

      await logStep('Step 06: Sign the sales contract: اعتماد > OTP > تحقق');
      await app.unitBookingPage.signSalesContract();

      await logStep('Step 07: Back to Sakani > حجوزاتي > Open the booking details > Verify the payment schedule (جدول الدفع) is displayed');
      await app.PaymentflexiblePhaseThree.openPreBetaAndLoginIfLoggedOut(environments.preBeta.userPortalUrl, userId);
      await app.PaymentflexiblePhaseThree.openMyBookingsFromProfileMenu();
      await app.bookingPage.openBookingDetails();
      await app.PaymentflexiblePhaseThree.verifyPaymentScheduleDisplayed();
    }
  );
});
