'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PaymentTrackingPage = void 0;
const test_1 = require('@playwright/test');
const PaymentTrackingObjects_1 = require('@objects/PaymentTrackingObjects');
class PaymentTrackingPage {
  constructor(page) {
    this.page = page;
  }
  async clickOnProjectSettings() {
    const projectSettings = this.page.getByText(PaymentTrackingObjects_1.PaymentTrackingObjects.projectSettings.text);
    await (0, test_1.expect)(projectSettings).toBeVisible({ timeout: 90000 });
    await projectSettings.click();
  }
  async clickOnUseGeneralSettingSwitch() {
    const useGeneralSettingSwitch = this.page.getByRole(PaymentTrackingObjects_1.PaymentTrackingObjects.useGeneralSettingSwitch.role, {
      name: PaymentTrackingObjects_1.PaymentTrackingObjects.useGeneralSettingSwitch.name,
    });
    await (0, test_1.expect)(useGeneralSettingSwitch).toBeVisible({ timeout: 90000 });
    await useGeneralSettingSwitch.click();
  }
  async clickOnPaymentCollectionAutomationSwitch() {
    const paymentCollectionAutomationSwitch = this.page.getByRole(PaymentTrackingObjects_1.PaymentTrackingObjects.paymentCollectionAutomationSwitch.role, {
      name: PaymentTrackingObjects_1.PaymentTrackingObjects.paymentCollectionAutomationSwitch.name,
    });
    await (0, test_1.expect)(paymentCollectionAutomationSwitch).toBeVisible({ timeout: 90000 });
    await paymentCollectionAutomationSwitch.click();
  }
  async clickOnSaveButton() {
    const saveButton = this.page.getByRole(PaymentTrackingObjects_1.PaymentTrackingObjects.saveButton.role, { name: PaymentTrackingObjects_1.PaymentTrackingObjects.saveButton.name });
    await (0, test_1.expect)(saveButton).toBeVisible({ timeout: 90000 });
    await saveButton.click();
  }
  async verifySaveSuccessToast() {
    const saveSuccessToast = this.page.getByText(PaymentTrackingObjects_1.PaymentTrackingObjects.saveSuccessToast.text);
    await (0, test_1.expect)(saveSuccessToast).toBeVisible({ timeout: 120000 });
  }
  async clickOnPaymentTrackingTab() {
    const paymentTrackingTab = this.page.locator(PaymentTrackingObjects_1.PaymentTrackingObjects.paymntTrackingTab.xpath);
    await (0, test_1.expect)(paymentTrackingTab).toBeVisible({ timeout: 90000 });
    await paymentTrackingTab.click();
  }
  async fillUnitCode(unitCodeNew) {
    const unitCodeInputfield = this.page.locator(PaymentTrackingObjects_1.PaymentTrackingObjects.unitCodeInputfield.xpath);
    await (0, test_1.expect)(unitCodeInputfield).toBeVisible({ timeout: 90000 });
    await unitCodeInputfield.fill(unitCodeNew);
  }
  async fillSearchUnit(unitCodeNew) {
    const searchUnitInputfield = this.page.locator(PaymentTrackingObjects_1.PaymentTrackingObjects.searchUnitInputfield.xpath);
    await (0, test_1.expect)(searchUnitInputfield).toBeVisible({ timeout: 90000 });
    await searchUnitInputfield.fill(unitCodeNew);
  }
  async clickOnSearchButton() {
    const searchButton = this.page.locator(PaymentTrackingObjects_1.PaymentTrackingObjects.searchButton.xpath);
    await (0, test_1.expect)(searchButton).toBeVisible({ timeout: 90000 });
    await searchButton.click();
  }
  async clickOnSearchedUnit() {
    const searchedUnit = this.page.locator(PaymentTrackingObjects_1.PaymentTrackingObjects.searchedUnit.xpath);
    await (0, test_1.expect)(searchedUnit).toBeVisible({ timeout: 90000 });
    await searchedUnit.click();
  }
  async clickOnBeneficiariesSideMenu() {
    const beneficiariesSideMenu = this.page.locator(PaymentTrackingObjects_1.PaymentTrackingObjects.beneficiariesSideMenu.xpath);
    await (0, test_1.expect)(beneficiariesSideMenu).toBeVisible({ timeout: 90000 });
    await beneficiariesSideMenu.click();
  }
  async clickOnBeneficiariesListSideMenu() {
    const beneficiariesListSideMenu = this.page.locator(PaymentTrackingObjects_1.PaymentTrackingObjects.beneficiariesListSideMenu.xpath);
    await (0, test_1.expect)(beneficiariesListSideMenu).toBeVisible({ timeout: 90000 });
    await beneficiariesListSideMenu.click();
  }
  async clickOnSearchButtonForUnit() {
    const searchButtonForUnit = this.page.locator(PaymentTrackingObjects_1.PaymentTrackingObjects.searchButtonForUnit.xpath);
    await (0, test_1.expect)(searchButtonForUnit).toBeVisible({ timeout: 90000 });
    await searchButtonForUnit.click();
  }
  async clickOnSearchResult() {
    const searchedResult = this.page.locator(PaymentTrackingObjects_1.PaymentTrackingObjects.searchedresult.xpath);
    await this.page.waitForTimeout(7000);
    await (0, test_1.expect)(searchedResult).toBeVisible({ timeout: 120000 });
    await searchedResult.click();
  }
  async clickOnBookingDetailsTab() {
    const bookingDetailsTab = this.page.locator(PaymentTrackingObjects_1.PaymentTrackingObjects.bookingDetailsTab.xpath);
    await (0, test_1.expect)(bookingDetailsTab).toBeVisible({ timeout: 90000 });
    await bookingDetailsTab.click();
  }
  async waitForCompletionPercentageVisible() {
    const completionPercentage = this.page.locator(PaymentTrackingObjects_1.PaymentTrackingObjects.competionPercentage.xpath);
    await (0, test_1.expect)(completionPercentage).toBeVisible({ timeout: 90000 });
  }
  async waitForSpecifiedPeriodVisible() {
    const specifiedPeriod = this.page.locator(PaymentTrackingObjects_1.PaymentTrackingObjects.specifiedPeriod.xpath);
    await (0, test_1.expect)(specifiedPeriod).toBeVisible({ timeout: 90000 });
  }
  async selectSearchByOption() {
    const searchByDropdownList = this.page.locator(PaymentTrackingObjects_1.PaymentTrackingObjects.searchByDropdownList.xpath);
    const searchedOption = this.page.getByRole(PaymentTrackingObjects_1.PaymentTrackingObjects.searchedOption.role, { name: PaymentTrackingObjects_1.PaymentTrackingObjects.searchedOption.name });
    await (0, test_1.expect)(searchByDropdownList).toBeVisible({ timeout: 90000 });
    await searchByDropdownList.click();
    await (0, test_1.expect)(searchedOption).toBeVisible({ timeout: 90000 });
    await searchedOption.click();
  }
}
exports.PaymentTrackingPage = PaymentTrackingPage;
