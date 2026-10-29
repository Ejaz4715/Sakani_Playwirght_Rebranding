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
const ExcelUtils_1 = require('@pages/utils/ExcelUtils');
const SERVICE = 'update-unit';
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
test_1.test.describe('Generate Reoprts', () => {
  (0, test_1.test)('TC-01 Developer generate reoprt for a project', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page }) => {
    test_1.test.setTimeout(0);
    await (0, LogSteps_1.logStep)('Step 00: Read data from json relative to the service');
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new web_app_1.WebApp(page);
    const projectName = data.projectName;
    const developerUserId = data.developerUserId;
    const sapaPortalUrl = environment.sapaPortalUrl;
    const filePath = node_path_1.default.join(process.cwd(), 'src', 'downloads', 'generate-reports.xlsx');
    await (0, LogSteps_1.logStep)('Step 01: Login as developer to sapa portal and open the project');
    await app.partnersLoginPage.gotoAuth(sapaPortalUrl);
    await app.partnersLoginPage.loginToSapaPortal(developerUserId);
    await app.partnersLoginPage.switchRoleToDeveloper();
    await (0, LogSteps_1.logStep)('Step 02: Navigate to reports page');
    await app.developerProjectPage.clickOnReports();
    await (0, LogSteps_1.logStep)('Step 03: Select project and unit report to issue the report');
    await app.developerProjectPage.selectBookingsAndUnitsReport();
    await app.developerProjectPage.clickIssueTheReportButton();
    await (0, LogSteps_1.logStep)('Step 04: Select a project > Issue report');
    await app.developerProjectPage.searchProjectForReport(projectName);
    await app.developerProjectPage.clickIssueReportButton();
    await app.developerProjectPage.isReportAddedToastMessageVisible();
    await app.developerProjectPage.refreshUntilReportStatusChanges();
    await app.partnersLoginPage.dismissNewServiceAlertPopUp();
    await (0, LogSteps_1.logStep)('Step 05: Clear the downloads folder');
    const downloadDirectory = node_path_1.default.join(process.cwd(), 'src', 'downloads');
    await app.paymentsAndTransactionsPage.clearDownloadsFolder(downloadDirectory);
    await (0, LogSteps_1.logStep)('Step 06: Download the report');
    const excelDownloadPromise = ExcelUtils_1.ExcelUtils.waitForExcelDownload(page);
    await app.developerProjectPage.clickReportDownloadButton();
    const excelDownload = await excelDownloadPromise;
    const fileName = 'generate-reports.xlsx';
    const downloadPath = node_path_1.default.join(downloadDirectory, fileName);
    await (0, LogSteps_1.logStep)('Step 07: Save the report and verify it exists');
    await ExcelUtils_1.ExcelUtils.saveExcelDownload(excelDownload, downloadPath);
    await app.paymentsAndTransactionsPage.verifySavedFile(downloadPath, downloadDirectory);
  });
});
