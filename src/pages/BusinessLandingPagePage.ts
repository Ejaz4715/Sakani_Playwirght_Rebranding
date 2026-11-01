import { Page } from "@playwright/test";
import { CommonMethods } from "@pages/utils/CommonMethods";
import { BusinessLandingObjects } from "@objects/BusinessLandingObjects";

export class BusinessLandingPagePage {
  page: Page;

  readonly commonMethod: CommonMethods;

  constructor(page: Page) {
    this.page = page;
    this.commonMethod = new CommonMethods(page);
  }
  async switchToBusinessRole() {
    await this.commonMethod.clickElement(
      BusinessLandingObjects.businessSwitchButton,
    );
  }
  async verifyBusinessLandingPageIsPresent() {
    await this.commonMethod.verifyElementVisible(
      BusinessLandingObjects.businessLandingPage,
    );
  }
  async verifyBusinessRolesComponentsArePresentInTabMenu() {
    await this.commonMethod.verifyElementVisible(
      BusinessLandingObjects.realEstateAnalysisTabButton,
    );
    await this.commonMethod.verifyElementVisible(
      BusinessLandingObjects.realEstateDeveloperTabButton,
    );
    await this.commonMethod.verifyElementVisible(
      BusinessLandingObjects.realEstateBrokerTabButton,
    );
  }
  async clickOnRealEstateAnalysisImageButton() {
    await this.commonMethod.clickElement(
      BusinessLandingObjects.realEstateAnalysisImageButton,
    );
  }
  async clickOnRealEstateDeveloperImageButton() {
    await this.commonMethod.clickElement(
      BusinessLandingObjects.realEstateDeveloperImageButton,
    );
  }
  async clickOnRealEstateBrokerImageButton() {
    await this.commonMethod.clickElement(
      BusinessLandingObjects.realEstateBrokerImageButton,
    );
  }
  async clickOnRealEstateAnalysisTabButton() {
    await this.commonMethod.clickElement(
      BusinessLandingObjects.realEstateAnalysisTabButton,
    );
  }
  async clickOnExploreDigitarForBrokerButton() {
    await this.commonMethod.clickElement(
      BusinessLandingObjects.exploreDigitarForBrokerButton,
    );
  }
  async clickOnRealEstateDeveloperTabButton() {
    await this.commonMethod.clickElement(
      BusinessLandingObjects.realEstateDeveloperTabButton,
    );
  }
  async clickOnExploreDigitarForRealEstateDeveloperButton() {
    await this.commonMethod.clickElement(
      BusinessLandingObjects.exploreDigitarForRealEstateDeveloperButton,
    );
  }
  async clickOnRealEstateBrokerTabButton() {
    await this.commonMethod.clickElement(
      BusinessLandingObjects.realEstateBrokerTabButton,
    );
  }
  async clickOnExploreDigitarForDataAnalystButton() {
    await this.commonMethod.clickElement(
      BusinessLandingObjects.exploreDigitarForDataAnalystButton,
    );
  }
  async clickOnEnglishLanguageButton() {
    await this.commonMethod.clickElement(
      BusinessLandingObjects.englishLanguageButton,
    );
  }
  async clickOnArabicLanguageButton() {
    await this.commonMethod.clickElement(
      BusinessLandingObjects.arabicLanguageButton,
    );
  }
  async verifySwitchToArabicLanguage() {
    await this.commonMethod.verifyElementVisible(
      BusinessLandingObjects.englishLanguageButton,
    );
  }
  async verifySwitchToEnglishLanguage() {
    await this.commonMethod.verifyElementVisible(
      BusinessLandingObjects.arabicLanguageButton,
    );
  }
  async clickOnBusinessUserIconButton() {
    await this.commonMethod.clickElement(
      BusinessLandingObjects.businessUserIconButton,
    );
  }
  async verifySwitchToIndividualRoleIsPresent() {
    await this.commonMethod.verifyElementVisible(
      BusinessLandingObjects.switchToIndividualButton,
    );
  }
}
