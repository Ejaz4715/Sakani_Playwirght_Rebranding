import { Page } from '@playwright/test';
import { CommonMethods } from '@pages/utils/CommonMethods';
import { EligibilityWaiverObjects } from '@objects/EligibilityWaiverObjects';

export class EligibilityWaiverPage {
  page: Page;

  readonly commonMethod: CommonMethods;

  constructor(page: Page) {
    this.page = page;
    this.commonMethod = new CommonMethods(page);
  }
  async clickOnWaiveTheEligibilityCard() {
    await this.commonMethod.clickElement(EligibilityWaiverObjects.waiveThEligibilityCard);
  }
  async clickOnNextButton() {
    await this.commonMethod.clickElement(EligibilityWaiverObjects.nextButton);
  }
  async clickOnWaiverAssigneeRadioButton() {
    await this.commonMethod.clickElement(EligibilityWaiverObjects.waiverAssigneeRadioButton);
  }
  async checkOnAgreeTermsAndConditions() {
    await this.commonMethod.clickElement(EligibilityWaiverObjects.agreesTermsAndCOnditionCheckbox);
  }
  async clickOnSubmitButton() {
    await this.commonMethod.clickElement(EligibilityWaiverObjects.submitButton);
  }
  async clickOnCloseButtonOfRatingPopup() {
    await this.commonMethod.clickIfVisible(EligibilityWaiverObjects.closeButtonRatingPopup);
  }
  async verifyTheWaiverRequestIsSubmitted() {
    await this.commonMethod.verifyElementVisible(EligibilityWaiverObjects.waivedSuccessfulMessage);
  }
  async clickOnUndoTheEligibilityWaiverCard() {
    await this.commonMethod.clickElement(EligibilityWaiverObjects.undoTheEligibilityWaiverCard);
  }
  async clickOnUndoReasonRadioButton() {
    await this.commonMethod.clickElement(EligibilityWaiverObjects.undoReasonRadioButton);
  }
  async checkOnUndoWaivedAgreement() {
    await this.commonMethod.clickElement(EligibilityWaiverObjects.undoWaiveAgreementCheckbox);
  }
  async verifyTheUndoWaiverRequestIsSubmitted() {
    await this.commonMethod.verifyElementVisible(EligibilityWaiverObjects.undoWaivedSuccessfulMessage);
  }
}
