import { Page, test } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { logStep } from '@helpers/LogSteps';
import { DataHelper } from '@helpers/DataHelper';

const SERVICE = 'unit-model-card-favorites';
const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;

test.describe('Unit model card favorites', () => {
  let app: WebApp;
  let userPortalUrl: string;

  // Common steps for both test cases: read data > login > search for the project > open units
  async function loginAndOpenProjectUnits(page: Page) {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environment = readEnvironments();
    const projectName = data.projectName;
    userPortalUrl = environment['pre-beta'].userPortalUrl;
    app = new WebApp(page);

    await logStep('Step 01: Login with the configured Sakani user');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.loginPage.openPreBetaLogin();
    await app.loginPage.preBetaLoginWithNafath(data.sakaniUserId);
    await app.loginPage.waitForNafathPromptToDisappear();
    await app.loginPage.continuePreBetaNewUserPopup();
    await app.loginPage.handlePushNotificationPopup();

    await logStep('Step 02: Search for the project > Open units');
    await app.favoritesPage.searchAndOpenProject(projectName);
    await app.favoritesPage.openProjectUnitsTab();
  }

  test('TC-01 Add a unit to favorites and verify it is listed in the user favorites', { annotation: [{ product: 'Sakani _Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    await loginAndOpenProjectUnits(page);
    await logStep('Step 03: Add the first unit to favorites');
    const unitName = await app.favoritesPage.markFirstUnitAsFavorite();

    await logStep('Step 04: Back to the home page > Open profile > Favorites');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.favoritesPage.openFavoritesFromProfileMenu();

    await logStep('Step 05: Verify the favorite icon and unit name are displayed');
    await app.favoritesPage.verifyUnitInFavorites(unitName);
  });

  test('TC-02 Verify user can Unfavorite a Unit Model card on the Project page', { annotation: [{ product: 'Sakani _Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    await loginAndOpenProjectUnits(page);

    await logStep('Step 03: Click the heart on the first unit to add it to favorites (heart turns red)');
    await app.favoritesPage.markFirstUnitAsFavorite();

    await logStep('Step 04: Click the red heart again to unfavorite the unit');
    const unitName = await app.favoritesPage.markFirstUnitAsUnfavorite();

    await logStep('Step 05: Back to the home page > Open profile > Favorites');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.favoritesPage.openFavoritesFromProfileMenu();

    await logStep('Step 06: Verify the unit is no longer listed in favorites');
    await app.favoritesPage.verifyUnitNotInFavorites(unitName);
  });

  test('TC-03 Verify user can Unfavorite a Unit Model from the unit details page', { annotation: [{ product: 'Sakani _Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    await loginAndOpenProjectUnits(page);

    await logStep('Step 03: Click the heart on the first unit to add it to favorites (heart turns red)');
    await app.favoritesPage.markFirstUnitAsFavorite();

    await logStep('Step 04: Click on the unit to open its details page');
    await app.favoritesPage.openFirstUnitDetails();

    await logStep('Step 05: Verify the favorite icon on the unit details page is already red');
    await app.favoritesPage.verifyUnitDetailsFavoriteIconIsRed();

    await logStep('Step 06: Click the red favorite icon to unfavorite the unit');
    await app.favoritesPage.unfavoriteUnitFromDetailsPage();
  });

  test(
    'TC-04 Verify guest (logged-out) user is prompted to log in when tapping Favorite on a Unit Model',
    { annotation: [{ product: 'Sakani _Rebranding', type: 'critical' }] as any },
    async ({ page }) => {
      await logStep('Step 00: Read data from json relative to the service');
      const data = readServiceData();
      userPortalUrl = readEnvironments()['pre-beta'].userPortalUrl;
      app = new WebApp(page);

      await logStep('Step 01: Open the home page without login');
      await app.loginPage.gotoHomePage(userPortalUrl);

      await logStep('Step 02: Search for the project > Open units');
      await app.favoritesPage.searchAndOpenProject(data.projectName);
      await app.favoritesPage.openProjectUnitsTab();

      await logStep('Step 03: Accept cookies > Click the heart on the first unit as a guest');
      await app.loginPage.acceptPreBetaCookies();
      await app.favoritesPage.clickFirstUnitFavoriteAsGuest();

      await logStep('Step 04: Verify the login page is displayed');
      await app.loginPage.verifyPreBetaLoginPageDisplayed();
    }
  );
});
