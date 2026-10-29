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
const SERVICE = 'offplan-booking';
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
test_1.test.describe('Price Quotation', () => {
  (0, test_1.test)('TC-01 User download the price quotation and verify it', { annotation: [{ product: 'Marketplace', type: 'critical' }] }, async ({ page }) => {
    test_1.test.setTimeout(0);
    await (0, LogSteps_1.logStep)('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const sakaniUserId = data.sakaniUserId;
    const userPortalUrl = environments.userPortalUrl;
    await (0, LogSteps_1.logStep)('Step 01: Open user portal');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.loginPage.acceptCookies();
    await (0, LogSteps_1.logStep)('Step 02: Log in with Nafath');
    await app.loginPage.openLogin();
    await app.loginPage.loginWithNafath(sakaniUserId);
    await app.loginPage.waitForNafathPromptToDisappear();
    await app.loginPage.continueNewUserPopup();
    await app.loginPage.handlePushNotificationPopup();
    await (0, LogSteps_1.logStep)('Step 03: Open completed bookings');
    await app.bookingPage.openCompletedBookings();
    await (0, LogSteps_1.logStep)('Step 04: Capture booked unit code and save to test data');
    const bookedUnitCode = await app.bookingPage.getBookedUnitCode();
    (0, test_1.expect)(bookedUnitCode).toBeTruthy();
    DataHelper_1.DataHelper.updateServiceData(SERVICE, 'bookedUnitCode', bookedUnitCode);
    await (0, LogSteps_1.logStep)('Step 05: Open booking details');
    await app.bookingPage.openBookingDetails();
    await (0, LogSteps_1.logStep)('Step 06: Clear the downloads folder');
    const downloadDirectory = node_path_1.default.join(process.cwd(), 'src', 'downloads');
    await app.paymentsAndTransactionsPage.clearDownloadsFolder(downloadDirectory);
    await (0, LogSteps_1.logStep)('Step 07: Open the price quotation preview and capture its PDF > Save pdf in download directory');
    const pdfResponsePromise = app.paymentsAndTransactionsPage.waitForPdfResponse();
    await app.bookingPage.clickOnViewOfProcequotationButton();
    const pdfResponse = await pdfResponsePromise;
    const fileName = 'price-quotation.pdf';
    const downloadPath = node_path_1.default.join(downloadDirectory, fileName);
    await (0, LogSteps_1.logStep)('Step 05: Save the invoice and verify it exists');
    await app.paymentsAndTransactionsPage.savePdfResponse(pdfResponse, downloadPath);
    await app.paymentsAndTransactionsPage.verifySavedFile(downloadPath, downloadDirectory);
    await app.bookingPage.verifyPriceQuotationContainsRequiredSections(downloadPath);
  });
});
