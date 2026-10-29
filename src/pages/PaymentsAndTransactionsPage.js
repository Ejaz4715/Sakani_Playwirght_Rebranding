'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PaymentsAndTransactionsPage = void 0;
const test_1 = require('@playwright/test');
const promises_1 = require('node:fs/promises');
const PaymentsAndTransactionsObjects_1 = require('@objects/PaymentsAndTransactionsObjects');
class PaymentsAndTransactionsPage {
  constructor(page) {
    this.page = page;
  }
  async clickPaymentHistoryLink() {
    const paymentHistoryLink = this.page.locator(PaymentsAndTransactionsObjects_1.PaymentsAndTransactionsObjects.paymentHistoryLink.xpath);
    await (0, test_1.expect)(paymentHistoryLink).toBeVisible();
    await paymentHistoryLink.click();
  }
  async clearDownloadsFolder(downloadDirectory) {
    await (0, promises_1.mkdir)(downloadDirectory, { recursive: true });
    const existingEntries = await (0, promises_1.readdir)(downloadDirectory);
    await Promise.all(existingEntries.map((entry) => (0, promises_1.rm)(`${downloadDirectory}/${entry}`, { recursive: true, force: true })));
    (0, test_1.expect)(await (0, promises_1.readdir)(downloadDirectory)).toHaveLength(0);
  }
  waitForPdfResponse() {
    return this.page.waitForResponse((response) => {
      const contentType = response.headers()['content-type'] ?? '';
      return response.ok() && contentType.toLowerCase().includes('application/pdf');
    });
  }
  async clickInvoicePreviewButton() {
    const invoicePreviewButton = this.page.locator(PaymentsAndTransactionsObjects_1.PaymentsAndTransactionsObjects.invoicePreviewButton.xpath);
    await (0, test_1.expect)(invoicePreviewButton).toBeVisible();
    await invoicePreviewButton.click();
  }
  async savePdfResponse(response, filePath) {
    const pdfContents = await response.body();
    (0, test_1.expect)(pdfContents.subarray(0, 4).toString()).toBe('%PDF');
    await (0, promises_1.writeFile)(filePath, pdfContents);
  }
  async verifySavedFile(filePath, downloadDirectory) {
    await (0, promises_1.access)(filePath);
    const fileName = filePath.split(/[\\/]/).pop();
    (0, test_1.expect)(await (0, promises_1.readdir)(downloadDirectory)).toContain(fileName);
  }
}
exports.PaymentsAndTransactionsPage = PaymentsAndTransactionsPage;
