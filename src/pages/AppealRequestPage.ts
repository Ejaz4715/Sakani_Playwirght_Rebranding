import { Page } from '@playwright/test';
import { CommonMethods } from '@pages/utils/CommonMethods';
import { AppealRequestObjects } from '@objects/AppealRequestObjects';

export class AppealRequestPage {
  page: Page;

  readonly commonMethod: CommonMethods;

  constructor(page: Page) {
    this.page = page;
    this.commonMethod = new CommonMethods(page);
  }

  async clickOnAppealRequestCard() {
    await this.commonMethod.clickElement(AppealRequestObjects.appealRequestCard);
  }

  // It will select reason whatever if duplicated
  async selectReason() {
    await this.commonMethod.selectDropdownOption(AppealRequestObjects.reasonDropdownList, AppealRequestObjects.reasonOption);
  }
  // It will enter comments whatever if duplicated
  async enterComments(comment: string) {
    await this.commonMethod.fillAllMatchingFields(AppealRequestObjects.commentsTextarea, comment);
  }
  async clickOnNextButton() {
    await this.commonMethod.clickElement(AppealRequestObjects.nextButton);
  }
  async uploadACopyOfNationalId(upload: string) {
    await this.commonMethod.uploadFile(AppealRequestObjects.uploadNationalId, upload);
    await this.page.waitForTimeout(5000);
  }
  async uploadACopyOfFamilyCard(upload: string) {
    await this.commonMethod.uploadFile(AppealRequestObjects.uploadImageFromFamilyCard, upload);
    await this.page.waitForTimeout(5000);
  }
  async clickOnSendButton() {
    await this.commonMethod.clickElement(AppealRequestObjects.sendButton);
  }
  async verifyUserSubmitTheRequest() {
    await this.commonMethod.verifyElementVisible(AppealRequestObjects.successfulMessage);
  }
  //Admin
  async clickOnTheAppeals() {
    await this.page.locator(AppealRequestObjects.AppealsLink.selector).filter({ hasText: AppealRequestObjects.AppealsLink.hasText }).click();
  }
  async enterBeneficiaryId(id: string | number) {
    await this.commonMethod.fill(AppealRequestObjects.beneficiaryId, String(id));
  }
  async clickOnSearchButton() {
    await this.commonMethod.clickElement(AppealRequestObjects.searchButton);
  }
  async selectTheSearchedResult() {
    await this.commonMethod.clickElement(AppealRequestObjects.searchResult);
  }
  async clickOnReassignButton() {
    await this.commonMethod.clickElement(AppealRequestObjects.reassignButton);
  }
  async selectTeam() {
    await this.commonMethod.selectDropdownOption(AppealRequestObjects.teamDropdownList, AppealRequestObjects.teamOption);
  }
  async selectUser() {
    await this.commonMethod.selectDropdownOption(AppealRequestObjects.userDropdownList, AppealRequestObjects.userOption);
  }
  async clickOnReassignButtonFromPopup() {
    await this.commonMethod.clickElement(AppealRequestObjects.reassignPopUpButton);
  }
  async clickOnConfirmButton() {
    await this.commonMethod.clickElement(AppealRequestObjects.confirmButton);
  }
  async clickOnCloseButtonFromPopup() {
    await this.commonMethod.clickElement(AppealRequestObjects.closePopUpButton);
  }
  async clickOnCloseButtonOfNotePopup() {
    await this.page.waitForTimeout(3000);
    await this.commonMethod.clickElement(AppealRequestObjects.closeButtonOfNote);
  }
  async clickOnApproveButton() {
    await this.commonMethod.clickElement(AppealRequestObjects.approveButton);
  }
  async verifyApprovalPopupMessageIsPresent() {
    await this.commonMethod.verifyElementVisible(AppealRequestObjects.approvalPopupMessage);
  }
}
