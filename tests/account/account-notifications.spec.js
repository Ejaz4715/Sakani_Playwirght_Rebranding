'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const pages_fixture_1 = require('@fixtures/pages.fixture');
const UserProfilePage_1 = require('@pages/UserProfilePage');
const Header_1 = require('@components/Header');
const LogSteps_1 = require('@helpers/LogSteps');
pages_fixture_1.test.describe('User Account', () => {
  (0, pages_fixture_1.test)('TC-01 Account menu exposes every portal area', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const header = new Header_1.Header(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the user menu');
    await header.openUserMenu();
    await (0, LogSteps_1.logStep)('Step 02: Validate the menu exposes all expected areas');
    for (const item of ['Profile management', 'Notifications', 'Wallet', 'My bookings', 'Favorites', 'Help & support', 'Logout']) {
      await (0, pages_fixture_1.expect)(authenticatedPage.getByText(item, { exact: true }).first(), `Account menu should offer "${item}"`).toBeVisible();
    }
  });
  (0, pages_fixture_1.test)('TC-02 Notificaitons opens the notification centre', { annotation: [{ product: 'Marketplace', type: 'non-critical' }] }, async ({ authenticatedPage }) => {
    const header = new Header_1.Header(authenticatedPage);
    const profile = new UserProfilePage_1.UserProfilePage(authenticatedPage);
    await (0, LogSteps_1.logStep)('Step 01: Open the user menu');
    await header.openUserMenu();
    await (0, LogSteps_1.logStep)('Step 02: Open notifications');
    await profile.openNotifications();
    await (0, LogSteps_1.logStep)('Step 03: validate the notifications centre renders correctly');
    await profile.expectNotificationsCentreVisible();
  });
});
