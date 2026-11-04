export const UnitBookingObjects = {
  termsCheckbox: "//input[@formcontrolname='accepted_term']",
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
  contractLoadErrorText: 'لا يمكن للنظام تحميل عقد البيع',
} as const;
