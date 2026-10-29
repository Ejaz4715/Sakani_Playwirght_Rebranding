'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.LoyaltyAdminDealsPage = void 0;
const LoyaltyAdminDealsObjects_1 = require('@objects/LoyaltyAdminDealsObjects');
const DEFAULT_TIMEOUT = 30_000;
class LoyaltyAdminDealsPage {
  constructor(page) {
    this.page = page;
  }
  // ---------- shared helpers ----------
  async waitVisible(locator) {
    await locator.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return locator;
  }
  async clickWhenVisible(locator) {
    await (await this.waitVisible(locator)).click();
  }
  async fillWhenVisible(locator, text) {
    await (await this.waitVisible(locator)).fill(text);
  }
  async isShown(locator) {
    return await (await this.waitVisible(locator)).isVisible();
  }
  async textWhenVisible(locator) {
    return (await (await this.waitVisible(locator)).innerText()).trim();
  }
  // Clicks an option of the opened dropdown list by its exact name
  async clickDropdownOption(optionName) {
    await this.clickWhenVisible(this.page.getByRole(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.dropdownOption.role, { name: optionName, exact: true }));
  }
  // ---------- locators used by more than one step ----------
  get deleteModal() {
    return this.page.locator(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.deleteModal);
  }
  get cancelButton() {
    return this.page.getByRole(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.modalCancelButton.role, { name: LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.modalCancelButton.name });
  }
  get filterSearchTextbox() {
    return this.page.getByRole(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.filterSearchTextbox.role, { name: LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.filterSearchTextbox.name });
  }
  get filterForm() {
    return this.page.locator(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.filterForm);
  }
  // ---------- add / edit deal form ----------
  async selectOfficeName(officeName) {
    const officeNameDropdown = await this.waitVisible(this.page.locator(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.officeNameDropdown));
    await officeNameDropdown.click();
    await officeNameDropdown.fill(officeName);
    await this.clickDropdownOption(officeName);
  }
  async selectStatus(status) {
    await this.clickWhenVisible(this.page.locator(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.statusDropdown));
    await this.clickDropdownOption(status);
  }
  async selectCampaignStartDate(date) {
    await this.selectDateFromCalendar(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.campaignStartDateCalendarIcon, date);
  }
  async selectCampaignEndDate(date) {
    await this.selectDateFromCalendar(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.campaignEndDateCalendarIcon, date);
  }
  // Opens the calendar and clicks the day, "Saturday, October 24, 2026"; if the day is not visible, clicks the previous or next month button until it is
  async selectDateFromCalendar(calendarIconLocator, date) {
    await this.clickWhenVisible(this.page.locator(calendarIconLocator));
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    const day = this.page.getByRole(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.calendarDay.role, { name: dayName });
    // past dates are in earlier months, future dates in later months
    const monthButton =
      date < new Date() ? LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.calendarPreviousMonthButton : LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.calendarNextMonthButton;
    const changeMonthButton = this.page.getByRole(monthButton.role, { name: monthButton.name });
    for (let i = 0; i < 2 && !(await day.isVisible()); i++) {
      await changeMonthButton.click();
    }
    await this.clickWhenVisible(day);
  }
  // Fills title, description and details (used when creating and when updating a deal)
  async fillDealTexts(texts) {
    await this.fillDealTitle(texts.title);
    await this.fillDealDescription(texts.description);
    await this.fillDealDetails(texts.details);
  }
  async fillDealTitle(title) {
    await this.fillWhenVisible(this.page.locator(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.dealTitleField), title);
  }
  async fillDealDescription(description) {
    await this.fillWhenVisible(this.page.locator(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.dealDescriptionField), description);
  }
  async fillDealDetails(details) {
    await this.fillWhenVisible(this.page.locator(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.dealDetailsField), details);
  }
  async uploadDealImage(imageFilePath) {
    await this.uploadFile(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.dealImageUploadText, imageFilePath);
  }
  async uploadDealPdf(pdfFilePath) {
    await this.uploadFile(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.dealPdfUploadText, pdfFilePath);
  }
  // Selects the file in the upload box with the given text and waits until it is fully uploaded to storage, so Save sends it with the deal
  async uploadFile(uploadBoxText, filePath) {
    const fileInput = this.page
      .locator(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.uploadFilesComponent)
      .filter({ hasText: uploadBoxText })
      .locator(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.fileInput);
    await fileInput.waitFor({ state: 'attached', timeout: DEFAULT_TIMEOUT });
    const uploadFinished = this.page.waitForResponse(
      (response) => response.url().includes(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.fileStorageUrl) && response.request().method() === 'PUT',
      {
        timeout: DEFAULT_TIMEOUT,
      }
    );
    await fileInput.setInputFiles(filePath);
    await uploadFinished;
  }
  // ---------- deal record ----------
  async isDealCompanyHeadingVisible(companyName) {
    return await this.isShown(this.page.getByRole(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.dealCompanyHeading.role, { name: companyName }));
  }
  async getOfficeNameInRecord() {
    return await this.textWhenVisible(this.page.locator(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.recordOfficeNameField));
  }
  async getStatusInRecord() {
    const statusText = await this.textWhenVisible(this.page.locator(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.recordStatusField));
    // "غير نشط" is checked first so an inactive deal is never read as "نشط"
    return statusText.match(/غير نشط|نشط/)?.[0] ?? statusText;
  }
  async clickBackToList() {
    await this.clickWhenVisible(this.page.getByText(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.backToListLink));
  }
  // ---------- deals list ----------
  // The deal's row in the list, without waiting for it (used to assert it is gone)
  getDealRow(companyName, price) {
    return this.page
      .getByRole(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.dealsListRow.role)
      .filter({ hasText: companyName })
      .filter({ hasText: this.toListPrice(price) })
      .first();
  }
  // The list shows prices with a thousands separator, e.g. 4077 -> "4,077"
  toListPrice(price) {
    return Number(price).toLocaleString('en-US');
  }
  // Finds the deal row by company name and its unique price
  async findDealRowInList(companyName, price) {
    return await this.waitVisible(this.getDealRow(companyName, price));
  }
  // Returns the exact text of the deal's status cell
  async getDealStatusInList(companyName, price) {
    const dealRow = await this.findDealRowInList(companyName, price);
    return (await dealRow.getByRole('cell').filter({ hasText: LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.dealStatusCell }).innerText()).trim();
  }
  // Returns all the text of the deal's row (title, description, prices, date and status)
  async getDealRowInList(companyName, price) {
    return (await (await this.findDealRowInList(companyName, price)).innerText()).trim();
  }
  async clickEditDealInList(companyName, price) {
    const dealRow = await this.findDealRowInList(companyName, price);
    await this.clickWhenVisible(dealRow.getByText(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.editDealInList, { exact: true }));
  }
  // All the data rows of the list (the header row has no cells)
  async getListDataRows() {
    const rows = this.page.getByRole(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.dealsListRow.role).filter({ has: this.page.getByRole('cell') });
    await this.waitVisible(rows.first());
    return rows;
  }
  // Company name and status of the first deal in the list (cells: id, company, title, description, prices, date, status, actions)
  async getFirstDealInList() {
    const firstRow = (await this.getListDataRows()).first();
    const companyCell = firstRow.getByRole('cell').nth(1);
    const statusCell = firstRow.getByRole('cell').filter({ hasText: LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.dealStatusCell });
    return {
      companyName: (await this.textWhenVisible(companyCell)).replace(/\s+/g, ' '),
      status: await this.textWhenVisible(statusCell),
    };
  }
  // Row count once the list has finished loading (the count is the same on 3 reads in a row, 500ms apart)
  async getLoadedListRowsCount() {
    let count = await this.getListRowsCount();
    for (let sameReads = 0; sameReads < 3;) {
      await this.page.waitForTimeout(500);
      const newCount = await this.getListRowsCount();
      sameReads = newCount === count ? sameReads + 1 : 0;
      count = newCount;
    }
    return count;
  }
  async getListRowsCount() {
    return await (await this.getListDataRows()).count();
  }
  async getListRowsTexts() {
    return await (await this.getListDataRows()).allInnerTexts();
  }
  // ---------- delete ----------
  // Clicks the delete button of the deal's row, which opens the confirmation modal
  async clickDeleteDealInList(companyName, price) {
    const dealRow = await this.findDealRowInList(companyName, price);
    await dealRow.getByRole('button').click();
    await this.waitVisible(this.deleteModal);
  }
  async isDeletePopupVisible() {
    return await this.isShown(this.deleteModal);
  }
  async isCancelButtonVisibleInModal() {
    return await this.isShown(this.cancelButton);
  }
  async clickCancelInModal() {
    await this.cancelButton.click();
    await this.deleteModal.waitFor({ state: 'hidden', timeout: DEFAULT_TIMEOUT });
  }
  async clickRemoveInModal() {
    await this.clickWhenVisible(
      this.page.getByRole(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.modalConfirmButton.role, { name: LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.modalConfirmButton.name })
    );
  }
  // ---------- filter ----------
  async fillFilterSearch(text) {
    await this.fillWhenVisible(this.filterSearchTextbox, text);
  }
  async selectFilterStatus(status) {
    await this.clickWhenVisible(this.filterForm.locator(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.filterDropdown).first());
    await this.clickDropdownOption(status);
  }
  async clickFilterSearch() {
    await this.page
      .getByRole(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.filterSearchButton.role, { name: LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.filterSearchButton.name, exact: true })
      .click();
  }
  async clickFilterReset() {
    await this.page.getByRole(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.filterResetButton.role, { name: LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.filterResetButton.name }).click();
  }
  async getFilterSearchValue() {
    return await this.filterSearchTextbox.inputValue();
  }
  // Number of values selected in the filter dropdowns (0 when the filter is empty)
  async getFilterSelectedValuesCount() {
    return await this.filterForm.locator(LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.filterSelectedValue).count();
  }
  // ---------- expected status ----------
  // Offer status is "نشط" only when it is saved as active and today is between the start and end dates; otherwise "غير نشط"
  getExpectedStatus(startDate, endDate, savedStatus) {
    const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const today = startOfDay(new Date());
    const isRunningToday = startOfDay(startDate) <= today && today <= startOfDay(endDate);
    return savedStatus === LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.activeStatus && isRunningToday
      ? LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.activeStatus
      : LoyaltyAdminDealsObjects_1.LoyaltyAdminDealsObjects.inactiveStatus;
  }
}
exports.LoyaltyAdminDealsPage = LoyaltyAdminDealsPage;
