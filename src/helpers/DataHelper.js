'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DataHelper = void 0;
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
class DataHelper {
  /**
   * Resolves the full file path given a relative or absolute file name/path
   */
  static getFilePath(fileName) {
    const jsonFileName = fileName.endsWith('.json') ? fileName : `${fileName}.json`;
    return path_1.default.isAbsolute(jsonFileName) ? jsonFileName : path_1.default.resolve(process.cwd(), 'src/data', jsonFileName);
  }
  /**
   * Reads fresh JSON data from disk
   */
  static readData(fileName = 'test-data.json') {
    const filePath = this.getFilePath(fileName);
    if (!fs_1.default.existsSync(filePath)) {
      return {};
    }
    const rawData = fs_1.default.readFileSync(filePath, 'utf-8');
    return rawData.trim() ? JSON.parse(rawData) : {};
  }
  // =========================================================================
  // Implementation Signature (Handles both signature calls)
  // =========================================================================
  static updateServiceData(...args) {
    let fileName = 'test-data.json';
    let serviceName;
    let key;
    let value;
    if (args.length === 4) {
      [fileName, serviceName, key, value] = args;
    } else {
      [serviceName, key, value] = args;
    }
    const filePath = this.getFilePath(fileName);
    const currentData = this.readData(fileName);
    // Ensure the services block exists
    if (!currentData.services) {
      currentData.services = {};
    }
    // Ensure the specific service entry exists
    if (!currentData.services[serviceName]) {
      currentData.services[serviceName] = {};
    }
    // Update or insert value
    currentData.services[serviceName][key] = value;
    // Write back to disk
    fs_1.default.writeFileSync(filePath, JSON.stringify(currentData, null, 2), 'utf-8');
  }
}
exports.DataHelper = DataHelper;
