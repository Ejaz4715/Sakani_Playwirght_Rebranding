'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const LogSteps_1 = require('@helpers/LogSteps');
const web_app_1 = require('@base-class/web-app');
const DataHelper_1 = require('@helpers/DataHelper');
const SERVICE = 'news-housing-products-support';
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
pages_fixture_1.test.describe('News, Housing Support Products and Housing Support List ', () => {
  (0, pages_fixture_1.test)(
    'TC-01 Verify navigating to news in Sakani',
    {
      annotation: [
        {
          product: 'Marketplace',
          type: 'Non-Critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const sakaniUserId = data.sakaniUserId;
      const userPortalUrl = environments.userPortalUrl;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to user portal > Login');
      await app.loginPage.gotoHomePage(userPortalUrl);
      //await app.loginPage.acceptCookies();
      await app.loginPage.openLogin();
      await app.loginPage.loginWithNafath(sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continueNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();
      await app.marketplaceLandingPage.clickOnNews();
      await (0, pages_fixture_1.expect)(page).toHaveURL(/news$/);
    }
  );
  (0, pages_fixture_1.test)(
    'TC-02 Verify navigating to Housing support products in Sakani',
    {
      annotation: [
        {
          product: 'Marketplace',
          type: 'Non-Critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const sakaniUserId = data.sakaniUserId;
      const userPortalUrl = environments.userPortalUrl;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to user portal > Login');
      await app.loginPage.gotoHomePage(userPortalUrl);
      //await app.loginPage.acceptCookies();
      await app.loginPage.openLogin();
      await app.loginPage.loginWithNafath(sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continueNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();
      await app.marketplaceLandingPage.clickOnServices();
      await app.marketplaceLandingPage.clickOnEligibilityCheckerLink();
      await (0, pages_fixture_1.expect)(page).toHaveURL(/check-eligibility$/);
      await app.marketplaceLandingPage.clickOnServices();
      await app.marketplaceLandingPage.clickOnRealStateTaxExemptionLink();
      await (0, pages_fixture_1.expect)(page).toHaveURL(/real-estate-tax-incurred-service$/);
      await app.marketplaceLandingPage.clickOnServices();
      await app.marketplaceLandingPage.clickOnFinancialAdvisoryLink();
      await (0, pages_fixture_1.expect)(page).toHaveURL(/financial-advisory$/);
    }
  );
  (0, pages_fixture_1.test)(
    'TC-03 Verify navigating to all services and products in Sakani',
    {
      annotation: [
        {
          product: 'Marketplace',
          type: 'Non-Critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const sakaniUserId = data.sakaniUserId;
      const userPortalUrl = environments.userPortalUrl;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to user portal > Login');
      await app.loginPage.gotoHomePage(userPortalUrl);
      //await app.loginPage.acceptCookies();
      await app.loginPage.openLogin();
      await app.loginPage.loginWithNafath(sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continueNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();
      await app.marketplaceLandingPage.clickOnServices();
      await app.marketplaceLandingPage.clickOnAllServices();
      await app.marketplaceLandingPage.clickOnOffPlanProjectsProductLink();
      await (0, pages_fixture_1.expect)(page).toHaveURL(/off-plan-projects$/);
      (0, pages_fixture_1.expect)(await app.marketplaceLandingPage.isOffPlanProductPageVisible()).toBe(true);
      await app.marketplaceLandingPage.clickOnServices();
      await app.marketplaceLandingPage.clickOnAllServices();
      await app.marketplaceLandingPage.clickOnReadyUnitsProductLink();
      await (0, pages_fixture_1.expect)(page).toHaveURL(/ready-units$/);
      (0, pages_fixture_1.expect)(await app.marketplaceLandingPage.isReadyUnitsProductPageVisible()).toBe(true);
      await app.marketplaceLandingPage.clickOnServices();
      await app.marketplaceLandingPage.clickOnAllServices();
      await app.marketplaceLandingPage.clickOnLandsProductLink();
      await (0, pages_fixture_1.expect)(page).toHaveURL(/lands$/);
      (0, pages_fixture_1.expect)(await app.marketplaceLandingPage.isLandsProductPageVisible()).toBe(true);
    }
  );
  (0, pages_fixture_1.test)(
    'TC-04 Verify navigating to housing support list in Sakani',
    {
      annotation: [
        {
          product: 'Marketplace',
          type: 'Non-Critical',
        },
      ],
    },
    async ({ page, context }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const sakaniUserId = data.sakaniUserId;
      const userPortalUrl = environments.userPortalUrl;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to user portal > Login');
      await app.loginPage.gotoHomePage(userPortalUrl);
      //await app.loginPage.acceptCookies();
      await app.loginPage.openLogin();
      await app.loginPage.loginWithNafath(sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continueNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();
      await app.marketplaceLandingPage.clickOnTermsAndConditionsLink();
      await (0, pages_fixture_1.expect)(page).toHaveURL(/terms$/);
      await app.marketplaceLandingPage.clickOnSupportAndHelpLink();
      await (0, pages_fixture_1.expect)(context.pages()[1]).toHaveURL(/support-and-help$/);
      await app.marketplaceLandingPage.clickOnSupportAndHelpFAQLink();
      await (0, pages_fixture_1.expect)(context.pages()[2]).toHaveURL(/support-and-help\/faqs$/);
      await app.marketplaceLandingPage.clickOnExecutiveRegulationLink();
      await (0, pages_fixture_1.expect)(context.pages()[3]).toHaveURL(/housing-subsidy-policy$/);
    }
  );
});
