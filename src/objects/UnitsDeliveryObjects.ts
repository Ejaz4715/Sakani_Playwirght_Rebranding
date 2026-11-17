export const UnitsDeliveryObjects = {
  unitDeliveryLink: {
    xpath: "//span[contains(text(),'تسليم الوحدات ')]/../..",
  },
  startForPreparingUnitsForDelivery: {
    xpath: "//h6[contains(text(),'تجهيز الوحدات للتسليم')]/..//button",
  },
  startForReadyUnitsForDelivery: {
    xpath: "//h6[contains(text(),'وحدات جاهزة للتسليم')]/..//button",
  },
  searchDropdownMenu: {
    xpath: "(//input[@role='combobox'])[1]/../../../..",
  },
  projectNameSelectorForSearch: {
    xpath: "//ng-dropdown-panel//span[contains(text(),'اسم المشروع')]",
  },
  unitCodeSelectorForSearch: {
    xpath: "//ng-dropdown-panel//span[contains(text(),'رمز الوحدة')]",
  },
  projectNameDropdownOption: {
    xpath: '//ng-dropdown-panel/div/div[2]/div',
  },
  projectNameTextField: {
    xpath: "(//input[@role='combobox'])[2]",
  },
  unitCodeTextField: {
    css: '.input-icon-container>input',
  },
  searchButton: {
    xpath: "//button[contains(text(),'بحث')]",
  },
  selectProjectButton: {
    xpath: "//button[contains(text(),'حدد المشروع')]",
  },
  selectUnitButton: {
    xpath: "//button[contains(text(),'اختر الوحدة')]",
  },
  readyForDeliveryCheckbox: {
    css: "label[for='id']",
  },
  calendarIcon: {
    css: 'app-hijri-datepicker .icon',
  },
  visibleAllowedDataLocator: {
    css: "div[role='gridcell'][aria-disabled='false'] .btn-light",
  },
  timeDropdownMenu: {
    xpath: "//div[contains(text(),'اختر الوقت')]/..//div[2]",
  },
  firstAvailableDeliveryTime: {
    css: "ng-dropdown-panel [role='listbox'] [aria-posinset='1']",
  },
  sendButton: {
    xpath: "//button[contains(text(),'إرسال')]",
  },
  deliveryReadinessSuccessfulMessage: {
    xpath: '//div[contains(text(),\'الوحدة جاهزة للتسليم. لبدء التقديم، يرجى الانتقال إلى صفحة "الوحدات الجاهزة للتسليم".\')]',
  },
  unitCheckBox: {
    css: '.datatable-body-cell-label > div> div',
  },
  sendAllMarkedUnitsButton: {
    xpath: "//button[contains(text(),'إرسال الكل')]",
  },
  agreePopUpButton: {
    xpath: "//button[contains(text(),'نعم')]",
  },
  deliverySuccessMessage: {
    xpath: "//h3[contains(text(),'تم اختيار الوحدة بنجاح!')]",
  },
  unitDeliveryLinkFromSakani: {
    xpath: "//span[contains(text(),'تسليم الوحدات')]/..",
  },
  unitDeliveryConfirmationFromSakani: {
    xpath: "//button[contains(text(),'يرجى الاستمرار في تأكيد تسليم الوحدات')]",
  },
  pendingUnitDelivery: {
    xpath: "//div[@role='tab']/span[contains(text(),'قيد الانتظار')]",
  },
  acceptedStatusUnitDelivery: {
    xpath: "//div[@role='tab']/span[contains(text(),'مقبول')]",
  },
  acceptedByDeveloperStatusUnitDelivery: {
    xpath: "//div[@role='tab']/span[contains(text(),'مسلمة حكميًا')]",
  },
  rejectedStatusUnitDelivery: {
    xpath: "//div[@role='tab']/span[contains(text(),'مرفوض')]",
  },
  showDeliveryUnitModelButton: {
    xpath: (unitCode: string) => `//span[normalize-space()='${unitCode}']/ancestor::article/descendant::button[normalize-space() = 'عرض نموذج تسليم الوحدة']`,
  },
  yesRadioButton: {
    xpath: "//input[@aria-label='نعم']/parent::label",
  },
  noRadioButton: {
    xpath: "//input[@aria-label='لا']/parent::label",
  },
  generalCommentsForRejectionTextarea: {
    xpath: "//textarea[@formcontrolname='reject_general_comment']",
  },
  continueButton: {
    xpath: "//button[contains(text(),'المتابعة')]",
  },
  finalUnitRedeliveryDate: {
    xpath: "//input[@id='final_unit_redelivery_date']",
  },
  dateErrorMessage: {
    xpath: "//p[contains(text(),'التاريخ المحدد خارج النطاق المسموح به')]",
  },
  termsAndConditionsCheckbox: {
    css: '#agreeTermsConditions',
  },
  agreeOnDeliveryUnit: {
    xpath: "//button[contains(text(),'قبول تسليم الوحدة')]",
  },
  rejectOnDeliveryUnit: {
    xpath: "//button[contains(text(),'رفض تسليم الوحدة')]",
  },
  rejectionSuccessfulMessage: {
    xpath: "//p[text()='لقد تم رفض الطلب.']",
  },
  verifyField: {
    xpath: '//skn-otp-input-v6//div/input',
  },
  verifyButton: {
    xpath: "//button[contains(text(),'تحقق')]",
  },
  unitDeliverySuccessMessage: {
    xpath: "//p[contains(text(),'تم قبول تاريخ ووقت تسليم الوحدة بنجاح.')]",
  },
  viewDetailsButton: {
    xpath: "(//button[text()=' اظهر التفاصيل '])[1]",
  },
  redeliveryButton: {
    xpath: "//button[text()=' إعادة التسليم ']",
  },
  confirmButton: {
    xpath: "//button[contains(text(),'تأكيد')]",
  },
  successfulRedeliveryMessage: {
    xpath: "//h3[contains(text(),'نجاح!')]",
  },
  maximumNumberOfRejectionsErrorMessage: {
    xpath: "//p[contains(text(),'لقد وصلت إلى الحد الأقصى لعدد مرات الرفض')]",
  },
  commentsHistorySection: {
    xpath: '//app-rejection-histories-v6',
  },
  //Admin
  unitDeliveryManagementLink: {
    role: 'link',
    name: 'إدارة تسليم الوحدات',
  },

  editButton: {
    xpath: "//button[text()=' تعديل ']",
  },
  rejectionLimitTimeInputfield: {
    xpath: "//input[@formcontrolname='maximum_rejection_limit']",
  },
  saveButton: {
    xpath: "//button[text()=' حفظ ']",
  },
  editSuccessfulMessage: {
    text: 'تم حفظ الإعدادات بنجاح',
  },
  previewUnitDeliveryContractFileButton: {
    xpath: "//button/span[text()='معاينة محضر التسليم الخاص بالوحدة']",
  },
  previewUnitDeliveryContractPopup: {
    text: 'محضر التسليم الخاص بالوحدة',
  },
} as const;
