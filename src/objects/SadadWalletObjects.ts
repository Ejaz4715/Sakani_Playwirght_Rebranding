// SAK-1575 Sadad wallet usage: checkout (checkout.housingapps.sa), user portal and partners portal locators,
// verified on preBeta unless marked DRAFT.
export const SadadWalletObjects = {
  // Checkout > payment methods (mada / VISA / MasterCard / Sadad tiles)
  sadadPaymentOption: {
    xpath: "//a[@id='sadadBtn']",
  },
  sadadPaymentOptionTitle: 'الدفع بواسطة سداد',

  // Shown after choosing Sadad: biller number and invoice number to pay from the bank account
  sadadInfoPanel: {
    xpath: "//div[@id='sadadInfo']",
  },
  billerNumberValue: {
    xpath: "//div[@id='sadadInfo']//li[normalize-space()='رقم المفوتر']/following-sibling::li[1]",
  },
  invoiceNumberValue: {
    xpath: "//*[@id='InvoiceNoText']",
  },

  // User portal > my bookings list, tabs: الكل / نشطة / ملغاة / مكتملة (verified on preBeta)
  myBookingsPath: 'app/user-profile/my-activities/my-bookings/listing',
  bookingDetailsPath(bookingNumber: string) {
    return `app/user-profile/my-activities/my-bookings/view-booking/${bookingNumber}?resourceType=bookings`;
  },
  activeBookingsTabName: 'نشطة',
  cancelledBookingsTabName: 'ملغاة',

  // User portal > my bookings > booking details (verified on preBeta)
  payBookingFeesButton: {
    role: 'link',
    name: 'ادفع رسوم الحجز',
  },
  // Fee details page (.../pay-booking-fee): opens the checkout in a new tab
  payFeesButton: {
    role: 'button',
    name: 'ادفع الرسوم',
  },
  paymentStatusValue: {
    xpath: "//*[normalize-space(text())='حالة رسوم الحجز']/following::*[normalize-space()!=''][1]",
  },
  bookingInvoiceNumberValue: {
    xpath: "//*[normalize-space(text())='رقم الفاتورة']/following::*[normalize-space()!=''][1]",
  },
  awaitingPaymentStatusText: 'في انتظار السداد',
  // Shown on a cancelled booking's details, whose booking fee status reads "not paid" (verified on preBeta)
  cancelledBookingText: 'تم إلغاء هذا الحجز',
  notPaidStatusText: 'لم يتم الدفع',
  // Booking fee status after a completed payment (verified on preBeta)
  paidStatusText: 'مسددة',
  // Booking details > "جدول الدفع" after choosing a flexible schedule: "0 مسددة / 3 المدفوعات" (verified on preBeta)
  paymentScheduleProgressPattern: /\d+\s*مسددة\s*\/\s*\d+\s*المدفوعات/,

  // User portal > account > my wallet (verified on preBeta)
  walletPath: 'app/user-profile/my-wallet',
  walletHeading: {
    role: 'heading',
    name: 'محفظة',
  },
  walletBalanceSection: {
    xpath: "//h2[normalize-space()='الرصيد']/parent::*",
  },
  availableBalanceLabel: 'الرصيد المتوفر',
  reservedBalanceLabel: 'رصيد محجوز',
  totalBalanceLabel: 'إجمالي الرصيد',
  noTransactionsText: 'لا توجد معاملات',
  // "الرصيد والمعاملات" table: النوع / الخدمة / التاريخ والوقت / كمية, 5 rows per page with "عرض 1 - 5 من 24"
  // The table is built with role="row"; the header row is skipped by its "التاريخ والوقت" column title
  walletTransactionsHeaderText: 'التاريخ والوقت',
  walletTransactionRowPattern: /^(إيداع|سحب|إجراء داخلي|\S+)\s+(.+?)\s+(\d{2}\/\d{2}\/\d{4}\s*-\s*\d{2}:\d{2})\s+(?:SAR|ر\.س|﷼)?\s*([\d,.]+)$/,
  walletTransactionsCountPattern: /عرض\s*\d+\s*-\s*\d+\s*من\s*(\d+)/,
  depositTransactionType: 'إيداع',
  withdrawalTransactionType: 'سحب',
  holdTransactionService: 'حجز قيمة',
  inTransitTransactionService: 'زيادة في الطريق',

  // User portal > booking details heading: "الحجز لوحدة رقم 01-01-0862-9-105"
  bookingDetailsHeading: {
    xpath: "//h1[contains(normalize-space(),'الحجز لوحدة رقم')]",
  },
  userBookingDetailsButtonFor(unitCode: string) {
    return `//*[contains(normalize-space(text()),'${unitCode}')]/ancestor::*[.//button[normalize-space()='عرض التفاصيل']][1]//button[normalize-space()='عرض التفاصيل']`;
  },

  // Partners portal > إدارة الحجوزات > الحجوزات الفردية > booking > حجوزات tab (verified on preBeta)
  developerBookingDetailsLink: {
    xpath: "//span[normalize-space()='إظهار التفاصيل']",
  },
  developerCancelReasonDropdown: {
    xpath: "//h6[normalize-space()='لإلغاء الحجز']/following::ng-select[1]//div[contains(@class,'ng-select-container')]",
  },
  developerCancelReasonOption(reason: string) {
    return `//div[@role='option'][normalize-space()='${reason}']`;
  },
  // Disabled until a cancel reason is selected
  developerCancelBookingButton: {
    role: 'button',
    name: 'إلغاء الحجز',
  },
  // Partners portal dialogs are role="dialog" modals, found by their text
  // Shown after "إلغاء الحجز": "تأكيد إلغاء الحجز ... هل أنت متأكد من الإلغاء؟" with "إلغاء" / "المتابعة"
  developerCancelConfirmDialogText: 'تأكيد إلغاء الحجز',
  developerCancelConfirmContinueButtonName: 'المتابعة',
  // Then: "هل تريد رفع مستند؟" (upload a document?) with "لا" / "نعم"
  developerUploadDocumentDialogText: 'هل تريد رفع مستند؟',
  developerUploadDocumentNoButtonName: 'لا',
  // Then: "سيتم ابلاغ المستفيد بإلغاء الحجز هل تريد الأستمرار؟" (the beneficiary will be notified) with "لا" / "نعم"
  developerNotifyBeneficiaryDialogText: 'سيتم ابلاغ المستفيد بإلغاء الحجز',
  developerNotifyBeneficiaryYesButtonName: 'نعم',
  // After the OTP: "تم إلغاء الحجز للمستفيد 1300067088 بنجاح" with "نعم"
  developerCancelSuccessDialogText: 'تم إلغاء الحجز للمستفيد',
  developerCancelSuccessCloseButtonName: 'نعم',

  // Partners portal booking tab: approving (confirming) a paid booking request (verified on preBeta)
  developerConfirmBookingButtonName: 'تأكيد الحجز',
  developerApproveDialogText: 'لتأكيد هذا الحجز',
  developerApproveWithoutDocumentDialogText: 'دون تحميل المستند',
  developerApproveWithoutDocumentYesButtonName: 'نعم',
  developerApproveSuccessText: 'تم تأكيد الحجز بنجاح',
  awaitingApprovalStatusText: 'عرض السعر',
  developerBookingStatusValue: {
    xpath: "//*[normalize-space()='حالة حجز الوحدة']/following::input[1]",
  },
  developerCancelledStatusText: 'ملغي',
} as const;
