import path from 'node:path';
import { test, expect, Page } from '@playwright/test';
import { DateUtils } from '@pages/utils/DateUtils';
import { WebApp } from '@base-class/web-app';
import { DataHelper } from '@helpers/DataHelper';
import { logStep } from '@helpers/LogSteps';
import { SadadWalletObjects } from '@objects/SadadWalletObjects';

const SERVICE = 'sadad-wallet';
const readServiceData = () => DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper.readData().environments;

/** The Sadad wallet cases run on the preBeta user portal. */
async function loginToUserPortal(app: WebApp, sakaniUserId: string) {
  await app.loginPage.gotoHomePage(readEnvironments().preBeta.userPortalUrl);
  await app.commonMethods.unifiedSakaniLogin(sakaniUserId);
  // The portal redirects again after the Nafath prompt closes; let it settle before navigating
  await app.page.waitForLoadState('networkidle', { timeout: 30_000 }).catch(() => {});
}

/** Opens my bookings on the given tab by URL, retrying until the tab opens (a late post-login redirect can navigate away). */
async function openMyBookingsTab(page: Page, tabName: string) {
  const myBookingsUrl = new URL(SadadWalletObjects.myBookingsPath, readEnvironments().preBeta.userPortalUrl).toString();
  await expect(async () => {
    await page.goto(myBookingsUrl);
    await page.getByRole('tab', { name: tabName, exact: true }).click({ timeout: 15_000 });
    await expect(page).toHaveURL(/my-bookings/, { timeout: 5_000 });
  }).toPass({ timeout: 120_000 });
}

/** Opens a unit of the project and confirms the booking terms; returns the app bound to the booking popup. */
async function startUnitBooking(page: Page, app: WebApp, projectName: string): Promise<WebApp> {
  // A late post-login redirect can send the page back to the marketplace, so search again until the project opens
  await expect(async () => {
    await app.marketplaceLandingPage.openSearch();
    await app.marketplaceLandingPage.searchForProject(projectName);
    await expect(page.getByRole('button', { name: 'عرض الوحدات' })).toBeVisible({ timeout: 15_000 });
  }).toPass({ timeout: 120_000 });
  await app.projectDetailsPage.openUnitsAndScroll();

  const page1Promise = page.waitForEvent('popup');
  await app.marketplaceLandingPage.openResidentialUnit();
  const page1 = await page1Promise;

  // A unit whose booking was cancelled shows "please visit the developer to book" instead of the book button,
  // so try the next units until one can be booked
  for (let unitIndex = 1; unitIndex <= 6; unitIndex++) {
    const page2Promise = page1.waitForEvent('popup');
    await new WebApp(page1).projectUnitsPage.openUnitInPopup(unitIndex);
    const unitPage = await page2Promise;
    const isBookable = await unitPage
      .getByRole('button', { name: 'احجز وحدة' })
      .waitFor({ state: 'visible', timeout: 20_000 })
      .then(() => true)
      .catch(() => false);
    if (!isBookable) {
      await unitPage.close();
      continue;
    }
    const bookingApp = new WebApp(unitPage);
    await bookingApp.unitDetailsPage.reserveUnit();
    // preBeta sometimes skips the terms page and opens the checkout directly
    const termsCheckbox = unitPage.locator("//input[@id='agreeTerms']");
    const checkoutOption = unitPage.locator(SadadWalletObjects.sadadPaymentOption.xpath);
    await expect(termsCheckbox.or(checkoutOption).first()).toBeVisible({ timeout: 60_000 });
    if (await termsCheckbox.isVisible()) await bookingApp.unitBookingPage.acceptTermsAndConfirm();
    return bookingApp;
  }
  throw new Error(`No bookable unit found among the first units of project "${projectName}"`);
}

/**
 * Opens the first active booking whose booking fee is awaiting payment ("في انتظار السداد"), skipping bookings left
 * paid or approved by earlier runs. A new booking is created when none is awaiting payment.
 */
async function openBookingAwaitingPayment(page: Page, app: WebApp, projectName: string) {
  const detailsButtons = page.locator("//button[normalize-space()='عرض التفاصيل']");
  for (let attempt = 0; attempt < 2; attempt++) {
    await openMyBookingsTab(page, SadadWalletObjects.activeBookingsTabName);
    await detailsButtons
      .first()
      .waitFor({ state: 'visible', timeout: 20_000 })
      .catch(() => {});
    const bookingsCount = await detailsButtons.count();
    for (let index = 0; index < bookingsCount; index++) {
      if (index > 0) await openMyBookingsTab(page, SadadWalletObjects.activeBookingsTabName);
      await detailsButtons.nth(index).click();
      if ((await app.sadadWalletPage.getPaymentStatus()).includes(SadadWalletObjects.awaitingPaymentStatusText)) return;
    }
    await startUnitBooking(page, app, projectName);
  }
  throw new Error('No active booking awaiting payment could be found or created');
}

/**
 * Booking details > pay booking fees (fee details page) > pay fees, which opens the checkout (in the same tab on preBeta).
 * Returns the app bound to the page that shows the checkout.
 */
