// @ts-nocheck
import { expect } from '@playwright/test';
import { mkdir, readdir, unlink, readFile } from 'node:fs/promises';
import path from 'node:path';
import { PDFParse } from 'pdf-parse';
import { BookingCancellationObjects } from '@objects/BookingCancellationObjects';
import { BookingAndSelectPaymentMethodObjects } from '@objects/BookingAndSelectPaymentMethodObjects';
import { FavoritesObjects } from '@objects/FavoritesObjects';
import { TIMEOUT } from 'node:dns';

export class BookingPage {
  constructor(page) {
    this.page = page;
  }

  async click(locator) {
    await expect(locator).toBeVisible({ timeout: 90000 });
    await locator.click();
  }

  async check(locator) {
    await expect(locator).toBeVisible({ timeout: 90000 });
    await locator.check();
  }

  async openActiveBookings() {
    const userProfileButton = this.page.locator(BookingCancellationObjects.userProfileButton);
    await this.click(userProfileButton);

    const myBookingsLink = this.page.locator(BookingCancellationObjects.myBookingsLink);
    await this.click(myBookingsLink);

    const activeBookingsTab = this.page.getByRole(BookingCancellationObjects.activeBookingsTab.role, { name: BookingCancellationObjects.activeBookingsTab.name });
    await this.click(activeBookingsTab);
  }

  async openCompletedBookings() {
    const userProfileButton = this.page.locator(BookingCancellationObjects.userProfileButton);
    await expect(userProfileButton).toBeVisible({ timeout: 90000 });
    await this.click(userProfileButton);

    const myBookingsLink = this.page.locator(BookingCancellationObjects.myBookingsLink);
    await expect(myBookingsLink).toBeVisible({ timeout: 90000 });
    await this.click(myBookingsLink);

    const completedBookingsTab = this.page.getByRole(BookingCancellationObjects.completedBookingsTab.role, { name: BookingCancellationObjects.completedBookingsTab.name });
    await expect(completedBookingsTab).toBeVisible({ timeout: 150000 });
    await this.click(completedBookingsTab);
  }

  async clickProfileIcon() {
    const userProfileButton = this.page.locator(BookingCancellationObjects.userProfileButton);
    await this.click(userProfileButton);
  }

  async clickManageProfile() {
    const manageProfile = this.page.locator(BookingCancellationObjects.manageProfile);
    await this.click(manageProfile);
  }

  async openBookingDetails() {
    const bookingDetailsButton = this.page
      .getByRole(BookingCancellationObjects.bookingDetailsButton.role, {
        name: BookingCancellationObjects.bookingDetailsButton.name,
      })
      .first();
    await this.click(bookingDetailsButton);
  }

  async verifyTheRefundedStatus() {
    const refundedStatus = this.page.locator(BookingCancellationObjects.refudedStatus.xpath);
    await expect(refundedStatus).toBeVisible({ timeout: 5000 });
  }

  async getBookedUnitCode() {
    const unitCode = this.page.locator("(//div[text() = 'رمز الوحدة']/following-sibling::div/child::div)[1]");
    await unitCode.waitFor({ state: 'visible', timeout: 30000 });
    return (await unitCode.textContent())?.trim();
  }

  async cancelBooking() {
    const cancelBookingText = this.page.getByText(BookingCancellationObjects.cancelBookingText.text);
    await this.click(cancelBookingText);

    const continueButton = this.page.getByRole(BookingCancellationObjects.continueButton.role, { name: BookingCancellationObjects.continueButton.name });
    await this.click(continueButton);

    const projectLocationRadio = this.page.getByRole(BookingCancellationObjects.projectLocationRadio.role, { name: BookingCancellationObjects.projectLocationRadio.name });
    await this.check(projectLocationRadio);

    const confirmCancelButton = this.page.getByRole(BookingCancellationObjects.confirmCancelButton.role, { name: BookingCancellationObjects.confirmCancelButton.name });
    await this.click(confirmCancelButton);

    const yesButton = this.page.getByRole(BookingCancellationObjects.yesButton.role, { name: BookingCancellationObjects.yesButton.name });
    await this.click(yesButton);
  }

