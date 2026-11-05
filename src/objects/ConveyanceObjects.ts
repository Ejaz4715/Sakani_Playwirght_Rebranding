export const ConveyanceObjects = {
  servicesButton: "//button[contains(text(),' الخدمات ')]",
  conveyanceHeaderText: "//h2[contains(text(),'إفراغ الأراضي')]",
  conveyancePageLink: { role: 'button', name: 'إفراغ الأراضي' },
  startServiceButton: { role: 'button', name: 'بدء الخدمة' },
  noActiveBookingTitle: 'عذراً',
  noActiveBookingMessage: 'لايوجد لديك حجز نشط',
  myActivitiesMenuItem: 'أنشطتي',
  conveyanceActivity: 'خدمة إفراغ الأراضي',
} as const;
