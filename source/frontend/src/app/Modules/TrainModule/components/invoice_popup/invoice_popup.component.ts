import { Component, OnInit, Inject, ViewContainerRef } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import * as moment from 'moment';
// import { AviaInvoice } from "../../models";
// import { AviaInvoiceService, AviaGroupInvoiceService } from "../../services";
import { RefCounterpartyService, RefRailwayStationService, RefUnitClassifierService, RefCuratorService, RefCurrencyExchangeService, RefServiceTypeService, RefCheckingAccountService, RefIndividualCounterpartyService, RefOrganizationService, RefUserService } from "../../../ReferenceModule/services";
import { FormControl, FormBuilder, FormGroup } from "@angular/forms";
import { TrainInvoiceDetail } from "../../models";


import { GroupInvoiceService } from "../../../GroupInvoice/services";
import { RefNomenclatureService } from "../../../ReferenceModule/services";
import { TrainService } from "../../services";

// TODO: Put out to outer file
import { RefRailwayStationNameModel,
         RefCounterpartyNameModel,
         RefUnitClassifierNameModel,
         RefCuratorNameModel,
         RefCurrencyExchangeNameModel, 
         RefServiceTypeNameModel,
         RefCheckingAccountNameModel,
         RefUserNameModel,
         RefOrganizationNameModel,
         RefIndividualCounterpartyNameModel} from '../../../ReferenceModule/models';


import { GroupInvoiceNameModel } from '../../../GroupInvoice/models';

import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable } from "rxjs";
import { map, startWith, catchError, debounceTime, switchMap, debounce } from "rxjs/operators";
import { CONFIG } from '../../../constants';


@Component({
  selector: "app-invoice-popup",
  templateUrl: "./invoice_popup.component.html",
  styleUrls: [
    
    "./invoice_popup.component.css",
    "../invoice/invoice.component.css"
  ]
})
export class TrainInvoiceDialogComponent implements OnInit {

  public SERVER_URL = CONFIG.SERVER_URL;
  // public is_saved: Boolean = false;
  // Client (counterparty)
  public clientAutoComplete: Observable<RefCounterpartyNameModel[]> = null;
  public clientFromControl = new FormControl();
  // Group Invoice
  public groupInvoiceAutoComplete: Observable<GroupInvoiceNameModel[]> = null;
  public groupInvoiceFromControl = new FormControl();
  // Offer currency ID
  public offerCurrencyAutoComplete: Observable<RefUnitClassifierNameModel[]> = null;
  public offerCurrencyFromControl = new FormControl();
  // Total currency ID
  public totalCurrencyAutoComplete: Observable<RefUnitClassifierNameModel[]> = null;
  public totalCurrencyFromControl = new FormControl();
  // Provider ID 
  public providerAutoComplete: Observable<RefCounterpartyNameModel[]> = null;
  public providerFromControl = new FormControl();
  // Taxes payment ID
  public taxesPaymentAutoComplete: Observable<RefCounterpartyNameModel[]> = null;
  public taxesPaymentFromControl = new FormControl();
  // Curator ID
  public curatorAutoComplete: Observable<RefCuratorNameModel[]> = null;
  public curatorFromControl = new FormControl();
  // Currency Exchange
  public currencyExchangeAutoComplete: Observable<RefCurrencyExchangeNameModel[]> = null;
  public currencyExchangeFromControl = new FormControl();
  // Service Type
  public serviceTypeAutoComplete: Observable<RefServiceTypeNameModel[]> = null;
  public serviceTypeFromControl = new FormControl();
  // Checking Account
  public checkingAccountAutoComplete: Observable<RefCheckingAccountNameModel[]> = null;
  public checkingAccountFromControl = new FormControl();
  // User
  public responsibleAgentAutoComplete: Observable<RefUserNameModel[]> = null;
  public responsibleAgentFromControl = new FormControl();
  public agentAutoComplete: Observable<RefUserNameModel[]> = null;
  public agentFromControl = new FormControl();

  // Organization ID
  public organizationAutoComplete: Observable<RefOrganizationNameModel[]> = null;
  public organizationFromControl = new FormControl();
  // Departure stations
  public departureStationAutoComplete: Observable<RefRailwayStationNameModel[]> = null;
  public departureStationFromControl = new FormControl();
  // Arrival stations
  public arrivalStationAutoComplete: Observable<RefRailwayStationNameModel[]> = null;
  public arrivalStationFromControl = new FormControl();
  // Individual Counterparty
  public individualCounterpartyAutoComplete: Observable<RefIndividualCounterpartyNameModel[]> = null;
  public individualCounterpartyFromControl = new FormControl();

