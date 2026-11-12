import { test } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { logStep } from '@helpers/LogSteps';
import { DataHelper } from '@helpers/DataHelper';
import path from 'node:path';

const SERVICE = 'appeal-request_Documents';
const PreBeta = 'preBeta';
const readServiceData = () => DataHelper.readData().services[SERVICE];
DataHelper.readData().environments[PreBeta].userPortalUrl;
const readEnvironments = () => DataHelper.readData().environments;
const filePath = path.join(process.cwd(), 'src', 'data', 'Sample pdf.pdf');
test.describe('Appeal multible Documents Request', () => {
  test('TC-01 Admin approve the appeal request', { annotation: [{ product: 'Rebranding', type: 'critical' }] as any }, async ({ page }) => {
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
    await app.appealRequestPage.clickOnReassignButtonFromPopup();
    await app.appealRequestPage.clickOnConfirmButton();
    await app.appealRequestPage.clickOnCloseButtonFromPopup();
    await app.appealRequestPage.clickOnCloseButtonOfNotePopup();

    await logStep('Step 04: Click on Required Documents > Select the required documents > verify the confirm document request popup and verify reason for ineligibility label');
    await app.AppealRequestPageDocumentsPage.RequiredDocumentsButton();
    await app.AppealRequestPageDocumentsPage.VerifyRequerdDocumentsPopup();
    await app.AppealRequestPageDocumentsPage.verifyIneligibilityReasonLabel();
    await app.AppealRequestPageDocumentsPage.ClickonDropdownPlaceholder();
    await app.AppealRequestPageDocumentsPage.ClickonFamilyOwnedHomeMessage();
    await app.AppealRequestPageDocumentsPage.ClickonMultiDropdownPlaceholder();
    await app.AppealRequestPageDocumentsPage.ClickonNationalIdCopyLabel();
    await app.AppealRequestPageDocumentsPage.ClickonMultiSelectInput();
    await app.AppealRequestPageDocumentsPage.ClickonDeedCopyOption();
    await app.AppealRequestPageDocumentsPage.ClickonMultiSelectInput();
    await app.AppealRequestPageDocumentsPage.ClickonInheritanceDeedLabel();
    await app.AppealRequestPageDocumentsPage.ClickonAbsherBeneficiaryLabel();
    await app.AppealRequestPageDocumentsPage.ClickonAddAndFollowButton();
    await app.AppealRequestPageDocumentsPage.VerifyCloseButton();
    await app.AppealRequestPageDocumentsPage.ClickonSubmitRequestButton();

    await logStep('Step 05: Verify the confirm document request popup && verify the cancel button');
    await app.AppealRequestPageDocumentsPage.VerifyConfirmDocumentRequestHeading();
    await app.AppealRequestPageDocumentsPage.verifyCancelButtonpopup();
    await app.AppealRequestPageDocumentsPage.clickonconfirmbuttonfordocumentationpopup();
    await app.AppealRequestPageDocumentsPage.ClickonClosePopupButton();
    await app.AppealRequestPageDocumentsPage.ClickonClosePopupButton();
    await app.AppealRequestPageDocumentsPage.ClickonClosePopupButton();
  });
  test('TC-02 Verify that uploud Document from sakni >> Reject request from admin', { annotation: [{ product: 'Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const userId = data.sakaniUserId;
    const preBeta = environments.preBeta.userPortalUrl;

    await logStep('Step 01: Open the user portal and login');
    await app.loginPage.gotoHomePage(preBeta);
    await app.commonMethods.unifiedSakaniLogin(userId);
    await logStep('Step 02: Open the profile management > click on the documents alert > click on upload documents');
    await app.AppealRequestPageDocumentsPage.VerifyonDocumentsAlert();
    await app.AppealRequestPageDocumentsPage.ClickonUploadDocumentsButton();
    await logStep('Step 03: Upload a copy of national id and family card > Click on send button');
    await app.AppealRequestPageDocumentsPage.uploadACopyOfNationalId(filePath);
    await app.AppealRequestPageDocumentsPage.uploadACopyOfAbsherBeneficiary(filePath);
    await app.AppealRequestPageDocumentsPage.clickonsendRequestButton();

    await logStep('Step 03: Login to admin portal>>appeles>>aerch gor user>>click on rejected button ');
    const adminUsername = data.adminUsername;
    const adminPassword = data.adminPassword;
    const adminUrl = environments.adminPortalUrl;
    await app.adminProjectPage.login(adminUrl, adminUsername, adminPassword);
    await logStep('Step 04: Navigate to the appeals > Search for beneficiary user');
    await app.appealRequestPage.clickOnTheAppeals();
    await app.appealRequestPage.enterBeneficiaryId(userId);
    await app.appealRequestPage.clickOnSearchButton();
    await app.appealRequestPage.selectTheSearchedResult();
    await logStep('Step 05: Click on reject button>>insert the reason for rejection>>click on add and follow button');
    await app.AppealRequestPageDocumentsPage.clickonrejectButton();
    await app.AppealRequestPageDocumentsPage.verifyRejectionReasonHeading();
    await app.AppealRequestPageDocumentsPage.ClickonDropdownPlaceholder();
    await app.AppealRequestPageDocumentsPage.ClickonFamilyOwnedHomeMessage();
    await app.AppealRequestPageDocumentsPage.ClickonMultiDropdownPlaceholder();
    await app.AppealRequestPageDocumentsPage.ClickonNationalIdCopyLabel();
    await app.AppealRequestPageDocumentsPage.verifyObjectionrejiction();
    await app.AppealRequestPageDocumentsPage.inserttextrejectionreason('رفض');
    await app.AppealRequestPageDocumentsPage.ClickonAddAndFollowButton();
  });
});
