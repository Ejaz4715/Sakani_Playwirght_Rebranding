'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookingPage = void 0;
// @ts-nocheck
const test_1 = require('@playwright/test');
const promises_1 = require('node:fs/promises');
const pdf_parse_1 = require('pdf-parse');
const BookingCancellationObjects_1 = require('@objects/BookingCancellationObjects');
class BookingPage {
  constructor(page) {
    this.page = page;
  }
  async click(locator) {
    await (0, test_1.expect)(locator).toBeVisible({ timeout: 90000 });
    await locator.click();
  }
  async check(locator) {
    await (0, test_1.expect)(locator).toBeVisible({ timeout: 90000 });
    await locator.check();
  }
  async openActiveBookings() {
    const userProfileButton = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.userProfileButton);
    await this.click(userProfileButton);
    const myBookingsLink = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.myBookingsLink);
    await this.click(myBookingsLink);
    const activeBookingsTab = this.page.getByRole(BookingCancellationObjects_1.BookingCancellationObjects.activeBookingsTab.role, {
      name: BookingCancellationObjects_1.BookingCancellationObjects.activeBookingsTab.name,
    });
    await this.click(activeBookingsTab);
  }
  async openCompletedBookings() {
    const userProfileButton = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.userProfileButton);
    await (0, test_1.expect)(userProfileButton).toBeVisible({ timeout: 90000 });
    await this.click(userProfileButton);
    const myBookingsLink = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.myBookingsLink);
    await (0, test_1.expect)(myBookingsLink).toBeVisible({ timeout: 90000 });
    await this.click(myBookingsLink);
    const completedBookingsTab = this.page.getByRole(BookingCancellationObjects_1.BookingCancellationObjects.completedBookingsTab.role, {
      name: BookingCancellationObjects_1.BookingCancellationObjects.completedBookingsTab.name,
    });
    await (0, test_1.expect)(completedBookingsTab).toBeVisible({ timeout: 150000 });
    await this.click(completedBookingsTab);
  }
  async clickProfileIcon() {
    const userProfileButton = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.userProfileButton);
    await this.click(userProfileButton);
  }
  async clickManageProfile() {
    const manageProfile = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.manageProfile);
    await this.click(manageProfile);
  }
  async openBookingDetails() {
    const bookingDetailsButton = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.bookingDetailsButton.xpath).first();
    await this.click(bookingDetailsButton);
  }
  async verifyTheRefundedStatus() {
    const refundedStatus = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.refudedStatus.xpath);
    await (0, test_1.expect)(refundedStatus).toBeVisible({ timeout: 5000 });
  }
  async getBookedUnitCode() {
    const unitCode = this.page.locator("(//div[text() = ' رمز الوحدة ']/following-sibling::div/child::div)[1]");
    await unitCode.waitFor({ state: 'visible', timeout: 30000 });
    return (await unitCode.textContent())?.trim();
  }
  async cancelBooking() {
    const cancelBookingText = this.page.getByText(BookingCancellationObjects_1.BookingCancellationObjects.cancelBookingText.text);
    await this.click(cancelBookingText);
    const continueButton = this.page.getByRole(BookingCancellationObjects_1.BookingCancellationObjects.continueButton.role, {
      name: BookingCancellationObjects_1.BookingCancellationObjects.continueButton.name,
    });
    await this.click(continueButton);
    const projectLocationRadio = this.page.getByRole(BookingCancellationObjects_1.BookingCancellationObjects.projectLocationRadio.role, {
      name: BookingCancellationObjects_1.BookingCancellationObjects.projectLocationRadio.name,
    });
    await this.check(projectLocationRadio);
    const confirmCancelButton = this.page.getByRole(BookingCancellationObjects_1.BookingCancellationObjects.confirmCancelButton.role, {
      name: BookingCancellationObjects_1.BookingCancellationObjects.confirmCancelButton.name,
    });
    await this.click(confirmCancelButton);
    const yesButton = this.page.getByRole(BookingCancellationObjects_1.BookingCancellationObjects.yesButton.role, { name: BookingCancellationObjects_1.BookingCancellationObjects.yesButton.name });
    await this.click(yesButton);
  }
  async expectCancellationSuccess() {
    const successHeading = this.page.getByRole(BookingCancellationObjects_1.BookingCancellationObjects.cancellationSuccessHeading.role, {
      name: BookingCancellationObjects_1.BookingCancellationObjects.cancellationSuccessHeading.name,
    });
    await (0, test_1.expect)(successHeading, 'Cancellation success message is not visible').toBeVisible();
  }
  async cancelMohLandBooking(otp = ['1', '2', '3', '4']) {
    await this.page.getByText('إلغاء الحجز').click();
    await this.page.locator("//app-dropdown[@formcontrolname='cancel_reason']").click();
    await this.page.getByText('موقع المشروع').click();
    await this.page.getByRole('button', { name: 'حفظ ومتابعة' }).click();
    await this.page
      .getByRole('checkbox', {
        name: 'أؤكد قراءة وفهم الشروط والأحكام والموافقة عليها',
      })
      .check();
    await this.page.getByRole('button', { name: 'الاستمرار' }).click();
    const otpInputs = this.page.getByRole('textbox');
    for (let index = 0; index < otp.length; index++) {
      await otpInputs.nth(index).fill(otp[index]);
    }
    await this.page.getByRole('button', { name: 'تحقق', exact: true }).click();
    await this.page.getByRole('heading', { name: 'تم إلغاء الحجز بنجاح!' }).click();
  }
  //click on view of price quotation
  async clickOnViewOfProcequotationButton() {
    const viewPriceQuotationButton = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.viewPriceQuotationButton.xpath);
    await (0, test_1.expect)(viewPriceQuotationButton).toBeVisible({ timeout: 90000 });
    await viewPriceQuotationButton.click();
  }
  async verifyPriceQuotationContainsRequiredSections(pdfPath) {
    const parser = new pdf_parse_1.PDFParse({ data: await (0, promises_1.readFile)(pdfPath) });
    try {
      const { text } = await parser.getText();
      const normalizeText = (value) =>
        value
          .replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, '')
          .replace(/[أإآؤئ]/g, 'ا')
          .replace(/\s+/g, ' ');
      const normalizedText = normalizeText(text);
      const requiredSections = ['معلومات قيمة الوحدة', 'معلومات المطور العقاري', 'معلومات الإقرار'];
      for (const section of requiredSections) {
        const normalizedSection = normalizeText(section);
        const reversedSection = [...normalizedSection].reverse().join('');
        (0, test_1.expect)(normalizedText.includes(normalizedSection) || normalizedText.includes(reversedSection), `Price quotation PDF is missing the "${section}" section`).toBe(true);
      }
    } finally {
      await parser.destroy();
    }
  }
  async verifyCompletionPercentageProgressIsVisible(shouldBeVisible) {
    const completionPercentageProgress = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.compeltiopnPercentageProgress.xpath);
    if (shouldBeVisible) {
      await (0, test_1.expect)(completionPercentageProgress).toBeVisible();
    } else {
      await (0, test_1.expect)(completionPercentageProgress).toBeHidden();
    }
  }
  async verifyTheAvialabilityOfTheBanks(shouldBeVisible) {
    const noBanksAvailableMessage = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.noBanksAvailableMessage.xpath);
    if (shouldBeVisible) {
      await (0, test_1.expect)(noBanksAvailableMessage).toBeVisible();
    } else {
      await (0, test_1.expect)(noBanksAvailableMessage).toBeHidden();
    }
  }
  async verifyElementVisibility(elementObject, shouldBeVisible) {
    const element = this.page.locator(elementObject.xpath);
    if (shouldBeVisible) {
      await (0, test_1.expect)(element).toBeVisible();
    } else {
      await (0, test_1.expect)(element).toBeHidden();
    }
  }
  async clickBrochureButton() {
    const brochureButton = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.brochureButton.xpath);
    await this.click(brochureButton);
  }
  async clickCloseBrochureButton() {
    const closebrochureButton = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.closebrochureButton.xpath);
    await this.click(closebrochureButton);
  }
  async clickMasterplanButton() {
    const masterplanButton = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.masterplanButton.xpath);
    await this.click(masterplanButton);
  }
  async clickCloseMasterplanButton() {
    const closemasterplanButton = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.closemasterplanButton.xpath);
    await this.click(closemasterplanButton);
  }
  async clickOnDeveloperNameSection() {
    const developerNameSection = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.developerNameSection.xpath);
    await this.click(developerNameSection);
  }
  async clickOnViewDetailsButton() {
    const viewDetailsButton = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.viewDetailsButton.xpath);
    await this.click(viewDetailsButton);
  }
  async selectPropertyType() {
    const propertyTypeDropdown = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.propertyTypeDropdownButton.xpath);
    await this.click(propertyTypeDropdown);
    const propertyTypeOption = this.page.getByRole(BookingCancellationObjects_1.BookingCancellationObjects.propertyTypeOption.role, {
      name: BookingCancellationObjects_1.BookingCancellationObjects.propertyTypeOption.name,
    });
    await this.click(propertyTypeOption);
  }
  async selectConstructionStatus() {
    const constructionStatusDropdown = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.constructionStatusDropdownButton.xpath);
    await this.click(constructionStatusDropdown);
    const constructionStatusOption = this.page.getByRole(BookingCancellationObjects_1.BookingCancellationObjects.constructionStatusOption.role, {
      name: BookingCancellationObjects_1.BookingCancellationObjects.constructionStatusOption.name,
    });
    await this.click(constructionStatusOption);
  }
  async clickUnitResultCard() {
    const unitResultCard = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.unitResultCard.xpath);
    await (0, test_1.expect)(unitResultCard).toBeVisible({ timeout: 120000 });
    await unitResultCard.click();
  }
  async clickOnSaveButton() {
    const saveButton = this.page.getByRole(BookingCancellationObjects_1.BookingCancellationObjects.saveButton.role, { name: BookingCancellationObjects_1.BookingCancellationObjects.saveButton.name });
    await this.click(saveButton);
  }
  async clickOnRegisterOfInterest() {
    const registerOfInterest = this.page.getByRole(BookingCancellationObjects_1.BookingCancellationObjects.registerOfInterest.role, {
      name: BookingCancellationObjects_1.BookingCancellationObjects.registerOfInterest.name,
    });
    await this.click(registerOfInterest);
  }
}
exports.BookingPage = BookingPage;
