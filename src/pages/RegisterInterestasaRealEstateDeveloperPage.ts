import { expect, Locator, Page } from '@playwright/test';
import { RegisterInterestasaRealEstateDeveloperObjects } from '@objects/RegisterInterestasaRealEstateDeveloperObjects';
import { runInThisContext } from 'node:vm';

const DEFAULT_TIMEOUT = 90_000;

export class RegisterInterestasaRealEstateDeveloperPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async ClikondeveloperTabButton() {
    await this.page.locator(RegisterInterestasaRealEstateDeveloperObjects.developerTabButton.xpath).click();
  }

  async ClickonregisterInterestLink() {
    const [newPage] = await Promise.all([this.page.context().waitForEvent('page', { timeout: DEFAULT_TIMEOUT }), this.page.locator(RegisterInterestasaRealEstateDeveloperObjects.registerInterestLink.xpath).click()]);
    this.page = newPage;
    await this.waitForFormToLoad();
  }

  async waitForFormToLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle').catch(() => {});
    await this.page.locator(RegisterInterestasaRealEstateDeveloperObjects.developerNameInput.xpath).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
  }

  async InsertdeveloperName(DevelopernameInput: string) {
    await this.page.locator(RegisterInterestasaRealEstateDeveloperObjects.developerNameInput.xpath).fill(DevelopernameInput);
  }

  async InsertPhonenumber(phonenumber: string) {
    await this.page.locator(RegisterInterestasaRealEstateDeveloperObjects.phoneNumberInput.xpath).fill(phonenumber);
  }
  async InsertapplicantName(applicantName: string) {
    await this.page.locator(RegisterInterestasaRealEstateDeveloperObjects.applicantNameInput.xpath).fill(applicantName);
  }

  async selectprojectinfo() {
    await this.page.locator(RegisterInterestasaRealEstateDeveloperObjects.offPlanChipButton.xpath).click();
  }

  async Inserttotalprojectnumber(projectnumber: string) {
    await this.page.locator(RegisterInterestasaRealEstateDeveloperObjects.numberOfProjectsInput.xpath).fill(projectnumber);
  }

  async Insertunitnumber(unitnumber: string) {
    await this.page.locator(RegisterInterestasaRealEstateDeveloperObjects.totalUnitsInput.xpath).fill(unitnumber);
  }

  async SubmitButtion() {
    await this.page.locator(RegisterInterestasaRealEstateDeveloperObjects.submitRequestButton.xpath).click();
  }

  async VerifySucessfullymassage() {
    await expect(this.page.locator(RegisterInterestasaRealEstateDeveloperObjects.successMassageTitle.xpath)).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  }
  //Partiner

  async NavigatetoDevelopersSection() {
    await expect(this.page.locator(RegisterInterestasaRealEstateDeveloperObjects.DevelopersSection.xpath)).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  }

  async InsertpideveloperName(DevelopernameInput: string) {
    await this.page.locator(RegisterInterestasaRealEstateDeveloperObjects.piDeveloperNameInput.xpath).fill(DevelopernameInput);
  }

  async InsertpiPhonenumber(phonenumber: string) {
    await this.page.locator(RegisterInterestasaRealEstateDeveloperObjects.pinumberOfProjectsInput.xpath).fill(phonenumber);
  }
  async InsertpiapplicantName(applicantName: string) {
    await this.page.locator(RegisterInterestasaRealEstateDeveloperObjects.piapplicantNameInput.xpath).fill(applicantName);
  }

  async selectpiprojectinfo() {
    await this.page.locator(RegisterInterestasaRealEstateDeveloperObjects.pioffPlanChipButton.xpath).click();
  }

  async Inserttotalpiprojectnumber(projectnumber: string) {
    await this.page.locator(RegisterInterestasaRealEstateDeveloperObjects.pinumberOfProjectsInput.xpath).fill(projectnumber);
  }

  async Insertpiunitnumber(unitnumber: string) {
    await this.page.locator(RegisterInterestasaRealEstateDeveloperObjects.pitotalUnitsInput.xpath).fill(unitnumber);
  }

  async SubmitpiButtion() {
    await this.page.locator(RegisterInterestasaRealEstateDeveloperObjects.pisubmitRequestButton.xpath).click();
  }

  async VerifypiSucessfullymassage() {
    await expect(this.page.locator(RegisterInterestasaRealEstateDeveloperObjects.successMassageTitle.xpath)).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  }
}