async function openBookingFeeCheckout(page: Page, app: WebApp): Promise<WebApp> {
  await app.sadadWalletPage.clickPayBookingFees();
  const checkoutPopup = page.waitForEvent('popup', { timeout: 30_000 }).catch(() => null);
  await app.sadadWalletPage.clickPayFees();
  const checkoutPage = await checkoutPopup;
  return checkoutPage ? new WebApp(checkoutPage) : app;
}

test.describe('Sadad Wallet Process', () => {
  test('TC-01 Admin creates new offplan Moh land project', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(120000);
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const projectName = `Automation Project Offplan ${new Date()
      .toISOString()
      .replace(/[-:T.]/g, '')
      .slice(0, 14)}`;
    DataHelper.updateServiceData(SERVICE, 'projectName', projectName);

    await logStep('Step 01: Login to admin portal as a super admin');
    await app.adminProjectPage.login(environments.adminPortalUrl, data.adminUsername, data.adminPassword);

    await logStep('Step 02: Navigate to add new project');
    await app.adminProjectPage.clickInternalInventory();
    await app.adminProjectPage.clickProjectsLink();
    await app.adminProjectPage.clickAddNewProjectButton();

    await logStep('Step 03: Enter project details and save');
    await app.adminProjectPage.fillProjectName(projectName);
    await app.adminProjectPage.selectProjectType('مشاريع البيع على الخارطة على أراضي الوزارة');
    await app.adminProjectPage.selectRegion('الرياض');
    await app.adminProjectPage.selectCity('الخرج');
    await app.adminProjectPage.selectDeveloperName('شركة الضاحية المثالية للتطوير والاستثمار العقاري');
    await app.adminProjectPage.toggleBookableOn();
    await app.adminProjectPage.selectProjectStatus('متاح');
    await app.adminProjectPage.fillWafiLicenseExpiryDate(DateUtils.getDateWithOffset(600));
    await app.adminProjectPage.selectSubsidyType('دعم عيني كامل');
    await app.adminProjectPage.fillMaxSubsidyAmount('2');
    await app.adminProjectPage.fillProjectAgreementDate('2026-01-01');
    await app.adminProjectPage.fillProjectLicenseNumber('665334');
    await app.adminProjectPage.fillProjectLicenseDate(DateUtils.getDateWithOffsetAndFormat(600, 'YYYY-MM-DD'));
    await app.adminProjectPage.fillEscrowAccountName('Sakani Test User');
    await app.adminProjectPage.fillEscrowAccountNumber('SA1111111111111111111111');
    await app.adminProjectPage.selectBank('بنك الأهلي السعودي');
    await app.adminProjectPage.fillDeductionPercentage('2');
    await app.adminProjectPage.fillDeedIssueCityArabic('الرياض');
    await app.adminProjectPage.fillDeedIssueCityEnglish('Riyadh');
    await app.adminProjectPage.fillDeedDate('01/01/2026');
    await app.adminProjectPage.clickSaveButton();
    await app.adminProjectPage.validateProjectSavedToastMessage();

    await logStep('Step 04: Link the project to AZM');
    await app.adminProjectPage.linkProjectToAzm();

    await logStep('Step 05: Select participating banks');
    await app.adminProjectPage.expectFinancingEntitiesVisible();
    await app.adminProjectPage.clickFinancingEntities();
    await app.adminProjectPage.expectSelectAllRowsVisible();
    await app.adminProjectPage.clickSelectAllRows();
    await app.adminProjectPage.clickSaveButton();

    await logStep('Step 06: Import and commit project units');
    await app.adminProjectPage.clickUnitsTab();
    await app.adminProjectPage.clickImportNewUnitButton();
    await app.adminProjectPage.openResidentialUnitTypeDropdown();

    await app.adminProjectPage.selectApartmentUnitType();
    const unitsImportFilePath = path.join(process.cwd(), 'src', 'data', 'Offplan_MOH.xlsx');
    await app.adminProjectPage.uploadUnitsFile(unitsImportFilePath);
    await app.adminProjectPage.clickImportSaveButton();
    await app.adminProjectPage.waitForUnitImportCompletion();
    await app.adminProjectPage.clickApproveButton();
    await app.adminProjectPage.clickConfirmButton();
    await app.adminProjectPage.waitForImportConfirmation();
    await app.adminProjectPage.clickBackButton();

    await logStep('Step 07: Upload project media and enter media details');
    await app.adminProjectPage.clickProjectMediaTab();
    const bannerImagePath = path.join(process.cwd(), 'src', 'data', 'Sample image.jpg');
    await app.adminProjectPage.uploadBannerImage(bannerImagePath);
    await app.adminProjectPage.clickUploadButton();
    await app.adminProjectPage.selectDisplayMethod('Hero');
    await app.adminProjectPage.fillDetailsTitleArabic(projectName);
    await app.adminProjectPage.fillDetailsTitleEnglish(projectName);
    await app.adminProjectPage.fillFirstUnitReadyDate('2026-01-01');
    await app.adminProjectPage.fillNameArabic(projectName);
    await app.adminProjectPage.fillNameEnglish(projectName);
    await app.adminProjectPage.fillSummaryArabic('ملخص المشروع'.repeat(10));
    await app.adminProjectPage.fillSummaryEnglish('Project Summary'.repeat(10));
    await app.adminProjectPage.fillDescriptionArabic('الوصف (باللغة العربية)'.repeat(10));
    await app.adminProjectPage.fillDescriptionEnglish('Description EN'.repeat(10));
    await app.adminProjectPage.fillStartingPrice('500000');
    await app.adminProjectPage.fillLatitude('1.1');
    await app.adminProjectPage.fillLongitude('1.1');
    await app.adminProjectPage.expectMediaUploadComplete(0);
    await app.adminProjectPage.fillGuaranteeAfterServices('Test guarantee after services');
    await app.adminProjectPage.clickMediaSaveButton();

    await logStep('Step 08: Approve project media');
    await app.adminProjectPage.clickProjectDetailsTab();
    await app.adminProjectPage.clickRequestMediaApprovalButton();
    await app.adminProjectPage.clickAcceptUploadedMediaButton();
    await app.adminProjectPage.clickKeepProjectUnpublishedButton();
    await app.adminProjectPage.clickSaveButton();
    await app.adminProjectPage.validateProjectSavedToastMessage();

    await logStep('Step 09: Publish the unit model');
    await app.adminProjectPage.clickUnitModelsSection();
    await app.adminProjectPage.clickUnitModelCell();
    await app.adminProjectPage.clickSaveButton();
    await app.adminProjectPage.clickMediaDraftSection();
    await app.adminProjectPage.clickSaveButton();
    await app.adminProjectPage.clickRequestMediaApprovalButton();
    await app.adminProjectPage.clickAcceptUploadedMediaButton();
    await app.adminProjectPage.clickPublishUnitButton();
    await app.adminProjectPage.clickUnitModelLink();

    await logStep('Step 10: Set project availability');
    await app.adminProjectPage.clickProjectDetailsText();
    await app.adminProjectPage.selectProjectStatus('متاح');
    await app.adminProjectPage.selectAvailableProjectStatus();
    await app.adminProjectPage.clickSaveButton();

    await logStep('Step 11: Publish the project and validate the toast message');
    await app.adminProjectPage.enableAvailableForBookingToggle();
    await app.adminProjectPage.publishProject();
    await app.adminProjectPage.clickSaveButton();
    await app.adminProjectPage.validateProjectSavedToastMessage();

    await app.adminProjectPage.expandProjectSettings();
    await app.adminProjectPage.enableRefundToggle();
    await page.waitForTimeout(2000);
    await app.adminProjectPage.validateProjectSavedToastMessage();
  });

  test('TC-02 Developer adds cash and lending payment schedules to the project (Offplan Moh Land)', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const projectName = data.projectName;
    const developerUserId = data.developerUserId;
    const sapaPortalUrl = environments.sapaPortalUrl;

    await logStep('Step 01: Login as developer to sapa portal and open the project');
    await app.developerProjectPage.gotoAuth(sapaPortalUrl);
    await app.partnersLoginPage.loginToSapaPortalBeta(developerUserId);
    await app.developerProjectPage.switchRoleToDeveloper();

    await logStep('Step 02: Search and open the project');
    await app.developerProjectPage.openProjectBySearch(projectName);

    await logStep('Step 03: Add a cash payment schedule and verify it is added successfully');
    await app.developerProjectPage.openPaymentSchedulesTab();
    await app.developerProjectPage.addPaymentSchedule({
      type: 'cash',
      scheduleName: 'Cash 22',
      completionPercentageOneValue: '50',
      percentageOneValue: '50',
      completionPercentageTwoValue: '100',
      percentageTwoValue: '50',
    });

    await logStep('Step 04: Add a lending payment schedule and verify it is added successfully');
    await app.developerProjectPage.openProjectBySearch(projectName);
    await app.developerProjectPage.openPaymentSchedulesTab();
    await app.developerProjectPage.addPaymentSchedule({
      type: 'lending',
      scheduleName: 'Lending 22',
      completionPercentageOneValue: '50',
      percentageOneValue: '50',
      completionPercentageTwoValue: '100',
      percentageTwoValue: '50',
    });
  });

  test('TC-03 Developer approves sales contract of project (Offplan Moh Land)', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    const app = new WebApp(page);
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const projectName = data.projectName;
    const developerUserId = data.developerUserId;
    const sapaPortalUrl = environments.sapaPortalUrl;

    await logStep('Step 01: Login as developer to sapa portal and open the project');
    await app.developerProjectPage.gotoAuth(sapaPortalUrl);
    await app.partnersLoginPage.loginToSapaPortalBeta(developerUserId);
    await app.developerProjectPage.switchRoleToDeveloper();

    await logStep('Step 02: Search and open the project');
    await app.developerProjectPage.openProjectBySearch(projectName);

    await logStep('Step 03: Approve the sales contract');
    await app.developerProjectPage.openSalesContractsTab();
    await app.developerProjectPage.viewAndApproveSalesContract();
    await app.developerProjectPage.approveUnitSpecification();
    await app.developerProjectPage.fillOtp('1234');
    await app.developerProjectPage.verifyOtp();

    await logStep('Step 04: Verify contract approval message');
    await app.developerProjectPage.verifyApprovalSuccessMessage();
  });

  test('TC-04 User books unit (Offplan Moh Land)', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const sakaniUserId = data.sakaniUserId;
    const userPortalUrl = environments.userPortalUrl;
    const projectName = data.projectName;

    await logStep('Step 01: Open the user portal and login');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.loginPage.acceptCookies();
    await app.loginPage.openLogin();
    await app.loginPage.loginWithNafath(sakaniUserId);
    await app.loginPage.waitForNafathPromptToDisappear();
    await app.loginPage.continueNewUserPopup();
    await app.loginPage.handlePushNotificationPopup();

    await logStep('Step 02: Find the project and open its unit model');
    await app.marketplaceLandingPage.openSearch();
    await app.marketplaceLandingPage.searchForProject(projectName);
    await app.projectDetailsPage.openUnitsAndScroll();

    await logStep('Step 03: Open a unit and start the booking');
    const page1Promise = page.waitForEvent('popup');
    await app.marketplaceLandingPage.openResidentialUnit();
    const page1 = await page1Promise;
    const page2Promise = page1.waitForEvent('popup');
    {
      const unitApp = new WebApp(page1);
      await unitApp.projectUnitsPage.openUnitInPopup(1);
    }
    const page2 = await page2Promise;
    {
      let bookingPage = page2;
      let bookingApp = new WebApp(bookingPage);

      await logStep('Step 04: Confirm terms and conditons');
      await bookingApp.unitDetailsPage.reserveUnit();
      await bookingApp.unitBookingPage.acceptTermsAndConfirm();

      await logStep('Step 05: Pay booking fees and validate payment success');
      await bookingApp.paymentGatewayPage.fillCardDetails();
      await bookingApp.paymentConfirmationPage.closePayment();
      await bookingApp.paymentConfirmationPage.expectSuccessMessage();
    }
  });

  test('TC-05 User signs sales contract of booked unit (Offplan Moh Land)', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(30000);
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const sakaniUserId = data.sakaniUserId;
    const userPortalUrl = environments.userPortalUrl;

    await logStep('Step 01: Open user portal');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.loginPage.acceptCookies();

    await logStep('Step 02: Log in with Nafath');
    await app.loginPage.openLogin();
    await app.loginPage.loginWithNafath(sakaniUserId);
    await app.loginPage.waitForNafathPromptToDisappear();
    await app.loginPage.continueNewUserPopup();
    await app.loginPage.handlePushNotificationPopup();

    await logStep('Step 03: Open active bookings');
    await app.bookingPage.openActiveBookings();

    await logStep('Step 04: Capture booked unit code and save to test data');
    const bookedUnitCode = await app.bookingPage.getBookedUnitCode();
    expect(bookedUnitCode).toBeTruthy();
    DataHelper.updateServiceData('offplan-booking', 'bookedUnitCode', bookedUnitCode);

    await logStep('Step 05: Open booking details');
    await app.bookingPage.openBookingDetails();

    await logStep('Step 06: Sign and verify the sales contract signed message');
    await app.unitDetailsPage.clickSignSalesContract();
    await app.unitBookingPage.signSalesContract();
    await app.unitBookingPage.expectSalesContractSuccess();
  });

  test('TC-06 Developer confirms the booking and adds annex (Offplan Moh Land)', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const projectName = data.projectName;
    const developerUserId = data.developerUserId;
    const sapaPortalUrl = environments.sapaPortalUrl;
    const bookedUnitCode = data.bookedUnitCode;

    await logStep('Step 01: Login as developer to sapa portal');
    await app.developerProjectPage.gotoAuth(sapaPortalUrl);
    await app.partnersLoginPage.loginToSapaPortalBeta(developerUserId);
    await app.developerProjectPage.switchRoleToDeveloper();

    await logStep('Step 02: Confirm the booking');
    await app.developerProjectPage.confirmBooking(bookedUnitCode);

    await logStep('Step 03: Navigate to add annex page');
    await app.developerProjectPage.openProjectBySearch(projectName);
    await app.developerProjectPage.openSalesContractsTab();
    const unitsImportFilePath = path.join(process.cwd(), 'src', 'data', 'Sample pdf.pdf');

    await logStep('Step 04: Add annex to the booked unit');
    await app.developerProjectPage.openAddAnnexDialog();
    await app.developerProjectPage.searchUnitByCode(bookedUnitCode);
    await app.developerProjectPage.selectFirstUnit();
    await app.developerProjectPage.openSelectedUnitsAnnexDialog();
    await app.developerProjectPage.uploadAnnexFile(unitsImportFilePath);
    await app.developerProjectPage.uploadAnnex();

    await logStep('Step 05: Approve the annex');
    await app.developerProjectPage.approveAnnex();
    await app.developerProjectPage.fillOtp();
    await app.developerProjectPage.verifyOtp();
    await app.developerProjectPage.expectAnnexSuccess();
  });

  test('TC-07 User verifies the refundable status is present for the booking', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);
    const sakaniUserId = data.sakaniUserId;
    const userPortalUrl = environments.userPortalUrl;

    await logStep('Step 01: Open user portal');
    await app.loginPage.gotoHomePage(userPortalUrl);
    await app.loginPage.acceptCookies();

    await logStep('Step 02: Log in with Nafath');
    await app.loginPage.openLogin();
    await app.loginPage.loginWithNafath(sakaniUserId);
    await app.loginPage.waitForNafathPromptToDisappear();
    await app.loginPage.continueNewUserPopup();
    await app.loginPage.handlePushNotificationPopup();

    await logStep('Step 03: Open completed bookings');
    await app.bookingPage.openCompletedBookings();

    await logStep('Step 04: Open booking details');
    await app.bookingPage.openBookingDetails();

    await logStep('Step 05: Verify the refunded status that the amount is refunded');
    await app.bookingPage.verifyTheRefundedStatus();
  });

  test('TC-08 SAK-TC-1482 Verify that the invoice number is displayed successfully', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    test.setTimeout(0);
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);

    await logStep('Step 01: Open the user portal and login');
    await loginToUserPortal(app, data.sakaniUserId);

    await logStep('Step 02: Open the unpaid booking details from my bookings');
    await openBookingAwaitingPayment(page, app, data.projectName);

    await logStep('Step 03: Verify the booking fee status is awaiting payment and the invoice number is displayed');
    expect(await app.sadadWalletPage.getPaymentStatus()).toContain(SadadWalletObjects.awaitingPaymentStatusText);
    const bookingInvoiceNumber = await app.sadadWalletPage.getBookingInvoiceNumber();
    expect(bookingInvoiceNumber).toMatch(/^\d+$/);

    await logStep('Step 04: Click pay booking fees and verify Sadad (سداد) is visible in the payment methods');
    const checkoutApp = await openBookingFeeCheckout(page, app);
    expect(await checkoutApp.sadadWalletPage.isSadadPaymentOptionVisible()).toBe(true);

    await logStep('Step 05: Select Sadad as the booking fee payment method');
    await checkoutApp.sadadWalletPage.selectSadadPaymentMethod();

    await logStep('Step 06: Verify the Sadad biller number and the same invoice number are displayed and save the invoice number');
    expect(await checkoutApp.sadadWalletPage.getBillerNumber()).toMatch(/^\d+$/);
    expect(await checkoutApp.sadadWalletPage.isInvoiceNumberVisible()).toBe(true);
    const invoiceNumber = await checkoutApp.sadadWalletPage.getInvoiceNumber();
    expect(invoiceNumber).toBe(bookingInvoiceNumber);
    DataHelper.updateServiceData(SERVICE, 'sadadInvoiceNumber', invoiceNumber);
  });

  test('TC-09 SAK-TC-879 Verify wallet balance after cancelling a booking with no completed SADAD payment', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);

    await logStep('Step 01: Open the user portal and login');
    await loginToUserPortal(app, data.sakaniUserId);

    await logStep('Step 02: Open the wallet and record the balance and transactions');
    await app.sadadWalletPage.openWallet(environments.preBeta.userPortalUrl);
    const walletBefore = await app.sadadWalletPage.getWalletSnapshot();

    await logStep('Step 03: Open the booking, select SADAD as the payment method and leave the invoice unpaid');
    await openBookingAwaitingPayment(page, app, data.projectName);
    const checkoutApp = await openBookingFeeCheckout(page, app);
    await checkoutApp.sadadWalletPage.selectSadadPaymentMethod();
    expect(await checkoutApp.sadadWalletPage.getInvoiceNumber()).toMatch(/^\d+$/);
    if (checkoutApp.page !== page) await checkoutApp.page.close();

    await logStep('Step 04: Go back to the booking and verify that no payment has been completed');
    await app.loginPage.gotoHomePage(environments.preBeta.userPortalUrl);
    await openBookingAwaitingPayment(page, app, data.projectName);
    expect(await app.sadadWalletPage.getPaymentStatus()).toContain(SadadWalletObjects.awaitingPaymentStatusText);

    await logStep('Step 05: Cancel the booking, confirm the cancellation and verify it is cancelled successfully');
    await app.sadadWalletPage.cancelBooking();
    await app.bookingPage.expectCancellationSuccess();

    await logStep('Step 06: Open the wallet and verify the balance and transactions are unchanged (no refund)');
    await app.sadadWalletPage.openWallet(environments.preBeta.userPortalUrl);
    const walletAfter = await app.sadadWalletPage.getWalletSnapshot();
    expect(walletAfter.available, 'available balance').toBe(walletBefore.available);
    expect(walletAfter.reserved, 'reserved balance').toBe(walletBefore.reserved);
    expect(walletAfter.total, 'total balance').toBe(walletBefore.total);
    expect(walletAfter.transactionsText, 'no new wallet transaction').toBe(walletBefore.transactionsText);
  });

  test('TC-10 SAK-TC-1485 Verify that the request payment status is updated to paid after approval by the developer', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page, browser }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);

    await logStep('Step 01: Open the user portal and login');
    await loginToUserPortal(app, data.sakaniUserId);

    await logStep('Step 02: Open the pending booking request and read its unit code');
    await openBookingAwaitingPayment(page, app, data.projectName);
    const unitCode = await app.sadadWalletPage.getBookingUnitCode();
    const bookingNumber = app.sadadWalletPage.getBookingNumber();

    // A SADAD invoice cannot be paid on preBeta, so the request's payment is made with the comprehensive journey's test card.
    // Step 02 only opens a request whose fee is awaiting payment.
    await logStep('Step 03: Pay the booking fee of the request through the checkout');
    const checkoutApp = await openBookingFeeCheckout(page, app);
    await checkoutApp.paymentGatewayPage.fillCardDetails();
    await checkoutApp.sadadWalletPage.expectBookingFeePaymentSucceeded();

    // The user's Nafath session would sign the partners portal in as the user, so the developer gets its own context
    await logStep('Step 04: Log in to the partners portal as the developer and open the request awaiting approval');
    const developerContext = await browser.newContext({ viewport: null, locale: 'ar-SA', timezoneId: 'Asia/Riyadh', ignoreHTTPSErrors: true });
    const developerPage = await developerContext.newPage();
    const developerApp = new WebApp(developerPage);
    await developerApp.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await developerApp.partnersLoginPage.loginToSapaPortalBeta(data.developerUserId);
    await developerApp.developerProjectPage.switchRoleToDeveloper();
    await developerApp.developerProjectPage.navigateToIndividualBookings();
    await developerApp.developerProjectPage.searchBookingByUnitCode(unitCode);
    await developerApp.sadadWalletPage.openDeveloperBooking(unitCode, bookingNumber);
    await developerApp.sadadWalletPage.dismissDeveloperNoticeIfVisible();
    await developerApp.developerProjectPage.switchToBookingTab();
    expect(await developerApp.sadadWalletPage.getDeveloperBookingStatus()).toContain(SadadWalletObjects.awaitingApprovalStatusText);

    await logStep('Step 05: Approve the request, confirm and verify the successful approval message');
    const successMessage = await developerApp.sadadWalletPage.approveBookingAsDeveloper();
    expect(successMessage).toMatch(SadadWalletObjects.developerApproveSuccessText);
    await developerContext.close();
  });

  test('TC-11 SAK-TC-1481 Verify the Sadad payment card is displayed in the payment gateways and can be selected to pay', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const app = new WebApp(page);

    await logStep('Step 01: Open the user portal and login');
    await loginToUserPortal(app, data.sakaniUserId);

    await logStep('Step 02: Open a booking request whose booking fee is awaiting payment');
    await openBookingAwaitingPayment(page, app, data.projectName);

    await logStep('Step 03: Open the booking fee checkout and verify the Sadad card is displayed among the payment gateways');
    const checkoutApp = await openBookingFeeCheckout(page, app);
    expect(await checkoutApp.sadadWalletPage.isSadadPaymentOptionVisible()).toBe(true);
    expect(await checkoutApp.sadadWalletPage.getSadadPaymentOptionTitle()).toBe(SadadWalletObjects.sadadPaymentOptionTitle);

    await logStep('Step 04: Select the Sadad card and verify the Sadad payment details to pay through it are displayed');
    await checkoutApp.sadadWalletPage.selectSadadPaymentMethod();
    expect(await checkoutApp.sadadWalletPage.getBillerNumber()).toMatch(/^\d+$/);
    expect(await checkoutApp.sadadWalletPage.getInvoiceNumber()).toMatch(/^\d+$/);
  });

  test('TC-12 SAK-TC-1483 Verify that SADAD payment for a unit booking with a flexible payment schedule is completed successfully', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page, browser }) => {
    test.setTimeout(20 * 60_000);
    await logStep('Step 00: Read data from json relative to the service and the comprehensive journey project');
    const environments = readEnvironments();
    const flexibleData = DataHelper.readData().services['FlexiblePaymentPhaseThree'];
    const flexibleProjectName = flexibleData.projectName;
    const scheduleTitleAr = flexibleData.scheduleTitleAr;
    const userId = flexibleData.nonBeneUser;
    const app = new WebApp(page);

    // The user's Nafath session would sign the partners portal in as the user, so the developer gets its own context
    await logStep(`Step 01: Developer books a unit for the user on the comprehensive project ${flexibleProjectName}`);
    const developerContext = await browser.newContext({ viewport: null, locale: 'ar-SA', timezoneId: 'Asia/Riyadh', ignoreHTTPSErrors: true });
    const developerPage = await developerContext.newPage();
    const developerApp = new WebApp(developerPage);
    try {
      await developerApp.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
      await developerApp.partnersLoginPage.loginToSapaPortalBeta(flexibleData.developerUserId);
      await developerApp.developerProjectPage.switchRoleToDeveloper();
      await developerApp.developerProjectPage.bookUnitsForCustomers(userId, flexibleProjectName);
      await developerPage.waitForTimeout(10_000);
      await developerApp.developerProjectPage.selectUnitCheckbox(1);
      await developerApp.developerProjectPage.clickOnNextButton();
      await developerApp.developerProjectPage.clickContinueBookingButton();
      await developerApp.developerProjectPage.selectBank('بنك الأهلي السعودي');
      await developerApp.developerProjectPage.clickOnNextButton();
      await developerApp.developerProjectPage.clickOnConfirmationButton();
      await developerApp.developerProjectPage.validateSuccessReservationPopup();
    } catch (error) {
      await test.info().attach('developer-page', { body: await developerPage.screenshot({ fullPage: true }), contentType: 'image/png' });
      throw error;
    } finally {
      await developerContext.close();
    }

    await logStep('Step 02: Open the user portal, login and open the booking awaiting payment');
    await loginToUserPortal(app, userId);
    await openBookingAwaitingPayment(page, app, flexibleProjectName);
    const bookingNumber = app.sadadWalletPage.getBookingNumber();
    const unitCode = await app.sadadWalletPage.getBookingUnitCode();

    await logStep('Step 03: Pay booking fees > Verify Sadad (سداد) is offered and shows the biller and invoice numbers');
    const checkoutApp = await openBookingFeeCheckout(page, app);
    expect(await checkoutApp.sadadWalletPage.isSadadPaymentOptionVisible()).toBe(true);
    await checkoutApp.sadadWalletPage.selectSadadPaymentMethod();
    expect(await checkoutApp.sadadWalletPage.getBillerNumber()).toMatch(/^\d+$/);
    expect(await checkoutApp.sadadWalletPage.getInvoiceNumber()).toMatch(/^\d+$/);

    await logStep('Step 04: Complete the booking fee payment with the test card');
    await checkoutApp.paymentGatewayPage.fillCardDetails();
    await checkoutApp.sadadWalletPage.expectBookingFeePaymentSucceeded();

    await logStep('Step 05: Open the booking > Verify the booking fee is paid');
    await app.PaymentflexiblePhaseThree.openPreBetaAndLoginIfLoggedOut(environments.preBeta.userPortalUrl, userId);
    await app.sadadWalletPage.openUserBookingByNumber(environments.preBeta.userPortalUrl, bookingNumber, unitCode);
    await expect(async () => {
      await page.reload();
      expect(await app.sadadWalletPage.getPaymentStatus()).toContain(SadadWalletObjects.paidStatusText);
    }).toPass({ timeout: 180_000 });

    await logStep('Step 06: اختر طريقة الدفع > Select the flexible payment schedule > حفظ ومتابعة');
    await app.PaymentflexiblePhaseThree.openSelectPaymentMethod();
    await app.PaymentflexiblePhaseThree.selectPaymentSchedule(scheduleTitleAr);
    await app.PaymentflexiblePhaseThree.clickSaveAndContinueButton();

    await logStep('Step 07: Sign the sales contract: اعتماد > OTP > تحقق');
    await app.unitBookingPage.signSalesContract();

    await logStep('Step 08: Open the booking > Verify the flexible payment schedule (جدول الدفع) and its installments are displayed');
    await app.PaymentflexiblePhaseThree.openPreBetaAndLoginIfLoggedOut(environments.preBeta.userPortalUrl, userId);
    await app.sadadWalletPage.openUserBookingByNumber(environments.preBeta.userPortalUrl, bookingNumber, unitCode);
    await app.PaymentflexiblePhaseThree.verifyPaymentScheduleDisplayed();
    expect(await app.sadadWalletPage.getPaymentScheduleProgress()).toMatch(SadadWalletObjects.paymentScheduleProgressPattern);
    expect(await app.sadadWalletPage.getPaymentStatus()).toContain(SadadWalletObjects.paidStatusText);
  });

  test('TC-13 SAK-TC-1484 Verify that the booking request is displayed as cancelled after cancellation by the developer', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page, browser }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);

    await logStep('Step 01: Open the user portal, login and record the wallet balance and transactions');
    await loginToUserPortal(app, data.sakaniUserId);
    await app.sadadWalletPage.openWallet(environments.preBeta.userPortalUrl);
    const walletBefore = await app.sadadWalletPage.getWalletSnapshot();

    await logStep('Step 02: Open the active booking request and read its unit code');
    await openBookingAwaitingPayment(page, app, data.projectName);
    const unitCode = await app.sadadWalletPage.getBookingUnitCode();
    const bookingNumber = app.sadadWalletPage.getBookingNumber();

    // The user's Nafath session would sign the partners portal in as the user, so the developer gets its own context
    await logStep('Step 03: Log in to the partners portal as the developer and open the booking request');
    const developerContext = await browser.newContext({ viewport: null, locale: 'ar-SA', timezoneId: 'Asia/Riyadh', ignoreHTTPSErrors: true });
    const developerPage = await developerContext.newPage();
    const developerApp = new WebApp(developerPage);
    await developerApp.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await developerApp.partnersLoginPage.loginToSapaPortalBeta(data.developerUserId);
    await developerApp.developerProjectPage.switchRoleToDeveloper();
    await developerApp.developerProjectPage.navigateToIndividualBookings();
    await developerApp.developerProjectPage.searchBookingByUnitCode(unitCode);
    await developerApp.sadadWalletPage.openDeveloperBooking(unitCode, bookingNumber);
    await developerApp.sadadWalletPage.dismissDeveloperNoticeIfVisible();
    await developerApp.developerProjectPage.switchToBookingTab();

    await logStep('Step 04: Cancel the booking request with a cancel reason, confirm and verify the OTP');
    await developerApp.sadadWalletPage.cancelBookingAsDeveloper(data.developerCancelReason);
    await developerApp.developerProjectPage.fillOtp('1234');
    await developerApp.developerProjectPage.verifyOtp();

    await logStep('Step 05: Verify the successful cancellation message and the cancelled status for the developer');
    await developerApp.sadadWalletPage.expectDeveloperCancellationSuccess(data.sakaniUserId);
    await expect(async () => {
      expect(await developerApp.sadadWalletPage.getDeveloperBookingStatus()).toContain(SadadWalletObjects.developerCancelledStatusText);
    }).toPass({ timeout: 60_000 });
    await developerContext.close();

    await logStep('Step 06: Open my bookings as the user and verify the same booking is cancelled and no longer active');
    await openMyBookingsTab(page, SadadWalletObjects.cancelledBookingsTabName);
    await app.sadadWalletPage.openUserBookingByNumber(environments.preBeta.userPortalUrl, bookingNumber, unitCode);
    expect(await app.sadadWalletPage.isStatusTextVisible(SadadWalletObjects.cancelledBookingText)).toBe(true);

    // SAK-CY-9 / SAK-TC-879: no payment was completed, so the cancellation must not refund anything to the wallet
    await logStep('Step 07: Open the wallet and verify the balance and transactions are unchanged (no refund)');
    await app.sadadWalletPage.openWallet(environments.preBeta.userPortalUrl);
    const walletAfter = await app.sadadWalletPage.getWalletSnapshot();
    expect(walletAfter.available, 'available balance').toBe(walletBefore.available);
    expect(walletAfter.reserved, 'reserved balance').toBe(walletBefore.reserved);
    expect(walletAfter.total, 'total balance').toBe(walletBefore.total);
    expect(walletAfter.transactionsText, 'no new wallet transaction').toBe(walletBefore.transactionsText);
  });

  test('TC-14 SAK-TC-1486 Verify that transactions are displayed in the wallet and calculated correctly', { annotation: [{ product: 'Marketplace', type: 'critical' }] as any }, async ({ page }) => {
    await logStep('Step 00: Read data from json relative to the service');
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new WebApp(page);

    await logStep('Step 01: Open the user portal and login');
    await loginToUserPortal(app, data.walletUserId);

    await logStep('Step 02: Open the wallet and read the balances and the transactions history');
    await app.sadadWalletPage.openWallet(environments.preBeta.userPortalUrl);
    const wallet = await app.sadadWalletPage.getWalletSnapshot();
    const { transactions, totalCount } = await app.sadadWalletPage.getWalletTransactions();

    await logStep('Step 03: Verify every transaction is displayed with its type, service, date and amount');
    expect(transactions.length, 'the wallet has transactions').toBeGreaterThan(0);
    expect(totalCount, 'all transactions are on one page').toBe(transactions.length);
    for (const transaction of transactions) {
      expect(transaction.type, 'transaction type').not.toBe('');
      expect(transaction.service, 'transaction service').not.toBe('');
      expect(transaction.dateTime, 'transaction date and time').toMatch(/\d{2}\/\d{2}\/\d{4}/);
      expect(transaction.amount, 'transaction amount').toBeGreaterThan(0);
    }

    await logStep('Step 04: Verify the total balance is the available balance plus the reserved balance');
    expect(wallet.total).toBe(wallet.available + wallet.reserved);

    await logStep('Step 05: Verify the balances are calculated from the deposits, withdrawals and holds');
    const sumOf = (filter: (transaction: (typeof transactions)[number]) => boolean) => transactions.filter(filter).reduce((sum, transaction) => sum + transaction.amount, 0);
    const deposits = sumOf((transaction) => transaction.type === SadadWalletObjects.depositTransactionType);
    const withdrawals = sumOf((transaction) => transaction.type === SadadWalletObjects.withdrawalTransactionType);
    const holds = sumOf((transaction) => transaction.service === SadadWalletObjects.holdTransactionService);
    expect(wallet.reserved, 'reserved balance = holds').toBe(holds);
    expect(wallet.available, 'available balance = deposits - withdrawals - holds').toBe(deposits - withdrawals - holds);
  });
});
