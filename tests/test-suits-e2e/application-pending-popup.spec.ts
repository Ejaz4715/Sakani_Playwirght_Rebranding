// import { expect, test } from '@playwright/test';
// import { WebApp } from '@base-class/web-app';
// import { DateUtils } from '@pages/utils/DateUtils';
// import { DataHelper } from '@helpers/DataHelper';
// import { logStep } from '@helpers/LogSteps';
// import path from 'node:path';

// const SERVICE = 'application-pending-pop';
// const PreBeta = 'preBeta';
// const readServiceData = () => DataHelper.readData().services[SERVICE];
// const readEnvironment = () => DataHelper.readData().environments[PreBeta].userPortalUrl;

// test.describe('Application Pending Popup', () => {
//     test.describe('Appeal Request', () => {
//         test('SAK-1363-01 Validate display of New Deeds Pending condition', { annotation: [{ product: 'Rebranding', type: 'critical' }] as any }, async ({ page }) => {
//             await logStep('Step 00: Read data from json relative to the service');
//             const data = readServiceData();
//             const userPortalUrl = readEnvironment();
//             const app = new WebApp(page);
//             const sakaniUserId = data.sakaniUserId;

//             await logStep('Step 01: Open the user portal and login');
//             await app.loginPage.gotoHomePage(userPortalUrl);
//             await app.commonMethods.unifiedSakaniLogin(sakaniUserId);
//         });
//     });
// });
