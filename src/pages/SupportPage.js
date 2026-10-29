'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.SupportPage = void 0;
const test_1 = require('@playwright/test');
const BasePage_1 = require('./BasePage');
/**
 * Help & support surfaces on the server-rendered marketing site:
 *   - FAQs      `/support-and-help/faqs`
 *   - Contact   `/support-and-help/contact-us`
 *
 * English resolves to an `/en`-prefixed path, so navigation is by explicit URL
 * and assertions allow either form.
 *
 * The Contact form's dropdowns are **react-select** widgets whose real input is
 * `#react-select-N-input` with no placeholder; the visible prompt lives in a
 * sibling node, so they are addressed by id.
 */
class SupportPage extends BasePage_1.BasePage {
  constructor(page) {
    super(page);
    this.path = '/support-and-help/faqs';
    this.faqHeading = page.getByRole('heading', {
      name: /Frequently Asked Questions|الأسئلة الشائعة/i,
    });
    this.faqSearchInput = page.getByPlaceholder(/^\s*(Search|بحث)\s*$/i).first();
    // Real `<button>` elements only. The global header ships a
    // `<span role="button" aria-label="Search" class="nav-link-search">` on every
    // page, earlier in the DOM, so a bare `getByRole('button', …).first()`
    // resolved to that one instead of the FAQ's own control — and a span can
    // never satisfy `toBeDisabled()`, which is what this locator exists to test.
    // `.and()` keeps the accessible-name match while pinning the match to an
    // actual form control.
    this.faqSearchButton = page
      .getByRole('button', { name: /^\s*(Search|بحث)\s*$/i })
      .and(page.locator('button'))
      .first();
    // Scope to the FAQ accordion. A bare "button ending in ?" also matches the
    // government banner's "How you know?" control, which is on every page and
    // would make the question count permanently non-zero.
    this.faqQuestions = page.locator('.faqs-accordion .accordion-button');
    // Pagination is `ul.pagination > li.page-item > a.page-link` — links, not buttons.
    this.faqPagination = page.locator('ul.pagination a.page-link');
    this.contactHeading = page.getByRole('heading', { name: /Contact Us|اتصل بنا/i });
    this.requestTypeInput = page.locator('#react-select-2-input');
    // react-select keeps a zero-size `dummyInput` for keyboard handling and parks
    // it outside the viewport, so clicking it directly fails with "Element is
    // outside of the viewport" even after scrolling. The control wrapper is what
    // a user actually clicks to open the menu.
    this.requestTypeControl = page
      .locator('div[class*="-control"]')
      .filter({ has: page.locator('#react-select-2-input') })
      .first();
    this.nationalIdInput = page.locator('input[name="beneficiary_nin"]');
    this.beneficiaryNameInput = page.locator('input[name="beneficiary_name"]');
    this.regionInput = page.locator('#react-select-3-input');
    this.cityInput = page.locator('#react-select-4-input');
    this.messageInput = page.locator('textarea[name="message"]');
    this.sendButton = page.getByRole('button', { name: /^\s*(Send|إرسال)\s*$/i });
    this.helpfulYes = page.getByRole('button', { name: /^\s*(Yes|نعم)\s*$/i }).first();
    this.helpfulNo = page.getByRole('button', { name: /^\s*(No|لا)\s*$/i }).first();
  }
  async openFaqs() {
    await this.gotoUntilReady(this.faqHeading, '/support-and-help/faqs');
  }
  async openContactUs() {
    await this.gotoUntilReady(this.contactHeading, '/support-and-help/contact-us');
  }
  async expectFaqsLoaded() {
    await (0, test_1.expect)(this.faqHeading.first()).toBeVisible({ timeout: BasePage_1.APP_READY_TIMEOUT });
  }
  async expectContactLoaded() {
    await (0, test_1.expect)(this.contactHeading.first()).toBeVisible({ timeout: BasePage_1.APP_READY_TIMEOUT });
    await (0, test_1.expect)(this.messageInput).toBeVisible();
  }
  async searchFaqs(term) {
    await this.faqSearchInput.click();
    await this.faqSearchInput.fill(term);
    await this.faqSearchButton.click({ force: true });
    // The accordion re-renders in place; wait for the request to settle so the
    // caller reads the new result set rather than the previous one.
    await this.page.waitForLoadState('networkidle').catch(() => {});
  }
  /** Number of FAQ questions currently listed. */
  async faqCount() {
    return this.faqQuestions.count();
  }
  /** Visible FAQ question texts on the current page. */
  async faqQuestionTexts() {
    return this.faqQuestions.evaluateAll((els) =>
      els
        .map((e) => (e.textContent ?? '').replace(/\s+/g, ' ').trim())
        .filter(Boolean)
        .slice(0, 40)
    );
  }
  /**
   * Choose an option in a react-select dropdown by typing and taking the first
   * suggestion — the widget renders no native `<select>` to pick from.
   */
  async chooseReactSelect(input, text) {
    await input.click({ force: true });
    await input.fill(text);
    const option = this.page.locator('[class*="option"]').first();
    await option.waitFor({ state: 'visible', timeout: 30_000 });
    await option.click({ force: true });
  }
}
exports.SupportPage = SupportPage;
