import { test } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { logStep } from '@helpers/LogSteps';
import { DataHelper } from '@helpers/DataHelper';
import path from 'node:path';

const SERVICE = 'appeal-request';
const PreBeta = 'pre-beta';

const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironment = () => DataHelper.readData().environments[PreBeta].userPortalUrl;
const readEnvironments = () => DataHelper.readData().environments;
const filePath = path.join(process.cwd(), 'src', 'data', 'Sample pdf.pdf');

test.describe('Appeal Request', () => {
  test('TC-01 User submit appeal request', { annotation: [{ product: 'Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environment = readEnvironment();
    const app = new WebApp(page);
    const sakaniUserId = data.sakaniUserId;
    const comments = data.comments;
    const userPortalUrl = environment;

    await logStep('Step 01: Open the user portal and login');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.commonMethods.unifiedSakaniLogin(sakaniUserId);
    await logStep('Step 02: Navigate to user profile > Click on appeal request');
    await app.marketplaceLandingPage.expandProfileDropDownMenu();
    await app.marketplaceLandingPage.openProfileManagement();
    await app.appealRequestPage.clickOnAppealRequestCard();
    await logStep('Step 03: Select reason > Enter comments > Click on next button');
    await app.appealRequestPage.selectReason();
    await app.appealRequestPage.enterComments(comments);
    await app.appealRequestPage.clickOnNextButton();
    await logStep('Step 04: Upload a copy of national id and family card > Click on send button');
    await app.appealRequestPage.uploadACopyOfNationalId(filePath);
    await app.appealRequestPage.uploadACopyOfFamilyCard(filePath);
    await app.appealRequestPage.clickOnSendButton();
    await app.paymentConfirmationPage.closePayment();
    await app.appealRequestPage.verifyUserSubmitTheRequest();
  });
  test('TC-02 Admin approve the appeal request', { annotation: [{ product: 'Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    await logStep('Step 00: Read data from json relative to the service');
    const environments = readEnvironments();
    const data = readServiceData();
    const app = new WebApp(page);
    const adminUrl = environments.adminPortalUrl;
    const adminUsername = data.adminUsername;
    const adminPassword = data.adminPassword;
    const sakaniUserId = data.sakaniUserId;

    await logStep('Step 01: Login to admin portal');
    await app.adminProjectPage.login(adminUrl, adminUsername, adminPassword);
    await logStep('Step 02: Navigate to the appeals > Search for beneficiary user');
    await app.appealRequestPage.clickOnTheAppeals();
    await app.appealRequestPage.enterBeneficiaryId(sakaniUserId);
    await app.appealRequestPage.clickOnSearchButton();
    await app.appealRequestPage.selectTheSearchedResult();
    await logStep('Step 03: Click on reassign > Select team and user');
    await app.appealRequestPage.clickOnReassignButton();
    await app.appealRequestPage.selectTeam();
    await app.appealRequestPage.selectUser();
    await logStep('Step 04: Click on reassign from popup > Click on confirm > Close popups message');
    await app.appealRequestPage.clickOnReassignButtonFromPopup();
    await app.appealRequestPage.clickOnConfirmButton();
    await app.appealRequestPage.clickOnCloseButtonFromPopup();
    await app.appealRequestPage.clickOnCloseButtonOfNotePopup();
    await logStep('Step 05: Click on approve > Click on confirm > Verify is approved');
    await app.appealRequestPage.clickOnApproveButton();
    await app.appealRequestPage.clickOnConfirmButton();
    await app.appealRequestPage.verifyApprovalPopupMessageIsPresent();
  });
});
