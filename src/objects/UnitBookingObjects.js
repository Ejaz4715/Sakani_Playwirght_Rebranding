'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UnitBookingObjects = void 0;
exports.UnitBookingObjects = {
  termsCheckbox: "//input[@id='agreeTerms']",
  confirmButton: {
    role: 'button',
    name: 'تأكيد',
  },
  payBookingFeeButton: {
    role: 'button',
    name: 'دفع رسوم الحجز',
  },
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
};
