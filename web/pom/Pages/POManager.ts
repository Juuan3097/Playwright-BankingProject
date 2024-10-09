import { Page } from "@playwright/test";
import { BankManager } from "./BankingPages/BankManagerPage";
import { Customer } from "./BankingPages/CustomerLoginPage";
import { AddRemove } from "./NearFormPages/AddRemovePage";
import { Checkbox } from "./NearFormPages/CheckboxPage";
import { RadioButton } from "./NearFormPages/RadioButtonPage";
import { Tooltip } from "./NearFormPages/TooltipsPage";
import { Inputs } from "./NearFormPages/InputPage";
import { UploadFile } from "./NearFormPages/FileUploadPage";
import { Alert } from "./NearFormPages/NotificationAlertPage";
import { Download } from "./NearFormPages/DownloadPage";
import { Slider } from "./NearFormPages/SliderPage";
import { DynamicTable } from "./NearFormPages/DynamicTablePage";
import { DragNDropMedium } from "./NearFormPages/Drag&DropMediumPage";
import { DragNDropHard } from "./NearFormPages/Drag&DropHardPage";
import { Login } from "./AdidasPages/LoginPage";
import { LoginSudamerik } from "./SudamerikPages/LoginPage";
import { SearchAndCart } from "./SudamerikPages/Search&CartPage";
import { Checkout } from "./SudamerikPages/CheckoutPage";

export class POManager {
  page: Page;
  bankManager: BankManager;
  customer: Customer;
  addRemove: AddRemove;
  checkbox: Checkbox;
  radioButton: RadioButton;
  tooltip: Tooltip;
  inputs: Inputs;
  uploadFile: UploadFile;
  alert: Alert;
  download: Download;
  slider: Slider;
  dynamicTable: DynamicTable;
  dragNDropMedium: DragNDropMedium;
  dragNDropHard: DragNDropHard;
  adidasLogin: Login;
  sudamerikLogin: LoginSudamerik;
  searchAndCart: SearchAndCart;
  checkout: Checkout;

  constructor(page: Page) {
    this.page = page;
    this.bankManager = new BankManager(this.page);
    this.customer = new Customer(this.page);
    this.addRemove = new AddRemove(this.page);
    this.checkbox = new Checkbox(this.page);
    this.radioButton = new RadioButton(this.page);
    this.tooltip = new Tooltip(this.page);
    this.inputs = new Inputs(this.page);
    this.uploadFile = new UploadFile(this.page);
    this.alert = new Alert(this.page);
    this.download = new Download(this.page);
    this.slider = new Slider(this.page);
    this.dynamicTable = new DynamicTable(this.page);
    this.dragNDropMedium = new DragNDropMedium(this.page);
    this.dragNDropHard = new DragNDropHard(this.page);
    this.adidasLogin = new Login(this.page);
    this.sudamerikLogin = new LoginSudamerik(this.page);
    this.searchAndCart = new SearchAndCart(this.page);
    this.checkout = new Checkout(this.page);
  }

  async getBankManager() {
    return this.bankManager;
  }

  async getCustomer() {
    return this.customer;
  }

  async getAddRemove() {
    return this.addRemove;
  }

  async getCheckbox() {
    return this.checkbox;
  }

  async getRadioButton() {
    return this.radioButton;
  }

  async getTooltip() {
    return this.tooltip;
  }

  async getInputs() {
    return this.inputs;
  }

  async getUploadFile() {
    return this.uploadFile;
  }

  async getAlert() {
    return this.alert;
  }

  async getDownload() {
    return this.download;
  }

  async getSlider() {
    return this.slider;
  }

  async getDynamicTable() {
    return this.dynamicTable;
  }

  async getDragNDropMedium() {
    return this.dragNDropMedium;
  }

  async getDragNDropHard() {
    return this.dragNDropHard;
  }

  async getLoginAdidas() {
    return this.adidasLogin;
  }

  async getSudamerikLogin() {
    return this.sudamerikLogin;
  }

  async getSearchAndCart() {
    return this.searchAndCart;
  }

  async getCheckout() {
    return this.checkout;
  }
}
