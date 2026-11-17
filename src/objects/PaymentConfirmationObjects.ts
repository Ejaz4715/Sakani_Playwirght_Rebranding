export const PaymentConfirmationObjects = {
  closeButton: {
    xpath: "//button[text()=' إلغاء ']",
  },

  successMessage: {
    xpath: "//p[contains(text(), 'تهانينا')]",
  },
} as const;
