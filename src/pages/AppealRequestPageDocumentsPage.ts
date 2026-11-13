import { Page } from "@playwright/test";
import { CommonMethods } from "@pages/utils/CommonMethods";
import { AppealRequestDocuments } from "@objects/AppealRequestDocuments";
export class AppealRequestPageDocumentsPage {
  page: Page;
  readonly commonMethod: CommonMethods;
  constructor(page: Page) {
    this.page = page;
    this.commonMethod = new CommonMethods(page);
  }
  async clickOnReassignButton() {
    await this.commonMethod.clickElement(AppealRequestDocuments.resetButton);
  }
  async VerifyConfirmAllocationpopup() {
    await this.commonMethod.verifyElementVisible(
      AppealRequestDocuments.AppealDocument,
    );
  }
  async verifyIneligibilityReasonLabel() {
    await this.commonMethod.verifyElementVisible(
      AppealRequestDocuments.ineligibilityReasonLabel,
    );
  }
  async ClickonConfirmButton() {
    await this.commonMethod.clickElement(AppealRequestDocuments.confirmButton);
  }
  async RequireddocumentsButton() {
    await this.commonMethod.clickElement(AppealRequestDocuments.AppealDocument);
  }
  async ClickonDropdownPlaceholder() {
    await this.commonMethod.clickElement(
      AppealRequestDocuments.singleDropdownPlaceholder,
    );
  }
  async ClickonFamilyOwnedHomeMessage() {
    await this.commonMethod.clickElement(
      AppealRequestDocuments.familyOwnedHomeMessage,
    );
  }
  async ClickonMultiDropdownPlaceholder() {
    await this.commonMethod.clickElement(
      AppealRequestDocuments.multiDropdownPlaceholder,
    );
  }
  async ClickonNationalIdCopyLabel() {
    await this.commonMethod.clickElement(
      AppealRequestDocuments.nationalIdCopyLabel,
    );
  }
  async ClickonInheritanceDeedLabel() {
    await this.commonMethod.clickElement(
      AppealRequestDocuments.inheritanceDeedLabel,
    );
  }
  async ClickonAbsherBeneficiaryLabel() {
    await this.commonMethod.clickElement(
      AppealRequestDocuments.absherBeneficiaryLabel,
    );
  }
  async ClickonAddAndFollowButton() {
    await this.commonMethod.clickElement(
      AppealRequestDocuments.addAndFollowButton,
    );
  }
  async VerifyCloseButton() {
    await this.commonMethod.verifyElementVisible(
      AppealRequestDocuments.closeButtonFrist,
    );
  }
  async ClickonSubmitRequestButton() {
    await this.commonMethod.clickElement(
      AppealRequestDocuments.submitRequestButtonforApproveRequest,
    );
  }
  async ClickonClosePopupButtonsecond() {
    await this.commonMethod.clickElement(
      AppealRequestDocuments.closePopupButtonSecond,
    );
  }
  async ClickonClosePopupButtonTherd() {
    await this.commonMethod.clickElement(
      AppealRequestDocuments.closePopupButtonTherd,
    );
  }
  async ClickonMultiSelectInput() {
    await this.commonMethod.clickElement(
      AppealRequestDocuments.multiSelectInput,
    );
  }
  async ClickonDeedCopyOption() {
    await this.commonMethod.clickElement(AppealRequestDocuments.deedCopyOption);
  }
  async VerifyRequerdDocumentsPopup() {
    await this.commonMethod.verifyElementVisible(
      AppealRequestDocuments.reqouredDocumentaionpopup,
    );
  }

  async VerifyConfirmDocumentRequestHeading() {
    await this.commonMethod.verifyElementVisible(
      AppealRequestDocuments.confirmDocumentRequestHeading,
    );
  }
  async verifyCancelButtonpopup() {
    await this.commonMethod.verifyElementVisible(
      AppealRequestDocuments.cancelButton,
    );
  }
  async clickonconfirmbuttonfordocumentationpopup() {
    await this.commonMethod.clickElement(
      AppealRequestDocuments.confirmButtonfordocumentationRequest,
    );
  }
  async VerifyonDocumentsAlert() {
    await this.commonMethod.verifyElementVisible(
      AppealRequestDocuments.documentsAlert,
    );
  }
  async ClickonUploadDocumentsButton() {
    await this.commonMethod.clickElement(
      AppealRequestDocuments.uploadDocumentsButton,
    );
  }

  async uploadACopyOfNationalId(upload: string) {
    await this.commonMethod.uploadFile(
      AppealRequestDocuments.uploadNationalId,
      upload,
    );
    await this.page.waitForTimeout(5000);
  }
  async uploadACopyOfAbsherBeneficiary(upload: string) {
    await this.commonMethod.uploadFile(
      AppealRequestDocuments.uploadAbsherBeneficiary,
      upload,
    );
    await this.page.waitForTimeout(5000);
  }
  async clickonsendRequestButton() {
    await this.commonMethod.clickElement(AppealRequestDocuments.sendButton);
  }
  //from Admin portal
  async clickonrejectButton() {
    await this.commonMethod.clickElement(AppealRequestDocuments.rejectButton);
  }
  async verifyRejectionReasonHeading() {
    await this.commonMethod.verifyElementVisible(
      AppealRequestDocuments.rejectionReasonHeading,
    );
  }
  async clickonFamilyOwnedHomeOption() {
    await this.commonMethod.clickElement(
      AppealRequestDocuments.familyOwnedHomeOption,
    );
  }
  async verifyObjectionrejiction() {
    await this.commonMethod.verifyElementVisible(
      AppealRequestDocuments.objectionRejectionInstructionText,
    );
  }
  async inserttextrejectionreason(reason: string) {
    await this.commonMethod.fill(
      AppealRequestDocuments.objectionTextarea,
      reason,
    );
  }
  async ClickonClosePopupButtonIfPresent() {
    try {
      await this.commonMethod.clickIfVisible(
        AppealRequestDocuments.closePopupButtonTherd,
        { timeout: 5000 },
      );
    } catch {}
  }
  async ClickonThirdButtonOfPopup() {
    const thirdButton = this.page.getByRole("button").nth(2);
    await thirdButton.waitFor({ state: "visible" });
    await thirdButton.click();
  }

  async VerifyUnderProceesingLapleDisplay() {
    await this.commonMethod.verifyElementVisible(
      AppealRequestDocuments.underProcessingLabel,
    );
  }

  async VerifyRequiredDocumentsLabel() {
    await this.commonMethod.verifyElementVisible(
      AppealRequestDocuments.requiredDocumentsLabel,
    );
  }

  async VerifyDocumentsSentSuccessMessage() {
    await this.commonMethod.verifyElementVisible(
      AppealRequestDocuments.documentsSentSuccessMessage,
    );
  }
}
