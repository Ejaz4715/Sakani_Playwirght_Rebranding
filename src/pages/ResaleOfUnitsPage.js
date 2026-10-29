'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ResaleOfUnitsPage = void 0;
const test_1 = require('@playwright/test');
const ResaleOfUnitsObjects_1 = require('@objects/ResaleOfUnitsObjects');
const BookingCancellationObjects_1 = require('@objects/BookingCancellationObjects');
const fs_1 = __importDefault(require('fs'));
const path_1 = __importDefault(require('path'));
class ResaleOfUnitsPage {
  constructor(page) {
    this.page = page;
  }
  //Enter project name
  async fillProjectName(projectName) {
    const projectNameInputfield = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.projectNameInputfield.xpath);
    await this.page.waitForTimeout(3000);
    await (0, test_1.expect)(projectNameInputfield).toBeVisible({ timeout: 90000 });
    await projectNameInputfield.fill(projectName);
  }
  //Click on search button
  async clickProjectSearchButton() {
    const projectSearchButton = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.projectSearchButton.role, {
      name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.projectSearchButton.name,
    });
    await (0, test_1.expect)(projectSearchButton).toBeVisible({ timeout: 90000 });
    await projectSearchButton.click();
  }
  //Click on the searched project result
  async clickSearchedProjectResult(projectName) {
    const searchedProjectResult = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.searchedProjectResult.role, {
      name: projectName,
      exact: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.searchedProjectResult.exact,
    });
    await (0, test_1.expect)(searchedProjectResult).toBeVisible({ timeout: 90000 });
    await searchedProjectResult.click();
  }
  //Click on resale settings tab menu
  async clickOnResaleSettingTab() {
    const resaleSettingsTab = this.page.getByText(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.resaleSettingTab.text);
    await this.page.waitForTimeout(9000);
    await (0, test_1.expect)(resaleSettingsTab).toBeVisible({ timeout: 90000 });
    await resaleSettingsTab.click();
  }
  //Switch on use general resale settings
  async clickOnuseGeneralResaleSettingsSwitch() {
    const useGeneralResaleSettingsSwitch = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.useGeneralResaleSettingsSwitch.role, {
      name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.useGeneralResaleSettingsSwitch.name,
    });
    await (0, test_1.expect)(useGeneralResaleSettingsSwitch).toBeVisible({ timeout: 90000 });
    await useGeneralResaleSettingsSwitch.click();
  }
  //Select relase fee type - percentage
  async selectResaleFeeType() {
    const resaleFeeTypeDropdownList = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.resaleFeeTypeDropdownList.xpath);
    const resaleFeeTypeOption = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.resaleTypeOption.role, {
      name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.resaleTypeOption.name,
    });
    await (0, test_1.expect)(resaleFeeTypeDropdownList).toBeVisible({ timeout: 90000 });
    await resaleFeeTypeDropdownList.click();
    await (0, test_1.expect)(resaleFeeTypeOption).toBeVisible({ timeout: 90000 });
    await resaleFeeTypeOption.click();
  }
  //Enter resale fee value
  async fillResaleFeeValue(value) {
    const resaleFeeValueInputfield = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.resaleFeeValueInputfield.xpath);
    await (0, test_1.expect)(resaleFeeValueInputfield).toBeVisible({ timeout: 90000 });
    await resaleFeeValueInputfield.fill(String(value));
  }
  //Click on save button
  async clickOnSaveButton() {
    const saveButton = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.saveButton.role, {
      name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.saveButton.name,
    });
    await (0, test_1.expect)(saveButton).toBeVisible({ timeout: 90000 });
    await saveButton.click();
  }
  //Validate the exsitence of toast message
  async verifyTheToastMessage() {
    const toastMessage = this.page.getByText(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.toastMessage.text);
    await (0, test_1.expect)(toastMessage).toBeVisible({ timeout: 120000 });
  }
  //Validate the buyer is added by existence of the toast message
  async verifyBuyerAddedToastMessage() {
    const toastMessageBuyer = this.page.getByText(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.toastMessageBuyer.text);
    await (0, test_1.expect)(toastMessageBuyer).toBeVisible({ timeout: 120000 });
  }
  //Click on resale of units button
  async clickOnResaleOfUnitsButton() {
    const resaleOfUnitsButton = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.resaleOfUnitsButton.xpath);
    await (0, test_1.expect)(resaleOfUnitsButton).toBeVisible({ timeout: 150000 });
    await resaleOfUnitsButton.click();
  }
  //Select assign to buyer radio button option
  async clickOnAssignToBuyerOption() {
    const assignToBuyerOption = this.page.getByText(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.assignToBuyerOption.text);
    await (0, test_1.expect)(assignToBuyerOption).toBeVisible({ timeout: 90000 });
    await assignToBuyerOption.click();
  }
  //Select assign without buyer radio button option
  async clickOnAssignWithoutBuyerOption() {
    const assignWithoutBuyerOption = this.page.getByText(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.assignWithoutBuyerOption.text);
    await (0, test_1.expect)(assignWithoutBuyerOption).toBeVisible({ timeout: 90000 });
    await assignWithoutBuyerOption.click();
  }
  //Enter buyer id
  async fillBuyerIdInputfield(buyerId) {
    const buyerIdInputfield = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.buyerIdInputfield.xpath);
    await (0, test_1.expect)(buyerIdInputfield).toBeVisible({ timeout: 90000 });
    await buyerIdInputfield.fill(buyerId);
  }
  //Enter buyer date of birth
  async fillBuyerDobInputfield(buyerDob) {
    const buyerDobInputfield = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.buyerDobInputfield.xpath);
    await (0, test_1.expect)(buyerDobInputfield).toBeVisible({ timeout: 90000 });
    await buyerDobInputfield.fill(buyerDob);
  }
  //Select from calender - Hijri
  async selectBuyerDobFromHijriCalendar(buyerDob) {
    if (!/^\d{8}$/.test(buyerDob)) {
      throw new Error(`buyerDOB must use DDMMYYYY format, for example 08041414. Received: ${buyerDob}`);
    }
    const day = Number(buyerDob.slice(0, 2));
    const month = Number(buyerDob.slice(2, 4));
    const year = Number(buyerDob.slice(4, 8));
    const hijriMonths = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
    const monthName = hijriMonths[month - 1];
    if (!monthName) {
      throw new Error(`Hijri month must be between 1 and 12. Received: ${month}`);
    }
    const yearSelect = this.page.locator('select[title="Select year"]:visible');
    await (0, test_1.expect)(yearSelect).toBeVisible({ timeout: 90000 });
    await yearSelect.selectOption(String(year));
    const monthSelect = this.page.locator('select[title="Select month"]:visible');
    await (0, test_1.expect)(monthSelect).toBeVisible({ timeout: 90000 });
    await monthSelect.selectOption(String(month - 1));
    const dayCell = this.page.getByText(String(day), { exact: true }).last();
    await (0, test_1.expect)(dayCell).toBeVisible({ timeout: 90000 });
    await dayCell.click();
  }
  //Click on verify button
  async clickOnVerifyButton() {
    const verifyButton = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.verifyButton.xpath);
    await (0, test_1.expect)(verifyButton).toBeVisible({ timeout: 90000 });
    await verifyButton.click();
  }
  //Click on next to financial button
  async clickOnNextToFinancialInfoButton() {
    const nextToFinancialInfoButton = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.nextToFinancialInfoButton.role, {
      name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.nextToFinancialInfoButton.name,
    });
    await (0, test_1.expect)(nextToFinancialInfoButton).toBeVisible({ timeout: 90000 });
    await nextToFinancialInfoButton.click();
  }
  //Select resale reason - financial reason
  async selectResaleReason() {
    const resaleReasonDropdownList = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.resaleReasonDropdownList.xpath);
    const resaleReasonOption = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.resalReasonOption.role, { name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.resalReasonOption.name });
    await (0, test_1.expect)(resaleReasonDropdownList).toBeVisible({ timeout: 90000 });
    await resaleReasonDropdownList.click();
    await (0, test_1.expect)(resaleReasonOption).toBeVisible({ timeout: 90000 });
    await resaleReasonOption.click();
  }
  //Enter resale reason deatails
  async fillResaleReasonDetails(details) {
    const resaleReasonDetailsTextarea = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.resaleReasonDetailsTextarea.xpath);
    await (0, test_1.expect)(resaleReasonDetailsTextarea).toBeVisible({ timeout: 90000 });
    await resaleReasonDetailsTextarea.fill(details);
  }
  //Enter waiver amount
  async fillWaiverAmount(amount) {
    const waiverAmountInputfield = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.waiverAmountInputfield.xpath);
    await (0, test_1.expect)(waiverAmountInputfield).toBeVisible({ timeout: 90000 });
    await waiverAmountInputfield.fill(String(amount));
  }
  //Select payment method - cash
  async selectPaymentMethod() {
    const paymentMethodDropdownList = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.paymentMethodDropdownList.xpath);
    const paymentMethodOption = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.paymentMethodOption.role, {
      name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.paymentMethodOption.name,
    });
    await (0, test_1.expect)(paymentMethodDropdownList).toBeVisible({ timeout: 90000 });
    await paymentMethodDropdownList.click();
    await (0, test_1.expect)(paymentMethodOption).toBeVisible({ timeout: 90000 });
    await paymentMethodOption.click();
  }
  //Enter proce amount
  async fillPriceAmountInputfield(priceAmount) {
    const priceAmountInputfield = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.priceAmountInpufield.xpath);
    await (0, test_1.expect)(priceAmountInputfield).toBeVisible({ timeout: 90000 });
    await priceAmountInputfield.fill(String(priceAmount));
  }
  //Enter price amount percentage
  async fillPriceAmountPercentageInputfield(priceAmountPercentage) {
    const priceAmountPercentageInputfield = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.priceAmountPercentageInputfield.xpath);
    await (0, test_1.expect)(priceAmountPercentageInputfield).toBeVisible({ timeout: 90000 });
    await priceAmountPercentageInputfield.fill(String(priceAmountPercentage));
  }
  //Enter completion percengate
  async fillCompletionPercentageInputfield(completionPercentage) {
    const completionPercentageInputfield = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.complectionPercentageInputfield.xpath);
    await (0, test_1.expect)(completionPercentageInputfield).toBeVisible({ timeout: 90000 });
    await completionPercentageInputfield.fill(String(completionPercentage));
  }
  //Select status - unpaid
  async selectStatus() {
    const statusDropdownList = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.statusDropdownList.xpath);
    const statusOption = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.statusOption.role, { name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.statusOption.name });
    await (0, test_1.expect)(statusDropdownList).toBeVisible({ timeout: 90000 });
    await statusDropdownList.click();
    await (0, test_1.expect)(statusOption).toBeVisible({ timeout: 90000 });
    await statusOption.click();
  }
  //Click on add installment button
  async clickOnAddInstallmentButton() {
    const addInstallmentButton = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.addInstallmentButton.xpath);
    await (0, test_1.expect)(addInstallmentButton).toBeVisible({ timeout: 90000 });
    await addInstallmentButton.click();
  }
  //Check on disclamer waiver
  async clickOnDisclaimerWaiverCheckbox() {
    const disclaimerWaiverCheckbox = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.desclaimerWaiverChecbox.role, {
      name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.desclaimerWaiverChecbox.name,
    });
    await (0, test_1.expect)(disclaimerWaiverCheckbox).toBeVisible({ timeout: 90000 });
    await disclaimerWaiverCheckbox.click();
  }
  ///Click on submit button
  async clickOnSubmitButton() {
    const submitButton = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.submitButton.role, { name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.submitButton.name });
    await (0, test_1.expect)(submitButton).toBeVisible({ timeout: 90000 });
    await submitButton.click();
  }
  //Get request/reference number and save it
  async getAndSaveRequestNumber() {
    const requestNumberElement = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.requestNumber.xpath);
    await (0, test_1.expect)(requestNumberElement).toBeVisible({ timeout: 90000 });
    const requestText = await requestNumberElement.innerText();
    const requestNumber = requestText.match(/#([\d-]+)/)?.[1];
    if (!requestNumber) {
      throw new Error(`Could not extract request number from: ${requestText}`);
    }
    const dataFilePath = path_1.default.resolve(process.cwd(), 'src/data/payment-system-test-data.json');
    const paymentSystemData = JSON.parse(fs_1.default.readFileSync(dataFilePath, 'utf8'));
    paymentSystemData['resale-of-units'].requestNumber = requestNumber;
    fs_1.default.writeFileSync(dataFilePath, JSON.stringify(paymentSystemData, null, 2) + '\n', 'utf8');
    return requestNumber;
  }
  //Click on resale request side menu
  async clickOnResaleRequestSideMenu() {
    const resaleRequestSideMenu = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.resaleRequestSideMenu.role, {
      name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.resaleRequestSideMenu.name,
    });
    await (0, test_1.expect)(resaleRequestSideMenu).toBeVisible({ timeout: 90000 });
    await resaleRequestSideMenu.click();
  }
  //Select serch by - reference nubmer
  async selectSearchByReference() {
    const searchByDropdownList = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.searchByDropdownList.xpath);
    const searchedByOption = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.searchedByOption.role, { name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.searchedByOption.name });
    await (0, test_1.expect)(searchByDropdownList).toBeVisible({ timeout: 90000 });
    await searchByDropdownList.click();
    await (0, test_1.expect)(searchedByOption).toBeVisible({ timeout: 90000 });
    await searchedByOption.click();
  }
  //Enter request/reference number
  async fillRequestNumberInputfield(requestNumber) {
    const requestNumberInputfield = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.requestNumberInputfield.role, {
      name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.requestNumberInputfield.name,
    });
    await (0, test_1.expect)(requestNumberInputfield).toBeVisible({ timeout: 90000 });
    await requestNumberInputfield.fill(requestNumber);
  }
  //Click on view details button
  async clickOnViewDetailsButton() {
    const viewDetailsButton = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.viewDetailsButton.role, { name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.viewDetailsButton.name });
    await this.page.waitForTimeout(5000);
    await (0, test_1.expect)(viewDetailsButton).toBeVisible({ timeout: 90000 });
    await viewDetailsButton.click();
  }
  //Click on approve button
  async clickOnApproveButton() {
    const approveButton = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.approveButton.role, { name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.approveButton.name });
    await (0, test_1.expect)(approveButton).toBeVisible({ timeout: 90000 });
    await approveButton.click();
  }
  //Click on send button
  async clickOnSendButton() {
    const sendButton = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.sendButton.role, { name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.sendButton.name });
    await (0, test_1.expect)(sendButton).toBeVisible({ timeout: 90000 });
    await sendButton.click();
  }
  //Validate the request is approved
  async verifyTheRequestisApproved() {
    const partnerApprovalToastMessage = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.toastMessagePartener.xpath);
    await (0, test_1.expect)(partnerApprovalToastMessage).toBeVisible({ timeout: 120000 });
  }
  //Navigate to my booking > click on resale requests > select waition to sign contract tab option
  async openWaitingToSignContract() {
    const userProfileButton = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.userProfileButton);
    await userProfileButton.click();
    const myBookingsLink = this.page.locator(BookingCancellationObjects_1.BookingCancellationObjects.myBookingsLink);
    await myBookingsLink.click();
    const resaleRequestsButton = this.page.getByText(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.resaleRequestsButton.text);
    const buyingRequestSwitchTab = this.page.getByText(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.buyingRequestSwitchTab.text);
    const waitingtoSignContractTab = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.waitingtoSignContractTab.role, {
      name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.waitingtoSignContractTab.name,
    });
    await (0, test_1.expect)(resaleRequestsButton).toBeVisible({ timeout: 90000 });
    await resaleRequestsButton.click();
    await (0, test_1.expect)(buyingRequestSwitchTab).toBeVisible({ timeout: 90000 });
    await buyingRequestSwitchTab.click();
    await (0, test_1.expect)(waitingtoSignContractTab).toBeVisible({ timeout: 90000 });
    await waitingtoSignContractTab.click();
  }
  //Click on confirm booking button
  async clickOnConfirmBookingButton() {
    const confirmBookingButton = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.confirmBookingButton.role, {
      name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.confirmBookingButton.name,
    });
    await (0, test_1.expect)(confirmBookingButton).toBeVisible({ timeout: 90000 });
    await confirmBookingButton.click();
  }
  //Click on approve sale contract button
  async clickOnApproveSaleContractButton() {
    const approveSaleContractButton = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.approveSaleContractButton.role, {
      name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.approveSaleContractButton.name,
    });
    await (0, test_1.expect)(approveSaleContractButton).toBeVisible({ timeout: 90000 });
    await approveSaleContractButton.click();
  }
  //Click on view button
  async clickOnViewButton() {
    const viewButton = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.viewButton.role, { name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.viewButton.name });
    await (0, test_1.expect)(viewButton).toBeVisible({ timeout: 90000 });
    await viewButton.click();
  }
  //Enter otp
  async enterOTP(otp = ['1', '2', '3', '4']) {
    await this.page.waitForTimeout(12000);
    const otpInputs = this.page.getByRole('textbox');
    for (let index = 0; index < otp.length; index++) {
      await otpInputs.nth(index).fill(otp[index]);
    }
  }
  //Validate the waiver fees is paid
  async verifyWaiverFeesSuccessfullyPaidMessage() {
    const waiverFeesSuccessfullyPaidMessage = this.page.getByText(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.waiverFeesSuccessfullyPaidMessage.text);
    await (0, test_1.expect)(waiverFeesSuccessfullyPaidMessage).toBeVisible({ timeout: 120000 });
  }
  //Enter request/reference number - in admin
  async fillRequestNumberInputfieldAdmin(requestNumber) {
    const requestNumberInputfieldAdmin = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.requestNumberInputfieldِAdmin.xpath);
    await (0, test_1.expect)(requestNumberInputfieldAdmin).toBeVisible({ timeout: 90000 });
    await requestNumberInputfieldAdmin.fill(requestNumber);
  }
  //Click on search button
  async clickOnSearchButton() {
    const searchButton = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.searchButton.xpath);
    await (0, test_1.expect)(searchButton).toBeVisible({ timeout: 90000 });
    await searchButton.click();
  }
  //Select the searched result - in admin
  async clickOnSearchedResult() {
    const searchedResult = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.searchedResult.xpath);
    await this.page.waitForTimeout(5000);
    await (0, test_1.expect)(searchedResult).toBeVisible({ timeout: 90000 });
    await searchedResult.click();
  }
  //Click on add buyer button - in admin
  async clickOnAddBuyerButton() {
    const addBuyerButton = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.addBuyerButton.role, { name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.addBuyerButton.name });
    await (0, test_1.expect)(addBuyerButton).toBeVisible({ timeout: 90000 });
    await addBuyerButton.click();
  }
  //Enter buyer id - in admin
  async fillBuyerIDInputfield(buyerId) {
    const buyerIDInputfield = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.buyerIDInputfield.xpath);
    await (0, test_1.expect)(buyerIDInputfield).toBeVisible({ timeout: 90000 });
    await buyerIDInputfield.fill(buyerId);
  }
  //Click on buyer date of birth button
  async clickOnBuyerDobInputButton() {
    const buyerDobInputfieldButton = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.buyerDobInputfieldButton.xpath);
    await (0, test_1.expect)(buyerDobInputfieldButton).toBeVisible({ timeout: 90000 });
    await buyerDobInputfieldButton.click();
  }
  //Click on verify from buyer button
  async clickOnVerifyFromBuyerButton() {
    const verifyFromBuyerButton = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.verifyFromBuyerButton.xpath);
    await (0, test_1.expect)(verifyFromBuyerButton).toBeVisible({ timeout: 90000 });
    await verifyFromBuyerButton.click();
  }
  //Select buyer source - seller option
  async selectBuyerSource() {
    const buyerSourceDropdownList = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.buyerSourceDropdownList.xpath);
    const buyerSourceOption = this.page.getByRole(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.buyerSourceOption.role, { name: ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.buyerSourceOption.name });
    await (0, test_1.expect)(buyerSourceDropdownList).toBeVisible({ timeout: 90000 });
    await buyerSourceDropdownList.click();
    await (0, test_1.expect)(buyerSourceOption).toBeVisible({ timeout: 90000 });
    await buyerSourceOption.click();
  }
  //Click on save button
  async clickOnSaveBuyerButton() {
    const saveBuyerButton = this.page.locator(ResaleOfUnitsObjects_1.ResaleOfUnitsObjects.saveBuyerButton.xpath);
    await (0, test_1.expect)(saveBuyerButton).toBeVisible({ timeout: 90000 });
    await saveBuyerButton.click();
  }
}
exports.ResaleOfUnitsPage = ResaleOfUnitsPage;
