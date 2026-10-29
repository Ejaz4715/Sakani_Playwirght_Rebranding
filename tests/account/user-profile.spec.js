'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const UserProfilePage_1 = require('@pages/UserProfilePage');
const testData_1 = require('@data/testData');
const LogSteps_1 = require('@helpers/LogSteps');
pages_fixture_1.test.describe('Account - profile page', () => {
  (0, pages_fixture_1.test)('TC-01 Dashboard renders for the authenticated user', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const profile = new UserProfilePage_1.UserProfilePage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the user dashboard');
    await profile.openDashboard();
    await (0, LogSteps_1.logStep)('Step 02: Validate the dashboard route and start CTA');
    await (0, pages_fixture_1.expect)(authenticatedPage).toHaveURL(/\/user-profile\/dashboard/);
    await (0, pages_fixture_1.expect)(profile.startServiceButton.first()).toBeVisible();
  });
  (0, pages_fixture_1.test)('TC-02 User profile sidebar exposes every top-level area', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const profile = new UserProfilePage_1.UserProfilePage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the dashboard and inspect the sidebar');
    await profile.openDashboard();
    await (0, LogSteps_1.logStep)('Step 02: Confirm the expected sidebar labels are exposed');
    const labels = await profile.sidebarLabels();
    (0, pages_fixture_1.expect)(labels).toEqual(
      pages_fixture_1.expect.arrayContaining(['Dashboard', 'My information', 'My Wallet', 'Financial Advisory', 'Activities', 'Preferences', 'Payment and transactions', 'Favorites'])
    );
  });
  (0, pages_fixture_1.test)('TC-03 My information shows the user profile and its actions', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const profile = new UserProfilePage_1.UserProfilePage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the my information page');
    await profile.openMyInformation();
    await (0, LogSteps_1.logStep)('Step 02: Validate the profile heading and action controls');
    await (0, pages_fixture_1.expect)(profile.profileHeading).toBeVisible();
    await (0, pages_fixture_1.expect)(profile.verifyEmailButton.first()).toBeVisible();
    await (0, pages_fixture_1.expect)(profile.updateContactButton.first()).toBeVisible();
  });
  (0, pages_fixture_1.test)('TC-04 User national ID is not exposed in full', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const profile = new UserProfilePage_1.UserProfilePage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the my information page');
    await profile.openMyInformation();
    await (0, LogSteps_1.logStep)('Step 02: Check the profile content does not expose the full national ID');
    const body = await authenticatedPage.locator('body').innerText();
    (0, pages_fixture_1.expect)(body, 'Plain national ID should be masked').not.toContain('1000011485');
  });
  (0, pages_fixture_1.test)(
    'TC-05 Wallet shows a balance and both tabs (Balance & Transactions, Bank account)',
    { annotation: [{ product: 'Marketplace', type: 'non-critical' }] },
    async ({ authenticatedPage }) => {
      const profile = new UserProfilePage_1.UserProfilePage(authenticatedPage);
      await (0, LogSteps_1.logStep)('Step 01: Open the wallet page');
      await profile.openWallet();
      await (0, LogSteps_1.logStep)('Step 02: Validate wallet balance and tab set');
      await (0, pages_fixture_1.expect)(profile.walletHeading).toBeVisible();
      await (0, pages_fixture_1.expect)(profile.walletBalance).toBeVisible();
      await (0, pages_fixture_1.expect)(await profile.visibleTabLabels(['Balance & Transactions', 'Bank account'])).toEqual(
        pages_fixture_1.expect.arrayContaining(['Balance & Transactions', 'Bank account'])
      );
    }
  );
  (0, pages_fixture_1.test)('TC-06 Wallet transactions list renders correctly', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const profile = new UserProfilePage_1.UserProfilePage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the wallet page');
    await profile.openWallet();
    await (0, LogSteps_1.logStep)('Step 02: Verify the transactions heading is visible');
    await (0, pages_fixture_1.expect)(authenticatedPage.getByRole('heading', { name: /Transactions/i }).first()).toBeVisible({ timeout: 60_000 });
  });
  (0, pages_fixture_1.test)('TC-07 The bank account tab opens', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const profile = new UserProfilePage_1.UserProfilePage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the wallet page');
    await profile.openWallet();
    await (0, LogSteps_1.logStep)('Step 02: Open the bank account tab');
    await profile.bankAccountTab.click({ force: true });
    await (0, LogSteps_1.logStep)('Step 03: Verify the bank account content is rendered');
    await (0, pages_fixture_1.expect)(authenticatedPage.getByText(/IBAN|bank|إضافة|account/i).first()).toBeVisible({ timeout: 60_000 });
  });
  (0, pages_fixture_1.test)(
    'TC-08 Financial advisory shows the profile and both tabs (Overview, Financing Requests)',
    { annotation: [{ product: 'Marketplace', type: 'non-critical' }] },
    async ({ authenticatedPage }) => {
      const profile = new UserProfilePage_1.UserProfilePage(authenticatedPage);
      await (0, LogSteps_1.logStep)('Step 01: Open the financial advisory page');
      await profile.openFinancialAdvisory();
      await (0, LogSteps_1.logStep)('Step 02: Validate the advisory heading, action, and tabs');
      await (0, pages_fixture_1.expect)(profile.advisoryHeading.first()).toBeVisible();
      await (0, pages_fixture_1.expect)(profile.updateFinancialInfoButton.first()).toBeVisible();
      (0, pages_fixture_1.expect)(await profile.visibleTabLabels(['Overview', 'Financing Requests'])).toEqual(pages_fixture_1.expect.arrayContaining(['Overview', 'Financing Requests']));
    }
  );
  (0, pages_fixture_1.test)('TC-09 Financing requests tab opens', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const profile = new UserProfilePage_1.UserProfilePage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the financial advisory page');
    await profile.openFinancialAdvisory();
    await (0, LogSteps_1.logStep)('Step 02: Open the financing requests tab');
    await profile.financingRequestsTab.click({ force: true });
    await (0, LogSteps_1.logStep)('Step 03: Confirm the page remains visible');
    await (0, pages_fixture_1.expect)(profile.advisoryHeading.first()).toBeVisible();
  });
  (0, pages_fixture_1.test)(
    'TC-10 Payments page exposes all four status tabs (All, Unpaid, Paid, Cancelled)',
    { annotation: [{ product: 'Marketplace', type: 'non-critical' }] },
    async ({ authenticatedPage }) => {
      const profile = new UserProfilePage_1.UserProfilePage(authenticatedPage);
      await (0, LogSteps_1.logStep)('Step 01: Open the payments page');
      await profile.openPayments();
      await (0, LogSteps_1.logStep)('Step 02: Validate the payment tabs');
      (0, pages_fixture_1.expect)(await profile.visibleTabLabels(['All', 'Unpaid', 'Paid', 'Cancelled'])).toEqual(pages_fixture_1.expect.arrayContaining(['All', 'Unpaid', 'Paid', 'Cancelled']));
    }
  );
  (0, pages_fixture_1.test)('TC-11 An invoice can be previewed from the payments list', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const profile = new UserProfilePage_1.UserProfilePage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the payments page');
    await profile.openPayments();
    await (0, LogSteps_1.logStep)('Step 02: Check whether an invoice is available to preview');
    const invoice = profile.previewInvoiceButton.first();
    const hasInvoice = await invoice.isVisible().catch(() => false);
    pages_fixture_1.test.skip(!hasInvoice, 'Fixture account has no invoice to preview in this environment');
    await (0, LogSteps_1.logStep)('Step 03: Ensure the invoice preview action is enabled');
    await (0, pages_fixture_1.expect)(invoice).toBeEnabled();
  });
  (0, pages_fixture_1.test)('TC-12 Pagination controls are disabled on the first page', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const profile = new UserProfilePage_1.UserProfilePage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the payments list');
    await profile.openPayments();
    await (0, LogSteps_1.logStep)('Step 02: Inspect the first-page pagination controls');
    const first = authenticatedPage.getByRole('button', { name: /^\s*First\s*$/i }).first();
    const hasPaging = await first.isVisible().catch(() => false);
    pages_fixture_1.test.skip(!hasPaging, 'Not enough transactions to paginate');
    await (0, LogSteps_1.logStep)('Step 03: Confirm the first page action is disabled');
    await (0, pages_fixture_1.expect)(first).toBeDisabled();
  });
  (0, pages_fixture_1.test)(
    'TC-13 Favorites exposes all five category tabs (All, Destinations, Projects, Units, Services)',
    { annotation: [{ product: 'Marketplace', type: 'non-critical' }] },
    async ({ authenticatedPage }) => {
      const profile = new UserProfilePage_1.UserProfilePage(authenticatedPage);
      await (0, LogSteps_1.logStep)('Step 01: Open the favorites page');
      await profile.openFavorites();
      await (0, LogSteps_1.logStep)('Step 02: Validate the favorites tabs');
      (0, pages_fixture_1.expect)(await profile.visibleTabLabels(['All', 'Destinations', 'Projects', 'Units', 'Services'])).toEqual(
        pages_fixture_1.expect.arrayContaining(['All', 'Destinations', 'Projects', 'Units', 'Services'])
      );
    }
  );
  (0, pages_fixture_1.test)(
    'TC-14 Registered interests exposes all five tabs (All, Destinations, Projects, Developers, Brokers)',
    { annotation: [{ product: 'Marketplace', type: 'non-critical' }] },
    async ({ authenticatedPage }) => {
      const profile = new UserProfilePage_1.UserProfilePage(authenticatedPage);
      await (0, LogSteps_1.logStep)('Step 01: Open the registered interests page');
      await profile.openRegisteredInterests();
      await (0, LogSteps_1.logStep)('Step 02: Validate the interest tabs');
      (0, pages_fixture_1.expect)(await profile.visibleTabLabels(['All', 'Destinations', 'Projects', 'Developers', 'Brokers'])).toEqual(
        pages_fixture_1.expect.arrayContaining(['All', 'Destinations', 'Projects', 'Developers', 'Brokers'])
      );
    }
  );
  (0, pages_fixture_1.test)('TC-15 Registered interests shows its empty state with a CTA', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const profile = new UserProfilePage_1.UserProfilePage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the registered interests page');
    await profile.openRegisteredInterests();
    await (0, LogSteps_1.logStep)('Step 02: Validate the explore CTA is visible');
    await (0, pages_fixture_1.expect)(profile.exploreMarketplaceButton).toBeVisible({ timeout: 60_000 });
  });
  (0, pages_fixture_1.test)('TC-16 Profile routes redirect to login page when logged out', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Navigate to the protected wallet route while logged out');
    await page.goto(`${testData_1.PROFILE_ROUTES.wallet}?lang=en`, { waitUntil: 'commit' });
    await (0, LogSteps_1.logStep)('Step 02: Wait for the login redirect');
    await page.waitForURL(/\/app\/authentication\/login/, { timeout: 150_000 });
    await (0, LogSteps_1.logStep)('Step 03: Confirm the login page loads');
    await (0, pages_fixture_1.expect)(page.locator('#username')).toBeVisible({ timeout: 60_000 });
  });
});
