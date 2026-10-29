'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DashboardViewPage = void 0;
const DashboardViewObjects_1 = require('@objects/DashboardViewObjects');
let DEFAULT_TIMEOUT = 30_000;
class DashboardViewPage {
  constructor(page) {
    this.page = page;
  }
  async clickOnDashboardView() {
    const dashboardView = this.page.getByRole(DashboardViewObjects_1.DashboardViewObjects.dashboardViewLink.role, { name: DashboardViewObjects_1.DashboardViewObjects.dashboardViewLink.name });
    await dashboardView.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await dashboardView.click();
    await this.page.waitForTimeout(3000);
  }
  async clickOnBookingCard() {
    const bookingCard = this.page.locator(DashboardViewObjects_1.DashboardViewObjects.bookingViewCard);
    await bookingCard.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await bookingCard.click();
    await this.page.waitForTimeout(3000);
  }
  async clickOnTheProjectsCard() {
    const bookingCard = this.page.locator(DashboardViewObjects_1.DashboardViewObjects.theProjectsViewCard);
    await bookingCard.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await bookingCard.click();
    await this.page.waitForTimeout(3000);
  }
  async clickOnProjectsCard() {
    const bookingCard = this.page.locator(DashboardViewObjects_1.DashboardViewObjects.projectsViewCard);
    await bookingCard.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await bookingCard.click();
    await this.page.waitForTimeout(3000);
  }
  async clickOnUpdatedBookings() {
    const updatedBookingCard = this.page.locator(DashboardViewObjects_1.DashboardViewObjects.updatedBookingCard);
    await updatedBookingCard.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await updatedBookingCard.click();
    await this.page.waitForTimeout(3000);
  }
  async clickOnPayCard() {
    const payCardView = this.page.locator(DashboardViewObjects_1.DashboardViewObjects.payCard);
    await payCardView.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await payCardView.click();
    await this.page.waitForTimeout(3000);
  }
  async areAllDashboardViewElementsVisible() {
    const allDashboardView = this.page.locator(DashboardViewObjects_1.DashboardViewObjects.allDashboardViewElements);
    await allDashboardView.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await allDashboardView.isVisible();
  }
  async areAllReservationsElementsVisible() {
    const reservationView = this.page.locator(DashboardViewObjects_1.DashboardViewObjects.appReservationTable);
    await reservationView.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await reservationView.isVisible();
  }
  async areAllProjectsVisible() {
    const projectsView = this.page.locator(DashboardViewObjects_1.DashboardViewObjects.appProjectsView);
    await projectsView.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await projectsView.isVisible();
  }
  async areAllBookingsPaymentVisible() {
    const bookingPayments = this.page.locator(DashboardViewObjects_1.DashboardViewObjects.allBookingPaymentView);
    await bookingPayments.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await bookingPayments.isVisible();
  }
  async areAllUpdatedBookingsVisible() {
    const updatedBookings = this.page.locator(DashboardViewObjects_1.DashboardViewObjects.updatedBookingsTable);
    await updatedBookings.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await updatedBookings.isVisible();
  }
}
exports.DashboardViewPage = DashboardViewPage;
