export const PaymentFlexiblePhase3Objects = {
  // Profile menu > حجوزاتي
  myBookingsButton: {
    role: 'button',
    name: 'حجوزاتي',
  },
  // The bookings page (حجوزاتي) url: /app/user-profile/my-activities/my-bookings/listing
  myBookingsUrl: /my-bookings/,
  // Company user: حجوزاتي side menu > الشركات > حجوزات الشركة
  companiesMenuItem: {
    text: 'الشركات',
  },
  companyBookingsMenuItem: {
    text: 'حجوزات الشركة',
  },
  // The company bookings page url: /app/user-profile/my-company/company-bookings/listing
  companyBookingsUrl: /company-bookings/,
  // Booking details heading: الحجز لوحدة رقم <unit code>
  bookedUnitHeading: /الحجز لوحدة رقم/,
  // Pay the booking fees from the booking details
  payBookingFeesLink: {
    role: 'link',
    name: 'ادفع رسوم الحجز',
  },
  payFeesButton: {
    role: 'button',
    name: 'ادفع الرسوم',
  },
  // The payment gateway redirects back with paymentstatus=True after a successful payment
  paymentSuccessCallbackUrl: /paymentstatus=True/,
  selectPaymentMethodLink: {
    role: 'link',
    name: 'اختر طريقة الدفع',
  },
  paymentScheduleCard: 'app-payment-schedule-v6',
  saveAndContinueButton: {
    role: 'button',
    name: 'حفظ ومتابعة',
  },
  // Company booking details: توقيع العقد link opens the sales contract
  signContractLink: {
    role: 'link',
    name: 'توقيع العقد',
  },
  // Shown after تحقق when the company sales contract is signed
  contractSignedText: {
    text: 'تم',
  },
  // Payment schedule section in the booking details
  paymentScheduleHeading: {
    role: 'heading',
    name: 'جدول الدفع',
  },
} as const;
