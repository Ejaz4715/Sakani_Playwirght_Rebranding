import { Page } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { DataHelper } from '@helpers/DataHelper';
import { logStep } from '@helpers/LogSteps';
import { sakaniUserLogin } from '@helpers/SakaniUserLogin';

/**
 * Sakani user logs in to pre-beta > books a unit on the given project > pays the booking fees > selects the flexible payment schedule
 * > signs the sales contract > verifies the payment schedule table, using the given service's data.
 */
export async function bookUnitAndVerifyStatus(page: Page, service: string, userId: string, projectName: string) {
  const data = DataHelper.readData().services[service];
  const environments = DataHelper.readData().environments;
  const app = new WebApp(page);

  await sakaniUserLogin(page, userId);

  await logStep('Step 02: Search for the project > Open units');
  await app.favoritesPage.searchAndOpenProject(projectName);
  await app.favoritesPage.openProjectUnitsTab();

  await logStep('Step 03: Open the first unit model (new tab) > Open the first unit that has احجز وحدة (new tab)');
  const unitModelTab = await app.bookingPage.openFirstUnitModelInNewTab();
  const unitTab = await new WebApp(unitModelTab).bookingPage.openFirstBookableUnitInNewTab();
  const unitApp = new WebApp(unitTab);

  await logStep('Step 04: Click احجز وحدة > Click نعم if the other request message is displayed');
  await unitApp.bookingPage.clickBookUnitButton();
  await unitApp.bookingPage.confirmOtherRequestIfDisplayed();

  await logStep('Step 05: Accept the terms and conditions > موافقة واستمرار > دفع رسوم الحجز');
  await unitApp.bookingPage.acceptTermsAndConditions();
  await unitApp.bookingAndSelectPaymentMethodPage.clickOnApproveAndContinueIfVisible();
  await unitApp.bookingPage.clickPayBookingFeesButton();

  await logStep('Step 06: Verify the payment amount and the invoice summary on the checkout page');
  await unitApp.bookingPage.verifyPaymentAmountOnCheckout(data.beneBookingFeesOnCheckout);

  await logStep('Step 07: Profile > حجوزاتي > Open the booking details');
  await app.bookingPage.openMyBookingsFromProfileMenu();
  await app.bookingPage.openBookingDetails();

  await logStep('Step 08: Verify the booking fees in the booking details');
  await app.bookingPage.verifyBookingFeesInBookingDetails(data.beneBookingFees);

  await payAndCompleteBooking(page, service, userId);
}

/**
 * Sakani user (bene or non-bene) logs in to pre-beta and completes the booking that the developer made for them:
 * حجوزاتي > booking details > pay the booking fees > select the flexible payment schedule > sign the sales contract > verify the payment schedule table.
 */
export async function completeDeveloperBooking(page: Page, service: string, userId: string) {
  const app = new WebApp(page);

  await sakaniUserLogin(page, userId);

  await logStep('Step 02: Profile > حجوزاتي > Open the booking details');
  await app.bookingPage.openMyBookingsFromProfileMenu();
  await app.bookingPage.openBookingDetails();

  await payAndCompleteBooking(page, service, userId);
}

// Back to Sakani (pre-beta): open it, refresh the page and login again when the session is lost
export async function backToSakani(page: Page, userId: string) {
  const environments = DataHelper.readData().environments;
  const app = new WebApp(page);

  await app.loginPage.gotoHomePage(environments['pre-beta'].userPortalUrl);
  await page.reload();
  if (await app.loginPage.isPreBetaLoggedOut()) {
    await sakaniUserLogin(page, userId);
  }
}

// From the opened booking details: pay the booking fees > select the flexible payment schedule > sign the sales contract > verify the payment schedule table
async function payAndCompleteBooking(page: Page, service: string, userId: string) {
  const app = new WebApp(page);

  await logStep('Step 09: ادفع رسوم الحجز > ادفع الرسوم > Pay by mada card');
  await app.bookingPage.payBookingFeesFromBookingDetails();
  await app.paymentGatewayPage.fillCardDetails();
  await app.bookingPage.waitForPaymentSuccess();

  await completeBookingAfterPayment(page, service, userId);
}

/**
 * After the booking fees are paid: back to pre-beta > حجوزاتي > booking details > select the flexible payment schedule
 * > sign the sales contract > verify the payment schedule table.
 */
export async function completeBookingAfterPayment(page: Page, service: string, userId: string) {
  const data = DataHelper.readData().services[service];
  const app = new WebApp(page);

  await logStep('Step 10: Back to pre-beta > Refresh > Login again if needed > حجوزاتي > Open the booking details');
  await backToSakani(page, userId);
  await app.bookingPage.openMyBookingsFromProfileMenu();
  await app.bookingPage.openBookingDetails();

  // Known issue: the booking fees are paid but the booking status is updated after some minutes,
  // so refresh the booking details until اختر طريقة الدفع is displayed (10 times x 30 seconds)
  let isSelectPaymentMethodDisplayed = await app.bookingPage.isSelectPaymentMethodDisplayed();
  for (let attempt = 1; !isSelectPaymentMethodDisplayed && attempt <= 10; attempt++) {
    await page.reload();
    isSelectPaymentMethodDisplayed = await app.bookingPage.isSelectPaymentMethodDisplayed();
  }
  if (!isSelectPaymentMethodDisplayed) {
    await logStep('Step 11-13 skipped: اختر طريقة الدفع is not displayed because the booking status is not updated after paying the booking fees (known issue)');
    return;
  }

  await logStep('Step 11: اختر طريقة الدفع > Select the flexible payment schedule > حفظ ومتابعة');
  await app.bookingPage.openSelectPaymentMethod();
  await app.bookingPage.selectPaymentSchedule(data.scheduleTitleAr);
  await app.bookingPage.clickSaveAndContinueButton();

  // حفظ ومتابعة opens the sales contract directly, then اعتماد
  await logStep('Step 12: اعتماد > OTP > تحقق');
  await app.bookingPage.signSalesContract();

  // The page can show خطأ تقني after signing while the cycle is done, so go back to Sakani normally
  await logStep('Step 13: Back to pre-beta > Refresh > Login again if needed > حجوزاتي > Open the booking details > Verify the payment schedule table is displayed and has records');
  await backToSakani(page, userId);
  await app.bookingPage.openMyBookingsFromProfileMenu();
  await app.bookingPage.openBookingDetails();
  await app.bookingPage.verifyPaymentScheduleTableHasRecords();
}
