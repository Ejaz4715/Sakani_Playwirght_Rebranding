'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.RealEstateTaxExemptionPage = void 0;
const RealEstateTaxExemptionObjects_1 = require('@objects/RealEstateTaxExemptionObjects');
const DEFAULT_TIMEOUT = 30_000;
class RealEstateTaxExemptionPage {
  constructor(page) {
    this.page = page;
  }
  async clickOnRealEstateTaxExemptionService() {
    const serviceButton = this.page.getByRole(RealEstateTaxExemptionObjects_1.RealEstateTaxExemptionObjects.realEstateTaxExemptionServiceButton.role, {
      name: RealEstateTaxExemptionObjects_1.RealEstateTaxExemptionObjects.realEstateTaxExemptionServiceButton.name,
    });
    await serviceButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await serviceButton.click();
  }
  async clickOnStartServiceButton() {
    const startServiceButton = this.page.getByRole(RealEstateTaxExemptionObjects_1.RealEstateTaxExemptionObjects.startServiceButton.role, {
      name: RealEstateTaxExemptionObjects_1.RealEstateTaxExemptionObjects.startServiceButton.name,
    });
    await startServiceButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await startServiceButton.click();
  }
  async getCertificateNumber() {
    const certificateNumber = this.page.getByText(RealEstateTaxExemptionObjects_1.RealEstateTaxExemptionObjects.certificateNumberText).first();
    await certificateNumber.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return (await certificateNumber.textContent()).trim();
  }
  async clickOnViewCertificateButton() {
    const viewCertificateButton = this.page.getByRole(RealEstateTaxExemptionObjects_1.RealEstateTaxExemptionObjects.viewCertificateButton.role, {
      name: RealEstateTaxExemptionObjects_1.RealEstateTaxExemptionObjects.viewCertificateButton.name,
    });
    await viewCertificateButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await viewCertificateButton.click();
  }
  async isCertificateDialogVisible() {
    const certificateDialog = this.page.getByRole(RealEstateTaxExemptionObjects_1.RealEstateTaxExemptionObjects.certificateDialog.role);
    await certificateDialog.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await certificateDialog.isVisible();
  }
  async closeCertificateDialog() {
    const certificateDialog = this.page.getByRole(RealEstateTaxExemptionObjects_1.RealEstateTaxExemptionObjects.certificateDialog.role);
    await this.page.keyboard.press('Escape');
    await certificateDialog.waitFor({ state: 'hidden', timeout: DEFAULT_TIMEOUT });
  }
  async downloadCertificate() {
    const downloadLink = this.page.getByRole(RealEstateTaxExemptionObjects_1.RealEstateTaxExemptionObjects.downloadCertificateLink.role, {
      name: RealEstateTaxExemptionObjects_1.RealEstateTaxExemptionObjects.downloadCertificateLink.name,
    });
    await downloadLink.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    const popupPromise = this.page.waitForEvent('popup');
    await downloadLink.click();
    const certificatePage = await popupPromise;
    await certificatePage.waitForLoadState();
    return certificatePage;
  }
  async clickOnCertificateInquiryTab() {
    const certificateInquiryTab = this.page.getByRole(RealEstateTaxExemptionObjects_1.RealEstateTaxExemptionObjects.certificateInquiryTab.role, {
      name: RealEstateTaxExemptionObjects_1.RealEstateTaxExemptionObjects.certificateInquiryTab.name,
    });
    await certificateInquiryTab.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await certificateInquiryTab.click();
  }
  async enterCertificateNumber(certificateNumber) {
    const certificateNumberField = this.page.getByRole(RealEstateTaxExemptionObjects_1.RealEstateTaxExemptionObjects.certificateNumberField.role, {
      name: RealEstateTaxExemptionObjects_1.RealEstateTaxExemptionObjects.certificateNumberField.name,
    });
    await certificateNumberField.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await certificateNumberField.fill(certificateNumber);
  }
  async enterNationalId(nationalId) {
    const nationalIdField = this.page.getByRole(RealEstateTaxExemptionObjects_1.RealEstateTaxExemptionObjects.nationalIdField.role, {
      name: RealEstateTaxExemptionObjects_1.RealEstateTaxExemptionObjects.nationalIdField.name,
    });
    await nationalIdField.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await nationalIdField.fill(nationalId);
  }
  async clickOnVerifyButton() {
    const verifyButton = this.page.getByRole(RealEstateTaxExemptionObjects_1.RealEstateTaxExemptionObjects.verifyButton.role, {
      name: RealEstateTaxExemptionObjects_1.RealEstateTaxExemptionObjects.verifyButton.name,
      exact: true,
    });
    await verifyButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await verifyButton.click();
  }
  async isCertificateDetailDisplayed(value) {
    const detail = this.page.getByText(value, { exact: true }).filter({ visible: true }).first();
    await detail.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await detail.isVisible();
  }
  async isCertificateNotBelongMessageVisible() {
    const message = this.page.getByText(RealEstateTaxExemptionObjects_1.RealEstateTaxExemptionObjects.certificateNotBelongMessage);
    await message.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await message.isVisible();
  }
}
exports.RealEstateTaxExemptionPage = RealEstateTaxExemptionPage;
