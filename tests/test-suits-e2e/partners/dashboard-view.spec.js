'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const test_1 = require('@playwright/test');
const web_app_1 = require('@base-class/web-app');
const DataHelper_1 = require('@helpers/DataHelper');
const LogSteps_1 = require('@helpers/LogSteps');
const SERVICE = 'dashboard-view';
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
test_1.test.describe('Dashboard View', () => {
  (0, test_1.test)('TC-01 Verify that sapa user navigates to dashboard', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const developerUserId = data.developerUserId;
    await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
    await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await app.developerProjectPage.loginDeveloper(developerUserId);
    await app.developerProjectPage.switchRoleToDeveloper();
    await (0, LogSteps_1.logStep)('Step 02: Open dashboard view > Verify all dashboard elements are visible');
    await app.dashboardViewPage.clickOnDashboardView();
    (0, test_1.expect)(await app.dashboardViewPage.areAllDashboardViewElementsVisible()).toBe(true);
  });
  (0, test_1.test)(
    'TC-02 Verify that sapa user navigates to bookings page',
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
      await (0, LogSteps_1.logStep)('Step 02: Open dashboard view');
      await app.dashboardViewPage.clickOnDashboardView();
      await (0, LogSteps_1.logStep)('Step 03: Click on bookings card > Verify bookings page elements are visible');
      await app.dashboardViewPage.clickOnBookingCard();
      (0, test_1.expect)(await app.dashboardViewPage.areAllReservationsElementsVisible()).toBe(true);
    }
  );
  (0, test_1.test)(
    'TC-03 Verify that sapa user navigates to the projects page',
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
      await (0, LogSteps_1.logStep)('Step 02: Open dashboard view');
      await app.dashboardViewPage.clickOnDashboardView();
      await (0, LogSteps_1.logStep)('Step 03: Click on the projects card > Verify all projects are visible');
      await app.dashboardViewPage.clickOnTheProjectsCard();
      (0, test_1.expect)(await app.dashboardViewPage.areAllProjectsVisible()).toBe(true);
    }
  );
  (0, test_1.test)(
    'TC-04 Verify that sapa user navigates to all updated bookings page',
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
      await (0, LogSteps_1.logStep)('Step 02: Open dashboard view');
      await app.dashboardViewPage.clickOnDashboardView();
      await (0, LogSteps_1.logStep)('Step 03: Click on updated bookings > Verify all updated bookings are visible');
      await app.dashboardViewPage.clickOnUpdatedBookings();
      (0, test_1.expect)(await app.dashboardViewPage.areAllUpdatedBookingsVisible()).toBe(true);
    }
  );
  (0, test_1.test)(
    'TC-05 Verify that sapa user navigates to projects page',
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
      await (0, LogSteps_1.logStep)('Step 02: Open dashboard view');
      await app.dashboardViewPage.clickOnDashboardView();
      await (0, LogSteps_1.logStep)('Step 03: Click on projects card > Verify all projects are visible');
      await app.dashboardViewPage.clickOnProjectsCard();
      (0, test_1.expect)(await app.dashboardViewPage.areAllProjectsVisible()).toBe(true);
    }
  );
  (0, test_1.test)(
    'TC-06 Verify that sapa user navigates to payments page',
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
      await (0, LogSteps_1.logStep)('Step 02: Open dashboard view');
      await app.dashboardViewPage.clickOnDashboardView();
      await (0, LogSteps_1.logStep)('Step 03: Click on payments card > Verify bookings payments are visible');
      await app.dashboardViewPage.clickOnPayCard();
      (0, test_1.expect)(await app.dashboardViewPage.areAllBookingsPaymentVisible()).toBe(true);
    }
  );
});
