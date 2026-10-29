'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.RecommendationsObjects = void 0;
exports.RecommendationsObjects = {
  recommendationsLink: "//span[contains(text(),'التفضيلات')]/..",
  recommendationsFormLink: "//span[contains(text(),'نموذج التفضيل')]/..",
  registeredInterestsLink: "//span[contains(text(),'تم تسجيل الاهتمام')]/..",
  regionTextField: 'app-region-selector input',
  cityTextField: 'app-city-selector input',
  districtTextField: 'app-district-selector input',
  firstOptionFromDropdownMenus: "div[aria-posinset='1']",
  saveButton: "//button[contains(text(),' حفظ ')]",
  preferenceSaveStatusText: "//span[contains(text(),'تم تحديث نموذج التفضيل بنجاح')]",
  selectProjectType(projectType) {
    return { role: 'checkbox', name: projectType };
  },
  selectUnitType(unitType) {
    return { role: 'checkbox', name: unitType };
  },
  continueButton: "//button[contains(text(),' المتابعة ')]",
  minimumPriceLabel: 'سعر الحد الأدنى',
  forYouButton: "//swiper-slide//span[contains(text(),'لك')]",
  guestRecommendationText: "//div[contains(text(),'الوحدات الموصى بها لك')]",
  nationalIdTextField: '#nationalIdNumber',
  searchButton: "button[type='submit']",
  selectNumberOfBedrooms(bedroomsNumber) {
    return `app-chip-input[formcontrolname='preferred_rooms'] div[role='checkbox']:nth-child(${bedroomsNumber})`;
  },
  selectNumberOfBathrooms(bathroomsNumber) {
    return `app-chip-input[formcontrolname='preferred_bathrooms'] div[role='checkbox']:nth-child(${bathroomsNumber})`;
  },
};
