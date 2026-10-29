'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const test_1 = require('@playwright/test');
const web_app_1 = require('@base-class/web-app');
const DataHelper_1 = require('@helpers/DataHelper');
const LogSteps_1 = require('@helpers/LogSteps');
const SERVICE = 'sales-channels-target-audience-unit-issuance';
const DEFAULT_TIMEOUT = 30_000;
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
const unitCheckbox = (page, row) => page.locator(`//datatable-row-wrapper[${row}]/datatable-body-row/div[3]/datatable-body-cell/div/div/app-sapa-checkbox-v2/div/div/input/..`);
async function waitAndClick(locator, timeout = DEFAULT_TIMEOUT) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.click();
}
test_1.test.describe('Functionality of sales Channels, target Audience and tnit issuance ', () => {
  (0, test_1.test)(
    'TC-01 Verify the developer is able filter the units based on sales channel and target audience',
    {
      annotation: [
        {
          product: 'Marketplace',
          type: 'non-critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const developerUserId = data.developerUserId;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
      await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
      await app.developerProjectPage.loginDeveloper(developerUserId);
      await app.developerProjectPage.switchRoleToDeveloper();
      await (0, LogSteps_1.logStep)('Step 02: Open projects > Open the first project > Unit details > Advanced search');
      await app.developerProjectPage.openProjectsPage();
      await app.developerProjectPage.openTheFirstExistingProject();
      await app.salesChannelTargetAudiencePage.clickOnUnitDetails();
      await app.salesChannelTargetAudiencePage.clickOnAdvancedSearch();
      await (0, LogSteps_1.logStep)('Step 03: Select all sales channels');
      await app.salesChannelTargetAudiencePage.selectMobileSalesChannel();
      await app.salesChannelTargetAudiencePage.selectOpsTeamSalesChannel();
      await app.salesChannelTargetAudiencePage.selectPartnerSalesChannel();
      await app.salesChannelTargetAudiencePage.selectThirdPartySalesChannel();
      await app.salesChannelTargetAudiencePage.selectWebSalesChannel();
      await (0, LogSteps_1.logStep)('Step 04: Select all target audiences');
      await app.salesChannelTargetAudiencePage.selectBeneficiaryTargetAudience();
      await app.salesChannelTargetAudiencePage.selectCharityTargetAudience();
      await app.salesChannelTargetAudiencePage.selectCompanyTargetAudience();
      await app.salesChannelTargetAudiencePage.selectNonBeneficiaryTargetAudience();
      await app.salesChannelTargetAudiencePage.selectTanmwiTargetAudience();
      await (0, LogSteps_1.logStep)('Step 05: Search > Verify the search results table is visible');
      await app.salesChannelTargetAudiencePage.clickOnSearch();
      (0, test_1.expect)(await app.salesChannelTargetAudiencePage.isSearchResultsTableVisible()).toBe(true);
    }
  );
  (0, test_1.test)(
    "TC-02 Verify the developer can't book a unit which does not have partners as a sales channel",
    {
      annotation: [
        {
          product: 'Marketplace',
          type: 'non-critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const developerUserId = data.developerUserId;
      const unitWithoutSalesChannels = data.unitWithoutSalesChannels;
      const userId = data.userId;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
      await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
      await app.developerProjectPage.loginDeveloper(developerUserId);
      await app.developerProjectPage.switchRoleToDeveloper();
      await (0, LogSteps_1.logStep)('Step 02: Open projects > Open the first project > Unit details');
      await app.developerProjectPage.openProjectsPage();
      await app.developerProjectPage.openTheFirstExistingProject();
      await app.salesChannelTargetAudiencePage.clickOnUnitDetails();
      await (0, LogSteps_1.logStep)('Step 03: Search by the unit code without partners sales channel > Verify no results are shown');
      await app.salesChannelTargetAudiencePage.selectSearchUsingUnitCode();
      await app.salesChannelTargetAudiencePage.fillUnitCode(unitWithoutSalesChannels);
      await app.salesChannelTargetAudiencePage.clickOnSearch();
      (0, test_1.expect)(await app.salesChannelTargetAudiencePage.isSearchResultEmpty()).toBe(true);
      await (0, LogSteps_1.logStep)('Step 04: Start new booking for the customer using the unit code > Select the unit');
      await app.developerProjectPage.bookUnitsForCustomersUsingUnitCode(userId, unitWithoutSalesChannels);
      await waitAndClick(unitCheckbox(page, 1));
      await (0, LogSteps_1.logStep)('Step 05: Click next > Verify the unit is not available for booking');
      await app.developerProjectPage.clickOnNextButton();
      (0, test_1.expect)(await app.salesChannelTargetAudiencePage.isBookingNotAvailable()).toBe(true);
    }
  );
});
