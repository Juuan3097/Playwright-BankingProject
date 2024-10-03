import { Page } from "@playwright/test";
import { BankManager } from "./BankManagerPage";
import { Customer } from "./CustomerLoginPage";
import { AddRemove } from "./AddRemovePage";
import { Checkbox } from "./CheckboxPage";
import { RadioButton } from "./RadioButtonPage";
import { Tooltip } from "./TooltipsPage";
import { Inputs } from "./InputPage";
import { UploadFile } from "./FileUploadPage";
import { Alert } from "./NotificationAlertPage";
import { Download } from "./DownloadPage";
import { Slider } from "./SliderPage";
import { DynamicTable } from "./DynamicTablePage";
import { DragNDropMedium } from "./Drag&DropMediumPage";

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
}
