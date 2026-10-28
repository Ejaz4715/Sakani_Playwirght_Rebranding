import { Page, test } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { logStep } from '@helpers/LogSteps';
import { DataHelper } from '@helpers/DataHelper';

const SERVICE = 'register-interest-filters';
const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;

test.describe('Register Interest - Filters', () => {
  let app: WebApp;
  let userPortalUrl: string;

  // Common steps for the test cases: read data > login
  async function login(page: Page) {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environment = readEnvironments();
    userPortalUrl = environment['pre-beta'].userPortalUrl;
    app = new WebApp(page);

    await logStep('Step 01: Login with the configured Sakani user');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.loginPage.openPreBetaLogin();
    await app.loginPage.preBetaLoginWithNafath(data.sakaniUserId);
    await app.loginPage.waitForNafathPromptToDisappear();
    await app.loginPage.continuePreBetaNewUserPopup();
    await app.loginPage.handlePushNotificationPopup();
  }

  test('TC-01 favorites - Filters', { annotation: [{ product: 'Sakani _Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    await login(page);

    await logStep('Step 02: Open profile dropdown > المفضلة');
    await app.favoritesPage.openFavoritesFromProfileMenu();

    await logStep('Step 03: Filter الوجهات > Verify empty message or items');
    await app.webProfilePage.clickDestinationsTab();
    await app.webProfilePage.verifyEmptyMessageOrItemsDisplayed();

    await logStep('Step 04: Filter المشاريع > Verify empty message or items');
    await app.webProfilePage.clickProjectsTab();
    await app.webProfilePage.verifyEmptyMessageOrItemsDisplayed();

    await logStep('Step 05: Filter طرازات الوحدات > Verify empty message or items');
    await app.webProfilePage.clickUnitModelsTab();
    await app.webProfilePage.verifyEmptyMessageOrItemsDisplayed();

    await logStep('Step 06: Filter الوحدات > Verify empty message or items');
    await app.webProfilePage.clickUnitsTab();
    await app.webProfilePage.verifyEmptyMessageOrItemsDisplayed();

    await logStep('Step 07: Filter الخدمات > Verify empty message or items');
    await app.webProfilePage.clickServicesTab();
    await app.webProfilePage.verifyEmptyMessageOrItemsDisplayed();
  });

  test('TC-02 Register Interest - Filters', { annotation: [{ product: 'Sakani _Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    await login(page);
    await logStep('Step 02: Open profile dropdown > المفضلة');
    await app.favoritesPage.openFavoritesFromProfileMenu();

    await logStep('Step 03: navigate to التفضيلات');
    await app.webProfilePage.navigateToPreferences();

    await logStep('Step 04: Open تم تسجيل الاهتمام');
    await app.webProfilePage.navigateToInterestRegistered();

    await logStep('Step 05: Filter الوجهات > Verify empty message or items');
    await app.webProfilePage.clickInterestedDestinationsTab();
    await app.webProfilePage.verifyNoInterestedItemsMessageOrItemsDisplayed();

    await logStep('Step 06: Filter الوسطاء العقاريين > Verify empty message or items');
    await app.webProfilePage.clickRealEstateBrokersTab();
    await app.webProfilePage.verifyNoInterestedItemsMessageOrItemsDisplayed();

    await logStep('Step 07: Filter المشاريع > Verify empty message or items');
    await app.webProfilePage.clickInterestedProjectsTab();
    await app.webProfilePage.verifyNoInterestedItemsMessageOrItemsDisplayed();

    await logStep('Step 08: Filter المطورون > Verify empty message or items');
    await app.webProfilePage.clickDevelopersTab();
    await app.webProfilePage.verifyNoInterestedItemsMessageOrItemsDisplayed();
    await logStep('Step 09: Filter الخدمات > Verify empty message or items');
    await app.webProfilePage.clickServicesTab();
    await app.webProfilePage.verifyNoInterestedItemsMessageOrItemsDisplayed();
  });

  test('TC-03 Waiting list management - Filters', { annotation: [{ product: 'Sakani _Rebranding', type: 'critical' }] as any }, async ({ page }) => {
    await login(page);

    await logStep('Step 02: Open profile dropdown > المفضلة');
    await app.favoritesPage.openFavoritesFromProfileMenu();
    await logStep('Step 03: Open أنشطتي');
    await app.webProfilePage.navigateToMyActivities();

    await logStep('Step 04: Open قائمة الانتظار المسجل بها');
    await app.webProfilePage.navigateToinregisteredWaitingList();

    await logStep('Step 05: Filter نشطة > Verify empty message or items');
    await app.webProfilePage.clickWaitingListActiveTab();
    await app.webProfilePage.verifyNoActiveWaitingListMessageOrItemsDisplayed();

    await logStep('Step 06: Filter ملغاة > Verify empty message or items');
    await app.webProfilePage.clickWaitingListCancelledTab();
    await app.webProfilePage.verifyNoCancelledWaitingListMessageOrItemsDisplayed();
  });
});
