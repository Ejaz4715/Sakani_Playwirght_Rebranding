'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FavoritesPage = void 0;
const test_1 = require('@playwright/test');
const FavoritesObjects_1 = require('@objects/FavoritesObjects');
const DEFAULT_TIMEOUT = 30_000;
const LONG_TIMEOUT = 90_000;
class FavoritesPage {
  constructor(page) {
    this.page = page;
  }
  get favoriteButton() {
    return this.page.locator(FavoritesObjects_1.FavoritesObjects.favoriteButton).filter({ visible: true }).first();
  }
  async openOffPlanProject(userPortalUrl, projectId) {
    await this.page.goto(`${userPortalUrl}${FavoritesObjects_1.FavoritesObjects.offPlanProjectPath(projectId)}`);
    await this.favoriteButton.waitFor({ state: 'visible', timeout: LONG_TIMEOUT });
  }
  async getProjectTitle() {
    const title = this.page.getByRole('heading').first();
    await title.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return (await title.innerText()).trim();
  }
  async isProjectFavorite() {
    await this.favoriteButton
      .locator(`${FavoritesObjects_1.FavoritesObjects.notFavoriteIcon}, ${FavoritesObjects_1.FavoritesObjects.favoriteIcon}`)
      .waitFor({ state: 'attached', timeout: DEFAULT_TIMEOUT });
    return (await this.favoriteButton.locator(FavoritesObjects_1.FavoritesObjects.favoriteIcon).count()) > 0;
  }
  // If the project is still a favorite from an earlier run, remove it first so the add is really exercised
  async markProjectAsFavorite() {
    if (await this.isProjectFavorite()) {
      await this.favoriteButton.click();
      await this.favoriteButton.locator(FavoritesObjects_1.FavoritesObjects.notFavoriteIcon).waitFor({ state: 'attached', timeout: DEFAULT_TIMEOUT });
    }
    const saved = this.page.waitForResponse((r) => r.url().includes(FavoritesObjects_1.FavoritesObjects.favoriteApi) && r.request().method() === 'POST', { timeout: DEFAULT_TIMEOUT });
    await this.favoriteButton.click();
    (0, test_1.expect)((await saved).ok()).toBe(true);
    await this.favoriteButton.locator(FavoritesObjects_1.FavoritesObjects.favoriteIcon).waitFor({ state: 'attached', timeout: DEFAULT_TIMEOUT });
  }
  async openFavoritesFromUserProfile() {
    const favoritesLink = this.page.getByText(FavoritesObjects_1.FavoritesObjects.favoritesSidebarLink, { exact: true }).filter({ visible: true }).first();
    await favoritesLink.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await favoritesLink.click();
    await this.page.waitForURL(FavoritesObjects_1.FavoritesObjects.favoritesUrl, { timeout: DEFAULT_TIMEOUT });
  }
  async openProjectsTab() {
    const projectsTab = this.page.getByText(FavoritesObjects_1.FavoritesObjects.projectsTab, { exact: true }).filter({ visible: true }).first();
    await projectsTab.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await projectsTab.click();
  }
  async isProjectInFavorites(projectTitle) {
    const card = this.page.locator(FavoritesObjects_1.FavoritesObjects.favoriteCard).filter({ hasText: projectTitle }).first();
    await card.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await card.isVisible();
  }
  // Click the heart on every card until the list is empty, waiting for each removal to be saved
  async removeAllFavorites() {
    const hearts = this.page.locator(FavoritesObjects_1.FavoritesObjects.removeFavoriteButton).filter({ visible: true });
    const emptyTitle = this.page.getByText(FavoritesObjects_1.FavoritesObjects.emptyFavoritesTitle, { exact: true });
    await hearts.first().or(emptyTitle).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    while ((await hearts.count()) > 0) {
      const before = await hearts.count();
      const removed = this.page.waitForResponse((r) => r.url().includes(FavoritesObjects_1.FavoritesObjects.unfavoriteApi) && r.request().method() === 'DELETE', { timeout: DEFAULT_TIMEOUT });
      await hearts.first().click();
      (0, test_1.expect)((await removed).ok()).toBe(true);
      await (0, test_1.expect)(hearts).not.toHaveCount(before, { timeout: DEFAULT_TIMEOUT });
    }
  }
  async isEmptyFavoritesMessageVisible() {
    const title = this.page.getByText(FavoritesObjects_1.FavoritesObjects.emptyFavoritesTitle, { exact: true });
    const description = this.page.getByText(FavoritesObjects_1.FavoritesObjects.emptyFavoritesDescription, { exact: true });
    await title.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await description.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return (await title.isVisible()) && (await description.isVisible());
  }
}
exports.FavoritesPage = FavoritesPage;
