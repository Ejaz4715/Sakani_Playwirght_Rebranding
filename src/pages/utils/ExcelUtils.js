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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ExcelUtils = void 0;
const exceljs_1 = __importDefault(require('exceljs'));
const XLSX = __importStar(require('xlsx'));
class ExcelUtils {
  static waitForExcelDownload(page) {
    return page.waitForEvent('download');
  }
  static async saveExcelDownload(download, filePath) {
    await download.saveAs(filePath);
  }
  /**
   * Searches for a row matching a search constraint and returns the target cell's value.
   */
  static getExcelCellValue(filePath, sheetName, searchColumn, searchValue, targetColumn) {
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[sheetName];
    if (!worksheet) {
      throw new Error(`Sheet '${sheetName}' not found in the workbook.`);
    }
    const rows = XLSX.utils.sheet_to_json(worksheet);
    for (let row of rows) {
      if (row[searchColumn] === searchValue) {
        return String(row[targetColumn]); // Return the value of the target column
      }
    }
    console.log(`No matching row found for '${searchColumn}' = '${searchValue}'.`);
    return null;
  }
  /**
   * Reads an Excel file, searches for a row matching a search constraint in a specific column,
   * retrieves a value from another column in that row, updates it, and saves the file.
   *
   * @param filePath Path to the Excel file
   * @param sheetName Name of the sheet to read
   * @param searchColumn The column name or index to search in (e.g., 'A' or 'Category')
   * @param searchValue The value to look for
   * @param targetColumn The column name or index whose value you want to retrieve and update
   * @param newValue The new value to set
   */
  static async updateExcelCell(filePath, sheetName, searchColumn, searchValue, updates) {
    const workbook = new exceljs_1.default.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(sheetName);
    if (!worksheet) {
      throw new Error(`Sheet '${sheetName}' not found in the workbook.`);
    }
    const headerRow = worksheet.getRow(1);
    const findColumnIndex = (columnName) => {
      for (let columnIndex = 1; columnIndex <= worksheet.columnCount; columnIndex++) {
        if (headerRow.getCell(columnIndex).text.trim() === columnName) {
          return columnIndex;
        }
      }
      throw new Error(`Column '${columnName}' not found in sheet '${sheetName}'.`);
    };
    const searchColumnIndex = findColumnIndex(searchColumn);
    const updateColumns = Object.entries(updates)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([columnName, value]) => ({
        columnIndex: findColumnIndex(columnName),
        value,
      }));
    let matchingRow;
    for (let rowIndex = 2; rowIndex <= worksheet.rowCount; rowIndex++) {
      const row = worksheet.getRow(rowIndex);
      if (row.getCell(searchColumnIndex).text.trim() === String(searchValue).trim()) {
        matchingRow = row;
        break;
      }
    }
    if (!matchingRow) {
      throw new Error(`No row found where '${searchColumn}' equals '${searchValue}'.`);
    }
    for (const { columnIndex, value } of updateColumns) {
      const parsedValue = typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value)) ? Number(value) : value;
      matchingRow.getCell(columnIndex).value = parsedValue;
    }
    for (let rowIndex = 1; rowIndex <= worksheet.rowCount; rowIndex++) {
      const row = worksheet.getRow(rowIndex);
      for (let columnIndex = 1; columnIndex <= worksheet.columnCount; columnIndex++) {
        row.getCell(columnIndex).style = {};
      }
    }
    for (let columnIndex = 1; columnIndex <= worksheet.columnCount; columnIndex++) {
      worksheet.getColumn(columnIndex).style = {};
    }
    await workbook.xlsx.writeFile(filePath);
  }
}
exports.ExcelUtils = ExcelUtils;
