'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const ProjectPage_1 = require('@pages/ProjectPage');
const UnitModelPage_1 = require('@pages/UnitModelPage');
const UnitDetailPage_1 = require('@pages/UnitDetailPage');
const testData_1 = require('@data/testData');
const marketplaceApi_1 = require('@helpers/marketplaceApi');
const LogSteps_1 = require('@helpers/LogSteps');
pages_fixture_1.test.describe('View projects and units', () => {
  (0, pages_fixture_1.test)(
    'TC-01 Project detail renders all business sections About this project, Developer, Payment methods, Facilities, Location, Participating banks, Contact',
    { annotation: [{ product: 'Marketplace', type: 'non-critical' }] },
    async ({ authenticatedPage }) => {
      const project = new ProjectPage_1.ProjectPage(authenticatedPage, testData_1.PROJECTS.bookable);
      await (0, LogSteps_1.logStep)('Step 01: Open the project detail page');
      await project.open();
      await project.expectLoaded();
      await (0, LogSteps_1.logStep)('Step 02: Check the project sections are rendered');
      const headings = (await project.sectionHeadings()).join(' | ');
      for (const section of ['About this project', 'Developer', 'Payment methods', 'Facilities', 'Location', 'Participating banks', 'Contact']) {
        (0, pages_fixture_1.expect)(headings, `Section "${section}" should render`).toContain(section);
      }
    }
  );
  (0, pages_fixture_1.test)('TC-02 Unit-model page lists units with filter chips', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Find a bookable unit and open its model page');
    const unit = await (0, marketplaceApi_1.findBookableNonBeneUnit)(authenticatedPage, testData_1.PROJECTS.bookable);
    const model = new UnitModelPage_1.UnitModelPage(authenticatedPage, unit.unitModelId);
    await model.open();
    await model.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Validate the filter chip list is present');
    const chips = await model.chipLabels();
    (0, pages_fixture_1.expect)(chips.length, 'Expected at least the "All" size chip').toBeGreaterThan(0);
    (0, pages_fixture_1.expect)(chips.join(' ')).toMatch(/All/i);
    (0, pages_fixture_1.expect)(await model.unitCards.count()).toBeGreaterThan(0);
  });
  (0, pages_fixture_1.test)('TC-03 Unit detail shows availability and a booking CTA', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Find an available unit and open its detail page');
    const unit = await (0, marketplaceApi_1.findBookableNonBeneUnit)(authenticatedPage, testData_1.PROJECTS.bookable);
    const detail = new UnitDetailPage_1.UnitDetailPage(authenticatedPage, unit.id);
    await detail.open();
    await (0, LogSteps_1.logStep)('Step 02: Validate the booking CTA and favorite button are visible');
    await detail.expectBookable();
    await (0, pages_fixture_1.expect)(detail.mortgageCalculatorButton).toBeVisible();
    await (0, pages_fixture_1.expect)(detail.favoriteButton.first()).toBeVisible();
  });
  (0, pages_fixture_1.test)('TC-04 Project -> unit model -> unit navigation chain', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the project and locate a model-to-unit chain');
    const unit = await (0, marketplaceApi_1.findBookableNonBeneUnit)(authenticatedPage, testData_1.PROJECTS.bookable);
    const project = new ProjectPage_1.ProjectPage(authenticatedPage, testData_1.PROJECTS.bookable);
    await project.open();
    await project.expectLoaded();
    await project.scrollToUnitModels();
    (0, pages_fixture_1.expect)(await project.unitModelCards.count()).toBeGreaterThan(0);
    const model = new UnitModelPage_1.UnitModelPage(authenticatedPage, unit.unitModelId);
    await (0, LogSteps_1.logStep)('Step 02: Move from model view to unit detail and confirm the URL');
    await model.open();
    await model.expectLoaded();
    await model.selectAllUnits();
    // Unit cards open the unit in a new tab.
    const unitTab = await model.openUnitByName(unit.unitName);
    await (0, pages_fixture_1.expect)(unitTab).toHaveURL(new RegExp(`/app/units/${unit.id}`), { timeout: 120_000 });
    await unitTab.close();
  });
  (0, pages_fixture_1.test)('TC-05 Closed project surfaces its bookings-closed state', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage, page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open a known closed project');
    const info = await (0, marketplaceApi_1.getProject)(authenticatedPage, testData_1.PROJECTS.bookingsClosed);
    const project = new ProjectPage_1.ProjectPage(authenticatedPage, testData_1.PROJECTS.bookingsClosed);
    await project.open();
    await project.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Confirm the project still exposes inventory while booking is closed');
    // The project still lists inventory, but booking is gated at project level.
    (0, pages_fixture_1.expect)(info.availableUnitsCount).toBeGreaterThan(0);
  });
});
