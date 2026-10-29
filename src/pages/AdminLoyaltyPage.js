'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdminLoyaltyPage = void 0;
const CommonMethods_1 = require('@pages/utils/CommonMethods');
const test_1 = require('@playwright/test');
const AdminLoyaltyObjects_1 = require('@objects/AdminLoyaltyObjects');
class AdminLoyaltyPage {
  constructor(page) {
    this.page = page;
    this.commonMethods = new CommonMethods_1.CommonMethods(page);
  }
  async clickLoyaltyProgram() {
    await this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.loyaltyProgramLink.selector).filter({ hasText: AdminLoyaltyObjects_1.AdminLoyaltyObjects.loyaltyProgramLink.text }).click();
  }
  async clickManagePartners() {
    const managePartnersLink = this.page.getByRole(AdminLoyaltyObjects_1.AdminLoyaltyObjects.managePartnersLink.role, { name: AdminLoyaltyObjects_1.AdminLoyaltyObjects.managePartnersLink.name });
    await managePartnersLink.click();
  }
  async clickAddNewPartner() {
    await this.page.waitForTimeout(3000);
    await this.commonMethods.clickIfVisible(AdminLoyaltyObjects_1.AdminLoyaltyObjects.addPartnerLink);
  }
  async fillCompanyName(text) {
    const companyNameInput = this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.companyNameInput);
    await companyNameInput.fill(text);
  }
  async fillActivity(text = 'test activity') {
    const activityInput = this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.activityInput);
    await activityInput.fill(text);
  }
  async selectIsActiveOption(optionText) {
    const isActiveDropdown = this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.isActiveDropdown);
    await isActiveDropdown.click();
    await this.selectListOption(optionText);
  }
  async selectListOption(optionText) {
    await this.commonMethods.clickIfVisible({ xpath: `${AdminLoyaltyObjects_1.AdminLoyaltyObjects.dropdownOption}[normalize-space()='${optionText}']` });
  }
  async fillContactPerson(text) {
    const contactPersonInput = this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.contactPersonInput);
    await contactPersonInput.fill(text);
  }
  async fillContactEmail(text) {
    const contactEmailInput = this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.contactEmailInput);
    await contactEmailInput.fill(text);
  }
  async fillContactPhone(phone = '588938198') {
    const contactPhoneInput = this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.contactPhoneInput);
    await contactPhoneInput.fill(phone);
  }
  async fillContactWhatsapp(whatsapp = '58893819') {
    const contactWhatsappInput = this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.contactWhatsappInput);
    await contactWhatsappInput.fill(whatsapp);
  }
  async fillIbanNumber(iban = 'SA1111111111111111111111') {
    const ibanInput = this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.ibanInput);
    await ibanInput.fill(iban);
  }
  async fillBankAccountName(bankName = 'Al Rajhi') {
    const bankAccountNameInput = this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.bankAccountNameInput);
    await bankAccountNameInput.fill(bankName);
  }
  async uploadFile(imageFilePath) {
    const fileInput = this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.fileInput);
    await fileInput.waitFor({ state: 'attached' });
    await fileInput.setInputFiles(imageFilePath);
    await this.page.waitForTimeout(4000);
  }
  async clickSave() {
    await this.commonMethods.clickIfVisible(AdminLoyaltyObjects_1.AdminLoyaltyObjects.saveButton);
  }
  async validatePartnerAddedSuccessMessage() {
    const successMessage = this.page.getByText(AdminLoyaltyObjects_1.AdminLoyaltyObjects.partnerAddedSuccessMessage);
    await (0, test_1.expect)(successMessage, 'Success message is not visible').toBeVisible();
  }
  async clickManageDeals() {
    await this.page.getByRole(AdminLoyaltyObjects_1.AdminLoyaltyObjects.manageDealsLink.role, { name: AdminLoyaltyObjects_1.AdminLoyaltyObjects.manageDealsLink.name }).click();
  }
  async clickAddNewOffer() {
    await this.page.waitForTimeout(3000);
    await this.commonMethods.clickIfVisible(AdminLoyaltyObjects_1.AdminLoyaltyObjects.addNewOfferLink);
  }
  async selectCompanyName(optionText) {
    await this.commonMethods.clickIfVisible({ xpath: AdminLoyaltyObjects_1.AdminLoyaltyObjects.companyNameDropdown });
    await this.selectListOption(optionText);
  }
  async fillCampaignStartDate(startDate) {
    const campaignStartDateInput = this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.campaignStartDateInput).nth(1);
    await campaignStartDateInput.fill(startDate);
  }
  async fillCampaignEndDate(endDate) {
    const campaignEndDateInput = this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.campaignEndDateInput).nth(1);
    await campaignEndDateInput.fill(endDate);
  }
  async fillPrice(price = '5000') {
    const priceInput = this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.priceInput);
    await priceInput.fill(price);
  }
  async fillDiscount(discount = '2') {
    const discountInput = this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.discountInput);
    await discountInput.fill(discount);
  }
  async fillAcceptableQuantityPerUser(text) {
    const acceptableQuantityInput = this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.acceptableQuantityInput);
    await acceptableQuantityInput.fill(text);
  }
  async selectSakaniCommissionType(optionText) {
    await this.commonMethods.clickIfVisible({ xpath: AdminLoyaltyObjects_1.AdminLoyaltyObjects.sakaniCommissionTypeDropdown });
    await this.selectListOption(optionText);
  }
  async fillSakaniCommissionValue(value) {
    const sakaniCommissionValueInput = this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.sakaniCommissionValueInput);
    await sakaniCommissionValueInput.fill(value);
  }
  async fillTitle(title) {
    const titleInput = this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.titleInput);
    await titleInput.fill(title);
  }
  async fillDescription(description) {
    const descriptionInput = this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.descriptionInput);
    await descriptionInput.fill(description);
  }
  async fillDetails(details = 'Test Details') {
    const detailsInput = this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.detailsInput);
    await detailsInput.fill(details);
  }
  async fillTermsAndConditions(termsText = 'Testing terms and condition for sharrai offer') {
    const termsTextarea = this.page
      .getByRole(AdminLoyaltyObjects_1.AdminLoyaltyObjects.termsAndConditionsRegion.role, { name: AdminLoyaltyObjects_1.AdminLoyaltyObjects.termsAndConditionsRegion.name })
      .locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.termsTextarea);
    await termsTextarea.fill(termsText);
  }
  async clickDealIdentifiersTab() {
    await this.commonMethods.clickIfVisible(AdminLoyaltyObjects_1.AdminLoyaltyObjects.dealIdentifiersTab);
  }
  async clickImportOfferCodes() {
    await this.commonMethods.clickIfVisible(AdminLoyaltyObjects_1.AdminLoyaltyObjects.importOfferCodesButton);
  }
  async uploadDealFile(filePath) {
    const fileInput = this.page.locator(AdminLoyaltyObjects_1.AdminLoyaltyObjects.fileInput);
    await fileInput.waitFor({ state: 'attached' });
    await fileInput.setInputFiles(filePath);
    await this.page.waitForTimeout(4000);
  }
  async validateTheFileImportToast() {
    const toastMessage = this.page.getByText(AdminLoyaltyObjects_1.AdminLoyaltyObjects.importToastMessage);
    await (0, test_1.expect)(toastMessage, 'Toast message is not present').toBeVisible({ timeout: 10000 });
  }
  async clickFirstProcessedCell() {
    await this.page.waitForTimeout(5000);
    await this.page.reload();
    await this.page.waitForTimeout(2000);
    await this.commonMethods.clickIfVisible({ xpath: `(//*[normalize-space(text())='${AdminLoyaltyObjects_1.AdminLoyaltyObjects.processedStatusCell.name}'])[1]` });
  }
  async clickApprove() {
    await this.commonMethods.clickIfVisible(AdminLoyaltyObjects_1.AdminLoyaltyObjects.approveButton);
  }
  async clickConfirm() {
    await this.commonMethods.clickIfVisible(AdminLoyaltyObjects_1.AdminLoyaltyObjects.confirmButton);
  }
  async validateSendImportApprovalRequestToastMessageIsDisplayed() {
    const requestText = this.page.getByText(AdminLoyaltyObjects_1.AdminLoyaltyObjects.importApprovalRequestText);
    await (0, test_1.expect)(requestText, 'Toast message is not present').toBeVisible({ timeout: 20000 });
  }
  async searchAndNavigateToDeal(searchText) {
    const searchInput = this.page.getByRole(AdminLoyaltyObjects_1.AdminLoyaltyObjects.searchInput.role, { name: AdminLoyaltyObjects_1.AdminLoyaltyObjects.searchInput.name });
    await searchInput.fill(searchText);
    await this.commonMethods.clickIfVisible(AdminLoyaltyObjects_1.AdminLoyaltyObjects.searchButton);
    const resultItem = `//${AdminLoyaltyObjects_1.AdminLoyaltyObjects.searchResultContainer}[normalize-space()='${searchText}'][not(.//${AdminLoyaltyObjects_1.AdminLoyaltyObjects.searchResultContainer}[normalize-space()='${searchText}'])]`;
    await this.commonMethods.clickIfVisible({ xpath: resultItem });
  }
  async clickEdit() {
    await this.commonMethods.clickIfVisible(AdminLoyaltyObjects_1.AdminLoyaltyObjects.editButton);
  }
  async selectStatusToActive(optionText) {
    const statusDropdown = `//${AdminLoyaltyObjects_1.AdminLoyaltyObjects.statusDropdown.selector}[contains(normalize-space(.), '${AdminLoyaltyObjects_1.AdminLoyaltyObjects.statusDropdown.text}')]//*[@role='${AdminLoyaltyObjects_1.AdminLoyaltyObjects.statusDropdownCombobox.role}']`;
    await this.commonMethods.clickIfVisible({ xpath: statusDropdown });
    await this.selectListOption(optionText);
  }
  async selectActiveStatusOption() {
    await this.commonMethods.clickIfVisible(AdminLoyaltyObjects_1.AdminLoyaltyObjects.activeStatusOption);
  }
  async clickYesOnPopUp() {
    const yesButton = this.page.getByRole(AdminLoyaltyObjects_1.AdminLoyaltyObjects.yesButton.role, { name: AdminLoyaltyObjects_1.AdminLoyaltyObjects.yesButton.name });
    if (await yesButton.isVisible({ timeout: 3000 })) {
      await this.commonMethods.clickIfVisible(AdminLoyaltyObjects_1.AdminLoyaltyObjects.yesButton);
    }
  }
  async verifyActiveStatusVisible() {
    const activeStatusCell = this.page.getByRole(AdminLoyaltyObjects_1.AdminLoyaltyObjects.activeStatusTable.role).getByText(AdminLoyaltyObjects_1.AdminLoyaltyObjects.activeStatusText);
    await (0, test_1.expect)(activeStatusCell, 'Active status is not present').toBeVisible({ timeout: 30000 });
  }
}
exports.AdminLoyaltyPage = AdminLoyaltyPage;
