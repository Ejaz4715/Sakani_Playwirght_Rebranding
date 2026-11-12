// @ts-nocheck
import { expect } from "@playwright/test";
import { mkdir, readdir, unlink, readFile } from "node:fs/promises";
import path from "node:path";
import { PDFParse } from "pdf-parse";
import { BookingCancellationObjects } from "@objects/BookingCancellationObjects";
import { TIMEOUT } from "node:dns";

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
  async fill(locator, value) {
    await expect(locator).toBeVisible({ timeout: 90000 });
    await locator.fill(value);
  }

  async openActiveBookings() {
    const userProfileButton = this.page.locator(
      BookingCancellationObjects.userProfileButton,
    );
    await this.click(userProfileButton);

    const myBookingsLink = this.page.locator(
      BookingCancellationObjects.myBookingsLink,
    );
    await this.click(myBookingsLink);

    const activeBookingsTab = this.page.getByRole(
      BookingCancellationObjects.activeBookingsTab.role,
      { name: BookingCancellationObjects.activeBookingsTab.name },
    );
    await this.click(activeBookingsTab);
  }

  async openCompletedBookings() {
    const userProfileButton = this.page.locator(
      BookingCancellationObjects.userProfileButton,
    );
    await expect(userProfileButton).toBeVisible({ timeout: 90000 });
    await this.click(userProfileButton);

    const myBookingsLink = this.page.locator(
      BookingCancellationObjects.myBookingsLink,
    );
    await expect(myBookingsLink).toBeVisible({ timeout: 90000 });
    await this.click(myBookingsLink);

    const completedBookingsTab = this.page.getByRole(
      BookingCancellationObjects.completedBookingsTab.role,
      { name: BookingCancellationObjects.completedBookingsTab.name },
    );
    await expect(completedBookingsTab).toBeVisible({ timeout: 150000 });
    await this.click(completedBookingsTab);
  }
  async openCancelledAfterReJectSaleContractBookings() {
    const myBookingsButton = this.page.locator(
      BookingCancellationObjects.myBookingsButton.xpath,
    );
    await expect(myBookingsButton).toBeVisible({ timeout: 90000 });
    await this.click(myBookingsButton);

    const cancelledBookingsTab = this.page.getByRole(
      BookingCancellationObjects.cancelledBookingsTab.role,
      { name: BookingCancellationObjects.cancelledBookingsTab.name },
    );
    await expect(cancelledBookingsTab).toBeVisible({ timeout: 150000 });
    await this.click(cancelledBookingsTab);
  }

  async clickProfileIcon() {
    const userProfileButton = this.page.locator(
      BookingCancellationObjects.userProfileButton,
    );
    await this.click(userProfileButton);
  }

  async clickManageProfile() {
    const manageProfile = this.page.locator(
      BookingCancellationObjects.manageProfile,
    );
    await this.click(manageProfile);
  }

  async openBookingDetails() {
    const bookingDetailsButton = this.page
      .locator(BookingCancellationObjects.bookingDetailsButton.xpath)
      .first();
    await this.click(bookingDetailsButton);
  }

  async verifyTheRefundedStatus() {
    const refundedStatus = this.page.locator(
      BookingCancellationObjects.refudedStatus.xpath,
    );
    await expect(refundedStatus).toBeVisible({ timeout: 5000 });
  }

  async getBookedUnitCode() {
    const unitCode = this.page.locator(
      BookingCancellationObjects.unitCode.xpath,
    );
    await unitCode.waitFor({ state: "visible", timeout: 30000 });
    return (await unitCode.textContent())?.trim();
  }

  async cancelBooking() {
    const cancelBookingButton = this.page.locator(
      BookingCancellationObjects.cancelBookingButton.xpath,
    );
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight),
    );
    await this.page.waitForTimeout(2000);
    await this.click(cancelBookingButton);

    const continueButton = this.page.locator(
      BookingCancellationObjects.continueButton.xpath,
    );
    await this.click(continueButton);

    const othersRadioButton = this.page.locator(
      BookingCancellationObjects.othersRadioButton.xpath,
    );
    await this.check(othersRadioButton);

    const othersTextArea = this.page.locator(
      BookingCancellationObjects.othersTextArea.xpath,
    );
    await this.fill(othersTextArea, "سبب إلغاء الحجز");

    const saveAndContinueButton = this.page.locator(
      BookingCancellationObjects.saveAndContinueButton.xpath,
    );
    await this.click(saveAndContinueButton);

    // const confirmCancelButton = this.page.getByRole(BookingCancellationObjects.confirmCancelButton.role, { name: BookingCancellationObjects.confirmCancelButton.name });
    // await this.click(confirmCancelButton);

    // const yesButton = this.page.getByRole(BookingCancellationObjects.yesButton.role, { name: BookingCancellationObjects.yesButton.name });
    // await this.click(yesButton);
  }

  async expectCancellationSuccess() {
    const successHeading = this.page.getByText(
      BookingCancellationObjects.cancellationSuccessHeading.text,
    );
    await expect(
      successHeading,
      "Cancellation success message is not visible",
    ).toBeVisible();
  }

  async clickOnRejectButton() {
    const rejectButton = this.page.locator(
      BookingCancellationObjects.rejectButton.xpath,
    );
    await this.click(rejectButton);
  }
  async fillRejectionReason() {
    const rejectReasonTextArea = this.page.locator(
      BookingCancellationObjects.rejectReasonTextArea.xpath,
    );
    await this.fill(rejectReasonTextArea, "سبب رفض العقد");
  }
  async clickOnConfirmRejectButton() {
    const confirmRejectButton = this.page.locator(
      BookingCancellationObjects.confirmRejectButton.xpath,
    );
    await this.click(confirmRejectButton);
  }
  async expectRejectionSuccess() {
    const rejectionSuccessHeading = this.page.getByText(
      BookingCancellationObjects.rejectionSuccessHeading.text,
    );
    await expect(
      rejectionSuccessHeading,
      "Rejection success message is not visible",
    ).toBeVisible();
  }
  async expectBookingIsCancelled(value: string) {
    const unitCode = this.page.getByText(value, { exact: true });
    await expect(
      unitCode,
      `Booking with unit code "${value}" is not visible`,
    ).toBeVisible();
  }

  async cancelMohLandBooking(otp = ["1", "2", "3", "4"]) {
    await this.page.getByText("إلغاء الحجز").click();
    await this.page
      .locator("//app-dropdown[@formcontrolname='cancel_reason']")
      .click();
    await this.page.getByText("موقع المشروع").click();
    await this.page.getByRole("button", { name: "حفظ ومتابعة" }).click();
    await this.page
      .getByRole("checkbox", {
        name: "أؤكد قراءة وفهم الشروط والأحكام والموافقة عليها",
      })
      .check();
    await this.page.getByRole("button", { name: "الاستمرار" }).click();
    const otpInputs = this.page.getByRole("textbox");
    for (let index = 0; index < otp.length; index++) {
      await otpInputs.nth(index).fill(otp[index]);
    }
    await this.page.getByRole("button", { name: "تحقق", exact: true }).click();
    await this.page
      .getByRole("heading", { name: "تم إلغاء الحجز بنجاح!" })
      .click();
  }

  //click on view of price quotation
  async clickOnViewOfProcequotationButton() {
    const viewPriceQuotationButton = this.page.locator(
      BookingCancellationObjects.viewPriceQuotationButton.xpath,
    );

    await expect(viewPriceQuotationButton).toBeVisible({ timeout: 90000 });
    await viewPriceQuotationButton.click();
  }

  async verifyPriceQuotationContainsRequiredSections(pdfPath: string) {
    const parser = new PDFParse({ data: await readFile(pdfPath) });
    try {
      const { text } = await parser.getText();
      const normalizeText = (value: string): string =>
        value
          .replace(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/g, "")
          .replace(/[أإآؤئ]/g, "ا")
          .replace(/\s+/g, " ");
      const normalizedText = normalizeText(text);
      const requiredSections = [
        "معلومات قيمة الوحدة",
        "معلومات المطور العقاري",
        "معلومات الإقرار",
      ];

      for (const section of requiredSections) {
        const normalizedSection = normalizeText(section);
        const reversedSection = [...normalizedSection].reverse().join("");
        expect(
          normalizedText.includes(normalizedSection) ||
            normalizedText.includes(reversedSection),
          `Price quotation PDF is missing the "${section}" section`,
        ).toBe(true);
      }
    } finally {
      await parser.destroy();
    }
  }

  async verifyCompletionPercentageProgressIsVisible(shouldBeVisible: boolean) {
    const completionPercentageProgress = this.page.locator(
      BookingCancellationObjects.compeltiopnPercentageProgress.xpath,
    );
    if (shouldBeVisible) {
      await expect(completionPercentageProgress).toBeVisible();
    } else {
      await expect(completionPercentageProgress).toBeHidden();
    }
  }
  async verifyTheAvialabilityOfTheBanks(shouldBeVisible: boolean) {
    const noBanksAvailableMessage = this.page.locator(
      BookingCancellationObjects.noBanksAvailableMessage.xpath,
    );
    if (shouldBeVisible) {
      await expect(noBanksAvailableMessage).toBeVisible();
    } else {
      await expect(noBanksAvailableMessage).toBeHidden();
    }
  }

  async verifyElementVisibility(
    elementObject: { readonly xpath: string },
    shouldBeVisible: boolean,
  ) {
    const element = this.page.locator(elementObject.xpath);
    if (shouldBeVisible) {
      await expect(element).toBeVisible();
    } else {
      await expect(element).toBeHidden();
    }
  }

  async clickBrochureButton() {
    const brochureButton = this.page.locator(
      BookingCancellationObjects.brochureButton.xpath,
    );
    await this.click(brochureButton);
  }

  async clickCloseBrochureButton() {
    const closebrochureButton = this.page.locator(
      BookingCancellationObjects.closebrochureButton.xpath,
    );
    await this.click(closebrochureButton);
  }

  async clickMasterplanButton() {
    const masterplanButton = this.page.locator(
      BookingCancellationObjects.masterplanButton.xpath,
    );
    await this.click(masterplanButton);
  }
  async clickCloseMasterplanButton() {
    const closemasterplanButton = this.page.locator(
      BookingCancellationObjects.closemasterplanButton.xpath,
    );
    await this.click(closemasterplanButton);
  }
  async clickOnDeveloperNameSection() {
    const developerNameSection = this.page.locator(
      BookingCancellationObjects.developerNameSection.xpath,
    );
    await this.click(developerNameSection);
  }

  async clickOnViewDetailsButton() {
    const viewDetailsButton = this.page.locator(
      BookingCancellationObjects.viewDetailsButton.xpath,
    );
    await this.click(viewDetailsButton);
  }

  async selectPropertyType() {
    const propertyTypeDropdown = this.page.locator(
      BookingCancellationObjects.propertyTypeDropdownButton.xpath,
    );
    await this.click(propertyTypeDropdown);

    const propertyTypeOption = this.page.getByRole(
      BookingCancellationObjects.propertyTypeOption.role,
      { name: BookingCancellationObjects.propertyTypeOption.name },
    );
    await this.click(propertyTypeOption);
  }

  async selectConstructionStatus() {
    const constructionStatusDropdown = this.page.locator(
      BookingCancellationObjects.constructionStatusDropdownButton.xpath,
    );

    await this.click(constructionStatusDropdown);

    const constructionStatusOption = this.page.getByRole(
      BookingCancellationObjects.constructionStatusOption.role,
      { name: BookingCancellationObjects.constructionStatusOption.name },
    );
    await this.click(constructionStatusOption);
  }

  async clickUnitResultCard() {
    const unitResultCard = this.page.locator(
      BookingCancellationObjects.unitResultCard.xpath,
    );
    await expect(unitResultCard).toBeVisible({ timeout: 120000 });
    await unitResultCard.click();
  }

  async clickOnSaveButton() {
    const saveButton = this.page.getByRole(
      BookingCancellationObjects.saveButton.role,
      { name: BookingCancellationObjects.saveButton.name },
    );
    await this.click(saveButton);
  }

  async clickOnRegisterOfInterest() {
    const registerOfInterest = this.page.getByRole(
      BookingCancellationObjects.registerOfInterest.role,
      { name: BookingCancellationObjects.registerOfInterest.name },
    );
    await this.click(registerOfInterest);
  }
  //ready made rebranding
  async checkOnTermsAndConditions() {
    const termsAndConditionsCheckbox = this.page.locator(
      BookingCancellationObjects.termsAndConditionsCheckbox.xpath,
    );
    await expect(termsAndConditionsCheckbox).toBeVisible({ timeout: 120000 });
    await termsAndConditionsCheckbox.click();
  }
  async clickOnConfirmBookingButton() {
    const confirmBookingButton = this.page.locator(
      BookingCancellationObjects.confirmBookingButton.xpath,
    );
    await expect(confirmBookingButton).toBeVisible({ timeout: 120000 });
    await confirmBookingButton.click();
  }
  async verifyConfirmBookingSuccessMessageIsPresent() {
    const confirmBookingSuccessMessage = this.page.getByText(
      BookingCancellationObjects.confirmBookingSuccessMessage.text,
    );
    await expect(confirmBookingSuccessMessage).toBeVisible({ timeout: 120000 });
  }
}
