'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const UnitModelPage_1 = require('@pages/UnitModelPage');
const UnitDetailPage_1 = require('@pages/UnitDetailPage');
const testData_1 = require('@data/testData');
const marketplaceApi_1 = require('@helpers/marketplaceApi');
const LogSteps_1 = require('@helpers/LogSteps');
pages_fixture_1.test.describe('Unit model listing', () => {
  (0, pages_fixture_1.test)('TC-01 Size-band chips filter the unit list', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Find a bookable unit and open its model page');
    const unit = await (0, marketplaceApi_1.findBookableUnit)(authenticatedPage, testData_1.PROJECTS.bookable);
    pages_fixture_1.test.skip(!unit, `TEST DATA BLOCKER: project ${testData_1.PROJECTS.bookable} has no available non-beneficiary unit`);
    const model = new UnitModelPage_1.UnitModelPage(authenticatedPage, String(unit.unitModelId));
    await model.open();
    await model.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Validate the size-band chips render');
    const chips = await model.chipLabels();
    (0, pages_fixture_1.expect)(chips.length).toBeGreaterThan(0);
    (0, pages_fixture_1.expect)(chips.join(' | ')).toMatch(/All/i);
  });
  (0, pages_fixture_1.test)('TC-02 All chip count is at least any single band', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Find a bookable unit and open its model page');
    const unit = await (0, marketplaceApi_1.findBookableUnit)(authenticatedPage, testData_1.PROJECTS.bookable);
    pages_fixture_1.test.skip(!unit, `TEST DATA BLOCKER: project ${testData_1.PROJECTS.bookable} has no available unit`);
    const model = new UnitModelPage_1.UnitModelPage(authenticatedPage, String(unit.unitModelId));
    await model.open();
    await model.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Compare the All chip count with a size band');
    const chips = await model.chipLabels();
    const allCount = await model.chipCount('All');
    pages_fixture_1.test.skip(chips.length < 2, 'Model exposes only the All band — nothing to compare');
    const bandLabel = chips.find((c) => !/^\s*All/i.test(c)).split(' ')[0];
    const bandCount = await model.chipCount(bandLabel);
    (0, pages_fixture_1.expect)(allCount).toBeGreaterThanOrEqual(bandCount);
  });
  (0, pages_fixture_1.test)('TC-03 Pagination moves through the unit list', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Find a bookable unit and open its model page');
    const unit = await (0, marketplaceApi_1.findBookableUnit)(authenticatedPage, testData_1.PROJECTS.bookable);
    pages_fixture_1.test.skip(!unit, `TEST DATA BLOCKER: project ${testData_1.PROJECTS.bookable} has no available unit`);
    const model = new UnitModelPage_1.UnitModelPage(authenticatedPage, String(unit.unitModelId));
    await model.open();
    await model.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Page through the listings and verify the first card changes');
    const hasPaging = await model.pagination
      .first()
      .isVisible()
      .catch(() => false);
    pages_fixture_1.test.skip(!hasPaging, 'TEST DATA BLOCKER: model has too few units to paginate');
    const firstPage = await model.unitCards.first().innerText();
    await model.pagination.filter({ hasText: '2' }).first().click({ force: true });
    await pages_fixture_1.expect.poll(async () => model.unitCards.first().innerText(), { timeout: 30_000 }).not.toBe(firstPage);
  });
  (0, pages_fixture_1.test)('TC-04 A small unit-model renders without pagination', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open a small unit-model page');
    // Model 581 (project 1187) held exactly one unit at exploration time, but
    // pre-production inventory moves, so the count is read from the model's own
    // "All" chip rather than asserted as a fixed number.
    const model = new UnitModelPage_1.UnitModelPage(authenticatedPage, '581');
    await model.open();
    await model.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Confirm the page renders a single page when inventory is small');
    const declared = await model.chipCount('All');
    const rendered = await model.unitCount();
    (0, pages_fixture_1.expect)(declared).toBeGreaterThan(0);
    // A model small enough to fit one page must render every unit it declares.
    if (declared <= 12) {
      (0, pages_fixture_1.expect)(rendered).toBe(declared);
      await (0, pages_fixture_1.expect)(model.pagination.first()).toBeHidden();
    }
  });
  (0, pages_fixture_1.test)('TC-05 An unknown unit-model id does not render a broken page', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Attempt to open an unknown unit-model ID');
    await authenticatedPage.goto('/app/unit-models/99999999?lang=en', { waitUntil: 'commit' });
    await (0, LogSteps_1.logStep)('Step 02: Check the page still renders content instead of an empty shell');
    await pages_fixture_1.expect
      .poll(
        async () => {
          const text = await authenticatedPage
            .locator('body')
            .innerText()
            .catch(() => '');
          return text.replace(/\s+/g, ' ').trim().length;
        },
        { timeout: 150_000, message: 'Unknown unit-model id rendered an empty shell' }
      )
      .toBeGreaterThan(200);
  });
});
pages_fixture_1.test.describe('Unit details page', () => {
  (0, pages_fixture_1.test)('TC-01 Unit attributes are rendered in full', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Find a bookable unit and open its detail page');
    const unit = await (0, marketplaceApi_1.findBookableUnit)(authenticatedPage, testData_1.PROJECTS.bookable);
    pages_fixture_1.test.skip(!unit, `TEST DATA BLOCKER: project ${testData_1.PROJECTS.bookable} has no available unit`);
    const detail = new UnitDetailPage_1.UnitDetailPage(authenticatedPage, unit.id);
    await detail.open();
    await (0, LogSteps_1.logStep)('Step 02: Verify key property attributes are rendered');
    const body = await authenticatedPage.locator('body').innerText();
    (0, pages_fixture_1.expect)(body).toMatch(/Property type|نوع العقار/i);
    (0, pages_fixture_1.expect)(body).toMatch(/Unit area|مساحة الوحدة/i);
    (0, pages_fixture_1.expect)(body).toMatch(/Number of Bedrooms|غرف النوم/i);
  });
  (0, pages_fixture_1.test)('TC-02 The price is labelled as excluding VAT', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Find a bookable unit and open its detail page');
    const unit = await (0, marketplaceApi_1.findBookableUnit)(authenticatedPage, testData_1.PROJECTS.bookable);
    pages_fixture_1.test.skip(!unit, `TEST DATA BLOCKER: project ${testData_1.PROJECTS.bookable} has no available unit`);
    const detail = new UnitDetailPage_1.UnitDetailPage(authenticatedPage, unit.id);
    await detail.open();
    await (0, LogSteps_1.logStep)('Step 02: Confirm the price label says the price excludes VAT');
    await (0, pages_fixture_1.expect)(authenticatedPage.getByText(/Exl\. VAT|Excl\. VAT|غير شامل/i).first()).toBeVisible({ timeout: 60_000 });
  });
  (0, pages_fixture_1.test)('TC-03 A unit can be favourited', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Find a bookable unit and open its detail page');
    const unit = await (0, marketplaceApi_1.findBookableUnit)(authenticatedPage, testData_1.PROJECTS.bookable);
    pages_fixture_1.test.skip(!unit, `TEST DATA BLOCKER: project ${testData_1.PROJECTS.bookable} has no available unit`);
    const detail = new UnitDetailPage_1.UnitDetailPage(authenticatedPage, unit.id);
    await detail.open();
    const favorite = detail.favoriteButton.first();
    await (0, LogSteps_1.logStep)('Step 02: Toggle the favorite state');
    await (0, pages_fixture_1.expect)(favorite).toBeVisible();
    await favorite.click({ force: true });
    // Toggle back so no state is left behind.
    await favorite.click({ force: true });
  });
  (0, pages_fixture_1.test)('TC-04 The compare control is offered', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Find a bookable unit and open its detail page');
    const unit = await (0, marketplaceApi_1.findBookableUnit)(authenticatedPage, testData_1.PROJECTS.bookable);
    pages_fixture_1.test.skip(!unit, `TEST DATA BLOCKER: project ${testData_1.PROJECTS.bookable} has no available unit`);
    const detail = new UnitDetailPage_1.UnitDetailPage(authenticatedPage, unit.id);
    await detail.open();
    await (0, LogSteps_1.logStep)('Step 02: Confirm the compare control is visible');
    await (0, pages_fixture_1.expect)(detail.compareButton.first()).toBeVisible();
  });
  (0, pages_fixture_1.test)('TC-05 The mortgage calculator CTA routes to the calculator', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage, page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open a unit detail page for mortgage evaluation');
    const unit = await (0, marketplaceApi_1.findBookableUnit)(authenticatedPage, testData_1.PROJECTS.bookable);
    const detail = new UnitDetailPage_1.UnitDetailPage(authenticatedPage, unit.id);
    await detail.open();
    const popup = authenticatedPage
      .context()
      .waitForEvent('page', { timeout: 30_000 })
      .catch(() => null);
    await (0, LogSteps_1.logStep)('Step 02: Click the mortgage calculator CTA');
    await detail.mortgageCalculatorButton.first().click({ force: true });
    await (0, pages_fixture_1.expect)(page.locator("//h3/child::span[text()='Financial Information']")).toBeVisible({ timeout: 60_000 });
  });
  (0, pages_fixture_1.test)('TC-06 Unit in a closed project shows its closed state', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage, page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open a closed-project unit detail page');
    // Project 1187 is bookable=false; its units still list as available.
    // const unitDetailPage = new UnitDetailPage();
    await page.pause();
    const detail = new UnitDetailPage_1.UnitDetailPage(authenticatedPage, '174918');
    // await page.goto(testData.userPortalUrl);
    await detail.openURL();
    await (0, LogSteps_1.logStep)('Step 02: Validate the closed-project message is visible');
    await (0, pages_fixture_1.expect)(detail.bookingsClosedNotice).toBeVisible({ timeout: 60000 });
  });
  (0, pages_fixture_1.test)('TC-07 An unknown unit id does not render a broken page', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open an unknown unit ID');
    await authenticatedPage.goto('/app/units/99999999?lang=en', { waitUntil: 'commit' });
    await (0, LogSteps_1.logStep)('Step 02: Confirm the page remains non-empty instead of blank');
    await pages_fixture_1.expect
      .poll(
        async () => {
          const text = await authenticatedPage
            .locator('body')
            .innerText()
            .catch(() => '');
          return text.replace(/\s+/g, ' ').trim().length;
        },
        { timeout: 150_000, message: 'Unknown unit id rendered an empty shell' }
      )
      .toBeGreaterThan(200);
  });
  /**
   * Resolves a currently-bookable unit rather than hard-coding one: unit 156428
   * was used by an earlier booking journey and no longer renders a booking CTA
   * at all, which made the hard-coded version burn its whole retry budget.
   */
  /**
   * PROBABLE DEFECT D16 — activating "Book a unit" as a guest leaves the URL on
   * the unit page instead of routing to login. Observed in a genuine
   * unauthenticated browser context; the same control works when authenticated
   * (it starts the booking and fires `start_booking`), so the guest branch
   * appears to fail silently — the same shape as D1, D14 and D15.
   *
   * Held failing pending confirmation of the intended guest behaviour.
   */
  (0, pages_fixture_1.test)('TC-08 A guest sees the unit but is prompted to login to book', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page, browser }) => {
    await (0, LogSteps_1.logStep)('Step 01: Prepare a guest booking flow for a unit detail page');
    // test.fail(true, 'D16: guest booking CTA does not route to login');
    // Inventory lookup needs a session; the journey itself must run as a guest.
    const lookupContext = await browser.newContext();
    const lookupPage = await lookupContext.newPage();
    let unitId = null;
    try {
      await lookupPage.goto('/app/marketplace?lang=en', { waitUntil: 'commit' });
      const unit = await (0, marketplaceApi_1.findBookableUnit)(lookupPage, testData_1.PROJECTS.bookable);
      unitId = unit?.id ?? null;
    } finally {
      await lookupContext.close();
    }
    // test.skip(
    //   !unitId,
    //   `TEST DATA BLOCKER: project ${PROJECTS.bookable} exposes no bookable unit for a guest journey`,
    // );
    const detail = new UnitDetailPage_1.UnitDetailPage(page, unitId);
    await (0, LogSteps_1.logStep)('Step 02: Trigger booking as a guest and verify login prompt appears');
    await detail.open();
    await detail.clickBook();
    await (0, pages_fixture_1.expect)(page.locator('//app-nafath-login-modal')).toBeVisible({ timeout: 60_000 });
    // await expect(page).toHaveURL(/\/app\/authentication\/login/, { timeout: 120_000 });
  });
});
