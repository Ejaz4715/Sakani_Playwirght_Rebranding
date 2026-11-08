import { expect, Locator, Page } from "@playwright/test";
import { DeveloperObjects } from "@objects/DeveloperObjects";
import { CommonMethods } from "@pages/utils/CommonMethods";
import { PaymentflexiblePhaseThreeObjects } from "@objects/PaymentflexiblePhaseThree";

const DEFAULT_TIMEOUT = 90_000;
export class PaymentflexiblePhaseThree {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async click(locator: Locator) {
    await expect(locator).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await locator.click();
  }

  async openPreBetaAndLoginIfLoggedOut(url: string, nationalId: string) {
    await this.page.goto(url);
    await this.page.reload();
    const loginButton = this.page
      .locator(DeveloperObjects.loginButton.xpath)
      .first();
    const profileButton = this.page
      .getByRole(PaymentflexiblePhaseThreeObjects.profileButton.role, {
        name: PaymentflexiblePhaseThreeObjects.profileButton.name,
      })
      .first();
    await expect(loginButton.or(profileButton).first()).toBeVisible({
      timeout: 60000,
    });
    if (await loginButton.isVisible()) {
      await new CommonMethods(this.page).unifiedSakaniLogin(nationalId);
    }
  }

  async openMyBookingsFromProfileMenu() {
    const profileButton = this.page
      .getByRole(PaymentflexiblePhaseThreeObjects.profileButton.role, {
        name: PaymentflexiblePhaseThreeObjects.profileButton.name,
      })
      .first();
    const myBookingsButton = this.page.getByRole(
      PaymentflexiblePhaseThreeObjects.myBookingsButton.role,
      { name: PaymentflexiblePhaseThreeObjects.myBookingsButton.name },
    );
    await this.page.waitForLoadState("load");

    await expect(async () => {
      if (!(await myBookingsButton.isVisible())) {
        await this.click(profileButton);
      }
      await myBookingsButton.click({ timeout: 10000 });
      await this.page.waitForURL(
        PaymentflexiblePhaseThreeObjects.myBookingsUrl,
        { timeout: 15000 },
      );
    }).toPass({ timeout: 120000 });
  }

  async openCompanyBookingsFromProfileMenu() {
    await this.openMyBookingsFromProfileMenu();

    const companiesMenuItem = this.page
      .getByText(PaymentflexiblePhaseThreeObjects.companiesMenuItem.text, {
        exact: true,
      })
      .first();
    const companyBookingsMenuItem = this.page
      .getByText(
        PaymentflexiblePhaseThreeObjects.companyBookingsMenuItem.text,
        { exact: true },
      )
      .first();
    await this.page
      .waitForLoadState("networkidle", { timeout: 60000 })
      .catch(() => {});

    await expect(async () => {
      if (!(await companyBookingsMenuItem.isVisible())) {
        await companiesMenuItem.click({ timeout: 10000 });
      }
      await companyBookingsMenuItem.click({ timeout: 10000 });
      await this.page.waitForURL(
        PaymentflexiblePhaseThreeObjects.companyBookingsUrl,
        { timeout: 15000 },
      );
    }).toPass({ timeout: 120000 });
    await this.page
      .waitForLoadState("networkidle", { timeout: 60000 })
      .catch(() => {});
  }

  async getUnitCodeFromBookingDetails() {
    const bookedUnitHeading = this.page
      .getByRole("heading", {
        name: PaymentflexiblePhaseThreeObjects.bookedUnitHeading,
      })
      .first();
    await expect(bookedUnitHeading).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    const headingText = await bookedUnitHeading.innerText();
    return headingText
      .replace(PaymentflexiblePhaseThreeObjects.bookedUnitHeading, "")
      .trim();
  }

  async payBookingFeesFromBookingDetails() {
    const payBookingFeesLink = this.page.getByRole(
      PaymentflexiblePhaseThreeObjects.payBookingFeesLink.role,
      { name: PaymentflexiblePhaseThreeObjects.payBookingFeesLink.name },
    );
    await this.click(payBookingFeesLink);

    const payFeesButton = this.page.getByRole(
      PaymentflexiblePhaseThreeObjects.payFeesButton.role,
      { name: PaymentflexiblePhaseThreeObjects.payFeesButton.name },
    );
    await this.click(payFeesButton);
  }

  async waitForPaymentSuccess() {
    await this.page.waitForURL(
      PaymentflexiblePhaseThreeObjects.paymentSuccessCallbackUrl,
      { timeout: 120000 },
    );
    await this.page.waitForLoadState("load", { timeout: 120000 });
    await this.page
      .waitForLoadState("networkidle", { timeout: 60000 })
      .catch(() => {});
  }

  async openSelectPaymentMethod() {
    const selectPaymentMethodLink = this.page.getByRole(
      PaymentflexiblePhaseThreeObjects.selectPaymentMethodLink.role,
      { name: PaymentflexiblePhaseThreeObjects.selectPaymentMethodLink.name },
    );
    for (let attempt = 1; attempt <= 10; attempt++) {
      const isDisplayed = await selectPaymentMethodLink
        .waitFor({ state: "visible", timeout: 30000 })
        .then(() => true)
        .catch(() => false);
      if (isDisplayed) {
        break;
      }
      await this.page.reload();
    }
    await this.click(selectPaymentMethodLink);
  }

  async selectPaymentSchedule(scheduleTitle: string) {
    const paymentScheduleCards = this.page.locator(
      PaymentflexiblePhaseThreeObjects.paymentScheduleCard,
    );
    await expect(paymentScheduleCards.first()).toBeVisible({
      timeout: DEFAULT_TIMEOUT,
    });

    const scheduleByTitle = paymentScheduleCards.filter({
      hasText: scheduleTitle,
    });
    const paymentScheduleCard =
      (await scheduleByTitle.count()) > 0
        ? scheduleByTitle
        : paymentScheduleCards;
    await this.click(paymentScheduleCard.locator("label").first());
  }

  async clickSaveAndContinueButton() {
    const saveAndContinueButton = this.page.getByRole(
      PaymentflexiblePhaseThreeObjects.saveAndContinueButton.role,
      { name: PaymentflexiblePhaseThreeObjects.saveAndContinueButton.name },
    );
    await this.click(saveAndContinueButton);
  }

  async openSignContractFromBookingDetails() {
    const signContractLink = this.page.getByRole(
      PaymentflexiblePhaseThreeObjects.signContractLink.role,
      { name: PaymentflexiblePhaseThreeObjects.signContractLink.name },
    );
    await this.click(signContractLink);
  }

  async verifyContractSigned() {
    await expect(
      this.page
        .getByText(PaymentflexiblePhaseThreeObjects.contractSignedText.text, {
          exact: true,
        })
        .first(),
    ).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  }

  async verifyPaymentScheduleDisplayed() {
    const paymentScheduleHeading = this.page.getByRole(
      PaymentflexiblePhaseThreeObjects.paymentScheduleHeading.role,
      { name: PaymentflexiblePhaseThreeObjects.paymentScheduleHeading.name },
    );
    await expect(paymentScheduleHeading.first()).toBeVisible({
      timeout: DEFAULT_TIMEOUT,
    });
  }
}
