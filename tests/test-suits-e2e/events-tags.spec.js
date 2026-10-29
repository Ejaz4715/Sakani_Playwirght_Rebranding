'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const test_1 = require('@playwright/test');
const path = require('path');
const web_app_1 = require('@base-class/web-app');
const LogSteps_1 = require('@helpers/LogSteps');
const DataHelper_1 = require('@helpers/DataHelper');
const EventsTagsObjects_1 = require('@objects/EventsTagsObjects');
const SERVICE = 'events-tags';
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
const writeServiceData = (key, value) => DataHelper_1.DataHelper.updateServiceData(SERVICE, key, value);
test_1.test.describe('Events Tags', () => {
  (0, test_1.test)('TC-01 Admin add new event tag', { annotation: [{ product: 'Loyalty', type: 'critical' }] }, async ({ page }) => {
    test_1.test.setTimeout(0);
    //read data from json relative to the service
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new web_app_1.WebApp(page);
    const adminUsername = data.adminUsername;
    const adminPassword = data.adminPassword;
    const adminPortalUrl = environment.adminPortalUrl;
    const uploadDesign = path.join(process.cwd(), 'src', 'data', 'Sample image 2.png');
    const tagName = `Tag Name ${new Date()
      .toISOString()
      .replace(/[-:T.]/g, '')
      .slice(0, 14)}`;
    writeServiceData('tagName', tagName);
    await (0, LogSteps_1.logStep)('Step 01: Login to admin portal as a super admin');
    await app.adminProjectPage.login(adminPortalUrl, adminUsername, adminPassword);
    await (0, LogSteps_1.logStep)('Step 02: Navigate to events tags');
    await app.commonMethods.clickElement(EventsTagsObjects_1.EventsTagsObjects.neighborGreetingLink);
    await app.commonMethods.clickElement(EventsTagsObjects_1.EventsTagsObjects.eventsTagsLink);
    await (0, LogSteps_1.logStep)('Step 03: Clck on update new tag');
    await app.commonMethods.clickElement(EventsTagsObjects_1.EventsTagsObjects.updateNewTagButton);
    await (0, LogSteps_1.logStep)('Step 04: Fill all information > Click on save > Verify the successful message');
    await app.commonMethods.fill(EventsTagsObjects_1.EventsTagsObjects.tageNameInputfield, tagName);
    await app.commonMethods.uploadFile(EventsTagsObjects_1.EventsTagsObjects.uploadDesign, uploadDesign);
    await page.waitForTimeout(3000);
    await app.commonMethods.clickElement(EventsTagsObjects_1.EventsTagsObjects.appPicker);
    await app.commonMethods.press(EventsTagsObjects_1.EventsTagsObjects.colorsInputfield, 'Control+A');
    await page.waitForTimeout(3000);
    await app.commonMethods.fill(EventsTagsObjects_1.EventsTagsObjects.colorsInputfield, '#100101');
    await app.adminProjectPage.clickSaveButton();
    await app.commonMethods.verifyElementVisible(EventsTagsObjects_1.EventsTagsObjects.successfulMessageTagCreation);
  });
  (0, test_1.test)('TC-02 Admin edit the event tag', { annotation: [{ product: 'Loyalty', type: 'critical' }] }, async ({ page }) => {
    test_1.test.setTimeout(0);
    //read data from json relative to the service
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new web_app_1.WebApp(page);
    const adminUsername = data.adminUsername;
    const adminPassword = data.adminPassword;
    const adminPortalUrl = environment.adminPortalUrl;
    const tagName = data.tagName;
    await (0, LogSteps_1.logStep)('Step 01: Login to admin portal as a super admin');
    await app.adminProjectPage.login(adminPortalUrl, adminUsername, adminPassword);
    await (0, LogSteps_1.logStep)('Step 02: Navigate to events tags');
    await app.commonMethods.clickElement(EventsTagsObjects_1.EventsTagsObjects.neighborGreetingLink);
    await app.commonMethods.clickElement(EventsTagsObjects_1.EventsTagsObjects.eventsTagsLink);
    await (0, LogSteps_1.logStep)('Step 03: Select same tag name > Edit then verify successfull message');
    await app.commonMethods.hoverElement(EventsTagsObjects_1.EventsTagsObjects.updateNewTagButton);
    await app.commonMethods.clickElement(EventsTagsObjects_1.EventsTagsObjects.datatableBodyCellLabel(tagName));
    await app.commonMethods.clickElement(EventsTagsObjects_1.EventsTagsObjects.editButton);
    await app.commonMethods.press(EventsTagsObjects_1.EventsTagsObjects.tageNameInputfield, 'Control+A');
    await app.commonMethods.fill(EventsTagsObjects_1.EventsTagsObjects.tageNameInputfield, tagName);
    await app.commonMethods.clickElement(EventsTagsObjects_1.EventsTagsObjects.updateButton);
    await app.commonMethods.verifyElementVisible(EventsTagsObjects_1.EventsTagsObjects.updatedMessage);
  });
  (0, test_1.test)('TC-03 Admin delete the event tag', { annotation: [{ product: 'Loyalty', type: 'critical' }] }, async ({ page }) => {
    test_1.test.setTimeout(0);
    //read data from json relative to the service
    const environment = readEnvironments();
    const data = readServiceData();
    const app = new web_app_1.WebApp(page);
    const adminUsername = data.adminUsername;
    const adminPassword = data.adminPassword;
    const adminPortalUrl = environment.adminPortalUrl;
    const tagName = data.tagName;
    await (0, LogSteps_1.logStep)('Step 01: Login to admin portal as a super admin');
    await app.adminProjectPage.login(adminPortalUrl, adminUsername, adminPassword);
    await (0, LogSteps_1.logStep)('Step 02: Navigate to events tags');
    await app.commonMethods.clickElement(EventsTagsObjects_1.EventsTagsObjects.neighborGreetingLink);
    await app.commonMethods.clickElement(EventsTagsObjects_1.EventsTagsObjects.eventsTagsLink);
    await (0, LogSteps_1.logStep)('Step 03: Select same tag name > Edit then verify successfull message');
    await app.commonMethods.hoverElement(EventsTagsObjects_1.EventsTagsObjects.updateNewTagButton);
    await app.commonMethods.clickElement(EventsTagsObjects_1.EventsTagsObjects.datatableBodyCellLabel(tagName));
    await (0, LogSteps_1.logStep)('Step 04: Delete same tag name > Verify successful deleted message');
    await app.commonMethods.clickElement(EventsTagsObjects_1.EventsTagsObjects.deleteButton);
    await app.commonMethods.clickElement(EventsTagsObjects_1.EventsTagsObjects.deletePopupButton);
    await app.commonMethods.verifyElementVisible(EventsTagsObjects_1.EventsTagsObjects.deletedMessage);
  });
});
