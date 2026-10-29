'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.VoucherManagementPage = void 0;
const test_1 = require('@playwright/test');
const VoucherManagementObjects_1 = require('@objects/VoucherManagementObjects');
class VoucherManagementPage {
  constructor(page) {
    this.page = page;
  }
  async clickAddVoucherButton() {
    await this.page.getByRole(VoucherManagementObjects_1.VoucherManagementObjects.addVoucherButton.role, { name: VoucherManagementObjects_1.VoucherManagementObjects.addVoucherButton.name }).click();
  }
  async fillVoucherName(name) {
    await this.page.locator(VoucherManagementObjects_1.VoucherManagementObjects.voucherNameInput).fill(name);
  }
  async fillVoucherLimit(limit) {
    await this.page.locator(VoucherManagementObjects_1.VoucherManagementObjects.voucherLimitInput).fill(limit);
  }
  async fillVoucherDescription(description) {
    await this.page.locator(VoucherManagementObjects_1.VoucherManagementObjects.voucherDescriptionInput).fill(description);
  }
  async uploadVoucherImage(imageFilePath) {
    await this.page.locator(VoucherManagementObjects_1.VoucherManagementObjects.voucherImageInput).setInputFiles(imageFilePath);
  }
  async waitAfterVoucherImageUpload() {
    await this.page.waitForTimeout(3000);
  }
  async clickRegionSelect() {
    await this.page.locator(VoucherManagementObjects_1.VoucherManagementObjects.regionSelect).click();
  }
  async selectRegion(region) {
    await this.page.getByRole(VoucherManagementObjects_1.VoucherManagementObjects.regionOption.role, { name: region }).click();
  }
  async clickCitySelect() {
    await this.page.locator(VoucherManagementObjects_1.VoucherManagementObjects.citySelect).click();
  }
  async selectCity(city) {
    await this.page.getByRole(VoucherManagementObjects_1.VoucherManagementObjects.cityOption.role, { name: city }).click();
  }
  async clickSaveButton() {
    await this.page.getByRole(VoucherManagementObjects_1.VoucherManagementObjects.saveButton.role, { name: VoucherManagementObjects_1.VoucherManagementObjects.saveButton.name }).click();
  }
  async expectAddVoucherButtonVisible(timeout = 20000, message) {
    await (0, test_1.expect)(
      this.page.getByRole(VoucherManagementObjects_1.VoucherManagementObjects.addVoucherButton.role, { name: VoucherManagementObjects_1.VoucherManagementObjects.addVoucherButton.name }),
      message
    ).toBeVisible({ timeout });
  }
  async expectVoucherVisible(name, timeout = 20000) {
    await (0, test_1.expect)(this.page.getByText(name)).toBeVisible({ timeout });
  }
  async clickVoucher(name) {
    await this.page.getByRole(VoucherManagementObjects_1.VoucherManagementObjects.voucherCell.role, { name }).click();
  }
  async clickEditButton() {
    await this.page.getByRole(VoucherManagementObjects_1.VoucherManagementObjects.editButton.role, { name: VoucherManagementObjects_1.VoucherManagementObjects.editButton.name }).click();
  }
  async getVoucherDescription() {
    return this.page.locator(VoucherManagementObjects_1.VoucherManagementObjects.voucherDescriptionInput).inputValue();
  }
  async expectVoucherUpdatedToastVisible(timeout = 20000) {
    await (0, test_1.expect)(this.page.locator(VoucherManagementObjects_1.VoucherManagementObjects.voucherUpdatedToast), 'Voucher is not created').toBeVisible({ timeout });
  }
  async clickDeleteButton() {
    await this.page.getByRole(VoucherManagementObjects_1.VoucherManagementObjects.deleteButton.role, { name: VoucherManagementObjects_1.VoucherManagementObjects.deleteButton.name }).click();
  }
  async clickFirstDeleteButton() {
    await this.page.getByRole(VoucherManagementObjects_1.VoucherManagementObjects.deleteButton.role, { name: VoucherManagementObjects_1.VoucherManagementObjects.deleteButton.name }).nth(0).click();
  }
  async expectVoucherDeletedToastVisible(timeout = 20000) {
    await (0, test_1.expect)(this.page.locator(VoucherManagementObjects_1.VoucherManagementObjects.voucherDeletedToast), 'Voucher is not deleted').toBeVisible({ timeout });
  }
}
exports.VoucherManagementPage = VoucherManagementPage;
