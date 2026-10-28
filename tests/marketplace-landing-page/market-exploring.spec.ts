import { expect, test } from '@fixtures/pages.fixture';
import { logStep } from '@helpers/LogSteps';
import { DataHelper } from '@helpers/DataHelper';
import { WebApp } from '@base-class/web-app';

const SERVICE = 'market-exploring';

const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;

test.describe('Market Exploring', () => {
  test(
    'TC-01 Verify the NHC destination section is present',
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
      //await app.loginPage.acceptCookies();
      await app.loginPage.openPreBetaLogin();
      await app.loginPage.preBetaLoginWithNafath(data.sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continuePreBetaNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();

      await logStep('Step 02: Sakani Destinations are visible');
      expect(await app.marketplaceLandingPage.isDestinationSectionVisible()).toBe(true);
    }
  );

  test(
    'TC-02 Verify user navigate to any NHC destination cards',
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
      //await app.loginPage.acceptCookies();
      await app.loginPage.openPreBetaLogin();
      await app.loginPage.preBetaLoginWithNafath(data.sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continuePreBetaNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();

      await logStep('Step 02: Open the first destination card > Verify it opens in a new tab');
      const projectName = await app.marketplaceLandingPage.getFirstDestinationCardName();
      const projectUrl = await app.marketplaceLandingPage.getFirstDestinationCardUrl();
      const projectTab = await app.marketplaceLandingPage.openFirstDestinationCardInNewTab();
      expect(projectTab.url()).toBe(projectUrl);

      await logStep('Step 03: Verify the project is visible in the new tab');
      expect(await app.marketplaceLandingPage.isProjectVisibleInTab(projectTab, projectName)).toBe(true);

      await logStep('Step 04: Close the project tab > Verify the marketplace tab is still open');
      await app.marketplaceLandingPage.closeTab(projectTab);
      expect(await app.marketplaceLandingPage.isDestinationSectionVisible()).toBe(true);
    }
  );

  test(
    'TC-03 Verify the cards slider navigation (left, right)',
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

      await logStep('Step 02: Sakani Destinations are visible');
      expect(await app.marketplaceLandingPage.isDestinationSectionVisible()).toBe(true);

      await logStep('Step 03: Save the first card title');
      const firstCardName = await app.marketplaceLandingPage.getActiveDestinationCardName();

      await logStep('Step 04: Slide the destinations to the left > get the first card name again');
      await app.marketplaceLandingPage.slideToLeft();
      let currentCardName = await app.marketplaceLandingPage.getActiveDestinationCardName();

      await logStep('Step 05: First card should be changed after sliding to left');
      expect(firstCardName).not.toEqual(currentCardName);

      await logStep('Step 06: Slide the destinations to the right > get the first card name again');
      await app.marketplaceLandingPage.slideToRight();
      currentCardName = await app.marketplaceLandingPage.getActiveDestinationCardName();

      await logStep('Step 07: First Card should be returned as before after sliding to the right');
      expect(firstCardName).toEqual(currentCardName);
    }
  );

  test(
    'TC-04 Verify insight and trends section is present',
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
      //await app.loginPage.acceptCookies();
      await app.loginPage.openPreBetaLogin();
      await app.loginPage.preBetaLoginWithNafath(data.sakaniUserId);
      await app.loginPage.waitForNafathPromptToDisappear();
      await app.loginPage.continuePreBetaNewUserPopup();
      await app.loginPage.handlePushNotificationPopup();

      await logStep('Step 02: Sakani Destinations are visible');
      expect(await app.marketplaceLandingPage.isInsightsAndTrendsSectionVisible()).toBe(true);
    }
  );

  test(
    'TC-05 Verify filtering the projects on the landing page',
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

      await logStep('Step 02: Save the number of projects before filtering');
      const projectsCountBefore = await app.marketplaceLandingPage.getProjectCardsCount();

      await logStep('Step 03: Filter the projects by the property type');
      await app.marketplaceLandingPage.filterProjectsBy(data.filterOption);

      await logStep('Step 04: The filter is applied');
      expect(await app.marketplaceLandingPage.isFilterApplied(data.filterOption)).toBe(true);

      await logStep('Step 05: Fewer projects are shown after filtering');
      await expect.poll(() => app.marketplaceLandingPage.getProjectCardsCount(), { timeout: 30_000 }).toBeLessThan(projectsCountBefore);
    }
  );

  test(
    'TC-06 Verify sorting the projects on the landing page',
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

      await logStep('Step 02: Save the projects order before sorting');
      const projectsOrderBefore = await app.marketplaceLandingPage.getProjectCardsText();

      await logStep('Step 03: Sort the projects by price');
      await app.marketplaceLandingPage.sortProjectsBy(data.sortOption);

      await logStep('Step 04: The projects order is changed after sorting');
      await expect.poll(() => app.marketplaceLandingPage.getProjectCardsText(), { timeout: 30_000 }).not.toEqual(projectsOrderBefore);

      await logStep('Step 05: The selected sort option is marked as selected');
      expect(await app.marketplaceLandingPage.isSortOptionSelected(data.sortOption)).toBe(true);
    }
  );
});
