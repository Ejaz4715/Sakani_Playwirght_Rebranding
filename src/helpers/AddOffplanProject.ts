import { expect, Locator, Page } from '@playwright/test';
import path from 'node:path';
import { WebApp } from '@base-class/web-app';
import { DateUtils } from '@pages/utils/DateUtils';
import { DataHelper } from '@helpers/DataHelper';
import { logStep } from '@helpers/LogSteps';

const DEFAULT_TIMEOUT = 30_000;

async function waitAndClick(locator: Locator, timeout = DEFAULT_TIMEOUT) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.click();
}

async function waitAndFill(locator: Locator, value: string, timeout = DEFAULT_TIMEOUT) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.fill(value);
}

/**
 * Admin adds a new offplan project for the unit basket multiple booking flow.
 * Reads admin credentials from the given service's data and saves the generated projectName back to it.
 */
// isCompany = true imports the company units (OffPlanCompany.xlsx) and skips the multiple booking for non-beneficiary (Step 12), it can't be enabled on a company units project
export async function addOffplanProjectForMultipleBooking(page: Page, service: string, projectNamePrefix = 'Automation Project Offplan', isCompany = false) {
  await logStep('Step 00: Read data from json relative to the service');
  const environment = DataHelper.readData().environments;
  const data = DataHelper.readData().services[service];
  const app = new WebApp(page);
  const projectName = `${projectNamePrefix} ${new Date()
    .toISOString()
    .replace(/[-:T.]/g, '')
    .slice(0, 14)}`;
  DataHelper.updateServiceData(service, 'projectName', projectName);

  await logStep('Step 01: Login to admin portal as a super admin');
  await app.adminProjectPage.login(environment.adminPortalUrl, data.adminUsername, data.adminPassword);

  await logStep('Step 02: Navigate to add new project');
  await app.adminProjectPage.clickInternalInventory();
  await app.adminProjectPage.clickProjectsLink();
  await app.adminProjectPage.clickAddNewProjectButton();

  await logStep('Step 03: Enter project details and save');
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
  await app.adminProjectPage.fillProjectAgreementDate('2026-01-01');
  await app.adminProjectPage.fillProjectLicenseNumber('665334');
  await app.adminProjectPage.fillProjectLicenseDate(DateUtils.getDateWithOffsetAndFormat(600, 'YYYY-MM-DD'));
  await app.adminProjectPage.fillEscrowAccountName('Sakani Test User');
  await app.adminProjectPage.fillEscrowAccountNumber('SA1111111111111111111111');
  await app.adminProjectPage.selectBank('بنك الأهلي السعودي');
  await app.adminProjectPage.fillDeductionPercentage('2');
  await app.adminProjectPage.fillDeedIssueCityArabic('الرياض');
  await app.adminProjectPage.fillDeedIssueCityEnglish('Riyadh');
  await app.adminProjectPage.fillDeedDate('01/01/2026');
  await app.adminProjectPage.clickSaveButton();
  await app.adminProjectPage.validateProjectSavedToastMessage();

  await logStep('Step 04: Link the project to AZM');
  await app.adminProjectPage.linkProjectToAzm();

  await logStep('Step 05: Select participating banks');
  await app.adminProjectPage.expectFinancingEntitiesVisible();
  await app.adminProjectPage.clickFinancingEntities();
  await app.adminProjectPage.expectSelectAllRowsVisible();
  await app.adminProjectPage.expectFinancingEntitiesRowsLoaded();
  await app.adminProjectPage.selectAllFinancingEntities();
  await app.adminProjectPage.clickSaveButton();

  await logStep('Step 06: Import and commit project units');
  await app.adminProjectPage.clickUnitsTab();
  await app.adminProjectPage.expectImportNewUnitButtonVisible();
  await app.adminProjectPage.clickImportNewUnitButton();
  await app.adminProjectPage.expectResidentialUnitTypeVisible();
  // The dropdown can be clicked before it is ready and not open, so retry until the option is displayed
  await expect(async () => {
    await app.adminProjectPage.openResidentialUnitTypeDropdown();
    await expect(page.getByRole('option', { name: 'شقة' })).toBeVisible({ timeout: 5000 });
  }).toPass({ timeout: 60000 });
  await app.adminProjectPage.selectApartmentUnitType();
  const unitsFileName = isCompany ? 'OffPlanCompany.xlsx' : 'Offplan_MOH.xlsx';
  const unitsImportFilePath = path.join(process.cwd(), 'src', 'data', unitsFileName);
  await app.adminProjectPage.uploadUnitsFile(unitsImportFilePath);
  await app.adminProjectPage.clickImportSaveButton();
  await app.adminProjectPage.waitForUnitImportCompletion();
  await app.adminProjectPage.expectUnitImportDone();
  await app.adminProjectPage.clickApproveButton();
  await app.adminProjectPage.clickConfirmButton();
  await app.adminProjectPage.waitForImportConfirmation();
  await app.adminProjectPage.clickBackButton();

  await logStep('Step 07: Upload project media and enter media details');
  // رجوع can be clicked before the import page is ready and stay on it, so click it again until the media tab is displayed
  await expect(async () => {
    if (await page.getByRole('button', { name: 'رجوع' }).isVisible()) {
      await app.adminProjectPage.clickBackButton();
    }
    await app.adminProjectPage.clickProjectMediaTab();
  }).toPass({ timeout: 120000 });
  const bannerImagePath = path.join(process.cwd(), 'src', 'data', 'Sample image.jpg');
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

  await logStep('Step 08: Approve project media');
  // The request approval button is displayed only after reloading the page and saving the media again
  await page.waitForTimeout(3000);
  await page.reload();
  await app.adminProjectPage.clickProjectMediaTab();
  await app.adminProjectPage.clickMediaSaveButton();
  await page.waitForTimeout(3000);
  await app.adminProjectPage.clickProjectDetailsTab();
  await app.adminProjectPage.clickRequestMediaApprovalButton();
  await app.adminProjectPage.clickAcceptUploadedMediaButton();
  await app.adminProjectPage.clickKeepProjectUnpublishedButton();
  await app.adminProjectPage.clickSaveButton();
  await app.adminProjectPage.validateProjectSavedToastMessage();

  await logStep('Step 09: Publish the unit model');
  await app.adminProjectPage.clickUnitModelsSection();
  await app.adminProjectPage.clickUnitModelCell();
  await app.adminProjectPage.clickSaveButton();
  await app.adminProjectPage.clickMediaDraftSection();
  await app.adminProjectPage.clickSaveButton();
  await app.adminProjectPage.clickRequestMediaApprovalButton();
  await app.adminProjectPage.clickAcceptUploadedMediaButton();
  await app.adminProjectPage.clickPublishUnitButton();
  await app.adminProjectPage.clickUnitModelLink();

  await logStep('Step 10: Set project availability');
  await app.adminProjectPage.clickProjectDetailsText();
  await app.adminProjectPage.selectProjectStatus('متاح');
  await app.adminProjectPage.selectAvailableProjectStatus();
  await app.adminProjectPage.clickSaveButton();

  await logStep('Step 11: Publish the project and validate the toast message');
  await app.adminProjectPage.enableAvailableForBookingToggle();
  await app.adminProjectPage.publishProject();
  await app.adminProjectPage.clickSaveButton();
  await app.adminProjectPage.validateProjectSavedToastMessage();

  if (isCompany) {
    return projectName;
  }

  await logStep('Step 12: Activate multiple units booking for non-beneficiary > Verify setting is saved');
  await page.keyboard.press('PageDown');
  await waitAndClick(page.locator("//span[contains(text(), 'إعدادات المشاريع')]"));
  await app.adminProjectPage.enableMultipleBooking();
  await waitAndFill(page.locator("input[formcontrolname='maximum_booking_per_non_beneficiary']"), '5');
  await page.keyboard.press('PageDown');
  await app.adminProjectPage.clickSaveButton();
  await app.adminProjectPage.validateProjectSavedToastMessage();
  expect(await page.locator("input[formcontrolname='maximum_booking_per_non_beneficiary']").inputValue()).toEqual('5');

  return projectName;
}
