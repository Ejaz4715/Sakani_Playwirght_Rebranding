import { expect, Locator, Page } from '@playwright/test';
import { FavoritesObjects } from '@objects/FavoritesObjects';

const DEFAULT_TIMEOUT = 30_000;
const LONG_TIMEOUT = 90_000;

export class FavoritesPage {
  page: Page;
  // The unit details page opens in a new tab; kept here between opening it and unfavoriting from it
  private unitDetailsTab?: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get favoriteButton() {
    return this.page.locator(FavoritesObjects.favoriteButton).filter({ visible: true }).first();
  }

  async openOffPlanProject(userPortalUrl: string, projectId: number) {
    await this.page.goto(`${userPortalUrl}${FavoritesObjects.offPlanProjectPath(projectId)}`);
    await this.favoriteButton.waitFor({ state: 'visible', timeout: LONG_TIMEOUT });
  }

  async getProjectTitle(): Promise<string> {
    const title = this.page.getByRole('heading').first();
    await title.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return (await title.innerText()).trim();
  }

  async isProjectFavorite(): Promise<boolean> {
    await this.favoriteButton.locator(`${FavoritesObjects.notFavoriteIcon}, ${FavoritesObjects.favoriteIcon}`).waitFor({ state: 'attached', timeout: DEFAULT_TIMEOUT });
    return (await this.favoriteButton.locator(FavoritesObjects.favoriteIcon).count()) > 0;
  }

  // If the project is still a favorite from an earlier run, remove it first so the add is really exercised
  async markProjectAsFavorite() {
    if (await this.isProjectFavorite()) {
      await this.favoriteButton.click();
      await this.favoriteButton.locator(FavoritesObjects.notFavoriteIcon).waitFor({ state: 'attached', timeout: DEFAULT_TIMEOUT });
    }

    const saved = this.page.waitForResponse((r) => r.url().includes(FavoritesObjects.favoriteApi) && r.request().method() === 'POST', { timeout: DEFAULT_TIMEOUT });
    await this.favoriteButton.click();
    expect((await saved).ok()).toBe(true);
    await this.favoriteButton.locator(FavoritesObjects.favoriteIcon).waitFor({ state: 'attached', timeout: DEFAULT_TIMEOUT });
  }

  async openFavoritesFromUserProfile() {
    const favoritesLink = this.page.getByText(FavoritesObjects.favoritesSidebarLink, { exact: true }).filter({ visible: true }).first();
    await favoritesLink.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await favoritesLink.click();
    await this.page.waitForURL(FavoritesObjects.favoritesUrl, { timeout: DEFAULT_TIMEOUT });
  }

  async openProjectsTab() {
    const projectsTab = this.page.getByText(FavoritesObjects.projectsTab, { exact: true }).filter({ visible: true }).first();
    await projectsTab.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await projectsTab.click();
  }

  async isProjectInFavorites(projectTitle: string): Promise<boolean> {
    const card = this.page.locator(FavoritesObjects.favoriteCard).filter({ hasText: projectTitle }).first();
    await card.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return await card.isVisible();
  }

