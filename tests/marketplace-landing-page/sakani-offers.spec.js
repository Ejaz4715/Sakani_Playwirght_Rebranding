'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const LogSteps_1 = require('@helpers/LogSteps');
const DataHelper_1 = require('@helpers/DataHelper');
const web_app_1 = require('@base-class/web-app');
const SERVICE = 'sakani-offers';
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
pages_fixture_1.test.describe('Sakani Offers', () => {
  (0, pages_fixture_1.test)(
    'TC-01 Verify Sorting Sakani Offers',
    {
      annotation: [
        {
          product: 'Real Estate Data',
          type: 'non-critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const userPortalUrl = environments.preBeta.userPortalUrl;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to user portal > Login');
      await app.loginPage.gotoHomePage(userPortalUrl);
      await app.loginPage.openPreBetaLogin();
      await app.loginPage.preBetaLoginWithNafath(data.sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continuePreBetaNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();
      await (0, LogSteps_1.logStep)('Step 02: Open Sakani Offers');
      await app.offersPage.openSakaniOffers();
      await (0, LogSteps_1.logStep)('Step 03: Sort the offers by every sort option > the option is selected');
      for (const sortOption of data.sortOptions) {
        await app.offersPage.sortOffersBy(sortOption);
        (0, pages_fixture_1.expect)(await app.offersPage.isSortOptionSelected(sortOption), `"${sortOption}" should be selected`).toBe(true);
      }
    }
  );
  (0, pages_fixture_1.test)(
    'TC-02 Verify Filtering Sakani Offers',
    {
      annotation: [
        {
          product: 'Real Estate Data',
          type: 'non-critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const userPortalUrl = environments.preBeta.userPortalUrl;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to user portal > Login');
      await app.loginPage.gotoHomePage(userPortalUrl);
      await app.loginPage.openPreBetaLogin();
      await app.loginPage.preBetaLoginWithNafath(data.sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continuePreBetaNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();
      await (0, LogSteps_1.logStep)('Step 02: Open Sakani Offers');
      await app.offersPage.openSakaniOffers();
      await (0, LogSteps_1.logStep)('Step 03: Open the filters > select all the filter options');
      await app.offersPage.openFilters();
      await app.offersPage.selectFilterOptions(data.filterOptions);
      await (0, LogSteps_1.logStep)('Step 04: All the filter options are selected');
      for (const filterOption of data.filterOptions) {
        (0, pages_fixture_1.expect)(await app.offersPage.isFilterOptionSelected(filterOption), `"${filterOption}" should be selected`).toBe(true);
      }
      await (0, LogSteps_1.logStep)('Step 05: Click search > the filters are applied');
      await app.offersPage.searchWithFilters();
      (0, pages_fixture_1.expect)(await app.offersPage.getFilterResultsButtonText()).toMatch(/تصفية النتائج \(\d+\)/);
    }
  );
  (0, pages_fixture_1.test)(
    'TC-03 Verify Clearing Sakani Offers Filters',
    {
      annotation: [
        {
          product: 'Real Estate Data',
          type: 'non-critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const userPortalUrl = environments.preBeta.userPortalUrl;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to user portal > Login');
      await app.loginPage.gotoHomePage(userPortalUrl);
      await app.loginPage.openPreBetaLogin();
      await app.loginPage.preBetaLoginWithNafath(data.sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continuePreBetaNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();
      await (0, LogSteps_1.logStep)('Step 02: Open Sakani Offers');
      await app.offersPage.openSakaniOffers();
      await (0, LogSteps_1.logStep)('Step 03: Apply all the filter options');
      await app.offersPage.openFilters();
      await app.offersPage.selectFilterOptions(data.filterOptions);
      await app.offersPage.searchWithFilters();
      (0, pages_fixture_1.expect)(await app.offersPage.getFilterResultsButtonText()).toMatch(/تصفية النتائج \(\d+\)/);
      await (0, LogSteps_1.logStep)('Step 04: Open the filters > click clear > click search');
      await app.offersPage.openFilters();
      await app.offersPage.clearFilters();
      await app.offersPage.searchWithFilters();
      await (0, LogSteps_1.logStep)('Step 05: No filters are applied anymore');
      (0, pages_fixture_1.expect)(await app.offersPage.getFilterResultsButtonText()).toBe('تصفية النتائج');
      await (0, LogSteps_1.logStep)('Step 06: All the filter options are not selected');
      await app.offersPage.openFilters();
      for (const filterOption of data.filterOptions) {
        (0, pages_fixture_1.expect)(await app.offersPage.isFilterOptionSelected(filterOption), `"${filterOption}" should not be selected`).toBe(false);
      }
    }
  );
});
