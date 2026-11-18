export const SocialGuaranteeStatusObjects = {
  includedStatus: {
    xpath: "//div[text()=' مضمن ']",
  },
  viewDetailsButton: {
    xpath: "//button[text()=' عرض التفاصيل ']",
  },
  bookingsListSideMenu: {
    xpath: "//div[text()=' الحجوزات ']",
  },
  searchInputfield: {
    xpath: "//input[@id='search']",
  },
  includedStatusFromAdmin: {
    xpath: "//span[text()=' الضمان الاجتماعي ']/following::input",
  },
  projectInputfield: {
    xpath: "//label[text()=' مشروع ']/following-sibling::input",
  },
} as const;
