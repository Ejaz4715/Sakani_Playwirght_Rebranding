'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.WaitingListPage = void 0;
const test_1 = require('@playwright/test');
const WaitinListObjects_1 = require('@objects/WaitinListObjects');
const BookingCancellationObjects_1 = require('@objects/BookingCancellationObjects');
class WaitingListPage {
  constructor(page) {
    this.page = page;
  }
  async clickOnWaitingListSideButton() {
    const waitingListSideButton = this.page.getByRole(WaitinListObjects_1.WaitinListObjects.waitingListSideButton.role, { name: WaitinListObjects_1.WaitinListObjects.waitingListSideButton.name });
    await (0, test_1.expect)(waitingListSideButton).toBeVisible({ timeout: 90000 });
    await waitingListSideButton.click();
  }
  async clickOnNewRegisterButton() {
    const newRegisterButton = this.page.getByRole(WaitinListObjects_1.WaitinListObjects.newRegisterButton.role, { name: WaitinListObjects_1.WaitinListObjects.newRegisterButton.name });
    await (0, test_1.expect)(newRegisterButton).toBeVisible({ timeout: 90000 });
    await newRegisterButton.click();
  }
  async fillSearchInputfield(value) {
    const searchInputfield = this.page.getByRole(WaitinListObjects_1.WaitinListObjects.searchInputfield.role);
    await (0, test_1.expect)(searchInputfield).toBeVisible({ timeout: 90000 });
    await searchInputfield.fill(value);
  }
  async clickOnSearchButton() {
    const searchButton = this.page.getByRole(WaitinListObjects_1.WaitinListObjects.searchButton.role, { name: WaitinListObjects_1.WaitinListObjects.searchButton.name });
    await (0, test_1.expect)(searchButton).toBeVisible({ timeout: 90000 });
    await searchButton.click();
  }
  async clickOnNextButton() {
    const nextButton = this.page.getByRole(WaitinListObjects_1.WaitinListObjects.nextButton.role, { name: WaitinListObjects_1.WaitinListObjects.nextButton.name });
    await (0, test_1.expect)(nextButton).toBeVisible({ timeout: 90000 });
    await nextButton.click();
  }
  async fillProjectSearchInputfield(value) {
    const projectSearchInputfield = this.page.getByRole(WaitinListObjects_1.WaitinListObjects.projectSearchInputfield.role, {
      name: WaitinListObjects_1.WaitinListObjects.projectSearchInputfield.name,
    });
    await this.page.waitForTimeout(6000);
    await (0, test_1.expect)(projectSearchInputfield).toBeVisible({ timeout: 90000 });
    await projectSearchInputfield.fill(value);
  }
  async clickOnSelectProjectButton() {
    const selectProjectButton = this.page.getByRole(WaitinListObjects_1.WaitinListObjects.selectProjectButton.role, { name: WaitinListObjects_1.WaitinListObjects.selectProjectButton.name });
    await this.page.waitForTimeout(5000);
    await (0, test_1.expect)(selectProjectButton).toBeVisible({ timeout: 90000 });
    await selectProjectButton.click();
  }
  async clickOnProjectRadioCheck() {
    const projectRadioCheck = this.page.locator(WaitinListObjects_1.WaitinListObjects.projectRadioCheck.css);
    await (0, test_1.expect)(projectRadioCheck).toBeVisible({ timeout: 90000 });
    await projectRadioCheck.click();
  }
  async clickOnConfirmButton() {
    const confirmButton = this.page.getByRole(WaitinListObjects_1.WaitinListObjects.confirmButton.role, { name: WaitinListObjects_1.WaitinListObjects.confirmButton.name });
    await (0, test_1.expect)(confirmButton).toBeVisible({ timeout: 90000 });
    await confirmButton.click();
  }
  async clickOnConfirmButtonPopup() {
    const confirmButtonPopup = this.page.locator(WaitinListObjects_1.WaitinListObjects.confirmButtonPopup.xpath);
    await (0, test_1.expect)(confirmButtonPopup).toBeVisible({ timeout: 90000 });
    await confirmButtonPopup.click();
  }
  async verifyRegistrationSuccessMessage() {
    const registrationSuccessMessage = this.page.getByText(WaitinListObjects_1.WaitinListObjects.registrationSuccessMessage.text);
    await (0, test_1.expect)(registrationSuccessMessage).toBeVisible({ timeout: 90000 });
  }
  async clickOnMyActivities() {
    const myActivities = this.page.getByText(WaitinListObjects_1.WaitinListObjects.myActivities.text);
    await (0, test_1.expect)(myActivities).toBeVisible({ timeout: 90000 });
    await myActivities.click();
  }
  async clickOnRegisteredWaitingList() {
    const registeredWaitingList = this.page.getByText(WaitinListObjects_1.WaitinListObjects.registeredWaitingList.text);
    await (0, test_1.expect)(registeredWaitingList).toBeVisible({ timeout: 90000 });
    await registeredWaitingList.click();
  }
  async clickOnActiveTab() {
    const activeTab = this.page.getByRole(WaitinListObjects_1.WaitinListObjects.activeTab.role, { name: WaitinListObjects_1.WaitinListObjects.activeTab.name });
    await (0, test_1.expect)(activeTab).toBeVisible({ timeout: 90000 });
    await activeTab.click();
  }
  async clickOnCancelRequestButton() {
    const cancelRequestButton = this.page.getByRole(WaitinListObjects_1.WaitinListObjects.cancelRequestButton.role, { name: WaitinListObjects_1.WaitinListObjects.cancelRequestButton.name });
    await (0, test_1.expect)(cancelRequestButton).toBeVisible({ timeout: 90000 });
    await cancelRequestButton.click();
  }
  async clickOnConfirmCancellationButton() {
    const confirmCancellationButton = this.page.getByRole(WaitinListObjects_1.WaitinListObjects.confirmCancellationButton.role, {
      name: WaitinListObjects_1.WaitinListObjects.confirmCancellationButton.name,
    });
    await (0, test_1.expect)(confirmCancellationButton).toBeVisible({ timeout: 90000 });
    await confirmCancellationButton.click();
  }
  async verifyNoActiveWaitingListProjectsMessage() {
    const noActiveWaitingListProjectsMessage = this.page.getByRole(WaitinListObjects_1.WaitinListObjects.noActiveWaitingListProjectsMessage.role, {
      name: WaitinListObjects_1.WaitinListObjects.noActiveWaitingListProjectsMessage.name,
    });
    await (0, test_1.expect)(noActiveWaitingListProjectsMessage).toBeVisible({ timeout: 90000 });
  }
  async clickOnUserIcon() {
    const userProfileButton = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.userProfileButton);
    await (0, test_1.expect)(userProfileButton).toBeVisible({ timeout: 90000 });
    await userProfileButton.click();
  }
  async ClickOnUserProfile() {
    const userProfile = this.page.getByText(WaitinListObjects_1.WaitinListObjects.userProfile.text);
    await (0, test_1.expect)(userProfile).toBeVisible({ timeout: 90000 });
    await userProfile.click();
  }
}
exports.WaitingListPage = WaitingListPage;