  // Click the heart on every card until the list is empty, waiting for each removal to be saved
  async removeAllFavorites() {
    const hearts = this.page.locator(FavoritesObjects.removeFavoriteButton).filter({ visible: true });
    const emptyTitle = this.page.getByText(FavoritesObjects.emptyFavoritesTitle, { exact: true });
    await hearts.first().or(emptyTitle).waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });

    while ((await hearts.count()) > 0) {
      const before = await hearts.count();
      const removed = this.page.waitForResponse((r) => r.url().includes(FavoritesObjects.unfavoriteApi) && r.request().method() === 'DELETE', { timeout: DEFAULT_TIMEOUT });
      await hearts.first().click();
      expect((await removed).ok()).toBe(true);
      await expect(hearts).not.toHaveCount(before, { timeout: DEFAULT_TIMEOUT });
    }
  }

  async searchAndOpenProject(projectName: string) {
    const searchButton = this.page.getByRole(FavoritesObjects.headerSearchButton.role, { name: FavoritesObjects.headerSearchButton.name });
    const searchInput = this.page.getByPlaceholder(FavoritesObjects.globalSearchInput);
    const result = this.page.locator(FavoritesObjects.searchResultItem).getByText(projectName, { exact: true }).first();

    await expect(async () => {
      if (!(await searchInput.isVisible())) {
        await searchButton.click({ timeout: 10000 });
      }
      await searchInput.fill(projectName, { timeout: 10000 });
      await result.click({ timeout: 15000 });
      await this.page.waitForURL(FavoritesObjects.offPlanProjectUrl, { timeout: 15000, waitUntil: 'commit' });
    }).toPass({ timeout: process.env.PWDEBUG ? 0 : LONG_TIMEOUT });
  }

  async openProjectUnitsTab() {
    const unitsSection = this.page.getByText(FavoritesObjects.projectUnitsSection).first();
    await unitsSection.waitFor({ state: 'attached', timeout: LONG_TIMEOUT });
    await unitsSection.scrollIntoViewIfNeeded();
  }

  async markFirstUnitAsFavorite(): Promise<string> {
    const { unitName, favoriteIcon, favoriteIconWrapper } = await this.getFirstUnitCard();

    const firstToggle = await this.clickUnitFavoriteAndWaitForSave(favoriteIcon);
    if (firstToggle === 'DELETE') {
      expect(await this.clickUnitFavoriteAndWaitForSave(favoriteIcon)).toBe('POST');
    }
    await expect(favoriteIconWrapper).toHaveClass(FavoritesObjects.favoritedHeartClass, { timeout: DEFAULT_TIMEOUT });
    return unitName;
  }

  async markFirstUnitAsUnfavorite(): Promise<string> {
    const { unitName, favoriteIcon, favoriteIconWrapper } = await this.getFirstUnitCard();
    await expect(favoriteIconWrapper).toHaveClass(FavoritesObjects.favoritedHeartClass, { timeout: DEFAULT_TIMEOUT });
    expect(await this.clickUnitFavoriteAndWaitForSave(favoriteIcon)).toBe('DELETE');
    await expect(favoriteIconWrapper).toHaveClass(FavoritesObjects.notFavoritedHeartClass, { timeout: DEFAULT_TIMEOUT });
    return unitName;
  }

  async openFirstUnitDetails(): Promise<string> {
    const { unitName } = await this.getFirstUnitCard();
    const newTab = this.page.context().waitForEvent('page', { timeout: DEFAULT_TIMEOUT });
    await this.page.getByText(FavoritesObjects.unitCardTitle).first().click();
    this.unitDetailsTab = await newTab;
    await this.unitDetailsTab.getByText(FavoritesObjects.unitCardTitle).filter({ visible: true }).first().waitFor({ state: 'visible', timeout: LONG_TIMEOUT });
    return unitName;
  }

  async clickFirstUnitFavoriteAsGuest() {
    const { favoriteIcon } = await this.getFirstUnitCard();
    await favoriteIcon.click();
  }

  async verifyUnitDetailsFavoriteIconIsRed() {
    const favoritedButton = this.unitDetailsTab!.locator(FavoritesObjects.unitDetailsFavoritedButton).filter({ visible: true }).first();
    await expect(favoritedButton).toBeVisible({ timeout: LONG_TIMEOUT });
  }

  async unfavoriteUnitFromDetailsPage() {
    const detailsTab = this.unitDetailsTab!;
    const favoritedButton = detailsTab.locator(FavoritesObjects.unitDetailsFavoritedButton).filter({ visible: true }).first();
    expect(await this.clickUnitFavoriteAndWaitForSave(favoritedButton, detailsTab)).toBe('DELETE');
    await expect(favoritedButton).toBeHidden({ timeout: DEFAULT_TIMEOUT });
    await detailsTab.close();
    this.unitDetailsTab = undefined;
  }

  private async getFirstUnitCard(): Promise<{ unitName: string; favoriteIcon: Locator; favoriteIconWrapper: Locator }> {
    const unitTitle = this.page.getByText(FavoritesObjects.unitCardTitle).first();
    await unitTitle.waitFor({ state: 'visible', timeout: LONG_TIMEOUT });
    const unitName = (await unitTitle.innerText()).trim();

    const favoriteIcon = this.page.locator(FavoritesObjects.unitFavoriteIcon).first();
    const favoriteIconWrapper = this.page.locator(FavoritesObjects.unitFavoriteIconWrapper).first();
    await unitTitle.scrollIntoViewIfNeeded();
    await favoriteIcon.scrollIntoViewIfNeeded();
    await favoriteIcon.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return { unitName, favoriteIcon, favoriteIconWrapper };
  }

  async openFavoritesFromProfileMenu() {
    const profileButton = this.page.getByRole(FavoritesObjects.profileButton.role, { name: FavoritesObjects.profileButton.name }).first();
    await profileButton.waitFor({ state: 'visible', timeout: LONG_TIMEOUT });
    await profileButton.click();
    await this.page.getByRole(FavoritesObjects.profileFavoritesButton.role, { name: FavoritesObjects.profileFavoritesButton.name }).click();
    await this.page.waitForURL(FavoritesObjects.favoritesUrl, { timeout: DEFAULT_TIMEOUT, waitUntil: 'commit' });
  }

  private async clickUnitFavoriteAndWaitForSave(favoriteIcon: Locator, page: Page = this.page): Promise<string> {
    const saved = page.waitForResponse((r) => r.url().includes(FavoritesObjects.favoriteApi) && ['POST', 'DELETE'].includes(r.request().method()), { timeout: DEFAULT_TIMEOUT });
    await favoriteIcon.click();
    const response = await saved;
    expect(response.ok()).toBe(true);
    return response.request().method();
  }

  async verifyUnitInFavorites(unitName: string) {
    const unitModelsSection = this.page.getByRole(FavoritesObjects.favoritesUnitModelsSection.role, { name: FavoritesObjects.favoritesUnitModelsSection.name });
    await unitModelsSection.waitFor({ state: 'visible', timeout: LONG_TIMEOUT });
    await unitModelsSection.scrollIntoViewIfNeeded();
    await expect(this.page.locator(FavoritesObjects.favoritesListHeartIcon).first()).toBeVisible({ timeout: LONG_TIMEOUT });
    const favoriteUnitTitle = this.page.getByText(FavoritesObjects.unitCardTitle).filter({ visible: true }).first();
    await expect(favoriteUnitTitle).toBeVisible({ timeout: DEFAULT_TIMEOUT });
    await expect(favoriteUnitTitle).toHaveText(unitName, { timeout: DEFAULT_TIMEOUT });
  }

  async verifyUnitNotInFavorites(unitName: string) {
    const loaded = this.page
      .getByRole(FavoritesObjects.favoritesProjectsSection.role, { name: FavoritesObjects.favoritesProjectsSection.name })
      .or(this.page.getByRole(FavoritesObjects.favoritesUnitModelsSection.role, { name: FavoritesObjects.favoritesUnitModelsSection.name }))
      .or(this.page.getByText(FavoritesObjects.emptyFavoritesTitle, { exact: true }));
    await expect(loaded.first()).toBeVisible({ timeout: LONG_TIMEOUT });

    const favoriteUnitTitle = this.page.getByText(FavoritesObjects.unitCardTitle).filter({ hasText: unitName, visible: true });
    await expect(favoriteUnitTitle).toHaveCount(0, { timeout: DEFAULT_TIMEOUT });
  }

  async isEmptyFavoritesMessageVisible(): Promise<boolean> {
    const title = this.page.getByText(FavoritesObjects.emptyFavoritesTitle, { exact: true });
    const description = this.page.getByText(FavoritesObjects.emptyFavoritesDescription, { exact: true });
    await title.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    await description.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return (await title.isVisible()) && (await description.isVisible());
  }
}
