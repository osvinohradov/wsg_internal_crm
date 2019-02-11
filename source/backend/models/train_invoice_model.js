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
  client_id: { type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty', default: null },
  // Дата послуг
  service_date: { type: Date },
  // Без реалізації
  is_void: { type: Boolean, default: false },
  // Повернення
  is_returned: { type: Boolean, default: false },
  // Сплачено
  is_paid: { type: Boolean, default: false },
  // Групове замовлення (посилання на Групове замовлення)
  group_invoice_id: { type: Schema.Types.ObjectId, ref: 'GroupInvoice', default: null },
  // Валюта пропозиції
  offer_currency_id: {
    type: Schema.Types.ObjectId,
    ref: 'ReferenceUnitClassifier',
    default: null
  },
  // Підсумкова валюта
  total_currency_id: {
    type: Schema.Types.ObjectId,
    ref: 'ReferenceUnitClassifier',
    default: null
  },
  // Постачальник (посилання на Контрагентів)
  provider_id: { type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty', default: null },
  // Сплата такси
  taxes_payment: { type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty', default: null },
  // Куратор
  curator_id: { type: Schema.Types.ObjectId, ref: 'ReferenceCurator', default: null },
  // Код бронювання
  // booking_code         :{ type: String },
  // Обмін валют (посилання на Обмін валют)
  currency_exchange_id: {
    type: Schema.Types.ObjectId,
    ref: 'ReferenceCurrencyExchange',
    default: null
  },
  // Вид сервісу (посилання на Вид сервісу)
  service_type_id: { type: Schema.Types.ObjectId, ref: 'ReferenceServiceType', default: null },
  // Розрахунковий рахунок (посилання на Банківські рахунки) 
  checking_account_id     :{ type: Schema.Types.ObjectId, ref: 'ReferenceCheckingAccount', default: null },
  // Коментар
  comment: { type: String },
  // Відповідальний (посилання на Користувачі)
  responsible_agent_id:  { type: Schema.Types.ObjectId, ref: 'User' },
  // Агент (посилання на Користувачі)
  agent_id: { type: Schema.Types.ObjectId, ref: 'User' },
  // Показую відкривався киток чи ні
  is_processed: { type: Boolean, default: false },
  // Документ що повертається
  returned_document:    { type: String },
  // Організація
  organization_id:         { type: Schema.Types.ObjectId, ref: 'Organization', default: null },
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
      // откуда добавить таблицу
      departure_station_id: { type: Schema.Types.ObjectId, ref: 'RefRailwayStationModel', default: null },
      // куда добавить таблицу
      arrival_station_id: { type: Schema.Types.ObjectId, ref: 'RefRailwayStationModel', default: null },
      // ReferenceIndividualCounterparties
      surname_id: {  type: Schema.Types.ObjectId, ref: 'ReferenceIndividualCounterparties', default: null },
      //
      ticket_number: { type: String, default: '' },

      // Секція "Вартість постачальника"
      supplier_cost: {
        type: {
          sum: { type: Number, default: 0 },
          mpe: { type: Number, default: 0 },
          currency_id: {
            type: Schema.Types.ObjectId,
            ref: 'ReferenceUnitClassifier',
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
            ref: 'ReferenceUnitClassifier',
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
            ref: 'ReferenceUnitClassifier',
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
            ref: 'ReferenceUnitClassifier',
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
            ref: 'ReferenceUnitClassifier',
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
            ref: 'ReferenceUnitClassifier',
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
                      .populate({ path: 'detail_info.surname', model: 'ReferenceIndividualCounterparties' })
                      .populate({ path: 'detail_info.total_amount.currency_id', model: 'ReferenceUnitClassifier' });
  return invoices;
}

TrainInvoiceSchema.statics.get_train_invoice_by_id = async function(query, projection, options){
  let invoices = await TrainInvoiceModel.findOne(query, projection, options)
                      //.populate({ path: 'client_id', select: 'name' })
                      // .populate({ path: 'group_invoice_id' })
                      .populate({ path: 'offer_currency_id', select: 'name' })
                      //.populate({ path: 'total_currency_id' })
                      //.populate({ path: 'provider_id' })
                      //.populate({ path: 'taxes_payment' })
                      //.populate({ path: 'curator_id' })
                      // .populate({ path: 'currency_exchange_id' })
                     // .populate({ path: 'service_type_id' })
                      //.populate({ path: 'checking_account_id' })
                      //.populate({ path: 'responsible_agent_id' })
                      //.populate({ path: 'agent_id' })
                      //.populate({ path: 'organization_id'})
                        .populate({ path: 'detail_info.surname', model: 'ReferenceIndividualCounterparties' })
                        .populate({ path: 'detail_info.departure_station_id', model: 'RefRailwayStationModel', select: 'name_ukr' })
                        .populate({ path: 'detail_info.arrival_station_id', model: 'RefRailwayStationModel', select: 'name_ukr' })
                      //.populate({ path: 'detail_info.supplier_cost.currency_id', model: 'ReferenceUnitClassifier' })
                      //.populate({ path: 'detail_info.supplier_commision.currency_id', model: 'ReferenceUnitClassifier' })
                      //.populate({ path: 'detail_info.forfeit.currency_id', model: 'ReferenceUnitClassifier' })
                      //.populate({ path: 'detail_info.agency_services.currency_id', model: 'ReferenceUnitClassifier' })
                      //.populate({ path: 'detail_info.other_services.currency_id', model: 'ReferenceUnitClassifier' })
                      //.populate({ path: 'detail_info.total_amount.currency_id', model: 'ReferenceUnitClassifier' });
  return invoices;
}

TrainInvoiceSchema.statics.create_train_invoice = function(data){
  
}

const TrainInvoiceModel = mongoose.model("TrainInvoice", TrainInvoiceSchema);

export default TrainInvoiceModel;
