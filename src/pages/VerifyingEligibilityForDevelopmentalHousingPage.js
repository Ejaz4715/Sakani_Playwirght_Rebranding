'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.VerifyingEligibilityForDevelopmentalHousingPage = void 0;
const test_1 = require('@playwright/test');
const VerifyingEligibilityForDevelopmentalHousingObjects_1 = require('@objects/VerifyingEligibilityForDevelopmentalHousingObjects');
class VerifyingEligibilityForDevelopmentalHousingPage {
  constructor(page) {
    this.page = page;
  }
  async clickDevelopmentalHousingEligibilityLink() {
    const eligibilityLink = this.page.getByRole(VerifyingEligibilityForDevelopmentalHousingObjects_1.VerifyingEligibilityForHevelopmentalHousingObjects.developmentalHousingEligibilityLink.role, {
      name: VerifyingEligibilityForDevelopmentalHousingObjects_1.VerifyingEligibilityForHevelopmentalHousingObjects.developmentalHousingEligibilityLink.name,
    });
    await (0, test_1.expect)(eligibilityLink).toBeVisible({ timeout: 90000 });
    await eligibilityLink.click();
  }
  async clickCheckStatusButton() {
    const checkStatusButton = this.page.getByRole(VerifyingEligibilityForDevelopmentalHousingObjects_1.VerifyingEligibilityForHevelopmentalHousingObjects.checkStatusButton.role, {
      name: VerifyingEligibilityForDevelopmentalHousingObjects_1.VerifyingEligibilityForHevelopmentalHousingObjects.checkStatusButton.name,
    });
    await (0, test_1.expect)(checkStatusButton).toBeVisible({ timeout: 90000 });
    await checkStatusButton.click();
  }
  async fillNationalIdInputfield(value) {
    const nationalIdInputfield = this.page.getByRole(VerifyingEligibilityForDevelopmentalHousingObjects_1.VerifyingEligibilityForHevelopmentalHousingObjects.nationalIdInputfield.role);
    await (0, test_1.expect)(nationalIdInputfield).toBeVisible({ timeout: 90000 });
    await nationalIdInputfield.fill(String(value));
  }
  async verifyWrongNationalIdMessageIsVisible() {
    const message = this.page.getByText(VerifyingEligibilityForDevelopmentalHousingObjects_1.VerifyingEligibilityForHevelopmentalHousingObjects.WrongNationalIdMessage.text);
    await (0, test_1.expect)(message).toBeVisible({ timeout: 90000 });
  }
  async verifyWrongIdMessageIsVisible() {
    const message = this.page.getByText(VerifyingEligibilityForDevelopmentalHousingObjects_1.VerifyingEligibilityForHevelopmentalHousingObjects.WrongIdMessage.text);
    await (0, test_1.expect)(message).toBeVisible({ timeout: 90000 });
  }
}
exports.VerifyingEligibilityForDevelopmentalHousingPage = VerifyingEligibilityForDevelopmentalHousingPage;
