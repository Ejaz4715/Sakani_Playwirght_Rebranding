import { expect, test } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { DateUtils } from '@pages/utils/DateUtils';
import { DataHelper } from '@helpers/DataHelper';
import { logStep } from '@helpers/LogSteps';
import path from 'node:path';
import { AdminProjectObjects } from '@objects/AdminProjectsObjects';
import { ServerResponse } from 'node:http';

const SERVICE = 'eligibility-waiver';
const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;
const writeServiceData = (key: string, value: any) => DataHelper.updateServiceData(SERVICE, key, value);

test.describe('Eligibility Waiver', () => {
  test('SAKANI-50124-01 User submit eligibility waiver request', { annotation: [{ product: 'Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const sakaniUserId = data.sakaniUserId;
    const preBeta = environments['preBeta'].userPortalUrl;

    await logStep('Step 01: Navigate to user portal > Login');
    await app.loginPage.gotoHomePage(preBeta);
    await app.commonMethods.unifiedSakaniLogin(sakaniUserId);

    await logStep('Step 02: Navigate to user profile dashboard');
    await app.marketplaceLandingPage.openProfileManagement();

    await logStep('Step 03: Click on eligibility waiver card > Click on next button');
    await app.eligibilityWaiverPage.clickOnWaiveTheEligibilityCard();
    await app.eligibilityWaiverPage.clickOnNextButton();

    await logStep('Step 04: Select waiver assignee > Click on next button');
    await app.eligibilityWaiverPage.clickOnWaiverAssigneeRadioButton();
    await app.eligibilityWaiverPage.clickOnNextButton();

    await logStep('Step 05: Check on agree terms and conditions > Click on submit button');
    await app.eligibilityWaiverPage.checkOnAgreeTermsAndConditions();
    await app.eligibilityWaiverPage.clickOnSubmitButton();

    await logStep('Step 06: Enter otp code > Click on verify button');
    await app.unitBookingPage.enterOtp();
    await app.unitBookingPage.clickOnVerifyButton();

    await logStep('Step 07: Close rating popup is present > Verify the request is submitted');
    await app.eligibilityWaiverPage.clickOnCloseButtonOfRatingPopup();
    await app.eligibilityWaiverPage.verifyTheWaiverRequestIsSubmitted();
  });
  test('SAKANI-50124-02 User undo eligibility waiver request', { annotation: [{ product: 'Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const sakaniUserId = data.sakaniUserId;
    const preBeta = environments['preBeta'].userPortalUrl;

    await logStep('Step 01: Navigate to user portal > Login');
    await app.loginPage.gotoHomePage(preBeta);
    await app.commonMethods.unifiedSakaniLogin(sakaniUserId);

    await logStep('Step 02: Navigate to user profile dashboard');
    await app.marketplaceLandingPage.openProfileManagement();

    await logStep('Step 03: Click on undo eligibility waiver card > Click on next button');
    await app.eligibilityWaiverPage.clickOnUndoTheEligibilityWaiverCard();
    await app.eligibilityWaiverPage.clickOnNextButton();

    await logStep('Step 04: Select undo reason > Click on next button');
    await app.eligibilityWaiverPage.clickOnUndoReasonRadioButton();
    await app.eligibilityWaiverPage.clickOnNextButton();

    await logStep('Step 05: Check on undo waived agreement > Click on submit button');
    await app.eligibilityWaiverPage.checkOnUndoWaivedAgreement();
    await app.eligibilityWaiverPage.clickOnSubmitButton();

    await logStep('Step 06: Enter otp code > Click on verify button');
    await app.unitBookingPage.enterOtp();
    await app.unitBookingPage.clickOnVerifyButton();

    await logStep('Step 07: Close rating popup is present > Verify the undo request is submitted');
    await app.eligibilityWaiverPage.clickOnCloseButtonOfRatingPopup();
    await app.eligibilityWaiverPage.verifyTheUndoWaiverRequestIsSubmitted();
  });
});
