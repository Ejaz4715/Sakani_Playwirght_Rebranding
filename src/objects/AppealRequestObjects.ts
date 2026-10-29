export const AppealRequestObjects = {
  appealRequestCard: {
    xpath: "//p[text()=' طلب الاعتراض ']",
  },
  reasonDropdownList: {
    xpath: "//label[text()=' الرجاء تحديد مبرر: ']/ancestor::skn-select-v6/descendant::ng-select",
  },
  reasonOption: {
    xpath: "//div[@role='option'][1]",
  },
  commentsTextarea: {
    xpath: "//textarea[@formcontrolname='appeal_explanation']",
  },
  nextButton: {
    xpath: "//button[text()=' التالي ']",
  },
  uploadNationalId: {
    xpath: "//label[text()=' صورة من الهوية الوطنية ']/ancestor::skn-file-upload-v6/descendant::input",
  },
  uploadImageFromFamilyCard: {
    xpath: "//label[text()=' صورة من بطاقة العائلة ']/ancestor::skn-file-upload-v6/descendant::input",
  },
  sendButton: {
    xpath: "//button[text()=' إرسال ']",
  },
  successfulMessage: {
    xpath: "//p[text()='لقد تم تقديم طلبك']",
  },
  //Admin
  AppealsLink: {
    selector: 'a',
    hasText: 'الاعتراضات',
  },
  beneficiaryId: {
    xpath: "//input[@formcontrolname='decrypted_national_id_number']",
  },
  searchButton: {
    xpath: "//button[text()=' بحث ']",
  },
  searchResult: {
    xpath: '//datatable-body-row',
  },
  reassignButton: {
    xpath: "//button[contains(text(),'إعادة تعيين')]",
  },
  teamDropdownList: {
    xpath: "//label[text()=' فريق ']/ancestor::app-nsar-dropdown/descendant::ng-select",
  },
  teamOption: {
    xpath: "//span[text()='فريق المدير']",
  },
  userDropdownList: {
    xpath: "//label[text()=' مستخدم ']/ancestor::app-nsar-dropdown/descendant::ng-select",
  },
  userOption: {
    xpath: "//span[text()='super_admin@test1-admin-sakani.housingapps.sa']",
  },
  reassignPopUpButton: {
    xpath: "(//button[contains(text(),'إعادة تعيين')])[2]",
  },
  confirmButton: {
    xpath: "//button[contains(text(),' تأكيد ')]",
  },
  closePopUpButton: {
    xpath: "(//button[contains(text(),'إغلاق')])[2]",
  },
  closeButtonOfNote: {
    xpath: "//button[contains(text(),'إغلاق')]",
  },
  approveButton: {
    xpath: "//button[contains(text(),'قبول')]",
  },
  approvalPopupMessage: {
    xpath: '//h3',
  },
} as const;
