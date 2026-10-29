'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.MyBookingsPage = void 0;
const test_1 = require('@playwright/test');
const BasePage_1 = require('./BasePage');
/** Match a status tab however it happens to be rendered. */
function tabLocator(page, name) {
  return page.getByRole('link', { name }).or(page.getByRole('tab', { name })).or(page.getByRole('button', { name })).or(page.getByText(name)).first();
}
/**
 * My Bookings — `/app/user-profile/my-activities/my-bookings/listing`
 *
 * Status-tabbed listing of every booking the account has made. Each card shows
 * product type, unit type, unit code, booking or cancellation date, and the
 * booking fee where one applies.
 */
class MyBookingsPage extends BasePage_1.BasePage {
  constructor(page) {
    super(page);
    this.path = '/app/user-profile/my-activities/my-bookings/listing';
    this.heading = page.getByRole('heading', { name: /My bookings|حجوزاتي/i });
    this.bookingCards = page.locator('[class*="booking-card"], .card').filter({
      hasText: /Product type|نوع المنتج/i,
    });
    // The status tabs are not reliably exposed as links — depending on the
    // render they are anchors, `role=tab` elements or plain text nodes — so each
    // is matched across all three, mirroring `ActivitiesPage.tab()`.
    this.tabAll = tabLocator(page, /^\s*(All|الكل)\s*$/);
    this.tabActive = tabLocator(page, /^\s*(Active|نشط)\s*$/);
    this.tabCancelled = tabLocator(page, /^\s*(Cancelled|ملغي)\s*$/);
    this.tabCompleted = tabLocator(page, /^\s*(Completed|مكتمل)\s*$/);
    this.tabUnpaid = tabLocator(page, /^\s*(Unpaid|غير مدفوع)\s*$/);
    this.tabReadyToSign = tabLocator(page, /^\s*(Ready to sign|جاهز للتوقيع)\s*$/);
  }
  async open() {
    await this.gotoUntilReady(this.heading);
  }
  async expectLoaded() {
    await (0, test_1.expect)(this.heading).toBeVisible({ timeout: BasePage_1.APP_READY_TIMEOUT });
    await this.waitForListing();
  }
  /**
   * Block until the listing has actually hydrated.
   *
   * The heading renders well before `/beneficiary/me/bookings` resolves, so
   * asserting on card content immediately after the heading races the fetch.
   * Resolves on either a populated list or the empty state.
   */
  async waitForListing(timeout = 90_000) {
    await test_1.expect
      .poll(() => this.listingState(), {
        timeout,
        message: 'My bookings listing never settled',
      })
      .not.toBe('loading');
  }
  /**
   * Whether the current tab shows bookings, an empty state, or is still loading.
   *
   * Read from the rendered text rather than a single empty-state string: each
   * status tab words its own "nothing here" message differently, so matching one
   * phrase leaves the other tabs hanging until timeout.
   */
  async listingState() {
    return this.page.evaluate(() => {
      const text = (document.body.innerText || '').replace(/\s+/g, ' ');
      if (/Product type|نوع المنتج/i.test(text)) return 'populated';
      if (/no .{0,40}(booking|found|yet)|don['’]t have any|لا توجد|لا يوجد/i.test(text)) {
        return 'empty';
      }
      return 'loading';
    });
  }
  /** True when the account has at least one booking in the current tab. */
  async hasAnyBooking() {
    return this.page
      .getByText(/Product type|نوع المنتج/i)
      .first()
      .isVisible()
      .catch(() => false);
  }
  async tabLabels() {
    return this.page.evaluate(() =>
      [...document.querySelectorAll('a')]
        .map((a) => (a.textContent ?? '').replace(/\s+/g, ' ').trim())
        .filter((t) => ['All', 'Active', 'Cancelled', 'Completed', 'Unpaid', 'Ready to sign'].includes(t))
    );
  }
  async selectTab(tab) {
    await tab.scrollIntoViewIfNeeded().catch(() => {});
    await tab.click({ force: true });
    await this.waitForListing();
  }
  /** True when a card for the given unit code is listed. */
  async hasBookingForUnit(unitCode) {
    return this.page
      .getByText(unitCode, { exact: false })
      .first()
      .isVisible()
      .catch(() => false);
  }
  /**
   * Number of bookings listed in the current tab.
   *
   * Counted from the "Product type" label each card carries, because the card
   * container class is shared with unrelated layout wrappers.
   */
  async bookingCount() {
    return this.page.getByText(/Product type|نوع المنتج/i).count();
  }
  async openBookingDetails(index = 0) {
    await this.page
      .getByRole('button', { name: /View details/i })
      .nth(index)
      .click({ force: true });
    await this.page.waitForURL(/view-booking\/\d+/, { waitUntil: 'commit', timeout: 120_000 });
  }
}
exports.MyBookingsPage = MyBookingsPage;
