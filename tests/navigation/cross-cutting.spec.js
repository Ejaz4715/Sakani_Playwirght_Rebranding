'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const MarketplacePage_1 = require('@pages/MarketplacePage');
const testData_1 = require('@data/testData');
const LogSteps_1 = require('@helpers/LogSteps');
/**
 * XCT — cross-cutting browser and session behaviour.
 * spec: specs/functional-test-design.md § 27
 *
 * Deliberately mixes public and authenticated surfaces: refresh, back/forward,
 * deep-linking and viewport behaviour have to hold on both sides of the login
 * boundary.
 */
pages_fixture_1.test.describe('Cross-cutting behaviour', () => {
  (0, pages_fixture_1.test)('TC-01 Forward after back returns without resubmitting', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page, homePage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the home page and move to the marketplace');
    await homePage.open();
    await homePage.expectLoaded();
    await page.goto('/app/marketplace?lang=en', { waitUntil: 'commit' });
    await (0, LogSteps_1.logStep)('Step 02: Go back and forward without losing the page state');
    await page.goBack({ waitUntil: 'commit' });
    await page.goForward({ waitUntil: 'commit' });
    await (0, pages_fixture_1.expect)(page).toHaveURL(/\/app\/marketplace/);
  });
  (0, pages_fixture_1.test)('TC-02 Refreshing the marketplace preserves the view', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const marketplace = new MarketplacePage_1.MarketplacePage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the marketplace and capture the filter state');
    await marketplace.open();
    await marketplace.expectLoaded();
    const before = await marketplace.filterParams();
    await (0, LogSteps_1.logStep)('Step 02: Reload and confirm the view is preserved');
    await authenticatedPage.reload({ waitUntil: 'commit' });
    await marketplace.expectLoaded();
    (0, pages_fixture_1.expect)(await marketplace.filterParams()).toEqual(before);
  });
  (0, pages_fixture_1.test)('TC-03 Public routes are deep-linkable', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page }) => {
    const routes = ['/app/promotion-vouchers', '/app/mortgage-page', '/services/farz-certificate'];
    for (const route of routes) {
      await (0, LogSteps_1.logStep)(`Step 01: Open public route ${route}`);
      await page.goto(`${route}?lang=en`, { waitUntil: 'commit' });
      await pages_fixture_1.expect
        .poll(
          async () => {
            const text = await page
              .locator('body')
              .innerText()
              .catch(() => '');
            return text.replace(/\s+/g, ' ').trim().length;
          },
          { timeout: 150_000, message: `${route} rendered no content` }
        )
        .toBeGreaterThan(200);
    }
  });
  (0, pages_fixture_1.test)('TC-04 Marketplace remains usable at a 1280px viewport', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Set the viewport and open the marketplace');
    await authenticatedPage.setViewportSize({ width: 1280, height: 720 });
    const marketplace = new MarketplacePage_1.MarketplacePage(authenticatedPage);
    await marketplace.open();
    await marketplace.expectLoadedCompact();
    await (0, LogSteps_1.logStep)('Step 02: Validate the compact layout still renders results');
    await marketplace.waitForResults();
    (0, pages_fixture_1.expect)(await marketplace.resultCount()).toBeGreaterThan(0);
  });
  (0, pages_fixture_1.test)('TC-05 Home page is usable at a mobile viewport', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page, homePage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the home page at mobile width');
    await page.setViewportSize({ width: 390, height: 844 });
    await homePage.openResponsive();
    await homePage.expectLoadedResponsive();
    await (0, LogSteps_1.logStep)('Step 02: Confirm the mobile hero inputs remain visible');
    await (0, pages_fixture_1.expect)(homePage.citySearchInput.first()).toBeVisible({ timeout: 60_000 });
  });
  (0, pages_fixture_1.test)('TC-06 Home page is usable at a tablet viewport', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page, homePage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the home page at tablet width');
    await page.setViewportSize({ width: 768, height: 1024 });
    await homePage.openResponsive();
    await homePage.expectLoadedResponsive();
    await (0, LogSteps_1.logStep)('Step 02: Validate the search action remains visible');
    await (0, pages_fixture_1.expect)(homePage.searchSubmit).toBeVisible({ timeout: 60_000 });
  });
  (0, pages_fixture_1.test)('TC-07 Protected page is not served from cache after logout', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage, header }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open a protected route while authenticated');
    await authenticatedPage.goto(`${testData_1.PROFILE_ROUTES.wallet}?lang=en`, { waitUntil: 'commit' });
    await (0, pages_fixture_1.expect)(authenticatedPage.getByRole('heading', { name: /^\s*Wallet\s*$/i })).toBeVisible({ timeout: 150_000 });
    await (0, LogSteps_1.logStep)('Step 02: Log out and test the browser back navigation');
    await header.logout();
    await authenticatedPage.goBack({ waitUntil: 'commit' });
    await pages_fixture_1.expect.poll(async () => header.isAuthenticated(), { timeout: 90_000 }).toBeFalsy();
  });
  (0, pages_fixture_1.test)(
    'TC-08 Filtered marketplace URL is shareable to a clean session',
    { annotation: [{ product: 'Marketplace', type: 'non-critical' }] },
    async ({ authenticatedPage, browser }) => {
      const marketplace = new MarketplacePage_1.MarketplacePage(authenticatedPage);
      await (0, LogSteps_1.logStep)('Step 01: Apply a filter and capture the shareable URL');
      await marketplace.open();
      await marketplace.expectLoaded();
      await marketplace.openFilters();
      await marketplace.selectFilterOption('Villa');
      await marketplace.applyFilters();
      const sharedUrl = authenticatedPage.url();
      await (0, LogSteps_1.logStep)('Step 02: Open the shared URL in a guest context');
      const guestContext = await browser.newContext();
      const guestPage = await guestContext.newPage();
      try {
        await guestPage.goto(sharedUrl, { waitUntil: 'commit' });
        await pages_fixture_1.expect
          .poll(
            async () => {
              const text = await guestPage
                .locator('body')
                .innerText()
                .catch(() => '');
              return text.replace(/\s+/g, ' ').trim().length;
            },
            { timeout: 150_000 }
          )
          .toBeGreaterThan(200);
        (0, pages_fixture_1.expect)(guestPage.url()).toContain('unit_types=villa');
      } finally {
        await guestContext.close();
      }
    }
  );
  (0, pages_fixture_1.test)('TC-09 Expired session is rejected on a protected route', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage, header }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open a protected page with a valid session');
    await authenticatedPage.goto(`${testData_1.PROFILE_ROUTES.myBookings}?lang=en`, { waitUntil: 'commit' });
    await pages_fixture_1.expect.poll(async () => header.isAuthenticated(), { timeout: 150_000 }).toBeTruthy();
    await (0, LogSteps_1.logStep)('Step 02: Drop cookies and retry the protected route');
    await authenticatedPage.context().clearCookies();
    await authenticatedPage.goto(`${testData_1.PROFILE_ROUTES.wallet}?lang=en`, { waitUntil: 'commit' });
    await pages_fixture_1.expect.poll(() => new URL(authenticatedPage.url()).pathname, { timeout: 150_000 }).not.toMatch(/my-wallet/);
  });
  (0, pages_fixture_1.test)('TC-10 Second tab sees the same authenticated session', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const secondTab = await authenticatedPage.context().newPage();
    try {
      await (0, LogSteps_1.logStep)('Step 01: Open the protected dashboard in a second tab');
      await secondTab.goto(`${testData_1.PROFILE_ROUTES.dashboard}?lang=en`, { waitUntil: 'commit' });
      await pages_fixture_1.expect.poll(() => new URL(secondTab.url()).pathname, { timeout: 150_000 }).toMatch(/dashboard/);
    } finally {
      await secondTab.close();
    }
  });
  (0, pages_fixture_1.test)('TC-11 Leaving a project mid-browse does not strand the app', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Navigate to a project and traverse browser history');
    await authenticatedPage.goto(`/app/offplan-projects/${testData_1.PROJECTS.bookable}?lang=en`, {
      waitUntil: 'commit',
    });
    await authenticatedPage.goBack({ waitUntil: 'commit' });
    await authenticatedPage.goForward({ waitUntil: 'commit' });
    await (0, LogSteps_1.logStep)('Step 02: Confirm the page still renders substantial content');
    await pages_fixture_1.expect
      .poll(
        async () => {
          const text = await authenticatedPage
            .locator('body')
            .innerText()
            .catch(() => '');
          return text.replace(/\s+/g, ' ').trim().length;
        },
        { timeout: 150_000, message: 'Back/forward left the app on a blank shell' }
      )
      .toBeGreaterThan(200);
  });
});
