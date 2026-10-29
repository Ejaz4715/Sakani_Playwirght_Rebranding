'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TagsPage = void 0;
const test_1 = require('@playwright/test');
const TagsObjects_1 = require('@objects/TagsObjects');
class TagsPage {
  constructor(page) {
    this.page = page;
  }
  async verifyAvailableSoonTag() {
    const availableSoonTag = this.page.locator(TagsObjects_1.TagsObjects.availableSoonTage.xpath);
    await this.page.waitForTimeout(6000);
    await (0, test_1.expect)(availableSoonTag).toBeVisible({ timeout: 90000 });
  }
  async verifyLastUnitsRemainingTag() {
    const lastUnitsRemainingTag = this.page.locator(TagsObjects_1.TagsObjects.lastUnitsRemainingTag.xpath);
    await this.page.waitForTimeout(6000);
    await (0, test_1.expect)(lastUnitsRemainingTag).toBeVisible({ timeout: 90000 });
  }
}
exports.TagsPage = TagsPage;
