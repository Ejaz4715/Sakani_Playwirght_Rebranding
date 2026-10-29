'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UnitsDeliveryPage = void 0;
const UnitsDeliveryObjects_1 = require('@objects/UnitsDeliveryObjects');
let DEFAULT_TIMEOUT = 30_000;
class UnitsDeliveryPage {
  constructor(page) {
    this.page = page;
  }
  async clickOnUnitsDelivery() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.unitDeliveryLink.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.unitDeliveryLink.xpath).click();
  }
  async clickOnStartForPreparingUnitDelivery() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.startForPreparingUnitsForDelivery.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.startForPreparingUnitsForDelivery.xpath).click();
  }
  async clickOnStartForReadyUnitDelivery() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.startForReadyUnitsForDelivery.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.startForReadyUnitsForDelivery.xpath).click();
  }
  async selectSearchingUsingProjectName() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.searchDropdownMenu.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.searchDropdownMenu.xpath).click();
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.projectNameSelectorForSearch.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.projectNameSelectorForSearch.xpath).click();
  }
  async selectSearchingUsingUnitCode() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.searchDropdownMenu.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.searchDropdownMenu.xpath).click();
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.unitCodeSelectorForSearch.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.unitCodeSelectorForSearch.xpath).click();
    await this.page.waitForTimeout(3000);
  }
  async fillProjectName(projectName) {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.projectNameTextField.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.projectNameTextField.xpath).fill(projectName);
    await this.page.waitForTimeout(3000);
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.projectNameDropdownOption.xpath).click();
    await this.page.waitForTimeout(3000);
  }
  async fillUnitCode(unitCode) {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.unitCodeTextField.css).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.unitCodeTextField.css).fill(unitCode);
    await this.page.waitForTimeout(3000);
  }
  async clickOnSearch() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.searchButton.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.searchButton.xpath).click();
  }
  async clickOnSelectProject() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.selectProjectButton.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.selectProjectButton.xpath).click();
  }
  async clickOnSelectUnit() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.selectUnitButton.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.selectUnitButton.xpath).click();
  }
  async clickOnReadyForDelivery() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.readyForDeliveryCheckbox.css).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.waitForTimeout(3000);
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.readyForDeliveryCheckbox.css).click();
  }
  async selectDeliveryDate() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.calendarIcon.css).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.calendarIcon.css).click();
    await this.page.waitForTimeout(3000);
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.visibleAllowedDataLocator.css).first().waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.visibleAllowedDataLocator.css).first().click();
  }
  async selectDeliveryTime() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.timeDropdownMenu.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.timeDropdownMenu.xpath).click();
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.firstAvailableDeliveryTime.css).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.firstAvailableDeliveryTime.css).click();
  }
  async clickOnSend() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.sendButton.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.sendButton.xpath).click();
  }
  async isUnitReadyForDelivery() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.deliveryReadinessSuccessfulMessage.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    return await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.deliveryReadinessSuccessfulMessage.xpath).isVisible();
  }
  async sendToCustomerForDelivery() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.unitCheckBox.css).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.unitCheckBox.css).click();
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.sendAllMarkedUnitsButton.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.sendAllMarkedUnitsButton.xpath).click();
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.agreePopUpButton.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.agreePopUpButton.xpath).click();
  }
  async isUnitDelivered() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.deliverySuccessMessage.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    return await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.deliverySuccessMessage.xpath).isVisible();
  }
  async clickOnUnitDeliveryFromSakani() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.unitDeliveryLinkFromSakani.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.unitDeliveryLinkFromSakani.xpath).click();
  }
  async clickUnitDeliveryConfirmationFromSakani() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.unitDeliveryConfirmationFromSakani.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.unitDeliveryConfirmationFromSakani.xpath).click();
  }
  async clickOnPendingUnitsForDelivery() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.pendingUnitDelivery.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.pendingUnitDelivery.xpath).click();
  }
  async clickOnShowDeliveryUnitModel() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.showDeliveryUnitModelButton.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.showDeliveryUnitModelButton.xpath).click();
  }
  async agreeOnUnitDeliveryState() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.agreeCheckbox.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.agreeCheckbox.xpath).click();
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.continueButton.xpath).click();
  }
  async agreeOnUnitDelivery() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.agreeOnDeliveryUnit.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.agreeOnDeliveryUnit.xpath).click();
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.continueButton.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.continueButton.xpath).click();
  }
  async agreeOnTermsAndConditions() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.termsAndConditionsCheckbox.css).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.termsAndConditionsCheckbox.css).click();
  }
  async typeVerifyOtpCode() {
    const otpInputs = this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.verifyField.xpath);
    const inputsArray = await otpInputs.all();
    const otpCode = '1234';
    for (let i = 0; i < inputsArray.length; i++) {
      const character = otpCode[i];
      await inputsArray[i].fill(character);
    }
    await this.page.waitForTimeout(5000);
  }
  async clickOnVerify() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.verifyButton.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.verifyButton.xpath).click();
  }
  async isUnitDeliveredAndAcceptedFromSakani() {
    await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.unitDeliverySuccessMessage.xpath).waitFor({
      state: 'visible',
      timeout: DEFAULT_TIMEOUT,
    });
    return await this.page.locator(UnitsDeliveryObjects_1.UnitsDeliveryObjects.unitDeliverySuccessMessage.xpath).isVisible();
  }
}
exports.UnitsDeliveryPage = UnitsDeliveryPage;
