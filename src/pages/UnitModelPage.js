'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UnitModelPage = void 0;
const test_1 = require('@playwright/test');
const BasePage_1 = require('./BasePage');
/**
 * Unit-model listing — `/app/unit-models/<id>`
 *
 * Shows every unit belonging to one model, with size-band filter chips
 * ("All 69", "Small 383", "Average 9", "Big 2"), Sort by, Filter and
 * pagination. The chips are clickable containers without a semantic role, so
 * they are addressed with a component-scoped class selector.
 */
class UnitModelPage extends BasePage_1.BasePage {
  constructor(page, modelId) {
    super(page);
    this.modelId = modelId;
    this.path = `/app/unit-models/${modelId}`;
    this.heading = page.getByRole('heading', { name: /for sale in|معروضة للبيع/i });
    this.priceRange = page.getByRole('heading', { name: /SAR/ });
    this.filterChips = page.locator('.unit-chip');
    this.allUnitsChip = this.filterChips.filter({ hasText: /^\s*(All|الكل)\s*\d*\s*$/ }).first();
    this.sortByButton = page
      .getByText('Sort by', { exact: true })
      .or(page.getByText('ترتيب حسب', { exact: true }))
      .first();
    this.filterButton = page
      .getByText('Filter', { exact: true })
      .or(page.getByText('تصفية', { exact: true }))
      .last();
    this.unitCards = page.locator('app-marketplace-unit-card');
    this.pagination = page.getByRole('link', { name: /^(First|Last|\d+)$/ });
  }
  async open() {
    await this.gotoUntilReady(this.unitCards.first());
  }
  async expectLoaded() {
    await (0, test_1.expect)(this.unitCards.first()).toBeVisible({ timeout: BasePage_1.APP_READY_TIMEOUT });
    await (0, test_1.expect)(this.allUnitsChip).toBeVisible({ timeout: 30_000 });
  }
  async chipLabels() {
    return this.filterChips.evaluateAll((els) => els.map((e) => (e.textContent ?? '').replace(/\s+/g, ' ').trim()).filter(Boolean));
  }
  /** Select the "All" size band and wait for the chip to become the active one. */
  async selectAllUnits() {
    await this.allUnitsChip.click({ force: true });
    await (0, test_1.expect)(this.allUnitsChip).toHaveClass(/selected|active/, { timeout: 30_000 });
  }
  /** Select a size band by its label prefix, e.g. "Small". */
  async selectChip(label) {
    const chip = this.filterChips.filter({ hasText: new RegExp(`^\\s*${label}`, 'i') }).first();
    await chip.click({ force: true });
    await (0, test_1.expect)(chip).toHaveClass(/selected|active/, { timeout: 30_000 });
  }
  /** The count rendered inside a chip label, e.g. "All 69" -> 69. */
  async chipCount(label) {
    const chip = this.filterChips.filter({ hasText: new RegExp(`^\\s*${label}`, 'i') }).first();
    const text = (await chip.innerText()).replace(/\s+/g, ' ');
    return Number((text.match(/\d+/) ?? ['0'])[0]);
  }
  async unitCount() {
    return this.unitCards.count();
  }
  /**
   * Open a unit by its name. Unit cards lack a link role; the `.unit-details`
   * panel inside the card is the interactive surface the app actually uses,
   * and it opens the unit in a new tab.
   */
  async openUnitByName(unitName) {
    const card = this.unitCards.filter({ hasText: unitName }).first();
    await (0, test_1.expect)(card, `Expected a unit card for "${unitName}"`).toBeVisible({ timeout: 60_000 });
    await card.scrollIntoViewIfNeeded();
    const popup = this.page.context().waitForEvent('page', { timeout: 60_000 });
    await card.locator('.unit-details').first().click({ force: true });
    return popup;
  }
}
exports.UnitModelPage = UnitModelPage;
