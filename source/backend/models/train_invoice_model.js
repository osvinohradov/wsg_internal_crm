import mongoose from 'mongoose';

import { BaseModel } from '../lib';
import { TrainSchemas } from './schemas';
import { deep_copy } from '../helpers';

const Schema = mongoose.Schema;

const TrainInvoiceSchema = new BaseModel({
  // Номер
  number: { type: Number, default: 0},
  // Дата
  date: { type: Date },
  // Форма сплати (Готівка, Платіжна картка, Банківський кредит)
  payment_form: { type: String, default: 'Готівка' },
  // Дата сплати
  payment_date: { type: Date },
  // Кількість квитків
  tickets_count: { type: Number, default: 0 },
  // Всього
  total_amount: { type: Number, default: 0 },
  // Клієнт (посилання на Контрагентів)
  client_id: { type: Schema.Types.ObjectId, ref: 'CounterpartyModel', default: null },
  // Дата послуг
  service_date: { type: Date },
  // Без реалізації
  is_void: { type: Boolean, default: false },
  // Повернення
  is_returned: { type: Boolean, default: false },
  // Сплачено
  is_paid: { type: Boolean, default: false },
  // Групове замовлення (посилання на Групове замовлення)
  group_invoice_id: { type: Schema.Types.ObjectId, ref: 'GroupInvoiceModel', default: null },
  // Валюта пропозиції
  offer_currency_id: {
    type: Schema.Types.ObjectId,
    ref: 'UnitClassifierModel',
    default: null
  },
  // Підсумкова валюта
  total_currency_id: {
    type: Schema.Types.ObjectId,
    ref: 'UnitClassifierModel',
    default: null
  },
  // Постачальник (посилання на Контрагентів)
  provider_id: { type: Schema.Types.ObjectId, ref: 'CounterpartyModel', default: null },
  // Сплата такси
  taxes_payment_id: { type: Schema.Types.ObjectId, ref: 'CounterpartyModel', default: null },
  // Куратор
  curator_id: { type: Schema.Types.ObjectId, ref: 'CuratorModel', default: null },
  // Код бронювання
  // booking_code         :{ type: String },
  // Обмін валют (посилання на Обмін валют)
  currency_exchange_id: {
    type: Schema.Types.ObjectId,
    ref: 'CurrencyExchangeModel',
    default: null
  },
  // Вид сервісу (посилання на Вид сервісу)
  service_type_id: { type: Schema.Types.ObjectId, ref: 'ServiceTypeModel', default: null },
  // Розрахунковий рахунок (посилання на Банківські рахунки) 
  checking_account_id     :{ type: Schema.Types.ObjectId, ref: 'CheckingAccountModel', default: null },
  // Коментар
  comment: { type: String },
  // Відповідальний (посилання на Користувачі)
  responsible_agent_id:  { type: Schema.Types.ObjectId, ref: 'UserModel' },
  // Агент (посилання на Користувачі)
  agent_id: { type: Schema.Types.ObjectId, ref: 'UserModel' },
  // Показую відкривався киток чи ні
  is_processed: { type: Boolean, default: false },
  // Документ що повертається
  returned_document:    { type: String },
  // Організація
  organization_id:         { type: Schema.Types.ObjectId, ref: 'OrganizationModel', default: null },
  // Детальна інформація
  detail_info: {
    type: {
      //  Номер поезда
      train_number: { type: String, default: '' },
      // Номер вагона
      carriage_number: { type: String, default: '' },
      // место
      place: { type: String, default: '' },
      // Вид сервиса
      service_type: { type: String, default: '' },
      // Дата и время прибытия
      arrival_dt: { type: Date },
      // Дата и время отправления 
      departure_dt: { type: Date },
      // Дата покупки у поставщика
      payment_provider_dt: { type: Date },
      // откуда 
      departure_station_id: { type: Schema.Types.ObjectId, ref: 'RailwayStationModel', default: null },
      // куда
      arrival_station_id: { type: Schema.Types.ObjectId, ref: 'RailwayStationModel', default: null },
      // ReferenceIndividualCounterparties
      surname_id: {  type: Schema.Types.ObjectId, ref: 'IndividualCounterpartiesModel', default: null },
      //
      ticket_number: { type: String, default: '' },

      // Секція "Вартість постачальника"
      supplier_cost: {
        type: {
          sum: { type: Number, default: 0 },
          mpe: { type: Number, default: 0 },
          currency_id: {
            type: Schema.Types.ObjectId,
            ref: 'UnitClassifierModel',
            default: null
          }
        },
        default: {}
      },
      // Секція "Комісія постачальника"
      supplier_commision: {
        type: {
          sum: { type: Number, default: 0 },
          mpe: { type: Number, default: 0 },
          percent: { type: Number, default: 0 },
          currency_id: {
            type: Schema.Types.ObjectId,
            ref: 'UnitClassifierModel',
            default: null
          }
        },
        default: {}
      },
      // Секція "Штраф"
      forfeit: {
        type: {
          sum: { type: Number, default: 0 },
          mpe: { type: Number, default: 0 },
          currency_id: {
            type: Schema.Types.ObjectId,
            ref: 'UnitClassifierModel',
            default: null
          }
        },
        default: { }
      },
      // Секція "Послуги агенції"
      agency_services: {
        type: {
          sum: { type: Number, default: 0 },
          mpe: { type: Number, default: 0 },
          percent: { type: Number, default: 0 },
          bank_percent: { type: Number, default: 0 },
          currency_id: {
            type: Schema.Types.ObjectId,
            ref: 'UnitClassifierModel',
            default: null
          }
        },
        default: {}
      },
      // Секція "Інші послуги"
      other_services: {
        type: {
          sum: { type: Number, default: 0 },
          mpe: { type: Number, default: 0 },
          currency_id: {
            type: Schema.Types.ObjectId,
            ref: 'UnitClassifierModel',
            default: null
          }
        }, default: {}
      },
      // Секція "Всього"
      total_amount: {
        type: {
          sum: { type: Number, default: 0 },
          mpe: { type: Number, default: 0 },
          currency_id: {
            type: Schema.Types.ObjectId,
            ref: 'UnitClassifierModel',
            default: null
          }
        }, default: new Object()
      },
      // Додаткова інформація
      additional_info: { type: String, default: '' },
      total_amount_ucop: { type: Number, default: 0 },
      ucop_mpe: { type: Number, default: 0 }
    }, default: {}
  },
  
  updated_at: { type: Date, default: Date.now() },
  created_at: { type: Date, default: Date.now() }
},  { minimize: false, versionKey: false, collection: 'train_invoice' });


