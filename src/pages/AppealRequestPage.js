'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AppealRequestPage = void 0;
const CommonMethods_1 = require('@pages/utils/CommonMethods');
const AppealRequestObjects_1 = require('@objects/AppealRequestObjects');
class AppealRequestPage {
  constructor(page) {
    this.page = page;
    this.commonMethod = new CommonMethods_1.CommonMethods(page);
  }
  async clickOnAppealRequestCard() {
    await this.commonMethod.clickElement(AppealRequestObjects_1.AppealRequestObjects.appealRequestCard);
  }
  // It will select reason whatever if duplicated
  async selectReason() {
    await this.commonMethod.selectDropdownOption(AppealRequestObjects_1.AppealRequestObjects.reasonDropdownList, AppealRequestObjects_1.AppealRequestObjects.reasonOption);
  }
  // It will enter comments whatever if duplicated
  async enterComments(comment) {
    await this.commonMethod.fillAllMatchingFields(AppealRequestObjects_1.AppealRequestObjects.commentsTextarea, comment);
  }
  async clickOnNextButton() {
    await this.commonMethod.clickElement(AppealRequestObjects_1.AppealRequestObjects.nextButton);
  }
  async uploadACopyOfNationalId(upload) {
    await this.commonMethod.uploadFile(AppealRequestObjects_1.AppealRequestObjects.uploadNationalId, upload);
    await this.page.waitForTimeout(5000);
  }
  async uploadACopyOfFamilyCard(upload) {
    await this.commonMethod.uploadFile(AppealRequestObjects_1.AppealRequestObjects.uploadImageFromFamilyCard, upload);
    await this.page.waitForTimeout(5000);
  }
  async clickOnSendButton() {
    await this.commonMethod.clickElement(AppealRequestObjects_1.AppealRequestObjects.sendButton);
  }
  async verifyUserSubmitTheRequest() {
    await this.commonMethod.verifyElementVisible(AppealRequestObjects_1.AppealRequestObjects.successfulMessage);
  }
  //Admin
  async clickOnTheAppeals() {
    await this.page.locator(AppealRequestObjects_1.AppealRequestObjects.AppealsLink.selector).filter({ hasText: AppealRequestObjects_1.AppealRequestObjects.AppealsLink.hasText }).click();
  }
  async enterBeneficiaryId(id) {
    await this.commonMethod.fill(AppealRequestObjects_1.AppealRequestObjects.beneficiaryId, String(id));
  }
  async clickOnSearchButton() {
    await this.commonMethod.clickElement(AppealRequestObjects_1.AppealRequestObjects.searchButton);
  }
  async selectTheSearchedResult() {
    await this.commonMethod.clickElement(AppealRequestObjects_1.AppealRequestObjects.searchResult);
  }
  async clickOnReassignButton() {
    await this.commonMethod.clickElement(AppealRequestObjects_1.AppealRequestObjects.reassignButton);
  }
  async selectTeam() {
    await this.commonMethod.selectDropdownOption(AppealRequestObjects_1.AppealRequestObjects.teamDropdownList, AppealRequestObjects_1.AppealRequestObjects.teamOption);
  }
  async selectUser() {
    await this.commonMethod.selectDropdownOption(AppealRequestObjects_1.AppealRequestObjects.userDropdownList, AppealRequestObjects_1.AppealRequestObjects.userOption);
  }
  async clickOnReassignButtonFromPopup() {
    await this.commonMethod.clickElement(AppealRequestObjects_1.AppealRequestObjects.reassignPopUpButton);
  }
  async clickOnConfirmButton() {
    await this.commonMethod.clickElement(AppealRequestObjects_1.AppealRequestObjects.confirmButton);
  }
  async clickOnCloseButtonFromPopup() {
    await this.commonMethod.clickElement(AppealRequestObjects_1.AppealRequestObjects.closePopUpButton);
  }
  async clickOnCloseButtonOfNotePopup() {
    await this.page.waitForTimeout(3000);
    await this.commonMethod.clickElement(AppealRequestObjects_1.AppealRequestObjects.closeButtonOfNote);
  }
  async clickOnApproveButton() {
    await this.commonMethod.clickElement(AppealRequestObjects_1.AppealRequestObjects.approveButton);
  }
  async verifyApprovalPopupMessageIsPresent() {
    await this.commonMethod.verifyElementVisible(AppealRequestObjects_1.AppealRequestObjects.approvalPopupMessage);
  }
}
exports.AppealRequestPage = AppealRequestPage;