  public PAYMENT_FORMS = [ 
    "Готівка",
    "Платіжна картка",
    "Банківський кредит"
  ]

  // TODO: Try to fetch data once and put it in array
  public unitClassifierNamesCollection = [];
  constructor(public dialogRef: MatDialogRef<TrainInvoiceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public train_invoice: TrainInvoiceDetail,
              private GroupInvoiceService: GroupInvoiceService,
              private RefCounterpartyService: RefCounterpartyService,
              private TrainService: TrainService,
              private RefNomenclatureService: RefNomenclatureService,
              private RefRailwayStationService: RefRailwayStationService,
              private RefUnitClassifierService: RefUnitClassifierService,
              private RefCuratorService: RefCuratorService,
              private RefCurrencyExchangeService: RefCurrencyExchangeService,
              private RefServiceTypeService: RefServiceTypeService,
              private RefCheckingAccountService: RefCheckingAccountService,
              private RefIndividualCounterpartyService: RefIndividualCounterpartyService,
              private RefOrganizationService: RefOrganizationService,
              private RefUserService: RefUserService,
              public toastr: ToastrManager){
  
  }  
  
  initializeForm(){
    // Fill client auto complete field
    this.clientAutoComplete = this.clientFromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value: ', value);
        return this.fetchRefCounterpartiesNames(value);
      })
    );
    // Fetch group invoice names
    this.groupInvoiceAutoComplete = this.groupInvoiceFromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value: ', value);
        return this.fetchGroupInvoiceNames(value);
      })
    );
    // Fetch reference unit classifier names
    this.offerCurrencyAutoComplete = this.offerCurrencyFromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value: ', value);
        return this.fetchRefUnitClassifiersNames(value);
      })
    );
    // Fetch reference unit classifier names
    this.totalCurrencyAutoComplete = this.totalCurrencyFromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value: ', value);
        return this.fetchRefUnitClassifiersNames(value);
      })
    );
    // Fetch provider names
    this.providerAutoComplete = this.providerFromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value: ', value);
        return this.fetchRefCounterpartiesNames(value);
      })
    );
    // Fetch taxes payment names
    this.taxesPaymentAutoComplete = this.taxesPaymentFromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value: ', value);
        return this.fetchRefCounterpartiesNames(value);
      })
    );
    // Fetch curator names
    this.curatorAutoComplete = this.curatorFromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value: ', value);
        return this.fetchRefCuratorsNames(value);
      })
    );
    // Fetch currency exchange
    this.currencyExchangeAutoComplete = this.currencyExchangeFromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value: ', value);
        return this.fetchRefCurrencyExchangesNames(value);
      })
    );
    // Fetch Service types names
    this.serviceTypeAutoComplete = this.serviceTypeFromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value: ', value);
        return this.fetchRefServiceTypesNames(value);
      })
    );
    // Fetch Checking account
    this.checkingAccountAutoComplete = this.checkingAccountFromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value: ', value);
        return this.fetchRefCheckingAccountsNames(value);
      })
    );
    // Fetch responsible agent names
    this.responsibleAgentAutoComplete = this.responsibleAgentFromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value: ', value);
        return this.fetchRefUsersNames(value);
      })
    );
    // Fetch agent names
    this.agentAutoComplete = this.agentFromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value: ', value);
        return this.fetchRefUsersNames(value);
      })
    );
    // Fetch organizations names
    this.organizationAutoComplete = this.organizationFromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value: ', value);
        return this.fetchRefOrganizationsNames(value);
      })
    );
    // Fetch organizations names
    this.organizationAutoComplete = this.organizationFromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value: ', value);
        return this.fetchRefOrganizationsNames(value);
      })
    );
    // Fetch individual counterparties names
    this.individualCounterpartyAutoComplete = this.individualCounterpartyFromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value: ', value);
        return this.fetchRefIndividualCounterpartiesNames(value);
      })
    );
  // public individualCounterpartyAutoComplete: Observable<RefRailwayStationNameModel[]> = null;
  // public individualCounterpartyFromControl = new FormControl();
    // Fill departure station auto complete field
    this.departureStationAutoComplete = this.departureStationFromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value: ', value);
        return this.fetchRefRailwayStationsNames(value);
      })
    );
    // Fill arrival station auto complete field
    this.arrivalStationAutoComplete = this.arrivalStationFromControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => {
        console.log('value: ', value);
        return this.fetchRefRailwayStationsNames(value);
      })
    );    
  }
  fetchRefCounterpartiesNames(value: string): Observable<RefCounterpartyNameModel[]>{
    return this.RefCounterpartyService
      .get_counterparties_names(value)
      .pipe(map(result => {
        return result;
      })
    );
  } 

  fetchGroupInvoiceNames(value: string): Observable<GroupInvoiceNameModel[]>{
    return this.GroupInvoiceService
      .get_group_invoices_names(value)
      .pipe(map(result => {
        console.log('===================== Group Invoices =====================');
        console.log(result);
        return result;
      })
    );
  }

  fetchRefUnitClassifiersNames(value: string): Observable<RefUnitClassifierNameModel[]>{
    return this.RefUnitClassifierService
      .get_ref_unit_clasifiers_names(value)
      .pipe(map(result => {
        return result;
      })
    );
  }

  fetchRefCuratorsNames(value: string): Observable<RefCuratorNameModel[]>{
    return this.RefCuratorService
      .get_curators_names(value)
      .pipe(map(result => {
        return result;
      })
    );
  }

  fetchRefCurrencyExchangesNames(value: string): Observable<RefCurrencyExchangeNameModel[]>{
    return this.RefCurrencyExchangeService
      .get_currency_exchanges_names(value)
      .pipe(map(result => {
        return result;
      })
    );
  }

  fetchRefServiceTypesNames(value: string): Observable<RefServiceTypeNameModel[]>{
    return this.RefServiceTypeService
      .get_service_types_names(value)
      .pipe(map(result => {
        return result;
      })
    );
  }

  fetchRefCheckingAccountsNames(value: string): Observable<RefCheckingAccountNameModel[]>{
    return this.RefCheckingAccountService
      .get_checking_accounts_names(value)
      .pipe(map(result => {
        return result;
      })
    );
  }

  fetchRefUsersNames(value: string): Observable<RefUserNameModel[]>{
    return this.RefUserService
      .get_users_names(value)
      .pipe(map(result => {
        return result;
      })
    );
  }

  fetchRefOrganizationsNames(value: string): Observable<RefOrganizationNameModel[]>{
    return this.RefOrganizationService
      .get_organizations_names(value)
      .pipe(map(result => {
        return result;
      })
    );
  }
  
  fetchRefRailwayStationsNames(value: string): Observable<RefRailwayStationNameModel[]>{
    return this.RefRailwayStationService
      .get_railway_stations_names(value)
      .pipe(map(result => {
        return result;
      })
    );
  }

  fetchRefIndividualCounterpartiesNames(value: string): Observable<RefIndividualCounterpartyNameModel[]>{
    return this.RefIndividualCounterpartyService
      .get_individual_counterparties_names(value)
      .pipe(map(result => {
        return result;
      })
    );
  } 

  setClientValue(event, value){
    this.train_invoice.client_id = value;
  }
  setGroupInvoiceValue(event, value){
    this.train_invoice.group_invoice_id = value;
  }
  setOfferCurrencyValue(event, value){
    this.train_invoice.offer_currency_id = value;
  }
  setTotalCurrencyValue(event, value){
    this.train_invoice.total_currency_id = value;
  }
  setProviderValue(event, value){
    this.train_invoice.provider_id = value;
  }
  setTaxesPaymentValue(event, value){
    this.train_invoice.taxes_payment_id = value;
  }
  setCuratorValue(event, value){
    this.train_invoice.curator_id = value;
  }
  setCurrencyExchangeValue(event, value){
    this.train_invoice.currency_exchange_id = value;
  }
  setServiceTypeValue(event, value){
    this.train_invoice.service_type_id = value;
  }
  setCheckingAccountValue(event, value){
    this.train_invoice.checking_account_id = value;
  }
  setResponsibleAgentValue(event, value){
    this.train_invoice.responsible_agent_id = value;
  }
  setAgentValue(event, value){
    this.train_invoice.agent_id = value;
  }
  setOrganizationValue(event, value){
    this.train_invoice.organization_id = value;
  }
  setDepartureStationValue(event, value){
    this.train_invoice.detail_info.departure_station_id = value;
  }
  setArrivalStationValue(event, value){
    this.train_invoice.detail_info.arrival_station_id = value;
  }
  setIndividualCounterpartyValue(event, value){
    this.train_invoice.detail_info.surname_id = value;
  }
  setSupplierCostCurrencyValue(event, value){
    this.train_invoice.detail_info.supplier_cost.currency_id = value;
  }

  // TODO: Add data fetching 

  showError(err, msg){
    this.toastr.errorToastr('Щось пішло не так!', 'Помилка!');
  }

  


  ngOnInit() {
    console.log('====================================== ngOnInit called ======================================')
    console.log(this.train_invoice);
    this.clientFromControl.setValue(this.train_invoice.client_id.name);
    this.groupInvoiceFromControl.setValue(this.train_invoice.group_invoice_id.group_name);
    this.offerCurrencyFromControl.setValue(this.train_invoice.offer_currency_id.name);
    this.totalCurrencyFromControl.setValue(this.train_invoice.total_currency_id.name);
    this.providerFromControl.setValue(this.train_invoice.provider_id.name);
    this.providerFromControl.setValue(this.train_invoice.provider_id.name);
    this.taxesPaymentFromControl.setValue(this.train_invoice.taxes_payment_id.name);
    this.curatorFromControl.setValue(this.train_invoice.curator_id.name);
    this.currencyExchangeFromControl.setValue(this.train_invoice.currency_exchange_id.name);
    this.serviceTypeFromControl.setValue(this.train_invoice.service_type_id.name);
    this.checkingAccountFromControl.setValue(this.train_invoice.checking_account_id.name);
    let responsible_agent = this.train_invoice.responsible_agent_id.first_name && this.train_invoice.responsible_agent_id.last_name ?
        `${this.train_invoice.responsible_agent_id.first_name} ${this.train_invoice.responsible_agent_id.last_name}` : '';
    
        this.responsibleAgentFromControl.setValue(responsible_agent);
    let agent = this.train_invoice.agent_id.first_name && this.train_invoice.agent_id.last_name ?
        `${this.train_invoice.agent_id.first_name} ${this.train_invoice.agent_id.last_name}` : '';
    
        this.agentFromControl.setValue(agent);
    this.organizationFromControl.setValue(this.train_invoice.organization_id.group_name);
    let departure_station_name = this.train_invoice.detail_info.departure_station_id.name_ukr ? this.train_invoice.detail_info.departure_station_id.name_ukr : this.train_invoice.detail_info.departure_station_id.name_rus;
    this.departureStationFromControl.setValue(departure_station_name);
    let arrival_station_name = this.train_invoice.detail_info.arrival_station_id.name_ukr ? this.train_invoice.detail_info.arrival_station_id.name_ukr : this.train_invoice.detail_info.arrival_station_id.name_rus;
    this.arrivalStationFromControl.setValue(arrival_station_name);

    let individual_counterparty = this.train_invoice.detail_info.surname_id.last_name_native && this.train_invoice.detail_info.surname_id.first_name_native ?
    `${this.train_invoice.detail_info.surname_id.last_name_native} ${this.train_invoice.detail_info.surname_id.first_name_native}` : '';
    this.individualCounterpartyFromControl.setValue(individual_counterparty);


    this.initializeForm();
  }

  _get_date(dt){
    let date  = moment.utc(dt).format('YYYY-MM-DD');
    return date;
  }
  
  _get_date_time(dt){
    let date_time = moment.utc(dt, ['MM/DD/YYYY HH:mm', 'YYYY-MM-DD HH:mm']);
    if(!date_time.isValid()){
      return moment.utc().format('DD-MM-YYYY HH:mm');
    }
    return date_time.format('DD-MM-YYYY HH:mm');
  }

  _get_time(dt){
    let time = moment.utc(dt).format('HH:mm');
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

  save_ticket(ticket: TrainInvoiceDetail){
    console.log('Save ticket');
    this.TrainService.create_train_invoice(ticket)
      .then((data: TrainInvoiceDetail) => {
        this.toastr.successToastr('Залізничний квиток успішно збереженно.', 'Успішно!');
        //this.train_invoice = data;
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
        // this.train_invoice = data;
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
        this.toastr.errorToastr('Під час оновленення залізничного квитка, виникла помилка.', 'Помилка!');
      });
  }

  save_update(ticket: TrainInvoiceDetail){
    if(!ticket){
      // error occured
    }
    if(ticket._id){
      this.update_ticket(ticket);
    }
    else{
      this.save_ticket(ticket);
    }
  }

  show_data(){
    console.log('==== Date: ', this.train_invoice.service_date)
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
  close_dialog(): void {
    this.dialogRef.close();
    // console.log("Close dialog:", data);
    // if (!this.is_saved) {
    //   this.dialogRef.close(null);
    // } else {
    //   this.dialogRef.close(data);
    // }
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
