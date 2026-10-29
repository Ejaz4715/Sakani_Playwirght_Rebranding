'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CookieConsent = void 0;
/**
 * Cookie-consent handling.
 *
 * The site shows a cookie modal whose implementation differs by route and whose
 * appearance is delayed a few seconds after navigation:
 *   - Marketing / home pages:      Bootstrap     `#acceptCookiesModal`
 *   - Angular app routes (login):  ng-bootstrap  `ngb-modal-window.cookie-modal`
 *
 * Both use a static backdrop that intercepts pointer events until dismissed, so
 * every flow must dismiss it before interacting. Each modal renders two copies of
 * the accept/reject button (desktop + mobile); whichever is visible is clicked.
 */
class CookieConsent {
  constructor(page) {
    this.page = page;
    this.modal = page.locator('#acceptCookiesModal, ngb-modal-window.cookie-modal');
    this.shown = page.locator('#acceptCookiesModal.show, ngb-modal-window.cookie-modal.show');
    // "Accept all cookies" on the marketing pages, "Accept cookies" in the app.
    this.acceptButton = page.getByRole('button', {
      name: /قبول (كل )?ملفات تعريف الارتباط|Accept (all )?cookies/i,
    });
    this.rejectButton = page.getByRole('button', {
      name: /رفض ملفات تعريف الارتباط|Reject cookies/i,
    });
  }
  async accept() {
    await this.dismiss(this.acceptButton);
  }
  async reject() {
    await this.dismiss(this.rejectButton);
  }
  async isVisible() {
    return this.shown
      .first()
      .isVisible()
      .catch(() => false);
  }
  async dismiss(buttons) {
    const appeared = await this.shown
      .first()
      .waitFor({ state: 'visible', timeout: 8000 })
      .then(() => true)
      .catch(() => false);
    if (!appeared) return;
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      if (await btn.isVisible().catch(() => false)) {
        await btn.click();
        break;
      }
    }
    await this.shown
      .first()
      .waitFor({ state: 'hidden', timeout: 10_000 })
      .catch(() => {});
  }
}
exports.CookieConsent = CookieConsent;
