'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const test_1 = require('@playwright/test');
const web_app_1 = require('@base-class/web-app');
const DataHelper_1 = require('@helpers/DataHelper');
const LogSteps_1 = require('@helpers/LogSteps');
const node_path_1 = __importDefault(require('node:path'));
const SERVICE = 'stamp-management';
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
const stampImagePath = node_path_1.default.join(process.cwd(), 'src', 'data', 'stamp.png');
test_1.test.describe('Stamp Management', () => {
  (0, test_1.test)('TC-01 View the last stamp ', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const developerUserId = data.developerUserId;
    await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
    await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await app.developerProjectPage.loginDeveloper(developerUserId);
    await app.developerProjectPage.switchRoleToDeveloper();
    await (0, LogSteps_1.logStep)('Step 02: Open stamp management');
    await app.stampManagementPage.clickOnStampManagement();
    await (0, LogSteps_1.logStep)('Step 03: View the last stamp > Verify the stamp image is visible');
    await app.stampManagementPage.clickOnViewLastStamp();
    (0, test_1.expect)(await app.stampManagementPage.isLastStampImageVisible()).toBe(true);
  });
  (0, test_1.test)('TC-02 Add a new stamp', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const developerUserId = data.developerUserId;
    await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
    await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await app.developerProjectPage.loginDeveloper(developerUserId);
    await app.developerProjectPage.switchRoleToDeveloper();
    await (0, LogSteps_1.logStep)('Step 02: Open stamp management > Click update');
    await app.stampManagementPage.clickOnStampManagement();
    await app.stampManagementPage.clickOnStampUpdateButton();
    await (0, LogSteps_1.logStep)('Step 03: Upload the new stamp image');
    await app.stampManagementPage.uploadNewStampImage(stampImagePath);
    await (0, LogSteps_1.logStep)('Step 04: Add the new stamp > Verify OTP');
    await app.stampManagementPage.clickOnAddNewStamp();
    await app.stampManagementPage.fillTheOtp();
    await app.stampManagementPage.clickOnVerify();
    await (0, LogSteps_1.logStep)('Step 05: Update the update the stamp image');
    await app.stampManagementPage.clickOnStampUpdateButton();
    await (0, LogSteps_1.logStep)('Step 05: Verify the new stamp is added successfully');
    (0, test_1.expect)(await app.stampManagementPage.isTheNewStampAddedSuccessfully()).toBe(true);
  });
});
