export const WebProfileObjects = {
  preferencesText: {
    text: 'التفضيلات',
  },
  interestRegisteredText: {
    text: 'تم تسجيل الاهتمام',
  },
  myActivities: {
    text: 'أنشطتي',
  },
  //favorits
  favoritesText: {
    text: 'المفضلة',
  },
  favoritfiltertabs: {},
  destinationsTab: {
    role: 'tab',
    name: 'الوجهات',
    exact: true,
  },
  projectsTab: {
    text: 'المشاريع',
  },
  unitModelsTab: {
    text: 'طرازات الوحدات',
  },
  unitsTab: {
    text: 'الوحدات',
  },
  servicesTab: {
    text: 'الخدمات',
  },
  emptyFavoritesMessage: {
    text: 'قائمة المفضلة لديك فارغة',
  },
  // Heart shown on every card in the favorites list, used to know the tab has items
  favoriteItemCard: '[class*="marketplace-card__favorite"]',

  // Waiting list
  registeredWaitingList: {
    text: 'قائمة الانتظار المسجل بها',
  },
  waitingListActiveTab: {
    text: 'نشطة',
  },
  noActiveWaitingListMessage: {
    text: 'ليس لديك أي مشروع ذو اشتراك نشط في قائمة الانتظار الخاصة بك',
  },
  waitingListCancelledTab: {
    text: 'ملغاة',
  },
  noCancelledWaitingListMessage: {
    text: 'ليس لديك أي إلغاءات',
  },

  // Interested
  interestedDestinationsText: {
    text: 'الوجهات',
  },
  noInterestedItemsMessage: {
    text: 'ليس لديك أي عناصر ذات اهتمام مسجل',
  },
  realEstateBrokersXPath: {
    xpath: "//span[text()='الوسطاء العقاريين']",
  },
  interestedProjectsText: {
    text: 'المشاريع',
  },
  developersText: {
    text: 'المطورون',
  },
} as const;
