import { expect, test } from '@fixtures/pages.fixture';
import { logStep } from '@helpers/LogSteps';
import { DataHelper } from '@helpers/DataHelper';
import { WebApp } from '@base-class/web-app';

const SERVICE = 'sakani-offers';

const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;

test.describe('Sakani Offers', () => {
  test(
    'TC-01 Verify Sorting Sakani Offers',
    {
      annotation: [
        {
          product: 'Real Estate Data',
          type: 'non-critical',
        } as any,
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new WebApp(page);
      const userPortalUrl = environments.preBeta.userPortalUrl;

      await logStep('Step 01: Navigate to user portal > Login');
      await app.loginPage.gotoHomePage(userPortalUrl);
      await app.loginPage.openPreBetaLogin();
      await app.loginPage.preBetaLoginWithNafath(data.sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continuePreBetaNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();

      await logStep('Step 02: Open Sakani Offers');
      await app.offersPage.openSakaniOffers();

      await logStep('Step 03: Sort the offers by every sort option > the option is selected');
      for (const sortOption of data.sortOptions) {
        await app.offersPage.sortOffersBy(sortOption);
        expect(await app.offersPage.isSortOptionSelected(sortOption), `"${sortOption}" should be selected`).toBe(true);
      }
    }
  );

  test(
    'TC-02 Verify Filtering Sakani Offers',
    {
      annotation: [
        {
          product: 'Real Estate Data',
          type: 'non-critical',
        } as any,
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new WebApp(page);
      const userPortalUrl = environments.preBeta.userPortalUrl;

      await logStep('Step 01: Navigate to user portal > Login');
      await app.loginPage.gotoHomePage(userPortalUrl);
      await app.loginPage.openPreBetaLogin();
      await app.loginPage.preBetaLoginWithNafath(data.sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continuePreBetaNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();

      await logStep('Step 02: Open Sakani Offers');
      await app.offersPage.openSakaniOffers();

      await logStep('Step 03: Open the filters > select all the filter options');
      await app.offersPage.openFilters();
      await app.offersPage.selectFilterOptions(data.filterOptions);

      await logStep('Step 04: All the filter options are selected');
      for (const filterOption of data.filterOptions) {
        expect(await app.offersPage.isFilterOptionSelected(filterOption), `"${filterOption}" should be selected`).toBe(true);
      }

      await logStep('Step 05: Click search > the filters are applied');
      await app.offersPage.searchWithFilters();
      expect(await app.offersPage.getFilterResultsButtonText()).toMatch(/تصفية النتائج \(\d+\)/);
    }
  );

  test(
    'TC-03 Verify Clearing Sakani Offers Filters',
    {
      annotation: [
        {
          product: 'Real Estate Data',
          type: 'non-critical',
        } as any,
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new WebApp(page);
      const userPortalUrl = environments.preBeta.userPortalUrl;

      await logStep('Step 01: Navigate to user portal > Login');
      await app.loginPage.gotoHomePage(userPortalUrl);
      await app.loginPage.openPreBetaLogin();
      await app.loginPage.preBetaLoginWithNafath(data.sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continuePreBetaNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();

      await logStep('Step 02: Open Sakani Offers');
      await app.offersPage.openSakaniOffers();

      await logStep('Step 03: Apply all the filter options');
      await app.offersPage.openFilters();
      await app.offersPage.selectFilterOptions(data.filterOptions);
      await app.offersPage.searchWithFilters();
      expect(await app.offersPage.getFilterResultsButtonText()).toMatch(/تصفية النتائج \(\d+\)/);

      await logStep('Step 04: Open the filters > click clear > click search');
      await app.offersPage.openFilters();
      await app.offersPage.clearFilters();
      await app.offersPage.searchWithFilters();

      await logStep('Step 05: No filters are applied anymore');
      expect(await app.offersPage.getFilterResultsButtonText()).toBe('تصفية النتائج');

      await logStep('Step 06: All the filter options are not selected');
      await app.offersPage.openFilters();
      for (const filterOption of data.filterOptions) {
        expect(await app.offersPage.isFilterOptionSelected(filterOption), `"${filterOption}" should not be selected`).toBe(false);
      }
    }
  );
});
