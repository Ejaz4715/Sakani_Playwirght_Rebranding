'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserProfilePage = void 0;
const test_1 = require('@playwright/test');
const BasePage_1 = require('./BasePage');
const testData_1 = require('@data/testData');
/**
 * The account portal's non-Activities pages
 * (`/app/user-profile/...`: dashboard, my information, wallet, financial
 * advisory, payments, favorites, registered interests).
 *
 * These pages share one shell — left navigation, a page heading and a tabbed
 * content area — so a single page object covers them, with a small named
 * locator per page for the controls that differ. Splitting them into seven
 * classes would duplicate the shell handling without adding clarity.
 *
 * The left navigation is built from Angular routerLinks with **no `href`**, so
 * the pages are opened by direct URL rather than by clicking the sidebar. That
 * also keeps each test independent.
 */
class UserProfilePage extends BasePage_1.BasePage {
  constructor(page) {
    super(page);
    this.path = testData_1.PROFILE_ROUTES.dashboard;
    this.notifications = page.locator("//span[normalize-space() = 'Notifications']");
    this.notificationsCentre = page.getByText('Notification centre');
    this.sidebar = page.getByText('Dashboard', { exact: true }).first();
    this.startServiceButton = page.getByRole('button', { name: /Start service/i });
    this.profileHeading = page.getByRole('heading', { name: /^\s*Profile\s*$/i });
    this.verifyEmailButton = page.getByRole('button', { name: /Verify Email|تأكيد البريد/i });
    this.updateContactButton = page.getByRole('button', {
      name: /Update contact information|تحديث بيانات التواصل/i,
    });
    this.walletHeading = page.getByRole('heading', { name: /^\s*Wallet\s*$/i });
    // Currency prefix: the app renders balances as "SAR 827,670" while its form
    // inputs still use the older "SR 0" placeholder style. `SA?R` matches both,
    // so the locator survives whichever surface it is pointed at.
    this.walletBalance = page.getByRole('heading', { name: /^\s*SA?R\s*[\d,.]+\s*$/ }).first();
    this.withdrawButton = page.getByRole('button', { name: /^\s*(Withdraw|سحب)\s*$/i });
    this.balanceTab = page
      .getByRole('button', { name: /Balance & Transactions/i })
      .or(page.getByText('Balance & Transactions', { exact: true }))
      .first();
    this.bankAccountTab = page
      .getByRole('button', { name: /Bank account/i })
      .or(page.getByText('Bank account', { exact: true }))
      .first();
    this.advisoryHeading = page.getByRole('heading', { name: /Financial Advisory/i });
    this.updateFinancialInfoButton = page.getByRole('button', {
      name: /Update my financial information/i,
    });
    this.overviewTab = page.getByText('Overview', { exact: true }).first();
    this.financingRequestsTab = page.getByText('Financing Requests', { exact: true }).first();
    this.paymentsHeading = page.getByRole('heading', { name: /Payments and transactions/i });
    this.previewInvoiceButton = page.getByRole('button', { name: /Preview invoice/i });
    this.previewReceiptButton = page.getByRole('button', { name: /Preview receipt/i });
    this.favoritesHeading = page.getByRole('heading', { name: /^\s*Favorites\s*$/i });
    this.registeredInterestsHeading = page.getByRole('heading', { name: /Registered interests/i });
    this.exploreMarketplaceButton = page
      .getByRole('button', {
        name: /Explore Marketplace/i,
      })
      .or(page.getByRole('link', { name: /Explore Marketplace/i }))
      .first();
    this.companyBookingsHeading = page.getByRole('heading', { name: /Company Bookings/i });
    this.companyPaymentsHeading = page.getByRole('heading', { name: /Company Payments/i });
    this.bookingCard = page.locator('//app-booking-card-v5').first();
    this.invoiceCard = page.locator('//app-invoice-card-v5').first();
  }
  /** Open one of the profile routes and wait for its own readiness signal. */
  async openRoute(route, ready) {
    this.path = route;
    await this.gotoUntilReady(ready, route);
  }
  async openNotifications() {
    await this.notifications.click();
  }
  async expectNotificationsCentreVisible() {
    await (0, test_1.expect)(this.notificationsCentre).toBeVisible({ timeout: 20000 });
  }
  async openDashboard() {
    await this.openRoute(testData_1.PROFILE_ROUTES.dashboard, this.startServiceButton.first());
  }
  async openMyInformation() {
    await this.openRoute(testData_1.PROFILE_ROUTES.myInformation, this.profileHeading);
  }
  async openWallet() {
    await this.openRoute(testData_1.PROFILE_ROUTES.wallet, this.walletHeading);
  }
  async openFinancialAdvisory() {
    await this.openRoute(testData_1.PROFILE_ROUTES.financialAdvisory, this.advisoryHeading);
  }
  async openPayments() {
    await this.openRoute(testData_1.PROFILE_ROUTES.payments, this.paymentsHeading);
  }
  async openFavorites() {
    await this.openRoute(testData_1.PROFILE_ROUTES.favorites, this.favoritesHeading);
  }
  async openRegisteredInterests() {
    await this.openRoute(testData_1.PROFILE_ROUTES.registeredInterests, this.registeredInterestsHeading);
  }
  async openCompanyBookings() {
    await this.openRoute(testData_1.PROFILE_ROUTES.companyBookings, this.companyBookingsHeading);
  }
  async openCompanyPayments() {
    await this.openRoute(testData_1.PROFILE_ROUTES.companyPayments, this.companyPaymentsHeading);
  }
  /** A status/section tab by visible label, within any profile page. */
  tab(label) {
    const pattern = new RegExp(`^\\s*${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`);
    return this.page
      .getByRole('link', { name: pattern })
      .or(this.page.getByRole('button', { name: pattern }))
      .or(this.page.getByText(pattern))
      .first();
  }
  /** Labels from the given set that are actually rendered. */
  async visibleTabLabels(expected) {
    return this.page.evaluate(
      (labels) => {
        const visible = (e) => {
          const r = e.getBoundingClientRect();
          return r.width > 0 && r.height > 0;
        };
        const found = [...document.querySelectorAll('a, button, li, [role="tab"]')].filter(visible).map((e) => (e.textContent ?? '').replace(/\s+/g, ' ').trim());
        return labels.filter((l) => found.includes(l));
      },
      [...expected]
    );
  }
  /** Every left-navigation label currently rendered. */
  async sidebarLabels() {
    return this.page.evaluate(() => {
      const visible = (e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      };
      const known = ['Dashboard', 'My information', 'My Wallet', 'Financial Advisory', 'Activities', 'Preferences', 'Payment and transactions', 'Favorites', 'Help & support', 'Logout'];
      const found = [...document.querySelectorAll('a, li, button')].filter(visible).map((e) => (e.textContent ?? '').replace(/\s+/g, ' ').trim());
      return known.filter((k) => found.includes(k));
    });
  }
  async expectHeading(heading) {
    await (0, test_1.expect)(heading).toBeVisible({ timeout: BasePage_1.APP_READY_TIMEOUT });
  }
}
exports.UserProfilePage = UserProfilePage;
