'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const LogSteps_1 = require('@helpers/LogSteps');
const DataHelper_1 = require('@helpers/DataHelper');
const web_app_1 = require('@base-class/web-app');
const SERVICE = 'search-engine';
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
pages_fixture_1.test.describe('Search Engine', () => {
  (0, pages_fixture_1.test)(
    'Verify the user searching any valid data in smart search field produces a result',
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
      const userPortalUrl = environments.userPortalUrl;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to user portal > Login');
      await app.loginPage.gotoHomePage(userPortalUrl);
      //await app.loginPage.acceptCookies();
      await app.loginPage.openLogin();
      await app.loginPage.loginWithNafath(data.sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continueNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();
      await (0, LogSteps_1.logStep)('Step 02: Search for a valid text > check the search results are available');
      await app.marketplaceLandingPage.searchFor('Riydah');
      (0, pages_fixture_1.expect)(await app.marketplaceLandingPage.isSearchResultsCardVisible()).toBe(true);
    }
  );
  (0, pages_fixture_1.test)(
    'TC-02 Verify that no result appears if user enter only 2 character',
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
      const userPortalUrl = environments.userPortalUrl;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to user portal > Login');
      await app.loginPage.gotoHomePage(userPortalUrl);
      //await app.loginPage.acceptCookies();
      await app.loginPage.openLogin();
      await app.loginPage.loginWithNafath(data.sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continueNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();
      await (0, LogSteps_1.logStep)('Step 02: Search for an invalid text > check the search results are not available');
      await app.marketplaceLandingPage.searchFor('rr');
      (0, pages_fixture_1.expect)(await app.marketplaceLandingPage.getSearchResultsCardText()).toContain('لم يتم العثور على نتائج لبحثك. يرجى تعديل بحثك أو استكشاف عقارات قريبة.');
    }
  );
});
