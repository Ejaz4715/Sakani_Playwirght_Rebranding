'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProjectUnitsPage = void 0;
const test_1 = require('@playwright/test');
const path = require('path');
const ProjectUnitsObjects_1 = require('@objects/ProjectUnitsObjects');
class ProjectUnitsPage {
  constructor(page) {
    this.page = page;
  }
  async openUnitInPopup(unitIndex) {
    const unitCard = this.page.locator(ProjectUnitsObjects_1.ProjectUnitsObjects.unitCard).nth(unitIndex);
    await unitCard.waitFor({ state: 'visible', timeout: 30000 });
    await unitCard.click();
  }
  async selectLand(unitIndex) {
    const landCard = this.page.locator(ProjectUnitsObjects_1.ProjectUnitsObjects.landUnitCard).nth(unitIndex);
    await landCard.waitFor({ state: 'visible', timeout: 30000 });
    await landCard.click();
  }
  async validateTheUnitPresence(apartmentNumber) {
    const unit = this.page.locator(ProjectUnitsObjects_1.ProjectUnitsObjects.unitCardApartmentNumber(apartmentNumber));
    const nextPageButton = this.page.locator(ProjectUnitsObjects_1.ProjectUnitsObjects.nextPageButton);
    while (true) {
      const isVisible = await unit.isVisible().catch(() => false);
      if (isVisible) {
        break;
      }
      const isNextEnabled = await nextPageButton.isEnabled().catch(() => false);
      if (!isNextEnabled) {
        throw new Error(`The added unit '${apartmentNumber}' is not present in the units page of the project model.`);
      }
      await nextPageButton.click();
    }
    await (0, test_1.expect)(unit, 'The added unit is not present in the units page of the project model').toBeVisible({ timeout: 20000 });
  }
}
exports.ProjectUnitsPage = ProjectUnitsPage;
