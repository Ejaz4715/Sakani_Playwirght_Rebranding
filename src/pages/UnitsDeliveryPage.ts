import { expect, Locator, Page } from "@playwright/test";
import { UnitsDeliveryObjects } from "@objects/UnitsDeliveryObjects";
import { CommonMethods } from "@pages/utils/CommonMethods";

let DEFAULT_TIMEOUT = 30_000;

export class UnitsDeliveryPage {
  page: Page;

  readonly commonMethod: CommonMethods;

  constructor(page: Page) {
    this.page = page;
    this.commonMethod = new CommonMethods(page);
  }
  //it will check the aria-selected is true
  async isElementSelected(
    element: Locator,
    expectedSelected: boolean,
  ): Promise<boolean> {
    return (
      (await element.getAttribute("aria-selected")) === String(expectedSelected)
    );
  }

  async clickOnUnitsDelivery() {
    await this.page
      .locator(UnitsDeliveryObjects.unitDeliveryLink.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.unitDeliveryLink.xpath)
      .click();
  }

  async clickOnStartForPreparingUnitDelivery() {
    await this.page
      .locator(UnitsDeliveryObjects.startForPreparingUnitsForDelivery.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.startForPreparingUnitsForDelivery.xpath)
      .click();
  }

  async clickOnStartForReadyUnitDelivery() {
    await this.page
      .locator(UnitsDeliveryObjects.startForReadyUnitsForDelivery.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.startForReadyUnitsForDelivery.xpath)
      .click();
  }

  async selectSearchingUsingProjectName() {
    await this.page
      .locator(UnitsDeliveryObjects.searchDropdownMenu.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.searchDropdownMenu.xpath)
      .click();

    await this.page
      .locator(UnitsDeliveryObjects.projectNameSelectorForSearch.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.projectNameSelectorForSearch.xpath)
      .click();
  }

  async selectSearchingUsingUnitCode() {
    await this.page
      .locator(UnitsDeliveryObjects.searchDropdownMenu.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.searchDropdownMenu.xpath)
      .click();

    await this.page
      .locator(UnitsDeliveryObjects.unitCodeSelectorForSearch.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.unitCodeSelectorForSearch.xpath)
      .click();
    await this.page.waitForTimeout(3000);
  }

  async fillProjectName(projectName: string) {
    await this.page
      .locator(UnitsDeliveryObjects.projectNameTextField.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.projectNameTextField.xpath)
      .fill(projectName);

    await this.page.waitForTimeout(3000);
    await this.page
      .locator(UnitsDeliveryObjects.projectNameDropdownOption.xpath)
      .click();
    await this.page.waitForTimeout(3000);
  }

