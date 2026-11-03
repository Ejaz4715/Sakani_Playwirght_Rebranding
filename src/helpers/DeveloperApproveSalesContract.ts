import { Page } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { DataHelper } from '@helpers/DataHelper';
import { logStep } from '@helpers/LogSteps';

/**
 * Developer approves the sales contract of the project saved in the given service's data.
 */
export async function developerApprovesSalesContract(page: Page, service: string) {
  const data = DataHelper.readData().services[service];
  const environments = DataHelper.readData().environments;
  const app = new WebApp(page);
  const projectName = data.projectName;
  const developerUserId = data.developerUserId;

  await logStep('Step 01: Navigate to partners portal > Login as developer');
  await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
  await app.developerProjectPage.loginDeveloper(developerUserId);
  await app.developerProjectPage.switchRoleToDeveloper();

  await logStep('Step 02: Search for the project > Open it');
  await app.developerProjectPage.openProjectBySearch(projectName);

  await logStep('Step 03: Approve the sales contract > Verify approval success message');
  await app.developerProjectPage.openSalesContractsTab();
  await app.developerProjectPage.viewAndApproveSalesContract();
  await app.developerProjectPage.approveUnitSpecification();
  await app.developerProjectPage.fillOtp('1234');
  await app.developerProjectPage.verifyOtp();
  await app.developerProjectPage.verifyApprovalSuccessMessage();
}
