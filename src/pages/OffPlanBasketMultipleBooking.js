'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OffPlanBasketMultipleBookingPage = void 0;
// @ts-nocheck
const ProfileManagementObjects_1 = require('@objects/ProfileManagementObjects');
const { Page, expect } = require('@playwright/test');
class OffPlanBasketMultipleBookingPage {
  constructor(page) {
    this.DEFAULT_TIMEOUT = 30_000;
    this.LONG_TIMEOUT = 90_000;
    this.page = page;
  }
  async clickMyActivities() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.activities).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.activities).click();
  }
  async clickOnBookings() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.bookings).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.bookings).click();
  }
  async clickOnActiveBooking() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.activeBookings).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.activeBookings).click();
  }
  async clickOnCompanyActiveBookings() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.companyActiveBookings).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.companyActiveBookings).click();
  }
  async clickOnNotBilled() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.notBilledButton).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.notBilledButton).click();
  }
  async clickOnReadyForSign() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.readyForSignButton).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.readyForSignButton).click();
  }
  async getUnit1Code() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.unit1Code).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    return this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.unit1Code).textContent();
  }
  async getUnit2Code() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.unit2Code).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    return this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.unit2Code).textContent();
  }
  async clickOnUnit1CheckBox() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.unit1Chckbox).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.unit1Chckbox).click();
  }
  async clickOnUnit2CheckBox() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.unit2CheckBox).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.unit2CheckBox).click();
  }
  async clickOnContinue() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.continueButton).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.continueButton).click();
  }
  async clickOnPayBills() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.payBillsButton).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.payBillsButton).click();
  }
  async isSuccessfulPayment() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.successfulPaymentMessage).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    return await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.successfulPaymentMessage).isVisible();
  }
  async clickOnProjectCheckBox() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.projectCheckBox).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.projectCheckBox).click();
  }
  async clickOnAgreeOnAll() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.agreeOnAll).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.agreeOnAll).click();
  }
  async typeVerifyOtpCode() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.verifyField).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.verifyField).focus();
    await this.page.keyboard.type('1234');
  }
  async clickOnVerify() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.verifyButton).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.verifyButton).click();
  }
  async clickOnAllProjectUnitsToApprove() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.allProjectsRadioButton).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.allProjectsRadioButton).click();
  }
  async isSuccessfulContractSignMessage() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.successfulContractSignMessage).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    return await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.successfulContractSignMessage).isVisible();
  }
  async clickOnCompanies() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.companies).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.companies).click();
  }
  async clickOnCompanyReservations() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.companyReservations).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.companyReservations).click();
  }
  async clickOnShowDetails() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.companyUnitDetailsButton).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.companyUnitDetailsButton).click();
  }
  async clickOnCompanyReservationFeesPayment() {
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.companyPayBillsButton).waitFor({
      state: 'visible',
      timeout: this.DEFAULT_TIMEOUT,
    });
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.companyPayBillsButton).click();
  }
  async getCompanyUnitCode() {
    await this.page.keyboard.press('PageDown');
    await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.unit1Code).waitFor({ state: 'visible', timeout: this.DEFAULT_TIMEOUT });
    return await this.page.locator(ProfileManagementObjects_1.ProfileManagementObjects.unit1Code).textContent();
  }
}
exports.OffPlanBasketMultipleBookingPage = OffPlanBasketMultipleBookingPage;
