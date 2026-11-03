// TEMP: creates a new company project, then the developer opens the companies sales contract and pauses before the OTP for recording, delete after use
import { test } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { DataHelper } from '@helpers/DataHelper';
import { addOffplanProjectForCompanies } from '@helpers/AddCompanyOffplanProject';

const SERVICE = 'offPlan-basket-multiple-booking';

test('TEMP Developer stops before the sales contract OTP', async ({ page, browser }) => {
  test.setTimeout(0);

  // New company project in a separate browser, so the admin login doesn't affect the partners login
  const adminContext = await browser.newContext();
  await addOffplanProjectForCompanies(await adminContext.newPage(), SERVICE, 'Doctor test');
  await adminContext.close();

  const data = DataHelper.readData().services[SERVICE];
  const environments = DataHelper.readData().environments;
  const app = new WebApp(page);

  await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
  await app.developerProjectPage.loginDeveloper(data.developerUserId);
  await app.developerProjectPage.switchRoleToDeveloper();
  await app.developerProjectPage.openProjectBySearch(data.projectName);
  await app.developerProjectPage.openSalesContractsTab();
  await app.developerProjectPage.clickOnCompanies();
  await app.developerProjectPage.viewAndApproveSalesContract();
  await app.developerProjectPage.approveUnitSpecification();
  await page.pause();
});
