import { Page } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { DataHelper } from '@helpers/DataHelper';
import { logStep } from '@helpers/LogSteps';

const unitCheckbox = (page: Page, row: number) => page.locator(`//datatable-row-wrapper[${row}]/datatable-body-row/div[3]/datatable-body-cell/div/div/app-sapa-checkbox-v2/div/div/input/..`);

/**
 * Developer books units for the customer (sakaniUserId by default) on the project saved in the given service's data.
 * unitsCount = 1 for a single booking, 2 for a unit basket.
 */
export async function developerBooksUnits(page: Page, service: string, unitsCount = 2, customerId?: string) {
  const data = DataHelper.readData().services[service];
  const customerNationalId = customerId ?? data.sakaniUserId;
  const environments = DataHelper.readData().environments;
  const app = new WebApp(page);

  await logStep('Step 01: Navigate to partners portal > Login as developer');
  await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
  await app.developerProjectPage.loginDeveloper(data.developerUserId);
  await app.developerProjectPage.switchRoleToDeveloper();

  await logStep('Step 02: Start new booking > Search customer by ID > Select the project');
  await app.developerProjectPage.bookUnitsForCustomers(customerNationalId, data.projectName);
  await page.waitForTimeout(10000);

  await logStep(`Step 03: Select ${unitsCount} unit(s)`);
  for (let row = 1; row <= unitsCount; row++) {
    const checkbox = unitCheckbox(page, row);
    await checkbox.waitFor({ state: 'visible', timeout: 30_000 });
    await checkbox.click();
  }

  await logStep('Step 04: Financial details > Select the bank (single unit only) > Confirm the booking > Verify booking list is visible');
  await app.developerProjectPage.clickOnNextButton();
  if (await app.developerProjectPage.isBankStepDisplayed()) {
    await app.developerProjectPage.clickOnBankDropdown();
    await app.developerProjectPage.selectCRMBank();
    await app.developerProjectPage.clickOnNextButton();
  }
  await app.developerProjectPage.clickOnConfirmationButton();

  await app.developerProjectPage.verifyBookingCreated();
}
