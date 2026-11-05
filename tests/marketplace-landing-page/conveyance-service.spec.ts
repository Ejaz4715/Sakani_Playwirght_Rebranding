import { expect, test } from '@fixtures/pages.fixture';
import { logStep } from '@helpers/LogSteps';
import { DataHelper } from '@helpers/DataHelper';
import { WebApp } from '@base-class/web-app';

const SERVICE = 'conveyance-service';

const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;

test.describe('Conveyance Service', () => {
  test(
    'TC-01 Verify navigation to conveyance service',
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

      await logStep('Step 02: Open Conveyance Service');
      await app.conveyancePage.openConveyancePage();

      await logStep('Step 03: Conveyance service page is visible ');
      expect(await app.conveyancePage.isConveyancePageVisible()).toBe(true);
    }
  );

  test(
    'TC-02 Start the service and verify the no active booking page',
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

      await logStep('Step 02: Open Conveyance Service');
      await app.conveyancePage.openConveyancePage();
      expect(await app.conveyancePage.isConveyancePageVisible()).toBe(true);

      await logStep('Step 03: Click start the service');
      await app.conveyancePage.startService();

      await logStep('Step 04: The no active booking page is visible');
      expect(await app.conveyancePage.isNoActiveBookingMessageVisible()).toBe(true);
    }
  );

  test(
    'TC-03 Verify the conveyance requests filter tabs in my activities',
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

      await logStep('Step 02: Open Profile > My activities > Conveyance service');
      await app.marketplaceLandingPage.openProfileManagement();
      await app.conveyancePage.openConveyanceActivities();

      await logStep('Step 03: Open every filter tab > the tab is selected');
      for (const tabName of data.requestsTabs) {
        await app.conveyancePage.openRequestsTab(tabName);
        expect(await app.conveyancePage.isRequestsTabSelected(tabName), `"${tabName}" tab should be selected`).toBe(true);
      }
    }
  );
});
