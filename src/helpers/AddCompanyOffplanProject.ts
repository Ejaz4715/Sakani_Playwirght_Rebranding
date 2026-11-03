import { expect, Page } from '@playwright/test';
import path from 'node:path';
import { WebApp } from '@base-class/web-app';
import { DateUtils } from '@pages/utils/DateUtils';
import { DataHelper } from '@helpers/DataHelper';
import { logStep } from '@helpers/LogSteps';

/**
 * Admin adds a new offplan moh land project with company units (OffPlanCompany.xlsx) for selling units to companies.
 * Reads admin credentials from the given service's data and saves the generated projectName back to it.
 */
export async function addOffplanProjectForCompanies(page: Page, service: string, projectNamePrefix = 'Automation Project') {
  const data = DataHelper.readData().services[service];
  const environments = DataHelper.readData().environments;
  const app = new WebApp(page);

  const currentDate = DateUtils.getDateWithOffset(600);
  const projectName = `${projectNamePrefix} ${new Date()
    .toISOString()
    .replace(/[-:T.]/g, '')
    .slice(0, 14)}`;
  DataHelper.updateServiceData(service, 'projectName', projectName);

  // Project details

  await logStep('Step 01: Navigate to admin portal > Login');
  await app.adminProjectPage.login(environments.adminPortalUrl, data.adminUsername, data.adminPassword);

  await logStep('Step 02: Create new project > Fill project details > Save');
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

  await expect(projectTypeOption).toBeVisible({ timeout: 30000 });
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
  await expect(saveSuccessToast).toBeVisible({ timeout: 120000 });

  await logStep('Step 03: Link the project with AZM');
  // Link with AZM
  await page.waitForTimeout(3000);
  const azmToggle = page.locator("//label[contains (text(), 'AZM')]/preceding-sibling::button");
  const isAzmLinked = await azmToggle.getAttribute('aria-checked');
  if (isAzmLinked === 'false') {
    await azmToggle.click();
    await page.waitForTimeout(5000);
    await expect(azmToggle).toHaveAttribute('aria-checked', 'true');
  } else {
    await expect(azmToggle).toHaveAttribute('aria-checked', 'true');
  }

  await logStep('Step 04: Select the participating banks');
  // Partcipating banks
  await expect(page.getByText(/قائمة الجهات التمويلية/i)).toBeVisible({
    timeout: 30000,
  });
  await page.getByText(/قائمة الجهات التمويلية/i).click();
  await expect(page.getByRole('checkbox', { name: 'Select all rows' })).toBeVisible({ timeout: 30000 });
  // "Select all rows" selects nothing until the bank rows load
  await app.adminProjectPage.expectFinancingEntitiesRowsLoaded();
  await page.getByRole('checkbox', { name: 'Select all rows' }).click();
  await page.getByRole('button', { name: 'حفظ' }).click();

  await logStep('Step 05: Import the project units > Approve the import');
  // Import units
  await page.getByRole('tab', { name: 'الوحدات', exact: true }).click();
  await expect(page.getByRole('button', { name: 'استيراد وحدة جديدة' })).toBeVisible({ timeout: 30000 });
  await page.getByRole('button', { name: 'استيراد وحدة جديدة' }).click();
  await expect(page.getByRole('combobox', { name: 'نوع الوحدة السكنية' })).toBeVisible({ timeout: 30000 });
  await page.waitForTimeout(3000);
  // The dropdown can be clicked before it is ready and not open, so retry until the option is displayed
  await expect(async () => {
    await page.getByRole('combobox', { name: 'نوع الوحدة السكنية' }).click();
    await expect(page.getByRole('option', { name: 'شقة' })).toBeVisible({ timeout: 5000 });
  }).toPass({ timeout: 60000 });
  await page.getByRole('option', { name: 'شقة' }).click();
  const unitsImportFilePath = path.join(process.cwd(), 'src', 'data', 'OffPlanCompany.xlsx');
  await page.locator("//input[@type='file']").setInputFiles(unitsImportFilePath);
  await page.getByRole('button', { name: ' حفظ' }).click();

  const importInProgress = page.getByText('تحت الإجراء ...', { exact: true });
  const fileProcessedMessage = page.getByText('تم إكمال الإجراء', {
    exact: true,
  });
  // A quick import goes straight to تم إكمال الإجراء without showing تحت الإجراء
  await expect(importInProgress.or(fileProcessedMessage)).toBeVisible({ timeout: 120000 });
  await page.waitForTimeout(5000);
  await page.reload();
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

  await logStep('Step 06: Upload the project media');
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
  await expect(page.locator("//button[contains (@class, 'uploadStatus')]")).toBeVisible({ timeout: 120000 });
  await page.locator("input[formcontrolname='guarantees_after_service']").fill('الضمانات وخدمة ما بعد البيع');
  await page.waitForTimeout(1000);
  await page.locator('#save_btn').click();

  await logStep('Step 07: Approve the uploaded media');
  // // Approve media
  await page.getByRole('tab', { name: 'تفاصيل المشروع' }).click();
  await page.waitForTimeout(20000);
  // The request approval button can be displayed only after reloading the page and saving the media again
  const projectMediaApprovalButton = page.getByRole('button', { name: 'تقديم طلب موافقة على نشر المحتوى المرفوع' });
  if (!(await projectMediaApprovalButton.isVisible())) {
    await page.reload();
    await app.adminProjectPage.clickProjectMediaTab();
    await app.adminProjectPage.clickMediaSaveButton();
    await page.waitForTimeout(3000);
    await app.adminProjectPage.clickProjectDetailsTab();
    await page.waitForTimeout(10000);
  }
  // The media can be already approved after saving it again, then the request approval button is not displayed
  if (await projectMediaApprovalButton.isVisible()) {
    await projectMediaApprovalButton.click();
    await page.getByRole('button', { name: 'قبول المحتوى المرئي المرفوع' }).click();
    await page.getByRole('button', { name: 'إبقاء المشروع غير منشور' }).click();
    await page.getByRole('button', { name: 'حفظ' }).click();
    await expect(saveSuccessToast).toBeVisible({ timeout: 120000 });
  }

  await logStep('Step 08: Publish the unit model');
  // // Publish unit model
  await page.getByText('نماذج الوحدات').click();
  await page.getByRole('cell', { name: 'model_1' }).click();
  await page.getByRole('button', { name: 'حفظ' }).click();
  await page.getByText('المحتوى المرئي ( مسودة )').click();
  await page.getByRole('button', { name: 'حفظ' }).click();
  await page.waitForTimeout(30000);
  // The unit model media can be already approved and published after saving, then the request approval button is not displayed
  const requestMediaApprovalButton = page.getByRole('button', { name: 'تقديم طلب موافقة على نشر المحتوى المرفوع' });
  if (await requestMediaApprovalButton.isVisible()) {
    await requestMediaApprovalButton.click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'قبول المحتوى المرئي المرفوع' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'وحدة النشر' }).click();
  }
  await page.locator('a').filter({ hasText: 'model_1 - شقة' }).click();

  await page.waitForTimeout(10000);

  await logStep('Step 09: Set project as available and bookable > Publish the project');
  // Navigate to project details page
  await page.getByText('تفاصيل المشروع').click();

  // Select status to be available
  await page.locator("//mat-select[@formcontrolname='status']").click();
  await page.getByRole('option', { name: 'متاح' }).click();

  //Save project details
  await page.getByRole('button', { name: 'حفظ' }).click();

  // Check the bookable toggle
  const bookingAvailableToggle = page.locator("//label[contains (text(), 'قابل للحجز')]/preceding-sibling::button");
  await expect(bookingAvailableToggle).toBeVisible({ timeout: 30000 });
  const isBookingAvailable = await bookingAvailableToggle.getAttribute('aria-checked');
  if (isBookingAvailable === 'false') {
    await bookingAvailableToggle.click();
    await expect(bookingAvailableToggle).toHaveAttribute('aria-checked', 'true');
  } else {
    await expect(bookingAvailableToggle).toHaveAttribute('aria-checked', 'true');
  }

  // Publish project
  const publishProjectToggle = page.locator("//label[contains (text(), 'هل تم نشر المشروع')]/preceding-sibling::button");
  await expect(publishProjectToggle).toBeVisible({ timeout: 30000 });
  // The project can be already published after approving the media (the published switch is on)
  const publishedSwitch = page.getByRole('switch', { name: /هل تم نشر المشروع/, checked: true });
  const isAlreadyPublished = (await publishedSwitch.count()) > 0;
  const isPublished = await publishProjectToggle.getAttribute('aria-checked');
  if (!isAlreadyPublished && isPublished === 'false') {
    await publishProjectToggle.click();
    await expect(publishProjectToggle).toHaveAttribute('aria-checked', 'true');
  } else if (!isAlreadyPublished) {
    await expect(publishProjectToggle).toHaveAttribute('aria-checked', 'true');
  }

  await page.getByRole('button', { name: 'حفظ' }).click();
  await expect(saveSuccessToast).toBeVisible({ timeout: 120000 });

  return projectName;
}
