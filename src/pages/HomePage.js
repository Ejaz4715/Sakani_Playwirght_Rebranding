'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.HomePage = void 0;
const test_1 = require('@playwright/test');
const BasePage_1 = require('./BasePage');
const CookieConsent_1 = require('./components/CookieConsent');
const Header_1 = require('./components/Header');
/** A hero product tab, addressed by its wrapper so `active` can be asserted. */
function heroTab(page, label) {
  return page.locator('.property-tab').filter({ hasText: label }).first();
}
/**
 * Marketing home page (server-rendered Rails, not the Angular app).
 *
 * Hosts the hero search with four product tabs, the personalised-services
 * selector, the Khuzam destination panel, a best-selling carousel and an
 * embedded deferred-subsidy iframe.
 */
class HomePage extends BasePage_1.BasePage {
  constructor(page) {
    super(page);
    this.path = '/';
    this.cookies = new CookieConsent_1.CookieConsent(page);
    this.header = new Header_1.Header(page);
    this.heroHeading = page.getByText(/استكشف خياراتك السكنية|Explore your housing options/);
    this.citySearchInput = page.locator('input[placeholder*="مدينة"], input[placeholder*="city" i]');
    this.searchSubmit = page.getByRole('button', { name: /^(بحث|Search)$/ }).last();
    // English labels this "AI Search", Arabic "ابحث مع AI".
    this.aiSearchButton = page.getByRole('button', { name: /AI Search|ابحث مع AI/i });
    // The hero product tabs are **not** buttons: each is a `div.property-tab`
    // wrapping a `span.tab-text`, and the `active` class lands on the wrapper.
    // The tab text also appears in a hidden mega-menu entry, so scoping to
    // `.property-tab` is what keeps these off the invisible duplicate. English
    // copy is not a literal translation ("Readymade units", "Units for rent").
    this.tabOffplan = heroTab(page, /Offplan|البيع على الخارطة/);
    this.tabReadyUnits = heroTab(page, /Readymade units|وحدات جاهزة/);
    this.tabRentalUnits = heroTab(page, /Units for rent|وحدات للإيجار/);
    this.unitTypeFilter = page.getByRole('button', { name: /نوع الوحدة|Unit type/i });
    this.priceRangeFilter = page.getByRole('button', { name: /نطاق السعر|Price range/i });
    this.roomsFilter = page.getByRole('button', { name: /الغرف|Rooms/i });
  }
  async open() {
    await this.gotoUntilReady(this.header.nav);
    await this.cookies.accept();
  }
  async expectLoaded() {
    await (0, test_1.expect)(this.page).toHaveTitle(/سكني|Sakani/);
    await (0, test_1.expect)(this.header.nav).toBeVisible({ timeout: BasePage_1.APP_READY_TIMEOUT });
  }
  /**
   * Open the page without assuming the desktop header.
   *
   * `open()` and `expectLoaded()` gate on `#main_nav`, which the layout renders
   * only at desktop width — below that breakpoint the header collapses to a
   * variant without that id. A responsive journey that used them would time out
   * on a control the layout deliberately removes, testing the gate rather than
   * the page. These wait on the brand link, which survives every breakpoint.
   */
  async openResponsive() {
    await this.gotoUntilReady(this.header.brandLink);
    await this.cookies.accept();
  }
  async expectLoadedResponsive() {
    await (0, test_1.expect)(this.page).toHaveTitle(/سكني|Sakani/);
    await (0, test_1.expect)(this.header.brandLink).toBeVisible({ timeout: BasePage_1.APP_READY_TIMEOUT });
  }
  async goToLogin() {
    await this.header.loginButton.first().click();
    await this.page.waitForURL(/\/app\/authentication\/login/, { waitUntil: 'commit' });
  }
  /** A persona chip in the "Services tailored for you" selector. */
  persona(name) {
    return this.page.getByRole('button', { name: new RegExp(`^\\s*${name}\\s*$`, 'i') }).first();
  }
  /** Select a hero product tab and confirm it became the active one. */
  async selectHeroTab(tab) {
    await tab.click({ force: true });
    await (0, test_1.expect)(tab).toHaveClass(/active|selected/, { timeout: 15_000 });
  }
  /**
   * Submit the hero search. The marketing page hands off to the Angular
   * marketplace, so the wait is on the route change rather than on any element.
   */
  async submitSearch() {
    await this.searchSubmit.click({ force: true });
    await this.page.waitForURL(/\/app\/marketplace/, {
      waitUntil: 'commit',
      timeout: 90_000,
    });
  }
}
exports.HomePage = HomePage;
