// TEMP: runs only the final step of TC-03: the developer confirms the company booking (unit saved in companyUnitCode), delete after use
import { test } from '@playwright/test';
import { developerConfirmsCompanyBooking } from '@helpers/CompanyBooking';

test('TEMP Developer confirms the company booking', async ({ page }) => {
  test.setTimeout(0);
  await developerConfirmsCompanyBooking(page, 'offPlan-basket-multiple-booking');
});
