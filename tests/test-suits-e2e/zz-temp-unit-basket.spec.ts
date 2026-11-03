// TEMP: runs the last steps again for the non-bene user after the booking fees are paid (Steps 10-13), delete after use
import { test } from '@playwright/test';
import { DataHelper } from '@helpers/DataHelper';
import { completeBookingAfterPayment } from '@helpers/UserBooksAndPaysFlexible';

const SERVICE = 'offPlan-basket-multiple-booking';

test('TEMP Continue the cycle for the non-bene user after the payment', async ({ page }) => {
  test.setTimeout(0);
  await completeBookingAfterPayment(page, SERVICE, DataHelper.readData().services[SERVICE].nonBeneUser);
});
