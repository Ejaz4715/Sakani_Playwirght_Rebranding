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
const DateUtils_1 = require('@pages/utils/DateUtils');
const SERVICE = 'loyalty-sharrai';
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
(0, test_1.test)('test', { annotation: [{ product: 'Marketplace', type: 'critical' }] }, async ({ page }) => {
  test_1.test.setTimeout(0);
  const app = new web_app_1.WebApp(page);
  await (0, LogSteps_1.logStep)('Step 00: Read data from json relative to the service');
  const environment = readEnvironments();
  const data = readServiceData();
  const { faker } = await import('@faker-js/faker');
  await (0, LogSteps_1.logStep)('Step 01: Login to admin portal');
  await app.adminProjectPage.login(environment.adminPortalUrl, data.adminUsername, data.adminPassword);
  const companyName = `Automation Test Company ${new Date()
    .toISOString()
    .replace(/[-:T.]/g, '')
    .slice(0, 14)}`;
  const dealName = `Automation Test Deal ${new Date()
    .toISOString()
    .replace(/[-:T.]/g, '')
    .slice(0, 14)}`;
  DataHelper_1.DataHelper.updateServiceData(SERVICE, 'companyName', companyName);
  DataHelper_1.DataHelper.updateServiceData(SERVICE, 'loyalty-sharrai', 'dealName', dealName);
  await (0, LogSteps_1.logStep)('Step 02: Navigate to add new partner');
  await app.adminLoyaltyPage.clickLoyaltyProgram();
  await app.adminLoyaltyPage.clickManagePartners();
  await app.adminLoyaltyPage.clickAddNewPartner();
  await (0, LogSteps_1.logStep)('Step 03: Fill company information');
  await app.adminLoyaltyPage.fillCompanyName(companyName);
  await app.adminLoyaltyPage.fillActivity('Automation Test Activity');
  await app.adminLoyaltyPage.selectIsActiveOption('نعم');
  await app.adminLoyaltyPage.fillContactPerson('Testing Automation User');
  await app.adminLoyaltyPage.fillContactEmail('test@email.com');
  await app.adminLoyaltyPage.fillContactPhone('588938198');
  await app.adminLoyaltyPage.fillContactWhatsapp('58893819');
  const random = faker.string.numeric({ length: 22, allowLeadingZeros: false });
  await app.adminLoyaltyPage.fillIbanNumber('SA' + random);
  await app.adminLoyaltyPage.fillBankAccountName('Al Rajhi');
  await (0, LogSteps_1.logStep)('Step 04: Upload logo > Save > Validate toast message');
  const imageFilePath = node_path_1.default.join(process.cwd(), 'src', 'data', 'Sample image 2.png');
  await app.adminLoyaltyPage.uploadFile(imageFilePath);
  await app.adminLoyaltyPage.clickSave();
  await app.adminLoyaltyPage.validatePartnerAddedSuccessMessage();
  await (0, LogSteps_1.logStep)('Step 05: Navigate to add new deal');
  await app.adminLoyaltyPage.clickManageDeals();
  await app.adminLoyaltyPage.clickAddNewOffer();
  await app.adminLoyaltyPage.selectCompanyName(companyName);
  await (0, LogSteps_1.logStep)('Step 06: Fill all the details > Save');
  const campaignStartDate = DateUtils_1.DateUtils.getDateWithOffsetAndFormat(0, 'DD/MM/YYYY');
  const campaignEndDate = DateUtils_1.DateUtils.getDateWithOffsetAndFormat(0, 'DD/MM/YYYY');
  await app.adminLoyaltyPage.fillCampaignStartDate(campaignStartDate);
  await app.adminLoyaltyPage.fillCampaignEndDate(campaignEndDate);
  await app.adminLoyaltyPage.fillPrice('5000');
  await app.adminLoyaltyPage.fillDiscount('2');
  await app.adminLoyaltyPage.fillAcceptableQuantityPerUser('1');
  await app.adminLoyaltyPage.selectSakaniCommissionType('كمية');
  await app.adminLoyaltyPage.fillSakaniCommissionValue('100');
  await app.adminLoyaltyPage.fillTitle('Test Deal');
  await app.adminLoyaltyPage.fillDescription('Test Desc');
  await app.adminLoyaltyPage.fillDetails('Test Details');
  await app.adminLoyaltyPage.fillTermsAndConditions('Testing terms and condition for sharrai offer');
  await app.adminLoyaltyPage.clickSave();
  await (0, LogSteps_1.logStep)('Step 07: Import deal file > Save the file');
  await app.adminLoyaltyPage.clickDealIdentifiersTab();
  await app.adminLoyaltyPage.clickImportOfferCodes();
  const importDealFilePath = node_path_1.default.join(process.cwd(), 'src', 'data', 'Sample image 2.png');
  await app.adminLoyaltyPage.uploadDealFile(importDealFilePath);
  await app.adminLoyaltyPage.clickSave();
  await app.adminLoyaltyPage.validateTheFileImportToast();
  await (0, LogSteps_1.logStep)('Step 08: Commit the deal codes');
  await app.adminLoyaltyPage.clickFirstProcessedCell();
  await app.adminLoyaltyPage.clickApprove();
  await app.adminLoyaltyPage.clickConfirm();
  await app.adminLoyaltyPage.validateSendImportApprovalRequestToastMessageIsDisplayed();
  await app.adminLoyaltyPage.clickManageDeals();
  await (0, LogSteps_1.logStep)('Step 09: Change the deal status to Active');
  await app.adminLoyaltyPage.searchAndNavigateToDeal(dealName);
  await app.adminLoyaltyPage.clickEdit();
  await app.adminLoyaltyPage.selectStatusToActive('نشط');
  await app.adminLoyaltyPage.clickSave();
  await app.adminLoyaltyPage.clickYesOnPopUp();
  await app.adminLoyaltyPage.verifyActiveStatusVisible();
  // await page.locator('ng-select').filter({ hasText: 'اختيارغير نشط' }).getByRole('combobox').click();
});
