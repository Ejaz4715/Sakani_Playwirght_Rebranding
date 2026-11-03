export const NewMortgageCalculatorObjects = {
  pagePath: 'app/mortgage-page',

  rejectCookiesButton: {
    role: 'button',
    name: 'رفض ملفات تعريف الارتباط',
  },
  calculatorForm: {
    xpath: '//app-calculator-form-tpl-v6',
  },

  // Form inputs
  propertyPriceInputfield: {
    xpath: "//app-calculator-form-tpl-v6//input[@formcontrolname='propertyPrice']",
  },
  annualInterestRateInputfield: {
    xpath: "//app-calculator-form-tpl-v6//input[@formcontrolname='annualInterestRate']",
  },
  monthlyIncomeInputfield: {
    xpath: "//app-calculator-form-tpl-v6//input[@formcontrolname='monthlyIncome']",
  },
  monthlyLiabilitiesInputfield: {
    xpath: "//app-calculator-form-tpl-v6//input[@formcontrolname='monthlyLiabilities']",
  },
  downPaymentAmountInputfield: {
    xpath: "//app-calculator-form-tpl-v6//input[@formcontrolname='downPaymentAmount']",
  },
  fundingPeriodDropdownList: {
    xpath: "//app-calculator-form-tpl-v6//*[normalize-space(text())='فترة التمويل']/following::ng-select[1]",
  },
  homeTypeDropdownList: {
    xpath: "//app-calculator-form-tpl-v6//*[normalize-space(text())='نوع المسكن']/following::ng-select[1]",
  },
  firstHomeOption: {
    role: 'option',
    name: 'المسكن الأول',
  },
  secondHomeOption: {
    role: 'option',
    name: 'المسكن الثاني أو أكثر',
  },
  beneficiaryYesRadio: {
    xpath: "//input[@name='isBeneficiary'][@value='true']",
  },
  beneficiaryNoRadio: {
    xpath: "//input[@name='isBeneficiary'][@value='false']",
  },
  // Shown only after answering "yes" to the beneficiary question
  includeRedfInDownPaymentYesRadio: {
    xpath: "//input[@name='includeRedfInDownPayment'][@value='true']",
  },
  includeRedfInDownPaymentNoRadio: {
    xpath: "//input[@name='includeRedfInDownPayment'][@value='false']",
  },
  includeRedfInDownPaymentQuestion: 'هل ترغب في تضمين الدعم من ضمن قيمة الدفعة الاولى؟',

  // Buttons
  calculateButton: {
    role: 'button',
    name: 'احسب تمويلك العقاري',
  },
  // After the first calculation the calculate button is renamed
  recalculateButton: {
    role: 'button',
    name: 'المتابعة',
  },
  clearAllButton: {
    role: 'button',
    name: 'حذف الكل',
  },
  editDataButton: {
    role: 'button',
    name: 'تعديل البيانات',
  },
  exploreMatchingOptionsButton: {
    role: 'button',
    name: 'استكشف الخيارات المطابقة',
  },

  // Validation messages
  requiredFieldError: {
    xpath: "//app-calculator-form-tpl-v6//p[normalize-space()='الحقل مطلوب']",
  },
  formErrorMessages: {
    xpath: "//app-calculator-form-tpl-v6//p[contains(normalize-space(),'يجب أن تكون القيمة بين') or normalize-space()='الحقل مطلوب' or contains(normalize-space(),'لا يجوز أن يتجاوز')]",
  },

  // Result block
  resultBlock: {
    xpath: '//app-calculator-result-tpl-v6',
  },
  monthlyPaymentLabel: 'القسط الشهري',
  totalFinancingWithProfitLabel: 'إجمالي مبلغ التمويل مع الربح',
  totalInterestLabel: 'إجمالي الفائدة',
  maxPropertyPriceLabel: 'أعلى قيمة ممكنة للعقار',
  summaryMonthlyIncomeLabel: 'الدخل الشهري',
  summaryLiabilitiesLabel: 'الالتزامات البنكية',
  summaryInterestRateLabel: 'سعر الفائدة',
  summaryDownPaymentPercentageLabel: 'نسبة الدفعة الأولى',
  summaryFundingPeriodLabel: 'مدة التمويل',
} as const;

/** Amount shown after the "SAR" currency span that follows the given label in the result block. */
export const resultAmountXpath = (label: string) =>
  `//app-calculator-result-tpl-v6//*[normalize-space(text())='${label}']/following::span[contains(@class,'sar-currency')][1]/following-sibling::span[1]`;

/** First non-empty value that follows the given label in the result summary (%, dates). */
export const resultSummaryXpath = (label: string) => `//app-calculator-result-tpl-v6//span[normalize-space(.)='${label}']/following::span[normalize-space(.)!=''][1]`;
