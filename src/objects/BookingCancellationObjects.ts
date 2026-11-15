export const BookingCancellationObjects = {
  userProfileButton: "//button[@aria-label='Search']/following::button[2]",
  myBookingsLink: "//span[contains (text(), 'حجوزاتي')]",
  manageProfile: "//div[@aria-labelledby='profile-dropdown']/descendant::span[contains (text(), 'إدارة الملف الشخصي')]",
  activeBookingsTab: {
    role: 'tab',
    name: 'نشطة',
  },
  unitCode: {
    xpath: "(//div[text() = ' رمز الوحدة ']/following-sibling::div/child::div)[1]",
  },
  completedBookingsTab: {
    role: 'tab',
    name: 'مكتملة',
  },
  cancelledBookingsTab: {
    role: 'tab',
    name: 'ملغاة',
  },
  bookingDetailsButton: {
    xpath: "(//button[text()=' عرض التفاصيل '])[1]",
  },
  cancelBookingButton: {
    xpath: '//app-cancel-booking-button-v6/child::button',
  },
  continueButton: {
    xpath: "//button[contains(text(),'متابعة إلغاء الحجز')]",
  },
  othersRadioButton: {
    xpath: "//input[@value='others']/parent::label",
  },
  othersTextArea: {
    xpath: "//textarea[@formcontrolname='other_reason']",
  },
  saveAndContinueButton: {
    xpath: "//button[contains(text(),' حفظ ومتابعة ')]",
  },
  confirmCancelButton: {
    role: 'button',
    name: 'تأكيد الإلغاء',
  },
  yesButton: {
    xpath: "//button[normalize-space() = 'نعم']",
  },
  cancellationSuccessHeading: {
    text: 'تم إلغاء الحجز بنجاح!',
  },
  rejectButton: {
    xpath: "//button[contains(text(),'رفض')]",
  },
  rejectReasonTextArea: {
    xpath: "//textarea[@formcontrolname='reject_reason']",
  },
  confirmRejectButton: {
    xpath: "//button[contains(text(),'تأكيد الرفض')]",
  },
  rejectionSuccessHeading: {
    text: 'تم رفض العرض بنجاح!',
  },
  myBookingsButton: {
    xpath: "//button[contains(text(),'حجوزاتي')]",
  },
  refudedStatus: {
    xpath: "//app-booking-refund-fee-badge/descendant::div[contains(text(),'المبلغ المسترد')]",
  },
  bookedUnitCode: "//div[text() = 'رمز الوحدة']/following-sibling::div/child::div",
  viewPriceQuotationButton: {
    xpath: "//div[text()='عرض السعر']/parent::div//following-sibling::app-pdf-viewer/descendant::span",
  },
  compeltiopnPercentageProgress: {
    xpath: "//div[text()='تقدم']",
  },
  noBanksAvailableMessage: {
    xpath: "//app-dx-project-participating-banks/descendant::div[text()=' لا توجد بيانات ']",
  },

  //ReadyMade View project and unit
  //project + some in unit
  projectInfoSection: {
    xpath: '//app-project-information-tpl-v6',
  },
  brochureAndMasterplanSection: {
    xpath: '//app-brochure-masterplan-tpl-v6',
  },
  projectUnitsTypesSection: {
    xpath: '//app-project-unit-types-v6-tpl',
  },
  projectFacilitiesSection: {
    xpath: '//app-project-facilities-v6-tpl',
  },
  projectInsightSection: {
    xpath: '//app-insight-project-wrapper-v6',
  },
  participatinBanksSection: {
    xpath: '//app-project-participating-banks-v6',
  },
  projectContactsSection: {
    xpath: '//app-project-contacts-tpl-v6',
  },
  projectUnitsSection: {
    xpath: '//app-project-units-v6',
  },

  //unit page
  licenseAndAdvertismentSection: {
    xpath: '//app-advertisement-license-tpl-v6',
  },
  unitDetailsSection: {
    xpath: '//app-property-unit-details-v6-tpl',
  },
  husngAssistancentSection: {
    xpath: '//app-housing-assistance-tpl-v6',
  },
  brochureCard: {
    xpath: "//div[contains (text(), 'كتيب')]",
  },
  masterplanCard: {
    xpath: "(//div[normalize-space()='المخطط الرئيسي'])[1]",
  },

  //Card deatails
  favoriteButton: {
    xpath: "(//button/span[text()=' المفضلة '])[1]",
  },
  shareButton: {
    xpath: "(//button/span[text()=' مشاركة '])[1]",
  },
  locationSection: {
    xpath: '//app-dx-project-map',
  },
  schdualePaymentSection: {
    xpath: '//app-dx-cash-payment-schedule-tpl',
  },
  callButton: {
    xpath: "//button/span[text()='اتصال']",
  },
  whatsAppButton: {
    xpath: "//button/span[text()='واتساب']",
  },
  brochureButton: {
    xpath: '//app-pdf-viewer',
  },
  brochureViewer: {
    xpath: "//p[text()='عرض الكتيب']",
  },
  closebrochureButton: {
    xpath: "//app-modal//span[contains(@class,'svg-icon')]",
  },
  masterplanButton: {
    xpath: "//div[text()='المخطط الرئيسي']",
  },
  masreplanViewer: {
    xpath: '//app-image-viewer',
  },
  closemasterplanButton: {
    xpath: "(//app-modal//span[contains(@class,'svg-icon')])[3]",
  },

  //Admin - list or real estate brokers and developers
  developerNameSection: {
    xpath: '//app-developer-tpl',
  },
  developerInfoPage: {
    xpath: '//app-dx-partner-info-section',
  },

  //Secure payment schedule
  viewDetailsButton: {
    xpath: "//button[contains(text(), 'عرض التفاصيل')]",
  },
  paymentDetailsPopup: {
    xpath: '//app-flexible-payment-schedule-details-dialog',
  },
  onlineLinding: {
    xpath: "(//span[contains(text(), 'التمويل العقاري الإلكتروني')])[1]",
  },

  //Marketplace units
  registerOfInterest: {
    xpath: "//span[text()='سجل الإهتمام']",
  },
  propertyTypeDropdownButton: {
    xpath: "//div[text()='نوع العقار']",
  },
  propertyTypeOption: {
    role: 'option',
    name: 'شقة',
  },
  constructionStatusDropdownButton: {
    xpath: "//div[text()='تحت الإنشاء']",
  },
  constructionStatusOption: {
    role: 'option',
    name: 'وحدات جاهزة',
  },
  saveButton: {
    role: 'button',
    name: ' حفظ ',
  },
  unitResultCard: {
    xpath: '//app-marketplace-project-card-template',
  },
  unitResultDetailsPage: {
    xpath: '//app-property-dx-page',
  },
  //Real Estat Data
  insightAndTrendsSection: {
    xpath: '//app-dx-insight-project-price-trends',
  },
  avaragePriceButton: {
    xpath: "//app-dx-insight-project-price-trends/descendant::div[@role='radio'][1]",
  },
  avaragePricePerM2Button: {
    xpath: "//app-dx-insight-project-price-trends/descendant::div[@role='radio'][2]",
  },
  avaragePriceSection: {
    xpath: "//div[text()='متوسط ​​الأسعار']",
  },
  avaragePricePerM2Section: {
    xpath: "//div[text()='متوسط الأسعار لكل م²']",
  },
  monthsDropdownList: {
    xpath: '//app-dx-insight-time-range',
  },
  monthsOptions: {
    xpath: "//div[@aria-labelledby='selectTimeRange']",
  },
  transactionSection: {
    xpath: '//app-dx-insight-project-transactions',
  },
  demographicSection: {
    xpath: '//app-dx-insight-demographic-overview',
  },
  //ready made booking + cancellation
  termsAndConditionsCheckbox: {
    xpath: "//input[@id='readymadeAgreeTerms']",
  },

  confirmBookingButton: {
    xpath: "//button[contains(text(),'تأكيد الحجز')]",
  },
  confirmBookingSuccessMessage: {
    text: 'تم تأكيد الحجز',
  },
  unitCard: {
    xpath: "//app-marketplace-unit-card-v6/descendant::span[text() ='SAR']",
  },
} as const;
