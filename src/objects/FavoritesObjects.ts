export const FavoritesObjects = {
  offPlanProjectPath: (projectId: number) => `/app/offplan-projects/${projectId}`,
  favoriteButton: 'button.fav-btn',

  notFavoriteIcon: '.icon-favorite',
  favoriteIcon: '.icon-heart-loved',
  favoriteApi: '/mainIntermediaryApi/v4/beneficiary/project_available_subscriptions',
  favoritesSidebarLink: 'المفضلة',
  favoritesUrl: /user-profile\/favorites/,
  projectsTab: 'المشاريع',
  favoriteCard: '.split-view-card',

  removeFavoriteButton: 'app-marketplace-card .marketplace-card__favorite',
  unfavoriteApi: '/mainIntermediaryApi/v4/beneficiary/project_available_subscriptions/unfavorite',
  emptyFavoritesTitle: 'قائمة المفضلة لديك فارغة',
  emptyFavoritesDescription: 'تفضل بزيارة صفحة السوق للعثور على خيار سكني مناسب لاحتياجاتك.',

  headerSearchButton: {
    role: 'button',
    name: 'Search',
  },
  globalSearchInput: 'ماذا تبحث عنه؟ العقارات أو الخدمات أو الدعم',
  searchResultItem: '.text-content',
  offPlanProjectUrl: /offplan-projects/,

  projectUnitsSection: 'نماذج وحدات المشروع',
  unitFavoriteIcon: '.marketplace-card__favorite-v6 > skn-icon-by-theme-v6 > .icon-by-theme-v6 > svg',
  unitFavoriteIconWrapper: '.marketplace-card__favorite-v6 > skn-icon-by-theme-v6 > .icon-by-theme-v6',
  favoritedHeartClass: /text-v6-critical-700/,
  notFavoritedHeartClass: /text-v6-paragraph-default-on-text-title/,
  unitCardTitle: /شقة معروضة للبيع في/,
  unitDetailsFavoritedButton: 'button[variant="secondary-outline"]:has(.icon-by-theme-v6[class*="text-v6-critical"])',
  favoritesUnitModelsSection: {
    role: 'heading',
    name: 'طرازات الوحدات',
  },
  favoritesProjectsSection: {
    role: 'heading',
    name: 'المشاريع',
  },
  favoritesListHeartIcon: '.use-swiper > .marketplace-card__favorite-v6',

  // Profile button text ends with " فردي" (user name + فردي); plain 'فردي' also matches the فردي/أعمال toggle
  profileButton: {
    role: 'button',
    name: /\sفردي$/,
  },
  profileFavoritesButton: {
    role: 'button',
    name: 'المفضلة',
  },
} as const;
