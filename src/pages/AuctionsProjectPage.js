'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ElectronicAuctionProjectPage = void 0;
const test_1 = require('@playwright/test');
const AuctionsProjectObjects_1 = require('@objects/AuctionsProjectObjects');
class ElectronicAuctionProjectPage {
  constructor(page) {
    this.page = page;
  }
  async fillProjectName(projectName) {
    const input = this.page.getByRole(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.projectNameInput.role, {
      name: AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.projectNameInput.name,
    });
    await (0, test_1.expect)(input).toBeVisible({ timeout: 30000 });
    await input.fill(projectName);
  }
  async selectAuctionType(auctionType) {
    const option = this.page.locator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.auctionTypeOptions(auctionType));
    const combobox = this.page.getByRole(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.auctionTypeCombobox.role, {
      name: AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.auctionTypeCombobox.name,
    });
    while (!(await option.isVisible().catch(() => false))) {
      await (0, test_1.expect)(combobox).toBeVisible({ timeout: 30000 });
      await combobox.click();
      await this.page.waitForTimeout(1000);
    }
    await (0, test_1.expect)(option).toBeVisible({ timeout: 30000 });
    await option.click();
  }
  async openHousingSector() {
    const combobox = this.page.getByRole(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.sectorCombobox.role, {
      name: AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.sectorCombobox.name,
    });
    await (0, test_1.expect)(combobox).toBeVisible({ timeout: 30000 });
    await combobox.click();
  }
  async selectHousingSector() {
    const option = this.page.getByText(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.housingSectorOption.text);
    await (0, test_1.expect)(option).toBeVisible({ timeout: 30000 });
    await option.click();
  }
  async openRegion() {
    const combobox = this.page.locator("//ng-select[@formcontrolname='region_id']").getByRole('combobox');
    await (0, test_1.expect)(combobox).toBeVisible({ timeout: 30000 });
    await combobox.click();
  }
  async selectRegion() {
    const option = this.page.getByText(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.regionOption.text);
    await (0, test_1.expect)(option).toBeVisible({ timeout: 30000 });
    await option.click();
  }
  async openCity() {
    const input = this.page.locator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.cityInput.xpath);
    await (0, test_1.expect)(input).toBeVisible({ timeout: 30000 });
    await input.click();
  }
  async selectCity() {
    const option = this.page.getByRole(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.cityOption.role, {
      name: AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.cityOption.name,
      exact: AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.cityOption.exact,
    });
    await (0, test_1.expect)(option).toBeVisible({ timeout: 30000 });
    await option.click();
  }
  async fillAuctionStartDate(value) {
    const input = this.page.locator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.auctionStartDateInput.xpath);
    await (0, test_1.expect)(input).toBeVisible({ timeout: 30000 });
    await input.fill(value);
  }
  async fillAuctionStartHour(value) {
    const input = this.page.locator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.auctionStartHourInput.xpath);
    await (0, test_1.expect)(input).toBeVisible({ timeout: 30000 });
    await input.fill(value);
  }
  async fillAuctionStartMinute(value) {
    const input = this.page.locator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.auctionStartMinuteInput.xpath);
    await (0, test_1.expect)(input).toBeVisible({ timeout: 30000 });
    await input.fill(value);
  }
  async fillAuctionEndDate(value) {
    const input = this.page.locator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.auctionEndDateInput.xpath);
    await (0, test_1.expect)(input).toBeVisible({ timeout: 30000 });
    await input.fill(value);
  }
  async fillAuctionEndHour(value) {
    const input = this.page.locator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.auctionEndHourInput.xpath);
    await (0, test_1.expect)(input).toBeVisible({ timeout: 30000 });
    await input.fill(value);
  }
  async fillAuctionEndMinute(value) {
    const input = this.page.locator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.auctionEndMinuteInput.xpath);
    await (0, test_1.expect)(input).toBeVisible({ timeout: 30000 });
    await input.fill(value);
  }
  async saveProject() {
    const button = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.saveButton);
    await (0, test_1.expect)(button).toBeVisible({ timeout: 30000 });
    await button.click();
  }
  async openProjectMedia() {
    const tab = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.projectMediaTab);
    await (0, test_1.expect)(tab).toBeVisible({ timeout: 30000 });
    await tab.click();
  }
  async fillArabicDetailsTitle(value) {
    const input = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.arabicDetailsTitleInput);
    await (0, test_1.expect)(input).toBeVisible({ timeout: 30000 });
    await input.fill(value);
  }
  async fillEnglishDetailsTitle(value) {
    const input = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.englishDetailsTitleInput);
    await (0, test_1.expect)(input).toBeVisible({ timeout: 30000 });
    await input.fill(value);
  }
  async fillArabicName(value) {
    const input = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.arabicNameInput);
    await (0, test_1.expect)(input).toBeVisible({ timeout: 30000 });
    await input.fill(value);
  }
  async fillEnglishName(value) {
    const input = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.englishNameInput);
    await (0, test_1.expect)(input).toBeVisible({ timeout: 30000 });
    await input.fill(value);
  }
  async fillArabicDescription(value) {
    const input = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.arabicDescriptionInput);
    await (0, test_1.expect)(input).toBeVisible({ timeout: 30000 });
    await input.fill(value);
  }
  async fillEnglishDescription(value) {
    const input = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.englishDescriptionInput);
    await (0, test_1.expect)(input).toBeVisible({ timeout: 30000 });
    await input.fill(value);
  }
  async fillLatitude(value) {
    const input = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.latitudeInput);
    await (0, test_1.expect)(input).toBeVisible({ timeout: 30000 });
    await input.fill(value);
  }
  async fillLongitude(value) {
    const input = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.longitudeInput);
    await (0, test_1.expect)(input).toBeVisible({ timeout: 30000 });
    await input.fill(value);
  }
  async fillAssetCount(value) {
    const input = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.assetCountInput);
    await (0, test_1.expect)(input).toBeVisible({ timeout: 30000 });
    await input.fill(value);
  }
  async expectMediaSaved() {
    const message = this.page.getByText(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.mediaSavedMessage.text);
    await (0, test_1.expect)(message).toBeVisible({ timeout: 30000 });
  }
  async openProjectDetails() {
    const button = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.projectDetailsButton);
    await (0, test_1.expect)(button).toBeVisible({ timeout: 30000 });
    await button.click();
  }
  async submitMediaForApproval() {
    const button = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.submitMediaButton);
    await (0, test_1.expect)(button).toBeVisible({ timeout: 30000 });
    await button.click();
  }
  async approveProjectMedia() {
    const button = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.approveMediaButton);
    await (0, test_1.expect)(button).toBeVisible({ timeout: 30000 });
    await button.click();
  }
  async openUnits() {
    const tab = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.unitsTab);
    await (0, test_1.expect)(tab).toBeVisible({ timeout: 30000 });
    await tab.click();
  }
  async openUnitsSubTab() {
    const subTab = this.page.locator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.unitsSubTab.xpath).getByText('الوحدات');
    await (0, test_1.expect)(subTab).toBeVisible({ timeout: 30000 });
    await subTab.click();
  }
  async openNewUnitImport() {
    const button = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.newUnitImportButton);
    await (0, test_1.expect)(button).toBeVisible({ timeout: 30000 });
    await button.click();
  }
  async openUnitType() {
    const combobox = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.unitTypeCombobox);
    await (0, test_1.expect)(combobox).toBeVisible({ timeout: 30000 });
    await combobox.click();
  }
  async selectApartmentUnitType() {
    const option = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.apartmentOption);
    await (0, test_1.expect)(option).toBeVisible({ timeout: 30000 });
    await option.click();
  }
  async uploadUnitsFile(filePath) {
    await this.upload(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.unitFileInput.xpath, filePath);
  }
  async saveUnitImport() {
    const button = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.importSaveButton);
    await (0, test_1.expect)(button).toBeVisible({ timeout: 30000 });
    await button.click();
  }
  async expectImportInProgress() {
    const message = this.page.getByText(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.importInProgressMessage.name, {
      exact: true,
    });
    await (0, test_1.expect)(message).toBeVisible({ timeout: 120000 });
  }
  async waitForUnitImportToComplete() {
    const message = this.page.getByText(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.importCompletedMessage.text, {
      exact: true,
    });
    while (!(await message.isVisible().catch(() => false))) {
      await this.page.reload();
      await this.page.waitForTimeout(3000);
    }
    await (0, test_1.expect)(message).toBeVisible({ timeout: 30000 });
  }
  async approveUnitImport() {
    const button = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.approveButton);
    await (0, test_1.expect)(button).toBeVisible({ timeout: 30000 });
    await button.click();
  }
  async confirmUnitImport() {
    const button = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.confirmButton);
    await (0, test_1.expect)(button).toBeVisible({ timeout: 30000 });
    await button.click();
  }
  async returnFromUnitImport() {
    const button = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.backButton);
    await (0, test_1.expect)(button).toBeVisible({ timeout: 30000 });
    await button.click();
  }
  async openUnitModels() {
    const tab = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.unitModelsTab);
    await (0, test_1.expect)(tab).toBeVisible({ timeout: 30000 });
    await tab.click();
  }
  async openApartmentModel() {
    const cell = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.modelCell);
    await (0, test_1.expect)(cell).toBeVisible({ timeout: 30000 });
    await cell.click();
  }
  async saveUnitModel() {
    const button = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.saveButton);
    await (0, test_1.expect)(button).toBeVisible({ timeout: 30000 });
    await button.click();
  }
  async openUnitVisualMedia() {
    const tab = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.visualMediaTab);
    await (0, test_1.expect)(tab).toBeVisible({ timeout: 30000 });
    await tab.click();
  }
  async submitUnitMediaForApproval() {
    const button = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.submitMediaButton);
    await (0, test_1.expect)(button).toBeVisible({ timeout: 30000 });
    await button.click();
  }
  async approveUnitMedia() {
    const button = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.approveMediaButton);
    await (0, test_1.expect)(button).toBeVisible({ timeout: 30000 });
    await button.click();
  }
  async publishUnitModel() {
    const button = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.unitPublishButton);
    await (0, test_1.expect)(button).toBeVisible({ timeout: 30000 });
    await button.click();
  }
  async waitForUnitMediaApproval() {
    await this.waitForApprovedTab(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.approvedMediaTab.xpath);
  }
  async openAuctionLegal() {
    const tab = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.auctionLegalTab);
    await (0, test_1.expect)(tab).toBeVisible({ timeout: 30000 });
    await tab.click();
  }
  async uploadTerms(filePath) {
    await this.upload(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.termsFileInput.xpath, filePath);
  }
  async uploadWinnerContract(filePath) {
    await this.upload(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.winnerContractFileInput.xpath, filePath);
  }
  async expectUnitModelUpdated() {
    const message = this.page.getByText(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.modelUpdatedMessage.text);
    await (0, test_1.expect)(message).toBeVisible({ timeout: 30000 });
  }
  async openAuctionSettings() {
    const tab = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.auctionSettingsTab);
    await (0, test_1.expect)(tab).toBeVisible({ timeout: 30000 });
    await tab.click();
  }
  async openSettingsEdit() {
    const button = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.editButton);
    await (0, test_1.expect)(button).toBeVisible({ timeout: 30000 });
    await button.click();
  }
  async enableGeneralAuctionSetting() {
    const settingSwitch = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.generalSettingSwitch);
    await (0, test_1.expect)(settingSwitch).toBeVisible({ timeout: 30000 });
    await settingSwitch.click();
  }
  async updateAuctionSettings() {
    const button = this.getLocator(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.updateButton);
    await (0, test_1.expect)(button).toBeVisible({ timeout: 30000 });
    await button.click();
  }
  async expectSettingsUpdated() {
    const message = this.page.getByText(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.arabicText.text);
    await (0, test_1.expect)(message).toBeVisible({ timeout: 30000 });
  }
  async publishUnitModelCategories() {
    await this.setToggle(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.publishUnitModelToggle.xpath);
  }
  async openPublishedUnitModel() {
    const modelLink = this.page.locator('a').filter({ hasText: AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.unitModelLink.text });
    await (0, test_1.expect)(modelLink).toBeVisible({ timeout: 30000 });
    await modelLink.click();
  }
  async waitForProjectMediaApproval() {
    await this.waitForApprovedTab(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.projectApprovedMediaTab.xpath);
  }
  async publishProject() {
    await this.setToggle(AuctionsProjectObjects_1.ElectronicAuctionProjectObjects.publishProjectToggle.xpath);
  }
  getLocator(locatorDefinition) {
    if (locatorDefinition.xpath) {
      return this.page.locator(locatorDefinition.xpath);
    }
    if (locatorDefinition.text) {
      return this.page.getByText(locatorDefinition.text, {
        exact: locatorDefinition.exact,
      });
    }
    return this.page.getByRole(locatorDefinition.role, {
      name: locatorDefinition.name,
      exact: locatorDefinition.exact,
    });
  }
  async upload(xpath, filePath) {
    const locator = this.page.locator(xpath);
    await locator.waitFor({ state: 'attached', timeout: 30000 });
    await locator.setInputFiles(filePath);
  }
  async waitForApprovedTab(xpath) {
    while (true) {
      const tab = this.page.locator(xpath);
      await (0, test_1.expect)(tab).toBeVisible({ timeout: 30000 });
      const text = await tab.textContent();
      if (text && text.includes('تمت الموافقة وتم النشر')) return;
      await this.page.reload();
      await this.page.waitForTimeout(3000);
    }
  }
  async setToggle(xpath) {
    const toggle = this.page.locator(xpath);
    await (0, test_1.expect)(toggle).toBeVisible({ timeout: 30000 });
    if ((await toggle.getAttribute('aria-checked')) === 'false') await toggle.click();
    await (0, test_1.expect)(toggle).toHaveAttribute('aria-checked', 'true');
  }
}
exports.ElectronicAuctionProjectPage = ElectronicAuctionProjectPage;
