'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CreateMegaProjectPage = void 0;
const test_1 = require('@playwright/test');
const path = require('path');
const CreateMegaProjectObjects_1 = require('@objects/CreateMegaProjectObjects');
const UnitDetailsObjects_1 = require('@objects/UnitDetailsObjects');
class CreateMegaProjectPage {
  constructor(page) {
    this.page = page;
  }
  async clickOnMegaProjects() {
    const megaProjects = this.page.getByRole(CreateMegaProjectObjects_1.CreateMegaProjectObjects.megaProjects.role, {
      name: CreateMegaProjectObjects_1.CreateMegaProjectObjects.megaProjects.name,
    });
    // await expect(megaProjects).toBeVisible({ timeout: 90000 });
    await megaProjects.click();
  }
  async clickOnAddNewMegaProject() {
    const addNewMegaProjectButton = this.page.getByRole(CreateMegaProjectObjects_1.CreateMegaProjectObjects.addNewMegaProjectButton.role, {
      name: CreateMegaProjectObjects_1.CreateMegaProjectObjects.addNewMegaProjectButton.name,
    });
    await (0, test_1.expect)(addNewMegaProjectButton).toBeVisible({ timeout: 90000 });
    await addNewMegaProjectButton.click();
  }
  async enterMegaProjectInformation(megaProjectName) {
    const megaProjectInformation = this.page.locator(CreateMegaProjectObjects_1.CreateMegaProjectObjects.megaProjectInformation.xpath);
    await (0, test_1.expect)(megaProjectInformation).toBeVisible({ timeout: 90000 });
    await megaProjectInformation.fill(megaProjectName);
  }
  async selectRegion(regionName) {
    const regionDropdownList = this.page.locator(CreateMegaProjectObjects_1.CreateMegaProjectObjects.regionDropdownList.name);
    await (0, test_1.expect)(regionDropdownList).toBeVisible({ timeout: 90000 });
    await regionDropdownList.click();
    const regionOption = this.page.getByRole(CreateMegaProjectObjects_1.CreateMegaProjectObjects.selectedRegion.role, {
      name: regionName,
    });
    await (0, test_1.expect)(regionOption).toBeVisible({ timeout: 90000 });
    await regionOption.click();
  }
  async selectCity(cityName) {
    const cityDropdownList = this.page.locator(CreateMegaProjectObjects_1.CreateMegaProjectObjects.cityDropdownList.name);
    await (0, test_1.expect)(cityDropdownList).toBeVisible({ timeout: 90000 });
    await cityDropdownList.click();
    const cityOption = this.page.getByRole(CreateMegaProjectObjects_1.CreateMegaProjectObjects.selectedCity.role, {
      name: cityName,
    });
    await (0, test_1.expect)(cityOption).toBeVisible({ timeout: 90000 });
    await cityOption.click();
  }
  async enterLatitude(latitude) {
    const latitudeInput = this.page.locator(CreateMegaProjectObjects_1.CreateMegaProjectObjects.latitudeInput.xpath);
    await (0, test_1.expect)(latitudeInput).toBeVisible({ timeout: 90000 });
    await latitudeInput.fill(latitude);
  }
  async enterLongitude(longitude) {
    const longitudeInput = this.page.locator(CreateMegaProjectObjects_1.CreateMegaProjectObjects.longitudeInput.xpath);
    await (0, test_1.expect)(longitudeInput).toBeVisible({ timeout: 90000 });
    await longitudeInput.fill(longitude);
  }
  async enterVideoLink(videoLink) {
    const videoLinkInput = this.page.locator(CreateMegaProjectObjects_1.CreateMegaProjectObjects.videoLinkInput.xpath);
    await (0, test_1.expect)(videoLinkInput).toBeVisible({ timeout: 90000 });
    await videoLinkInput.fill(videoLink);
  }
  async uploadBannerImage(filePath) {
    const uploadBannerImage = this.page.locator(CreateMegaProjectObjects_1.CreateMegaProjectObjects.uploadBannerImage.xpath);
    // await expect(uploadBannerImage).toBeVisible({ timeout: 90000 });
    await uploadBannerImage.setInputFiles(filePath);
  }
  async uploadImageGallery(filePath) {
    const uploadImageGallery = this.page.locator(CreateMegaProjectObjects_1.CreateMegaProjectObjects.uploadImageGallery.xpath);
    // await expect(uploadImageGallery).toBeVisible({ timeout: 90000 });
    await uploadImageGallery.setInputFiles(filePath);
  }
  async clickOnAddMegaProject() {
    const addMegaProjectButton = this.page.getByRole(CreateMegaProjectObjects_1.CreateMegaProjectObjects.addMegaProjectButton.role, {
      name: CreateMegaProjectObjects_1.CreateMegaProjectObjects.addMegaProjectButton.name,
    });
    await this.page.waitForTimeout(10000);
    await (0, test_1.expect)(addMegaProjectButton).toBeVisible({ timeout: 90000 });
    await addMegaProjectButton.click();
  }
  async searchAndSelectProject(projectName) {
    const searchProjectInput = this.page.getByRole(CreateMegaProjectObjects_1.CreateMegaProjectObjects.searchProjectInput.role);
    await this.page.waitForTimeout(10000);
    await (0, test_1.expect)(searchProjectInput).toBeVisible({ timeout: 90000 });
    await searchProjectInput.last().fill(projectName);
  }
  async selectSearchedProject(projectName) {
    const searchedProject = this.page.getByRole(CreateMegaProjectObjects_1.CreateMegaProjectObjects.searchedProject.role, {
      name: projectName,
    });
    await this.page.waitForTimeout(5000);
    await (0, test_1.expect)(searchedProject).toBeVisible({ timeout: 90000 });
    await searchedProject.click();
  }
  async clickOnAddToMegaProject() {
    const addToMegaProjectButton = this.page.getByRole(CreateMegaProjectObjects_1.CreateMegaProjectObjects.addToMegaProjectButton.role, {
      name: CreateMegaProjectObjects_1.CreateMegaProjectObjects.addToMegaProjectButton.name,
    });
    await (0, test_1.expect)(addToMegaProjectButton).toBeVisible({ timeout: 90000 });
    await addToMegaProjectButton.click();
  }
  async clickOnMegaProjectInformationLink() {
    const megaProjectInformationLink = this.page.getByRole(CreateMegaProjectObjects_1.CreateMegaProjectObjects.megaProjectInformationLSection.role, {
      name: CreateMegaProjectObjects_1.CreateMegaProjectObjects.megaProjectInformationLSection.name,
    });
    // await expect(megaProjectInformationLink).toBeVisible({ timeout: 90000 });
    await megaProjectInformationLink.click();
  }
  async clickOnEditButton() {
    const editButton = this.page.locator(CreateMegaProjectObjects_1.CreateMegaProjectObjects.editButton.xpath);
    await (0, test_1.expect)(editButton).toBeVisible({ timeout: 90000 });
    await editButton.click();
  }
  async enableNonSaudiDestinationSwitch() {
    const enableNonSaudiDestinationSwitch = this.page.locator(CreateMegaProjectObjects_1.CreateMegaProjectObjects.enableNonSaudiDestinationSwitch.xpath);
    await (0, test_1.expect)(enableNonSaudiDestinationSwitch).toBeVisible({ timeout: 90000 });
    await enableNonSaudiDestinationSwitch.click();
  }
  async clickOnUpdateButton() {
    const updateButton = this.page.locator(CreateMegaProjectObjects_1.CreateMegaProjectObjects.updateButton.xpath);
    await this.page.waitForTimeout(5000);
    await (0, test_1.expect)(updateButton).toBeVisible({ timeout: 90000 });
    await updateButton.click();
  }
  async verifyProjectNotAvailableForNonSaudiMessage() {
    const projectNotAvailableForNonSaudiMessage = this.page.locator(CreateMegaProjectObjects_1.CreateMegaProjectObjects.projectNotAvailableForNonSaudiMessage.xpath);
    await this.page.waitForTimeout(5000);
    await (0, test_1.expect)(projectNotAvailableForNonSaudiMessage).toBeVisible({ timeout: 90000 });
  }
  async searchForMeagaProject(projectName) {
    const searchForMeagaProjectInput = this.page.locator(CreateMegaProjectObjects_1.CreateMegaProjectObjects.searchForMeagaProjectInput.xpath);
    await this.page.waitForTimeout(10000);
    await (0, test_1.expect)(searchForMeagaProjectInput).toBeVisible({ timeout: 90000 });
    await searchForMeagaProjectInput.fill(projectName);
  }
  async clickOnSearchButton() {
    const searchButton = this.page.locator(CreateMegaProjectObjects_1.CreateMegaProjectObjects.searchButton.xpath);
    await (0, test_1.expect)(searchButton).toBeVisible({ timeout: 90000 });
    await searchButton.click();
  }
  async selectSearchedMegaProject() {
    const searchedMegaPrjectResult = this.page.locator(CreateMegaProjectObjects_1.CreateMegaProjectObjects.searchedMegaPrjectResult.xpath);
    await this.page.waitForTimeout(7000);
    await (0, test_1.expect)(searchedMegaPrjectResult).toBeVisible({ timeout: 90000 });
    await searchedMegaPrjectResult.click();
  }
  async verifyReserveUnitButtonIsVisible() {
    const reserveButton = this.page.getByRole(UnitDetailsObjects_1.UnitDetailsObjects.reserveButton.role, { name: UnitDetailsObjects_1.UnitDetailsObjects.reserveButton.name });
    await this.page.waitForTimeout(5000);
    await (0, test_1.expect)(reserveButton).toBeVisible({ timeout: 30000 });
  }
}
exports.CreateMegaProjectPage = CreateMegaProjectPage;
