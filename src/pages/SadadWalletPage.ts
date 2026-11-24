import { expect, Page } from '@playwright/test';
import { SadadWalletObjects } from '@objects/SadadWalletObjects';
import { BookingCancellationObjects } from '@objects/BookingCancellationObjects';

const DEFAULT_TIMEOUT = 30_000;
// The external checkout page (checkout.housingapps.sa) can take up to two minutes to render, as in PaymentGatewayPage
const CHECKOUT_TIMEOUT = 120_000;

// SAK-1575 Sadad wallet usage: checkout, my bookings, wallet and partners portal (developer) steps, verified on preBeta.
export class SadadWalletPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async getSadadPaymentOptionTitle() {
    return (await this.page.locator(SadadWalletObjects.sadadPaymentOption.xpath).getAttribute('title'))?.trim();
  }

  async isSadadPaymentOptionVisible() {
    const sadadPaymentOption = this.page.locator(SadadWalletObjects.sadadPaymentOption.xpath);
    await sadadPaymentOption.waitFor({ state: 'visible', timeout: CHECKOUT_TIMEOUT });
    return await sadadPaymentOption.isVisible();
  }

  async selectSadadPaymentMethod() {
    const sadadPaymentOption = this.page.locator(SadadWalletObjects.sadadPaymentOption.xpath);
    await expect(sadadPaymentOption).toBeVisible({ timeout: CHECKOUT_TIMEOUT });
    await sadadPaymentOption.click();
    await expect(this.page.locator(SadadWalletObjects.sadadInfoPanel.xpath)).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  }

  async getBillerNumber() {
    const billerNumberValue = this.page.locator(SadadWalletObjects.billerNumberValue.xpath);
    await expect(billerNumberValue).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    return (await billerNumberValue.innerText()).trim();
  }

  async isInvoiceNumberVisible() {
    const invoiceNumberValue = this.page.locator(SadadWalletObjects.invoiceNumberValue.xpath);
    await invoiceNumberValue.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await invoiceNumberValue.isVisible();
  }

  async getInvoiceNumber() {
    const invoiceNumberValue = this.page.locator(SadadWalletObjects.invoiceNumberValue.xpath);
    await expect(invoiceNumberValue).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    return (await invoiceNumberValue.innerText()).trim();
  }

  /** Flexible schedule progress on the booking details, e.g. "0 مسددة / 3 المدفوعات". */
  async getPaymentScheduleProgress() {
    const progress = this.page.getByText(SadadWalletObjects.paymentScheduleProgressPattern).first();
    await expect(progress).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    return (await progress.innerText()).trim();
  }

  /** Unit code from the user's booking details heading, e.g. "01-01-0862-9-105". */
  async getBookingUnitCode() {
    const heading = this.page.locator(SadadWalletObjects.bookingDetailsHeading.xpath);
    await expect(heading).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    const unitCode = (await heading.innerText()).match(/\d[\d-]*\d/)?.[0];
    if (!unitCode) throw new Error(`Unit code not found in booking heading: ${await heading.innerText()}`);
    return unitCode;
  }

  /** Opens the details of the user's booking for the given unit code in the current my-bookings tab. */
  async openUserBookingDetails(unitCode: string) {
    const detailsButton = this.page.locator(SadadWalletObjects.userBookingDetailsButtonFor(unitCode)).first();
    await expect(detailsButton).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await detailsButton.click();
    await expect(this.page.locator(SadadWalletObjects.bookingDetailsHeading.xpath)).toContainText(unitCode, { timeout: DEFAULT_TIMEOUT });
  }

  /**
   * Partners portal: after searching by unit code, opens the listed booking with the given booking number.
   * A unit can have several bookings (earlier cancelled ones), and every row's text starts with its "إظهار التفاصيل"
   * link and ends with the booking number, so the link is picked by the row's position.
   */
  async openDeveloperBooking(unitCode: string, bookingNumber: string) {
    const detailsLinks = this.page.locator(SadadWalletObjects.developerBookingDetailsLink.xpath);
    let rowIndex = -1;
    await expect(async () => {
      await expect(this.page.getByText(unitCode, { exact: true }).first()).toBeVisible();
      const listText = (await this.page.locator('body').innerText()).replace(/\s+/g, ' ');
      const rows = listText.split('إظهار التفاصيل').slice(1);
      expect(rows.length).toBe(await detailsLinks.count());
      rowIndex = rows.findIndex((row) => row.includes(unitCode) && new RegExp(`\\b${bookingNumber}\\b`).test(row));
      expect(rowIndex, `booking ${bookingNumber} is listed`).toBeGreaterThanOrEqual(0);
    }).toPass({ timeout: 60_000 });
    await detailsLinks.nth(rowIndex).click();
  }

  /** Opens the user's booking details by booking number (the booking can move between my-bookings tabs). */
  async openUserBookingByNumber(userPortalUrl: string, bookingNumber: string, unitCode: string) {
    await expect(async () => {
      await this.page.goto(new URL(SadadWalletObjects.bookingDetailsPath(bookingNumber), userPortalUrl).toString());
      await expect(this.page.locator(SadadWalletObjects.bookingDetailsHeading.xpath)).toContainText(unitCode, { timeout: 20_000 });
    }).toPass({ timeout: 120_000 });
  }

  /** Booking number from the user's booking details URL, e.g. ".../view-booking/24233". */
  getBookingNumber() {
    const bookingNumber = this.page.url().match(/view-booking\/(\d+)/)?.[1];
    if (!bookingNumber) throw new Error(`Booking number not found in URL: ${this.page.url()}`);
    return bookingNumber;
  }

  /** Partners portal booking tab: selects the cancel reason, cancels and confirms if asked. */
  async cancelBookingAsDeveloper(reason: string) {
    const reasonDropdown = this.page.locator(SadadWalletObjects.developerCancelReasonDropdown.xpath);
    await expect(reasonDropdown).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await reasonDropdown.click();
    await this.page.locator(SadadWalletObjects.developerCancelReasonOption(reason)).click();

    const cancelButton = this.page.getByRole(SadadWalletObjects.developerCancelBookingButton.role, { name: SadadWalletObjects.developerCancelBookingButton.name, exact: true });
    await expect(cancelButton).toBeEnabled({ timeout: DEFAULT_TIMEOUT });
    await cancelButton.click();

    // "تأكيد إلغاء الحجز" dialog (booking fee is non-refundable): continue with "المتابعة"
    const confirmDialog = this.page.getByRole('dialog').filter({ hasText: SadadWalletObjects.developerCancelConfirmDialogText });
    await expect(confirmDialog).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await confirmDialog.getByRole('button', { name: SadadWalletObjects.developerCancelConfirmContinueButtonName, exact: true }).click();
    await expect(confirmDialog).toBeHidden({ timeout: DEFAULT_TIMEOUT });

    // "هل تريد رفع مستند؟": the cancellation is completed without a supporting document
    const uploadDocumentDialog = this.page.getByRole('dialog').filter({ hasText: SadadWalletObjects.developerUploadDocumentDialogText });
    await expect(uploadDocumentDialog).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await uploadDocumentDialog.getByRole('button', { name: SadadWalletObjects.developerUploadDocumentNoButtonName, exact: true }).click();
    await expect(uploadDocumentDialog).toBeHidden({ timeout: DEFAULT_TIMEOUT });

    // "سيتم ابلاغ المستفيد بإلغاء الحجز هل تريد الأستمرار؟": continue, which sends the cancellation
    const notifyBeneficiaryDialog = this.page.getByRole('dialog').filter({ hasText: SadadWalletObjects.developerNotifyBeneficiaryDialogText });
    await expect(notifyBeneficiaryDialog).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await notifyBeneficiaryDialog.getByRole('button', { name: SadadWalletObjects.developerNotifyBeneficiaryYesButtonName, exact: true }).click();
    await expect(notifyBeneficiaryDialog).toBeHidden({ timeout: DEFAULT_TIMEOUT });
  }

  /**
   * Partners portal booking tab: approves the paid booking request with "تأكيد الحجز", confirms it without a document
   * ("نعم") and returns the success message ("تهانينا! تم تأكيد الحجز بنجاح!").
   */
  async approveBookingAsDeveloper() {
    await this.page.getByRole('button', { name: SadadWalletObjects.developerConfirmBookingButtonName, exact: true }).filter({ visible: true }).first().click();

    // "تأكيد الحجز" dialog: uploading a document is optional
    const confirmDialog = this.page.getByRole('dialog').filter({ hasText: SadadWalletObjects.developerApproveDialogText });
    await expect(confirmDialog).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await confirmDialog.getByRole('button', { name: SadadWalletObjects.developerConfirmBookingButtonName, exact: true }).click();

    // "هل أنت متأكد أنك تريد تأكيد هذا الحجز دون تحميل المستند؟"
    const withoutDocumentDialog = this.page.getByRole('dialog').filter({ hasText: SadadWalletObjects.developerApproveWithoutDocumentDialogText });
    await expect(withoutDocumentDialog).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await withoutDocumentDialog.getByRole('button', { name: SadadWalletObjects.developerApproveWithoutDocumentYesButtonName, exact: true }).click();

    const successDialog = this.page.getByRole('dialog').filter({ hasText: SadadWalletObjects.developerApproveSuccessText });
    await expect(successDialog).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    return (await successDialog.innerText()).replace(/\s+/g, ' ').trim();
  }

  /** After paying at checkout, the gateway redirects to the booking payment callback with paymentstatus=True. */
  async expectBookingFeePaymentSucceeded() {
    await expect(this.page).toHaveURL(/payment-callback\/\d+\?.*paymentstatus=True/i, { timeout: 120_000 });
  }

  /** Verifies the developer's cancellation success message names the beneficiary, then closes it. */
  async expectDeveloperCancellationSuccess(beneficiaryNationalId: string) {
    const successDialog = this.page.getByRole('dialog').filter({ hasText: SadadWalletObjects.developerCancelSuccessDialogText });
    await expect(successDialog).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await expect(successDialog).toContainText(beneficiaryNationalId);
    await successDialog.getByRole('button', { name: SadadWalletObjects.developerCancelSuccessCloseButtonName, exact: true }).click();
    await expect(successDialog).toBeHidden({ timeout: DEFAULT_TIMEOUT });
  }

  /** Closes the partners portal notice about the updated completion percentage, if it is shown. */
  async dismissDeveloperNoticeIfVisible() {
    // Other hidden buttons are also named "إلغاء", so only the visible one (the notice's) is used
    const dismissButton = this.page.getByRole('button', { name: 'إلغاء', exact: true }).filter({ visible: true }).first();
    if (
      await dismissButton
        .waitFor({ state: 'visible', timeout: 10_000 })
        .then(() => true)
        .catch(() => false)
    ) {
      // The portal keeps a loading backdrop over the page while this notice is open, so the click is forced
      await dismissButton.click({ force: true });
      await this.page
        .locator('.loading-backdrop')
        .waitFor({ state: 'hidden', timeout: 15_000 })
        .catch(() => {});
    }
  }

  async getDeveloperBookingStatus() {
    const statusValue = this.page.locator(SadadWalletObjects.developerBookingStatusValue.xpath).first();
    await expect(statusValue).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    return (await statusValue.inputValue()).trim();
  }

  async getBookingInvoiceNumber() {
    const bookingInvoiceNumberValue = this.page.locator(SadadWalletObjects.bookingInvoiceNumberValue.xpath);
    await expect(bookingInvoiceNumberValue).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    return (await bookingInvoiceNumberValue.innerText()).trim();
  }

  async clickPayBookingFees() {
    const payBookingFeesButton = this.page.getByRole(SadadWalletObjects.payBookingFeesButton.role, { name: SadadWalletObjects.payBookingFeesButton.name });
    await expect(payBookingFeesButton).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await payBookingFeesButton.click();
  }

  async clickPayFees() {
    const payFeesButton = this.page.getByRole(SadadWalletObjects.payFeesButton.role, { name: SadadWalletObjects.payFeesButton.name });
    await expect(payFeesButton).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await payFeesButton.click();
  }

  async getPaymentStatus() {
    const paymentStatusValue = this.page.locator(SadadWalletObjects.paymentStatusValue.xpath);
    await expect(paymentStatusValue).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    return (await paymentStatusValue.innerText()).trim();
  }

  async isStatusTextVisible(status: string) {
    const statusText = this.page.getByText(status, { exact: true }).first();
    await statusText.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await statusText.isVisible();
  }

  /**
   * Cancels the booking open on the booking details page (same steps as BookingPage.cancelBooking).
   * The v6 wrapper intercepts clicks on its inner button, so the wrapper itself is clicked.
   */
  async cancelBooking() {
    const cancelBookingButton = this.page.locator('app-cancel-booking-button-v6');
    await expect(cancelBookingButton).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await cancelBookingButton.click();

    const continueButton = this.page.locator(BookingCancellationObjects.continueButton.xpath);
    await expect(continueButton).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await continueButton.click();

    const othersRadioButton = this.page.locator(BookingCancellationObjects.othersRadioButton.xpath);
    await expect(othersRadioButton).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await othersRadioButton.click();
    await this.page.locator(BookingCancellationObjects.othersTextArea.xpath).fill('سبب إلغاء الحجز');

    const saveAndContinueButton = this.page.locator(BookingCancellationObjects.saveAndContinueButton.xpath);
    await expect(saveAndContinueButton).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await saveAndContinueButton.click();

    const yesButton = this.page.locator(BookingCancellationObjects.yesButton.xpath);
    if (
      await yesButton
        .waitFor({ state: 'visible', timeout: 5_000 })
        .then(() => true)
        .catch(() => false)
    ) {
      await yesButton.click();
    }
  }

  async openWallet(userPortalUrl: string) {
    await this.page.goto(new URL(SadadWalletObjects.walletPath, userPortalUrl).toString());
    await expect(this.page.getByRole(SadadWalletObjects.walletHeading.role, { name: SadadWalletObjects.walletHeading.name, exact: true })).toBeVisible({ timeout: DEFAULT_TIMEOUT });
  }

  /** Reads the available, reserved and total balances (SAR) and the first page of transactions from the wallet page. */
  async getWalletSnapshot() {
    const { transactions, totalCount } = await this.getWalletTransactions();
    const balanceSection = this.page.locator(SadadWalletObjects.walletBalanceSection.xpath);
    // The amounts render after the section title, so wait until the balance labels are there
    await expect(balanceSection).toContainText(SadadWalletObjects.totalBalanceLabel, { timeout: DEFAULT_TIMEOUT });

    const balanceText = (await balanceSection.innerText()).replace(/\s+/g, ' ');
    const amountAfter = (label: string) => {
      const match = balanceText.match(new RegExp(`${label}\\s*(?:SAR|ر\\.س|﷼)?\\s*([\\d,.]+)`));
      if (!match) throw new Error(`"${label}" amount not found in wallet balance: ${balanceText}`);
      return Number(match[1].replace(/,/g, ''));
    };
    return {
      available: amountAfter(SadadWalletObjects.availableBalanceLabel),
      reserved: amountAfter(SadadWalletObjects.reservedBalanceLabel),
      total: amountAfter(SadadWalletObjects.totalBalanceLabel),
      hasNoTransactions: transactions.length === 0,
      transactionsCount: totalCount,
      transactionsText: JSON.stringify(transactions),
    };
  }

  /**
   * Reads the rows of the wallet transactions table (current page) and the total number of transactions from the pager.
   * Each row: type (إيداع / سحب / إجراء داخلي), service, date and time, amount in SAR.
   */
  async getWalletTransactions() {
    const rows = this.page
      .getByRole('row')
      .filter({ hasNotText: SadadWalletObjects.walletTransactionsHeaderText })
      .filter({ hasText: /\d{2}\/\d{2}\/\d{4}/ });
    await expect(rows.first().or(this.page.getByText(SadadWalletObjects.noTransactionsText, { exact: true }).first())).toBeVisible({ timeout: DEFAULT_TIMEOUT });

    const transactions: { type: string; service: string; dateTime: string; amount: number }[] = [];
    for (const rowText of await rows.allInnerTexts()) {
      const text = rowText.replace(/\s+/g, ' ').trim();
      const match = text.match(SadadWalletObjects.walletTransactionRowPattern);
      if (!match) throw new Error(`Unexpected wallet transaction row: "${text}"`);
      transactions.push({ type: match[1], service: match[2], dateTime: match[3], amount: Number(match[4].replace(/,/g, '')) });
    }
    const pagerMatch = (await this.page.locator('body').innerText()).replace(/\s+/g, ' ').match(SadadWalletObjects.walletTransactionsCountPattern);
    return { transactions, totalCount: pagerMatch ? Number(pagerMatch[1]) : transactions.length };
  }
}
