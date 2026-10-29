'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.RequestPublishProjectPage = void 0;
const test_1 = require('@playwright/test');
const RequestPublishProjectObjects_1 = require('@objects/RequestPublishProjectObjects');
class RequestPublishProjectPage {
  constructor(page) {
    this.page = page;
  }
  async clickProjectsLink() {
    const projectsLink = this.page.getByRole(RequestPublishProjectObjects_1.RequestPublishProjectObjects.projectsLink.role, {
      name: RequestPublishProjectObjects_1.RequestPublishProjectObjects.projectsLink.name,
    });
    await (0, test_1.expect)(projectsLink).toBeVisible({ timeout: 90000 });
    await projectsLink.click();
  }
  async clickNewProjectButton() {
    const newProjectButton = this.page.getByRole(RequestPublishProjectObjects_1.RequestPublishProjectObjects.newProjectButton.role, {
      name: RequestPublishProjectObjects_1.RequestPublishProjectObjects.newProjectButton.name,
    });
    await (0, test_1.expect)(newProjectButton).toBeVisible({ timeout: 90000 });
    await newProjectButton.click();
  }
  async fillAnyInputField(inputObject, value) {
    const input = this.page.locator(inputObject.xpath);
    await (0, test_1.expect)(input).toBeVisible({ timeout: 90000 });
    await input.fill(String(value));
  }
  async selectAnyDropdownOption(dropdownObject, optionObject) {
    const dropdown = this.page.locator(dropdownObject.xpath);
    await (0, test_1.expect)(dropdown).toBeVisible({ timeout: 90000 });
    await dropdown.click();
    const option = this.page.getByRole(optionObject.role, {
      name: optionObject.name,
      ...(optionObject.exact !== undefined && { exact: optionObject.exact }),
    });
    await (0, test_1.expect)(option).toBeVisible({ timeout: 90000 });
    await option.click();
  }
  async clickBookableToggle() {
    const bookableToggle = this.page.locator(RequestPublishProjectObjects_1.RequestPublishProjectObjects.bookableToggle.xpath);
    await (0, test_1.expect)(bookableToggle).toBeVisible({ timeout: 90000 });
    await bookableToggle.click();
  }
  async clickNextButton() {
    const nextButton = this.page.getByRole(RequestPublishProjectObjects_1.RequestPublishProjectObjects.nextButton.role, {
      name: RequestPublishProjectObjects_1.RequestPublishProjectObjects.nextButton.name,
    });
    await (0, test_1.expect)(nextButton).toBeVisible({ timeout: 90000 });
    await nextButton.click();
  }
  async clickBankCheckbox() {
    const bankCheckbox = this.page.locator(RequestPublishProjectObjects_1.RequestPublishProjectObjects.bankCheckbox.xpath);
    await (0, test_1.expect)(bankCheckbox).toBeVisible({ timeout: 90000 });
    await bankCheckbox.click();
  }
  async clickLendingPaymentDropdownButton() {
    const lendingPaymentDropdownButton = this.page.locator(RequestPublishProjectObjects_1.RequestPublishProjectObjects.lendingPaymentDropdownButton.xpath);
    await (0, test_1.expect)(lendingPaymentDropdownButton).toBeVisible({ timeout: 90000 });
    await lendingPaymentDropdownButton.click();
  }
  async clickCashPaymentDropdownButton() {
    const cashPaymentDropdownButton = this.page.locator(RequestPublishProjectObjects_1.RequestPublishProjectObjects.cashPaymentDropdwonButton.xpath);
    await (0, test_1.expect)(cashPaymentDropdownButton).toBeVisible({ timeout: 90000 });
    await cashPaymentDropdownButton.click();
  }
  async clickConfirmAndSendButton() {
    const confirmAndSendButton = this.page.getByRole(RequestPublishProjectObjects_1.RequestPublishProjectObjects.confirmAndSendButton.role, {
      name: RequestPublishProjectObjects_1.RequestPublishProjectObjects.confirmAndSendButton.name,
    });
    await (0, test_1.expect)(confirmAndSendButton).toBeVisible({ timeout: 90000 });
    await confirmAndSendButton.click();
  }
  async clickSendButton() {
    const sendButton = this.page.getByRole(RequestPublishProjectObjects_1.RequestPublishProjectObjects.sendButton.role, {
      name: RequestPublishProjectObjects_1.RequestPublishProjectObjects.sendButton.name,
    });
    await (0, test_1.expect)(sendButton).toBeVisible({ timeout: 90000 });
    await sendButton.click();
  }
  async verifySuccessMessageIsVisible() {
    const successMessage = this.page.getByText(RequestPublishProjectObjects_1.RequestPublishProjectObjects.successMessage.name);
    await (0, test_1.expect)(successMessage).toBeVisible({ timeout: 90000 });
  }
  async clickDeveloperProjectsTab() {
    const developerProjectsTab = this.page.getByText(RequestPublishProjectObjects_1.RequestPublishProjectObjects.developerProjectsTab.text);
    await (0, test_1.expect)(developerProjectsTab).toBeVisible({ timeout: 90000 });
    await developerProjectsTab.click();
  }
  async clickApproveButton() {
    const approveButton = this.page.getByRole(RequestPublishProjectObjects_1.RequestPublishProjectObjects.approveButton.role, {
      name: RequestPublishProjectObjects_1.RequestPublishProjectObjects.approveButton.name,
    });
    await (0, test_1.expect)(approveButton).toBeVisible({ timeout: 90000 });
    await approveButton.click();
  }
  async verifySuccessApprovedToastMessageIsVisible() {
    const approvedSuccessToast = this.page.getByText(RequestPublishProjectObjects_1.RequestPublishProjectObjects.approvedSuccessToast.text);
    await (0, test_1.expect)(approvedSuccessToast).toBeVisible({ timeout: 90000 });
  }
  async verifySuccessApprovedUnitsToastMessageIsVisible() {
    const approvedUnitSuccessToast = this.page.getByText(RequestPublishProjectObjects_1.RequestPublishProjectObjects.approvedUnitSuccessToast.text);
    await (0, test_1.expect)(approvedUnitSuccessToast).toBeVisible({ timeout: 90000 });
  }
  async verifyProjectName(expectedProjectName) {
    const projectName = this.page.locator(RequestPublishProjectObjects_1.RequestPublishProjectObjects.projectName.xpath);
    await (0, test_1.expect)(projectName).toHaveText(expectedProjectName, {
      timeout: 90000,
    });
  }
}
exports.RequestPublishProjectPage = RequestPublishProjectPage;
