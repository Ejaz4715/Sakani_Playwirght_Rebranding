'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.expect = exports.test = void 0;
const test_1 = require('@playwright/test');
const HomePage_1 = require('@pages/HomePage');
const UserLoginPage_1 = require('@pages/UserLoginPage');
const MarketplacePage_1 = require('@pages/MarketplacePage');
const MyBookingsPage_1 = require('@pages/MyBookingsPage');
const RegisterInterestPage_1 = require('@pages/RegisterInterestPage');
const MortgageCalculatorPage_1 = require('@pages/MortgageCalculatorPage');
const Header_1 = require('@components/Header');
const testData_1 = require('@data/testData');
async function preAcceptCookies(page) {
  await page.addInitScript(() => {
    try {
      window.localStorage.setItem('accept_cookies', 'true');
    } catch {}
  });
}
async function installCookieAutoDismiss(page) {
  const shown = page.locator('#acceptCookiesModal.show, ngb-modal-window.cookie-modal.show').first();
  await page.addLocatorHandler(
    shown,
    async () => {
      const accept = page.getByRole('button', {
        name: /قبول (كل )?ملفات تعريف الارتباط|Accept (all )?cookies/i,
      });
      const count = await accept.count();
      for (let i = 0; i < count; i++) {
        const btn = accept.nth(i);
        if (await btn.isVisible().catch(() => false)) {
          await btn.click({ timeout: 5000 }).catch(() => {});
          break;
        }
      }
    },
    { noWaitAfter: true }
  );
}
async function installPrivacyPolicyAutoDismiss(page) {
  const accept = page.getByRole('button', { name: /موافقة واستمرار|Agree and continue/i });
  await page.addLocatorHandler(accept, async () => {
    await accept
      .first()
      .click()
      .catch(() => {});
  });
}
async function installCoachMarkAutoDismiss(page) {
  const coachMark = page
    .locator('ngb-tooltip-window, [class*="coach"], [class*="onboarding"]')
    .filter({ hasText: /Find more Sakani products|منتجات سكني/i })
    .first();
  await page.addLocatorHandler(
    coachMark,
    async () => {
      await coachMark
        .locator('button, [class*="close"], svg')
        .first()
        .click({ timeout: 3000 })
        .catch(() => {});
    },
    { noWaitAfter: true }
  );
}
exports.test = test_1.test.extend({
  page: async ({ page }, use) => {
    await preAcceptCookies(page);
    await installCookieAutoDismiss(page);
    await installPrivacyPolicyAutoDismiss(page);
    await installCoachMarkAutoDismiss(page);
    await use(page);
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage_1.HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new UserLoginPage_1.LoginPage(page));
  },
  marketplacePage: async ({ page }, use) => {
    await use(new MarketplacePage_1.MarketplacePage(page));
  },
  myBookingsPage: async ({ page }, use) => {
    await use(new MyBookingsPage_1.MyBookingsPage(page));
  },
  registerInterestPage: async ({ page }, use) => {
    await use(new RegisterInterestPage_1.RegisterInterestPage(page));
  },
  mortgageCalculatorPage: async ({ page }, use) => {
    await use(new MortgageCalculatorPage_1.MortgageCalculatorPage(page));
  },
  header: async ({ page }, use) => {
    await use(new Header_1.Header(page));
  },
  authenticatedPage: async ({ page }, use) => {
    const login = new UserLoginPage_1.LoginPage(page);
    await login.login(testData_1.TEST_USER.nationalId);
    await new Header_1.Header(page).expectAuthenticated();
    await page.waitForTimeout(3000);
    const eligibilityPopup = page.getByRole('paragraph').filter({ hasText: 'Application Pending' });
    if (await eligibilityPopup.isVisible()) {
      await page.getByRole('button', { name: 'Cancel' }).click();
    }
    await use(page);
  },
  authenticatedPageCompanyUser: async ({ page }, use) => {
    const login = new UserLoginPage_1.LoginPage(page);
    await login.login(testData_1.TEST_USER.companyUserId);
    await new Header_1.Header(page).expectAuthenticated();
    await page.waitForTimeout(3000);
    const eligibilityPopup = page.getByRole('paragraph').filter({ hasText: 'Application Pending' });
    if (await eligibilityPopup.isVisible()) {
      await page.getByRole('button', { name: 'Cancel' }).click();
    }
    await use(page);
  },
});
var test_2 = require('@playwright/test');
Object.defineProperty(exports, 'expect', {
  enumerable: true,
  get: function () {
    return test_2.expect;
  },
});
