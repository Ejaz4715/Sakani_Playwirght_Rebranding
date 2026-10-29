'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PublishUnitPage = void 0;
const test_1 = require('@playwright/test');
const PublishUnitObjects_1 = require('@objects/PublishUnitObjects');
const DeveloperObjects_1 = require('@objects/DeveloperObjects');
class PublishUnitPage {
  constructor(page) {
    this.page = page;
  }
  async clickOnServicesLink() {
    const servicesLink = this.page.getByRole(PublishUnitObjects_1.PublishUnitObjects.servicesLink.role, { name: PublishUnitObjects_1.PublishUnitObjects.servicesLink.name });
    await (0, test_1.expect)(servicesLink).toBeVisible({ timeout: 90000 });
    await servicesLink.click();
  }
  async clickOnManagePublishButton() {
    const managePublishButton = this.page.getByRole(PublishUnitObjects_1.PublishUnitObjects.managePublishButton.role, { name: PublishUnitObjects_1.PublishUnitObjects.managePublishButton.name });
    await (0, test_1.expect)(managePublishButton).toBeVisible({ timeout: 90000 });
    await managePublishButton.click();
  }
  async clickOnPublishTab() {
    const publishTab = this.page.getByRole(PublishUnitObjects_1.PublishUnitObjects.publishTab.role, { name: PublishUnitObjects_1.PublishUnitObjects.publishTab.name });
    await (0, test_1.expect)(publishTab).toBeVisible({ timeout: 90000 });
    await publishTab.click();
  }
  async clickOnStartButton() {
    const startButton = this.page.getByRole(PublishUnitObjects_1.PublishUnitObjects.startButton.role, { name: PublishUnitObjects_1.PublishUnitObjects.startButton.name });
    await (0, test_1.expect)(startButton).toBeVisible({ timeout: 90000 });
    await startButton.click();
  }
  async clickOnSingleUnitOption() {
    const singleUnitOption = this.page.locator('label').filter({ hasText: PublishUnitObjects_1.PublishUnitObjects.singleUnitOption.name });
    await (0, test_1.expect)(singleUnitOption).toBeVisible({ timeout: 90000 });
    await singleUnitOption.click();
  }
  async clickOnNextButton() {
    const nextButton = this.page.getByRole(PublishUnitObjects_1.PublishUnitObjects.nextButton.role, { name: PublishUnitObjects_1.PublishUnitObjects.nextButton.name });
    await (0, test_1.expect)(nextButton).toBeVisible({ timeout: 90000 });
    await nextButton.click();
  }
  async clickOnContinueButton() {
    const continueButton = this.page.getByRole(PublishUnitObjects_1.PublishUnitObjects.continueButton.role, { name: PublishUnitObjects_1.PublishUnitObjects.continueButton.name });
    await (0, test_1.expect)(continueButton).toBeVisible({ timeout: 90000 });
    await continueButton.click();
  }
  async fillAdLicenseNumberInputfield(value) {
    const adLicenseNumber = String(value);
    if (!/^\d+$/.test(adLicenseNumber)) {
      throw new Error('Ad license number must contain digits only.');
    }
    const adLicenseNumberInputfield = this.page.locator(PublishUnitObjects_1.PublishUnitObjects.adLicenseNumberInputfield.xpath);
    await (0, test_1.expect)(adLicenseNumberInputfield).toBeVisible({ timeout: 90000 });
    await adLicenseNumberInputfield.fill(adLicenseNumber);
    await (0, test_1.expect)(adLicenseNumberInputfield).toHaveValue(adLicenseNumber);
  }
  async selectAdvertiserIdType() {
    const advertiserIdTypeDropdown = this.page.locator(PublishUnitObjects_1.PublishUnitObjects.advertiserIdTypeDropdownList.xpath);
    await (0, test_1.expect)(advertiserIdTypeDropdown).toBeVisible({ timeout: 90000 });
    await advertiserIdTypeDropdown.click();
    const advertiserIdTypeOption = this.page.getByRole(PublishUnitObjects_1.PublishUnitObjects.advertiserIdTypeOption.role, {
      name: PublishUnitObjects_1.PublishUnitObjects.advertiserIdTypeOption.name,
    });
    await (0, test_1.expect)(advertiserIdTypeOption).toBeVisible({ timeout: 90000 });
    await advertiserIdTypeOption.click();
  }
  async fillAdvertiserIdNumberInputfield(value) {
    const advertiserIdNumber = String(value);
    if (!/^\d+$/.test(advertiserIdNumber)) {
      throw new Error('Advertiser ID number must contain digits only.');
    }
    const advertiserIdNumberInputfield = this.page.locator(PublishUnitObjects_1.PublishUnitObjects.advertiserIdNumberInputfield.xpath);
    await (0, test_1.expect)(advertiserIdNumberInputfield).toBeVisible({ timeout: 90000 });
    await advertiserIdNumberInputfield.fill(advertiserIdNumber);
    await (0, test_1.expect)(advertiserIdNumberInputfield).toHaveValue(advertiserIdNumber);
  }
  async fillHeightInputfield(value) {
    const height = String(value);
    if (!/^\d+(\.\d+)?$/.test(height)) {
      throw new Error('Height must be a valid numeric value.');
    }
    const heightInputfield = this.page.locator(PublishUnitObjects_1.PublishUnitObjects.heightInputfield.xpath);
    await (0, test_1.expect)(heightInputfield).toBeVisible({ timeout: 90000 });
    await heightInputfield.fill(height);
    await (0, test_1.expect)(heightInputfield).toHaveValue(height);
  }
  async fillWidthInputfield(value) {
    const width = String(value);
    if (!/^\d+(\.\d+)?$/.test(width)) {
      throw new Error('Width must be a valid numeric value.');
    }
    const widthInputfield = this.page.locator(PublishUnitObjects_1.PublishUnitObjects.widthInputfield.xpath);
    await (0, test_1.expect)(widthInputfield).toBeVisible({ timeout: 90000 });
    await widthInputfield.fill(width);
    await (0, test_1.expect)(widthInputfield).toHaveValue(width);
  }
  async fillDescriptionTextarea(value) {
    const descriptionTextarea = this.page.locator(PublishUnitObjects_1.PublishUnitObjects.descriptionTextarea.xpath);
    await (0, test_1.expect)(descriptionTextarea).toBeVisible({ timeout: 90000 });
    await descriptionTextarea.fill(value);
    await (0, test_1.expect)(descriptionTextarea).toHaveValue(value);
  }
  async uploadExteriorPhoto(filePath) {
    const exteriorPhotoInputfield = this.page.locator(PublishUnitObjects_1.PublishUnitObjects.exteriorPhotoInputfield.xpath);
    await exteriorPhotoInputfield.setInputFiles(filePath);
  }
  async uploadInteriorPhoto(filePath) {
    const interiorPhotoInputfield = this.page.locator(PublishUnitObjects_1.PublishUnitObjects.interiorPhotoInputfield.xpath);
    await interiorPhotoInputfield.setInputFiles(filePath);
  }
  async clickOnDataAccuracyDisclaimerCheckbox() {
    const dataAccuracyDisclaimerCheckbox = this.page.locator(PublishUnitObjects_1.PublishUnitObjects.dataAccuracyDisclaimerCheckbox.xpath);
    await this.page.waitForTimeout(3000); // Wait for 3 seconds to ensure the checkbox is visible
    await (0, test_1.expect)(dataAccuracyDisclaimerCheckbox).toBeVisible({ timeout: 90000 });
    await dataAccuracyDisclaimerCheckbox.click();
  }
  async clickOnSendPublishUnitButton() {
    const sendPublishUnitButton = this.page.getByRole(PublishUnitObjects_1.PublishUnitObjects.sendPublishUnitButton.role, { name: PublishUnitObjects_1.PublishUnitObjects.sendPublishUnitButton.name });
    await (0, test_1.expect)(sendPublishUnitButton).toBeVisible({ timeout: 90000 });
    await sendPublishUnitButton.click();
  }
  async verifyPublishUnitSendModalIsVisible() {
    const publishUnitSendModal = this.page.locator(PublishUnitObjects_1.PublishUnitObjects.publishUnitSendModal.selector);
    await (0, test_1.expect)(publishUnitSendModal).toBeVisible({ timeout: 90000 });
  }
  async fillAdLicenseNumberToSearchInputfield(value) {
    const adLicenseNumber = String(value);
    if (!/^\d+$/.test(adLicenseNumber)) {
      throw new Error('Ad license number must contain digits only.');
    }
    const adLicenseNumberToSearchInputfield = this.page.locator(PublishUnitObjects_1.PublishUnitObjects.adLicenseNumberToSearchInputfield.xpath);
    await (0, test_1.expect)(adLicenseNumberToSearchInputfield).toBeVisible({ timeout: 90000 });
    await adLicenseNumberToSearchInputfield.fill(adLicenseNumber);
    await (0, test_1.expect)(adLicenseNumberToSearchInputfield).toHaveValue(adLicenseNumber);
  }
  async clickOnSearchButton() {
    const searchButton = this.page.getByRole(PublishUnitObjects_1.PublishUnitObjects.searchButton.role, { name: PublishUnitObjects_1.PublishUnitObjects.searchButton.name });
    await (0, test_1.expect)(searchButton).toBeVisible({ timeout: 90000 });
    await searchButton.click();
  }
  async verifyAdLicenseStatus(expectedStatus) {
    const adLicenseStatus = this.page.locator(PublishUnitObjects_1.PublishUnitObjects.adLicenseStatus.xpath);
    await (0, test_1.expect)(adLicenseStatus).toBeVisible({ timeout: 90000 });
    const actualStatus = await adLicenseStatus.innerText();
    (0, test_1.expect)(actualStatus.trim()).toBe(expectedStatus);
  }
  async selectPreferredCommunicationType() {
    const preferredCommunicationTypeDropdown = this.page.locator(PublishUnitObjects_1.PublishUnitObjects.preferredCommunicationTypeDropdownList.selector);
    await (0, test_1.expect)(preferredCommunicationTypeDropdown).toBeVisible({ timeout: 90000 });
    await preferredCommunicationTypeDropdown.click();
    const preferredCommunicationTypeOption = this.page.getByRole(PublishUnitObjects_1.PublishUnitObjects.preferredCommunicationTypeOption.role, {
      name: PublishUnitObjects_1.PublishUnitObjects.preferredCommunicationTypeOption.name,
    });
    await (0, test_1.expect)(preferredCommunicationTypeOption).toBeVisible({ timeout: 90000 });
    await preferredCommunicationTypeOption.click();
  }
  async selectBuildingYear() {
    const buildingYearDropdown = this.page.locator(PublishUnitObjects_1.PublishUnitObjects.buildingYearDropdownList.xpath);
    await (0, test_1.expect)(buildingYearDropdown).toBeVisible({ timeout: 90000 });
    await buildingYearDropdown.click();
    const buildingYearOption = this.page.getByRole(PublishUnitObjects_1.PublishUnitObjects.buildingYearOption.role, { name: PublishUnitObjects_1.PublishUnitObjects.buildingYearOption.name });
    await (0, test_1.expect)(buildingYearOption).toBeVisible({ timeout: 90000 });
    await buildingYearOption.click();
  }
  async switchRoleToDeveloperBroker() {
    const profileIcon = this.page.locator(DeveloperObjects_1.DeveloperObjects.profileIcon);
    await (0, test_1.expect)(profileIcon).toBeVisible({ timeout: 90000 });
    await profileIcon.click();
    const switchRoleButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.switchRoleButton.role, { name: DeveloperObjects_1.DeveloperObjects.switchRoleButton.name });
    await (0, test_1.expect)(switchRoleButton).toBeVisible({ timeout: 90000 });
    await switchRoleButton.click();
    const developerBrokerRole = this.page.getByText(PublishUnitObjects_1.PublishUnitObjects.developerBrokerRoleText);
    await (0, test_1.expect)(developerBrokerRole).toBeVisible({ timeout: 90000 });
    await developerBrokerRole.click();
    await this.page.waitForTimeout(3000); // Wait for 3 seconds to ensure the page is fully loaded
    // const cancelButton = this.page.getByRole("button", { name: "إلغاء" });
    // await expect(cancelButton).toBeVisible({ timeout: 90000 });
    // await cancelButton.first().click();
  }
  //Admin
  async clickOnExternalInventoryLink() {
    const externalInventoryLink = this.page
      .locator(PublishUnitObjects_1.PublishUnitObjects.externalInventoryLink.selector)
      .filter({ hasText: PublishUnitObjects_1.PublishUnitObjects.externalInventoryLink.hasText });
    await (0, test_1.expect)(externalInventoryLink).toBeVisible({ timeout: 90000 });
    await externalInventoryLink.click();
  }
  async clickOnReadyMarketUnitsLink() {
    const readyMarketUnitsLink = this.page.getByRole(PublishUnitObjects_1.PublishUnitObjects.readyMarketUnitsLink.role, { name: PublishUnitObjects_1.PublishUnitObjects.readyMarketUnitsLink.name });
    await (0, test_1.expect)(readyMarketUnitsLink).toBeVisible({ timeout: 90000 });
    await readyMarketUnitsLink.click();
  }
  async clickOnRequestTab() {
    const requestTab = this.page.getByRole(PublishUnitObjects_1.PublishUnitObjects.requestTab.role, { name: PublishUnitObjects_1.PublishUnitObjects.requestTab.name });
    await (0, test_1.expect)(requestTab).toBeVisible({ timeout: 90000 });
    await requestTab.click();
  }
  async fillAdminAdLicenseNumberInputfield(value) {
    const adLicenseNumber = String(value);
    if (!/^\d+$/.test(adLicenseNumber)) {
      throw new Error('Ad license number must contain digits only.');
    }
    const adminAdLicenseNumberInputfield = this.page.getByRole(PublishUnitObjects_1.PublishUnitObjects.adminAdLicenseNumberInputfield.role, {
      name: PublishUnitObjects_1.PublishUnitObjects.adminAdLicenseNumberInputfield.name,
    });
    await (0, test_1.expect)(adminAdLicenseNumberInputfield).toBeVisible({ timeout: 90000 });
    await this.page.waitForTimeout(5000);
    await adminAdLicenseNumberInputfield.fill(adLicenseNumber);
    await (0, test_1.expect)(adminAdLicenseNumberInputfield).toHaveValue(adLicenseNumber);
  }
  async clickOnAdLicenseNumberResultCell(value) {
    const resultCell = PublishUnitObjects_1.PublishUnitObjects.adLicenseNumberResultCell(value);
    const adLicenseNumberResultCell = this.page.getByRole(resultCell.role, { name: resultCell.name, exact: true });
    await (0, test_1.expect)(adLicenseNumberResultCell).toBeVisible({ timeout: 90000 });
    await adLicenseNumberResultCell.click();
  }
  async clickOnViewPublishUnitLink() {
    const viewPublishUnitLink = this.page.getByRole(PublishUnitObjects_1.PublishUnitObjects.viewPublishUnitLink.role, { name: PublishUnitObjects_1.PublishUnitObjects.viewPublishUnitLink.name });
    await (0, test_1.expect)(viewPublishUnitLink).toBeVisible({ timeout: 90000 });
    await viewPublishUnitLink.click();
  }
  async clickOnAcceptButton() {
    const acceptButton = this.page.getByRole(PublishUnitObjects_1.PublishUnitObjects.acceptButton.role, { name: PublishUnitObjects_1.PublishUnitObjects.acceptButton.name });
    await (0, test_1.expect)(acceptButton).toBeVisible({ timeout: 90000 });
    await acceptButton.click();
  }
  async verifyPublishUnitApprovalSuccessMessage() {
    const successMessage = this.page.getByText(PublishUnitObjects_1.PublishUnitObjects.publishUnitApprovalSuccessMessage);
    await (0, test_1.expect)(successMessage).toBeVisible({ timeout: 90000 });
  }
}
exports.PublishUnitPage = PublishUnitPage;
