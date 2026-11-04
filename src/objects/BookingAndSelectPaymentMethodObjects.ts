export const BookingAndSelectPaymentMethodObjects = {
  approveAndcontinueButton: {
    xpath: "//button[contains(text(),'موافقة واستمرار')]",
  },
  payBookingFeesButton: {
    xpath: "//button/span[contains(text(),'دفع رسوم الحجز')]",
  },
  termsCheckbox: {
    xpath: "//input[@formcontrolname='accepted_term']",
  },
  unitCode: {
    xpath: '//app-offplan-comprehensive-information/descendant::h2',
  },
  selectPaymentMehtButton: {
    xpath: "//button[contains(text(),'اختر طريقة الدفع')]",
  },
  flexiblePaymentRadioButton: {
    xpath: "//input[contains(@id, 'flexible_payment_schedule')]",
  },
  electronicFinancePaymentRadioButton: {
    xpath: "//input[@id='lendRadio']/preceding-sibling::label",
  },
  cashPaymentRadioButton: {
    xpath: "//input[@id='cashRadio']/preceding-sibling::label",
  },
  saveAndContinueButton: {
    xpath: "//button[contains(text(), 'حفظ ومتابعة')]",
  },
  signContractButton: {
    xpath: "//button[contains(text(), 'توقيع العقد')]",
  },
  bookingDetailsButton: {
    xpath: "//button[contains(text(), 'تفاصيل الحجز')]",
  },
  paymentTypeText(type: string) {
    return `//app-offplan-payment-details-section/descendant::span[normalize-space() = '${type}']`;
  },

  // Pre-beta booking flow
  // Unit card on the unit model page
  unitModelUnitCard: 'app-marketplace-unit-card-v6',
  bookUnitButton: {
    role: 'button',
    name: 'احجز وحدة',
  },
  // Shown instead of احجز وحدة when the unit can only be booked with the developer
  bookWithDeveloperMessage: /الحجز مع المطور|يرجى زيارة المطور العقاري للحجز/,
  // Shown when the user already has another request, نعم continues the booking
  yesButton: {
    text: 'نعم',
  },
  bookingSummaryUrl: /booking-summary/,
  termsCheckboxV6: {
    role: 'checkbox',
    name: 'checkbox',
  },
  payBookingFeesButtonV6: {
    role: 'button',
    name: 'دفع رسوم الحجز',
  },
  checkoutUrl: /checkout\.housingapps\.sa/,
  checkoutAmountHeading: {
    role: 'heading',
  },
  invoiceSummaryButton: {
    role: 'button',
    name: 'عرض ملخص الفاتورة',
  },
  invoiceSummaryModal: '#invoiceModal',
  amountDueText: {
    text: 'المبلغ المستحق',
  },
  closeInvoiceSummaryButton: {
    role: 'button',
    name: 'Close',
  },
  bookingDetailsSection: 'app-booking-details-tpl-v6',
  bookingFeesText: {
    text: 'رسوم الحجز',
  },
} as const;
