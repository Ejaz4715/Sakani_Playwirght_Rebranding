'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const testData_1 = require('@data/testData');
const LogSteps_1 = require('@helpers/LogSteps');
/**
 * HOM — home page hero search and personalised-services selector.
 * spec: specs/functional-test-design.md § 4
 *
 * The home page is the server-rendered marketing site (not the Angular app) and
 * is fully public, so these run on the plain `page` fixture with no login.
 * Complements NAV-01…08, which cover the header, mega-menus and footer.
 */
pages_fixture_1.test.describe('Home page - hero search', () => {
  pages_fixture_1.test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.expectLoaded();
  });
  (0, pages_fixture_1.test)('TC-01 The hero renders its search controls', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ homePage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the home page and verify the hero controls render');
    await (0, pages_fixture_1.expect)(homePage.heroHeading.first()).toBeVisible();
    await (0, pages_fixture_1.expect)(homePage.citySearchInput.first()).toBeVisible();
    await (0, pages_fixture_1.expect)(homePage.searchSubmit).toBeVisible();
    await (0, pages_fixture_1.expect)(homePage.aiSearchButton.first()).toBeVisible();
  });
  (0, pages_fixture_1.test)('TC-02 Three hero product tabs are selectable', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ homePage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Validate the offplan, ready, and rental tabs are present');
    await (0, pages_fixture_1.expect)(homePage.tabOffplan).toBeVisible();
    await (0, pages_fixture_1.expect)(homePage.tabReadyUnits).toBeVisible();
    await (0, pages_fixture_1.expect)(homePage.tabRentalUnits).toBeVisible();
    await (0, LogSteps_1.logStep)('Step 02: Toggle through each hero tab');
    await homePage.selectHeroTab(homePage.tabReadyUnits);
    await homePage.selectHeroTab(homePage.tabRentalUnits);
    await homePage.selectHeroTab(homePage.tabOffplan);
  });
  (0, pages_fixture_1.test)('TC-03 Searching a city from the hero opens the marketplace', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ homePage, page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Search a city from the hero section');
    await homePage.citySearchInput.first().click();
    await homePage.citySearchInput.first().fill(testData_1.SEARCH.city);
    await homePage.submitSearch();
    await (0, pages_fixture_1.expect)(page).toHaveURL(/\/app\/marketplace/);
  });
  (0, pages_fixture_1.test)('TC-04 Searching with no criteria still opens the marketplace', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ homePage, page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Submit the hero search with no criteria');
    // No city, no filters — the hero must either block with a hint or fall
    // through to the default listing. A dead button would be the defect.
    await homePage.submitSearch();
    await (0, pages_fixture_1.expect)(page).toHaveURL(/\/app\/marketplace/);
  });
  (0, pages_fixture_1.test)('TC05 Hero exposes unit type, price and rooms filters', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ homePage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Confirm the hero filter controls are rendered');
    await (0, pages_fixture_1.expect)(homePage.unitTypeFilter.first()).toBeVisible();
    await (0, pages_fixture_1.expect)(homePage.priceRangeFilter.first()).toBeVisible();
    await (0, pages_fixture_1.expect)(homePage.roomsFilter.first()).toBeVisible();
  });
  (0, pages_fixture_1.test)('TC-06 Personalised-services selector switches persona', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ homePage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Validate the persona options are visible');
    for (const persona of ['Broker', 'Developer', 'Self-Build', 'Buyer', 'Tenant']) {
      await (0, pages_fixture_1.expect)(homePage.persona(persona)).toBeVisible();
    }
    await (0, LogSteps_1.logStep)('Step 02: Select the Buyer persona and confirm the active state');
    await homePage.persona('Buyer').click({ force: true });
    await (0, pages_fixture_1.expect)(homePage.persona('Buyer')).toHaveClass(/active|selected/, { timeout: 15_000 });
  });
  (0, pages_fixture_1.test)('TC-07 AI search entry point is reachable', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ homePage, page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the AI search entry point from the hero');
    await homePage.aiSearchButton.first().click({ force: true });
    await (0, LogSteps_1.logStep)('Step 02: Confirm the page responds by either routing or revealing AI content');
    // The control either opens an AI surface in place or routes to one; either
    // way the page must respond rather than sit inert.
    await pages_fixture_1.expect
      .poll(
        async () => {
          const url = page.url();
          const body = await page.locator('body').innerText();
          return /ai/i.test(url) || /AI Search|ask|اسأل/i.test(body);
        },
        { timeout: 30_000 }
      )
      .toBeTruthy();
  });
});
