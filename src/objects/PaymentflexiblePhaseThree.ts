export const PaymentflexiblePhaseThreeObjects = {
  // Profile menu > حجوزاتي
  myBookingsButton: {
    role: "button",
    name: "حجوزاتي",
  },
  myBookingsUrl: /my-bookings/,
  companiesMenuItem: {
    text: "الشركات",
  },
  companyBookingsMenuItem: {
    text: "حجوزات الشركة",
  },
  companyBookingsUrl: /company-bookings/,
  bookedUnitHeading: /الحجز لوحدة رقم/,
  payBookingFeesLink: {
    role: "link",
    name: "ادفع رسوم الحجز",
  },
  payFeesButton: {
    role: "button",
    name: "ادفع الرسوم",
  },
  paymentSuccessCallbackUrl: /paymentstatus=True/,
  selectPaymentMethodLink: {
    role: "link",
    name: "اختر طريقة الدفع",
  },
  paymentScheduleCard: "app-payment-schedule-v6",
  saveAndContinueButton: {
    role: "button",
    name: "حفظ ومتابعة",
  },
  signContractLink: {
    role: "link",
    name: "توقيع العقد",
  },
  contractSignedText: {
    text: "تم",
  },
  paymentScheduleHeading: {
    role: "heading",
    name: "جدول الدفع",
  },

  profileButton: {
    role: "button",
    name: /\sفردي$/,
  },
} as const;