TrainInvoiceSchema.statics.get_train_invoices_info = async function(params){
  let invoices = await TrainInvoiceModel.find({})
                      .populate({ path: 'client_id', select: 'name' })
                      .populate({ path: 'group_invoice_id', select: 'group_name'})
                      .populate({ path: 'service_type_id', select: 'name'})
                      .populate({ path: 'provider_id', select: 'name'})
                      .populate({ path: 'responsible_agent_id', select: 'name'})
                      .populate({ path: 'agent_id', select: 'name'})
                      .populate({ path: 'offer_currency_id', select: 'name'})
                      .populate({ path: 'total_currency_id', select: 'name'})
                      .populate({ path: 'organization_id', select: 'name'})
                      .populate({ path: 'detail_info.surname', model: 'IndividualCounterpartyModel' })
                      .populate({ path: 'detail_info.total_amount.currency_id', model: 'UnitClassifierModel' });
  return invoices;
}

TrainInvoiceSchema.statics.get_train_invoice_by_id = async function(query, projection, options){
  let invoices = await TrainInvoiceModel.findOne(query, projection, options)
                      .populate({ path: 'client_id', select: 'name' })
                      .populate({ path: 'group_invoice_id', select: 'group_name' })
                      .populate({ path: 'offer_currency_id', select: 'name' })
                      .populate({ path: 'total_currency_id', select: 'name' })
                      .populate({ path: 'provider_id', select: 'name' })
                      .populate({ path: 'taxes_payment_id', select: 'name' })
                      .populate({ path: 'curator_id', select: 'name' })
                      .populate({ path: 'currency_exchange_id', select: 'name' })
                      .populate({ path: 'service_type_id', select: 'name' })
                      .populate({ path: 'checking_account_id', select: 'name' })
                      .populate({ path: 'responsible_agent_id', select: 'first_name last_name' })
                      .populate({ path: 'agent_id', select: 'first_name last_name' })
                      .populate({ path: 'organization_id', select: 'name' })

                      .populate({ path: 'detail_info.surname_id', select: 'first_name_native last_name_native middle_name_native', model: 'IndividualCounterpartyModel' })
                      .populate({ path: 'detail_info.departure_station_id', select: 'name_ukr name_rus', model: 'RailwayStationModel' })
                      
                      .populate({ path: 'detail_info.arrival_station_id', select: 'name_ukr name_rus', model: 'RailwayStationModel' })
                      .populate({ path: 'detail_info.supplier_cost.currency_id', select: 'name', model: 'UnitClassifierModel' })
                      .populate({ path: 'detail_info.supplier_commision.currency_id', select: 'name', model: 'UnitClassifierModel' })
                      .populate({ path: 'detail_info.forfeit.currency_id', select: 'name', model: 'UnitClassifierModel' })
                      .populate({ path: 'detail_info.agency_services.currency_id', select: 'name', model: 'UnitClassifierModel' })
                      .populate({ path: 'detail_info.other_services.currency_id', select: 'name', model: 'UnitClassifierModel' })
                      .populate({ path: 'detail_info.total_amount.currency_id', select: 'name', model: 'UnitClassifierModel' });
  return invoices;
}

