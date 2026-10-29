'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CompleteBookingPage = void 0;
const test_1 = require('@playwright/test');
const BasePage_1 = require('./BasePage');
/**
 * Booking completion wizard —
 * `/app/user-profile/my-activities/my-bookings/view-booking/<id>/complete-booking`
 *
 * Two stages: (1) Payment method, (2) Sign contract.
 *
 * Stage 1 requires two independent selections before "Save&continue" enables:
 * a payment **method** (`input[name=paymentMethod]`, e.g. `#cashRadio`) and a
 * payment **schedule** (`input[name=paymentSchedule]`). Schedules come in two
 * families whose radio values encode the type and id:
 *   `fixed_payment_schedule___<id>` and `flexible_payment_schedule___<id>`.
 *
 * Which methods appear is eligibility-driven — a non-beneficiary, not-eligible
 * account is offered Cash only, with no lending option.
 */
class CompleteBookingPage extends BasePage_1.BasePage {
  constructor(page, bookingId) {
    super(page);
    this.bookingId = bookingId;
    this.path = `/app/user-profile/my-activities/my-bookings/view-booking/${bookingId}/complete-booking`;
    this.heading = page.getByRole('heading', { name: /Complete your booking|إكمال حجزك/i });
    this.stepPaymentMethod = page.getByRole('heading', { name: /Select Payment method/i });
    this.stepSignContract = page.getByText(/Sign contract|توقيع العقد/i).first();
    this.cashRadio = page.locator('#cashRadio');
    this.paymentMethodRadios = page.locator('input[name="paymentMethod"]');
    this.paymentScheduleRadios = page.locator('input[name="paymentSchedule"]');
    this.fixedSchedules = page.locator('input[id^="paymentSchedule___fixed_payment_schedule"]');
    this.flexibleSchedules = page.locator('input[id^="paymentSchedule___flexible_payment_schedule"]');
    this.bookingDetailsButton = page.getByRole('button', { name: /Booking details/i });
    this.saveAndContinueButton = page.getByRole('button', { name: /Save\s*&\s*continue/i });
  }
  async open() {
    await this.gotoUntilReady(this.heading);
  }
  async expectLoaded() {
    await (0, test_1.expect)(this.heading).toBeVisible({ timeout: BasePage_1.APP_READY_TIMEOUT });
    await (0, test_1.expect)(this.stepPaymentMethod).toBeVisible();
    await (0, test_1.expect)(this.paymentScheduleRadios.first()).toBeAttached({ timeout: 60_000 });
  }
  /** Payment methods offered to this account (eligibility-driven). */
  async availablePaymentMethods() {
    return this.paymentMethodRadios.evaluateAll((els) => els.map((e) => e.id).filter(Boolean));
  }
  async paymentScheduleCount() {
    return this.paymentScheduleRadios.count();
  }
  async selectCash() {
    await this.cashRadio.check({ force: true });
    await (0, test_1.expect)(this.cashRadio).toBeChecked();
  }
  /** Select the first payment schedule of the requested family. */
  async selectPaymentSchedule(kind = 'fixed') {
    const radios = kind === 'fixed' ? this.fixedSchedules : this.flexibleSchedules;
    const first = radios.first();
    await (0, test_1.expect)(first, `Expected at least one ${kind} payment schedule`).toBeAttached({
      timeout: 60_000,
    });
    await first.scrollIntoViewIfNeeded();
    await first.check({ force: true });
    await (0, test_1.expect)(first).toBeChecked();
    return first.evaluate((e) => e.value);
  }
  /** Complete stage 1 and advance to the contract-signing stage. */
  async submitPaymentMethod() {
    await (0, test_1.expect)(this.saveAndContinueButton).toBeEnabled({ timeout: 30_000 });
    await this.saveAndContinueButton.scrollIntoViewIfNeeded();
    await this.saveAndContinueButton.click({ force: true });
  }
}
exports.CompleteBookingPage = CompleteBookingPage;
