import { Component, OnInit, Inject, ViewContainerRef } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import * as moment from 'moment';
// import { AviaInvoice } from "../../models";
// import { AviaInvoiceService, AviaGroupInvoiceService } from "../../services";
import { RefCounterpartyService, RefRailwayStationService } from "../../../ReferenceModule/services";
import { FormControl, FormBuilder, FormGroup } from "@angular/forms";
import { TrainInvoiceDetail } from "../../models";


import { GroupInvoiceService } from "../../../GroupInvoice/services";
import { RefNomenclatureService } from "../../../ReferenceModule/services";
import { TrainService } from "../../services";


import { RefRailwayStationNameModel, RefCounterpartyNameModel } from '../../../ReferenceModule/models';


import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from "rxjs";
import { map, startWith, catchError, debounceTime, switchMap } from "rxjs/operators";

@Component({
  selector: "app-invoice-popup",
  templateUrl: "./invoice_popup.component.html",
  styleUrls: [
    
    "./invoice_popup.component.css",
    "../invoice/invoice.component.css"
  ]
})
export class TrainInvoiceDialogComponent implements OnInit {
  // public is_saved: Boolean = false;
  // В переменной ханится обьект накладной

  // Fields for data from input
  public client_id_form_field;
  public group_invoice_form_field;
  public offer_currency_form_field;
  public total_currency_form_field;
  public provider_form_field;
  public taxes_payment_form_field;
  public curator_form_field;
  public currency_exchange_form_field;
  public service_type_form_field;
  public checking_account_form_field;
  
  // Fields for stored data from DB
  public ref_counterparties_names = [];
  public group_invoices_names;
  public ref_unit_classifier_names;
  public ref_curators_names;
  public ref_currency_exchanges_names;
  public ref_service_types_names;
  public ref_checking_accounts_names;
  public users_names;
  public organizations_names;
  public ref_individual_counterparties_names;
  public ref_railway_stations_names;

  

  constructor(public dialogRef: MatDialogRef<TrainInvoiceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public train_invoice: TrainInvoiceDetail,
              private GroupInvoiceService: GroupInvoiceService,
              private RefCounterpartyService: RefCounterpartyService,
              private TrainService: TrainService,
              private RefNomenclatureService: RefNomenclatureService,
              private RefRailwayStationService: RefRailwayStationService,
              public toastr: ToastrManager){
  
  }

  // Departure stations
  public clientAutoComplete: Observable<RefCounterpartyNameModel[]> = null;
  public clientFromControl = new FormControl();

  fetchRefCounterparties(value: string): Observable<RefCounterpartyNameModel[]>{
    return this.RefCounterpartyService
      .get_counterparties_names(value)
      .pipe(map(result => {
        return result;
      })
    );
  }


  // Departure stations
  public departureStationAutoComplete: Observable<RefRailwayStationNameModel[]> = null;
  public departureStationFromControl = new FormControl();

  // Arrival stations
  public arrivalStationAutoComplete: Observable<RefRailwayStationNameModel[]> = null;
  public arrivalStationFromControl = new FormControl();

  fetchRailwayStations(value: string): Observable<RefRailwayStationNameModel[]>{
    return this.RefRailwayStationService
      .get_railway_stations_names(value)
      .pipe(map(result => {
        return result;
      })
    );
  }


