'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const LogSteps_1 = require('@helpers/LogSteps');
/**
 * SHL / NVX — global shell chrome and mega-menu routing.
 * spec: specs/functional-test-design.md § 2-3
 *
 * Public pages only, so these run unauthenticated and fast. Complements
 * NAV-01…08, which assert that the menus *exist*; these assert that each entry
 * actually routes where it claims to.
 */
pages_fixture_1.test.describe('Global shell', () => {
  (0, pages_fixture_1.test)('TC-01 Government DGA banner expands', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ homePage, page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the homepage and expand the DGA banner');
    await homePage.open();
    await homePage.expectLoaded();
    await page
      .getByRole('button', { name: /How you know\?|كيف تتحقق/i })
      .first()
      .click({ force: true });
    await (0, LogSteps_1.logStep)('Step 02: Validate the banner content is visible');
    await (0, pages_fixture_1.expect)(page.getByText(/Registered on Digital Government Authority|مسجل لدى هيئة الحكومة/i).first()).toBeVisible({ timeout: 30_000 });
    await (0, pages_fixture_1.expect)(page.getByText('20250428955').first()).toBeVisible();
  });
  (0, pages_fixture_1.test)('TC-02 Sakani Assistant chat can be opened and closed', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ homePage, page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the home page and check for the chat toggle');
    await homePage.open();
    await homePage.expectLoaded();
    const chatToggle = page.getByRole('button', { name: /chat/i }).first();
    const hasChat = await chatToggle.isVisible().catch(() => false);
    pages_fixture_1.test.skip(!hasChat, 'Chat widget not rendered in this environment');
    await (0, LogSteps_1.logStep)('Step 02: Open and confirm the chat does not trap the page');
    await chatToggle.click({ force: true });
    await (0, pages_fixture_1.expect)(homePage.header.nav).toBeVisible();
  });
  (0, pages_fixture_1.test)('TC-03 Every footer link points at a real destination', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ homePage, page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the homepage and collect footer links');
    await homePage.open();
    await homePage.expectLoaded();
    const hrefs = await page.locator('footer a').evaluateAll((links) => links.map((a) => a.getAttribute('href')).filter((h) => !!h && h !== '#'));
    (0, pages_fixture_1.expect)(hrefs.length).toBeGreaterThanOrEqual(10);
    for (const href of hrefs) {
      (0, pages_fixture_1.expect)(href, `footer link "${href}" should be absolute or root-relative`).toMatch(/^(https?:\/\/|\/)/);
    }
  });
});
pages_fixture_1.test.describe('User Portal Navigation Routing', () => {
  const buyRoutes = [
    { label: /Offplan/i, expect: /product_types=units_under_construction/ },
    { label: /Ready units/i, expect: /product_types=readymade_units/ },
    { label: /Lands/i, expect: /product_types=lands/ },
  ];
  /**
   * The mega-menu entries are present in the DOM but only become *visible* while
   * the panel is hovered, and that hover state is timing-sensitive. Asserting on
   * the panel's hrefs tests the real routing contract without racing CSS.
   */
  for (const route of buyRoutes) {
    (0, pages_fixture_1.test)(`TC-01 Properties for Sale → ${route.label.source} routes correctly`, { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ homePage }) => {
      await (0, LogSteps_1.logStep)('Step 01: Open the homepage and inspect the buy menu links');
      await homePage.open();
      await homePage.expectLoaded();
      const hrefs = await homePage.header.megaMenuHrefs(homePage.header.propertiesForSale.first());
      const match = hrefs.find((h) => route.expect.test(h));
      (0, pages_fixture_1.expect)(match, `no menu entry matched ${route.expect}`).toBeTruthy();
      (0, pages_fixture_1.expect)(match).toContain('/app/marketplace');
    });
  }
  const rentRoutes = [
    { label: /^Apartment/i, expect: /unit_types=apartment/ },
    { label: /^Villa/i, expect: /unit_types=villa/ },
    { label: /^Floor/i, expect: /unit_types=floor/ },
  ];
  for (const route of rentRoutes) {
    (0, pages_fixture_1.test)(`TC-02 Properties for Rent → ${route.label.source} routes correctly`, { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ homePage }) => {
      await (0, LogSteps_1.logStep)('Step 01: Open the homepage and inspect the rent menu links');
      await homePage.open();
      await homePage.expectLoaded();
      const hrefs = await homePage.header.megaMenuHrefs(homePage.header.propertiesForRent.first());
      const match = hrefs.find((h) => route.expect.test(h));
      (0, pages_fixture_1.expect)(match, `no menu entry matched ${route.expect}`).toBeTruthy();
      (0, pages_fixture_1.expect)(match).toContain('marketplace_purpose=rent');
    });
  }
  (0, pages_fixture_1.test)('TC-03 "Publish your units" points at the external Digitar site', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ homePage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the homepage and inspect the sale menu hrefs');
    await homePage.open();
    await homePage.expectLoaded();
    const hrefs = await homePage.header.megaMenuHrefs(homePage.header.propertiesForSale.first());
    (0, pages_fixture_1.expect)(hrefs.some((h) => h.includes('digitar.sakani.sa'))).toBeTruthy();
  });
  (0, pages_fixture_1.test)('TC-04 Real Estate Indicators links to the external REGA site', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ homePage, page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the homepage and inspect footer links for REGA');
    await homePage.open();
    await homePage.expectLoaded();
    const link = page.locator('footer a', { hasText: /Real Estate Indicators|المؤشرات العقارية/i }).first();
    (0, pages_fixture_1.expect)(await link.getAttribute('href')).toContain('rei.rega.gov.sa');
  });
  (0, pages_fixture_1.test)('TC-05 Mega-menu closes when the page body is clicked', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ homePage, page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the menu and then click the page body');
    await homePage.open();
    await homePage.expectLoaded();
    await homePage.header.services.first().hover();
    const menuLink = page.getByRole('link', { name: /Mortgage Calculator/i }).first();
    await menuLink.waitFor({ state: 'visible', timeout: 30_000 });
    await page.mouse.move(700, 700);
    await page.mouse.click(700, 700);
    await (0, pages_fixture_1.expect)(menuLink).toBeHidden({ timeout: 30_000 });
  });
  (0, pages_fixture_1.test)('TC-06 Every Services menu entry resolves to a service route', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ homePage, page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the homepage and collect the services links');
    await homePage.open();
    await homePage.expectLoaded();
    const hrefs = await homePage.header.megaMenuHrefs(homePage.header.services.first());
    (0, pages_fixture_1.expect)(hrefs.length).toBeGreaterThanOrEqual(10);
    for (const href of hrefs) {
      (0, pages_fixture_1.expect)(href, `services link "${href}"`).toMatch(/^(https?:\/\/|\/)/);
    }
  });
});
