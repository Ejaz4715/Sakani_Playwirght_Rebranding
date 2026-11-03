import { Browser, Page, test } from '@playwright/test';
import { DataHelper } from '@helpers/DataHelper';
import { logStep } from '@helpers/LogSteps';
import { addOffplanProjectForMultipleBooking } from '@helpers/AddOffplanProject';
import { addFlexiblePaymentSchedule } from '@helpers/AddFlexiblePaymentSchedule';
import { developerApprovesSalesContract } from '@helpers/DeveloperApproveSalesContract';
import { developerBooksUnits } from '@helpers/DeveloperBookUnits';
import { completeDeveloperBooking } from '@helpers/UserBooksAndPaysFlexible';
import { adminEnablesProjectSettings } from '@helpers/AdminEnablesProjectSettings';
import { developerApprovesCompanySalesContract, developerBooksUnitForCompany, companyUserPaysAndSignsContract, developerConfirmsCompanyBooking } from '@helpers/CompanyBooking';

const SERVICE = 'offPlan-basket-multiple-booking';

async function runInNewBrowser(browser: Browser, steps: (page: Page) => Promise<unknown>) {
  const context = await browser.newContext();
  const page = await context.newPage();
  await steps(page);
  await context.close();
}

// The company test cases use the same create project steps as the individual and unit basket test cases, with the company units
async function setupProject(browser: Browser, isCompany = false) {
  await logStep('Pre-condition 01: Admin creates a new project');
  await runInNewBrowser(browser, (newPage) => addOffplanProjectForMultipleBooking(newPage, SERVICE, 'Doctor test', isCompany));
  await logStep('Pre-condition 02: Developer approves the sales contract');
  await runInNewBrowser(browser, (newPage) => developerApprovesSalesContract(newPage, SERVICE));
  await logStep('Pre-condition 03: Developer adds a flexible payment schedule');
  await runInNewBrowser(browser, (newPage) => addFlexiblePaymentSchedule(newPage, SERVICE));
  if (!isCompany) {
    await logStep('Pre-condition 04: Admin enables comprehensive booking, multiple units booking and automation payment');
    await runInNewBrowser(browser, (newPage) => adminEnablesProjectSettings(newPage, SERVICE));
  }
}

async function runPreConditions(browser: Browser, unitsCount: number, customerId?: string) {
  await setupProject(browser);
  await logStep(`Pre-condition 05: Developer books ${unitsCount} unit(s) for a sakani user`);
  await runInNewBrowser(browser, (newPage) => developerBooksUnits(newPage, SERVICE, unitsCount, customerId));
}

async function companyBookingFlow(browser: Browser, page: Page, companyUserId: string, companyCR: string) {
  await setupProject(browser, true);
  await logStep('Pre-condition 05: Developer approves the companies sales contract');
  await runInNewBrowser(browser, (newPage) => developerApprovesCompanySalesContract(newPage, SERVICE));
  await logStep('Pre-condition 06: Developer books a unit for the company user');
  await runInNewBrowser(browser, (newPage) => developerBooksUnitForCompany(newPage, SERVICE, companyUserId, companyCR));

  await companyUserPaysAndSignsContract(page, SERVICE, companyUserId);

  await logStep('Final step: Developer confirms the company booking');
  await runInNewBrowser(browser, (newPage) => developerConfirmsCompanyBooking(newPage, SERVICE));
}

test(
  'TC-01 End-to-End Booking, Payment, and Status Update Flow Using Fixed Payment Schedule for a Bene User Without Addition',
  { annotation: [{ product: 'Sakani _Rebranding', type: 'critical' }] as any },
  async ({ page, browser }) => {
    test.setTimeout(0);
    // Pre-condition 05 books a unit for the same bene user, then the user completes the booking
    const beneUser = DataHelper.readData().services[SERVICE].beneUser;
    await runPreConditions(browser, 1, beneUser);

    await completeDeveloperBooking(page, SERVICE, beneUser);
  }
);

test(
  'TC-02 End-to-End Booking, Payment, and Status Update Flow Using Fixed Payment Schedule for a Non-Bene User Without Addition',
  { annotation: [{ product: 'Sakani _Rebranding', type: 'critical' }] as any },
  async ({ page, browser }) => {
    test.setTimeout(0);
    // Pre-condition 05 books a unit for the same non-bene user, then the user completes the booking
    const nonBeneUser = DataHelper.readData().services[SERVICE].nonBeneUser;
    await runPreConditions(browser, 1, nonBeneUser);

    await completeDeveloperBooking(page, SERVICE, nonBeneUser);
  }
);

test(
  'TC-03 End-to-End Booking, Payment, and Status Update Flow Using Fixed Payment Schedule for a Company Bene User Without Addition',
  { annotation: [{ product: 'Sakani _Rebranding', type: 'critical' }] as any },
  async ({ page, browser }) => {
    test.setTimeout(0);
    const data = DataHelper.readData().services[SERVICE];

    await await companyBookingFlow(browser, page, data.companyBeneUser, data.companyBeneCR);
  }
);

test(
  'TC-04 End-to-End Booking, Payment, and Status Update Flow Using Fixed Payment Schedule for a Company Non-Bene User Without Addition',
  { annotation: [{ product: 'Sakani _Rebranding', type: 'critical' }] as any },
  async ({ page, browser }) => {
    test.setTimeout(0);
    const data = DataHelper.readData().services[SERVICE];
    await companyBookingFlow(browser, page, data.companyNonBeneUser, data.companyNonBeneCR);
  }
);

test(
  'TC-05 End-to-End Booking, Payment, and Status Update Flow Using Fixed Payment Schedule for a Unit Basket for a Bene User',
  { annotation: [{ product: 'Sakani _Rebranding', type: 'critical' }] as any },
  async ({ page, browser }) => {
    test.setTimeout(0);
    // Pre-condition 05 books a unit basket (2 units) for the unit basket user, then the same user completes the booking
    const unitBasketUser = DataHelper.readData().services[SERVICE].unitBasketUser;
    await runPreConditions(browser, 2, unitBasketUser);

    await completeDeveloperBooking(page, SERVICE, unitBasketUser);
  }
);
