import { test } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { logStep } from '@helpers/LogSteps';
import { DataHelper } from '@helpers/DataHelper';

const SERVICE = 'business-landing-page';
const env = 'preBeta';
const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironment = () => DataHelper.readData().environments[env].userPortalUrl;

test.describe('Business Landing Page', () => {
  test('TC-01 User navigates to business landing page', { annotation: [{ product: 'Rebranding', type: 'non-critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environment = readEnvironment();
    const app = new WebApp(page);
    const userId = data.userId;
    const userPortalUrl = environment;

    await logStep('Step 01: Open the user portal and login');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.commonMethods.unifiedSakaniLogin(userId);

    await logStep('Step 02: Switch to business role and verify the business landing page is present');
    await app.businessLandingPage.switchToBusinessRole();
    await app.businessLandingPage.verifyBusinessLandingPageIsPresent();
  });

  test('TC-02-Verify user view business roles components services are present in tab menu', { annotation: [{ product: 'Rebranding', type: 'non-critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environment = readEnvironment();
    const app = new WebApp(page);
    const userId = data.userId;
    const userPortalUrl = environment;

    await logStep('Step 01: Open the user portal and login');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.commonMethods.unifiedSakaniLogin(userId);
    await logStep('Step 02: Switch to business role and verify the business roles components services are present in tab menu');
    await app.businessLandingPage.switchToBusinessRole();
    await app.businessLandingPage.verifyBusinessRolesComponentsArePresentInTabMenu();
  });

  /** ------------- Incomplete due to open bug ------------- */
  test('TC-03-Verify user navigate to all real states services based on the icon image role', { annotation: [{ product: 'Rebranding', type: 'non-critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environment = readEnvironment();
    const app = new WebApp(page);
    const userId = data.userId;
    const userPortalUrl = environment;

    await logStep('Step 01: Open the user portal and login');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.commonMethods.unifiedSakaniLogin(userId);

    await logStep('Step 02: Switch to business role and click on real estate analysis image button and verify it navigate');
    await app.businessLandingPage.switchToBusinessRole();
    await app.businessLandingPage.clickOnRealEstateAnalysisImageButton();
    ///////////////////////////////////////////////////

    await logStep('Step 03: Switch to business role and click on real estate developer image button and verify it navigate');
    await app.businessLandingPage.clickOnRealEstateDeveloperImageButton();
    ///////////////////////////////////////////////////

    await logStep('Step 04: Switch to business role and click on real estate broker image button and verify it navigate');
    await app.businessLandingPage.clickOnRealEstateBrokerImageButton();
    //////////////////////////////////////////////////////////////////////////////
  });

  /** ------------- Incomplete due to open bug ------------- */
  test('TC-04-Verify user navigate to all real states services from tab menu', { annotation: [{ product: 'Rebranding', type: 'non-critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environment = readEnvironment();
    const app = new WebApp(page);
    const userId = data.userId;
    const userPortalUrl = environment;

    await logStep('Step 01: Open the user portal and login');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.commonMethods.unifiedSakaniLogin(userId);

    await logStep('Step 02: Switch to business role and click on real estate analysis tab button');
    await app.businessLandingPage.switchToBusinessRole();
    await app.businessLandingPage.clickOnRealEstateAnalysisTabButton();

    await logStep('Step 03: Click on explore digitar for data analyst button and verify it navigate');
    await app.businessLandingPage.clickOnExploreDigitarForDataAnalystButton();

    await logStep('Step 04: Click on real estate developer tab button');
    await app.businessLandingPage.clickOnRealEstateDeveloperTabButton();

    await logStep('Step 05: Click on explore digitar for real estate developer button and verify it navigate');
    await app.businessLandingPage.clickOnExploreDigitarForRealEstateDeveloperButton();

    await logStep('Step 06: Click on real estate broker tab button');
    await app.businessLandingPage.clickOnRealEstateBrokerTabButton();

    await logStep('Step 07: Click on explore digitar for broker button and verify it navigate');
    await app.businessLandingPage.clickOnExploreDigitarForBrokerButton();
  });

  test('TC-05-Verify user switch en/ar languages', { annotation: [{ product: 'Rebranding', type: 'non-critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environment = readEnvironment();
    const app = new WebApp(page);
    const userId = data.userId;
    const userPortalUrl = environment;

    await logStep('Step 01: Open the user portal and login');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.commonMethods.unifiedSakaniLogin(userId);

    await logStep('Step 02: Switch to business role and click on english language button');
    await app.businessLandingPage.switchToBusinessRole();
    await app.businessLandingPage.clickOnEnglishLanguageButton();

    await logStep('Step 03: Verify switch to english language');
    await app.businessLandingPage.verifySwitchToEnglishLanguage();

    await logStep('Step 04: Click on arabic language button');
    await app.businessLandingPage.clickOnArabicLanguageButton();

    await logStep('Step 05: Verify switch to arabic language');
    await app.businessLandingPage.verifySwitchToArabicLanguage();
  });

  test('TC-06-Verify user can not view user profile only the user name will be visible', { annotation: [{ product: 'Rebranding', type: 'non-critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environment = readEnvironment();
    const app = new WebApp(page);
    const userId = data.userId;
    const userPortalUrl = environment;

    await logStep('Step 01: Open the user portal and login');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.commonMethods.unifiedSakaniLogin(userId);

    await logStep('Step 02: Switch to business role and click on user profile button and verify the user can not view user profile only the user name will be visible');
    await app.businessLandingPage.switchToBusinessRole();
    await app.businessLandingPage.clickOnBusinessUserIconButton();
    await app.businessLandingPage.verifySwitchToIndividualRoleIsPresent();
  });
});
