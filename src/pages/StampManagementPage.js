'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.StampManagementPage = void 0;
const StampManagementObjects_1 = require('@objects/StampManagementObjects');
const DEFAULT_TIMEOUT = 30_000;
class StampManagementPage {
  constructor(page) {
    this.page = page;
  }
  async clickOnStampManagement() {
    const stampButton = this.page.getByRole(StampManagementObjects_1.StampManagementObjects.stampManagementButton.role, {
      name: StampManagementObjects_1.StampManagementObjects.stampManagementButton.name,
    });
    await stampButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await stampButton.click();
  }
  async clickOnViewLastStamp() {
    const lastStapmViewIcon = this.page
      .getByRole(StampManagementObjects_1.StampManagementObjects.lastStampViewButton.role)
      .nth(StampManagementObjects_1.StampManagementObjects.lastStampViewButton.child);
    await lastStapmViewIcon.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await lastStapmViewIcon.click();
    await this.page.waitForTimeout(5000);
  }
  async isLastStampImageVisible() {
    const lastStapmViewImage = this.page.getByRole(StampManagementObjects_1.StampManagementObjects.lastStampImage.role);
    await lastStapmViewImage.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await lastStapmViewImage.isVisible();
  }
  async closeImagePopUp() {
    const stampImagePopUp = this.page.getByRole(StampManagementObjects_1.StampManagementObjects.imagePopUp.role, { name: StampManagementObjects_1.StampManagementObjects.imagePopUp.name });
    await stampImagePopUp.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await stampImagePopUp.click();
  }
  async clickOnStampUpdateButton() {
    const stampImagePopUp = this.page.getByRole(StampManagementObjects_1.StampManagementObjects.stampUpdateButton.role, {
      name: StampManagementObjects_1.StampManagementObjects.stampUpdateButton.name,
    });
    await stampImagePopUp.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await stampImagePopUp.click();
  }
  async clickOnUploadNewStamp() {
    const uploadButton = this.page.locator(StampManagementObjects_1.StampManagementObjects.uploadAreaButton);
    await uploadButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await uploadButton.click();
  }
  async uploadNewStampImage(filePath) {
    const uploadButton = this.page.locator(StampManagementObjects_1.StampManagementObjects.uploadFileSelector);
    await uploadButton.setInputFiles(filePath);
    await this.page.waitForTimeout(5000);
  }
  async clickOnAddNewStamp() {
    const uploadButton = this.page.getByRole(StampManagementObjects_1.StampManagementObjects.newStampButton.role, { name: StampManagementObjects_1.StampManagementObjects.newStampButton.name });
    await uploadButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await uploadButton.click();
  }
  async fillTheOtp() {
    const otpField = this.page.getByRole(StampManagementObjects_1.StampManagementObjects.otpVerifyField.role);
    await otpField.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await otpField.fill('1234');
  }
  async clickOnVerify() {
    const otpButton = this.page.getByRole(StampManagementObjects_1.StampManagementObjects.otpVerifyButton.role, { name: StampManagementObjects_1.StampManagementObjects.otpVerifyButton.name });
    await otpButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await otpButton.click();
  }
  async isTheNewStampAddedSuccessfully() {
    const stampSuccessfulMessage = this.page.getByText(StampManagementObjects_1.StampManagementObjects.stampSuccessfulMessage);
    await stampSuccessfulMessage.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await stampSuccessfulMessage.isVisible();
  }
}
exports.StampManagementPage = StampManagementPage;
