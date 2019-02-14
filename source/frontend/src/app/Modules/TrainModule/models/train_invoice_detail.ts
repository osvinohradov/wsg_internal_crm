//import { BaseModel } from "./base_model";
import { GroupInvoiceNameModel } from '../../GroupInvoice/models';
import { RefRailwayStationNameModel } from '../../ReferenceModule/models';


export class TrainInvoiceDetail {
  // extends BaseModel {
  _id: string = undefined;
  // Номер
  number: string = "";
  // Дата
  date: Date = null;
  // Форма сплати (Готівка, Платіжна картка, Банківський кредит)
  payment_form: string = "";
  // Дата сплати
  payment_date: Date = new Date();
  // Кількість квитків
  tickets_count: number = 0;
  // Клієнт (посилання на Контрагентів)
  client_id: any = null; // { type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty' },
  // Дата послуг
  service_date: Date = new Date();
  // Без реалізації
  is_void: boolean = false;
  // Повернення
  is_returned: boolean = false;
  // Сплачено
  is_paid: boolean = false;
  // Групове замовлення
  group_invoice_id: GroupInvoiceNameModel = null; //:{ type: Schema.Types.ObjectId, ref: 'AviaGroupInvoice' },
  // Валюта пропозиції
  offer_currency_id: any = null; // :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' },
  // Підсумкова валюта
  total_currency_id: any = null; // :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' },
  // Постачальник
  provider_id: any = null; // :{ type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty' },
  // Сплата такси
  taxes_payment_id: any = null;
  // Куратор
  curator_id: any = null; // :{ type: Schema.Types.ObjectId, ref: 'ReferenceCurator' },
  // Обмін валют
  currency_exchange_id: any = null; // :{ type: Schema.Types.ObjectId, ref: 'ReferenceCurrencyExchange' },
  // Вид сервісу
  service_type_id: any = null; // :{ type: Schema.Types.ObjectId, ref: 'ReferenceServiceType' },
  // Розрахунковий рахунок (посилання на Банківські рахунки)
  checking_account_id: any = null;
  // Коментар
  comment: string = "";
  // Відповідальний
  responsible_agent_id: any = null;
  // Агент
  agent_id: any = null;
  // Открывался билет или нет
  is_processed: boolean = false;
  // 
  organization_id: any = null;
  // Детальна інформація
  detail_info: any = new DetailInfo();
}

class DetailInfo {
  //  Номер поезда
  train_number: string = '';
  // Номер вагона
  carriage_number: string = '';
  // место
  place: string = "";
  // Вид сервиса
  service_type: string = "";
  // Дата и время прибытия
  arrival_dt: Date = new Date();
  // Дата и время отправления
  departure_dt: Date = new Date();
  // Дата покупки у поставщика
  payment_provider_dt: Date = new Date();
  // откуда добавить таблицу
  departure_station_id: RefRailwayStationNameModel = null;
  // куда добавить таблицу
  arrival_station_id: RefRailwayStationNameModel = null;
  // ReferenceIndividualCounterparties
  surname_id: string = null;
  //
  ticket_number: string = '';

  // Секція "Вартість постачальника"
  supplier_cost: any = {
    sum: 0,
    mpe: 0,
    currency_id: null
  };
  // Секція "Комісія постачальника"
  supplier_commision: any = {
    sum: 0,
    mpe: 0,
    percent: 0,
    currency_id: null
  };

  // Секція "Штраф"
  forfeit: any = {
    sum: 0,
    mpe: 0,
    currency_id: null
  };

  // Секція "Послуги агенції"
  agency_services: any = {
    sum: 0,
    mpe: 0,
    percent: 0,
    bank_percent: 0,
    currency_id: null
  };

  // Секція "Інші послуги"
  other_services: any = {
    sum: 0,
    mpe: 0,
    currency_id: null
  };

  // Секція "Всього"
  total_amount: any = {
    sum: 0,
    mpe: 0,
    currency_id: null
  };
  // Додаткова інформація
  additional_info: string = "";
  total_amount_ucop: number = 0;
  ucop_mpe: number = 0;
}