  async expectCancellationSuccess() {
    const successHeading = this.page.getByRole(BookingCancellationObjects.cancellationSuccessHeading.role, { name: BookingCancellationObjects.cancellationSuccessHeading.name });
    await expect(successHeading, 'Cancellation success message is not visible').toBeVisible();
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
    const viewPriceQuotationButton = this.page.locator(BookingCancellationObjects.viewPriceQuotationButton.xpath);

    await expect(viewPriceQuotationButton).toBeVisible({ timeout: 90000 });
    await viewPriceQuotationButton.click();
  }

  async verifyPriceQuotationContainsRequiredSections(pdfPath: string) {
    const parser = new PDFParse({ data: await readFile(pdfPath) });
    try {
      const { text } = await parser.getText();
      const normalizeText = (value: string): string =>
        value
          .replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, '')
          .replace(/[أإآؤئ]/g, 'ا')
          .replace(/\s+/g, ' ');
      const normalizedText = normalizeText(text);
      const requiredSections = ['معلومات قيمة الوحدة', 'معلومات المطور العقاري', 'معلومات الإقرار'];

      for (const section of requiredSections) {
        const normalizedSection = normalizeText(section);
        const reversedSection = [...normalizedSection].reverse().join('');
        expect(normalizedText.includes(normalizedSection) || normalizedText.includes(reversedSection), `Price quotation PDF is missing the "${section}" section`).toBe(true);
      }
    } finally {
      await parser.destroy();
    }
  }

  async verifyCompletionPercentageProgressIsVisible(shouldBeVisible: boolean) {
    const completionPercentageProgress = this.page.locator(BookingCancellationObjects.compeltiopnPercentageProgress.xpath);
    if (shouldBeVisible) {
      await expect(completionPercentageProgress).toBeVisible();
    } else {
      await expect(completionPercentageProgress).toBeHidden();
    }
  }
  async verifyTheAvialabilityOfTheBanks(shouldBeVisible: boolean) {
    const noBanksAvailableMessage = this.page.locator(BookingCancellationObjects.noBanksAvailableMessage.xpath);
    if (shouldBeVisible) {
      await expect(noBanksAvailableMessage).toBeVisible();
    } else {
      await expect(noBanksAvailableMessage).toBeHidden();
    }
  }

  async verifyElementVisibility(elementObject: { readonly xpath: string }, shouldBeVisible: boolean) {
    const element = this.page.locator(elementObject.xpath);
    if (shouldBeVisible) {
      await expect(element).toBeVisible();
    } else {
      await expect(element).toBeHidden();
    }
  }

  async clickBrochureButton() {
    const brochureButton = this.page.locator(BookingCancellationObjects.brochureButton.xpath);
    await this.click(brochureButton);
  }

  async clickCloseBrochureButton() {
    const closebrochureButton = this.page.locator(BookingCancellationObjects.closebrochureButton.xpath);
    await this.click(closebrochureButton);
  }

  async clickMasterplanButton() {
    const masterplanButton = this.page.locator(BookingCancellationObjects.masterplanButton.xpath);
    await this.click(masterplanButton);
  }
  async clickCloseMasterplanButton() {
    const closemasterplanButton = this.page.locator(BookingCancellationObjects.closemasterplanButton.xpath);
    await this.click(closemasterplanButton);
  }
  async clickOnDeveloperNameSection() {
    const developerNameSection = this.page.locator(BookingCancellationObjects.developerNameSection.xpath);
    await this.click(developerNameSection);
  }

  async clickOnViewDetailsButton() {
    const viewDetailsButton = this.page.locator(BookingCancellationObjects.viewDetailsButton.xpath);
    await this.click(viewDetailsButton);
  }

  async selectPropertyType() {
    const propertyTypeDropdown = this.page.locator(BookingCancellationObjects.propertyTypeDropdownButton.xpath);
    await this.click(propertyTypeDropdown);

    const propertyTypeOption = this.page.getByRole(BookingCancellationObjects.propertyTypeOption.role, { name: BookingCancellationObjects.propertyTypeOption.name });
    await this.click(propertyTypeOption);
  }

  async selectConstructionStatus() {
    const constructionStatusDropdown = this.page.locator(BookingCancellationObjects.constructionStatusDropdownButton.xpath);

    await this.click(constructionStatusDropdown);

    const constructionStatusOption = this.page.getByRole(BookingCancellationObjects.constructionStatusOption.role, { name: BookingCancellationObjects.constructionStatusOption.name });
    await this.click(constructionStatusOption);
  }

  async clickUnitResultCard() {
    const unitResultCard = this.page.locator(BookingCancellationObjects.unitResultCard.xpath);
    await expect(unitResultCard).toBeVisible({ timeout: 120000 });
    await unitResultCard.click();
  }

  async clickOnSaveButton() {
    const saveButton = this.page.getByRole(BookingCancellationObjects.saveButton.role, { name: BookingCancellationObjects.saveButton.name });
    await this.click(saveButton);
  }

  async clickOnRegisterOfInterest() {
    const registerOfInterest = this.page.getByRole(BookingCancellationObjects.registerOfInterest.role, { name: BookingCancellationObjects.registerOfInterest.name });
    await this.click(registerOfInterest);
  }

  // Pre-beta booking flow

  // Clicks the first unit model card on the project page, it opens in a new tab
  async openFirstUnitModelInNewTab() {
    const newTab = this.page.context().waitForEvent('page', { timeout: 90000 });
    const unitModelCard = this.page.getByText(FavoritesObjects.unitCardTitle).first();
    await this.click(unitModelCard);
    return await newTab;
  }

  // Opens the units on the unit model page one by one (new tab).
  // If the unit shows the "book with developer" message, close it and try the next unit, until احجز وحدة is displayed
  async openFirstBookableUnitInNewTab() {
    const unitCards = this.page.locator(BookingAndSelectPaymentMethodObjects.unitModelUnitCard);
    await expect(unitCards.first()).toBeVisible({ timeout: 90000 });
    const unitsCount = await unitCards.count();

    for (let index = 0; index < unitsCount; index++) {
      const newTab = this.page.context().waitForEvent('page', { timeout: 90000 });
      await unitCards.nth(index).click();
      const unitTab = await newTab;

      const bookUnitButton = unitTab.getByRole(BookingAndSelectPaymentMethodObjects.bookUnitButton.role, { name: BookingAndSelectPaymentMethodObjects.bookUnitButton.name });
      const bookWithDeveloperMessage = unitTab.getByText(BookingAndSelectPaymentMethodObjects.bookWithDeveloperMessage).first();
      await expect(bookUnitButton.or(bookWithDeveloperMessage).first()).toBeVisible({ timeout: 90000 });

      if (await bookUnitButton.isVisible()) {
        return unitTab;
      }
      await unitTab.close();
    }

    throw new Error('No unit with the احجز وحدة button was found on the unit model page');
  }

  async clickBookUnitButton() {
    const bookUnitButton = this.page.getByRole(BookingAndSelectPaymentMethodObjects.bookUnitButton.role, { name: BookingAndSelectPaymentMethodObjects.bookUnitButton.name });
    await this.click(bookUnitButton);
  }

  // If the "you have another request" popup is displayed click نعم, then wait for the terms and conditions (booking summary)
  async confirmOtherRequestIfDisplayed() {
    const yesButton = this.page.getByText(BookingAndSelectPaymentMethodObjects.yesButton.text, { exact: true });
    const termsCheckbox = this.page.getByRole(BookingAndSelectPaymentMethodObjects.termsCheckboxV6.role, { name: BookingAndSelectPaymentMethodObjects.termsCheckboxV6.name });
    await expect(yesButton.or(termsCheckbox).first()).toBeVisible({ timeout: 90000 });

    if (await yesButton.isVisible()) {
      await this.click(yesButton);
    }
    await this.page.waitForURL(BookingAndSelectPaymentMethodObjects.bookingSummaryUrl, { timeout: 90000 });
  }

  async acceptTermsAndConditions() {
    const termsCheckbox = this.page.getByRole(BookingAndSelectPaymentMethodObjects.termsCheckboxV6.role, { name: BookingAndSelectPaymentMethodObjects.termsCheckboxV6.name });
    await this.check(termsCheckbox);
  }

  async clickPayBookingFeesButton() {
    const payBookingFeesButton = this.page.getByRole(BookingAndSelectPaymentMethodObjects.payBookingFeesButtonV6.role, { name: BookingAndSelectPaymentMethodObjects.payBookingFeesButtonV6.name });
    await this.click(payBookingFeesButton);
  }

  async verifyPaymentAmountOnCheckout(amount) {
    await this.page.waitForURL(BookingAndSelectPaymentMethodObjects.checkoutUrl, { timeout: 90000 });

    const amountHeading = this.page.getByRole(BookingAndSelectPaymentMethodObjects.checkoutAmountHeading.role, { name: amount });
    await expect(amountHeading).toBeVisible({ timeout: 90000 });

    const invoiceSummaryButton = this.page.getByRole(BookingAndSelectPaymentMethodObjects.invoiceSummaryButton.role, { name: BookingAndSelectPaymentMethodObjects.invoiceSummaryButton.name });
    await this.click(invoiceSummaryButton);

    const invoiceSummaryModal = this.page.locator(BookingAndSelectPaymentMethodObjects.invoiceSummaryModal);
    await expect(invoiceSummaryModal.getByText(BookingAndSelectPaymentMethodObjects.amountDueText.text)).toBeVisible({ timeout: 30000 });

    const closeButton = this.page.getByRole(BookingAndSelectPaymentMethodObjects.closeInvoiceSummaryButton.role, { name: BookingAndSelectPaymentMethodObjects.closeInvoiceSummaryButton.name });
    await this.click(closeButton);
  }

  async openMyBookingsFromProfileMenu() {
    const profileButton = this.page.getByRole(FavoritesObjects.profileButton.role, { name: FavoritesObjects.profileButton.name }).first();
    await this.click(profileButton);

    const myBookingsButton = this.page.getByRole(BookingAndSelectPaymentMethodObjects.myBookingsButton.role, { name: BookingAndSelectPaymentMethodObjects.myBookingsButton.name });
    await this.click(myBookingsButton);
  }

  async payBookingFeesFromBookingDetails() {
    const payBookingFeesLink = this.page.getByRole(BookingAndSelectPaymentMethodObjects.payBookingFeesLink.role, { name: BookingAndSelectPaymentMethodObjects.payBookingFeesLink.name });
    await this.click(payBookingFeesLink);

    const payFeesButton = this.page.getByRole(BookingAndSelectPaymentMethodObjects.payFeesButton.role, { name: BookingAndSelectPaymentMethodObjects.payFeesButton.name });
    await this.click(payFeesButton);
  }

  // Company user: profile > حجوزاتي > الشركات > حجوزات الشركة
  async openCompanyBookingsFromProfileMenu() {
    await this.openMyBookingsFromProfileMenu();

    const companiesMenuItem = this.page.getByText(BookingAndSelectPaymentMethodObjects.companiesMenuItem.text, { exact: true }).first();
    await this.click(companiesMenuItem);

    const companyBookingsMenuItem = this.page.getByText(BookingAndSelectPaymentMethodObjects.companyBookingsMenuItem.text, { exact: true }).first();
    await this.click(companyBookingsMenuItem);
  }

  // Reads the unit code from the booking details heading (الحجز لوحدة رقم 01-01-0799-6-102)
  async getBookedUnitCode() {
    const bookedUnitHeading = this.page.getByRole('heading', { name: BookingAndSelectPaymentMethodObjects.bookedUnitHeading }).first();
    await expect(bookedUnitHeading).toBeVisible({ timeout: 90000 });
    const headingText = await bookedUnitHeading.innerText();
    return headingText.replace(BookingAndSelectPaymentMethodObjects.bookedUnitHeading, '').trim();
  }

  async openSignContractFromBookingDetails() {
    const signContractLink = this.page.getByRole(BookingAndSelectPaymentMethodObjects.signContractLink.role, { name: BookingAndSelectPaymentMethodObjects.signContractLink.name });
    await this.click(signContractLink);
  }

  async verifyContractSigned() {
    await expect(this.page.getByText(BookingAndSelectPaymentMethodObjects.contractSignedText.text, { exact: true }).first()).toBeVisible({ timeout: 90000 });
  }

  // اعتماد > OTP > تحقق, the page can show خطأ تقني after تحقق while the contract is signed, so don't wait for a success message
  async signSalesContract(otp = ['1', '2', '3', '4']) {
    const approveContractButton = this.page.getByRole(BookingAndSelectPaymentMethodObjects.approveContractButton.role, { name: BookingAndSelectPaymentMethodObjects.approveContractButton.name });
    await this.click(approveContractButton);

    const otpInputs = this.page.getByPlaceholder(BookingAndSelectPaymentMethodObjects.otpInputPlaceholder);
    await expect(otpInputs.first()).toBeVisible({ timeout: 90000 });
    for (let index = 0; index < otp.length; index++) {
      await otpInputs.nth(index).fill(otp[index]);
    }

    const verifyOtpButton = this.page.locator('button').filter({ hasText: BookingAndSelectPaymentMethodObjects.verifyOtpButton.text });
    await this.click(verifyOtpButton);
    await this.page.waitForTimeout(5000);
  }

  // Wait on the payment callback page until it is fully loaded (the payment is processed), before going back to Sakani
  async waitForPaymentSuccess() {
    await this.page.waitForURL(BookingAndSelectPaymentMethodObjects.paymentSuccessCallbackUrl, { timeout: 120000 });
    await this.page.waitForLoadState('load', { timeout: 120000 });
    await this.page.waitForLoadState('networkidle', { timeout: 60000 }).catch(() => {});
  }

  // After paying the booking fees, اختر طريقة الدفع is displayed only when the booking status is updated
  async isSelectPaymentMethodDisplayed() {
    const selectPaymentMethodLink = this.page.getByRole(BookingAndSelectPaymentMethodObjects.selectPaymentMethodLink.role, { name: BookingAndSelectPaymentMethodObjects.selectPaymentMethodLink.name });
    return await selectPaymentMethodLink
      .waitFor({ state: 'visible', timeout: 30000 })
      .then(() => true)
      .catch(() => false);
  }

  async openSelectPaymentMethod() {
    const selectPaymentMethodLink = this.page.getByRole(BookingAndSelectPaymentMethodObjects.selectPaymentMethodLink.role, { name: BookingAndSelectPaymentMethodObjects.selectPaymentMethodLink.name });
    await this.click(selectPaymentMethodLink);
  }

  // Selects the schedule with the saved name, or the first displayed schedule when the saved name is from another run
  async selectPaymentSchedule(scheduleTitle) {
    const paymentScheduleCards = this.page.locator(BookingAndSelectPaymentMethodObjects.paymentScheduleCard);
    await expect(paymentScheduleCards.first()).toBeVisible({ timeout: 90000 });

    const scheduleByTitle = paymentScheduleCards.filter({ hasText: scheduleTitle });
    const paymentScheduleCard = (await scheduleByTitle.count()) > 0 ? scheduleByTitle : paymentScheduleCards;
    await this.click(paymentScheduleCard.locator('label').first());
  }

  async clickSaveAndContinueButton() {
    const saveAndContinueButton = this.page.getByRole(BookingAndSelectPaymentMethodObjects.saveAndContinueButtonV6.role, { name: BookingAndSelectPaymentMethodObjects.saveAndContinueButtonV6.name });
    await this.click(saveAndContinueButton);
  }

  // The payment schedule table is displayed and has records (more rows than the header row)
  // The booking details show the جدول الدفع section after the payment schedule is selected and the contract is signed
  async verifyPaymentScheduleTableHasRecords() {
    const paymentScheduleHeading = this.page.getByRole(BookingAndSelectPaymentMethodObjects.paymentScheduleHeading.role, { name: BookingAndSelectPaymentMethodObjects.paymentScheduleHeading.name });
    await expect(paymentScheduleHeading.first()).toBeVisible({ timeout: 90000 });
  }

  async verifyBookingFeesInBookingDetails(fees) {
    const bookingDetails = this.page.locator(BookingAndSelectPaymentMethodObjects.bookingDetailsSection);
    await expect(bookingDetails.getByText(BookingAndSelectPaymentMethodObjects.bookingFeesText.text, { exact: true })).toBeVisible({ timeout: 90000 });
    await expect(bookingDetails.getByText(fees, { exact: true })).toBeVisible({ timeout: 30000 });
  }
}
