'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const LogSteps_1 = require('@helpers/LogSteps');
pages_fixture_1.test.describe('Navigation & site structure', () => {
  (0, pages_fixture_1.test)('TC-01 home page loads with the primary navigation', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ homePage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the marketing homepage');
    await homePage.open();
    await homePage.expectLoaded();
    await (0, LogSteps_1.logStep)('Step 02: Confirm the primary navigation is visible');
    await (0, pages_fixture_1.expect)(homePage.header.propertiesForSale.first()).toBeVisible();
    await (0, pages_fixture_1.expect)(homePage.header.propertiesForRent.first()).toBeVisible();
    await (0, pages_fixture_1.expect)(homePage.header.auctions.first()).toBeVisible();
    await (0, pages_fixture_1.expect)(homePage.header.services.first()).toBeVisible();
    await (0, pages_fixture_1.expect)(homePage.header.help.first()).toBeVisible();
    await (0, pages_fixture_1.expect)(homePage.header.loginButton.first()).toBeVisible();
  });
  (0, pages_fixture_1.test)('TC-02 Properties for Sale menu links to the buy journeys', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ homePage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the homepage and inspect the buy menu');
    await homePage.open();
    const links = await homePage.header.megaMenuLinks(homePage.header.propertiesForSale.first());
    const joined = links.join(' | ');
    (0, pages_fixture_1.expect)(joined).toMatch(/Offplan|البيع على الخارطة/i);
    (0, pages_fixture_1.expect)(joined).toMatch(/Ready units|وحدات جاهزة/i);
    (0, pages_fixture_1.expect)(joined).toMatch(/Lands|أراضي/i);
  });
  (0, pages_fixture_1.test)('TC-03 Services menu exposes the service catalogue', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ homePage }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the homepage and inspect the services menu');
    await homePage.open();
    const links = await homePage.header.megaMenuLinks(homePage.header.services.first());
    const joined = links.join(' | ');
    (0, pages_fixture_1.expect)(joined).toMatch(/Eligibility Checker|أهليتك/i);
    (0, pages_fixture_1.expect)(joined).toMatch(/Mortgage Calculator|حاسبة/i);
  });
  (0, pages_fixture_1.test)('TC-04 Footer exposes the site map', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ homePage, page }) => {
    await (0, LogSteps_1.logStep)('Step 01: Open the homepage and inspect the footer links');
    await homePage.open();
    for (const [label, href] of [
      ['Marketplace', '/app/marketplace'],
      ['Housing Designs', '/app/housing-designs'],
      ['Sakani Offers', '/app/promotion-vouchers'],
      ['Contact Us', '/support-and-help/contact-us'],
    ]) {
      await (0, pages_fixture_1.expect)(page.locator(`footer a[href="${href}"]`), `Footer link ${label}`).toHaveCount(1);
    }
  });
});