  initializeForm(){
    // Fill departure station auto complete field
    this.departureStationAutoComplete = this.departureStationFromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value: ', value);
        return this.fetchRailwayStations(value);
      })
    );

    // Fill arrival station auto complete field
    this.arrivalStationAutoComplete = this.arrivalStationFromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value: ', value);
        return this.fetchRailwayStations(value);
      })
    );

    // Fill client auto complete field
    this.clientAutoComplete = this.clientFromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value: ', value);
        return this.fetchRefCounterparties(value);
      })
    );
  }


  ngOnInit() {
    this.initializeForm()
    this._fetch_data(this._initialize_data, this);
  }

  _initialize_data(data: any, context){
    //context.ref_counterparties_names = data['counterparty_name'];
    context.group_invoices_names = data['group_invoice'];
    context.ref_unit_classifier_names = data['unit_clasifier_name'];
    context.ref_railway_stations_names = data['railway_station'];
    context.states = data['railway_station'];
    if(Array.isArray(data['railway_station']) && context.train_invoice.detail_info.departure_station_id){
      data['railway_station'].push(context.train_invoice.detail_info.departure_station_id);
      console.log(data['railway_station'])
    }
  }

  _fetch_data(callback, context){
    let data = {};
    this.GroupInvoiceService.get_group_invoices_names()
      .then((group_invoice_name) => {
        data['group_invoice'] = group_invoice_name;

        return this.RefCounterpartyService.get_counterparties_names();
      })
      .then((counterparties_names) => {
        //data['counterparty_name'] = counterparties_names;

        return this.RefNomenclatureService.get_ref_unit_clasifiers_names();
      })
      .then((unit_clasifier_names) => {
        data['unit_clasifier_name'] = unit_clasifier_names;

        return this.RefRailwayStationService.get_railway_stations_names('');
      })
      .then((railway_stations) => {

        data['railway_station'] = railway_stations;        
      })
      .then(() => {
        callback(data, context);
      })
  }

  _get_date(dt){
    let date  = moment(dt).format('YYYY-MM-DD');
    return date;
  }
  
  _get_date_time(dt){
    let date_time = moment(dt, 'MM/DD/YYYY');
    if(!date_time.isValid()){
      return moment().format('DD-MM-YYYY');
    }
    return date_time.format('DD-MM-YYYY');
  }

  _get_time(dt){
    let time = moment(dt).format('HH:mm');
    return time;
  }

  _get_total_amount_sum(){
    if(!this.train_invoice){
      return 0;
    }
    let supplier_cost = parseFloat(this.train_invoice.detail_info.supplier_cost.sum) || 0;
    let supplier_commision = parseFloat(this.train_invoice.detail_info.supplier_commision.sum) || 0;
    let forfeit = parseFloat(this.train_invoice.detail_info.forfeit.sum) || 0;
    let agency_services = parseFloat(this.train_invoice.detail_info.agency_services.sum) || 0;
    let other_services = parseFloat(this.train_invoice.detail_info.other_services.sum) || 0;

    let sum = supplier_cost + supplier_commision + forfeit + agency_services + other_services;
    this.train_invoice.detail_info.total_amount.sum = sum;
    return sum.toFixed(3);
  }

  _get_total_amount_mpe(){
    if(!this.train_invoice){
      return 0;
    }
    let supplier_cost = parseFloat(this.train_invoice.detail_info.supplier_cost.mpe) || 0;
    let supplier_commision = parseFloat(this.train_invoice.detail_info.supplier_commision.mpe) || 0;
    let forfeit = parseFloat(this.train_invoice.detail_info.forfeit.mpe) || 0;
    let agency_services = parseFloat(this.train_invoice.detail_info.agency_services.mpe) || 0;
    let other_services = parseFloat(this.train_invoice.detail_info.other_services.mpe) || 0;

    let mpe = supplier_cost + supplier_commision + forfeit + agency_services + other_services;
    this.train_invoice.detail_info.total_amount.mpe = mpe;
    return mpe.toFixed(3);
  }

  save_ticket(ticket){
    console.log('Save ticket');   
    this.TrainService.create_train_invoice(ticket)
      .then((data: TrainInvoiceDetail) => {
        this.toastr.successToastr('Залізничний квиток успішно збереженно.', 'Успішно!');
        this.train_invoice = data;
      })
      .catch((err) => {
        console.log(err);
        this.toastr.errorToastr('Під час збереження залізничного квитка, виникла помилка.', 'Помилка!');
      });
  }
  
  update_ticket(ticket){
    console.log('Update ticket');
    this.TrainService.update_train_invoice(ticket)
      .then((data: TrainInvoiceDetail) => {
        this.toastr.successToastr('Залізничний квиток успішно змінено.', 'Успішно!');
        this.train_invoice = data;
      })
      .catch((err) => {
        console.log(err);
        this.toastr.errorToastr('Під час оновленення залізничного квитка, виникла помилка.', 'Помилка!');
      });
  }

  save_update(ticket){
    if(ticket._id){
      this.update_ticket(ticket);
    }
    else{
      this.save_ticket(ticket);
    }
  }

  display_fn(item){
    console.log('Client id: ', item)
    return item.name;
  }

  show_data(){
    console.log('==== Date: ', this.train_invoice.service_date)
  }
  // public test_date = "12.09.2018 17:45:00";
  // // Currencies inputs
  // public payment_form_input_autocomplete = new FormControl();
  // public offer_currency_input_autocomplete = new FormControl();
  // public total_currency_input_autocomplete = new FormControl();
  // public avia_group_input_autocomplete = new FormControl();
  // public supplier_cost_input_autocomplete = new FormControl();
  // public supplier_commission_input_autocomplete = new FormControl();
  // public forfeit_input_autocomplete = new FormControl();
  // public used_supplier_rate_input_autocomplete = new FormControl();
  // public additional_supplier_commission_input_autocomplete = new FormControl();
  // public used_taxes_input_autocomplete = new FormControl();
  // public agency_services_input_autocomplete = new FormControl();
  // public other_services_input_autocomplete = new FormControl();
  // public total_amount_input_autocomplete = new FormControl();
  // public input_autocomplete = new FormControl();

  // // Вынести в БД и получать формы оплаты по запросу
  // public payment_forms: string[] = [
  //   "Банківська картка",
  //   "Безготівковий розрахунок",
  //   "Банківський кредит"
  // ];

  // public counterparties_name_id: any = [];
  // get_counterparties_names_id(pattern){
  //   this.CounterpartyService.get_counterparties_names_ids(pattern).subscribe((data) => {
  //     console.log(data)
  //   });
  // }
  // public avia_group_invoices: any = []

  // _set_date(field, event){
  //   field = event.value;
  // }
  

  // // Валюту - временно сделать внутренним массивом (CAD, CHF, CZK, EUR, GBP, JPY, RUB, SEK, USD, grn)
  // // окончательная валюта - то же самое
  // // Используем currency для выбора значений в полях 
  // public currencies: string[] = [
  //   "CAD", "CHF", "CZK", "EUR", "GBP", "JPY", "RUB", "SEK", "USD", "грн"
  // ];

  // constructor(
  //   public dialogRef: MatDialogRef<AviaInvoicePopupComponent>,
  //   @Inject(MAT_DIALOG_DATA) public avia_invoice: AviaInvoice,
  //   public AviaInvoiceService: AviaInvoiceService,
  //   public CounterpartyService: CounterpartyService,
  //   public AviaGroupInvoiceService: AviaGroupInvoiceService
  // ) {
  //   if (!this.avia_invoice) {
  //     this.avia_invoice = new AviaInvoice();
  //   }
  //   this.get_avia_group_invoice_content(null);
  //   console.log('[Avia Invoice Editor]: ', avia_invoice.FlightInfo)
  // }
  

  // update_avia_invoice(avia_invoice: AviaInvoice) {
  //   this.AviaInvoiceService.update_avia_invoice(avia_invoice).subscribe(data => {
  //     this.avia_invoice = data as AviaInvoice;
  //   });
  // }

  // save_avia_invoice(avia_invoice: AviaInvoice) {
  //   console.log("Save avia invoice:", avia_invoice);
  //   this.AviaInvoiceService.save_avia_invoice(avia_invoice).subscribe(data => {
  //     let tmp = data as AviaInvoice;
  //     if (!tmp._id) {
  //       this.is_saved = false;
  //     } else {
  //       this.avia_invoice = tmp;
  //       this.is_saved = true;
  //     }
  //   });
  // }

  // remove_avia_invoice(avia_invoice_id: string) {
  //   if (!avia_invoice_id) {
  //     console.log(`avia_invoice_id не передано.`);
  //     // Show error dialog
  //     return;
  //   }

  //   this.AviaInvoiceService.remove_avia_invoice(avia_invoice_id).subscribe(() => {
  //     this.dialogRef.close({
  //       action: "remove",
  //       id: avia_invoice_id,
  //       element: null
  //     });
  //   });
  // }

  // save_and_close(avia_invoice: AviaInvoice) {
  //   // Save ticket
  //   this.save_update_avia_invoice(avia_invoice);
  //   this.close_dialog(avia_invoice);
  // }

  // save_update_avia_invoice(avia_invoice: AviaInvoice) {
  //   if (!avia_invoice._id) {
  //     this.save_avia_invoice(avia_invoice);
  //   } else {
  //     this.update_avia_invoice(avia_invoice);
  //     this.is_saved = true;
  //   }
  // }

  // get_avia_group_invoice_content(pattent){
  //   this.AviaGroupInvoiceService.get_avia_group_invoice_content(pattent).subscribe((data) => {
  //     this.avia_group_invoices = data;
  //     console.log(data)
  //   });
  // }

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
  close_dialog(): void {
    this.dialogRef.close();
    // console.log("Close dialog:", data);
    // if (!this.is_saved) {
    //   this.dialogRef.close(null);
    // } else {
    //   this.dialogRef.close(data);
    // }
  }

  /**
   * Additional Section
   *
   */

  // get_counterparty_names(pattern) {
  //   this.CounterpartyService.get_counterparties_names_ids(pattern).subscribe(data => {
  //     console.log(data);
  //   });
  // }
  // get_total_amount_cost(avia_invoice){
  //   let result = parseInt(avia_invoice.DetailInfo.SupplierCost.Sum) + parseInt(avia_invoice.DetailInfo.AgencyServices.Sum) +
  //   parseInt(avia_invoice.DetailInfo.AgencyServices.MPE) + parseInt(avia_invoice.DetailInfo.OtherServices.Sum) + parseInt(avia_invoice.DetailInfo.OtherServices.MPE);
  //   console.log('Result: ', result)
  //   if(!result) result = -1;
  //   return result;
  // }

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
