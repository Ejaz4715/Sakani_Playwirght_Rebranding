'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.LoginObjects = void 0;
exports.LoginObjects = {
  acceptCookiesModal: '#acceptCookiesModal',
  acceptCookiesButton: {
    role: 'button',
    name: 'قبول ملفات تعريف الارتباط',
  },
  closeCookiesModal: '.svg-icon.icon-close-dark',
  loginButton: "//span[contains (text(), 'تسجيل الدخول')]/parent::a",
  preBetaLoginButton: "//button[contains(text(),' تسجيل الدخول ')]",
  preBetaUsernameField: 'input#username',
  preBetaNafathIdField: '.cdk-overlay-container input',
  preBetaNafathContinueButton: "//div[contains(@class,'cdk-overlay-container')]//button[contains(text(),' المتابعة ')]",
  // The privacy policy dialog is rendered under an aria-hidden backdrop, so getByRole can't see it
  preBetaPrivacyPolicyContinueButton: "//div[contains(@class,'cdk-overlay-container')]//button[contains(.,'موافقة واستمرار')]",
  continueWithNafathButton: {
    role: 'button',
    name: 'المتابعة مع نفاذ',
  },
  nafathIdInput: {
    role: 'textbox',
    name: 'e.g:',
  },
  continueButton: {
    role: 'button',
    name: 'المتابعة',
  },
  nafathPromptHeading: {
    role: 'heading',
    name: 'افتح تطبيق نفاذ',
  },
  newUserContinueButton: {
    role: 'button',
    name: 'موافقة واستمرار',
  },
  allowNotificationsButton: {
    role: 'button',
    name: 'Allow',
  },
};
