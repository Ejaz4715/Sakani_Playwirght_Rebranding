'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const web_app_1 = require('@base-class/web-app');
const DateUtils_1 = require('@pages/utils/DateUtils');
const DataHelper_1 = require('@helpers/DataHelper');
const LogSteps_1 = require('@helpers/LogSteps');
const fs = require('fs');
const path = require('path');
const DEFAULT_TIMEOUT = 30_000;
const LONG_TIMEOUT = 90_000;
async function waitAndClick(locator, timeout = DEFAULT_TIMEOUT) {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.click();
}
const SERVICE = 'selling-to-companies';
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
const writeServiceData = (key, value) => DataHelper_1.DataHelper.updateServiceData(SERVICE, key, value);
const unitCheckbox = (page, row) => page.locator(`//datatable-row-wrapper[${row}]/datatable-body-row/div[3]/datatable-body-cell/div/div/app-sapa-checkbox-v2/div/div/input/..`);
pages_fixture_1.test.describe('Selling to companies', () => {
  let companyUnitCode;
  (0, pages_fixture_1.test)('TC-01 Admin adds new offplan moh land project for selling unit to company', { annotation: [{ product: 'Marketplace', type: 'critical' }] }, async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const currentDate = DateUtils_1.DateUtils.getDateWithOffset(600);
    const projectName = `Automation Project ${new Date()
      .toISOString()
      .replace(/[-:T.]/g, '')
      .slice(0, 14)}`;
    writeServiceData('projectName', projectName);
    // Project details
    await (0, LogSteps_1.logStep)('Step 01: Navigate to admin portal > Login');
    await app.adminProjectPage.login(environments.adminPortalUrl, data.adminUsername, data.adminPassword);
    await (0, LogSteps_1.logStep)('Step 02: Create new project > Fill project details > Save');
    await app.adminProjectPage.openProjectCreation();
    await page.locator('form-field-component').filter({ hasText: 'إسم المشروع *' }).getByPlaceholder('إسم المشروع').fill(projectName);
    const projectTypeDropdown = page.locator("//mat-select[@formcontrolname='project_type']");
    const projectTypeOption = page.getByText('مشاريع البيع على الخارطة على أراضي الوزارة', { exact: true });
    let projectTypeVisible = false;
    for (let attempt = 0; attempt < 5; attempt++) {
      await projectTypeDropdown.click();
      projectTypeVisible = await projectTypeOption.isVisible().catch(() => false);
      if (projectTypeVisible) {
        break;
      }
      await page.waitForTimeout(2000);
    }
    await (0, pages_fixture_1.expect)(projectTypeOption).toBeVisible({ timeout: 30000 });
    await projectTypeOption.click();
    await page.locator("//ng-select[@formcontrolname='region_id']").getByRole('combobox').click();
    await page.getByText('الرياض').click();
    await page.locator("//input[@id='inputCity']").click();
    await page.getByRole('option', { name: 'الخرج', exact: true }).click();
    await page.locator("//input[@id='inputDeveloper']").fill('شركة الضاحية المثالية للتطوير والاستثمار العقاري');
    await page.getByText(/شركة الضاحية المثالية للتطوير والاستثمار العقاري.*/).click();
    await page.getByRole('switch', { name: 'قابل للحجز؟' }).click();
    await page.locator("//mat-select[@formcontrolname='status']").click();
    await page.getByRole('option', { name: 'متاح' }).click();
    await page.getByRole('textbox', { name: 'تاريخ انتهاء رخصة البيع في وافي' }).fill(currentDate);
    await page.locator("//mat-select[@formcontrolname='subsidy_type']").click();
    await page.getByText('دعم عيني كامل').click();
    await page.locator("//input[@formcontrolname='max_subsidy_amount']").fill('2');
    await page.getByRole('textbox', { name: 'تاريخ توقيع الاتفاقيه للمشروع' }).fill('2026-01-01');
    await page.getByRole('textbox', { name: 'رقم ترخيص المشروع' }).fill('665334');
    await page.getByRole('textbox', { name: 'تاريخ ترخيص المشروع' }).fill('2026-01-01');
    await page.getByRole('textbox', { name: 'اسم حساب الضمان' }).fill('Test user');
    await page.getByRole('textbox', { name: 'رقم حساب الضمان' }).fill('SA1111111111111111111111');
    await page.locator("//app-nsar-dropdown[@formcontrolname='bank_name']/descendant::ng-select").first().click();
    await page.getByText('بنك الأهلي السعودي').click();
    await page.locator("//input[@formcontrolname='deduct_percentage']").fill('2');
    await page.getByRole('textbox', { name: 'المدينة المصدر منها الصك (بالعربية)' }).fill('test');
    await page.getByRole('textbox', { name: 'المدينة المصدر منها الصك (بالإنجليزية)' }).fill('test');
    await page.getByRole('textbox', { name: 'DD/MM/YYYY' }).fill('01/01/2026');
    await page.getByRole('button', { name: 'حفظ' }).click();
    const saveSuccessToast = page.locator('//app-toasts').getByText('تم الحفظ بنجاح!');
    await (0, pages_fixture_1.expect)(saveSuccessToast).toBeVisible({ timeout: 120000 });
    await (0, LogSteps_1.logStep)('Step 03: Link the project with AZM');
    // Link with AZM
    await page.waitForTimeout(3000);
    const azmToggle = page.locator("//label[contains (text(), 'AZM')]/preceding-sibling::button");
    const isAzmLinked = await azmToggle.getAttribute('aria-checked');
    if (isAzmLinked === 'false') {
      await azmToggle.click();
      await page.waitForTimeout(5000);
      await (0, pages_fixture_1.expect)(azmToggle).toHaveAttribute('aria-checked', 'true');
    } else {
      await (0, pages_fixture_1.expect)(azmToggle).toHaveAttribute('aria-checked', 'true');
    }
    await (0, LogSteps_1.logStep)('Step 04: Select the participating banks');
    // Partcipating banks
    await (0, pages_fixture_1.expect)(page.getByText(/قائمة الجهات التمويلية/i)).toBeVisible({
      timeout: 30000,
    });
    await page.getByText(/قائمة الجهات التمويلية/i).click();
    await (0, pages_fixture_1.expect)(page.getByRole('checkbox', { name: 'Select all rows' })).toBeVisible({ timeout: 30000 });
    await page.getByRole('checkbox', { name: 'Select all rows' }).click();
    await page.getByRole('button', { name: 'حفظ' }).click();
    await (0, LogSteps_1.logStep)('Step 05: Import the project units > Approve the import');
    // Import units
    await page.getByRole('tab', { name: 'الوحدات', exact: true }).click();
    await (0, pages_fixture_1.expect)(page.getByRole('button', { name: 'استيراد وحدة جديدة' })).toBeVisible({ timeout: 30000 });
    await page.getByRole('button', { name: 'استيراد وحدة جديدة' }).click();
    await (0, pages_fixture_1.expect)(page.getByRole('combobox', { name: 'نوع الوحدة السكنية' })).toBeVisible({ timeout: 30000 });
    await page.waitForTimeout(3000);
    await page.getByRole('combobox', { name: 'نوع الوحدة السكنية' }).click();
    await page.getByRole('option', { name: 'شقة' }).click();
    const unitsImportFilePath = path.join(process.cwd(), 'src', 'data', 'OffPlanCompany.xlsx');
    await page.locator("//input[@type='file']").setInputFiles(unitsImportFilePath);
    await page.getByRole('button', { name: ' حفظ' }).click();
    const importInProgress = page.getByText('تحت الإجراء ...', { exact: true });
    await (0, pages_fixture_1.expect)(importInProgress).toBeVisible({ timeout: 120000 });
    await page.waitForTimeout(5000);
    await page.reload();
    const fileProcessedMessage = page.getByText('تم إكمال الإجراء', {
      exact: true,
    });
    let completedVisible = false;
    while (!completedVisible) {
      completedVisible = await fileProcessedMessage.isVisible().catch(() => false);
      if (!completedVisible) {
        await page.reload();
        await page.waitForTimeout(3000);
        continue;
      }
    }
    await page.getByRole('button', { name: 'اعتماد' }).click();
    await page.getByRole('button', { name: 'موافق' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'رجوع' }).click();
    await (0, LogSteps_1.logStep)('Step 06: Upload the project media');
    // //Upload media
    await page
      .locator('span')
      .filter({ hasText: /المحتوى المرئي/i })
      .first()
      .click();
    const bannerImagePath = path.join(process.cwd(), 'src', 'data', 'Sample image.jpg');
    await page.locator("//h1[contains (text(), 'الصورة الإعلانية')]/parent::div/following-sibling::div/child::input[@type='file']").setInputFiles(bannerImagePath);
    await page.locator("//mat-icon[contains (text(), 'file_upload')]").click();
    await page.waitForTimeout(30000);
    await page
      .locator('div')
      .filter({ hasText: /^Display method$/ })
      .first()
      .click();
    await page.getByText('Hero').click();
    await page.getByRole('textbox', { name: 'عنوان صفحة التفاصيل (باللغة العربية)' }).fill(projectName);
    await page.getByRole('textbox', { name: 'عنوان صفحة التفاصيل (باللغة الإنجليزية)' }).fill(projectName);
    await page.getByRole('textbox', { name: 'تاريخ جهوزية أول وحدة' }).fill('2026-01-01');
    await page.getByRole('textbox', { name: 'الاسم (باللغة العربية)' }).fill('test bb');
    await page.getByRole('textbox', { name: 'الاسم (باللغة الإنجليزية)' }).fill('test bb');
    await page.getByRole('textbox', { name: 'الملخص AR' }).fill('الملخص ARالملخص ARالملخص ARالملخص ARالملخص ARالملخص ARالملخص ARالملخص AR');
    await page.getByRole('textbox', { name: 'ملخص EN' }).fill('Summary EN Summary EN Summary EN Summary EN Summary EN Summary EN Summary EN Summary EN Summary EN');
    await page
      .getByRole('textbox', { name: 'الوصف (باللغة العربية)' })
      .fill('الوصف (باللغة العربية)الوصف (باللغة العربية)الوصف (باللغة العربية)الوصف (باللغة العربية)الوصف (باللغة العربية)الوصف (باللغة العربية)الوصف (باللغة العربية)');
    await page
      .getByRole('textbox', { name: 'الوصف (باللغة الإنجليزية)' })
      .fill('Description EN Description EN Description EN Description EN Description EN Description EN Description EN Description EN Description EN');
    await page.getByRole('textbox', { name: 'السعر يبدأ من' }).fill('500000');
    await page.getByRole('spinbutton', { name: 'خط العرض' }).fill('1.1');
    await page.getByRole('spinbutton', { name: 'خط الطول' }).fill('1.1');
    await (0, pages_fixture_1.expect)(page.locator("//button[contains (@class, 'uploadStatus')]")).toBeVisible({ timeout: 120000 });
    await page.locator("input[formcontrolname='guarantees_after_service']").fill('الضمانات وخدمة ما بعد البيع');
    await page.waitForTimeout(1000);
    await page.locator('#save_btn').click();
    await (0, LogSteps_1.logStep)('Step 07: Approve the uploaded media');
    // // Approve media
    await page.getByRole('tab', { name: 'تفاصيل المشروع' }).click();
    await page.waitForTimeout(20000);
    await page.getByRole('button', { name: 'تقديم طلب موافقة على نشر المحتوى المرفوع' }).click();
    await page.getByRole('button', { name: 'قبول المحتوى المرئي المرفوع' }).click();
    await page.getByRole('button', { name: 'إبقاء المشروع غير منشور' }).click();
    await page.getByRole('button', { name: 'حفظ' }).click();
    await (0, pages_fixture_1.expect)(saveSuccessToast).toBeVisible({ timeout: 120000 });
    await (0, LogSteps_1.logStep)('Step 08: Publish the unit model');
    // // Publish unit model
    await page.getByText('نماذج الوحدات').click();
    await page.getByRole('cell', { name: 'model_1' }).click();
    await page.getByRole('button', { name: 'حفظ' }).click();
    await page.getByText('المحتوى المرئي ( مسودة )').click();
    await page.getByRole('button', { name: 'حفظ' }).click();
    await page.waitForTimeout(30000);
    await page.getByRole('button', { name: 'تقديم طلب موافقة على نشر المحتوى المرفوع' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'قبول المحتوى المرئي المرفوع' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'وحدة النشر' }).click();
    await page.locator('a').filter({ hasText: 'model_1 - شقة' }).click();
    await page.waitForTimeout(10000);
    await (0, LogSteps_1.logStep)('Step 09: Set project as available and bookable > Publish the project');
    // Navigate to project details page
    await page.getByText('تفاصيل المشروع').click();
    // Select status to be available
    await page.locator("//mat-select[@formcontrolname='status']").click();
    await page.getByRole('option', { name: 'متاح' }).click();
    //Save project details
    await page.getByRole('button', { name: 'حفظ' }).click();
    // Check the bookable toggle
    const bookingAvailableToggle = page.locator("//label[contains (text(), 'قابل للحجز')]/preceding-sibling::button");
    await (0, pages_fixture_1.expect)(bookingAvailableToggle).toBeVisible({ timeout: 30000 });
    const isBookingAvailable = await bookingAvailableToggle.getAttribute('aria-checked');
    if (isBookingAvailable === 'false') {
      await bookingAvailableToggle.click();
      await (0, pages_fixture_1.expect)(bookingAvailableToggle).toHaveAttribute('aria-checked', 'true');
    } else {
      await (0, pages_fixture_1.expect)(bookingAvailableToggle).toHaveAttribute('aria-checked', 'true');
    }
    // Publish project
    const publishProjectToggle = page.locator("//label[contains (text(), 'هل تم نشر المشروع')]/preceding-sibling::button");
    await (0, pages_fixture_1.expect)(publishProjectToggle).toBeVisible({ timeout: 30000 });
    const isPublished = await publishProjectToggle.getAttribute('aria-checked');
    if (isPublished === 'false') {
      await publishProjectToggle.click();
      await (0, pages_fixture_1.expect)(publishProjectToggle).toHaveAttribute('aria-checked', 'true');
    } else {
      await (0, pages_fixture_1.expect)(publishProjectToggle).toHaveAttribute('aria-checked', 'true');
    }
    await page.getByRole('button', { name: 'حفظ' }).click();
    await (0, pages_fixture_1.expect)(saveSuccessToast).toBeVisible({ timeout: 120000 });
    /* await page.getByText("تفاصيل المشروع").click();
    
           // Select Comprehensive journey
           await page.keyboard.press('PageDown');
           await waitAndClick(page.locator("//span[contains(text(), 'إعدادات المشاريع')]"))
    
           await waitAndClick(page.locator("mat-slide-toggle[formcontrolname='using_general_active_offplan_comprehensive'] button"));
    
           await page.keyboard.press('PageDown');
           await page.getByRole("button", {name: "حفظ"}).click();
           await expect(saveSuccessToast).toBeVisible({timeout: 120000});*/
  });
  (0, pages_fixture_1.test)('TC-02 Developer adds payment schedules', { annotation: [{ product: 'Marketplace', type: 'critical' }] }, async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const projectName = data.projectName;
    const developerUserId = data.developerUserId;
    await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
    await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await app.developerProjectPage.loginDeveloper(developerUserId);
    await app.developerProjectPage.switchRoleToDeveloper();
    await (0, LogSteps_1.logStep)('Step 02: Search for the project > Open it');
    await app.developerProjectPage.openProjectBySearch(projectName);
    await (0, LogSteps_1.logStep)('Step 03: Open payment schedules > Add cash payment schedule');
    await app.developerProjectPage.openPaymentSchedulesTab();
    await app.developerProjectPage.addPaymentSchedule({
      type: 'cash',
      scheduleName: 'Cash 22',
      completionPercentageOneValue: '100',
      percentageOneValue: '50',
      completionPercentageTwoValue: '100',
      percentageTwoValue: '50',
    });
  });
  (0, pages_fixture_1.test)('TC-03 Developer approves sales contract for companies', { annotation: [{ product: 'Marketplace', type: 'critical' }] }, async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const projectName = data.projectName;
    const developerUserId = data.developerUserId;
    await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
    await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await app.developerProjectPage.loginDeveloper(developerUserId);
    await app.developerProjectPage.switchRoleToDeveloper();
    await (0, LogSteps_1.logStep)('Step 02: Search for the project > Open it');
    await app.developerProjectPage.openProjectBySearch(projectName);
    await (0, LogSteps_1.logStep)('Step 03: Open companies sales contracts > Approve the sales contract');
    await app.developerProjectPage.openSalesContractsTab();
    await app.developerProjectPage.clickOnCompanies();
    await app.developerProjectPage.viewAndApproveSalesContract();
    await app.developerProjectPage.approveUnitSpecification();
    await app.developerProjectPage.fillOtp('1234');
    await app.developerProjectPage.verifyOtp();
  });
  (0, pages_fixture_1.test)('TC-04 Developer create new booking for a company user', { annotation: [{ product: 'Marketplace', type: 'critical' }] }, async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const developerUserId = data.developerUserId;
    const projectName = data.projectName;
    await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
    await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await app.developerProjectPage.loginDeveloper(developerUserId);
    await app.developerProjectPage.switchRoleToDeveloper();
    await (0, LogSteps_1.logStep)('Step 02: Start new booking for a company user > Search by ID and CR');
    await app.developerProjectPage.bookUnitsForCompanies(data.companyUser, data.companyCR, projectName);
    await page.waitForTimeout(10000);
    await (0, LogSteps_1.logStep)('Step 03: Select the unit > Keep booking');
    await waitAndClick(unitCheckbox(page, 1));
    await app.developerProjectPage.clickOnNextButton();
    await app.developerProjectPage.clickOnKeepBooking();
    await (0, LogSteps_1.logStep)('Step 04: Select the bank');
    // Select the bank
    await app.developerProjectPage.clickOnBankDropdown();
    await app.developerProjectPage.selectCRMBank();
    await app.developerProjectPage.clickOnNextButton();
    await page.waitForTimeout(1000);
    await (0, LogSteps_1.logStep)('Step 05: Confirm the booking > Verify company booking is confirmed');
    await app.developerProjectPage.confirmBookingForCompanies();
    (0, pages_fixture_1.expect)(await app.developerProjectPage.isCompanyBookingConfirmed()).toBe(true);
  });
  (0, pages_fixture_1.test)('TC-05 User pays the invoices for all units', { annotation: [{ product: 'Marketplace', type: 'critical' }] }, async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const companyUserId = data.companyUser;
    const userPortalUrl = environments.userPortalUrl;
    await (0, LogSteps_1.logStep)('Step 01: Navigate to user portal > Login as company user');
    await app.loginPage.gotoHomePage(userPortalUrl);
    //await app.loginPage.acceptCookies();
    await app.loginPage.openLogin();
    await app.loginPage.loginWithNafath(companyUserId);
    await app.loginPage.waitForNafathPromptToDisappear();
    //await app.loginPage.continueNewUserPopup();
    //await app.loginPage.handlePushNotificationPopup();
    await (0, LogSteps_1.logStep)('Step 02: Navigate to companies > Company reservations > Active bookings > Not billed');
    await app.marketplaceLandingPage.openProfileManagement();
    await app.offPlanBasketMultipleBookingPage.clickOnCompanies();
    await app.offPlanBasketMultipleBookingPage.clickOnCompanyReservations();
    await app.offPlanBasketMultipleBookingPage.clickOnCompanyActiveBookings();
    await app.offPlanBasketMultipleBookingPage.clickOnNotBilled();
    await page.waitForTimeout(2000);
    await (0, LogSteps_1.logStep)('Step 03: Save the company unit code to test data');
    companyUnitCode = await app.offPlanBasketMultipleBookingPage.getCompanyUnitCode();
    writeServiceData('companyUnitCode', companyUnitCode);
    await (0, LogSteps_1.logStep)('Step 04: Show booking details > Pay the reservation fees');
    await app.offPlanBasketMultipleBookingPage.clickOnShowDetails();
    await page.waitForTimeout(2000);
    await app.offPlanBasketMultipleBookingPage.clickOnCompanyReservationFeesPayment();
    await app.paymentGatewayPage.fillCardDetails();
    await page.waitForTimeout(5000);
  });
  (0, pages_fixture_1.test)('TC-06 User signs sale contract for all units', async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const companyUserId = data.companyUser;
    const userPortalUrl = environments.userPortalUrl;
    await (0, LogSteps_1.logStep)('Step 01: Navigate to user portal > Login as company user');
    await app.loginPage.gotoHomePage(userPortalUrl);
    //await app.loginPage.acceptCookies();
    await app.loginPage.openLogin();
    await app.loginPage.loginWithNafath(companyUserId);
    await app.loginPage.waitForNafathPromptToDisappear();
    //await app.loginPage.continueNewUserPopup();
    //await app.loginPage.handlePushNotificationPopup();
    await (0, LogSteps_1.logStep)('Step 02: Navigate to companies > Company reservations > Active bookings > Ready for sign');
    await app.marketplaceLandingPage.openProfileManagement();
    await app.offPlanBasketMultipleBookingPage.clickOnCompanies();
    await app.offPlanBasketMultipleBookingPage.clickOnCompanyReservations();
    await app.offPlanBasketMultipleBookingPage.clickOnCompanyActiveBookings();
    await app.offPlanBasketMultipleBookingPage.clickOnReadyForSign();
    await (0, LogSteps_1.logStep)('Step 03: Select the unit > Continue');
    await app.offPlanBasketMultipleBookingPage.clickOnUnit1CheckBox();
    await app.offPlanBasketMultipleBookingPage.clickOnContinue();
    await (0, LogSteps_1.logStep)('Step 04: Agree on the sale contract > Verify OTP > Verify contract is signed');
    await app.offPlanBasketMultipleBookingPage.clickOnProjectCheckBox();
    await app.offPlanBasketMultipleBookingPage.clickOnAgreeOnAll();
    await app.offPlanBasketMultipleBookingPage.typeVerifyOtpCode();
    await app.offPlanBasketMultipleBookingPage.clickOnVerify();
    await pages_fixture_1.expect.poll(() => app.offPlanBasketMultipleBookingPage.isSuccessfulContractSignMessage(), { timeout: LONG_TIMEOUT }).toBe(true);
  });
  (0, pages_fixture_1.test)('TC-07 Developer confirms the bookings for companies', async ({ page }) => {
    const data = readServiceData();
    const environments = readEnvironments();
    const app = new web_app_1.WebApp(page);
    const developerUserId = data.developerUserId;
    await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
    await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
    await app.developerProjectPage.loginDeveloper(developerUserId);
    await app.developerProjectPage.switchRoleToDeveloper();
    await (0, LogSteps_1.logStep)('Step 02: Confirm the company booking > Verify success message');
    await app.developerProjectPage.confirmCompanyBooking(data.companyUnitCode);
    await pages_fixture_1.expect.poll(() => app.developerProjectPage.isSuccessfulConfirmationMessageVisible(), { timeout: LONG_TIMEOUT }).toBe(true);
  });
});
