'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const test_1 = require('@playwright/test');
const web_app_1 = require('@base-class/web-app');
const DataHelper_1 = require('@helpers/DataHelper');
const LogSteps_1 = require('@helpers/LogSteps');
const SERVICE = 'reservation-management-filters';
const readServiceData = () => DataHelper_1.DataHelper.readData().services[SERVICE];
const readEnvironments = () => DataHelper_1.DataHelper.readData().environments;
test_1.test.describe('Reservation Management Filters', () => {
  (0, test_1.test)(
    'TC-01 Verify that the system can filter eligible and ineligible bookings',
    {
      annotation: [
        {
          product: 'Marketplace',
          type: 'non-critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const developerUserId = data.developerUserId;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
      await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
      await app.developerProjectPage.loginDeveloper(developerUserId);
      await app.developerProjectPage.switchRoleToDeveloper();
      await (0, LogSteps_1.logStep)('Step 02: Open projects > Individual bookings');
      await app.developerProjectPage.openProjectsPage();
      await app.developerProjectPage.clickOnIndividualBookings();
      await (0, LogSteps_1.logStep)('Step 03: Filter by beneficiary bookings > Search > Verify search results are visible');
      await app.reservationManagementFiltersPage.clickOnFilter();
      await app.reservationManagementFiltersPage.filterUsingBeneficiaryBookings();
      await app.reservationManagementFiltersPage.clickOnSearch();
      (0, test_1.expect)(await app.reservationManagementFiltersPage.isSearchResultTableVisible()).toEqual(true);
      await (0, LogSteps_1.logStep)('Step 04: Filter by non-beneficiary bookings > Search > Verify search results are visible');
      await app.reservationManagementFiltersPage.clickOnFilter();
      await app.reservationManagementFiltersPage.filterUsingNonBeneficiaryBookings();
      await app.reservationManagementFiltersPage.clickOnSearch();
      (0, test_1.expect)(await app.reservationManagementFiltersPage.isSearchResultTableVisible()).toEqual(true);
    }
  );
  (0, test_1.test)(
    'TC-02 Verify that the system can display all booking statuses and allow filtering based on them',
    {
      annotation: [
        {
          product: 'Marketplace',
          type: 'non-critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const developerUserId = data.developerUserId;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
      await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
      await app.developerProjectPage.loginDeveloper(developerUserId);
      await app.developerProjectPage.switchRoleToDeveloper();
      await (0, LogSteps_1.logStep)('Step 02: Open projects > Individual bookings');
      await app.developerProjectPage.openProjectsPage();
      await app.developerProjectPage.clickOnIndividualBookings();
      await (0, LogSteps_1.logStep)('Step 03: Filter by booking status > Verify all bookings have the same status');
      await app.reservationManagementFiltersPage.clickOnIndividualBookingsStatusFilter();
      const texts1 = await app.reservationManagementFiltersPage.getIndividualBookingsStatusColumnTexts();
      console.log(texts1);
      (0, test_1.expect)(texts1.length).toBeGreaterThan(0);
      (0, test_1.expect)(texts1.every((t) => t === texts1[0])).toBe(true);
      await (0, LogSteps_1.logStep)('Step 04: Change the status filter > Verify all bookings have the same status, different from the first filter');
      await app.reservationManagementFiltersPage.clickOnIndividualBookingsStatusFilter();
      const texts2 = await app.reservationManagementFiltersPage.getIndividualBookingsStatusColumnTexts();
      console.log(texts2);
      (0, test_1.expect)(texts2.length).toBeGreaterThan(0);
      (0, test_1.expect)(texts2.every((t) => t === texts2[0])).toBe(true);
      (0, test_1.expect)(texts1).not.toEqual(texts2);
    }
  );
  (0, test_1.test)(
    'TC-03 Verify that the system can display booking details',
    {
      annotation: [
        {
          product: 'Marketplace',
          type: 'non-critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const developerUserId = data.developerUserId;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
      await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
      await app.developerProjectPage.loginDeveloper(developerUserId);
      await app.developerProjectPage.switchRoleToDeveloper();
      await (0, LogSteps_1.logStep)('Step 02: Open projects > Individual bookings');
      await app.developerProjectPage.openProjectsPage();
      await app.developerProjectPage.clickOnIndividualBookings();
      await (0, LogSteps_1.logStep)('Step 03: View the first booking details > Bookings tab > Verify booking details are visible');
      await app.reservationManagementFiltersPage.viewTheFirstBookingDetails();
      await app.reservationManagementFiltersPage.clickOnBookings();
      (0, test_1.expect)(await app.reservationManagementFiltersPage.areBookingDetailsVisible()).toEqual(true);
    }
  );
  (0, test_1.test)(
    'TC-04 Verify that the system can display all company booking statuses and allow filtering based on them',
    {
      annotation: [
        {
          product: 'Marketplace',
          type: 'non-critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const developerUserId = data.developerUserId;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
      await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
      await app.developerProjectPage.loginDeveloper(developerUserId);
      await app.developerProjectPage.switchRoleToDeveloper();
      await (0, LogSteps_1.logStep)('Step 02: Open projects > Company bookings');
      await app.developerProjectPage.openProjectsPage();
      await app.developerProjectPage.clickOnCompanyBookings();
      await (0, LogSteps_1.logStep)('Step 03: Filter by company booking status > Verify all bookings have the same status');
      await app.reservationManagementFiltersPage.clickOnCompanyBookingsStatusFilter();
      const texts1 = await app.reservationManagementFiltersPage.getCompanyBookingsStatusColumnTexts();
      console.log(texts1);
      (0, test_1.expect)(texts1.length).toBeGreaterThan(0);
      (0, test_1.expect)(texts1.every((t) => t === texts1[0])).toBe(true);
      await (0, LogSteps_1.logStep)('Step 04: Change the status filter > Verify all bookings have the same status, different from the first filter');
      await app.reservationManagementFiltersPage.clickOnCompanyBookingsStatusFilter();
      const texts2 = await app.reservationManagementFiltersPage.getCompanyBookingsStatusColumnTexts();
      console.log(texts2);
      (0, test_1.expect)(texts2.length).toBeGreaterThan(0);
      (0, test_1.expect)(texts2.every((t) => t === texts2[0])).toBe(true);
      (0, test_1.expect)(texts1).not.toEqual(texts2);
    }
  );
  (0, test_1.test)(
    'TC-05 Verify that the system can display the company booking details',
    {
      annotation: [
        {
          product: 'Marketplace',
          type: 'non-critical',
        },
      ],
    },
    async ({ page }) => {
      const data = readServiceData();
      const environments = readEnvironments();
      const app = new web_app_1.WebApp(page);
      const developerUserId = data.developerUserId;
      await (0, LogSteps_1.logStep)('Step 01: Navigate to partners portal > Login as developer');
      await app.developerProjectPage.gotoAuth(environments.sapaPortalUrl);
      await app.developerProjectPage.loginDeveloper(developerUserId);
      await app.developerProjectPage.switchRoleToDeveloper();
      await (0, LogSteps_1.logStep)('Step 02: Open projects > Company bookings');
      await app.developerProjectPage.openProjectsPage();
      await app.developerProjectPage.clickOnCompanyBookings();
      await (0, LogSteps_1.logStep)('Step 03: View the first company booking details > Bookings tab > Verify booking details are visible');
      await app.reservationManagementFiltersPage.viewTheFirstBookingDetails();
      await app.reservationManagementFiltersPage.clickOnBookings();
      (0, test_1.expect)(await app.reservationManagementFiltersPage.areBookingDetailsVisible()).toEqual(true);
    }
  );
});
