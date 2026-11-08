import { UnitBookingObjects } from "@objects/UnitBookingObjects";
import { expect, Page } from "@playwright/test";

export class UnitBookingPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async click(locator: any) {
    await locator.click();
  }

  async check(locator: any) {
    await locator.check();
  }

  async acceptTermsAndConfirm() {
    const termsCheckbox = this.page.locator(UnitBookingObjects.termsCheckbox);
    await this.click(termsCheckbox);

    const confirmButton = this.page.getByRole(
      UnitBookingObjects.confirmButton.role,
      { name: UnitBookingObjects.confirmButton.name },
    );
    const acceptAndContinue = this.page.locator(
      UnitBookingObjects.acceptAndContinue,
    );

    const isConfirmVisible = await confirmButton
      .isVisible({ timeout: 3000 })
      .catch(() => false);
    const isConfirmEnabled = isConfirmVisible
      ? await confirmButton.isEnabled().catch(() => false)
      : false;
    if (isConfirmVisible && isConfirmEnabled) {
      await confirmButton.click();
    }

    const isAcceptVisible = await acceptAndContinue
      .isVisible({ timeout: 3000 })
      .catch(() => false);
    const isAcceptEnabled = isAcceptVisible
      ? await acceptAndContinue.isEnabled().catch(() => false)
      : false;
    if (isAcceptVisible && isAcceptEnabled) {
      await acceptAndContinue.click();
    }

    const payBookingFeeButton = this.page.locator(
      UnitBookingObjects.payBookingFeeButton,
    );
    await this.click(payBookingFeeButton);
  }

  async acceptAuctionTerms() {
    await this.page
      .getByRole("checkbox", {
        name: "أؤكد قراءتي وفهمي وموافقتي على الشروط والأحكام",
      })
      .check();
  }

  async signMohLandBookingContract(otp = ["1", "2", "3", "4"]) {
    await this.page
      .getByRole("checkbox", {
        name: "لقد قرأت وفهمت الشروط والأحكام الخاصة بالعقد *",
      })
      .check();
    await this.page.getByRole("button", { name: "قبول وتوقيع" }).click();
    const otpInputs = this.page.getByRole("textbox", { name: "-" });
    for (let index = 0; index < otp.length; index++) {
      await otpInputs.nth(index).fill(otp[index]);
    }
    await this.page.getByRole("button", { name: "تحقق" }).click();
    await this.page.getByRole("button", { name: "إغلاق" }).click();
  }

  async signSalesContract(otp = ["1", "2", "3", "4"]) {
    const approveButton = this.page.getByRole("button", {
      name: "اعتماد",
      exact: true,
    });
    await expect(approveButton).toBeVisible({ timeout: 90000 });
    await expect(approveButton).toBeEnabled({ timeout: 90000 });
    await approveButton.scrollIntoViewIfNeeded();
    await approveButton.click();

    const otpInputs = this.page.locator('input[inputmode="numeric"]');
    await expect(otpInputs.first()).toBeVisible({ timeout: 30000 });
    for (let index = 0; index < otp.length; index++) {
      await otpInputs.nth(index).fill(otp[index]);
    }
    await this.page.getByRole("button", { name: "تحقق", exact: true }).click();
    await this.page.waitForTimeout(7000);
    await this.page.getByRole("button", { name: "إغلاق" }).click();
  }

  async clickOnApproveButton() {
    const approveButton = this.page.locator(
      UnitBookingObjects.approveButton.xpath,
    );
    await expect(approveButton).toBeVisible({ timeout: 90000 });
    await approveButton.click();
  }

  async enterOtp(otp = ["1", "2", "3", "4"]) {
    const otpCode = this.page.locator(UnitBookingObjects.otpCode.xpath);
    for (let index = 0; index < otp.length; index++) {
      await otpCode.nth(index).fill(otp[index]);
    }
  }

  async clickOnVerifyButton() {
    const verifyButton = this.page.locator(
      UnitBookingObjects.verifyButton.xpath,
    );
    await expect(verifyButton).toBeVisible({ timeout: 90000 });
    await verifyButton.click();
  }

  async clickOnDoneButton() {
    const doneButton = this.page.locator(UnitBookingObjects.doneButton.xpath);
    await expect(doneButton).toBeVisible({ timeout: 90000 });
    await doneButton.click();
  }

  async expectSalesContractSuccess() {
    const { expect } = require("@playwright/test");
    await expect(
      this.page.getByRole("heading", { name: "تهانينا" }),
    ).toBeVisible();
  }
}
