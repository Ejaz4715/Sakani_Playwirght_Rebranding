import { Page } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { DataHelper } from '@helpers/DataHelper';
import { logStep } from '@helpers/LogSteps';

/**
 * Admin enables comprehensive booking and payment collection automation on the project saved in the given service's data.
 * Multiple units booking is already enabled while adding the project (addOffplanProjectForMultipleBooking).
 */
export async function adminEnablesProjectSettings(page: Page, service: string) {
  const data = DataHelper.readData().services[service];
  const environments = DataHelper.readData().environments;
  const app = new WebApp(page);

  await logStep('Step 01: Login to admin portal as a super admin');
  await app.adminProjectPage.login(environments.adminPortalUrl, data.adminUsername, data.adminPassword);

  await logStep('Step 02: Navigate to projects > Search and open the project');
  await app.adminProjectPage.openProjects();
  await app.resaleOfUnitsPage.fillProjectName(data.projectName);
  await app.resaleOfUnitsPage.clickProjectSearchButton();
  await app.resaleOfUnitsPage.clickSearchedProjectResult(data.projectName);
  // Wait for the project page to open, otherwise إعدادات المشاريع is clicked on the projects list page
  await page.waitForTimeout(10000);

  await logStep('Step 03: Project settings > Enable comprehensive booking and payment collection automation > Save');
  await app.paymentTrackingPage.clickOnProjectSettings();
  await app.paymentTrackingPage.clickOnUseGeneralSettingSwitch();
  await app.paymentTrackingPage.clickOnPaymentCollectionAutomationSwitch();
  await app.paymentTrackingPage.clickOnSaveButton();
  await app.paymentTrackingPage.verifySaveSuccessToast();
}
