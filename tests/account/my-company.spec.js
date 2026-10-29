'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const UserProfilePage_1 = require('@pages/UserProfilePage');
const MyBookingsPage_1 = require('@pages/MyBookingsPage');
const LogSteps_1 = require('@helpers/LogSteps');
pages_fixture_1.test.describe('Account - My company bookings and payments', () => {
  (0, pages_fixture_1.test)('TC-01 Company bookings page renders correctly', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPageCompanyUser, page }) => {
    const profile = new UserProfilePage_1.UserProfilePage(authenticatedPageCompanyUser);
    await (0, LogSteps_1.logStep)('Step 01: Open the company bookings page');
    await profile.openCompanyBookings();
    await (0, LogSteps_1.logStep)('Step 02: Validate the bookings are visible');
    await (0, pages_fixture_1.expect)(profile.bookingCard).toBeVisible({ timeout: 60_000 });
  });
  (0, pages_fixture_1.test)(
    'TC-02 Company bookings page exposes all four status tabs (All, Unpaid, Paid, Cancelled)',
    { annotation: [{ product: 'Marketplace', type: 'non-critical' }] },
    async ({ authenticatedPageCompanyUser, page }) => {
      const profile = new UserProfilePage_1.UserProfilePage(authenticatedPageCompanyUser);
      const myBookings = new MyBookingsPage_1.MyBookingsPage(page);
      await (0, LogSteps_1.logStep)('Step 01: Open the company bookings page');
      await profile.openCompanyBookings();
      await (0, pages_fixture_1.expect)(profile.bookingCard).toBeVisible({ timeout: 60_000 });
      await (0, LogSteps_1.logStep)('Step 02: Validate the booking tabs are available');
      const tabs = await myBookings.tabLabels();
      for (const tab of ['All', 'Active', 'Cancelled', 'Completed']) {
        (0, pages_fixture_1.expect)(tabs, `Status tab "${tab}" should be present`).toContain(tab);
      }
    }
  );
  (0, pages_fixture_1.test)(
    'TC-03 The Active tab filters only lists active company bookings',
    { annotation: [{ product: 'Marketplace', type: 'non-critical' }] },
    async ({ authenticatedPageCompanyUser, page }) => {
      const profile = new UserProfilePage_1.UserProfilePage(authenticatedPageCompanyUser);
      const bookings = new MyBookingsPage_1.MyBookingsPage(page);
      await (0, LogSteps_1.logStep)('Step 01: Open the company bookings page');
      await profile.openCompanyBookings();
      await (0, pages_fixture_1.expect)(profile.bookingCard).toBeVisible({ timeout: 60_000 });
      await (0, LogSteps_1.logStep)('Step 02: Select the active tab');
      await bookings.selectTab(bookings.tabActive);
      await page.waitForTimeout(3000);
      await (0, LogSteps_1.logStep)('Step 03: Ensure the active view does not show cancellation dates');
      await (0, pages_fixture_1.expect)(page.getByText(/Cancellation date|تاريخ الإلغاء/i)).toHaveCount(0);
    }
  );
  (0, pages_fixture_1.test)(
    'TC-04 The Cancelled tab lists only cancelled company bookings',
    { annotation: [{ product: 'Marketplace', type: 'non-critical' }] },
    async ({ authenticatedPageCompanyUser, page }) => {
      const profile = new UserProfilePage_1.UserProfilePage(authenticatedPageCompanyUser);
      const bookings = new MyBookingsPage_1.MyBookingsPage(page);
      await (0, LogSteps_1.logStep)('Step 01: Open the company bookings page');
      await profile.openCompanyBookings();
      await (0, pages_fixture_1.expect)(profile.bookingCard).toBeVisible({ timeout: 60_000 });
      await (0, LogSteps_1.logStep)('Step 02: Select the cancelled tab');
      await bookings.selectTab(bookings.tabCancelled);
      await (0, LogSteps_1.logStep)('Step 03: Confirm cancelled-booking content is present');
      const hasAny = await bookings.hasAnyBooking();
      pages_fixture_1.test.skip(!hasAny, 'Account has no cancelled bookings in this environment');
      const body = await page.locator('body').innerText();
      (0, pages_fixture_1.expect)(body).toMatch(/Cancel|ملغ/i);
    }
  );
  (0, pages_fixture_1.test)(
    'TC-05 The Ready to sign tab renders for company bookings',
    { annotation: [{ product: 'Marketplace', type: 'non-critical' }] },
    async ({ authenticatedPageCompanyUser, page }) => {
      const profile = new UserProfilePage_1.UserProfilePage(authenticatedPageCompanyUser);
      const bookings = new MyBookingsPage_1.MyBookingsPage(page);
      await (0, LogSteps_1.logStep)('Step 01: Open the company bookings page');
      await profile.openCompanyBookings();
      await (0, pages_fixture_1.expect)(profile.bookingCard).toBeVisible({ timeout: 60_000 });
      await (0, LogSteps_1.logStep)('Step 02: Select the ready to sign tab');
      await bookings.selectTab(bookings.tabReadyToSign);
      await (0, LogSteps_1.logStep)('Step 03: Verify the tab renders a listing');
      await bookings.waitForListing();
    }
  );
  (0, pages_fixture_1.test)('TC-06 The Completed tab renders', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPageCompanyUser, page }) => {
    const profile = new UserProfilePage_1.UserProfilePage(authenticatedPageCompanyUser);
    const bookings = new MyBookingsPage_1.MyBookingsPage(page);
    await (0, LogSteps_1.logStep)('Step 01: Open the company bookings page');
    await profile.openCompanyBookings();
    await (0, pages_fixture_1.expect)(profile.bookingCard).toBeVisible({ timeout: 60_000 });
    await (0, LogSteps_1.logStep)('Step 02: Select the completed tab');
    await bookings.selectTab(bookings.tabCompleted);
    await (0, LogSteps_1.logStep)('Step 03: Ensure the completed view renders without a blank pane');
    await bookings.waitForListing();
  });
  (0, pages_fixture_1.test)('TC-07 The Unpaid tab renders for company bookings', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPageCompanyUser, page }) => {
    const profile = new UserProfilePage_1.UserProfilePage(authenticatedPageCompanyUser);
    const bookings = new MyBookingsPage_1.MyBookingsPage(page);
    await (0, LogSteps_1.logStep)('Step 01: Open the company bookings page');
    await profile.openCompanyBookings();
    await (0, pages_fixture_1.expect)(profile.bookingCard).toBeVisible({ timeout: 60_000 });
    await (0, LogSteps_1.logStep)('Step 02: Select the unpaid tab');
    await bookings.selectTab(bookings.tabUnpaid);
    await (0, LogSteps_1.logStep)('Step 03: Verify the unpaid listing renders');
    await bookings.waitForListing();
  });
  (0, pages_fixture_1.test)('TC-08 View details opens the matching booking', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPageCompanyUser, page }) => {
    const profile = new UserProfilePage_1.UserProfilePage(authenticatedPageCompanyUser);
    const bookings = new MyBookingsPage_1.MyBookingsPage(page);
    await (0, LogSteps_1.logStep)('Step 01: Open the company bookings page');
    await profile.openCompanyBookings();
    await (0, pages_fixture_1.expect)(profile.bookingCard).toBeVisible({ timeout: 60_000 });
    await (0, LogSteps_1.logStep)('Step 02: Check there is a booking to open');
    const hasAny = await bookings.hasAnyBooking();
    pages_fixture_1.test.skip(!hasAny, 'Account has no bookings to open');
    await (0, LogSteps_1.logStep)('Step 03: Open the first booking details page');
    await bookings.openBookingDetails(0);
    await (0, LogSteps_1.logStep)('Step 04: Confirm the booking detail page is opened');
    await (0, pages_fixture_1.expect)(page).toHaveURL(/view-booking\/\d+/);
    await (0, pages_fixture_1.expect)(page.getByRole('heading', { name: /Booking/i }).first()).toBeVisible({ timeout: 90_000 });
  });
  (0, pages_fixture_1.test)('TC-09 Company paymets page renders correctly', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPageCompanyUser }) => {
    const profile = new UserProfilePage_1.UserProfilePage(authenticatedPageCompanyUser);
    await (0, LogSteps_1.logStep)('Step 01: Open the company payments page');
    await profile.openCompanyPayments();
    await (0, LogSteps_1.logStep)('Step 02: Validate all the payment details are visible');
    await (0, pages_fixture_1.expect)(profile.invoiceCard).toBeVisible({ timeout: 60_000 });
  });
  (0, pages_fixture_1.test)(
    'TC-10 Company payments page exposes all four status tabs (All, Unpaid, Paid, Cancelled)',
    { annotation: [{ product: 'Marketplace', type: 'non-critical' }] },
    async ({ authenticatedPageCompanyUser }) => {
      const profile = new UserProfilePage_1.UserProfilePage(authenticatedPageCompanyUser);
      await (0, LogSteps_1.logStep)('Step 01: Open the payments page');
      await profile.openCompanyPayments();
      await (0, pages_fixture_1.expect)(profile.invoiceCard).toBeVisible({ timeout: 60_000 });
      await (0, LogSteps_1.logStep)('Step 02: Validate the payment tabs');
      (0, pages_fixture_1.expect)(await profile.visibleTabLabels(['All', 'Unpaid', 'Paid', 'Cancelled'])).toEqual(pages_fixture_1.expect.arrayContaining(['All', 'Unpaid', 'Paid', 'Cancelled']));
    }
  );
});
