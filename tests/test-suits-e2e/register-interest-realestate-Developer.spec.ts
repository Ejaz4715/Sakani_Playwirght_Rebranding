import { test, expect } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { logStep } from '@helpers/LogSteps';
import { DataHelper } from '@helpers/DataHelper';

const readEnvironments = () => DataHelper.readData().environments;

test.describe('Register Interest as a Real estate Developer', () => {
  test('SAK-2120-01 Verify that the user can submit the form successfully with valid data from Sakani', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    await logStep('Step 00: Read data from json relative to the service');
    const environment = readEnvironments();
    const app = new WebApp(page);
    const userPortalUrl = environment.userPortalUrl;

    await logStep('Step 01: Navigate to user portal');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.loginPage.acceptCookies();

    await logStep('Step 01: Navigate to DeveloperTap>RegisterLink');
    await app.registerInterestasaRealEstateDeveloperPage.ClikondeveloperTabButton();
    await app.registerInterestasaRealEstateDeveloperPage.ClickonregisterInterestLink();

    await logStep('Step 01: Faill RegisterForminformation');

    await app.registerInterestasaRealEstateDeveloperPage.InsertdeveloperName('دوكتور تيست');
    await app.registerInterestasaRealEstateDeveloperPage.InsertPhonenumber('509404040');
    await app.registerInterestasaRealEstateDeveloperPage.InsertapplicantName('دوكتور تيست');
    await app.registerInterestasaRealEstateDeveloperPage.selectprojectinfo();
    await app.registerInterestasaRealEstateDeveloperPage.Inserttotalprojectnumber('5');
    await app.registerInterestasaRealEstateDeveloperPage.Insertunitnumber('500');
    await app.registerInterestasaRealEstateDeveloperPage.SubmitButtion();
    await app.registerInterestasaRealEstateDeveloperPage.VerifypiSucessfullymassage();
  });
  test('SAK-2120-02 Verify that the user can submit the form successfully with valid data from partners', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    await logStep('Step 00: Read data from json relative to the service');
    const environment = readEnvironments();
    const app = new WebApp(page);
    const sapaPartiner = environment.sapaPartiner;

    await logStep('Step 01: Navigate to user portal');
    await app.loginPage.gotoHomePage(sapaPartiner);

    await logStep('Step 01: Navigate to Developer Section');
    await app.registerInterestasaRealEstateDeveloperPage.NavigatetoDevelopersSection();

    await logStep('Step 01: Faill Register Formi Section');
    await app.registerInterestasaRealEstateDeveloperPage.InsertpideveloperName('دوكتور testtt');
    await app.registerInterestasaRealEstateDeveloperPage.InsertpiPhonenumber('509405040');
    await app.registerInterestasaRealEstateDeveloperPage.InsertpiapplicantName('test تيست');
    await app.registerInterestasaRealEstateDeveloperPage.selectpiprojectinfo();
    await app.registerInterestasaRealEstateDeveloperPage.Inserttotalpiprojectnumber('4');
    await app.registerInterestasaRealEstateDeveloperPage.Insertpiunitnumber('555');
    await app.registerInterestasaRealEstateDeveloperPage.SubmitpiButtion();
    await app.registerInterestasaRealEstateDeveloperPage.VerifypiSucessfullymassage();
  });
});
