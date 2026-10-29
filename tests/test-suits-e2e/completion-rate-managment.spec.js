'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const test_1 = require('@playwright/test');
const web_app_1 = require('@base-class/web-app');
const LogSteps_1 = require('@helpers/LogSteps');
const DataHelper_1 = require('@helpers/DataHelper');
const SERVICE = 'completion-rate-management';
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
test_1.test.describe('Completion Rate Management', () => {
  (0, test_1.test)('TC-01  Admin enables completion percentage', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page }) => {
    test_1.test.setTimeout(0);
    await (0, LogSteps_1.logStep)('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const adminUrl = environments.adminPortalUrl;
    const adminUsername = data.adminUsername;
    const adminPassword = data.adminPassword;
    const projectName = data.projectName;
    await (0, LogSteps_1.logStep)('Step 01: Login to admin portal');
    await app.adminProjectPage.login(adminUrl, adminUsername, adminPassword);
    await (0, LogSteps_1.logStep)('Step 02: Navigate to projects page');
    await app.adminProjectPage.openProjects();
    await (0, LogSteps_1.logStep)("Step 03: Search for project and navigate to project's details page");
    await app.resaleOfUnitsPage.fillProjectName(projectName);
    await app.resaleOfUnitsPage.clickProjectSearchButton();
    await app.resaleOfUnitsPage.clickSearchedProjectResult(data.projectName);
    // await page.locator('div').filter({ hasText: data.projectName }).click();
    await page.waitForTimeout(10000);
    await (0, LogSteps_1.logStep)('Step 04: Enable the completion percenage and Save');
    await app.adminProjectPage.clickCompletionPercentageSwitch(true);
    await app.paymentTrackingPage.clickOnSaveButton();
    await app.paymentTrackingPage.verifySaveSuccessToast();
  });
  (0, test_1.test)('TC-02 Verify the completion percentage is present', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page }) => {
    test_1.test.setTimeout(0);
    await (0, LogSteps_1.logStep)('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const sakaniUserId = data.sakaniUserId;
    const userPortalUrl = environments.userPortalUrl;
    const projectName = data.projectName;
    await (0, LogSteps_1.logStep)('Step 01: Open the user portal and login');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.loginPage.acceptCookies();
    await app.loginPage.openLogin();
    await app.loginPage.loginWithNafath(sakaniUserId);
    await app.loginPage.waitForNafathPromptToDisappear();
    await app.loginPage.continueNewUserPopup();
    await app.loginPage.handlePushNotificationPopup();
    await (0, LogSteps_1.logStep)('Step 02: Find the project and open its unit model');
    await app.marketplaceLandingPage.openSearch();
    await app.marketplaceLandingPage.searchForProject(projectName);
    await app.projectDetailsPage.openUnitsAndScroll();
    await (0, LogSteps_1.logStep)('Step 03: Open a unit and start the booking');
    const page1Promise = page.waitForEvent('popup');
    await app.marketplaceLandingPage.openResidentialUnit();
    const page1 = await page1Promise;
    const page2Promise = page1.waitForEvent('popup');
    {
      const unitApp = new web_app_1.WebApp(page1);
      await unitApp.projectUnitsPage.openUnitInPopup(1);
    }
    const page2 = await page2Promise;
    {
      let bookingPage = page2;
      let bookingApp = new web_app_1.WebApp(bookingPage);
      await (0, LogSteps_1.logStep)('Step 04: Verify the completion percentage is present');
      await bookingApp.bookingPage.verifyCompletionPercentageProgressIsVisible(true);
    }
  });
  (0, test_1.test)('TC-03  Admin disables completion percentage', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page }) => {
    test_1.test.setTimeout(0);
    await (0, LogSteps_1.logStep)('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const adminUrl = environments.adminPortalUrl;
    const adminUsername = data.adminUsername;
    const adminPassword = data.adminPassword;
    const projectName = data.projectName;
    await (0, LogSteps_1.logStep)('Step 01: Login to admin portal');
    await app.adminProjectPage.login(adminUrl, adminUsername, adminPassword);
    await (0, LogSteps_1.logStep)('Step 02: Navigate to projects page');
    await app.adminProjectPage.openProjects();
    await (0, LogSteps_1.logStep)("Step 03: Search for project and navigate to project's details page");
    await app.resaleOfUnitsPage.fillProjectName(projectName);
    await app.resaleOfUnitsPage.clickProjectSearchButton();
    await app.resaleOfUnitsPage.clickSearchedProjectResult(data.projectName);
    // await page.locator('div').filter({ hasText: data.projectName }).click();
    await page.waitForTimeout(10000);
    await (0, LogSteps_1.logStep)('Step 04: Disable the completion percenage and Save');
    await app.adminProjectPage.clickCompletionPercentageSwitch(false);
    await app.paymentTrackingPage.clickOnSaveButton();
    await app.paymentTrackingPage.verifySaveSuccessToast();
  });
  (0, test_1.test)('TC-04 Verify the completion percentage is hidden', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page }) => {
    test_1.test.setTimeout(0);
    await (0, LogSteps_1.logStep)('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const sakaniUserId = data.sakaniUserId;
    const userPortalUrl = environments.userPortalUrl;
    const projectName = data.projectName;
    await (0, LogSteps_1.logStep)('Step 01: Open the user portal and login');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.loginPage.acceptCookies();
    await app.loginPage.openLogin();
    await app.loginPage.loginWithNafath(sakaniUserId);
    await app.loginPage.waitForNafathPromptToDisappear();
    await app.loginPage.continueNewUserPopup();
    await app.loginPage.handlePushNotificationPopup();
    await (0, LogSteps_1.logStep)('Step 02: Find the project and open its unit model');
    await app.marketplaceLandingPage.openSearch();
    await app.marketplaceLandingPage.searchForProject(projectName);
    await app.projectDetailsPage.openUnitsAndScroll();
    await (0, LogSteps_1.logStep)('Step 03: Open a unit and start the booking');
    const page1Promise = page.waitForEvent('popup');
    await app.marketplaceLandingPage.openResidentialUnit();
    const page1 = await page1Promise;
    const page2Promise = page1.waitForEvent('popup');
    {
      const unitApp = new web_app_1.WebApp(page1);
      await unitApp.projectUnitsPage.openUnitInPopup(1);
    }
    const page2 = await page2Promise;
    {
      let bookingPage = page2;
      let bookingApp = new web_app_1.WebApp(bookingPage);
      await (0, LogSteps_1.logStep)('Step 04: Verify the completion percentage is hidden');
      await bookingApp.bookingPage.verifyCompletionPercentageProgressIsVisible(false);
    }
  });
});
