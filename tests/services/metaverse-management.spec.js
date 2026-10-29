'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const LogSteps_1 = require('@helpers/LogSteps');
const DataHelper_1 = require('@helpers/DataHelper');
const web_app_1 = require('@base-class/web-app');
const SERVICE = 'metaverse-management';
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
pages_fixture_1.test.describe('Metaverse Management', () => {
  (0, pages_fixture_1.test)(
    "TC-01 Sakani Admin blocks the SAPA user's access to the Metaverse service",
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
      await (0, LogSteps_1.logStep)('Step 01: Navigate to admin portal > Login');
      await app.adminProjectPage.login(environments.adminPortalUrl, data.adminUsername, data.adminPassword);
      await app.metaverseManagementPage.clickOnMetaverseManagementAccess();
      await app.metaverseManagementPage.clickOnFirstActiveUser();
      await app.metaverseManagementPage.blockUser();
      (0, pages_fixture_1.expect)(await app.metaverseManagementPage.isUserBlocked()).toBe(true);
    }
  );
  (0, pages_fixture_1.test)(
    'TC-02 Sapa User verifies that Metaverse service access is restricted from the SAPA Portal',
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
      await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
      await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
      await app.developerProjectPage.loginDeveloper(data.sapaCompanyUser);
      await app.metaverseManagementPage.clickOnSakaniMetaverse();
      await app.metaverseManagementPage.clickOnSakaniMetaverseAccessButton();
      (0, pages_fixture_1.expect)(await app.metaverseManagementPage.isSapaUserBlocked()).toBe(true);
    }
  );
  (0, pages_fixture_1.test)(
    "TC-03 TC_03_Sapa Company Admin validates that the user's status reflects as \"Blocked\" (synchronized with Sakani Admin's action) and unblocks the user's Metaverse access",
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
      await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
      await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
      await app.developerProjectPage.loginDeveloper(data.sapaCompanyAdmin);
      await app.metaverseManagementPage.clickOnSakaniMetaverseRequests();
      await app.metaverseManagementPage.fillIdentityNumber(data.sapaCompanyUser);
      await app.metaverseManagementPage.clickOnSearch();
      (0, pages_fixture_1.expect)(await app.metaverseManagementPage.isSapaUserBlockedFromCompanyAdminView()).toBe(true);
      await app.metaverseManagementPage.clickOnUnBlockedFromCompanyAdminView();
      await app.metaverseManagementPage.confirmUnBlockingFromCompanyAdminView();
      (0, pages_fixture_1.expect)(await app.metaverseManagementPage.isSapaUserBlockedFromCompanyAdminView()).toBe(false);
    }
  );
  (0, pages_fixture_1.test)(
    'TC-04 Sapa User verifies that the Metaverse service is once again accessible from the SAPA Portal',
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
      await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
      await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
      await app.developerProjectPage.loginDeveloper(data.sapaCompanyUser);
      await app.metaverseManagementPage.clickOnSakaniMetaverse();
      await app.metaverseManagementPage.clickOnSakaniMetaverseAccessButton();
      (0, pages_fixture_1.expect)(await app.metaverseManagementPage.isSapaUserBlocked()).toBe(false);
    }
  );
  (0, pages_fixture_1.test)(
    'TC-05 Sakani Admin validates that the user\'s status reflects as "Unblocked" (synchronized with Company Admin\'s action)',
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
      await (0, LogSteps_1.logStep)('Step 01: Navigate to admin portal > Login');
      await app.adminProjectPage.login(environments.adminPortalUrl, data.adminUsername, data.adminPassword);
      await app.metaverseManagementPage.clickOnMetaverseManagementAccess();
      await app.metaverseManagementPage.clickOnFirstActiveUser();
      (0, pages_fixture_1.expect)(await app.metaverseManagementPage.isUserActive()).toBe(true);
    }
  );
});
