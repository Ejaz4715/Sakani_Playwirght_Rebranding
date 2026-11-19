import { Page, expect, Locator } from '@playwright/test';
import { CommonMethods } from '@pages/utils/CommonMethods';
import { SocialGuaranteeStatusObjects } from '@objects/SocialGuaranteeStatusObjects';
import { DeveloperObjects } from '@objects/DeveloperObjects';

const DEFAULT_TIMEOUT = 30_000;
const LONG_TIMEOUT = 90_000;
export class SocialGuaranteeStatusPage {
  page: Page;
  defaultTimeout: number | undefined;

  readonly commonMethod: CommonMethods;

  constructor(page: Page) {
    this.page = page;
    this.commonMethod = new CommonMethods(page);
  }
  async waitForVisible(locator: any) {
    await expect(locator).toBeVisible({ timeout: this.defaultTimeout });
  }
  async waitAndClick(locator: Locator, timeout = DEFAULT_TIMEOUT) {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.click();
  }
  async waitAndFill(locator: Locator, value: string, timeout = DEFAULT_TIMEOUT) {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.fill(value);
  }
  async clickOnManageReservation() {
    await this.waitAndClick(this.page.locator(DeveloperObjects.manageReservationsButton));
  }
  async clickOnIndividualReservation() {
    await this.waitAndClick(this.page.locator(DeveloperObjects.individualBooking));
  }
  async clickOnNewReservationButton() {
    await this.waitAndClick(this.page.locator(DeveloperObjects.newBookingButton), LONG_TIMEOUT);
  }
  async fillNationalId(nationalIdentity: string) {
    await this.waitAndFill(this.page.locator(DeveloperObjects.nationalIdentityField), nationalIdentity);
  }
  async clickOnSearchButton() {
    const searchButton = this.page.getByRole(DeveloperObjects.searchButton.role, { name: DeveloperObjects.searchButton.name });
    await this.waitForVisible(searchButton);
    await searchButton.click();
  }
  async verifySocialGuaranteeStatusIsPresent() {
    await this.commonMethod.verifyElementVisible(SocialGuaranteeStatusObjects.includedStatus);
  }
  async verifySocialGuaranteeStatusIsNotPresent() {
    await this.commonMethod.verifyElementNotVisible(SocialGuaranteeStatusObjects.includedStatus);
  }
  async clickOnViewDetailsButton() {
    await this.commonMethod.clickElement(SocialGuaranteeStatusObjects.viewDetailsButton);
  }
  async clickOnBookings() {
    await this.commonMethod.clickElement(SocialGuaranteeStatusObjects.bookingsListSideMenu);
  }
  async searchForNationalId(nationalIdentity: string) {
    await this.commonMethod.fill(SocialGuaranteeStatusObjects.searchInputfield, nationalIdentity);
  }
  async searchForProject(project: string) {
    await this.page.waitForTimeout(10000);
    await this.commonMethod.fill(SocialGuaranteeStatusObjects.projectInputfield, project);
    await this.page.waitForTimeout(3000);
  }
  async verifySocialGuaranteeStatusIsPresentFromAdmin() {
    await this.commonMethod.verifyElementVisible(SocialGuaranteeStatusObjects.includedStatusFromAdmin);
  }
  async verifySocialGuaranteeStatusIsNotPresentFromAdmin() {
    await this.commonMethod.verifyElementNotVisible(SocialGuaranteeStatusObjects.includedStatusFromAdmin);
  }
}
