'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UpdateUnitsPage = void 0;
const test_1 = require('@playwright/test');
const exceljs_1 = __importDefault(require('exceljs'));
const UpdateUnitsObjects_1 = require('@objects/UpdateUnitsObjects');
const DeveloperObjects_1 = require('@objects/DeveloperObjects');
const ExcelUtils_1 = require('@pages/utils/ExcelUtils');
class UpdateUnitsPage {
  constructor(page) {
    this.page = page;
  }
  async clickDownloadUnitPricesButton() {
    await this.page
      .getByRole(UpdateUnitsObjects_1.UpdateUnitsObjects.downloadUnitPricesButton.role, {
        name: UpdateUnitsObjects_1.UpdateUnitsObjects.downloadUnitPricesButton.name,
      })
      .click();
  }
  async clickUpdateUnitPricesButton() {
    await this.page
      .getByRole(UpdateUnitsObjects_1.UpdateUnitsObjects.updateUnitPricesButton.role, {
        name: UpdateUnitsObjects_1.UpdateUnitsObjects.updateUnitPricesButton.name,
      })
      .click();
  }
  async uploadFile(filePath) {
    await this.page.locator(UpdateUnitsObjects_1.UpdateUnitsObjects.updateUnitPricesFileInput).setInputFiles(filePath);
  }
  async clickUpdatePricesButton() {
    await this.page
      .getByRole(UpdateUnitsObjects_1.UpdateUnitsObjects.updatePricesButton.role, {
        name: UpdateUnitsObjects_1.UpdateUnitsObjects.updatePricesButton.name,
      })
      .click();
  }
  async verifyPriceAnalysisDetailsVisible() {
    await (0, test_1.expect)(
      this.page.locator(UpdateUnitsObjects_1.UpdateUnitsObjects.priceAnalysisDetailsContainer).getByText(UpdateUnitsObjects_1.UpdateUnitsObjects.priceAnalysisDetailsText)
    ).toBeVisible({ timeout: 12000 });
  }
  async verifyAddUnitsAnalysisIsVisible() {
    const addUnitAnalysisContainer = this.page.locator(UpdateUnitsObjects_1.UpdateUnitsObjects.addUnitAnalysisContainer);
    await (0, test_1.expect)(addUnitAnalysisContainer, 'Add unit analysis page is not present').toBeVisible({ timeout: 12000 });
  }
  async verifyDeleteUnitsAnalysisIsVisible() {
    const deleteUnitAnalysisContainer = this.page.locator(UpdateUnitsObjects_1.UpdateUnitsObjects.deleteUnitAnalysisContainer);
    await (0, test_1.expect)(deleteUnitAnalysisContainer, 'Add unit analysis page is not present').toBeVisible({ timeout: 12000 });
  }
  async clickConfirmUnitPriceUpdateButton() {
    const cancelButton = this.page.getByRole(DeveloperObjects_1.DeveloperObjects.cancelButtonOnPopUp.role, { name: DeveloperObjects_1.DeveloperObjects.cancelButtonOnPopUp.name });
    if (await cancelButton.isVisible()) {
      await cancelButton.click();
    }
    await this.page
      .getByRole(UpdateUnitsObjects_1.UpdateUnitsObjects.confirmUnitPriceUpdateButton.role, {
        name: UpdateUnitsObjects_1.UpdateUnitsObjects.confirmUnitPriceUpdateButton.name,
      })
      .click();
  }
  getUnitPriceFromWorkbook(filePath, unitCode) {
    const workbookObjects = UpdateUnitsObjects_1.UpdateUnitsObjects.unitPriceWorkbook;
    return ExcelUtils_1.ExcelUtils.getExcelCellValue(filePath, workbookObjects.sheetName, workbookObjects.unitCodeColumn, unitCode, workbookObjects.marketPriceColumn);
  }
  async updateUnitPricesWorkbook(filePath, unitCode, price) {
    const workbookObjects = UpdateUnitsObjects_1.UpdateUnitsObjects.unitPriceWorkbook;
    const updates = Object.fromEntries(workbookObjects.priceColumns.map((columnName) => [columnName, price]));
    await ExcelUtils_1.ExcelUtils.updateExcelCell(filePath, workbookObjects.sheetName, workbookObjects.unitCodeColumn, unitCode, updates);
  }
  async clickUnitDetailsTab() {
    await this.page
      .getByRole(UpdateUnitsObjects_1.UpdateUnitsObjects.unitDetailsTab.role, {
        name: UpdateUnitsObjects_1.UpdateUnitsObjects.unitDetailsTab.name,
      })
      .click();
  }
  async selectUnitCodeSearchCriteria() {
    await this.page.locator(UpdateUnitsObjects_1.UpdateUnitsObjects.unitSearchCriteria).click();
    await this.page
      .getByRole(UpdateUnitsObjects_1.UpdateUnitsObjects.optionsList.role, {
        name: UpdateUnitsObjects_1.UpdateUnitsObjects.optionsList.name,
      })
      .getByText(UpdateUnitsObjects_1.UpdateUnitsObjects.unitCodeOption.text)
      .click();
  }
  async fillUnitCode(unitCode) {
    await this.page.getByRole(UpdateUnitsObjects_1.UpdateUnitsObjects.unitCodeInput.role).fill(unitCode);
  }
  async clickSearchUnitButton() {
    await this.page
      .getByRole(UpdateUnitsObjects_1.UpdateUnitsObjects.searchButton.role, {
        name: UpdateUnitsObjects_1.UpdateUnitsObjects.searchButton.name,
      })
      .click();
  }
  async navigateToSearchedUnit() {
    await this.page.waitForTimeout(3000);
    let passwordIcons = this.page.locator(DeveloperObjects_1.DeveloperObjects.passwordEyeIcon);
    await passwordIcons.click();
  }
  async getUnitStatus() {
    const statusCell = this.page.locator(UpdateUnitsObjects_1.UpdateUnitsObjects.unitRows).first().locator('datatable-body-cell').nth(4);
    await (0, test_1.expect)(statusCell).toBeVisible();
    return (await statusCell.innerText()).trim();
  }
  async clickUpdateUnitStatusLink() {
    await this.page
      .getByRole(UpdateUnitsObjects_1.UpdateUnitsObjects.updateUnitStatusLink.role, {
        name: UpdateUnitsObjects_1.UpdateUnitsObjects.updateUnitStatusLink.name,
      })
      .click();
  }
  async clickPilotLaunchButton() {
    await this.page
      .getByRole(UpdateUnitsObjects_1.UpdateUnitsObjects.pilotLaunchButton.role, {
        name: UpdateUnitsObjects_1.UpdateUnitsObjects.pilotLaunchButton.name,
      })
      .click();
  }
  async updateWorkbookStatus(workbookPath, unitStatus, projectCode, productCode) {
    return this.updateNewUnitStatus(workbookPath, unitStatus, projectCode, productCode);
  }
  async uploadWorkbook(workbookPath) {
    await this.page.locator(UpdateUnitsObjects_1.UpdateUnitsObjects.uploadInput).setInputFiles(workbookPath);
  }
  async verifyUploadedFile(fileName) {
    await (0, test_1.expect)(this.page.getByText(fileName, { exact: true })).toBeVisible({ timeout: 12000 });
  }
  async clickAnalyzeFileButton() {
    await this.page
      .getByRole(UpdateUnitsObjects_1.UpdateUnitsObjects.analyzeFileButton.role, {
        name: UpdateUnitsObjects_1.UpdateUnitsObjects.analyzeFileButton.name,
      })
      .click();
  }
  async clickFirstAnalysisResult() {
    this.page.waitForTimeout(3000);
    await this.page.locator(UpdateUnitsObjects_1.UpdateUnitsObjects.firstAnalysisResult).click();
  }
  async clickApproveButton() {
    await this.page
      .getByRole(UpdateUnitsObjects_1.UpdateUnitsObjects.approveButton.role, {
        name: UpdateUnitsObjects_1.UpdateUnitsObjects.approveButton.name,
      })
      .click();
  }
  async clickConfirmationDialog() {
    await this.page.getByRole(UpdateUnitsObjects_1.UpdateUnitsObjects.confirmationDialog.role).click();
  }
  async verifyApprovalSuccessMessage() {
    await (0, test_1.expect)(this.page.getByText(UpdateUnitsObjects_1.UpdateUnitsObjects.approvalSuccessMessage)).toBeVisible({ timeout: 12000 });
  }
  async clickSuccessCheckmark() {
    await this.page.locator(UpdateUnitsObjects_1.UpdateUnitsObjects.successCheckmark).click();
  }
  async clickConfirmYesButton() {
    await this.page
      .getByRole(UpdateUnitsObjects_1.UpdateUnitsObjects.confirmYesButton.role, {
        name: UpdateUnitsObjects_1.UpdateUnitsObjects.confirmYesButton.name,
      })
      .click();
  }
  async expectUnitStatus(expectedStatus) {
    await (0, test_1.expect)(this.page.locator(UpdateUnitsObjects_1.UpdateUnitsObjects.unitRows).first().locator('datatable-body-cell').nth(4)).toHaveText(expectedStatus);
  }
  async vrifyTheUnitStatusIsBooked(expectedStatus) {
    await (0, test_1.expect)(this.page.locator(UpdateUnitsObjects_1.UpdateUnitsObjects.unitRows).first().locator('datatable-body-cell').nth(5)).toHaveText(expectedStatus);
  }
  async verifyTheUpdateIsRejected() {
    const errorMessage = this.page.locator(UpdateUnitsObjects_1.UpdateUnitsObjects.UpdaterejectedMessage);
    await (0, test_1.expect)(errorMessage, 'The message is not available');
  }
  async updateNewUnitStatus(workbookPath, unitStatus, projectCode, productCode) {
    const status = unitStatus.trim().toLowerCase();
    const normalizedStatus = status === 'غير نشط' ? 'inactive' : status === 'نشط' ? 'active' : status;
    if (normalizedStatus !== 'active' && normalizedStatus !== 'inactive') {
      throw new Error(`Cannot update unit status to unsupported value: "${unitStatus}"`);
    }
    const workbook = new exceljs_1.default.Workbook();
    await workbook.xlsx.readFile(workbookPath);
    const worksheet = workbook.worksheets[0];
    if (!worksheet) {
      throw new Error(`No worksheets found in workbook: ${workbookPath}`);
    }
    const headerRow = worksheet.getRow(1);
    const columns = {};
    for (let column = 1; column <= headerRow.cellCount; column++) {
      const header = String(headerRow.getCell(column).value ?? '').trim();
      if (['Project Code', 'Product Code', 'New Unit Status'].includes(header)) {
        columns[header] = column;
      }
    }
    for (const header of ['Project Code', 'Product Code', 'New Unit Status']) {
      if (!columns[header]) {
        throw new Error(`Column "${header}" was not found in worksheet "${worksheet.name}"`);
      }
    }
    let updatedRows = 0;
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === headerRow.number) return;
      let hasData = false;
      row.eachCell({ includeEmpty: false }, (cell) => {
        const value = cell.value;
        if (value !== undefined && value !== null && String(value).trim() !== '') {
          hasData = true;
        }
      });
      if (!hasData) return;
      row.getCell(columns['Project Code']).value = projectCode;
      row.getCell(columns['Product Code']).value = productCode;
      row.getCell(columns['New Unit Status']).value = normalizedStatus;
      updatedRows++;
    });
    if (updatedRows === 0) {
      throw new Error(`No data rows found in worksheet "${worksheet.name}"`);
    }
    for (let rowNumber = 1; rowNumber <= worksheet.rowCount; rowNumber++) {
      const row = worksheet.getRow(rowNumber);
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.style = {};
      });
      const rowModel = row.model;
      if (rowModel) {
        row.model = { ...rowModel, style: {} };
      }
    }
    for (let columnNumber = 1; columnNumber <= worksheet.columnCount; columnNumber++) {
      worksheet.getColumn(columnNumber).style = {};
    }
    await workbook.xlsx.writeFile(workbookPath);
    return normalizedStatus;
  }
  async verifyUnitPricesAreUpdated(expectedPrice) {
    const expected = Number(expectedPrice);
    for (let i = 0; i <= 5; i++) {
      const rawValue = await this.page.locator(UpdateUnitsObjects_1.UpdateUnitsObjects.unitPricesFields).nth(i).inputValue();
      const cleanedValueText = rawValue.replace(/,/g, '').replace(/SAR/g, '').split('.')[0].trim();
      const actualPrice = Number(cleanedValueText);
      (0, test_1.expect)(actualPrice).toBe(expected);
    }
  }
  async validateUnitCodePresence() {
    const unitCodeCell = this.page.locator(UpdateUnitsObjects_1.UpdateUnitsObjects.unitRows).first().locator('datatable-body-cell').first();
    await (0, test_1.expect)(unitCodeCell).toBeVisible();
  }
  async validateUnitCodeIsNotPresent() {
    const unitCodeCell = this.page.locator(UpdateUnitsObjects_1.UpdateUnitsObjects.unitRows).first().locator('datatable-body-cell').first();
    await (0, test_1.expect)(unitCodeCell).toBeHidden();
  }
  async getUnitTargetSegment() {
    const unitChannel = this.page.locator(UpdateUnitsObjects_1.UpdateUnitsObjects.unitRows).first().locator('datatable-body-cell').nth(7);
    await (0, test_1.expect)(unitChannel).toBeVisible();
    return (await unitChannel.innerText()).trim();
  }
  async selectManageProjectOption(option) {
    await this.page
      .getByRole(UpdateUnitsObjects_1.UpdateUnitsObjects.manageProjectButton.role, {
        name: UpdateUnitsObjects_1.UpdateUnitsObjects.manageProjectButton.name,
      })
      .click();
    const optionButton = this.page.locator(UpdateUnitsObjects_1.UpdateUnitsObjects.manageProjectOptions(option));
    await optionButton.click();
  }
  async selectApartmentUnitType() {
    await this.page.locator(UpdateUnitsObjects_1.UpdateUnitsObjects.unitTypeDropdown).click();
    await this.page
      .getByRole(UpdateUnitsObjects_1.UpdateUnitsObjects.apartmentUnitTypeOption.role, {
        name: UpdateUnitsObjects_1.UpdateUnitsObjects.apartmentUnitTypeOption.name,
      })
      .click();
  }
  async clickAddUnitFile() {
    await this.page
      .getByRole(UpdateUnitsObjects_1.UpdateUnitsObjects.addUnitFileButton.role, {
        name: UpdateUnitsObjects_1.UpdateUnitsObjects.addUnitFileButton.name,
      })
      .click();
  }
  async clickDeleteButton() {
    await this.page
      .getByRole(UpdateUnitsObjects_1.UpdateUnitsObjects.deleteButton.role, {
        name: UpdateUnitsObjects_1.UpdateUnitsObjects.deleteButton.name,
      })
      .click();
  }
}
exports.UpdateUnitsPage = UpdateUnitsPage;
