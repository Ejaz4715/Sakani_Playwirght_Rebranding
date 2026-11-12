export const AppealRequestDocuments = {
  resetButton: {
    text: 'إعادة تعيينl',
    css: 'button.btn-primary.mx-3',
  },
  confirmAllocationpopup: {
    text: 'تأكيد التخصيص',
  },

  confirmButton: {
    role: 'button',
    name: 'تأكيد',
  },

  AppealDocument: {
    role: 'button',
    name: 'المستندات المطلوبة',
  },

  ineligibilityReasonLabel: {
    text: 'سبب عدم الاستحقاق',
    css: 'label.form-label.fw-bold',
  },

  singleDropdownPlaceholder: {
    xpath: "(//div[contains(@class,'ng-input')])[1]",
  },

  familyOwnedHomeMessage: {
    xpath: "//*[@role='listbox']//*[contains(text(),'الأسرة سبق لها تملك منزل ملائم خلال السنة الماضية')]",
  },

  multiDropdownPlaceholder: {
    xpath: "//*[contains(@class,'ng-select-multiple')]/div[contains(@class,'ng-select-container')]/div[contains(@class,'ng-value-container')]/div[contains(@class,'ng-input')]",
  },

  nationalIdCopyLabel: {
    text: 'صورة من الهوية الوطنية',
  },

  inheritanceDeedLabel: {
    xpath: "(//div[contains(@class,'w-100')]/div[contains(@class,'form-check')])[2]",
  },

  absherBeneficiaryLabel: {
    text: 'صورة من بيانات مستفيد من نظام أبشر',
  },

  addAndFollowButton: {
    role: 'button',
    name: 'إضافة ومتابعة',
  },

  requiredDocumentspopup: {
    text: 'المستندات المطلوبة',
  },

  closeButton: {
    role: 'button',
    name: 'إغلاق',
  },

  submitRequestButtonforApproveRequest: {
    text: 'تقديم الطلب',
  },

  confirmDocumentRequestHeading: {
    text: 'تأكيد على طلب المستندات',
  },

  documentsSentHeading: {
    text: 'تم أرسال المستندات المطلوبة الى المستفيد بنجاح',
  },

  closePopupButton: {
    role: 'button',
    name: 'إغلاق',
  },

  multiSelectInput: {
    xpath: "//*[contains(@class,'ng-select-multiple')]/div[contains(@class,'ng-select-container')]/div[contains(@class,'ng-value-container')]/div[contains(@class,'ng-input')]",
  },

  deedCopyOption: {
    text: 'صورة من الصك العقاري',
    exact: true,
  },

  reqouredDocumentaionpopup: {
    role: 'heading',
    name: 'المستندات المطلوبة',
  },
  cancelButton: {
    role: 'button',
    name: 'إلغاء',
  },

  documentsAlert: {
    xpath: "//*[contains(@class,'tw:mb-v6-2')]/skn-inline-alert-v6/div[contains(@class,'tw:bg-v6-warning-100')]",
  },

  uploadDocumentsButton: {
    role: 'button',
    name: 'تحميل المستندات',
  },

  confirmButtonfordocumentationRequest: {
    role: 'button',
    name: 'تأكيد',
  },

  uploadNationalId: {
    xpath: '(//span[normalize-space()="اسحب الملفات وأفلتها هنا لتحميلها."])[1]/ancestor::lib-base-uploader//input[@type="file"]',
  },
  uploadAbsherBeneficiary: {
    xpath: '(//span[normalize-space()="اسحب الملفات وأفلتها هنا لتحميلها."])[2]/ancestor::lib-base-uploader//input[@type="file"]',
  },

  sendButton: {
    text: 'إرسال',
    exact: true,
  },

  rejectButton: {
    role: 'button',
    name: 'تغيير الحالة الى مرفوض',
  },

  rejectionReasonHeading: {
    text: 'سبب رفض الاعتراض',
    exact: true,
  },

  activeDropdownInput: {
    xpath: '//input[@role="combobox" and @aria-expanded="true"]',
  },

  familyOwnedHomeOption: {
    text: 'الأسرة سبق لها تملك منزل ملائم خلال السنة الماضية',
    exact: true,
  },

  objectionRejectionInstructionText: {
    text: 'الرجاء ادخال سبب عدم قبول الاعتراض',
    exact: false,
  },

  objectionTextarea: {
    xpath: '//textarea[@formcontrolname="explanation"]',
  },
} as const;
