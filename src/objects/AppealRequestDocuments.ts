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

  closeButtonFrist: {
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

  closePopupButtonSecond: {
    xpath: '(//button[contains(@class, "btn-outline-primary") and normalize-space()="إغلاق"])[2]',
  },
  closePopupButtonTherd: {
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

  underProcessingLabel: {
    text: 'تحت المعالجة',
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
    text: 'تحميل المستندات',
    exact: true,
  },

  confirmButtonfordocumentationRequest: {
    role: 'button',
    name: 'تأكيد',
  },

  uploadNationalId: {
    xpath: '(//div[contains(@class, "v6-dashed-box")])[1]/ancestor::lib-base-uploader//input[@type="file"]',
  },
  uploadAbsherBeneficiary: {
    xpath: '(//div[contains(@class, "v6-dashed-box")])[2]/ancestor::lib-base-uploader//input[@type="file"]',
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
  requiredDocumentsLabel: {
    xpath: "(//div[contains(@class,'appeal-status')][normalize-space()='مستندات مطلوبة'])[1]",
  },
  documentsSentSuccessMessage: {
    text: 'تم الإرسال بنجاح',
  },
} as const;
