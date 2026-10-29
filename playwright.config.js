'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== 'default') __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
Object.defineProperty(exports, '__esModule', { value: true });
const test_1 = require('@playwright/test');
const dotenv = __importStar(require('dotenv'));
dotenv.config();
const timestamp = new Date().toISOString().replace(/[:T]/g, '-').replace(/\..+/, '');
exports.default = (0, test_1.defineConfig)({
  preserveOutput: 'always',
  testDir: './',
  testMatch: ['tests/**/*.spec.{js,ts}', 'e2e-scenarios/tests/**/*.spec.{js,ts}'],
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['html', { open: 'never' }], ['list'], ['json', { outputFile: 'test-results/results.json' }], ['json', { outputFile: `report-dashboard/test-reports-history/results-${timestamp}.json` }]],
  metadata: {
    // Default fallback environment
    environment: process.env.TEST_ENV || 'Pre-Prod',
    // Per-product environment mapping
    environments: {
      Sakani: process.env.MARKETPLACE_ENV || 'Pre-Prod-beta',
      Digitar: process.env.DIGITAR_ENV || 'STG',
      Sayal: process.env.SAYAL_ENV || 'Pre-Prod',
    },
  },
  timeout: 480_000,
  expect: { timeout: 30_000 },
  use: {
    baseURL: process.env.BASE_URL ?? 'https://pre-sakani.housingapps.sa',
    navigationTimeout: 90_000,
    actionTimeout: 30_000,
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    locale: 'ar-SA',
    timezoneId: 'Asia/Riyadh',
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
    launchOptions: {
      args: ['--start-maximized'],
    },
    headless: false,
    permissions: ['geolocation'],
    geolocation: { latitude: 24.7136, longitude: 46.6753 },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...test_1.devices['Desktop Chrome'], viewport: null, deviceScaleFactor: undefined },
    },
  ],
});
