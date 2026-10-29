'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProjectUnitsObjects = void 0;
exports.ProjectUnitsObjects = {
  propertyText: 'شقة',
  landUnitCard: '//app-dx-project-unit-card',
  unitCard: "//app-marketplace-unit-card-v6/descendant::span[text() ='SAR']",
  unitCardApartmentNumber(apartmentNumber) {
    return `//span[normalize-space() = 'شقة ${apartmentNumber}']`;
  },
  nextPageButton: "//a[@aria-label='Next']",
};
