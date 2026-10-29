'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookingSummaryPage = void 0;
const test_1 = require('@playwright/test');
const BasePage_1 = require('./BasePage');
const testData_1 = require('@data/testData');
/**
 * Booking summary — `/app/booking/v2/offplan/booking-summary`
 *
 * Step 1 of 3 in the comprehensive off-plan journey. Read-only review of the
 * reserved unit (project, developer, block/building/apartment/floor) and the
 * booking terms (project type, property type, non-subsidised vs subsidised
 * price), with Back and Confirm Booking.
 *
 * Reaching this page means the unit is already soft-reserved via
 * `POST /mainIntermediaryApi/v4/units/reserve`.
 */
class BookingSummaryPage extends BasePage_1.BasePage {
  constructor(page) {
    super(page);
    this.path = '/app/booking/v2/offplan/booking-summary';
    this.heading = page.getByRole('heading', { name: /Booking summary|ملخص الحجز/i });
    this.unitDetailsSection = page.getByRole('heading', { name: /Units details|تفاصيل الوحدة/i });
    this.bookingDetailsSection = page.getByRole('heading', { name: /Booking details|تفاصيل الحجز/i });
    this.projectNameLabel = page.getByText(/^\s*(Project name|اسم المشروع)\s*$/i).first();
    this.backButton = page.getByRole('button', { name: /^\s*(Back|رجوع)\s*$/ });
    this.confirmBookingButton = page.getByRole('button', { name: /Confirm Booking|تأكيد الحجز/i });
  }
  /**
   * The page chrome — heading and Confirm button — renders before the summary's
   * key/value rows arrive, so waiting on those alone lets a caller read the
   * page while the detail block is still empty. The "Project name" row is the
   * first of the real content and is therefore the readiness signal.
   */
  async expectLoaded() {
    await (0, test_1.expect)(this.page).toHaveURL(/\/app\/booking\/v2\/offplan\/booking-summary/, {
      timeout: BasePage_1.APP_READY_TIMEOUT,
    });
    await (0, test_1.expect)(this.heading).toBeVisible({ timeout: BasePage_1.APP_READY_TIMEOUT });
    await (0, test_1.expect)(this.projectNameLabel).toBeVisible({ timeout: BasePage_1.APP_READY_TIMEOUT });
    await (0, test_1.expect)(this.confirmBookingButton).toBeEnabled();
  }
  /** Key/value pairs rendered in the summary, for assertions on the reserved unit. */
  async summaryText() {
    await (0, test_1.expect)(this.projectNameLabel).toBeVisible({ timeout: BasePage_1.APP_READY_TIMEOUT });
    return this.page.locator('body').innerText();
  }
  /**
   * Confirm the booking and return the created booking id.
   *
   * Asserts the create call succeeded rather than trusting the redirect alone,
   * so a silent backend failure fails the test at the right step.
   */
  async confirmBooking() {
    const responsePromise = this.page.waitForResponse((r) => r.request().method() === 'POST' && new URL(r.url()).pathname.endsWith(testData_1.API.createBooking) && r.status() !== 202, {
      timeout: 120_000,
    });
    await this.confirmBookingButton.scrollIntoViewIfNeeded();
    await this.confirmBookingButton.click({ force: true });
    const response = await responsePromise;
    (0, test_1.expect)(response.ok(), `Booking API failed with HTTP ${response.status()}`).toBeTruthy();
    await this.page.waitForURL(/\/app\/booking\/v2\/offplan\/success\/\d+/, {
      waitUntil: 'commit',
      timeout: 120_000,
    });
    const match = this.page.url().match(/success\/(\d+)/);
    (0, test_1.expect)(match, 'Expected a booking id in the success URL').toBeTruthy();
    return match[1];
  }
}
exports.BookingSummaryPage = BookingSummaryPage;
