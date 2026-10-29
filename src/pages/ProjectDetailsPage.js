'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProjectDetailsPage = void 0;
// @ts-nocheck
const ProjectDetailsObjects_1 = require('@objects/ProjectDetailsObjects');
class ProjectDetailsPage {
  constructor(page) {
    this.page = page;
  }
  async click(locator) {
    await locator.click();
  }
  async check(locator) {
    await locator.check();
  }
  async openUnits() {
    const unitsButton = this.page.getByRole(ProjectDetailsObjects_1.ProjectDetailsObjects.unitsButton.role, { name: ProjectDetailsObjects_1.ProjectDetailsObjects.unitsButton.name });
    await this.click(unitsButton);
  }
  async openUnitsAndScroll() {
    const unitsButton = this.page.getByRole('button', { name: 'عرض الوحدات' });
    await unitsButton.waitFor({ state: 'visible', timeout: 30000 });
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(2000);
    await unitsButton.click();
  }
}
exports.ProjectDetailsPage = ProjectDetailsPage;
