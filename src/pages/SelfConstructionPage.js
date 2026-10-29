'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.SelfConstructionPage = void 0;
const test_1 = require('@playwright/test');
const SelfConstructionObjects_1 = require('@objects/SelfConstructionObjects');
const AdminProjectsObjects_1 = require('@objects/AdminProjectsObjects');
class SelfConstructionPage {
  constructor(page) {
    this.documentTemplateTypeDropdownIndex = 0;
    this.page = page;
  }
  async fill(inputField, value) {
    const input = this.page.locator(inputField.xpath);
    await (0, test_1.expect)(input).toBeVisible();
    await input.fill(value);
  }
  async waitUntilNotFoundOptionHidden(timeout = 300000, pollInterval = 500) {
    const notFoundOption = this.page.locator(SelfConstructionObjects_1.SelfConstructionObjects.notFoundOption.xpath);
    const startTime = Date.now();
    do {
      if (!(await notFoundOption.isVisible())) {
        return;
      }
      const remainingTime = timeout - (Date.now() - startTime);
      if (remainingTime <= 0) {
        throw new Error(`The not-found option remained visible after ${timeout}ms`);
      }
      await this.page.waitForTimeout(Math.min(pollInterval, remainingTime));
    } while (await notFoundOption.isVisible());
  }
  async uploadDesignLogo(filePath) {
    const uploadDesignLogo = this.page.locator(SelfConstructionObjects_1.SelfConstructionObjects.uploadDesignLogo.xpath);
    await uploadDesignLogo.setInputFiles(filePath);
  }
  async uploadMasterPlan(filePath) {
    const uploadMasterPlan = this.page.locator(SelfConstructionObjects_1.SelfConstructionObjects.uploadMasterPlan.xpath);
    await uploadMasterPlan.setInputFiles(filePath);
  }
  async uploadImage(filePath) {
    const uplaodImage = this.page.locator(SelfConstructionObjects_1.SelfConstructionObjects.uplaodImage.xpath);
    await uplaodImage.setInputFiles(filePath);
  }
  async uploadBookingDocumentTemplate(filePath) {
    const upoladDocument = this.page.locator(SelfConstructionObjects_1.SelfConstructionObjects.upoladDocument.xpath);
    await upoladDocument.setInputFiles(filePath);
  }
  async selectFirstDocumentTemplateType() {
    const dropdown = this.page.locator(SelfConstructionObjects_1.SelfConstructionObjects.documentTemplateTypeDrodpwnList.xpath).nth(this.documentTemplateTypeDropdownIndex);
    await (0, test_1.expect)(dropdown).toBeVisible();
    await dropdown.click();
    const firstOption = this.page.locator(SelfConstructionObjects_1.SelfConstructionObjects.documentTemplateTypeOption.xpath).first();
    await (0, test_1.expect)(firstOption).toBeVisible();
    await firstOption.click();
    this.documentTemplateTypeDropdownIndex++;
  }
  async waitForMediaApproval() {
    const visualContentTab = this.page.getByRole(AdminProjectsObjects_1.AdminObjects.mediaApprovalText.role, {
      name: AdminProjectsObjects_1.AdminObjects.mediaApprovalText.name,
    });
    while (!(await visualContentTab.isVisible().catch(() => false))) {
      await this.page.reload();
      await this.page.waitForTimeout(2000);
    }
    await (0, test_1.expect)(visualContentTab).toBeVisible();
  }
  async publishProject() {
    await this.waitForMediaApproval();
    const publishedToggle = this.page.locator(SelfConstructionObjects_1.SelfConstructionObjects.publishToggle.xpath);
    await (0, test_1.expect)(publishedToggle).toBeVisible({ timeout: 30000 });
    if ((await publishedToggle.getAttribute('aria-checked')) === 'false') {
      await publishedToggle.click();
    }
    await (0, test_1.expect)(publishedToggle).toHaveAttribute('aria-checked', 'true');
  }
}
exports.SelfConstructionPage = SelfConstructionPage;
