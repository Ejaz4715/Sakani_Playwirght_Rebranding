export const UnitBookingObjects = {
  termsCheckbox: "//input[@id='agreeTerms']",
  acceptAndContinue: "//button[normalize-space()='موافقة واستمرار']",
  confirmButton: {
    role: 'button',
    name: 'تأكيد',
  },
  payBookingFeeButton: "//button[normalize-space()='دفع رسوم الحجز']",
  madaPaymentTitle: {
    title: 'الدفع بواسطة مدى',
  },
  approveButton: {
    xpath: "//button[contains(text(), 'اعتماد')]",
  },
  otpCode: {
    xpath: '//skn-otp-input-v6/descendant::input',
  },
  verifyButton: {
    xpath: "//button[contains(text(), 'تحقق')]",
  },
  doneButton: {
    xpath: "(//button[contains(text(), 'تم')])[2]",
  },
  salesContractSuccessHeading: {
    role: 'heading',
    name: /^\s*تهانينا\s*$/,
  },
  annexRejectButton: {
    xpath: "//button[normalize-space() = 'رفض']",
  },
  annexRejectReasonInputField: {
    xpath: "//textarea[@formcontrolname='reject_reason']",
  },
  confirmAnnexRejectButton: {
    xpath: "//button[normalize-space() = 'تأكيد الرفض']",
  },
  annexRejectionSuccessMessage: {
    xpath: "//p[normalize-space() = 'تم رفض العقد الملحق']",
  },
  viewAnnexContractPDF: {
    xpath: "//span[normalize-space() = 'الملحق #1']/ancestor::app-document-row-v6/descendant::skn-pdf-viewer-v6",
  },
  closeAnnexPDFButton: {
    xpath: "//cdk-dialog-container/descendant::skn-icon-by-theme-v6[@name='close-solid']",
  },
  viewAnnexPopupHeading: {
    role: 'heading',
    name: 'الملحق #1',
  },
} as const;