TrainInvoiceSchema.statics.get_normalize_invoice = function(invoice){
    invoice.client_id = invoice.client_id._id;
    invoice.group_invoice_id = invoice.group_invoice_id._id;
    invoice.offer_currency_id = invoice.offer_currency_id._id;
    invoice.total_currency_id = invoice.total_currency_id._id;
    invoice.provider_id = invoice.provider_id._id;
    invoice.taxes_payment_id = invoice.taxes_payment_id._id;
    invoice.curator_id = invoice.curator_id._id;
    invoice.currency_exchange_id = invoice.currency_exchange_id._id;
    invoice.service_type_id = invoice.service_type_id._id;
    invoice.checking_account_id = invoice.checking_account_id._id;
    invoice.responsible_agent_id = invoice.responsible_agent_id._id;
    invoice.agent_id = invoice.agent_id._id;
    invoice.organization_id = invoice.organization_id._id;
    invoice.detail_info.departure_station_id = invoice.detail_info.departure_station_id._id;
    invoice.detail_info.arrival_station_id = invoice.detail_info.arrival_station_id._id;
    invoice.detail_info.surname_id = invoice.detail_info.surname_id._id;
    invoice.detail_info.supplier_cost.currency_id = invoice.detail_info.supplier_cost.currency_id._id;
    invoice.detail_info.supplier_commision.currency_id = invoice.detail_info.supplier_commision.currency_id._id;
    invoice.detail_info.forfeit.currency_id = invoice.detail_info.forfeit.currency_id._id;
    invoice.detail_info.agency_services.currency_id = invoice.detail_info.agency_services.currency_id._id;
    invoice.detail_info.other_services.currency_id = invoice.detail_info.other_services.currency_id._id;
    invoice.detail_info.total_amount.currency_id = invoice.detail_info.total_amount.currency_id._id;


  return invoice;
}

const TrainInvoiceModel = mongoose.model("TrainInvoice", TrainInvoiceSchema);

export default TrainInvoiceModel;
