'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ActivitiesPage = void 0;
const test_1 = require('@playwright/test');
const BasePage_1 = require('./BasePage');
/**
 * Generic page object for the account portal's **Activities** modules
 * (`/app/user-profile/my-activities/...`).
 *
 * All thirteen modules share one layout — a heading, a row of status tabs and
 * either a list of request cards or a module-specific empty state — so they are
 * driven by one page object parameterised with an `ActivityModule` descriptor
 * from test data, rather than thirteen near-identical classes.
 *
 * The portal's left navigation uses Angular routerLinks with no `href`, so these
 * modules are reached by direct URL. That is also what makes each test
 * independent.
 */
class ActivitiesPage extends BasePage_1.BasePage {
  constructor(page, module) {
    super(page);
    this.module = module;
    this.path = module.path;
    this.heading = page.getByRole('heading', { name: module.heading }).first();
    // Empty-state copy is matched apostrophe-insensitively: the application mixes
    // the typographic apostrophe (’) and the ASCII one (') across modules.
    this.emptyState = page.getByText(module.emptyText ? apostropheAgnostic(module.emptyText) : EMPTY_STATE_PATTERN).first();
  }
  async open() {
    await this.gotoUntilReady(this.heading);
  }
  async expectLoaded() {
    await (0, test_1.expect)(this.heading).toBeVisible({ timeout: BasePage_1.APP_READY_TIMEOUT });
  }
  /** A status tab by its visible label. */
  tab(label) {
    return this.page
      .getByRole('link', { name: new RegExp(`^\\s*${escapeRegExp(label)}\\s*$`) })
      .or(this.page.getByRole('tab', { name: new RegExp(`^\\s*${escapeRegExp(label)}\\s*$`) }))
      .first();
  }
  /** Every tab label currently rendered, filtered to the module's expected set. */
  async visibleTabLabels() {
    const expected = this.module.tabs;
    if (!expected.length) return [];
    return this.page.evaluate(
      (labels) => {
        const visible = (e) => {
          const r = e.getBoundingClientRect();
          return r.width > 0 && r.height > 0;
        };
        const found = [...document.querySelectorAll('a, [role="tab"], li, button')].filter(visible).map((e) => (e.textContent ?? '').replace(/\s+/g, ' ').trim());
        return labels.filter((l) => found.includes(l));
      },
      [...expected]
    );
  }
  async selectTab(label) {
    await this.tab(label).click({ force: true });
    await this.waitForListing();
  }
  /**
   * Block until the module has resolved to either a populated list or its empty
   * state. The heading renders well before the request data arrives, so
   * asserting immediately after `expectLoaded` races the fetch.
   *
   * This reads the rendered text rather than matching container classes: the
   * app's generated class names (`...card...`) also appear on hidden navigation
   * elements, so a class-based locator resolves to an invisible node and never
   * settles.
   */
  async waitForListing(timeout = 60_000) {
    await test_1.expect
      .poll(async () => this.listingState(), {
        timeout,
        message: `${this.module.label} listing never settled`,
      })
      .not.toBe('loading');
  }
  /** Whether the module currently shows data, an empty state, or is still loading. */
  async listingState() {
    return this.page.evaluate((emptyText) => {
      const normalise = (s) => s.replace(/\s+/g, ' ').replace(/[’']/g, "'").trim();
      const text = normalise(document.body.innerText || '');
      if (emptyText && text.includes(normalise(emptyText))) return 'empty';
      if (/no .{0,40}(found|yet)|don't have any|لا توجد|لا يوجد/i.test(text)) return 'empty';
      // Request rows always expose a status or a details action.
      if (/View details|View auction|Product type|Unit code|Booking date|Status/i.test(text)) {
        return 'populated';
      }
      return 'loading';
    }, this.module.emptyText ?? null);
  }
  async isEmpty() {
    return (await this.listingState()) === 'empty';
  }
  /** A module-level action button, e.g. "Create request" or "Start Online Lending". */
  action(name) {
    return this.page.getByRole('button', { name }).or(this.page.getByRole('link', { name })).first();
  }
}
exports.ActivitiesPage = ActivitiesPage;
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
/** Generic "nothing here" copy, used when a module declares no specific text. */
const EMPTY_STATE_PATTERN = /no .{0,40}(found|yet)|don['’]t have any|لا توجد|لا يوجد/i;
/**
 * Build a matcher that treats the typographic apostrophe (’) and the ASCII
 * apostrophe (') as equivalent — the application uses both.
 */
function apostropheAgnostic(text) {
  return new RegExp(escapeRegExp(text).replace(/['’]/g, "['’]"), 'i');
}
