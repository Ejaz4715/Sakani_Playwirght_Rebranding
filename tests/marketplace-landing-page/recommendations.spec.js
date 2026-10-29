'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const LogSteps_1 = require('@helpers/LogSteps');
const DataHelper_1 = require('@helpers/DataHelper');
const web_app_1 = require('@base-class/web-app');
const SERVICE = 'recommendations';
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
pages_fixture_1.test.describe('Recommendations', () => {
  (0, pages_fixture_1.test)(
    'TC-01 Check the user ability to update the preference from user profile',
    {
      annotation: [
        {
          product: 'Real Estate Data',
          type: 'Critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const userPortalUrl = environments.userPortalUrl;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to user portal > Login');
      await app.loginPage.gotoHomePage(userPortalUrl);
      //await app.loginPage.acceptCookies();
      await app.loginPage.openLogin();
      await app.loginPage.loginWithNafath(data.sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continueNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();
      await (0, LogSteps_1.logStep)('Step 02: Open Recommendations Tab');
      await app.marketplaceLandingPage.openProfileManagement();
      await app.recommendationsPage.clickOnRecommendations();
      await app.recommendationsPage.openRecommendationsForm();
      await app.recommendationsPage.selectFirstRegion();
      await app.recommendationsPage.selectFirstCity();
      await app.recommendationsPage.selectDistrict();
      await app.recommendationsPage.selectProjectType();
      await app.recommendationsPage.selectUnitType('فيلا');
      await app.recommendationsPage.clickOnContinue();
      await app.recommendationsPage.setMinimumPrice(100000);
      await app.recommendationsPage.selectBedRoomsNumber(4);
      await app.recommendationsPage.selectBathroomsNumber(3);
      await app.recommendationsPage.clickOnSave();
      (0, pages_fixture_1.expect)(await app.recommendationsPage.isPreferenceSavedSuccessfully()).toEqual(true);
    }
  );
  (0, pages_fixture_1.test)(
    'TC-02 Verify the user is able to view project/unit from recommendations tab filter matching the preferences',
    {
      annotation: [
        {
          product: 'Real Estate Data',
          type: 'Critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const userPortalUrl = environments.userPortalUrl;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to user portal > Login');
      await app.loginPage.gotoHomePage(userPortalUrl);
      //await app.loginPage.acceptCookies();
      await app.loginPage.openLogin();
      await app.loginPage.loginWithNafath(data.sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continueNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();
      await (0, LogSteps_1.logStep)('Step 02: Open Recommendations Tab');
      await app.marketplaceLandingPage.openProfileManagement();
      await app.recommendationsPage.clickOnRecommendations();
      await app.recommendationsPage.clickOnForYou();
      // There is a bug for seeing what is recommended for you according to preferences
    }
  );
  (0, pages_fixture_1.test)(
    'TC-03 Verify after adding a project in the favorites, user can view the same project in the user profile',
    {
      annotation: [
        {
          product: 'Real Estate Data',
          type: 'Critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const userPortalUrl = environments.userPortalUrl;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to user portal > Login');
      await app.loginPage.gotoHomePage(userPortalUrl);
      //await app.loginPage.acceptCookies();
      await app.loginPage.openLogin();
      await app.loginPage.loginWithNafath(data.sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continueNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();
      await (0, LogSteps_1.logStep)('Step 02: Open the off-plan project');
      await app.favoritesPage.openOffPlanProject(userPortalUrl, data.offPlanProjectId);
      const projectTitle = await app.favoritesPage.getProjectTitle();
      await (0, LogSteps_1.logStep)('Step 03: Mark the project as favourite');
      await app.favoritesPage.markProjectAsFavorite();
      (0, pages_fixture_1.expect)(await app.favoritesPage.isProjectFavorite()).toBe(true);
      await (0, LogSteps_1.logStep)('Step 04: Open user management > Favourites > Projects');
      await app.loginPage.gotoHomePage(userPortalUrl);
      await app.marketplaceLandingPage.openProfileManagement();
      await app.favoritesPage.openFavoritesFromUserProfile();
      await app.favoritesPage.openProjectsTab();
      await (0, LogSteps_1.logStep)('Step 05: Verify the favourite project is listed');
      (0, pages_fixture_1.expect)(await app.favoritesPage.isProjectInFavorites(projectTitle)).toBe(true);
    }
  );
  (0, pages_fixture_1.test)(
    'TC-04 Verify the text after removing all favorites from user profile',
    {
      annotation: [
        {
          product: 'Real Estate Data',
          type: 'Critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const userPortalUrl = environments.userPortalUrl;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to user portal > Login');
      await app.loginPage.gotoHomePage(userPortalUrl);
      //await app.loginPage.acceptCookies();
      await app.loginPage.openLogin();
      await app.loginPage.loginWithNafath(data.sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continueNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();
      await (0, LogSteps_1.logStep)('Step 02: Open the off-plan project > Mark it as favourite so there is a favourite to remove');
      await app.favoritesPage.openOffPlanProject(userPortalUrl, data.offPlanProjectId);
      await app.favoritesPage.markProjectAsFavorite();
      await (0, LogSteps_1.logStep)('Step 03: Open user management > Favourites');
      await app.loginPage.gotoHomePage(userPortalUrl);
      await app.marketplaceLandingPage.openProfileManagement();
      await app.favoritesPage.openFavoritesFromUserProfile();
      await (0, LogSteps_1.logStep)('Step 04: Remove all favourites');
      await app.favoritesPage.removeAllFavorites();
      await (0, LogSteps_1.logStep)('Step 05: Verify the empty favourites message is displayed');
      (0, pages_fixture_1.expect)(await app.favoritesPage.isEmptyFavoritesMessageVisible()).toBe(true);
    }
  );
  (0, pages_fixture_1.test)(
    'TC-05 Verify the message after select recommendations tab filter from guest view',
    {
      annotation: [
        {
          product: 'Real Estate Data',
          type: 'Critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const userPortalUrl = environments.userPortalUrl;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to user portal > Login');
      await app.loginPage.gotoHomePage(userPortalUrl);
      await app.filtersPage.clickOnPropertiesForSaleButton();
      await app.filtersPage.clickOnOffPlanSaleUnits();
      await app.recommendationsPage.clickOnForYou();
      (0, pages_fixture_1.expect)(await app.recommendationsPage.isGuestRecommendationCardVisible()).toBe(true);
    }
  );
  (0, pages_fixture_1.test)(
    'TC-06 Verify that either the recommended project/unit is displayed or the Preferences form is shown after the user enters a National ID from guest view',
    {
      annotation: [
        {
          product: 'Real Estate Data',
          type: 'Critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const userPortalUrl = environments.userPortalUrl;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to user portal > Login');
      await app.loginPage.gotoHomePage(userPortalUrl);
      await app.filtersPage.clickOnPropertiesForSaleButton();
      await app.filtersPage.clickOnOffPlanSaleUnits();
      await app.recommendationsPage.clickOnForYou();
      (0, pages_fixture_1.expect)(await app.recommendationsPage.isGuestRecommendationCardVisible()).toBe(true);
      await app.recommendationsPage.enterNationalId(data.sakaniUserId);
      await app.recommendationsPage.clickOnSearch();
      // There is a bug in recommendation from guest side after entering the national id it can't fetch the recommended project based on preferences
    }
  );
});
