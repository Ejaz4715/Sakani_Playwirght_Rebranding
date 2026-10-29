'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const HousingDesignsPage_1 = require('@pages/HousingDesignsPage');
const LogSteps_1 = require('@helpers/LogSteps');
pages_fixture_1.test.describe('Housing designs catalogue', () => {
  (0, pages_fixture_1.test)('TC-01 The catalogue renders designs', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const designs = new HousingDesignsPage_1.HousingDesignsPage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the housing designs catalogue');
    await designs.open();
    await designs.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Wait for the catalogue to render results');
    await designs.waitForCatalogue();
    await (0, pages_fixture_1.expect)(designs.availableDesignsHeading.first()).toBeVisible();
  });
  (0, pages_fixture_1.test)('TC-02 Land width accepts a valid dimension', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const designs = new HousingDesignsPage_1.HousingDesignsPage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the housing designs catalogue');
    await designs.open();
    await designs.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Enter a valid land width');
    await designs.landWidth.fill('20');
    (0, pages_fixture_1.expect)(await designs.landWidth.inputValue()).toBe('20');
  });
  (0, pages_fixture_1.test)('TC-03 Land width rejects a negative dimension', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const designs = new HousingDesignsPage_1.HousingDesignsPage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the housing designs catalogue');
    await designs.open();
    await designs.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Enter a negative width and verify it is stripped');
    await designs.landWidth.fill('-5');
    (0, pages_fixture_1.expect)(await designs.landWidth.inputValue()).not.toMatch(/^-/);
  });
  (0, pages_fixture_1.test)('TC-04 Land width rejects non-numeric input', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const designs = new HousingDesignsPage_1.HousingDesignsPage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the housing designs catalogue');
    await designs.open();
    await designs.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Enter non-numeric width input');
    await designs.landWidth.fill('abc');
    (0, pages_fixture_1.expect)(await designs.landWidth.inputValue()).not.toMatch(/abc/i);
  });
  (0, pages_fixture_1.test)('TC-05 Land length accepts both ends of a plausible range', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const designs = new HousingDesignsPage_1.HousingDesignsPage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the housing designs catalogue');
    await designs.open();
    await designs.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Test the lower and upper land length bounds');
    await designs.landLength.fill('1');
    (0, pages_fixture_1.expect)(await designs.landLength.inputValue()).toBe('1');
    await designs.landLength.fill('9999');
    (0, pages_fixture_1.expect)(await designs.landLength.inputValue()).toBe('9999');
  });
  (0, pages_fixture_1.test)('TC-06 Front street width is filterable', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const designs = new HousingDesignsPage_1.HousingDesignsPage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the housing designs catalogue');
    await designs.open();
    await designs.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Enter a front street width filter value');
    await designs.frontStreetWidth.fill('15');
    (0, pages_fixture_1.expect)(await designs.frontStreetWidth.inputValue()).toBe('15');
  });
  (0, pages_fixture_1.test)('TC-07 A price range can be applied', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const designs = new HousingDesignsPage_1.HousingDesignsPage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the housing designs catalogue');
    await designs.open();
    await designs.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Apply a minimum and maximum price range');
    await designs.minPrice.fill('10000');
    await designs.maxPrice.fill('50000');
    await designs.waitForCatalogue();
  });
  (0, pages_fixture_1.test)(
    'TC-08 An impossible dimension combination settles on an empty state',
    { annotation: [{ product: 'Marketplace', type: 'non-critical' }] },
    async ({ authenticatedPage }) => {
      const designs = new HousingDesignsPage_1.HousingDesignsPage(authenticatedPage);
      await (0, LogSteps_1.logStep)('Step 01: Open the housing designs catalogue');
      await designs.open();
      await designs.expectLoaded();
      await (0, LogSteps_1.logStep)('Step 02: Set an impossible dimension combination');
      await designs.landWidth.fill('1');
      await designs.landLength.fill('1');
      // Must resolve to designs or an explicit empty state — never hang loading.
      await designs.waitForCatalogue();
    }
  );
  (0, pages_fixture_1.test)('TC-09 A room-count chip is selectable', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const designs = new HousingDesignsPage_1.HousingDesignsPage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the housing designs catalogue');
    await designs.open();
    await designs.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Select the room-count chip');
    const chip = designs.chip('3');
    await (0, pages_fixture_1.expect)(chip).toBeVisible();
    await chip.click({ force: true });
    await designs.waitForCatalogue();
  });
});
pages_fixture_1.test.describe('Sakani offers', () => {
  (0, pages_fixture_1.test)('TC-01 The offers page lists vouchers', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the Sakani offers page');
    await page.goto('/app/promotion-vouchers?lang=en', { waitUntil: 'commit' });
    await (0, LogSteps_1.logStep)('Step 02: Confirm the offers heading and discount items render');
    await (0, pages_fixture_1.expect)(page.getByRole('heading', { name: /Sakani Offers|عروض سكني/i }).first()).toBeVisible({ timeout: 150_000 });
    await pages_fixture_1.expect
      .poll(
        async () =>
          page
            .getByRole('heading', { name: /%\s*off|خصم/i })
            .filter({ visible: true })
            .count(),
        { timeout: 60_000, message: 'no visible discount offer rendered' }
      )
      .toBeGreaterThan(0);
  });
  /**
   * The vendor CTA is **only rendered for an authenticated visitor** — the
   * offers list itself is public, but a logged-out session shows the "Join as a
   * Vendor" copy with no "Join us" control at all. Verified by comparing the
   * page in both states.
   */
  (0, pages_fixture_1.test)('TC-02 The vendor join CTA is offered to a signed-in visitor', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the signed-in offers page');
    await authenticatedPage.goto('/app/promotion-vouchers?lang=en', { waitUntil: 'commit' });
    await (0, LogSteps_1.logStep)('Step 02: Validate the vendor CTA is visible to the signed-in visitor');
    await (0, pages_fixture_1.expect)(authenticatedPage.getByRole('heading', { name: /Sakani Offers|عروض سكني/i }).first()).toBeVisible({ timeout: 150_000 });
    // The vendor block sits below the fold and renders lazily.
    await authenticatedPage
      .getByRole('heading', { name: /Join as a Vendor|انضم كتاجر/i })
      .first()
      .scrollIntoViewIfNeeded({ timeout: 90_000 });
    await (0, pages_fixture_1.expect)(authenticatedPage.getByRole('button', { name: /Join us|انضم/i }).first()).toBeVisible({ timeout: 90_000 });
  });
});
pages_fixture_1.test.describe('Service landing pages', () => {
  const services = [
    { slug: 'check-eligibility', name: /Eligibility Checker/i },
    { slug: 'mortgage-calculator', name: /Mortgage Calculator/i },
    { slug: 'online-lending', name: /Online Lending/i },
    { slug: 'financial-advisory', name: /Financial Advisory/i },
    { slug: 'conveyance-service', name: /Conveyance service/i },
    { slug: 'farz-certificate', name: /Farz Certificate/i },
  ];
  for (const service of services) {
    (0, pages_fixture_1.test)(`TC-01 The ${service.slug} landing page renders`, { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page }) => {
      await (0, LogSteps_1.logStep)(`Step 01: Open the ${service.slug} landing page`);
      await page.goto(`/services/${service.slug}?lang=en`, { waitUntil: 'commit' });
      await (0, LogSteps_1.logStep)('Step 02: Validate the landing page heading and CTA are visible');
      await (0, pages_fixture_1.expect)(page.getByRole('heading', { name: service.name }).first()).toBeVisible({
        timeout: 150_000,
      });
      // Every service page offers a way into the journey.
      await (0, pages_fixture_1.expect)(
        page
          .getByRole('link', { name: /Get [Ss]tarted/i })
          .or(page.getByRole('button', { name: /Get [Ss]tarted/i }))
          .first()
      ).toBeVisible({ timeout: 60_000 });
    });
  }
  (0, pages_fixture_1.test)('TC-02 Mortgage "Get started" opens the calculator', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the mortgage service landing page');
    await page.goto('/services/mortgage-calculator?lang=en', { waitUntil: 'commit' });
    await (0, LogSteps_1.logStep)('Step 02: Click the Get started CTA and confirm the calculator loads');
    const cta = page
      .getByRole('link', { name: /Get [Ss]tarted/i })
      .or(page.getByRole('button', { name: /Get [Ss]tarted/i }))
      .first();
    await cta.waitFor({ state: 'visible', timeout: 150_000 });
    await cta.click({ force: true });
    await (0, pages_fixture_1.expect)(page).toHaveURL(/\/app\/mortgage-page/, { timeout: 120_000 });
  });
});
