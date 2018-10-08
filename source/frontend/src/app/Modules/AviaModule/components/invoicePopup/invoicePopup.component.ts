import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { AviaInvoice } from "../../models";
import { AviaService } from "../../services/avia.service";
import { CounterpartyService } from "../../../ReferenceModule/services";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-invoice-popup",
  templateUrl: "./invoicePopup.component.html",
  styleUrls: [
    "./invoicePopup.component.css",
    "./../invoice/invoice.component.css"
  ]
})
export class AviaInvoicePopupComponent implements OnInit {
  public is_saved: Boolean = false;

  public test_date = "12.09.2018 17:45:00";
  // Currencies inputs
  public payment_form_input_autocomplete = new FormControl();
  public offer_currency_input_autocomplete = new FormControl();
  public total_currency_input_autocomplete = new FormControl();
  public input_autocomplete = new FormControl();

  // Вынести в БД и получать формы оплаты по запросу
  public payment_forms: string[] = [
    "Банківська картка",
    "Безготівковий розрахунок",
    "Банківський кредит"
  ];

  public counterparties_name_id: any = [];
  get_counterparties_names_id(pattern){
    this.CounterpartyService.get_counterparties_names_ids(pattern).subscribe((data) => {
      console.log(data)
    });
  }

  _set_date(field, event){
    field = event.value;
  }
  

  // Валюту - временно сделать внутренним массивом (CAD, CHF, CZK, EUR, GBP, JPY, RUB, SEK, USD, grn)
  // окончательная валюта - то же самое
  // Используем currency для выбора значений в полях 
  public currencies: string[] = [
    "CAD", "CHF", "CZK", "EUR", "GBP", "JPY", "RUB", "SEK", "USD", "грн"
  ];

  constructor(
    public dialogRef: MatDialogRef<AviaInvoicePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public avia_invoice: AviaInvoice,
    public AviaService: AviaService,
    public CounterpartyService: CounterpartyService
  ) {
    if (!this.avia_invoice) {
      this.avia_invoice = new AviaInvoice();
    }

    console.log('[Avia Invoice Editor]: ', avia_invoice.FlightInfo)
  }
  ngOnInit() {}

  update_avia_invoice(avia_invoice: AviaInvoice) {
    this.AviaService.update_avia_invoice(avia_invoice).subscribe(data => {
      this.avia_invoice = data as AviaInvoice;
    });
  }

  save_avia_invoice(avia_invoice: AviaInvoice) {
    console.log("Save avia invoice:", avia_invoice);
    this.AviaService.save_avia_invoice(avia_invoice).subscribe(data => {
      let tmp = data as AviaInvoice;
      if (!tmp._id) {
        this.is_saved = false;
      } else {
        this.avia_invoice = tmp;
        this.is_saved = true;
      }
    });
  }

  remove_avia_invoice(avia_invoice_id: string) {
    if (!avia_invoice_id) {
      console.log(`avia_invoice_id не передано.`);
      // Show error dialog
      return;
    }

    this.AviaService.remove_avia_invoice(avia_invoice_id).subscribe(() => {
      this.dialogRef.close({
        action: "remove",
        id: avia_invoice_id,
        element: null
      });
    });
  }

  save_and_close(avia_invoice: AviaInvoice) {
    // Save ticket
    this.save_update_avia_invoice(avia_invoice);
    this.close_dialog(avia_invoice);
  }

  save_update_avia_invoice(avia_invoice: AviaInvoice) {
    if (!avia_invoice._id) {
      this.save_avia_invoice(avia_invoice);
    } else {
      this.update_avia_invoice(avia_invoice);
      this.is_saved = true;
    }
  }

  /**
   *
   * data = {
   * action: "" (create, update, remove),
   * id: "",
   * element: Object
   * }
   *
   * @param data
   */
  close_dialog(data): void {
    console.log("Close dialog:", data);
    if (!this.is_saved) {
      this.dialogRef.close(null);
    } else {
      this.dialogRef.close(data);
    }
  }

  /**
   * Additional Section
   *
   */

  get_counterparty_names(pattern) {
    this.CounterpartyService.get_counterparties_names_ids(pattern).subscribe(data => {
      console.log(data);
    });
  }

  get_counterparties_name(pattern) {
    // Клієнт - выбор клиннта из списка контрагентов (выбрать только имена)
    // поставщик - выбрать из конрагентов
    // поставщик - выбрать из конрагентов
    // сплата таксы - выбрать из контрагентов
    // Фамилия (Билеты) - выбрать из физические особы контрагентов
  }

  get_group_invoices(pattern) {
    // групповой заказ, выбрать имена из групового заказа
  }

  get_currencies() {
    // Обмен валют - выбрать из таблицы обмен валюты
  }

  get_curators_names(pattern) {
    // кураторы - выбрать из таблицы кураторов
  }

  get_services_types(pattern) {
    // Вид сервиса - выбрать из таблицы виды сервисов
  }

  get_checking_account_names(pattern) {
    // розрахунковый рахунок - выбрать из таблицы банковские счета
  }

  get_users_names(pattern) {
    // Ответственный - выбрать из таблицы пользователи
    // Агент - выбрать из таблицы пользователи
  }

  get_individual_counterparties_names(pattern) {
    // Фамилия - выбрать из физические особы контрагентов
  }
}
