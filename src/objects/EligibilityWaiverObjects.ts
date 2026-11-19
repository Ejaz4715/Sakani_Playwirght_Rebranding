export const EligibilityWaiverObjects = {
  waiveThEligibilityCard: {
    xpath: "//p[text()=' التنازل عن استحقاق الدعم السكني ']",
  },
  nextButton: {
    xpath: "//button[text()=' التالي ']",
  },
  waiverAssigneeRadioButton: {
    xpath: "//skn-radio-v6[@name='waiver-assignee']",
  },
  agreesTermsAndCOnditionCheckbox: {
    xpath: "//skn-checkbox-v6[@fieldid='agreeTerms']",
  },
  submitButton: {
    xpath: "//button[text()=' إرسال ']",
  },
  closeButtonRatingPopup: {
    xpath: "//button[contains(text(), 'إلغاء')]",
  },
  waivedSuccessfulMessage: {
    text: 'تم تقديم طلب الإعفاء بنجاح',
  },
  undoTheEligibilityWaiverCard: {
    xpath: "//p[text()=' التراجع عن تنازل استحقاق الدعم السكني ']",
  },
  undoReasonRadioButton: {
    xpath: "//input[@aria-label='التراجع عن التنازل']/parent::label",
  },
  undoWaiveAgreementCheckbox: {
    xpath: "//skn-checkbox-v6[@fieldid='undoWaiveAgreement']",
  },
  undoWaivedSuccessfulMessage: {
    text: 'تم إكمال طلبك.',
  },
} as const;
