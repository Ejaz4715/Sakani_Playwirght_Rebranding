'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const test_1 = require('@playwright/test');
const web_app_1 = require('@base-class/web-app');
const LogSteps_1 = require('@helpers/LogSteps');
const DataHelper_1 = require('@helpers/DataHelper');
const SERVICE = 'waiting-list';
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
test_1.test.describe('Unit Comparison', () => {
  (0, test_1.test)('TC-01 - User compare units', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page }) => {
    test_1.test.setTimeout(0);
    await (0, LogSteps_1.logStep)('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const userPortalUrl = environments.userPortalUrl;
    const userID = data.sakaniUserId;
    const projectName = data.projectName;
    await (0, LogSteps_1.logStep)('Step 01: Navigate to user portal > Login');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.loginPage.acceptCookies();
    await app.loginPage.openLogin();
    await app.loginPage.loginWithNafath(userID);
    await app.loginPage.waitForNafathPromptToDisappear();
    await app.loginPage.continueNewUserPopup();
    await app.loginPage.handlePushNotificationPopup();
    await (0, LogSteps_1.logStep)('Step 02: Search for project > View units');
    await app.marketplaceLandingPage.openSearch();
    await app.marketplaceLandingPage.searchForProject(projectName);
    await app.projectDetailsPage.openUnitsAndScroll();
    await (0, LogSteps_1.logStep)('Step 03: Select first unit > Click compare button');
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
      await bookingApp.unitComparisonPage.clickProjectHeaderCompareButton();
    }
    await page1.bringToFront();
    const page3Promise = page1.waitForEvent('popup');
    const unitApp = new web_app_1.WebApp(page1);
    await unitApp.projectUnitsPage.openUnitInPopup(2);
    const page3 = await page3Promise;
    await (0, LogSteps_1.logStep)('Step 04: Select second unit > Click compare button');
    {
      let bookingPage = page3;
      let bookingApp = new web_app_1.WebApp(bookingPage);
      await bookingApp.unitComparisonPage.clickProjectHeaderCompareButton();
      await (0, LogSteps_1.logStep)('Step 05: Click compare button > Verify comparison units page is visible');
      await bookingApp.unitComparisonPage.clickCompareButton();
      await bookingApp.unitComparisonPage.verifyComparisonHeadingIsVisible();
    }
  });
});
