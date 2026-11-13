export const BusinessLandingObjects = {
  businessSwitchButton: {
    xpath: "//button[text()=' أعمال ']",
  },
  businessLandingPage: {
    xpath: "//div[@id='page__business']",
  },
  realEstateAnalysisTabButton: {
    xpath: "//button[text()=' Real Estate Analyst ']",
  },
  realEstateDeveloperTabButton: {
    xpath: "//button[text()=' Real Estate Developer ']",
  },
  realEstateBrokerTabButton: {
    xpath: "//button[text()=' Real Estate Broker ']",
  },
  realEstateAnalysisImageButton: {
    xpath: "(//span[contains(@class,'business-hero-role')]/parent::div)[1]",
  },
  realEstateDeveloperImageButton: {
    xpath: "(//span[contains(@class,'business-hero-role')]/parent::div)[2]",
  },
  realEstateBrokerImageButton: {
    xpath: "(//span[contains(@class,'business-hero-role')]/parent::div)[3]",
  },
  exploreDigitarForBrokerButton: {
    xpath: "//button[normalize-space()='Explore Digitar for broker']",
  },
  exploreDigitarForRealEstateDeveloperButton: {
    xpath: "//button[normalize-space()='Explore digitar for real estate developer']",
  },
  exploreDigitarForDataAnalystButton: {
    xpath: "//button[normalize-space()='Explore digitar for data analyst']",
  },
  englishLanguageButton: {
    xpath: "//button[normalize-space()='English']",
  },
  arabicLanguageButton: {
    xpath: "//button[normalize-space()='العربية']",
  },
  businessUserIconButton: {
    xpath: '//skn-avatar-v6/parent::button',
  },
  switchToIndividualButton: {
    xpath: "//span[normalize-space()='الانتقال إلى الأفراد']",
  },
} as const;
