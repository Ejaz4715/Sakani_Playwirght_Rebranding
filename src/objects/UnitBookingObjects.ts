export const UnitBookingObjects = {
  termsCheckbox: "//input[@id='agreeTerms']",
  acceptAndContinue: "//button[normalize-space()='موافقة واستمرار']",
  confirmButton: {
    role: "button",
    name: "تأكيد",
  },
  payBookingFeeButton: "//button[normalize-space()='دفع رسوم الحجز']",
  madaPaymentTitle: {
    title: "الدفع بواسطة مدى",
  },
  approveButton: {
    xpath: "//button[contains(text(), 'اعتماد')]",
  },
  otpCode: {
    xpath: "//skn-otp-input-v6/descendant::input",
  },
  verifyButton: {
    xpath: "//button[contains(text(), 'تحقق')]",
  },
  doneButton: {
    xpath: "(//button[contains(text(), 'تم')])[2]",
  },
} as const;
