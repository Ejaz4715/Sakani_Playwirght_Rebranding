import { Page } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { DataHelper } from '@helpers/DataHelper';
import { logStep } from '@helpers/LogSteps';

/**
 * Sakani user (the given national ID) logs in to the pre-beta user portal with Nafath.
 */
export async function sakaniUserLogin(page: Page, userId: string) {
  const environments = DataHelper.readData().environments;
  const app = new WebApp(page);

  await logStep('Step 01: Open pre-beta user portal > Login with Nafath as the Sakani user');
  await app.loginPage.gotoHomePage(environments['pre-beta'].userPortalUrl);
  await app.loginPage.openPreBetaLogin();
  await app.loginPage.preBetaLoginWithNafath(userId);
  await app.loginPage.waitForNafathPromptToDisappear();
  await app.loginPage.continuePreBetaNewUserPopup();
  await app.loginPage.handlePushNotificationPopup();
}
