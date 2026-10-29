'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookingDetailPage = void 0;
const test_1 = require('@playwright/test');
const BasePage_1 = require('./BasePage');
/**
 * Booking detail — `/app/user-profile/my-activities/my-bookings/view-booking/<id>`
 *
 * Shows the created booking (titled by unit code, e.g. "Booking 01-01-0504-999-165")
 * plus a "Steps to complete your booking" tracker with two outstanding stages:
 * Payment method, then Sign contract. The CTA advances to the completion wizard.
 */
class BookingDetailPage extends BasePage_1.BasePage {
  constructor(page, bookingId) {
    super(page);
    this.bookingId = bookingId;
    this.path = `/app/user-profile/my-activities/my-bookings/view-booking/${bookingId}?resourceType=bookings`;
    this.heading = page.getByRole('heading', { name: /^Booking\s/i }).first();
    this.bookingDetailsSection = page.getByRole('heading', { name: /Booking details|تفاصيل الحجز/i });
    this.unitDetailsSection = page.getByRole('heading', { name: /Unit details|تفاصيل الوحدة/i });
    this.stepsSection = page.getByRole('heading', {
      name: /Steps to complete your booking|خطوات إكمال الحجز/i,
    });
    this.paymentMethodStep = page.getByText(/Payment method|طريقة الدفع/i).first();
    this.signContractStep = page.getByText(/Sign contract|توقيع العقد/i).first();
    this.viewUnitDetailsButton = page.getByRole('button', { name: /View unit details/i });
    this.cancelBookingButton = page.getByRole('button', { name: /Cancel booking|إلغاء الحجز/i });
    this.selectPaymentMethodButton = page.getByRole('button', { name: /Select Payment Method/i });
  }
  async open() {
    await this.gotoUntilReady(this.heading);
  }
  async expectLoaded() {
    await (0, test_1.expect)(this.heading).toBeVisible({ timeout: BasePage_1.APP_READY_TIMEOUT });
    await (0, test_1.expect)(this.stepsSection).toBeVisible();
  }
  /** Unit code from the page title, e.g. "01-01-0504-999-165". */
  async unitCode() {
    const text = await this.heading.innerText();
    return text.replace(/^Booking\s*/i, '').trim();
  }
  async goToPaymentMethod() {
    await this.selectPaymentMethodButton.click({ force: true });
    await this.page.waitForURL(/\/view-booking\/\d+\/complete-booking/, {
      waitUntil: 'commit',
      timeout: 120_000,
    });
  }
}
exports.BookingDetailPage = BookingDetailPage;
