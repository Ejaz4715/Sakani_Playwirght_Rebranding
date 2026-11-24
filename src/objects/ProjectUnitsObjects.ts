export const ProjectUnitsObjects = {
  propertyText: 'شقة',
  landUnitCard: '//app-project-unit-card-v6',
  unitCard: "//app-marketplace-unit-card-v6/descendant::span[text() ='SAR']",
  unitCardApartmentNumber(apartmentNumber: string | number) {
    return `//span[normalize-space() = 'شقة ${apartmentNumber}']`;
  },
  nextPageButton: "//a[@aria-label='Next']",
} as const;
