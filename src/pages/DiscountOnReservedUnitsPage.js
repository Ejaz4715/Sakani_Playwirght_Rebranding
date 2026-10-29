'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DiscountOnReservedUnitsPage = void 0;
const test_1 = require('@playwright/test');
const DiscountOnReservedUnitsObjects_1 = require('@objects/DiscountOnReservedUnitsObjects');
const pdf_parse_1 = require('pdf-parse');
const promises_1 = require('fs/promises');
const path_1 = __importDefault(require('path'));
class DiscountOnReservedUnitsPage {
  constructor(page) {
    this.page = page;
  }
  async clickOnManageBookingsButton() {
    const manageBookingsButton = this.page.locator(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.manageBookingsButton.xpath);
    await (0, test_1.expect)(manageBookingsButton).toBeVisible({ timeout: 90000 });
    await manageBookingsButton.click();
  }
  async clickOnIndividualBookingsButton() {
    const individualBookingsButton = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.individualBookingsButton.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.individualBookingsButton.name,
    });
    await (0, test_1.expect)(individualBookingsButton).toBeVisible({ timeout: 90000 });
    await individualBookingsButton.click();
  }
  async clickOnNewBookingButton() {
    const newBookingButton = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.newBookingButton.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.newBookingButton.name,
    });
    await (0, test_1.expect)(newBookingButton).toBeVisible({ timeout: 90000 });
    await newBookingButton.click();
  }
  async fillUserIdInputfield(userId) {
    const userIdInputfield = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.userIdInputfield.role);
    await (0, test_1.expect)(userIdInputfield).toBeVisible({ timeout: 90000 });
    await userIdInputfield.fill(userId);
  }
  async fillSearchForUnitOrIDInputfield(searchValue) {
    const searchForUnitOrIDInputfield = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.searchForUnitOrIDInputfield.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.searchForUnitOrIDInputfield.name,
    });
    await this.page.waitForTimeout(6000);
    await (0, test_1.expect)(searchForUnitOrIDInputfield).toBeVisible({ timeout: 90000 });
    await searchForUnitOrIDInputfield.fill(searchValue);
  }
  async selectPriceQuotationStatus() {
    const bookingStatusDropdown = this.page.locator(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.bookingStatusDropdown.xpath);
    await this.page.waitForTimeout(6000);
    await (0, test_1.expect)(bookingStatusDropdown).toBeVisible({ timeout: 90000 });
    await bookingStatusDropdown.click();
    const priceQuotationOption = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.priceQuotationStatusOption.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.priceQuotationStatusOption.name,
      exact: true,
    });
    await (0, test_1.expect)(priceQuotationOption).toBeVisible({ timeout: 90000 });
    await priceQuotationOption.click();
  }
  async clickOnSearchButton() {
    const searchButton = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.searchButton.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.searchButton.name,
    });
    await (0, test_1.expect)(searchButton).toBeVisible({ timeout: 90000 });
    await searchButton.click();
  }
  async clickOnNextButton() {
    const nextButton = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.nextButton.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.nextButton.name,
    });
    await (0, test_1.expect)(nextButton).toBeVisible({ timeout: 90000 });
    await nextButton.click();
  }
  async clickOnFirstUnitCheckbox() {
    const firstUnitCheckbox = this.page.locator(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.firstUnitCheckbox.xpath);
    await this.page.waitForTimeout(6000);
    await (0, test_1.expect)(firstUnitCheckbox).toBeVisible({ timeout: 90000 });
    await firstUnitCheckbox.click();
  }
  async clickOnContinueBookingButton() {
    const continueBookingButton = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.continueBtookingButton.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.continueBtookingButton.name,
    });
    await (0, test_1.expect)(continueBookingButton).toBeVisible({ timeout: 90000 });
    await continueBookingButton.click();
  }
  async selectBank() {
    const bankDropdown = this.page.locator(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.banksDropdownList.css);
    const bankCombobox = bankDropdown.getByRole('combobox');
    await (0, test_1.expect)(bankCombobox).toBeVisible({ timeout: 90000 });
    await bankCombobox.click();
    const bankOption = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.bankOption.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.bankOption.name,
    });
    await (0, test_1.expect)(bankOption).toBeVisible({ timeout: 90000 });
    await bankOption.click();
  }
  async fillDiscountPercentageInputfield(percentage) {
    const discountPercentageInputfield = this.page.locator(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.descountPercentageInputfield.xpath);
    await (0, test_1.expect)(discountPercentageInputfield).toBeVisible({ timeout: 90000 });
    await discountPercentageInputfield.fill(String(percentage));
  }
  async clickOnConfirmButton() {
    const confirmButton = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.confirmButton.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.confirmButton.name,
    });
    await (0, test_1.expect)(confirmButton).toBeVisible({ timeout: 90000 });
    await confirmButton.click();
  }
  async clickOnPayBookingFeesHeading() {
    const payBookingFeesHeading = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.payBookingFees.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.payBookingFees.name,
      exact: true,
    });
    await (0, test_1.expect)(payBookingFeesHeading).toBeVisible({ timeout: 1200000 });
    await payBookingFeesHeading.click();
  }
  async clickOnTheBookings() {
    const theBookings = this.page.getByText(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.theBookings.text);
    await (0, test_1.expect)(theBookings).toBeVisible({ timeout: 90000 });
    await theBookings.click();
  }
  async clickOnViewDetailsOfSearchedResultButton() {
    const viewDetailsOfSearchedResultButton = this.page.getByText(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.viewDetailsOfSerchedResultButton.text, { exact: true });
    await this.page.waitForTimeout(9000);
    await (0, test_1.expect)(viewDetailsOfSearchedResultButton).toBeVisible({
      timeout: 90000,
    });
    await viewDetailsOfSearchedResultButton.click();
  }
  async verifyTheUnitIsBooked() {
    const viewDetailsButton = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.viewDetailsButton.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.viewDetailsButton.name,
    });
    await (0, test_1.expect)(viewDetailsButton).toBeVisible({ timeout: 1200000 });
  }
  async clickOnBookingsTab() {
    const bookingsTab = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.bookingsTab.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.bookingsTab.name,
    });
    await (0, test_1.expect)(bookingsTab).toBeVisible({ timeout: 90000 });
    await bookingsTab.click();
  }
  async selectCancellationReasonOption() {
    const cancellationReasonDropdownList = this.page.locator(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.cancellationReasonDropdownList.xpath);
    await (0, test_1.expect)(cancellationReasonDropdownList).toBeVisible({
      timeout: 90000,
    });
    await cancellationReasonDropdownList.click();
    const cancellationReasonOption = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.cancellationReasonOption.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.cancellationReasonOption.name,
    });
    await (0, test_1.expect)(cancellationReasonOption).toBeVisible({ timeout: 90000 });
    await cancellationReasonOption.click();
  }
  async clickOnCancelBookingButton() {
    const cancelBookingButton = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.cancelBookingButton.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.cancelBookingButton.name,
    });
    await (0, test_1.expect)(cancelBookingButton).toBeVisible({ timeout: 90000 });
    await cancelBookingButton.click();
  }
  async clickOnContinueCancellationButton() {
    const continueButton = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.continueCancellationButton.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.continueCancellationButton.name,
    });
    await (0, test_1.expect)(continueButton).toBeVisible({ timeout: 90000 });
    await continueButton.click();
  }
  async clickOnNoButton() {
    const noButton = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.noButton.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.noButton.name,
    });
    await (0, test_1.expect)(noButton).toBeVisible({ timeout: 90000 });
    await noButton.click();
  }
  async clickOnYesButton() {
    const yesButton = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.yesButton.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.yesButton.name,
    });
    await (0, test_1.expect)(yesButton).toBeVisible({ timeout: 90000 });
    await yesButton.click();
  }
  async fillCancellationOtpCodeInput(code) {
    const cancellationOtpCodeInput = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.cancellationOtpCodeInput.role);
    await (0, test_1.expect)(cancellationOtpCodeInput).toBeVisible({ timeout: 90000 });
    await cancellationOtpCodeInput.fill(String(code));
  }
  async clickOnVerifyCancellationCodeButton() {
    const verifyCancellationCodeButton = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.verifyCancellationCodeButton.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.verifyCancellationCodeButton.name,
    });
    await (0, test_1.expect)(verifyCancellationCodeButton).toBeVisible({ timeout: 90000 });
    await verifyCancellationCodeButton.click();
  }
  async verifyBeneficiaryCancellationToastSuccessMessage() {
    const successMessage = this.page.locator(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.beneficiaryCancellationToastSuccessMessage);
    await (0, test_1.expect)(successMessage, 'Cancellation success message is not present').toBeVisible({ timeout: 90000 });
  }
  async clickOnPriceQuotationTab() {
    const priceQuotationTab = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.priceQuotationTab.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.priceQuotationTab.name,
    });
    await (0, test_1.expect)(priceQuotationTab).toBeVisible({ timeout: 90000 });
    await priceQuotationTab.click();
  }
  async clickOnReissuePriceQuotationButton() {
    const reissuePriceQuotationButton = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.reissuePriceQuotationButton.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.reissuePriceQuotationButton.name,
      exact: true,
    });
    await (0, test_1.expect)(reissuePriceQuotationButton).toBeVisible({ timeout: 90000 });
    await reissuePriceQuotationButton.click();
  }
  async verifyPriceQuotationReissueSuccessMessage() {
    const successMessage = this.page.getByText(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.reissuePriceQuotationSuccessMessage.text, { exact: true });
    await (0, test_1.expect)(successMessage).toBeVisible({ timeout: 90000 });
  }
  async clickOnExtendPriceQuotationButton() {
    const extendPriceQuotationButton = this.page.getByRole(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.extendPriceQuotationButton.role, {
      name: DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.extendPriceQuotationButton.name,
      exact: true,
    });
    await (0, test_1.expect)(extendPriceQuotationButton).toBeVisible({ timeout: 90000 });
    await extendPriceQuotationButton.click();
  }
  async verifyPriceQuotationExtendSuccessMessage() {
    const successMessage = this.page.getByText(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.extendPriceQuotationSuccessMessage.text, { exact: true });
    await (0, test_1.expect)(successMessage).toBeVisible({ timeout: 90000 });
  }
  async clickOnDownloadIcon(fileName) {
    const downloadIcon = this.page.locator(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.downloadIcon.css);
    await (0, test_1.expect)(downloadIcon).toBeVisible({ timeout: 90000 });
    const downloadsDirectory = path_1.default.resolve(process.cwd(), 'src', 'downloads');
    await (0, promises_1.mkdir)(downloadsDirectory, { recursive: true });
    const existingEntries = await (0, promises_1.readdir)(downloadsDirectory, {
      withFileTypes: true,
    });
    await Promise.all(existingEntries.filter((entry) => entry.isFile()).map((entry) => (0, promises_1.unlink)(path_1.default.join(downloadsDirectory, entry.name))));
    const downloadPromise = this.page.waitForEvent('download');
    await downloadIcon.click();
    const download = await downloadPromise;
    const suggestedFilename = path_1.default.basename(download.suggestedFilename());
    const requestedFilename = fileName?.trim();
    const baseFilename = requestedFilename ? path_1.default.basename(requestedFilename) : suggestedFilename;
    const targetFilename = path_1.default.extname(baseFilename) ? baseFilename : `${baseFilename}${path_1.default.extname(suggestedFilename)}`;
    const targetPath = path_1.default.join(downloadsDirectory, targetFilename);
    if ((await (0, promises_1.readdir)(downloadsDirectory)).includes(targetFilename)) {
      throw new Error(`Download file already exists: ${targetPath}`);
    }
    await download.saveAs(targetPath);
    await (0, promises_1.access)(targetPath);
    return targetPath;
  }
  async getUnitPriceBeforeDiscount() {
    const unitPriceBeforeDiscount = this.page.locator(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.unitPriceBeforeDiscount.xpath);
    await (0, test_1.expect)(unitPriceBeforeDiscount).toBeVisible({ timeout: 90000 });
    const priceText = await unitPriceBeforeDiscount.innerText();
    return priceText.replace(/\D/g, '');
  }
  async getUnitPriceAfterDiscount() {
    const unitPriceAfterDiscount = this.page.locator(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.unitPriceAfterDiscount.xpath);
    await (0, test_1.expect)(unitPriceAfterDiscount).toBeVisible({ timeout: 90000 });
    const priceText = await unitPriceAfterDiscount.innerText();
    return priceText.replace(/\D/g, '');
  }
  async verifyTheUnitAmountSameAfterDiscount(pdfPath, expectedAmount) {
    const parser = new pdf_parse_1.PDFParse({ data: await (0, promises_1.readFile)(pdfPath) });
    try {
      const { text } = await parser.getText();
      const normalizedText = text.replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, '');
      const amounts = normalizedText.match(/[\d٠-٩][\d٠-٩,٬]*(?:[.٫][\d٠-٩]+)?/g) ?? [];
      const normalizeAmount = (amount) =>
        Number(
          String(amount)
            .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
            .replace(/[٬,]/g, '')
            .replace('٫', '.')
        );
      const expectedValue = normalizeAmount(expectedAmount);
      (0, test_1.expect)(
        amounts.some((amount) => normalizeAmount(amount) === expectedValue),
        `PDF property value should match the expected amount ${expectedAmount}. Found: ${amounts.join(', ')}`
      ).toBe(true);
    } finally {
      await parser.destroy();
    }
  }
  async verifyUnitPricesAreDifferent() {
    const priceBeforeDiscount = await this.getUnitPriceBeforeDiscount();
    const priceAfterDiscount = await this.getUnitPriceAfterDiscount();
    (0, test_1.expect)(priceAfterDiscount.trim()).not.toBe(priceBeforeDiscount.trim());
  }
  async searchAndSelectProject(projectName) {
    const projectNameInputfield = this.page.locator(DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.projectNameInputfield.xpath);
    await this.page.waitForTimeout(5000);
    await (0, test_1.expect)(projectNameInputfield).toBeVisible({ timeout: 90000 });
    await projectNameInputfield.fill(projectName);
    const projectOption = DiscountOnReservedUnitsObjects_1.DiscountOnReservedUnitsObjects.projectOption(projectName);
    const matchingProjectOption = this.page.getByRole(projectOption.role, {
      name: projectOption.name,
    });
    await (0, test_1.expect)(matchingProjectOption).toBeVisible({ timeout: 90000 });
    await matchingProjectOption.click();
  }
}
exports.DiscountOnReservedUnitsPage = DiscountOnReservedUnitsPage;
