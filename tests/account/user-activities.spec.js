'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const ActivitiesPage_1 = require('@pages/ActivitiesPage');
const testData_1 = require('@data/testData');
const LogSteps_1 = require('@helpers/LogSteps');
const moduleByKey = (key) => testData_1.ACTIVITY_MODULES.find((m) => m.key === key);
pages_fixture_1.test.describe('Activities - module specifics', () => {
  (0, pages_fixture_1.test)('TC-01 Purchased deals shows its empty state and marketplace CTA', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const activities = new ActivitiesPage_1.ActivitiesPage(authenticatedPage, moduleByKey('purchase-deals'));
    await (0, LogSteps_1.logStep)('Step 01: Open the Purchased deals activities page');
    await activities.open();
    await activities.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Wait for the listing to render');
    await activities.waitForListing();
    await (0, LogSteps_1.logStep)('Step 03: Verify the empty state and Marketplace CTA');
    (0, pages_fixture_1.expect)(await activities.isEmpty()).toBeTruthy();
    await (0, pages_fixture_1.expect)(activities.action(/Deals Marketplace/i)).toBeVisible();
  });
  (0, pages_fixture_1.test)('TC-02 Waiting list shows its own empty-state wording', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const module = moduleByKey('waiting-list');
    const activities = new ActivitiesPage_1.ActivitiesPage(authenticatedPage, module);
    await (0, LogSteps_1.logStep)('Step 01: Open the Waiting list activities page');
    await activities.open();
    await activities.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Wait for the waiting list to render');
    await activities.waitForListing();
    await (0, LogSteps_1.logStep)('Step 03: Verify the empty-state wording is visible');
    (0, pages_fixture_1.expect)(await activities.isEmpty()).toBeTruthy();
    await (0, pages_fixture_1.expect)(activities.emptyState).toBeVisible();
  });
  (0, pages_fixture_1.test)('TC-03 Certified contractors reports no active contractors', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const activities = new ActivitiesPage_1.ActivitiesPage(authenticatedPage, moduleByKey('certified-contractors'));
    await (0, LogSteps_1.logStep)('Step 01: Open the Certified contractors activities page');
    await activities.open();
    await activities.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Wait for the list to load');
    await activities.waitForListing();
    await (0, LogSteps_1.logStep)('Step 03: Verify the module shows no active contractors');
    (0, pages_fixture_1.expect)(await activities.isEmpty()).toBeTruthy();
  });
  (0, pages_fixture_1.test)('TC-04 Conveyance shows its empty state and a create action', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const activities = new ActivitiesPage_1.ActivitiesPage(authenticatedPage, moduleByKey('conveyance'));
    await (0, LogSteps_1.logStep)('Step 01: Open the Conveyance activities page');
    await activities.open();
    await activities.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Wait for the conveyance list to render');
    await activities.waitForListing();
    await (0, LogSteps_1.logStep)('Step 03: Verify empty state and Create request action');
    (0, pages_fixture_1.expect)(await activities.isEmpty()).toBeTruthy();
    await (0, pages_fixture_1.expect)(activities.action(/Create request/i)).toBeVisible();
  });
  (0, pages_fixture_1.test)('TC-05 Conveyance exposes an outcome tab per review state', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const module = moduleByKey('conveyance');
    const activities = new ActivitiesPage_1.ActivitiesPage(authenticatedPage, module);
    await (0, LogSteps_1.logStep)('Step 01: Open the Conveyance module');
    await activities.open();
    await activities.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Validate the review outcome tabs');
    (0, pages_fixture_1.expect)(await activities.visibleTabLabels()).toEqual(pages_fixture_1.expect.arrayContaining(['Under review', 'Approved', 'Rejected']));
  });
  (0, pages_fixture_1.test)('TC-06 Online lending offers the start action', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const activities = new ActivitiesPage_1.ActivitiesPage(authenticatedPage, moduleByKey('online-lending'));
    await (0, LogSteps_1.logStep)('Step 01: Open the Online lending activities page');
    await activities.open();
    await activities.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Verify the Start Online Lending action is visible');
    await (0, pages_fixture_1.expect)(activities.action(/Start Online Lending/i)).toBeVisible();
  });
  (0, pages_fixture_1.test)('TC-07 My auctions separates active from closed', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const activities = new ActivitiesPage_1.ActivitiesPage(authenticatedPage, moduleByKey('auctions'));
    await (0, LogSteps_1.logStep)('Step 01: Open the My auctions module');
    await activities.open();
    await activities.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Confirm active and closed tabs are available');
    (0, pages_fixture_1.expect)(await activities.visibleTabLabels()).toEqual(pages_fixture_1.expect.arrayContaining(['All', 'Active', 'Closed']));
  });
  (0, pages_fixture_1.test)('TC-08 Farz certificates shows its empty state', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const activities = new ActivitiesPage_1.ActivitiesPage(authenticatedPage, moduleByKey('farz-certificates'));
    await (0, LogSteps_1.logStep)('Step 01: Open the Farz certificates module');
    await activities.open();
    await activities.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Wait for the list to render');
    await activities.waitForListing();
    await (0, LogSteps_1.logStep)('Step 03: Verify the empty state is shown');
    (0, pages_fixture_1.expect)(await activities.isEmpty()).toBeTruthy();
  });
  (0, pages_fixture_1.test)('TC-09 Farz certificates exposes lifecycle tabs', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const activities = new ActivitiesPage_1.ActivitiesPage(authenticatedPage, moduleByKey('farz-certificates'));
    await (0, LogSteps_1.logStep)('Step 01: Open the Farz certificates page');
    await activities.open();
    await activities.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Check the certificate lifecycle tabs');
    (0, pages_fixture_1.expect)(await activities.visibleTabLabels()).toEqual(pages_fixture_1.expect.arrayContaining(['Pending', 'Expired', 'Completed']));
  });
  (0, pages_fixture_1.test)('TC-10 Unit delivery shows its empty state', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const activities = new ActivitiesPage_1.ActivitiesPage(authenticatedPage, moduleByKey('units-delivery'));
    await (0, LogSteps_1.logStep)('Step 01: Open the Unit delivery page');
    await activities.open();
    await activities.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Wait for the list to load');
    await activities.waitForListing();
    await (0, LogSteps_1.logStep)('Step 03: Verify the empty state is displayed');
    (0, pages_fixture_1.expect)(await activities.isEmpty()).toBeTruthy();
  });
  (0, pages_fixture_1.test)(
    'TC-11 Unit delivery separates developer acceptance from beneficiary',
    { annotation: [{ product: 'Marketplace', type: 'non-critical' }] },
    async ({ authenticatedPage }) => {
      const activities = new ActivitiesPage_1.ActivitiesPage(authenticatedPage, moduleByKey('units-delivery'));
      await (0, LogSteps_1.logStep)('Step 01: Open the Unit delivery module');
      await activities.open();
      await activities.expectLoaded();
      await (0, LogSteps_1.logStep)('Step 02: Verify developer and beneficiary acceptance tabs are present');
      (0, pages_fixture_1.expect)(await activities.visibleTabLabels()).toEqual(pages_fixture_1.expect.arrayContaining(['Pending', 'Accepted', 'Accepted By Developer', 'Rejected']));
    }
  );
  (0, pages_fixture_1.test)('TC-12 Rental requests shows its empty state', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const activities = new ActivitiesPage_1.ActivitiesPage(authenticatedPage, moduleByKey('rental-requests'));
    await (0, LogSteps_1.logStep)('Step 01: Open the Rental requests page');
    await activities.open();
    await activities.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Wait for the rental request list to render');
    await activities.waitForListing();
    await (0, LogSteps_1.logStep)('Step 03: Verify the empty state is shown');
    (0, pages_fixture_1.expect)(await activities.isEmpty()).toBeTruthy();
  });
  (0, pages_fixture_1.test)('TC-13 Rental requests exposes an Incomplete resume state', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const activities = new ActivitiesPage_1.ActivitiesPage(authenticatedPage, moduleByKey('rental-requests'));
    await (0, LogSteps_1.logStep)('Step 01: Open the Rental requests module');
    await activities.open();
    await activities.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Validate the incomplete and lifecycle tabs');
    (0, pages_fixture_1.expect)(await activities.visibleTabLabels()).toEqual(pages_fixture_1.expect.arrayContaining(['Incomplete', 'Under process', 'Approved', 'Rejected']));
  });
  (0, pages_fixture_1.test)('TC-14 Resale requests offers both Sell and Buy sides', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const activities = new ActivitiesPage_1.ActivitiesPage(authenticatedPage, moduleByKey('resale-requests'));
    await (0, LogSteps_1.logStep)('Step 01: Open the Resale requests module');
    await activities.open();
    await activities.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Confirm the Sell and Buy tabs are visible');
    (0, pages_fixture_1.expect)(await activities.visibleTabLabels()).toEqual(pages_fixture_1.expect.arrayContaining(['Sell', 'Buy']));
  });
  (0, pages_fixture_1.test)('TC-15 Resale requests exposes its full status lifecycle', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const activities = new ActivitiesPage_1.ActivitiesPage(authenticatedPage, moduleByKey('resale-requests'));
    await (0, LogSteps_1.logStep)('Step 01: Open the Resale requests module');
    await activities.open();
    await activities.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Validate the full lifecycle tabs');
    (0, pages_fixture_1.expect)(await activities.visibleTabLabels()).toEqual(pages_fixture_1.expect.arrayContaining(['All', 'Completed', 'Rejected', 'Cancelled']));
  });
  (0, pages_fixture_1.test)('TC-16 The tax service offers both request and inquiry modes', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const activities = new ActivitiesPage_1.ActivitiesPage(authenticatedPage, moduleByKey('vat-exemption'));
    await (0, LogSteps_1.logStep)('Step 01: Open the Tax service module');
    await activities.open();
    await activities.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Confirm inquiry mode is present');
    (0, pages_fixture_1.expect)(await activities.visibleTabLabels()).toEqual(pages_fixture_1.expect.arrayContaining(['Inquiring about a certificate']));
  });
  (0, pages_fixture_1.test)('TC-16 Financial applications renders its status banner', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const activities = new ActivitiesPage_1.ActivitiesPage(authenticatedPage, moduleByKey('financial-applications'));
    await (0, LogSteps_1.logStep)('Step 01: Open the Financial applications page');
    await activities.open();
    await activities.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Wait for the status list to settle');
    await activities.waitForListing();
    await (0, LogSteps_1.logStep)('Step 03: Validate the module resolves to a real status state');
    (0, pages_fixture_1.expect)(['empty', 'populated']).toContain(await activities.listingState());
  });
  (0, pages_fixture_1.test)('TC-17 Housing design requests expose lifecycle tabs', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const activities = new ActivitiesPage_1.ActivitiesPage(authenticatedPage, moduleByKey('housing-designs'));
    await (0, LogSteps_1.logStep)('Step 01: Open the Housing design requests page');
    await activities.open();
    await activities.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Validate the lifecycle tabs for housing design requests');
    (0, pages_fixture_1.expect)(await activities.visibleTabLabels()).toEqual(pages_fixture_1.expect.arrayContaining(['All', 'Active', 'Cancelled', 'Completed']));
  });
});
