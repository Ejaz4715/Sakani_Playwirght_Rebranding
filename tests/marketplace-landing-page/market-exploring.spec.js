'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const LogSteps_1 = require('@helpers/LogSteps');
const DataHelper_1 = require('@helpers/DataHelper');
const web_app_1 = require('@base-class/web-app');
const SERVICE = 'market-exploring';
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
pages_fixture_1.test.describe('Market Exploring', () => {
  (0, pages_fixture_1.test)(
    'TC-01 Verify the NHC destination section is present',
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
      //await app.loginPage.acceptCookies();
      await app.loginPage.openPreBetaLogin();
      await app.loginPage.preBetaLoginWithNafath(data.sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continuePreBetaNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();
      await (0, LogSteps_1.logStep)('Step 02: Sakani Destinations are visible');
      (0, pages_fixture_1.expect)(await app.marketplaceLandingPage.isDestinationSectionVisible()).toBe(true);
    }
  );
  (0, pages_fixture_1.test)(
    'TC-02 Verify user navigate to any NHC destination cards',
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
      //await app.loginPage.acceptCookies();
      await app.loginPage.openPreBetaLogin();
      await app.loginPage.preBetaLoginWithNafath(data.sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continuePreBetaNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();
      await (0, LogSteps_1.logStep)('Step 02: Open the first destination card > Verify it opens in a new tab');
      const projectName = await app.marketplaceLandingPage.getFirstDestinationCardName();
      const projectUrl = await app.marketplaceLandingPage.getFirstDestinationCardUrl();
      const projectTab = await app.marketplaceLandingPage.openFirstDestinationCardInNewTab();
      (0, pages_fixture_1.expect)(projectTab.url()).toBe(projectUrl);
      await (0, LogSteps_1.logStep)('Step 03: Verify the project is visible in the new tab');
      (0, pages_fixture_1.expect)(await app.marketplaceLandingPage.isProjectVisibleInTab(projectTab, projectName)).toBe(true);
      await (0, LogSteps_1.logStep)('Step 04: Close the project tab > Verify the marketplace tab is still open');
      await app.marketplaceLandingPage.closeTab(projectTab);
      (0, pages_fixture_1.expect)(await app.marketplaceLandingPage.isDestinationSectionVisible()).toBe(true);
    }
  );
  (0, pages_fixture_1.test)(
    'TC-03 Verify the cards slider navigation (left, right)',
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
      await (0, LogSteps_1.logStep)('Step 02: Sakani Destinations are visible');
      (0, pages_fixture_1.expect)(await app.marketplaceLandingPage.isDestinationSectionVisible()).toBe(true);
      await (0, LogSteps_1.logStep)('Step 03: Save the first card title');
      const firstCardName = await app.marketplaceLandingPage.getActiveDestinationCardName();
      await (0, LogSteps_1.logStep)('Step 04: Slide the destinations to the left > get the first card name again');
      await app.marketplaceLandingPage.slideToLeft();
      let currentCardName = await app.marketplaceLandingPage.getActiveDestinationCardName();
      await (0, LogSteps_1.logStep)('Step 05: First card should be changed after sliding to left');
      (0, pages_fixture_1.expect)(firstCardName).not.toEqual(currentCardName);
      await (0, LogSteps_1.logStep)('Step 06: Slide the destinations to the right > get the first card name again');
      await app.marketplaceLandingPage.slideToRight();
      currentCardName = await app.marketplaceLandingPage.getActiveDestinationCardName();
      await (0, LogSteps_1.logStep)('Step 07: First Card should be returned as before after sliding to the right');
      (0, pages_fixture_1.expect)(firstCardName).toEqual(currentCardName);
    }
  );
  (0, pages_fixture_1.test)(
    'TC-04 Verify insight and trends section is present',
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
      //await app.loginPage.acceptCookies();
      await app.loginPage.openPreBetaLogin();
      await app.loginPage.preBetaLoginWithNafath(data.sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continuePreBetaNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();
      await (0, LogSteps_1.logStep)('Step 02: Sakani Destinations are visible');
      (0, pages_fixture_1.expect)(await app.marketplaceLandingPage.isInsightsAndTrendsSectionVisible()).toBe(true);
    }
  );
  (0, pages_fixture_1.test)(
    'TC-05 Verify filtering the projects on the landing page',
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
      await (0, LogSteps_1.logStep)('Step 02: Save the number of projects before filtering');
      const projectsCountBefore = await app.marketplaceLandingPage.getProjectCardsCount();
      await (0, LogSteps_1.logStep)('Step 03: Filter the projects by the property type');
      await app.marketplaceLandingPage.filterProjectsBy(data.filterOption);
      await (0, LogSteps_1.logStep)('Step 04: The filter is applied');
      (0, pages_fixture_1.expect)(await app.marketplaceLandingPage.isFilterApplied(data.filterOption)).toBe(true);
      await (0, LogSteps_1.logStep)('Step 05: Fewer projects are shown after filtering');
      await pages_fixture_1.expect.poll(() => app.marketplaceLandingPage.getProjectCardsCount(), { timeout: 30_000 }).toBeLessThan(projectsCountBefore);
    }
  );
  (0, pages_fixture_1.test)(
    'TC-06 Verify sorting the projects on the landing page',
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
      await (0, LogSteps_1.logStep)('Step 02: Save the projects order before sorting');
      const projectsOrderBefore = await app.marketplaceLandingPage.getProjectCardsText();
      await (0, LogSteps_1.logStep)('Step 03: Sort the projects by price');
      await app.marketplaceLandingPage.sortProjectsBy(data.sortOption);
      await (0, LogSteps_1.logStep)('Step 04: The projects order is changed after sorting');
      await pages_fixture_1.expect.poll(() => app.marketplaceLandingPage.getProjectCardsText(), { timeout: 30_000 }).not.toEqual(projectsOrderBefore);
      await (0, LogSteps_1.logStep)('Step 05: The selected sort option is marked as selected');
      (0, pages_fixture_1.expect)(await app.marketplaceLandingPage.isSortOptionSelected(data.sortOption)).toBe(true);
    }
  );
});
