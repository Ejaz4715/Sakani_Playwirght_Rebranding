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
const DataHelper_1 = require('@helpers/DataHelper');
const LogSteps_1 = require('@helpers/LogSteps');
const SelfConstructionObjects_1 = require('@objects/SelfConstructionObjects');
const SERVICE = 'engineering-offices';
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
const writeServiceData = (key, value) => DataHelper_1.DataHelper.updateServiceData(SERVICE, key, value);
test_1.test.describe('Engineering Office', () => {
  (0, test_1.test)('TC-01 Add new engineering office', { annotation: [{ product: 'Self-Construction', type: 'critical' }] }, async ({ page }) => {
    test_1.test.setTimeout(0);
    await (0, LogSteps_1.logStep)('Step 00: Read data from json relative to the service');
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new web_app_1.WebApp(page);
    const adminUsername = data.adminUsername;
    const adminPassword = data.adminPassword;
    const adminPortalUrl = environment.adminPortalUrl;
    const engineeringOfficeName = `Engineering Office Name ${new Date()
      .toISOString()
      .replace(/[-:T.]/g, '')
      .slice(0, 14)}`;
    writeServiceData('engineeringOfficeName', engineeringOfficeName);
    const tenRandomNumbers = `1${Math.floor(Math.random() * 1_000_000_000)
      .toString()
      .padStart(9, '0')}`;
    const ibanNumber = `SA${Array.from({ length: 22 }, () => Math.floor(Math.random() * 10)).join('')}`;
    const randomText = Array.from({ length: 20 }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
    await (0, LogSteps_1.logStep)('Step 01: Login to admin portal as a super admin');
    await app.adminProjectPage.login(adminPortalUrl, adminUsername, adminPassword);
    await (0, LogSteps_1.logStep)('Step 02: Navigate to add new engineering office');
    await app.commonMethods.clickElement(SelfConstructionObjects_1.SelfConstructionObjects.selfConstructionLink);
    await app.commonMethods.clickElement(SelfConstructionObjects_1.SelfConstructionObjects.engineeringOfficeLink);
    await app.commonMethods.clickElement(SelfConstructionObjects_1.SelfConstructionObjects.addEngineeringOfficeButton);
    await (0, LogSteps_1.logStep)('Step 03: Fill all information of the new engineering office');
    await app.selfConstructionPage.fill(SelfConstructionObjects_1.SelfConstructionObjects.enginerringOfficeNameInputfield, engineeringOfficeName);
    await app.commonMethods.clickElement(SelfConstructionObjects_1.SelfConstructionObjects.statusDropdownList);
    await app.commonMethods.clickElement(SelfConstructionObjects_1.SelfConstructionObjects.statusOption);
    await app.selfConstructionPage.fill(SelfConstructionObjects_1.SelfConstructionObjects.crNubmerInputfield, tenRandomNumbers);
    await app.selfConstructionPage.fill(SelfConstructionObjects_1.SelfConstructionObjects.councilNubmerInputfield, tenRandomNumbers);
    await app.selfConstructionPage.fill(SelfConstructionObjects_1.SelfConstructionObjects.buildingPermitPriceInputfield, tenRandomNumbers);
    await app.selfConstructionPage.fill(SelfConstructionObjects_1.SelfConstructionObjects.ibanNumberInputfield, ibanNumber);
    await app.selfConstructionPage.fill(SelfConstructionObjects_1.SelfConstructionObjects.bankAccountNameInputfield, randomText);
    await (0, LogSteps_1.logStep)('Step 04: Save then verify the successful message');
    await app.adminProjectPage.clickSaveButton();
    await app.commonMethods.verifyElementVisible(SelfConstructionObjects_1.SelfConstructionObjects.succsessfullToasMessage);
  });
  (0, test_1.test)('TC-02 Add new interior design offers', { annotation: [{ product: 'Self-Construction', type: 'critical' }] }, async ({ page }) => {
    test_1.test.setTimeout(0);
    await (0, LogSteps_1.logStep)('Step 00: Read data from json relative to the service');
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new web_app_1.WebApp(page);
    const adminUsername = data.adminUsername;
    const adminPassword = data.adminPassword;
    const adminPortalUrl = environment.adminPortalUrl;
    const designerNameInputfield = `Designer Name ${new Date()
      .toISOString()
      .replace(/[-:T.]/g, '')
      .slice(0, 14)}`;
    writeServiceData('designerNameInputfield', designerNameInputfield);
    const tenRandomNumbers = `1${Math.floor(Math.random() * 1_000_000_000)
      .toString()
      .padStart(9, '0')}`;
    const ibanNumber = `SA${Array.from({ length: 22 }, () => Math.floor(Math.random() * 10)).join('')}`;
    const randomText = Array.from({ length: 20 }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
    const randomTextEmail = Math.random().toString(36).slice(2, 7).padEnd(5, '0');
    const email = `${randomTextEmail}@a.com`;
    const about = Array.from({ length: 50 }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
    const designLogoImagePath = node_path_1.default.join(process.cwd(), 'src', 'data', 'Sample image 2.png');
    await (0, LogSteps_1.logStep)('Step 01: Login to admin portal as a super admin');
    await app.adminProjectPage.login(adminPortalUrl, adminUsername, adminPassword);
    await (0, LogSteps_1.logStep)('Step 02: Navigate to add new interior design offer');
    await app.commonMethods.clickElement(SelfConstructionObjects_1.SelfConstructionObjects.selfConstructionLink);
    await app.commonMethods.clickElement(SelfConstructionObjects_1.SelfConstructionObjects.interiorDesignOffersLink);
    await app.commonMethods.clickElement(SelfConstructionObjects_1.SelfConstructionObjects.addNewInteriorOfficeDesignLink);
    await (0, LogSteps_1.logStep)('Step 03: Fill all information of the new interior design office');
    await app.selfConstructionPage.fill(SelfConstructionObjects_1.SelfConstructionObjects.designerNameInputfield, designerNameInputfield);
    await app.selfConstructionPage.fill(SelfConstructionObjects_1.SelfConstructionObjects.officeNameInputfield, randomText);
    await app.selfConstructionPage.fill(SelfConstructionObjects_1.SelfConstructionObjects.crNubmerInputfield, tenRandomNumbers);
    await app.selfConstructionPage.fill(SelfConstructionObjects_1.SelfConstructionObjects.aboutDesignerTextarea, about);
    await app.selfConstructionPage.fill(SelfConstructionObjects_1.SelfConstructionObjects.emailInputfield, email);
    await app.selfConstructionPage.fill(SelfConstructionObjects_1.SelfConstructionObjects.ibanNumberInputfield, ibanNumber);
    await app.selfConstructionPage.fill(SelfConstructionObjects_1.SelfConstructionObjects.bankAccountNameInputfield, randomText);
    await (0, LogSteps_1.logStep)('Step 04: Save then verify the successful message');
    await app.adminProjectPage.clickSaveButton();
    await app.commonMethods.verifyElementVisible(SelfConstructionObjects_1.SelfConstructionObjects.succsessfullToasMessage);
    await (0, LogSteps_1.logStep)('Step 06: Upload design logo and approve');
    await app.selfConstructionPage.uploadDesignLogo(designLogoImagePath);
    await app.adminProjectPage.clickUploadButton();
    await app.adminProjectPage.clickRequestMediaApprovalButton();
    await app.adminProjectPage.clickAcceptUploadedMediaButton();
    await (0, LogSteps_1.logStep)('Step 07: Verify is published');
    await page.waitForTimeout(2000);
    await page.keyboard.press('F5');
    await app.selfConstructionPage.publishProject();
  });
});
