'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReservationManagementFiltersPage = void 0;
const ReservationManagementFiltersObjects_1 = require('@objects/ReservationManagementFiltersObjects');
const DEFAULT_TIMEOUT = 30_000;
const LONG_TIMEOUT = 90_000;
class ReservationManagementFiltersPage {
  constructor(page) {
    this.page = page;
    this.defaultTimeout = 60000;
  }
  async clickOnFilter() {
    await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.filtersButton).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.filtersButton).click();
  }
  async filterUsingAllBookings() {
    await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.allUsers).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.allUsers).click();
  }
  async filterUsingBeneficiaryBookings() {
    await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.beneficiaryUsers).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.beneficiaryUsers).click();
  }
  async filterUsingNonBeneficiaryBookings() {
    await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.nonBeneficiaryUsers).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.nonBeneficiaryUsers).click();
  }
  async isSearchResultTableVisible() {
    await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.searchResultTable).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    return await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.searchResultTable).isVisible();
  }
  async clickOnSearch() {
    await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.searchButton).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.searchButton).click();
  }
  async clickOnIndividualBookingsStatusFilter() {
    await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.IndividualBookingsStatusFilter).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.IndividualBookingsStatusFilter).click();
    await this.page.waitForTimeout(10000);
  }
  async clickOnCompanyBookingsStatusFilter() {
    await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.companyBookingsStatusFilter).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.companyBookingsStatusFilter).click();
    await this.page.waitForTimeout(10000);
  }
  async getIndividualBookingsStatusColumnTexts() {
    const items = this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.allIndividualBookingsStatusesColumn);
    await items.first().waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return (await items.allInnerTexts()).map((t) => t.trim());
  }
  async getCompanyBookingsStatusColumnTexts() {
    const items = this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.allcompanyBookingsStatusesColumn);
    await items.first().waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return (await items.allInnerTexts()).map((t) => t.trim());
  }
  async viewTheFirstBookingDetails() {
    await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.firstBookingDetailsButton).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.firstBookingDetailsButton).click();
  }
  async clickOnBookings() {
    await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.bookingTab).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.bookingTab).click();
  }
  async areBookingDetailsVisible() {
    await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.bookingDetails).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    return await this.page.locator(ReservationManagementFiltersObjects_1.ReservationManagementFiltersObjects.bookingDetails).isVisible();
  }
}
exports.ReservationManagementFiltersPage = ReservationManagementFiltersPage;
