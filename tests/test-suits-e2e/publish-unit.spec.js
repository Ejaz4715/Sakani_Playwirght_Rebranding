'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const test_1 = require('@playwright/test');
const node_path_1 = __importDefault(require('node:path'));
const web_app_1 = require('@base-class/web-app');
const LogSteps_1 = require('@helpers/LogSteps');
const DataHelper_1 = require('@helpers/DataHelper');
const SERVICE = 'publish-unit';
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
const filePath = node_path_1.default.join(process.cwd(), 'src', 'data', 'Sample image.jpg');
test_1.test.describe('Publish Unit', () => {
  (0, test_1.test)('TC-01 - Developer broker publish new unit request', { annotation: [{ product: 'Marketplace', type: 'critical' }] }, async ({ page }) => {
    test_1.test.setTimeout(0);
    await (0, LogSteps_1.logStep)('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:T.]/g, '')
      .slice(0, 14);
    DataHelper_1.DataHelper.updateServiceData('publish-unit', 'AdLicenseNumber', timestamp);
    const app = new web_app_1.WebApp(page);
    const sapaUrl = environments.sapaPortalUrl;
    const developerUserId = data.developerUserId;
    const advertiserId = data.advertiserId;
    await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login');
    await app.developerProjectPage.gotoAuth(sapaUrl);
    await app.developerProjectPage.loginDeveloper(developerUserId);
    await app.publishUnitPage.switchRoleToDeveloperBroker();
    await (0, LogSteps_1.logStep)('Step 02: Navigate to publish unit page > Select publish unit > Fill request information');
    await app.publishUnitPage.clickOnServicesLink();
    await app.publishUnitPage.clickOnManagePublishButton();
    await app.publishUnitPage.clickOnPublishTab();
    await app.publishUnitPage.clickOnStartButton();
    await app.publishUnitPage.clickOnSingleUnitOption();
    await app.publishUnitPage.clickOnNextButton();
    await app.publishUnitPage.fillAdLicenseNumberInputfield(timestamp);
    await app.publishUnitPage.selectAdvertiserIdType();
    await app.publishUnitPage.fillAdvertiserIdNumberInputfield(advertiserId);
    await app.publishUnitPage.clickOnContinueButton();
    await (0, LogSteps_1.logStep)('Step 03: Fill unit details > Send publish unit request > Verify request sent successfully');
    await app.publishUnitPage.selectPreferredCommunicationType();
    await app.publishUnitPage.fillHeightInputfield(10);
    await app.publishUnitPage.fillWidthInputfield(10);
    await app.publishUnitPage.selectBuildingYear();
    await app.publishUnitPage.fillDescriptionTextarea('test description');
    await app.publishUnitPage.uploadExteriorPhoto(filePath);
    await app.publishUnitPage.uploadInteriorPhoto(filePath);
    await app.publishUnitPage.clickOnDataAccuracyDisclaimerCheckbox();
    await app.publishUnitPage.clickOnSendPublishUnitButton();
    await app.publishUnitPage.verifyPublishUnitSendModalIsVisible();
  });
  (0, test_1.test)('TC-02 - Admin approves publish unit request', { annotation: [{ product: 'Marketplace', type: 'critical' }] }, async ({ page }) => {
    test_1.test.setTimeout(0);
    await (0, LogSteps_1.logStep)('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const adminUrl = environments.adminPortalUrl;
    const adminUsername = data.adminUsername;
    const adminPassword = data.adminPassword;
    const adLicenseNumber = data.AdLicenseNumber;
    await (0, LogSteps_1.logStep)('Step 01: Navigate to admin platform > Login');
    await app.adminProjectPage.login(adminUrl, adminUsername, adminPassword);
    await (0, LogSteps_1.logStep)('Step 02: Navigate publish unit requests page');
    await app.publishUnitPage.clickOnExternalInventoryLink();
    await app.publishUnitPage.clickOnReadyMarketUnitsLink();
    await app.publishUnitPage.clickOnRequestTab();
    await (0, LogSteps_1.logStep)('Step 03: Search for the ad license number > View publish unit request');
    await app.publishUnitPage.fillAdminAdLicenseNumberInputfield(adLicenseNumber);
    await app.publishUnitPage.clickOnAdLicenseNumberResultCell(adLicenseNumber);
    await app.publishUnitPage.clickOnViewPublishUnitLink();
    await (0, LogSteps_1.logStep)('Step 04: > Approve the request > Verify approval success message');
    await app.publishUnitPage.clickOnAcceptButton();
    await app.publishUnitPage.verifyPublishUnitApprovalSuccessMessage();
  });
  (0, test_1.test)('TC-03 - Developer verify the request is finished', { annotation: [{ product: 'Marketplace', type: 'critical' }] }, async ({ page }) => {
    test_1.test.setTimeout(0);
    await (0, LogSteps_1.logStep)('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const sapaUrl = environments.sapaPortalUrl;
    const developerUserId = data.developerUserId;
    const adLicenseNumber = data.AdLicenseNumber;
    await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login');
    await app.developerProjectPage.gotoAuth(sapaUrl);
    await app.developerProjectPage.loginDeveloper(developerUserId);
    await app.publishUnitPage.switchRoleToDeveloperBroker();
    await (0, LogSteps_1.logStep)('Step 02: Navigate to publish unit page > Search for approved request by ad license number');
    await app.publishUnitPage.clickOnServicesLink();
    await app.publishUnitPage.clickOnManagePublishButton();
    await app.publishUnitPage.fillAdLicenseNumberToSearchInputfield(adLicenseNumber);
    await app.publishUnitPage.clickOnSearchButton();
    await (0, LogSteps_1.logStep)('Step 03: Verify the request status is finished');
    await app.publishUnitPage.verifyAdLicenseStatus('منتهي');
  });
});
