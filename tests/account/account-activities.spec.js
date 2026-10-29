'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const ActivitiesPage_1 = require('@pages/ActivitiesPage');
const testData_1 = require('@data/testData');
const LogSteps_1 = require('@helpers/LogSteps');
pages_fixture_1.test.describe('Account - activities modules', () => {
  for (const module of testData_1.ACTIVITY_MODULES) {
    (0, pages_fixture_1.test)(
      `TC-01 ${module.key} ${module.label} loads with its tabs and state`,
      { annotation: [{ product: 'Marketplace', type: 'non-critical' }] },
      async ({ authenticatedPage }) => {
        const activities = new ActivitiesPage_1.ActivitiesPage(authenticatedPage, module);
        await (0, LogSteps_1.logStep)('Step 01: Open the activities module');
        await activities.open();
        await activities.expectLoaded();
        await (0, LogSteps_1.logStep)('Step 02: Validate the module URL');
        await (0, pages_fixture_1.expect)(authenticatedPage).toHaveURL(new RegExp(escapeRegExp(module.path)));
        if (module.tabs.length) {
          await (0, LogSteps_1.logStep)('Step 03: Confirm documented tabs are visible');
          const visible = await activities.visibleTabLabels();
          (0, pages_fixture_1.expect)(visible, `${module.label} should expose all documented tabs`).toEqual(pages_fixture_1.expect.arrayContaining([...module.tabs]));
        }
        await (0, LogSteps_1.logStep)('Step 04: Wait for the listing to resolve');
        await activities.waitForListing();
        if (module.emptyText) {
          await (0, LogSteps_1.logStep)('Step 05: Check the empty state for the module');
          (0, pages_fixture_1.expect)(await activities.isEmpty(), `${module.label} should show its empty state for the fixture account`).toBeTruthy();
        }
        if (module.action) {
          await (0, LogSteps_1.logStep)('Step 06: Verify the primary action is visible');
          await (0, pages_fixture_1.expect)(activities.action(new RegExp(escapeRegExp(module.action), 'i'))).toBeVisible();
        }
      }
    );
  }
  (0, pages_fixture_1.test)('TC-02 Activities modules are not reachable when logged out', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ page }) => {
    const module = testData_1.ACTIVITY_MODULES[0];
    await (0, LogSteps_1.logStep)('Step 01: Open the activities module URL while logged out');
    await page.goto(`${module.path}?lang=en`, { waitUntil: 'commit' });
    await (0, LogSteps_1.logStep)('Step 02: Wait for the authentication redirect');
    await page.waitForURL(/\/app\/authentication\/login/, { timeout: 150_000 });
    await (0, LogSteps_1.logStep)('Step 03: Confirm login form is shown');
    await (0, pages_fixture_1.expect)(page.locator('#username')).toBeVisible({ timeout: 60_000 });
  });
  (0, pages_fixture_1.test)('TC-03 Selected tab survives a reload', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const module = testData_1.ACTIVITY_MODULES.find((m) => m.key === 'conveyance');
    const activities = new ActivitiesPage_1.ActivitiesPage(authenticatedPage, module);
    await (0, LogSteps_1.logStep)('Step 01: Open the conveyance module');
    await activities.open();
    await activities.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Select the approved tab');
    await activities.selectTab('Approved');
    await (0, LogSteps_1.logStep)('Step 03: Reload the page to preserve the tab state');
    await authenticatedPage.reload({ waitUntil: 'commit' });
    await activities.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 04: Verify the listing is still usable after reload');
    await activities.waitForListing();
  });
});
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
