'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BuyDesignPage = void 0;
const test_1 = require('@playwright/test');
const BuyDesignObjects_1 = require('@objects/BuyDesignObjects');
class BuyDesignPage {
  constructor(page) {
    this.page = page;
  }
  //Click on services button
  async clickOnServicesButton() {
    const servicesButton = this.page.getByRole(BuyDesignObjects_1.BuyDesignObjects.servicesButton.role, {
      name: BuyDesignObjects_1.BuyDesignObjects.servicesButton.name,
      exact: BuyDesignObjects_1.BuyDesignObjects.servicesButton.exact,
    });
    await (0, test_1.expect)(servicesButton).toBeVisible({ timeout: 90000 });
    await servicesButton.click();
  }
  //Click on view all services button
  async clickOnViewAllServicesButton() {
    const viewAllServicesButton = this.page.getByRole(BuyDesignObjects_1.BuyDesignObjects.viewAllServicesButton.role, { name: BuyDesignObjects_1.BuyDesignObjects.viewAllServicesButton.name });
    await (0, test_1.expect)(viewAllServicesButton).toBeVisible({ timeout: 90000 });
    await viewAllServicesButton.click();
  }
  //Click on self construction service link/card
  async clickOnSelfConstructionServiceLink() {
    const selfConstructionServiceLink = this.page.getByRole(BuyDesignObjects_1.BuyDesignObjects.selfConstructionServiceLink.role, {
      name: BuyDesignObjects_1.BuyDesignObjects.selfConstructionServiceLink.name,
    });
    await (0, test_1.expect)(selfConstructionServiceLink).toBeVisible({ timeout: 90000 });
    await selfConstructionServiceLink.click();
  }
  //Click on view details - first one
  async clickOnViewDetailsLink() {
    const viewDetailsLink = this.page.getByRole(BuyDesignObjects_1.BuyDesignObjects.viewDetailsLink.role, { name: BuyDesignObjects_1.BuyDesignObjects.viewDetailsLink.name });
    const firstViewDetailsLink = viewDetailsLink.first();
    await (0, test_1.expect)(firstViewDetailsLink).toBeVisible({ timeout: 90000 });
    await firstViewDetailsLink.click();
  }
  //Switch on advanced search
  async checkAdvancedSearchToggle() {
    const advancedSearchToggle = this.page.getByRole(BuyDesignObjects_1.BuyDesignObjects.advancedSearchToggle.role);
    await this.page.waitForTimeout(5000);
    await (0, test_1.expect)(advancedSearchToggle).toBeVisible({ timeout: 90000 });
    await advancedSearchToggle.check();
  }
  //Select design - Testcrew test
  async selectDesign() {
    const designCrewCombobox = this.page.getByRole(BuyDesignObjects_1.BuyDesignObjects.combobox.role).nth(1);
    const designCrewOption = this.page.getByRole(BuyDesignObjects_1.BuyDesignObjects.designCrewOption.role, { name: BuyDesignObjects_1.BuyDesignObjects.designCrewOption.name });
    await (0, test_1.expect)(designCrewCombobox).toBeVisible({ timeout: 90000 });
    await designCrewCombobox.click();
    await designCrewCombobox.fill(BuyDesignObjects_1.BuyDesignObjects.designCrewOption.name);
    await this.page.waitForTimeout(3000);
    await (0, test_1.expect)(designCrewOption).toBeVisible({ timeout: 90000 });
    await designCrewOption.click();
  }
  //Click on view design profile button
  async clickOnViewDesignProfileText() {
    const viewDesignProfileText = this.page.getByText(BuyDesignObjects_1.BuyDesignObjects.viewDesignProfileText.text);
    await this.page.waitForTimeout(5000);
    await (0, test_1.expect)(viewDesignProfileText).toBeVisible({ timeout: 90000 });
    await viewDesignProfileText.click();
  }
  //Click on view button
  async clickOnViewText() {
    const viewText = this.page.getByText(BuyDesignObjects_1.BuyDesignObjects.viewText.text).nth(5);
    await (0, test_1.expect)(viewText).toBeVisible({ timeout: 90000 });
    await viewText.click();
  }
  //Click on buy design button
  async clickOnBuyDesignButton() {
    const buyDesignButton = this.page.getByRole(BuyDesignObjects_1.BuyDesignObjects.buyDesignButton.role, { name: BuyDesignObjects_1.BuyDesignObjects.buyDesignButton.name });
    await (0, test_1.expect)(buyDesignButton).toBeVisible({ timeout: 90000 });
    await buyDesignButton.click();
  }
  //Select only design radio button
  async clickOnDesignOnlyOption() {
    const designOnlyText = this.page.getByText(BuyDesignObjects_1.BuyDesignObjects.designOnlyText.text);
    await (0, test_1.expect)(designOnlyText).toBeVisible({ timeout: 90000 });
    await designOnlyText.click();
  }
  //Select design with fitting radio button
  async clickOnDesignWithFittingOption() {
    const designWithFittingOption = this.page.getByText(BuyDesignObjects_1.BuyDesignObjects.designWithFittingOption.text, { exact: BuyDesignObjects_1.BuyDesignObjects.designWithFittingOption.exact });
    await (0, test_1.expect)(designWithFittingOption).toBeVisible({ timeout: 90000 });
    await designWithFittingOption.click();
  }
  //Select design with fitting and building permit radio button
  async clickOnDesignWithFittingAndBuildingPermitOption() {
    const designWithFittingAndBuildingPermitOption = this.page.getByText(BuyDesignObjects_1.BuyDesignObjects.designWithFittingAndBuildingPermitOption.text);
    await (0, test_1.expect)(designWithFittingAndBuildingPermitOption).toBeVisible({ timeout: 90000 });
    await designWithFittingAndBuildingPermitOption.click();
  }
  //Check on disclamer aligmnet
  async checkAlignmentCheckbox() {
    const alignmentCheckbox = this.page.locator(BuyDesignObjects_1.BuyDesignObjects.alignmentCheckbox.selector);
    await (0, test_1.expect)(alignmentCheckbox).toBeVisible({ timeout: 90000 });
    await alignmentCheckbox.check();
  }
  async fillFirstAlignmentInput(value) {
    const alignmentInput = this.page.getByRole(BuyDesignObjects_1.BuyDesignObjects.alignmentInput.role, { name: BuyDesignObjects_1.BuyDesignObjects.alignmentInput.name }).first();
    await (0, test_1.expect)(alignmentInput).toBeVisible({ timeout: 90000 });
    await alignmentInput.fill(value);
  }
  async fillSecondAlignmentInput(value) {
    const alignmentInput = this.page.getByRole(BuyDesignObjects_1.BuyDesignObjects.alignmentInput.role, { name: BuyDesignObjects_1.BuyDesignObjects.alignmentInput.name }).nth(1);
    await (0, test_1.expect)(alignmentInput).toBeVisible({ timeout: 90000 });
    await alignmentInput.fill(value);
  }
  async fillThirdAlignmentInput(value) {
    const alignmentInput = this.page.getByRole(BuyDesignObjects_1.BuyDesignObjects.alignmentInput.role, { name: BuyDesignObjects_1.BuyDesignObjects.alignmentInput.name }).nth(2);
    await (0, test_1.expect)(alignmentInput).toBeVisible({ timeout: 90000 });
    await alignmentInput.fill(value);
  }
  async clickOnWantFittingServiceButton() {
    const wantFittingServiceButton = this.page.getByRole(BuyDesignObjects_1.BuyDesignObjects.wantFittingServiceButton.role, {
      name: BuyDesignObjects_1.BuyDesignObjects.wantFittingServiceButton.name,
    });
    await (0, test_1.expect)(wantFittingServiceButton).toBeVisible({ timeout: 90000 });
    await wantFittingServiceButton.click();
  }
  async clickOnContinueButton() {
    const continueButton = this.page.getByRole(BuyDesignObjects_1.BuyDesignObjects.continueButton.role, { name: BuyDesignObjects_1.BuyDesignObjects.continueButton.name });
    await (0, test_1.expect)(continueButton).toBeVisible({ timeout: 90000 });
    await continueButton.click();
  }
  async checkTermsAndConditionsCheckbox() {
    const termsAndConditionsCheckbox = this.page.getByRole(BuyDesignObjects_1.BuyDesignObjects.termsAndConditionsCheckbox.role, {
      name: BuyDesignObjects_1.BuyDesignObjects.termsAndConditionsCheckbox.name,
    });
    await (0, test_1.expect)(termsAndConditionsCheckbox).toBeVisible({ timeout: 90000 });
    await termsAndConditionsCheckbox.check();
  }
  async clickOnPayNowButton() {
    const payNowButton = this.page.getByRole(BuyDesignObjects_1.BuyDesignObjects.payNowButton.role, { name: BuyDesignObjects_1.BuyDesignObjects.payNowButton.name });
    await (0, test_1.expect)(payNowButton).toBeVisible({ timeout: 90000 });
    await payNowButton.click();
  }
  async verifyPaymentSuccess() {
    const paymentSuccessHeading = this.page.getByRole(BuyDesignObjects_1.BuyDesignObjects.paymentSuccessHeading.role, { name: BuyDesignObjects_1.BuyDesignObjects.paymentSuccessHeading.name });
    await (0, test_1.expect)(paymentSuccessHeading).toBeVisible({ timeout: 120000 });
  }
}
exports.BuyDesignPage = BuyDesignPage;
