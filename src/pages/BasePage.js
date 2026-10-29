'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BasePage = exports.APP_READY_TIMEOUT = void 0;
const test_1 = require('@playwright/test');
const testData_1 = require('@data/testData');
/**
 * How long to wait for a page's first meaningful element after navigation.
 * Sized for Angular bootstrap on this app, which is gated on a multi-megabyte
 * bundle that can take close to two minutes to arrive from pre-production.
 */
exports.APP_READY_TIMEOUT = 150_000;
/**
 * Shared behaviour for every page object. Concrete pages extend it and expose
 * their own locators and actions.
 */
class BasePage {
  constructor(page) {
    /** Path relative to `baseURL`, overridden by each page. */
    this.path = '/';
    this.page = page;
  }
  /**
   * Append the language query parameter.
   *
   * The header's language toggle does not reliably switch locale, so every
   * navigation pins the language explicitly instead of clicking the control.
   */
  withLang(url) {
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}lang=${testData_1.LANG}`;
  }
  /**
   * Navigate using `commit` rather than `load`.
   *
   * The app ships a parser-blocking Angular bundle that routinely outlives any
   * sane navigation budget, while the document itself responds in 1-3s.
   * Committing the navigation decouples it from bundle download; each page
   * object then waits on its own first meaningful element, which is the real
   * readiness signal.
   */
  async goto(url = this.path) {
    await this.page.goto(this.withLang(url), { waitUntil: 'commit' });
  }
  /**
   * Navigate, then block until `ready` is visible. Reloads once if Angular
   * fails to bootstrap on the first attempt, which this environment does
   * intermittently under slow bundle delivery.
   */
  async gotoUntilReady(ready, url = this.path) {
    await this.goto(url);
    try {
      await (0, test_1.expect)(ready).toBeVisible({ timeout: exports.APP_READY_TIMEOUT });
    } catch {
      await this.page.reload({ waitUntil: 'commit' });
      await (0, test_1.expect)(ready).toBeVisible({ timeout: exports.APP_READY_TIMEOUT });
    }
  }
  async gotoUrl(url = this.path) {
    await this.goto(url);
  }
  async expectTitleContains(text) {
    await (0, test_1.expect)(this.page).toHaveTitle(text);
  }
  async currentUrl() {
    return this.page.url();
  }
  byRole(role, name) {
    return this.page.getByRole(role, { name });
  }
}
exports.BasePage = BasePage;
