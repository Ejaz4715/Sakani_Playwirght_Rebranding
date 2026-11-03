import { Page } from '@playwright/test';
import { WebApp } from '@base-class/web-app';
import { DataHelper } from '@helpers/DataHelper';
import { logStep } from '@helpers/LogSteps';

/**
 * Developer adds a flexible payment schedule (Completion percentage) for the project saved in the given service's data.
 */
export async function addFlexiblePaymentSchedule(page: Page, service: string) {
  const data = DataHelper.readData().services[service];
  const environments = DataHelper.readData().environments;
  const app = new WebApp(page);
  const projectName = data.projectName;
  const developerUserId = data.developerUserId;

  await logStep('Step 01: Login as developer to sapa portal and open the project');
  await app.partnersLoginPage.gotoAuth(environments.sapaPortalUrl);
  await app.partnersLoginPage.loginToSapaPortal(developerUserId);
  await app.partnersLoginPage.switchRoleToDeveloper();

  await logStep('Step 02: Define the schedule name in AR and EN');
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:T.]/g, '')
    .slice(0, 14);
  const scheduleTitleAr = `جدول دفع مرن لخدمات أتمتة الاختبارات ${timestamp}`;
  const scheduleTitleEn = `Automation Flexible Payment Schedule ${timestamp}`;
  DataHelper.updateServiceData(service, 'scheduleTitleAr', scheduleTitleAr);
  DataHelper.updateServiceData(service, 'scheduleTitleEn', scheduleTitleEn);

  await logStep('Step 03: Navigate to financials management > Payment Schedules');
  await app.flexiblePaymentPage.clickOnFinancialManagement();
  await app.flexiblePaymentPage.clickOnPaymentSchedules();

  await logStep('Step 04: Navigate to add new flexible payment schedule > Provide basic details');
  await app.flexiblePaymentPage.clickOnNewSchedulesButton();
  await app.flexiblePaymentPage.enterScheduleNameInArabic(scheduleTitleAr);
  await app.flexiblePaymentPage.enterScheduleNameInEnglish(scheduleTitleEn);
  await app.flexiblePaymentPage.selectScheduleType('completionPercentage');
  await app.flexiblePaymentPage.clickOnNextButton();

  await logStep('Step 05: Select the payment percentage and completion percentage of all the installments');
  await app.flexiblePaymentPage.fillFirstPaymentPaidPercentage(50);
  await app.flexiblePaymentPage.fillFirstPaymentCompletionPercentage(20);
  await app.flexiblePaymentPage.fillSecondPaymentPaidPercentage(30);
  await app.flexiblePaymentPage.fillSecondPaymentCompletionPercentage(30);
  await app.flexiblePaymentPage.fillThirdPaymentPaidPercentage(20);
  await app.flexiblePaymentPage.fillThirdPaymentCompletionPercentage(100);
  await app.flexiblePaymentPage.clickOnNextButton();

  await logStep('Step 06: Search and select project');
  await app.flexiblePaymentPage.serachByprojectName(projectName);
  await app.flexiblePaymentPage.checkOnProjectNameSearchedResult();
  await app.flexiblePaymentPage.clickOnNextButton();

  await logStep('Step 07: Review the summary and move to next section');
  await app.flexiblePaymentPage.clickOnNextButton();

  await logStep('Step 08: Confirm the schedule > Validate the success message');
  await app.flexiblePaymentPage.clickOnConfirmButton();
  await app.flexiblePaymentPage.verifyTheSuccessfulMessage();
}