  async fillUnitCode(unitCode: string) {
    await this.page
      .locator(UnitsDeliveryObjects.unitCodeTextField.css)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.unitCodeTextField.css)
      .fill(unitCode);
    await this.page.waitForTimeout(3000);
  }

  async clickOnSearch() {
    await this.page.locator(UnitsDeliveryObjects.searchButton.xpath).waitFor({
      state: "visible",
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects.searchButton.xpath).click();
  }

  async clickOnSelectProject() {
    await this.page
      .locator(UnitsDeliveryObjects.selectProjectButton.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.selectProjectButton.xpath)
      .click();
  }

  async clickOnSelectUnit() {
    await this.page
      .locator(UnitsDeliveryObjects.selectUnitButton.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.selectUnitButton.xpath)
      .click();
  }

  async clickOnReadyForDelivery() {
    await this.page
      .locator(UnitsDeliveryObjects.readyForDeliveryCheckbox.css)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page.waitForTimeout(3000);
    await this.page
      .locator(UnitsDeliveryObjects.readyForDeliveryCheckbox.css)
      .click();
  }

  async selectDeliveryDate() {
    await this.page.locator(UnitsDeliveryObjects.calendarIcon.css).waitFor({
      state: "visible",
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects.calendarIcon.css).click();

    await this.page.waitForTimeout(3000);
    await this.page
      .locator(UnitsDeliveryObjects.visibleAllowedDataLocator.css)
      .first()
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });

    await this.page
      .locator(UnitsDeliveryObjects.visibleAllowedDataLocator.css)
      .first()
      .click();
  }

  async selectDeliveryTime() {
    await this.page
      .locator(UnitsDeliveryObjects.timeDropdownMenu.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.timeDropdownMenu.xpath)
      .click();

    await this.page
      .locator(UnitsDeliveryObjects.firstAvailableDeliveryTime.css)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });

    await this.page
      .locator(UnitsDeliveryObjects.firstAvailableDeliveryTime.css)
      .click();
  }

  async clickOnSend() {
    await this.page.locator(UnitsDeliveryObjects.sendButton.xpath).waitFor({
      state: "visible",
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects.sendButton.xpath).click();
  }

  async isUnitReadyForDelivery() {
    await this.page
      .locator(UnitsDeliveryObjects.deliveryReadinessSuccessfulMessage.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    return await this.page
      .locator(UnitsDeliveryObjects.deliveryReadinessSuccessfulMessage.xpath)
      .isVisible();
  }

  async sendToCustomerForDelivery() {
    await this.page.locator(UnitsDeliveryObjects.unitCheckBox.css).waitFor({
      state: "visible",
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects.unitCheckBox.css).click();
    await this.page
      .locator(UnitsDeliveryObjects.sendAllMarkedUnitsButton.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.sendAllMarkedUnitsButton.xpath)
      .click();
    await this.page
      .locator(UnitsDeliveryObjects.agreePopUpButton.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.agreePopUpButton.xpath)
      .click();
  }
  async isUnitDelivered() {
    await this.page
      .locator(UnitsDeliveryObjects.deliverySuccessMessage.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    return await this.page
      .locator(UnitsDeliveryObjects.deliverySuccessMessage.xpath)
      .isVisible();
  }
  async clickOnUnitDeliveryFromSakani() {
    await this.page
      .locator(UnitsDeliveryObjects.unitDeliveryLinkFromSakani.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.unitDeliveryLinkFromSakani.xpath)
      .click();
  }
  async clickUnitDeliveryConfirmationFromSakani() {
    await this.page
      .locator(UnitsDeliveryObjects.unitDeliveryConfirmationFromSakani.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.unitDeliveryConfirmationFromSakani.xpath)
      .click();
  }
  async clickOnPendingUnitsForDelivery() {
    await this.page.waitForTimeout(6000);
    await this.page
      .locator(UnitsDeliveryObjects.pendingUnitDelivery.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.pendingUnitDelivery.xpath)
      .click();
  }
  async clickOnShowDeliveryUnitModel(unitCode: string) {
    await this.page.waitForTimeout(8000);
    const showDeliveryUnitModelButton = this.page.locator(
      UnitsDeliveryObjects.showDeliveryUnitModelButton.xpath(unitCode),
    );
    await showDeliveryUnitModelButton.waitFor({
      state: "visible",
      timeout: DEFAULT_TIMEOUT,
    });
    await showDeliveryUnitModelButton.click();
  }
  async selectYesOnUnitDeliveryState() {
    await this.page.locator(UnitsDeliveryObjects.yesRadioButton.xpath).waitFor({
      state: "visible",
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects.yesRadioButton.xpath).click();
  }
  async clickOnContinueButton() {
    await this.page.locator(UnitsDeliveryObjects.continueButton.xpath).waitFor({
      state: "visible",
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects.continueButton.xpath).click();
  }

  async selectNoOnUnitDeliveryState() {
    await this.page.locator(UnitsDeliveryObjects.noRadioButton.xpath).waitFor({
      state: "visible",
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects.noRadioButton.xpath).click();
  }
  async fillGeneralCommentsForRejection(comment: string) {
    await this.page
      .locator(UnitsDeliveryObjects.generalCommentsForRejectionTextarea.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.generalCommentsForRejectionTextarea.xpath)
      .fill(comment);
  }

  // Positive or negative offsets adjust the current date before it is converted to Hijri.
  async fillFinalUnitRedeliveryDate(offsetDays: number, offsetMonths = 0) {
    if (!Number.isInteger(offsetDays) || !Number.isInteger(offsetMonths)) {
      throw new Error(
        `Date offsets must be integers. Received days: ${offsetDays}, months: ${offsetMonths}`,
      );
    }

    const todayInRiyadh = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Riyadh",
      calendar: "gregory",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());
    const dateParts = Object.fromEntries(
      todayInRiyadh.map(({ type, value }) => [type, value]),
    );
    const year = Number(dateParts.year);
    const month = Number(dateParts.month);
    const day = Number(dateParts.day);
    const targetMonth = new Date(
      Date.UTC(year, month - 1 + offsetMonths, 1, 12),
    );
    const lastDayOfTargetMonth = new Date(
      Date.UTC(
        targetMonth.getUTCFullYear(),
        targetMonth.getUTCMonth() + 1,
        0,
        12,
      ),
    ).getUTCDate();
    const targetGregorianDate = new Date(
      Date.UTC(
        targetMonth.getUTCFullYear(),
        targetMonth.getUTCMonth(),
        Math.min(day, lastDayOfTargetMonth) + offsetDays,
        12,
      ),
    );
    const hijriParts = new Intl.DateTimeFormat(
      "en-US-u-ca-islamic-umalqura-nu-latn",
      {
        timeZone: "Asia/Riyadh",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      },
    ).formatToParts(targetGregorianDate);
    const hijriDateParts = Object.fromEntries(
      hijriParts.map(({ type, value }) => [type, value]),
    );
    const hijriDate = `${hijriDateParts.day}${hijriDateParts.month}${hijriDateParts.year}`;

    const dateInput = this.page.locator(
      UnitsDeliveryObjects.finalUnitRedeliveryDate.xpath,
    );
    await dateInput.waitFor({
      state: "visible",
      timeout: DEFAULT_TIMEOUT,
    });
    await dateInput.fill(hijriDate);
    await this.commonMethod.press(
      UnitsDeliveryObjects.finalUnitRedeliveryDate,
      "Enter",
    );
  }
  async verifyDateErrorMessageIsPresent() {
    const errorMessageLocator = this.page.locator(
      UnitsDeliveryObjects.dateErrorMessage.xpath,
    );
    await errorMessageLocator.waitFor({
      state: "visible",
      timeout: DEFAULT_TIMEOUT,
    });
    return await this.page
      .locator(UnitsDeliveryObjects.dateErrorMessage.xpath)
      .isVisible();
  }
  async agreeOnUnitDelivery() {
    await this.page
      .locator(UnitsDeliveryObjects.agreeOnDeliveryUnit.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.agreeOnDeliveryUnit.xpath)
      .click();
  }
  async rejectOnUnitDelivery() {
    await this.page
      .locator(UnitsDeliveryObjects.rejectOnDeliveryUnit.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.rejectOnDeliveryUnit.xpath)
      .click();
  }
  async verifyUnitRejectionMessage() {
    await this.page
      .locator(UnitsDeliveryObjects.rejectionSuccessfulMessage.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    return await this.page
      .locator(UnitsDeliveryObjects.rejectionSuccessfulMessage.xpath)
      .isVisible();
  }
  async agreeOnTermsAndConditions() {
    await this.page.waitForTimeout(3000);
    await this.page
      .locator(UnitsDeliveryObjects.termsAndConditionsCheckbox.css)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.termsAndConditionsCheckbox.css)
      .click();
  }
  async typeVerifyOtpCode() {
    await this.page.waitForTimeout(5000);
    const otpInputs = this.page.locator(UnitsDeliveryObjects.verifyField.xpath);
    const inputsArray = await otpInputs.all();
    const otpCode = "1234";

    for (let i = 0; i < inputsArray.length; i++) {
      const character = otpCode[i];
      await inputsArray[i].fill(character);
    }
    await this.page.waitForTimeout(5000);
  }
  async clickOnVerify() {
    await this.page.locator(UnitsDeliveryObjects.verifyButton.xpath).waitFor({
      state: "visible",
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects.verifyButton.xpath).click();
  }
  async isUnitDeliveredAndAcceptedFromSakani() {
    await this.page
      .locator(UnitsDeliveryObjects.unitDeliverySuccessMessage.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    return await this.page
      .locator(UnitsDeliveryObjects.unitDeliverySuccessMessage.xpath)
      .isVisible();
  }
  async clickOnAcceptedStatusUnitDelivery() {
    await this.page.waitForTimeout(6000);
    await this.page
      .locator(UnitsDeliveryObjects.acceptedStatusUnitDelivery.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.acceptedStatusUnitDelivery.xpath)
      .click();
  }
  async clickOnAcceptedByDeveloperStatusUnitDelivery() {
    await this.page
      .locator(UnitsDeliveryObjects.acceptedByDeveloperStatusUnitDelivery.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.acceptedByDeveloperStatusUnitDelivery.xpath)
      .click();
  }
  async clickOnRejectedStatusUnitDelivery() {
    await this.page
      .locator(UnitsDeliveryObjects.rejectedStatusUnitDelivery.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.rejectedStatusUnitDelivery.xpath)
      .click();
  }
  async verifyUnitDeliveryStatusAreSelected() {
    const statusXpaths = [
      UnitsDeliveryObjects.pendingUnitDelivery.xpath,
      UnitsDeliveryObjects.acceptedStatusUnitDelivery.xpath,
      UnitsDeliveryObjects.acceptedByDeveloperStatusUnitDelivery.xpath,
      UnitsDeliveryObjects.rejectedStatusUnitDelivery.xpath,
    ];

    for (const statusXPath of statusXpaths) {
      const statusTab = this.page.locator(statusXPath).locator("xpath=..");
      await statusTab.waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
      await statusTab.click();
      await expect
        .poll(() => this.isElementSelected(statusTab, true), {
          timeout: DEFAULT_TIMEOUT,
        })
        .toBe(true);
    }
  }
  async clickOnRedeliveryButton() {
    await this.page
      .locator(UnitsDeliveryObjects.redeliveryButton.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.redeliveryButton.xpath)
      .click();
  }
  async clickOnViewDetailsButton() {
    await this.page
      .locator(UnitsDeliveryObjects.viewDetailsButton.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    await this.page
      .locator(UnitsDeliveryObjects.viewDetailsButton.xpath)
      .click();
  }
  async clickOnConfirmButton() {
    await this.page.locator(UnitsDeliveryObjects.confirmButton.xpath).waitFor({
      state: "visible",
      timeout: DEFAULT_TIMEOUT,
    });
    await this.page.locator(UnitsDeliveryObjects.confirmButton.xpath).click();
  }
  async verifyUnitRedeliverySuccessMessage() {
    await this.page
      .locator(UnitsDeliveryObjects.successfulRedeliveryMessage.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    return await this.page
      .locator(UnitsDeliveryObjects.successfulRedeliveryMessage.xpath)
      .isVisible();
  }
  async verifyCommentsHistorySectionIsPresent() {
    await this.page
      .locator(UnitsDeliveryObjects.commentsHistorySection.xpath)
      .waitFor({
        state: "visible",
        timeout: DEFAULT_TIMEOUT,
      });
    return await this.page
      .locator(UnitsDeliveryObjects.commentsHistorySection.xpath)
      .isVisible();
  }
}
