'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DeveloperProjectPage = void 0;
const test_1 = require('@playwright/test');
const DeveloperObjects_1 = require('@objects/DeveloperObjects');
const DEFAULT_TIMEOUT = 30_000;
const LONG_TIMEOUT = 90_000;
class DeveloperProjectPage {
  constructor(page) {
    this.page = page;
    this.defaultTimeout = 60000;
  }
  async waitForVisible(locator) {
    await (0, test_1.expect)(locator).toBeVisible({ timeout: this.defaultTimeout });
  }
  async clickIfVisible(locator, options = {}) {
    const timeout = options.timeout ?? 5000;
    const isVisible = await locator.isVisible({ timeout }).catch(() => false);
    if (isVisible) {
      await locator.click();
    }
  }
  async gotoAuth(url) {
    await this.page.goto(url);
  }
  async loginDeveloper(nationalId) {
    const usernameInput = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.usernameInput.role, { name: DeveloperObjects_1.DeveloperObjects.usernameInput.name });
    await this.waitForVisible(usernameInput);
    await usernameInput.fill(nationalId);
    const continueButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.continueButton.role, {
      name: DeveloperObjects_1.DeveloperObjects.continueButton.name,
      exact: DeveloperObjects_1.DeveloperObjects.continueButton.exact,
    });
    await this.waitForVisible(continueButton);
    await continueButton.click();
    const nafathModal = this.page.locator('//app-nafath-login-modal');
    await nafathModal.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    while (await nafathModal.isVisible().catch(() => false)) {
      await this.page.waitForTimeout(3000);
    }
    await this.page.waitForTimeout(3000);
    const verificationButton = this.page.getByRole('button', { name: 'تحقق' });
    if (await verificationButton.isVisible({ timeout: 15000 }).catch(() => false)) {
      await verificationButton.click();
      await this.page.getByRole('spinbutton', { name: 'X' }).nth(0).fill('1');
      await this.page.getByRole('spinbutton', { name: 'X' }).nth(1).fill('2');
      await this.page.getByRole('spinbutton', { name: 'X' }).nth(2).fill('3');
      await this.page.getByRole('spinbutton', { name: 'X' }).nth(3).fill('4');
      await this.page.getByRole('button', { name: 'تأكيد ومتابعة' }).click();
      await this.page.getByRole('button', { name: 'انتقل إلى لوحة المعلومات' }).click();
    }
    const profileIcon = this.page.locator(DeveloperObjects_1.DeveloperObjects.profileIcon);
    await this.waitForVisible(profileIcon);
    await this.page.waitForTimeout(3000);
    const cancelButton = this.page.getByRole('button', { name: 'إلغاء' });
    await this.clickIfVisible(cancelButton.first());
  }
  async switchRoleToDeveloper() {
    const profileIcon = this.page.locator(DeveloperObjects_1.DeveloperObjects.profileIcon);
    await this.waitForVisible(profileIcon);
    await profileIcon.click();
    const switchRoleButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.switchRoleButton.role, { name: DeveloperObjects_1.DeveloperObjects.switchRoleButton.name });
    await this.waitForVisible(switchRoleButton);
    await switchRoleButton.click();
    const developerRole = this.page.getByText(DeveloperObjects_1.DeveloperObjects.developerRoleText);
    await this.waitForVisible(developerRole);
    await developerRole.click();
    await this.page.waitForTimeout(3000); // Wait for 3 seconds to ensure the page is fully loaded
    const cancelButton = this.page.getByRole('button', { name: 'إلغاء' });
    await this.clickIfVisible(cancelButton.first());
  }
  async openProjectsPage() {
    // const menuIcon = this.page.locator(DeveloperObjects.menuIcon);
    // await this.waitForVisible(menuIcon);
    // await menuIcon.click();
    const projectsLink = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.projectsLink.role, { name: DeveloperObjects_1.DeveloperObjects.projectsLink.name });
    await this.waitForVisible(projectsLink);
    await projectsLink.click();
  }
  async searchProject(projectName) {
    const projectFilter = this.page.locator(DeveloperObjects_1.DeveloperObjects.projectFilter).first();
    await this.waitForVisible(projectFilter);
    await projectFilter.click();
    const projectNameOption = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.projectNameOption.role, { name: DeveloperObjects_1.DeveloperObjects.projectNameOption.name });
    await this.waitForVisible(projectNameOption);
    await projectNameOption.click();
    const projectSearchInput = this.page.locator(DeveloperObjects_1.DeveloperObjects.projectSearchInput).getByRole('combobox');
    await this.waitForVisible(projectSearchInput);
    await projectSearchInput.click();
    await projectSearchInput.fill(projectName);
    const projectOption = this.page.getByRole('option', { name: projectName });
    await (0, test_1.expect)(projectOption).toBeVisible({ timeout: this.defaultTimeout });
    await projectOption.click({ force: true });
  }
  async openProjectBySearch(projectName) {
    await this.openProjectsPage();
    await this.searchProject(projectName);
    const searchButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.searchButton.role, { name: DeveloperObjects_1.DeveloperObjects.searchButton.name });
    await this.page.waitForTimeout(3000);
    await this.waitForVisible(searchButton);
    await searchButton.click();
    const passwordEyeIcon = this.page.locator(DeveloperObjects_1.DeveloperObjects.passwordEyeIcon);
    await this.page.waitForTimeout(3000); // Wait for the password eye icon to be visible
    await this.waitForVisible(passwordEyeIcon);
    await passwordEyeIcon.click();
  }
  async openPaymentSchedulesTab() {
    const paymentScheduleTab = this.page
      .getByRole('tab', { name: /جداول الدفع/ })
      .or(this.page.getByText('جداول الدفع', { exact: true }))
      .first();
    await this.waitForVisible(paymentScheduleTab);
    await paymentScheduleTab.click();
  }
  async openSalesContractsTab() {
    const salesContractsTab = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.salesContractsTab.role, { name: DeveloperObjects_1.DeveloperObjects.salesContractsTab.name });
    await this.waitForVisible(salesContractsTab);
    await salesContractsTab.click();
  }
  async viewAndApproveSalesContract() {
    const viewAndApproveButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.viewAndApproveButton.role, {
      name: DeveloperObjects_1.DeveloperObjects.viewAndApproveButton.name,
    });
    await this.waitForVisible(viewAndApproveButton);
    await viewAndApproveButton.click();
  }
  async approveUnitSpecification() {
    const addUnitSpecificationButton = this.page.locator(DeveloperObjects_1.DeveloperObjects.addUnitSpecificationButton);
    await this.waitForVisible(addUnitSpecificationButton);
    await addUnitSpecificationButton.click();
  }
  async fillOtp(code = '1234') {
    const otpInput = this.page.locator(DeveloperObjects_1.DeveloperObjects.otpInput);
    await this.waitForVisible(otpInput);
    await otpInput.fill(code);
  }
  async verifyOtp() {
    const verifyCodeButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.verifyCodeButton.role, { name: DeveloperObjects_1.DeveloperObjects.verifyCodeButton.name });
    await this.waitForVisible(verifyCodeButton);
    await verifyCodeButton.click();
  }
  async openAddAnnexDialog() {
    const addAnnexButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.addAnnexButton.role, { name: DeveloperObjects_1.DeveloperObjects.addAnnexButton.name });
    await this.waitForVisible(addAnnexButton);
    await addAnnexButton.click();
  }
  async searchUnitByCode(unitCode) {
    const unitCodeInput = this.page.locator("//app-sapa-input-with-icon[@formcontrolname='unit_code']/descendant::input");
    await this.waitForVisible(unitCodeInput);
    await unitCodeInput.fill(unitCode);
    const searchButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.searchButton.role, { name: DeveloperObjects_1.DeveloperObjects.searchButton.name });
    await searchButton.click();
  }
  async selectFirstUnit() {
    const firstUnit = this.page.getByRole('cell').first();
    await this.waitForVisible(firstUnit);
    await firstUnit.click();
  }
  async openSelectedUnitsAnnexDialog() {
    const addAnnexButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.addAnnexToSelectedUnitsButton.role, {
      name: DeveloperObjects_1.DeveloperObjects.addAnnexToSelectedUnitsButton.name,
    });
    await this.waitForVisible(addAnnexButton);
    await addAnnexButton.click();
  }
  async uploadAnnexFile(filePath) {
    const fileInput = this.page.locator("//input[@type='file']");
    await fileInput.setInputFiles(filePath);
    const attachmentText = this.page.getByText('الملف المرفق', { exact: true });
    await attachmentText.waitFor({ state: 'visible' });
  }
  async uploadAnnex() {
    const uploadButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.uploadButton.role, { name: DeveloperObjects_1.DeveloperObjects.uploadButton.name });
    await this.waitForVisible(uploadButton);
    await uploadButton.click();
  }
  async approveAnnex() {
    const approveButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.approveButton.role, { name: DeveloperObjects_1.DeveloperObjects.approveButton.name });
    await this.waitForVisible(approveButton);
    await approveButton.click();
  }
  async expectAnnexSuccess() {
    const successMessage = this.page.getByText(DeveloperObjects_1.DeveloperObjects.annexSuccessMessage);
    await this.waitForVisible(successMessage);
  }
  async verifyApprovalSuccessMessage() {
    const successMessage = this.page.getByText(DeveloperObjects_1.DeveloperObjects.approvalSuccessMessage, { exact: false });
    await this.waitForVisible(successMessage);
    const modal = this.page.locator(DeveloperObjects_1.DeveloperObjects.approvalModal);
    await (0, test_1.expect)(modal).toContainText(DeveloperObjects_1.DeveloperObjects.approvalSuccessMessage);
  }
  async addPaymentSchedule({ type, scheduleName, completionPercentageOneValue, percentageOneValue, completionPercentageTwoValue, percentageTwoValue }) {
    const addScheduleButton = this.page
      .getByRole('button', { name: /إضافة جدول جديد/ })
      .or(this.page.getByText('إضافة جدول جديد', { exact: true }))
      .first();
    await this.waitForVisible(addScheduleButton);
    await addScheduleButton.click();
    const scheduleType = type === 'cash' ? this.page.getByText(DeveloperObjects_1.DeveloperObjects.cashOption) : this.page.getByText(DeveloperObjects_1.DeveloperObjects.lendingOption);
    await this.waitForVisible(scheduleType);
    await scheduleType.click();
    const scheduleNameInput = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.scheduleNameInput.role, { name: DeveloperObjects_1.DeveloperObjects.scheduleNameInput.name });
    await this.waitForVisible(scheduleNameInput);
    await scheduleNameInput.fill(scheduleName);
    const completionPercentageOne = this.page.locator(DeveloperObjects_1.DeveloperObjects.completionPercentageOne).getByRole('textbox', { name: 'مثال: 15٪' });
    await this.waitForVisible(completionPercentageOne);
    await completionPercentageOne.fill(completionPercentageOneValue);
    const percentageOne = this.page.locator(DeveloperObjects_1.DeveloperObjects.percentageOne).getByRole('textbox', { name: 'مثال: 15٪' });
    await this.waitForVisible(percentageOne);
    await percentageOne.fill(percentageOneValue);
    const completionPercentagetwo = this.page.locator(DeveloperObjects_1.DeveloperObjects.completionPercentageTwo).getByRole('textbox', { name: 'مثال: 15٪' });
    await this.waitForVisible(completionPercentagetwo);
    await completionPercentagetwo.fill(completionPercentageTwoValue);
    const percentageTwo = this.page.locator(DeveloperObjects_1.DeveloperObjects.percentageTwo).getByRole('textbox', { name: 'مثال: 15٪' });
    await this.waitForVisible(percentageTwo);
    await percentageTwo.fill(percentageTwoValue);
    const normalConfirmButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.confirmButton.role, { name: DeveloperObjects_1.DeveloperObjects.confirmButton.name });
    await this.waitForVisible(normalConfirmButton);
    await normalConfirmButton.click({ force: true });
    const popupConfirmButton = this.page.locator(DeveloperObjects_1.DeveloperObjects.confirmButtonPopup);
    await this.waitForVisible(popupConfirmButton);
    await popupConfirmButton.click({ force: true });
    const updateButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.updateButton.role, { name: /تحديث/ });
    await this.waitForVisible(updateButton);
  }
  async navigateToIndividualBookings() {
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.manageReservationsButton));
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.individualBooking));
  }
  async searchBookingByUnitCode(unitCode) {
    const searchInput = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.bookingSearchInput.role, { name: DeveloperObjects_1.DeveloperObjects.bookingSearchInput.name });
    await this.waitForVisible(searchInput);
    await searchInput.fill(unitCode);
    await this.page.waitForTimeout(3000);
  }
  async filterBookingsByStatus(status) {
    const statusDropdown = this.page.locator(DeveloperObjects_1.DeveloperObjects.bookingFilterStatusDropdown);
    await statusDropdown.click();
    const statusOption = this.page.locator(DeveloperObjects_1.DeveloperObjects.bookingFilterStatusOptions(status));
    await statusOption.click();
    await this.page.waitForTimeout(3000);
  }
  async viewDetailsOfSearchedBooking() {
    const viewDetailsButton = this.page.locator(DeveloperObjects_1.DeveloperObjects.viewBookingDetails);
    await viewDetailsButton.click();
  }
  async switchToBookingTab() {
    const bookingTab = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.bookingsTab.role, { name: DeveloperObjects_1.DeveloperObjects.bookingsTab.name });
    await bookingTab.click();
  }
  async confirmBooking(unitCode) {
    // 1. Navigate to the manage reservations and individual booking section
    await this.navigateToIndividualBookings();
    // 2. Search for the specific unit using the provided unit code parameter
    await this.searchBookingByUnitCode(unitCode);
    // 3. Open the booking details and switch to the bookings tab
    await this.viewDetailsOfSearchedBooking();
    await this.switchToBookingTab();
    // 4. Locate and click the confirm booking buttons (handling both first and last instances)
    const confirmBookingButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.confirmBookingActionButton.role, {
      name: DeveloperObjects_1.DeveloperObjects.confirmBookingActionButton.name,
    });
    await confirmBookingButton.first().click();
    // 5. Click the confirmation popup/button ("Yes")
    await this.page.getByRole(DeveloperObjects_1.DeveloperObjects.yesConfirmationButton.role, { name: DeveloperObjects_1.DeveloperObjects.yesConfirmationButton.name }).click();
    // 6. Assert that the booking success message is visible on the screen
    await (0, test_1.expect)(this.page.getByText(DeveloperObjects_1.DeveloperObjects.confirmBookingSuccessText), 'Confirmation booking success text is not visible').toBeVisible({ timeout: 20000 });
  }
  async confirmCompanyBooking(unitCode) {
    // 1. Navigate to the manage reservations and individual booking section
    await this.navigateToIndividualBookings();
    // 2. Search for the specific unit using the provided unit code parameter
    await this.searchBookingByUnitCode(unitCode);
    // 3. Open the booking details and switch to the bookings tab
    await this.page.locator(DeveloperObjects_1.DeveloperObjects.viewBookingDetails).click();
    await this.page.getByRole(DeveloperObjects_1.DeveloperObjects.bookingsTab.role, { name: DeveloperObjects_1.DeveloperObjects.bookingsTab.name }).click();
    // 4. Locate and click the confirm booking buttons (handling both first and last instances)
    const confirmBookingButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.confirmBookingActionButton.role, {
      name: DeveloperObjects_1.DeveloperObjects.confirmBookingActionButton.name,
    });
    await confirmBookingButton.first().click();
    await confirmBookingButton.last().click();
    // 5. Click the confirmation popup/button ("Yes")
    await this.page.getByRole(DeveloperObjects_1.DeveloperObjects.yesConfirmationButton.role, { name: DeveloperObjects_1.DeveloperObjects.yesConfirmationButton.name }).click();
    // 6. Assert that the booking success message is visible on the screen
    await (0, test_1.expect)(this.page.getByText(DeveloperObjects_1.DeveloperObjects.confirmBookingSuccessText), 'Confirmation booking success text is not visible').toBeVisible({ timeout: 20000 });
  }
  async isSuccessfulConfirmationMessageVisible() {
    return await this.page.locator(DeveloperObjects_1.DeveloperObjects.successfulBookingConfirmationMessage).isVisible();
  }
  async closeConfirmationModal() {
    await this.page.locator(DeveloperObjects_1.DeveloperObjects.closeConfirmationModal).click();
  }
  async clickOnCompanies() {
    await this.page.locator(DeveloperObjects_1.DeveloperObjects.companiesButton).waitFor({ state: 'visible' });
    await this.page.locator(DeveloperObjects_1.DeveloperObjects.companiesButton).click();
  }
  async waitAndClick(locator, timeout = DEFAULT_TIMEOUT) {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.click();
  }
  async waitAndFill(locator, value, timeout = DEFAULT_TIMEOUT) {
    await locator.waitFor({ state: 'visible', timeout });
    await locator.fill(value);
  }
  async bookUnitsForCustomers(nationalIdentity, projectName) {
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.manageReservationsButton));
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.individualBooking));
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.newBookingButton), LONG_TIMEOUT);
    await this.waitAndFill(this.page.locator(DeveloperObjects_1.DeveloperObjects.nationalIdentityField), nationalIdentity);
    const searchButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.searchButton.role, { name: DeveloperObjects_1.DeveloperObjects.searchButton.name });
    await this.waitForVisible(searchButton);
    await searchButton.click();
    const nextButton = this.page.locator(DeveloperObjects_1.DeveloperObjects.nextButton);
    await (0, test_1.expect)(nextButton).toBeEnabled({ timeout: DEFAULT_TIMEOUT });
    await nextButton.click();
    await this.page.waitForTimeout(3000);
    await this.page.locator(DeveloperObjects_1.DeveloperObjects.projectNameField).fill(projectName);
    await this.page.waitForTimeout(2000);
    await this.page.locator(DeveloperObjects_1.DeveloperObjects.projectNameOptionSelector).click();
  }
  async bookUnitsForCustomersUsingUnitCode(nationalIdentity, unitCode) {
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.manageReservationsButton));
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.individualBooking));
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.newBookingButton), LONG_TIMEOUT);
    await this.waitAndFill(this.page.locator(DeveloperObjects_1.DeveloperObjects.nationalIdentityField), nationalIdentity);
    const searchButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.searchButton.role, { name: DeveloperObjects_1.DeveloperObjects.searchButton.name });
    await this.waitForVisible(searchButton);
    await searchButton.click();
    const nextButton = this.page.locator(DeveloperObjects_1.DeveloperObjects.nextButton);
    await (0, test_1.expect)(nextButton).toBeEnabled({ timeout: DEFAULT_TIMEOUT });
    await nextButton.click();
    await this.page.waitForTimeout(3000);
    await this.page.locator(DeveloperObjects_1.DeveloperObjects.unitCodeTextfield).fill(unitCode);
  }
  async bookUnitsForCompanies(companyUserId, companyCR, projectName) {
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.manageReservationsButton));
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.companyBookings));
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.newBookingButton));
    await this.waitAndFill(this.page.locator(DeveloperObjects_1.DeveloperObjects.companyCRField), companyCR);
    const searchButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.searchButton.role, { name: DeveloperObjects_1.DeveloperObjects.searchButton.name });
    await this.waitForVisible(searchButton);
    await searchButton.click();
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.nextButton));
    await this.waitAndFill(this.page.locator(DeveloperObjects_1.DeveloperObjects.companyUserId), companyUserId);
    await searchButton.click();
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.nextButton));
    await this.page.waitForTimeout(3000);
    await this.page.locator(DeveloperObjects_1.DeveloperObjects.projectNameField).fill(projectName);
    await this.page.waitForTimeout(2000);
    await this.page.locator(DeveloperObjects_1.DeveloperObjects.projectNameOptionSelector).click();
  }
  async clickOnNextButton() {
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.nextButton));
  }
  async clickOnKeepBooking() {
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.continueBookingButton));
  }
  async clickOnBankDropdown() {
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.bankSelector));
  }
  async selectCRMBank() {
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.crmBankSelector));
  }
  async confirmBookingForCompanies() {
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.confirmCompanyBooking));
  }
  async isCompanyBookingConfirmed() {
    await this.page.locator(DeveloperObjects_1.DeveloperObjects.showBookingDetailsButton).waitFor({ state: 'visible', timeout: 30000 });
    return await this.page.locator(DeveloperObjects_1.DeveloperObjects.showBookingDetailsButton).isVisible();
  }
  async clickOnConfirmationButton() {
    const confirmButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.confirmButton.role, { name: DeveloperObjects_1.DeveloperObjects.confirmButton.name });
    await confirmButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await confirmButton.click();
  }
  async isBookingListButtonVisible() {
    await this.page.locator(DeveloperObjects_1.DeveloperObjects.bookingListButton).waitFor({ state: 'visible', timeout: 90000 });
    return await this.page.locator(DeveloperObjects_1.DeveloperObjects.bookingListButton).isVisible();
  }
  async openTheFirstExistingProject() {
    await this.page.locator(DeveloperObjects_1.DeveloperObjects.showFirstProjectDetails).first().waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await this.page.locator(DeveloperObjects_1.DeveloperObjects.showFirstProjectDetails).first().click();
  }
  async clickOnReports() {
    const reportsLink = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.reportsLink.role, { name: DeveloperObjects_1.DeveloperObjects.reportsLink.name });
    await this.waitForVisible(reportsLink);
    await reportsLink.click();
  }
  async selectBookingsAndUnitsReport() {
    const reportTypeDropdown = this.page.locator(DeveloperObjects_1.DeveloperObjects.reportTypeDropdown.xpath);
    await this.waitForVisible(reportTypeDropdown);
    await reportTypeDropdown.click();
    const reportOption = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.bookingsAndUnitsReportOption.role, {
      name: DeveloperObjects_1.DeveloperObjects.bookingsAndUnitsReportOption.name,
    });
    await this.waitForVisible(reportOption);
    await reportOption.click();
  }
  async clickIssueTheReportButton() {
    const issueTheReportButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.issueTheReportButton.role, {
      name: DeveloperObjects_1.DeveloperObjects.issueTheReportButton.name,
    });
    await this.waitForVisible(issueTheReportButton);
    await issueTheReportButton.click();
  }
  async clickIssueReportButton() {
    const issueReportButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.issueReportButton.role, { name: DeveloperObjects_1.DeveloperObjects.issueReportButton.name });
    await this.waitForVisible(issueReportButton);
    await issueReportButton.click();
  }
  async searchProjectForReport(projectName) {
    const projectSearchInput = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.projectSearchInputFieldForReport.role, {
      name: DeveloperObjects_1.DeveloperObjects.projectSearchInputFieldForReport.name,
    });
    await this.waitForVisible(projectSearchInput);
    await projectSearchInput.fill(projectName);
    await this.page.waitForTimeout(2000);
    // await projectSearchInput.press("Backspace");
    const projectResult = this.page.locator(DeveloperObjects_1.DeveloperObjects.projectResult.xpath).first();
    if (await projectResult.isVisible()) {
      await projectResult.click();
    }
  }
  async refreshUntilReportStatusChanges() {
    const status = this.page.locator(DeveloperObjects_1.DeveloperObjects.status.xpath);
    const deadline = Date.now() + LONG_TIMEOUT;
    await this.waitForVisible(status);
    while ((await status.innerText()).trim() === 'تحت الإجراء') {
      const remainingTime = deadline - Date.now();
      if (remainingTime <= 0) {
        throw new Error(`Report status remained "تحت الإجراء" for ${LONG_TIMEOUT}ms`);
      }
      await this.page.waitForTimeout(Math.min(2000, remainingTime));
      await this.page.reload();
      await status.waitFor({
        state: 'visible',
        timeout: Math.max(1, deadline - Date.now()),
      });
    }
  }
  async clickReportDownloadButton() {
    const downloadButton = this.page.locator(DeveloperObjects_1.DeveloperObjects.downloadButton.xpath);
    await this.waitForVisible(downloadButton);
    await downloadButton.click();
  }
  async isReportAddedToastMessageVisible() {
    return await this.page.getByText(DeveloperObjects_1.DeveloperObjects.reportAddedToastMessage).isVisible();
  }
  async selectUnitCheckbox(row) {
    const unitCheckbox = this.page.locator(DeveloperObjects_1.DeveloperObjects.unitCheckbox(row));
    await this.waitForVisible(unitCheckbox);
    await unitCheckbox.click();
  }
  async clickContinueBookingButton() {
    const contiueBooking = this.page.locator(DeveloperObjects_1.DeveloperObjects.contiueBookingButton);
    await this.waitForVisible(contiueBooking);
    await contiueBooking.click();
  }
  async selectBank(bankName) {
    const bankDropdown = this.page.locator(DeveloperObjects_1.DeveloperObjects.bankDropdown);
    const bankOptions = this.page.locator(DeveloperObjects_1.DeveloperObjects.bankOptions(bankName));
    await this.waitForVisible(bankDropdown);
    await bankDropdown.click();
    await this.waitForVisible(bankOptions);
    await bankOptions.click();
  }
  async clickSelectAndContinue() {
    const selectAndContinue = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.selectAndContinueButton.role, { name: DeveloperObjects_1.DeveloperObjects.selectAndContinueButton.name });
    await selectAndContinue.click({ timeout: 20000 });
  }
  async validateSuccessReservationPopup() {
    const reservationSuccessPopup = this.page.locator(DeveloperObjects_1.DeveloperObjects.reservationSuccessPopup);
    await (0, test_1.expect)(reservationSuccessPopup, 'Reservation successful message pop up is not present').toBeVisible({ timeout: 20000 });
  }
  async clickOnIndividualBookings() {
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.manageReservationsButton));
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.individualBooking));
  }
  async clickOnCompanyBookings() {
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.manageReservationsButton));
    await this.waitAndClick(this.page.locator(DeveloperObjects_1.DeveloperObjects.companyBookings));
  }
  async validateSelectedPaymentMethodIsLending() {
    const paymentMethod = this.page.locator(DeveloperObjects_1.DeveloperObjects.selectedPaymentMethodLending.xpath);
    await (0, test_1.expect)(paymentMethod, 'Selected payment method is not Lending').toBeVisible({ timeout: 20000 });
  }
  async validateSelectedPaymentMethodIsCash() {
    const paymentMethod = this.page.locator(DeveloperObjects_1.DeveloperObjects.selectedPaymentMethodCash.xpath);
    await (0, test_1.expect)(paymentMethod, 'Selected payment method is not Cash').toBeVisible({ timeout: 20000 });
  }
}
exports.DeveloperProjectPage = DeveloperProjectPage;
