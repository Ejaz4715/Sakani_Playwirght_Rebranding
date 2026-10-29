'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.logStep = logStep;
// log-steps.ts
const test_1 = require('@playwright/test');
async function logStep(
  title,
  stepFunction // Mark as optional with ?
) {
  if (stepFunction) {
    await test_1.test.step(title, stepFunction);
  } else {
    await test_1.test.step(title, async () => {}); // Or execute console/reporter log
  }
}
