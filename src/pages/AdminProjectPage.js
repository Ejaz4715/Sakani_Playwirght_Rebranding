'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdminProjectPage = void 0;
const AdminProjectsObjects_1 = require('@objects/AdminProjectsObjects');
const test_1 = require('@playwright/test');
class AdminProjectPage {
  constructor(page) {
    this.page = page;
  }
  async login(url, username, password, otp = '1234') {
    await this.page.goto(url);
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.loginUsernameInput).fill(username);
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.loginPasswordInput).fill(password);
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.loginButton.role, {
        name: AdminProjectsObjects_1.AdminObjects.loginButton.name,
      })
      .click();
    const otpInput = this.page.locator(AdminProjectsObjects_1.AdminObjects.otpInput);
    await (0, test_1.expect)(otpInput).toBeVisible({ timeout: 30000 });
    await otpInput.fill(otp);
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.otpConfirmButton.role, {
        name: AdminProjectsObjects_1.AdminObjects.otpConfirmButton.name,
      })
      .click();
  }
  async openProjectCreation() {
    await this.clickInternalInventory();
    await this.clickProjectsLink();
    await this.clickAddNewProjectButton();
  }
  async clickProjectsLink() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.projectsLink.role, {
        name: AdminProjectsObjects_1.AdminObjects.projectsLink.name,
      })
      .click();
  }
  async clickAddNewProjectButton() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.addNewProjectButton.role, {
        name: AdminProjectsObjects_1.AdminObjects.addNewProjectButton.name,
      })
      .click();
  }
  async fillProjectName(projectName) {
    await this.page
      .locator(AdminProjectsObjects_1.AdminObjects.projectNameField.container)
      .filter({ hasText: AdminProjectsObjects_1.AdminObjects.projectNameField.label })
      .getByPlaceholder(AdminProjectsObjects_1.AdminObjects.projectNameField.placeholder)
      .fill(projectName);
  }
  async selectProjectType(projectType) {
    const projectTypeDropdown = this.page.locator(AdminProjectsObjects_1.AdminObjects.projectTypeDropdown);
    const projectTypeOption = this.page.locator(await AdminProjectsObjects_1.AdminObjects.projectTypeOption(projectType));
    for (let attempt = 0; attempt < 5; attempt++) {
      await projectTypeDropdown.click();
      if (await projectTypeOption.isVisible().catch(() => false)) {
        break;
      }
      await this.page.waitForTimeout(2000);
    }
    await (0, test_1.expect)(projectTypeOption).toBeVisible({ timeout: 30000 });
    await projectTypeOption.click();
  }
  async selectRegion(region) {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.regionDropdown).click();
    const regionOption = await AdminProjectsObjects_1.AdminObjects.regionOption(region);
    await this.page.waitForTimeout(2000);
    await this.page.locator(regionOption).click();
  }
  async selectCity(city) {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.cityDropdown).click();
    const cityOption = await AdminProjectsObjects_1.AdminObjects.cityOption(city);
    await this.page.locator(cityOption).click();
  }
  async selectDeveloperName(developerName) {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.developerInput).fill(developerName);
    const developerOption = await AdminProjectsObjects_1.AdminObjects.developerOption(developerName);
    await this.page.locator(developerOption).click();
  }
  async toggleBookableOn() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.bookableSwitch.role, {
        name: AdminProjectsObjects_1.AdminObjects.bookableSwitch.name,
      })
      .click();
  }
  async selectProjectStatus(status) {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.statusDropdown).click();
    const projectStatusOption = await AdminProjectsObjects_1.AdminObjects.projectStatusOption(status);
    await this.page.locator(projectStatusOption).click();
  }
  async fillWafiLicenseExpiryDate(date) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.wafiExpiryDate.role, {
        name: AdminProjectsObjects_1.AdminObjects.wafiExpiryDate.name,
      })
      .fill(date);
  }
  async selectSubsidyType(option) {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.subsidyTypeDropdown).click();
    const subsidyTypeOption = await AdminProjectsObjects_1.AdminObjects.subsidyTypeOption(option);
    await this.page.locator(subsidyTypeOption).click();
  }
  async fillMaxSubsidyAmount(amount) {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.maxSubsidyAmountField).fill(amount);
  }
  async fillProjectAgreementDate(date) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.projectAgreementDate.role, {
        name: AdminProjectsObjects_1.AdminObjects.projectAgreementDate.name,
      })
      .fill(date);
  }
  async fillProjectLicenseNumber(licenseNumber) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.projectLicenseNumber.role, {
        name: AdminProjectsObjects_1.AdminObjects.projectLicenseNumber.name,
      })
      .fill(licenseNumber);
  }
  async fillProjectLicenseDate(date) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.projectLicenseDate.role, {
        name: AdminProjectsObjects_1.AdminObjects.projectLicenseDate.name,
      })
      .fill(date);
  }
  async fillEscrowAccountName(accountName) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.escrowAccountName.role, {
        name: AdminProjectsObjects_1.AdminObjects.escrowAccountName.name,
      })
      .fill(accountName);
  }
  async fillEscrowAccountNumber(accountNumber) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.escrowAccountNumber.role, {
        name: AdminProjectsObjects_1.AdminObjects.escrowAccountNumber.name,
      })
      .fill(accountNumber);
  }
  async selectBank(bankName) {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.bankDropdown).first().click();
    const bankOption = await AdminProjectsObjects_1.AdminObjects.bankOption(bankName);
    await this.page.locator(bankOption).click();
  }
  async fillDeductionPercentage(percentage) {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.deductionPercentageField).fill(percentage);
  }
  async fillDeedIssueCityArabic(city) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.deedIssueCityArabic.role, {
        name: AdminProjectsObjects_1.AdminObjects.deedIssueCityArabic.name,
      })
      .fill(city);
  }
  async fillDeedIssueCityEnglish(city) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.deedIssueCityEnglish.role, {
        name: AdminProjectsObjects_1.AdminObjects.deedIssueCityEnglish.name,
      })
      .fill(city);
  }
  async fillDeedDate(date) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.deedDate.role, {
        name: AdminProjectsObjects_1.AdminObjects.deedDate.name,
      })
      .fill(date);
  }
  async clickSaveButton() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.saveButton.role, {
        name: AdminProjectsObjects_1.AdminObjects.saveButton.name,
      })
      .click();
  }
  async validateProjectSavedToastMessage() {
    await (0, test_1.expect)(
      this.page.locator(AdminProjectsObjects_1.AdminObjects.successToast).getByText(AdminProjectsObjects_1.AdminObjects.saveSuccessMessage.text),
      'Project saved message is not displayed'
    ).toBeVisible({ timeout: 120000 });
  }
  async linkProjectToAzm() {
    await this.page.waitForTimeout(3000);
    const azmToggle = this.page.locator(AdminProjectsObjects_1.AdminObjects.azmToggle);
    if ((await azmToggle.getAttribute('aria-checked')) === 'false') {
      await azmToggle.click();
      await this.page.waitForTimeout(5000);
    }
    await (0, test_1.expect)(azmToggle).toHaveAttribute('aria-checked', 'true');
  }
  async expectFinancingEntitiesVisible() {
    await (0, test_1.expect)(this.page.getByText(AdminProjectsObjects_1.AdminObjects.financingEntitiesHeading.text)).toBeVisible({ timeout: 30000 });
  }
  async clickFinancingEntities() {
    await this.page.getByText(AdminProjectsObjects_1.AdminObjects.financingEntitiesHeading.text).click();
  }
  async expectBankNameVisibility(targetName) {
    const targetCell = this.page.locator(AdminProjectsObjects_1.AdminObjects.financialEntitiesBankNameCell(targetName));
    await (0, test_1.expect)(targetCell, 'The updated bank name is not present').toBeVisible({ timeout: 30000 });
  }
  async expectSelectAllRowsVisible() {
    await (0, test_1.expect)(
      this.page.getByRole(AdminProjectsObjects_1.AdminObjects.selectAllRowsCheckbox.role, {
        name: AdminProjectsObjects_1.AdminObjects.selectAllRowsCheckbox.name,
      })
    ).toBeVisible({ timeout: 30000 });
  }
  async clickSelectAllRows() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.selectAllRowsCheckbox.role, {
        name: AdminProjectsObjects_1.AdminObjects.selectAllRowsCheckbox.name,
      })
      .click();
  }
  async clickUnitsTab() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.unitsTab.role, {
        name: AdminProjectsObjects_1.AdminObjects.unitsTab.name,
        exact: AdminProjectsObjects_1.AdminObjects.unitsTab.exact,
      })
      .click();
  }
  async expectImportNewUnitButtonVisible() {
    await (0, test_1.expect)(
      this.page.getByRole(AdminProjectsObjects_1.AdminObjects.importNewUnitButton.role, {
        name: AdminProjectsObjects_1.AdminObjects.importNewUnitButton.name,
      })
    ).toBeVisible({ timeout: 30000 });
  }
  async clickImportNewUnitButton() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.importNewUnitButton.role, {
        name: AdminProjectsObjects_1.AdminObjects.importNewUnitButton.name,
      })
      .click();
  }
  async expectResidentialUnitTypeVisible() {
    await (0, test_1.expect)(
      this.page.getByRole(AdminProjectsObjects_1.AdminObjects.residentialUnitType.role, {
        name: AdminProjectsObjects_1.AdminObjects.residentialUnitType.name,
      })
    ).toBeVisible({ timeout: 30000 });
    this.page.waitForTimeout(3000);
  }
  async openResidentialUnitTypeDropdown() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.residentialUnitType.role, {
        name: AdminProjectsObjects_1.AdminObjects.residentialUnitType.name,
      })
      .click();
  }
  async selectApartmentUnitType() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.apartmentOption.role, {
        name: AdminProjectsObjects_1.AdminObjects.apartmentOption.name,
      })
      .click();
  }
  async uploadUnitsFile(filePath) {
    const fileInput = this.page.locator(AdminProjectsObjects_1.AdminObjects.unitsFileInput);
    await fileInput.setInputFiles(filePath);
  }
  async clickImportSaveButton() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.importSaveButton.role, {
        name: AdminProjectsObjects_1.AdminObjects.importSaveButton.name,
      })
      .click();
  }
  async waitForUnitImportCompletion() {
    await this.page.waitForTimeout(12000);
    let completed = false;
    while (!completed) {
      await this.page.reload();
      await this.page.waitForTimeout(3000);
      completed = await this.page
        .getByText(AdminProjectsObjects_1.AdminObjects.importCompleteMessage.text)
        .isVisible()
        .catch(() => false);
      if (!completed) {
        await this.page.waitForTimeout(3000);
      }
    }
  }
  async clickApproveButton() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.approveButton.role, {
        name: AdminProjectsObjects_1.AdminObjects.approveButton.name,
      })
      .click();
  }
  async clickConfirmButton() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.confirmButton.role, {
        name: AdminProjectsObjects_1.AdminObjects.confirmButton.name,
      })
      .click();
  }
  async waitForImportConfirmation() {
    await this.page.waitForTimeout(3000);
  }
  async clickBackButton() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.backButton.role, {
        name: AdminProjectsObjects_1.AdminObjects.backButton.name,
      })
      .click();
  }
  async clickProjectMediaTab() {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.visualContentTab.selector).filter({ hasText: AdminProjectsObjects_1.AdminObjects.visualContentTab.text }).first().click();
  }
  async uploadBannerImage(filePath) {
    const bannerImageInput = this.page.locator(AdminProjectsObjects_1.AdminObjects.bannerImageInput);
    await bannerImageInput.setInputFiles(filePath);
  }
  async uploadMasterPlanImage(filePath) {
    const masterPlanImageInput = this.page.locator(AdminProjectsObjects_1.AdminObjects.masterPlanImageInput);
    await masterPlanImageInput.setInputFiles(filePath);
  }
  async uploadAerialImage(filePath) {
    const aerialImageInput = this.page.locator(AdminProjectsObjects_1.AdminObjects.aerialImageInput);
    await aerialImageInput.setInputFiles(filePath);
  }
  async clickUploadButton() {
    await this.page.waitForTimeout(2000);
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.uploadButton).click();
    await this.page.waitForTimeout(25000);
  }
  async selectDisplayMethod(option) {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.displayMethodDropdown.selector).filter({ hasText: AdminProjectsObjects_1.AdminObjects.displayMethodDropdown.text }).first().click();
    const displayMethodOption = await AdminProjectsObjects_1.AdminObjects.displayMethodOption(option);
    await this.page.locator(displayMethodOption).click();
  }
  async fillDetailsTitleArabic(value) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.detailsTitleArabic.role, {
        name: AdminProjectsObjects_1.AdminObjects.detailsTitleArabic.name,
      })
      .fill(value);
  }
  async fillDetailsTitleEnglish(value) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.detailsTitleEnglish.role, {
        name: AdminProjectsObjects_1.AdminObjects.detailsTitleEnglish.name,
      })
      .fill(value);
  }
  async fillFirstUnitReadyDate(value) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.firstUnitReadyDate.role, {
        name: AdminProjectsObjects_1.AdminObjects.firstUnitReadyDate.name,
      })
      .fill(value);
  }
  async fillNameArabic(value) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.nameArabic.role, {
        name: AdminProjectsObjects_1.AdminObjects.nameArabic.name,
      })
      .fill(value);
  }
  async fillNameEnglish(value) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.nameEnglish.role, {
        name: AdminProjectsObjects_1.AdminObjects.nameEnglish.name,
      })
      .fill(value);
  }
  async fillSummaryArabic(value) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.summaryArabic.role, {
        name: AdminProjectsObjects_1.AdminObjects.summaryArabic.name,
      })
      .fill(value);
  }
  async fillSummaryEnglish(value) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.summaryEnglish.role, {
        name: AdminProjectsObjects_1.AdminObjects.summaryEnglish.name,
      })
      .fill(value);
  }
  async fillDescriptionArabic(value) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.descriptionArabic.role, {
        name: AdminProjectsObjects_1.AdminObjects.descriptionArabic.name,
      })
      .fill(value);
  }
  async fillDescriptionEnglish(value) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.descriptionEnglish.role, {
        name: AdminProjectsObjects_1.AdminObjects.descriptionEnglish.name,
      })
      .fill(value);
  }
  async fillStartingPrice(value) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.startingPrice.role, {
        name: AdminProjectsObjects_1.AdminObjects.startingPrice.name,
      })
      .fill(value);
  }
  async fillLatitude(value) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.latitude.role, {
        name: AdminProjectsObjects_1.AdminObjects.latitude.name,
      })
      .fill(value);
  }
  async fillLongitude(value) {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.longitude.role, {
        name: AdminProjectsObjects_1.AdminObjects.longitude.name,
      })
      .fill(value);
  }
  async expectMediaUploadComplete(index) {
    await (0, test_1.expect)(this.page.locator(AdminProjectsObjects_1.AdminObjects.uploadStatus).nth(index)).toBeVisible({
      timeout: 120000,
    });
    await this.page.waitForTimeout(1500);
  }
  async fillGuaranteeAfterServices(value) {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.guarenteeAfterServices).fill(value);
  }
  async clickMediaSaveButton() {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.mediaSaveButton).click();
  }
  async clickProjectDetailsTab() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.projectDetailsTab.role, {
        name: AdminProjectsObjects_1.AdminObjects.projectDetailsTab.name,
      })
      .click();
  }
  async clickProjectDetailsText() {
    await this.page.getByText(AdminProjectsObjects_1.AdminObjects.projectDetailsText.text).click();
  }
  async clickRequestMediaApprovalButton() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.requestMediaApprovalButton.role, {
        name: AdminProjectsObjects_1.AdminObjects.requestMediaApprovalButton.name,
      })
      .click();
  }
  async clickAcceptUploadedMediaButton() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.acceptUploadedMediaButton.role, {
        name: AdminProjectsObjects_1.AdminObjects.acceptUploadedMediaButton.name,
      })
      .click();
  }
  async clickKeepProjectUnpublishedButton() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.keepProjectUnpublishedButton.role, {
        name: AdminProjectsObjects_1.AdminObjects.keepProjectUnpublishedButton.name,
      })
      .click();
  }
  async clickUnitModelsSection() {
    await this.page.getByText(AdminProjectsObjects_1.AdminObjects.unitModelsSection.text).click();
  }
  async clickUnitModelCell() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.unitModelCell.role, {
        name: AdminProjectsObjects_1.AdminObjects.unitModelCell.name,
      })
      .click();
  }
  async clickMediaDraftSection() {
    await this.page.getByText(AdminProjectsObjects_1.AdminObjects.mediaDraftSection.text).click();
  }
  async clickPublishUnitButton() {
    this.checkMediaApproveButton();
    const publishButton = this.page.getByRole(AdminProjectsObjects_1.AdminObjects.publishUnitButton.role, {
      name: AdminProjectsObjects_1.AdminObjects.publishUnitButton.name,
    });
    await publishButton.click();
    while (true) {
      await this.page.waitForTimeout(3000);
      if (!(await publishButton.isVisible().catch(() => false))) break;
      await this.page.reload();
    }
  }
  async checkMediaApproveButton() {
    const approveMediaButton = this.page.getByRole(AdminProjectsObjects_1.AdminObjects.acceptUploadedMediaButton.role, {
      name: AdminProjectsObjects_1.AdminObjects.acceptUploadedMediaButton.name,
    });
    while (true) {
      await this.page.waitForTimeout(3000);
      if (!(await approveMediaButton.isVisible().catch(() => false))) break;
      await approveMediaButton.click();
    }
  }
  async clickUnitModelLink() {
    const unitModelLink = this.page.locator(AdminProjectsObjects_1.AdminObjects.unitModelLink.selector).filter({ hasText: AdminProjectsObjects_1.AdminObjects.unitModelLink.text });
    await unitModelLink.waitFor({ state: 'visible' });
    await unitModelLink.click();
    await this.page.waitForTimeout(3000);
    const chevronElement = this.page.locator(AdminProjectsObjects_1.AdminObjects.rightTabArrow);
    if (await chevronElement.isVisible().catch(() => false)) await chevronElement.click();
  }
  async waitForMediaApproval() {
    const visualContentTab = this.page.getByRole(AdminProjectsObjects_1.AdminObjects.mediaApprovalText.role, {
      name: AdminProjectsObjects_1.AdminObjects.mediaApprovalText.name,
    });
    while (!(await visualContentTab.isVisible().catch(() => false))) {
      await this.page.reload();
      await this.page.waitForTimeout(2000);
    }
    await (0, test_1.expect)(visualContentTab).toBeVisible();
  }
  async selectAvailableProjectStatus() {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.statusDropdown).click();
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.projectStatusAvailableOption.role, {
        name: AdminProjectsObjects_1.AdminObjects.projectStatusAvailableOption.name,
      })
      .click();
  }
  async enableAvailableForBookingToggle() {
    const bookingToggle = this.page.locator(AdminProjectsObjects_1.AdminObjects.bookingAvailableToggle);
    await (0, test_1.expect)(bookingToggle).toBeVisible({ timeout: 30000 });
    if ((await bookingToggle.getAttribute('aria-checked')) === 'false') {
      await bookingToggle.click();
    }
    await (0, test_1.expect)(bookingToggle).toHaveAttribute('aria-checked', 'true');
  }
  async publishProject() {
    await this.waitForMediaApproval();
    const publishedToggle = this.page.locator(AdminProjectsObjects_1.AdminObjects.projectPublishedToggle);
    await (0, test_1.expect)(publishedToggle).toBeVisible({ timeout: 30000 });
    if ((await publishedToggle.getAttribute('aria-checked')) === 'false') {
      await publishedToggle.click();
    }
    await (0, test_1.expect)(publishedToggle).toHaveAttribute('aria-checked', 'true');
  }
  async expandProjectSettings() {
    await this.page.locator("//span[contains(text(),'إعدادات المشاريع')]").click();
  }
  async enableRefundToggle() {
    const RefundubleToggel = this.page.locator("//label[contains (text(), 'قابل للاسترداد')]/preceding-sibling::button");
    await (0, test_1.expect)(RefundubleToggel).toBeVisible({ timeout: 30000 });
    const isRefundbleChecked = await RefundubleToggel.getAttribute('aria-checked');
    if (isRefundbleChecked === 'false') {
      await RefundubleToggel.click();
      await (0, test_1.expect)(RefundubleToggel).toHaveAttribute('aria-checked', 'true');
    } else {
      await (0, test_1.expect)(RefundubleToggel).toHaveAttribute('aria-checked', 'true');
    }
  }
  async openProjects() {
    await this.clickInternalInventory();
    await this.clickProjectsLink();
  }
  async openResaleRequests() {
    await this.clickInternalInventory();
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.resaleRequestsLink.role, {
        name: AdminProjectsObjects_1.AdminObjects.resaleRequestsLink.name,
      })
      .click();
  }
  async clickInternalInventory() {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.internalInventoryLink.selector).filter({ hasText: AdminProjectsObjects_1.AdminObjects.internalInventoryLink.hasText }).click();
  }
  async openAuctionCreation() {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.auctionsLink.selector).filter({ hasText: AdminProjectsObjects_1.AdminObjects.auctionsLink.hasText }).click();
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.auctionProjectsLink.role, {
        name: AdminProjectsObjects_1.AdminObjects.auctionProjectsLink.name,
      })
      .click();
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.newAuctionProjectButton.role, {
        name: AdminProjectsObjects_1.AdminObjects.newAuctionProjectButton.name,
      })
      .click();
  }
  async clickPartner() {
    await this.clickPartnerLink();
  }
  async clickNeighbourGreeting() {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.neighbourGreetingLink.selector).filter({ hasText: AdminProjectsObjects_1.AdminObjects.neighbourGreetingLink.hasText }).click();
  }
  async openVoucherManagement() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.voucherManagementLink.role, {
        name: AdminProjectsObjects_1.AdminObjects.voucherManagementLink.name,
      })
      .click();
  }
  async openFinancialInstitutes() {
    await this.clickPartner();
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.financialInstitutesLink.role, {
        name: AdminProjectsObjects_1.AdminObjects.financialInstitutesLink.name,
      })
      .click();
  }
  async selectRegionAndCity(region = 'الرياض') {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.regionDropdown).getByRole(AdminProjectsObjects_1.AdminObjects.regionSelectCombobox.role).click();
    await this.page.getByText(region).click();
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.cityDropdown).click();
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.genericOption.role, {
        name: region,
        exact: AdminProjectsObjects_1.AdminObjects.genericOption.exact,
      })
      .click();
  }
  async saveAndExpectSuccess() {
    await this.clickSaveButton();
    await (0, test_1.expect)(this.page.getByText(AdminProjectsObjects_1.AdminObjects.saveSuccessMessage.text)).toBeVisible({
      timeout: 120000,
    });
  }
  async clickCompletionPercentageSwitch(shouldBeChecked) {
    const completionPercentageSwitch = this.page.getByRole(AdminProjectsObjects_1.AdminObjects.completionPercentageSwitch.role, {
      name: AdminProjectsObjects_1.AdminObjects.completionPercentageSwitch.name,
    });
    const completionPercentageValue = this.page.locator(AdminProjectsObjects_1.AdminObjects.completionPercentageValue.xpath);
    await (0, test_1.expect)(completionPercentageValue).toBeVisible();
    const isChecked = (await completionPercentageValue.getAttribute('aria-checked')) === 'true';
    if (isChecked !== shouldBeChecked) {
      await completionPercentageSwitch.click();
    }
    await (0, test_1.expect)(completionPercentageValue).toHaveAttribute('aria-checked', String(shouldBeChecked));
  }
  async clickSelectAllRowsForBankClassState(shouldNotContainActive) {
    const bankRows = this.page.locator(AdminProjectsObjects_1.AdminObjects.banksCheckboxesValue.xpath);
    await (0, test_1.expect)(bankRows.first()).toBeVisible({ timeout: 30000 });
    const rowCount = await bankRows.count();
    for (let index = 0; index < rowCount; index++) {
      const rowClass = await bankRows.nth(index).getAttribute('class');
      const isActive = rowClass?.split(/\s+/).includes('active') ?? false;
      if (shouldNotContainActive && !isActive) {
        await this.expectSelectAllRowsVisible();
        await this.clickSelectAllRows();
        return;
      }
      if (!shouldNotContainActive && isActive) {
        await this.expectSelectAllRowsVisible();
        await this.clickSelectAllRows();
        await this.clickSelectAllRows();
        return;
      }
    }
  }
  async clickPartnerLink() {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.partnerLink.selector).filter({ hasText: AdminProjectsObjects_1.AdminObjects.partnerLink.hasText }).click();
  }
  async fillDeveloperName(developerName) {
    const developerNameInputfield = this.page.locator(AdminProjectsObjects_1.AdminObjects.devloperNameInputField.xpath);
    await this.page.waitForTimeout(2000);
    await (0, test_1.expect)(developerNameInputfield).toBeVisible({ timeout: 90000 });
    await developerNameInputfield.fill(developerName);
    await this.page.waitForTimeout(2000);
    await developerNameInputfield.press('Enter');
  }
  async clickOnDeveloperNameResult(value) {
    const developerNameResult = this.page.locator(AdminProjectsObjects_1.AdminObjects.devloperNameResult.xpath).getByText(String(value), {
      exact: AdminProjectsObjects_1.AdminObjects.devloperNameResult.exact,
    });
    await (0, test_1.expect)(developerNameResult).toBeVisible({ timeout: 90000 });
    await developerNameResult.click();
  }
  async verifyDeveloperInformationPageText(expectedText) {
    await (0, test_1.expect)(this.page.locator(AdminProjectsObjects_1.AdminObjects.developerInformationPage.xpath)).toHaveText(expectedText);
  }
  async fillDeveloperPhoneNumber(developerPhoneNumber) {
    const developerPhoneNumberInputfiled = this.page.locator(AdminProjectsObjects_1.AdminObjects.developerPhoneNumberInputfiled.xpath);
    await (0, test_1.expect)(developerPhoneNumberInputfiled).toBeVisible({ timeout: 90000 });
    await developerPhoneNumberInputfiled.fill(developerPhoneNumber);
  }
  async clickDeveloperContactInfoSwitch(shouldBeChecked) {
    const developarContactInofSwitch = this.page.getByRole(AdminProjectsObjects_1.AdminObjects.developarContactInofSwitch.role, {
      name: AdminProjectsObjects_1.AdminObjects.developarContactInofSwitch.name,
    });
    const developarContactInofValue = this.page.locator(AdminProjectsObjects_1.AdminObjects.developarContactInofValue.xpath);
    await (0, test_1.expect)(developarContactInofValue).toBeVisible();
    const isChecked = (await developarContactInofValue.getAttribute('aria-checked')) === 'true';
    if (isChecked !== shouldBeChecked) {
      await developarContactInofSwitch.click();
    }
    await (0, test_1.expect)(developarContactInofValue).toHaveAttribute('aria-checked', String(shouldBeChecked));
  }
  async searchFinancialInstitute(targetName) {
    while (true) {
      const targetCell = this.page.locator(AdminProjectsObjects_1.AdminObjects.financialInstituteNameCell(targetName));
      // 2. Check if the cell is visible on the current page
      const isPresent = await targetCell.isVisible({ timeout: 20000 });
      if (isPresent) {
        await targetCell.click();
        break;
      }
      // 3. Move to the next page using your exact Arabic locator
      const nextButton = this.page.getByRole(AdminProjectsObjects_1.AdminObjects.financialInstitutesNextPageButton.role, {
        name: AdminProjectsObjects_1.AdminObjects.financialInstitutesNextPageButton.name,
      });
      await nextButton.click();
      await this.page.waitForTimeout(3000);
    }
  }
  async fillFinancialInstituteArabicName(name) {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.financialInstituteArabicNameInput).fill(name);
  }
  async fillFinancialInstituteEnglishName(name) {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.financialInstituteEnglishNameInput).fill(name);
  }
  async fillFinancialInstituteRealName(name) {
    await this.page.locator(AdminProjectsObjects_1.AdminObjects.financialInstituteRealNameInput).fill(name);
  }
  async clickFinancialInstituteSaveButton() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.saveButton.role, {
        name: AdminProjectsObjects_1.AdminObjects.saveButton.name,
      })
      .click();
  }
  async expectFinancialInstituteSavedToast() {
    await (0, test_1.expect)(this.page.locator(AdminProjectsObjects_1.AdminObjects.financialInstituteSavedToast)).toHaveText(AdminProjectsObjects_1.AdminObjects.saveSuccessMessage.text);
  }
  async clickAcceptButton() {
    await this.page
      .getByRole(AdminProjectsObjects_1.AdminObjects.accpetButton.role, {
        name: AdminProjectsObjects_1.AdminObjects.accpetButton.name,
      })
      .click();
  }
  async validateSuccessToastMessageText(text) {
    await (0, test_1.expect)(this.page.locator(AdminProjectsObjects_1.AdminObjects.successToast).getByText(text), 'Success toast message is not preset').toBeVisible({ timeout: 120000 });
  }
}
exports.AdminProjectPage = AdminProjectPage;
