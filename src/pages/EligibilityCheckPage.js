'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.EligibilityCheckPage = void 0;
const test_1 = require('@playwright/test');
const BasePage_1 = require('./BasePage');
/**
 * Eligibility Check wizard — `/app/eligibility/check`
 *
 * Reached from "Get started" on `/services/check-eligibility`. Four steps:
 *   1. Terms and Conditions  — a single consent checkbox gates the continue button
 *   2. Acknowledgement
 *   3. Verify Information
 *   4. Financial Advisory
 *
 * Step 1's continue control is disabled until `#agreeTermsConditions` is ticked,
 * which is the wizard's only client-side gate that can be asserted without
 * submitting a real eligibility assessment against the beneficiary record.
 */
class EligibilityCheckPage extends BasePage_1.BasePage {
  constructor(page) {
    super(page);
    this.path = '/app/eligibility/check';
    this.heading = page.getByRole('heading', { name: /Eligibility Check|فحص الأهلية/i }).first();
    this.stepIndicator = page.getByText(/Terms and Conditions|Acknowledgement|Verify Information|Financial Advisory/i);
    this.termsHeading = page.getByRole('heading', { name: /Terms and Conditions/i }).first();
    this.agreeCheckbox = page.locator('#agreeTermsConditions');
    this.agreeButton = page.getByRole('button', {
      name: /Agree on the terms and conditions|الموافقة على الشروط/i,
    });
    this.backButton = page.getByRole('button', { name: /^\s*(Back|رجوع)\s*$/i }).first();
  }
  async open() {
    await this.gotoUntilReady(this.agreeCheckbox);
  }
  async expectLoaded() {
    await (0, test_1.expect)(this.heading).toBeVisible({ timeout: BasePage_1.APP_READY_TIMEOUT });
    await (0, test_1.expect)(this.agreeCheckbox).toBeAttached();
  }
  /** Step labels rendered by the wizard's progress indicator. */
  async stepLabels() {
    return this.page.evaluate(() => {
      const visible = (e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      };
      const known = ['Terms and Conditions', 'Acknowledgement', 'Verify Information', 'Financial Advisory'];
      const found = [...document.querySelectorAll('*')].filter((e) => visible(e) && e.children.length === 0).map((e) => (e.textContent ?? '').replace(/\s+/g, ' ').trim());
      return known.filter((k) => found.includes(k));
    });
  }
  /**
   * Toggle the consent checkbox.
   *
   * The `<input type="checkbox">` is visually replaced by a styled control, so
   * clicking the input itself — even with `force` — does not change its state
   * ("Clicking the checkbox did not change its state"). The click has to land on
   * the associated label, which is what a real user activates.
   */
  async toggleTerms(target) {
    if ((await this.agreeCheckbox.isChecked()) === target) return;
    const label = this.page.locator('label[for="agreeTermsConditions"]');
    if (await label.count()) {
      await label.first().click();
    } else {
      // Fall back to the control's own wrapper when no explicit label exists.
      await this.agreeCheckbox.locator('xpath=..').click({ position: { x: 10, y: 10 } });
    }
    await (0, test_1.expect)(this.agreeCheckbox).toBeChecked({ checked: target });
  }
  async acceptTerms() {
    await this.toggleTerms(true);
  }
  async uncheckTerms() {
    await this.toggleTerms(false);
  }
}
exports.EligibilityCheckPage = EligibilityCheckPage;
