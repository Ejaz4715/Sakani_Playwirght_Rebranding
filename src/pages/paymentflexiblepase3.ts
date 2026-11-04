import { expect, Locator, Page } from '@playwright/test';
import { PaymentFlexiblePhase3Objects } from '@objects/PaymentFlexiblePhase3Objects';
import { FavoritesObjects } from '@objects/FavoritesObjects';

const DEFAULT_TIMEOUT = 90_000;

// Flexible payment phase 3: Sakani (pre-beta) user and company user booking steps
export class PaymentFlexiblePhase3Page {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async click(locator: Locator) {
    await expect(locator).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await locator.click();
  }

  // Profile > حجوزاتي, the click can be ignored while the page is still loading, so retry until the bookings page is opened
  async openMyBookingsFromProfileMenu() {
    const profileButton = this.page.getByRole(FavoritesObjects.profileButton.role, { name: FavoritesObjects.profileButton.name }).first();
    const myBookingsButton = this.page.getByRole(PaymentFlexiblePhase3Objects.myBookingsButton.role, { name: PaymentFlexiblePhase3Objects.myBookingsButton.name });
    await this.page.waitForLoadState('load');

    await expect(async () => {
      if (!(await myBookingsButton.isVisible())) {
        await this.click(profileButton);
      }
      await myBookingsButton.click({ timeout: 10000 });
      await this.page.waitForURL(PaymentFlexiblePhase3Objects.myBookingsUrl, { timeout: 15000 });
    }).toPass({ timeout: 120000 });
  }

  // Company user: profile > حجوزاتي > الشركات > حجوزات الشركة
  async openCompanyBookingsFromProfileMenu() {
    await this.openMyBookingsFromProfileMenu();

    const companiesMenuItem = this.page.getByText(PaymentFlexiblePhase3Objects.companiesMenuItem.text, { exact: true }).first();
    const companyBookingsMenuItem = this.page.getByText(PaymentFlexiblePhase3Objects.companyBookingsMenuItem.text, { exact: true }).first();
    await this.page.waitForLoadState('networkidle', { timeout: 60000 }).catch(() => {});

    // The side menu can be clicked before the bookings page finishes loading and do nothing (the personal bookings stay open), so retry until the company bookings page opens
    await expect(async () => {
      if (!(await companyBookingsMenuItem.isVisible())) {
        await companiesMenuItem.click({ timeout: 10000 });
      }
      await companyBookingsMenuItem.click({ timeout: 10000 });
      await this.page.waitForURL(PaymentFlexiblePhase3Objects.companyBookingsUrl, { timeout: 15000 });
    }).toPass({ timeout: 120000 });
    await this.page.waitForLoadState('networkidle', { timeout: 60000 }).catch(() => {});
  }

  // Reads the unit code from the booking details heading (الحجز لوحدة رقم 01-01-0799-6-102)
  async getUnitCodeFromBookingDetails() {
    const bookedUnitHeading = this.page.getByRole('heading', { name: PaymentFlexiblePhase3Objects.bookedUnitHeading }).first();
    await expect(bookedUnitHeading).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    const headingText = await bookedUnitHeading.innerText();
    return headingText.replace(PaymentFlexiblePhase3Objects.bookedUnitHeading, '').trim();
  }

  // Booking details > ادفع رسوم الحجز > ادفع الرسوم
  async payBookingFeesFromBookingDetails() {
    const payBookingFeesLink = this.page.getByRole(PaymentFlexiblePhase3Objects.payBookingFeesLink.role, { name: PaymentFlexiblePhase3Objects.payBookingFeesLink.name });
    await this.click(payBookingFeesLink);

    const payFeesButton = this.page.getByRole(PaymentFlexiblePhase3Objects.payFeesButton.role, { name: PaymentFlexiblePhase3Objects.payFeesButton.name });
    await this.click(payFeesButton);
  }

  // Wait on the payment callback page until it is fully loaded (the payment is processed), before going back to Sakani
  async waitForPaymentSuccess() {
    await this.page.waitForURL(PaymentFlexiblePhase3Objects.paymentSuccessCallbackUrl, { timeout: 120000 });
    await this.page.waitForLoadState('load', { timeout: 120000 });
    await this.page.waitForLoadState('networkidle', { timeout: 60000 }).catch(() => {});
  }

  // After paying the booking fees, اختر طريقة الدفع is displayed only when the booking status is updated (it can take some minutes),
  // so refresh the booking details until it is displayed (up to 10 times x 30 seconds), then click it
  async openSelectPaymentMethod() {
    const selectPaymentMethodLink = this.page.getByRole(PaymentFlexiblePhase3Objects.selectPaymentMethodLink.role, { name: PaymentFlexiblePhase3Objects.selectPaymentMethodLink.name });
    for (let attempt = 1; attempt <= 10; attempt++) {
      const isDisplayed = await selectPaymentMethodLink
        .waitFor({ state: 'visible', timeout: 30000 })
        .then(() => true)
        .catch(() => false);
      if (isDisplayed) {
        break;
      }
      await this.page.reload();
    }
    await this.click(selectPaymentMethodLink);
  }

  // Selects the schedule with the saved name, or the first displayed schedule when the saved name is from another run
  async selectPaymentSchedule(scheduleTitle: string) {
    const paymentScheduleCards = this.page.locator(PaymentFlexiblePhase3Objects.paymentScheduleCard);
    await expect(paymentScheduleCards.first()).toBeVisible({ timeout: DEFAULT_TIMEOUT });

    const scheduleByTitle = paymentScheduleCards.filter({ hasText: scheduleTitle });
    const paymentScheduleCard = (await scheduleByTitle.count()) > 0 ? scheduleByTitle : paymentScheduleCards;
    await this.click(paymentScheduleCard.locator('label').first());
  }

  async clickSaveAndContinueButton() {
    const saveAndContinueButton = this.page.getByRole(PaymentFlexiblePhase3Objects.saveAndContinueButton.role, { name: PaymentFlexiblePhase3Objects.saveAndContinueButton.name });
    await this.click(saveAndContinueButton);
  }

  // Company booking details > توقيع العقد
  async openSignContractFromBookingDetails() {
    const signContractLink = this.page.getByRole(PaymentFlexiblePhase3Objects.signContractLink.role, { name: PaymentFlexiblePhase3Objects.signContractLink.name });
    await this.click(signContractLink);
  }

  async verifyContractSigned() {
    await expect(this.page.getByText(PaymentFlexiblePhase3Objects.contractSignedText.text, { exact: true }).first()).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  }

  // The booking details show the جدول الدفع section after the payment schedule is selected and the contract is signed
  async verifyPaymentScheduleDisplayed() {
    const paymentScheduleHeading = this.page.getByRole(PaymentFlexiblePhase3Objects.paymentScheduleHeading.role, { name: PaymentFlexiblePhase3Objects.paymentScheduleHeading.name });
    await expect(paymentScheduleHeading.first()).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  }
}
