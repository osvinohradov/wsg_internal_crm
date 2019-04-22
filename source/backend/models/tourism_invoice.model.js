// Built-in packages
import mongoose from 'mongoose';

// Internal packages
import { BaseModel } from '../lib';
import { TrainSchemas } from './schemas';
import { deep_copy } from '../helpers';

const Schema = mongoose.Schema;

const TourismInvoiceSchema = new BaseModel({
  // Номер
  number: { type: Number, default: 0},
  // Дата
  date: { type: Date },
  // Форма сплати (Готівка, Платіжна картка, Банківський кредит)
  payment_form: { type: String, default: 'Готівка' },
  // Дата сплати
  payment_date: { type: Date },
  // Кількість квитків
  service_count: { type: Number, default: 1 },
  // Всього
  total_amount: { type: Number, default: 0 },
  // Клієнт (посилання на Контрагентів)
  client_id: { type: Schema.Types.ObjectId, ref: 'CounterpartyModel', default: null },
  // Дата послуг
  service_date: { type: Date },
  // Оплачено
  is_paid: { type: Boolean, default: false },
  // Показую відкривався киток чи ні
  is_processed: { type: Boolean, default: false },
  // Групове замовлення (посилання на Групове замовлення)
  group_invoice_id: { type: Schema.Types.ObjectId, ref: 'GroupInvoiceModel', default: null },
  // Підсумкова валюта
  total_currency_id: {
    type: Schema.Types.ObjectId,
    ref: 'UnitClassifierModel',
    default: null
  },
  // Курс НБУ
  NBU_exchange_id: { type: Schema.Types.ObjectId, ref: '' }, // Need to finished
  // Постачальник (посилання на Контрагентів)
  provider_id: { type: Schema.Types.ObjectId, ref: 'CounterpartyModel', default: null },
  // Куратор
  curator_id: { type: Schema.Types.ObjectId, ref: 'CuratorModel', default: null },
  // Розрахунковий рахунок (посилання на Банківські рахунки) 
  checking_account_id     :{ type: Schema.Types.ObjectId, ref: 'CheckingAccountModel', default: null },
  // Обмін валют (посилання на Обмін валют)
  currency_exchange_id: {
    type: Schema.Types.ObjectId,
    ref: 'CurrencyExchangeModel',
    default: null
  },
  // Вид сервісу (посилання на Вид сервісу)
  service_type_id: { type: Schema.Types.ObjectId, ref: 'ServiceTypeModel', default: null },
  // Курс конвертації
  convert_currency_exchange_id: { type: Schema.Types.ObjectId, ref: '' },
  // Коментар
  comment: { type: String },
  // Відповідальний (посилання на Користувачі)
  responsible_agent_id:  { type: Schema.Types.ObjectId, ref: 'UserModel' },
  // Агент (посилання на Користувачі)
  agent_id: { type: Schema.Types.ObjectId, ref: 'UserModel' },
  
  // Детальна інформація
  detail_info: {
    type: {
      //  Прізвище (IndividualCounterparties)
      surname_id: {  type: Schema.Types.ObjectId, ref: 'IndividualCounterpartiesModel', default: null },
      // Зміст послуги
      content: { type: String, default: '' },
      // проживання З
      from: { type: String, default: '' },
      // Впроживання ДО
      to: { type: String, default: '' },

      // Секція "Сума клієнту"
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
      // Секція "Сума постачальника"
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
      // Секція "Додаткова комісія постачальника"
      additional_supplier_cost: {
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
      // Опис додаткових послуг
      additional_services: {
        type: {}
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
      additional_info: { type: String, default: '' }
    }, default: {}
  },
  
  updated_at: { type: Date, default: Date.now() },
  created_at: { type: Date, default: Date.now() }
},  { minimize: false, versionKey: false, collection: 'tourism_invoice' });


TourismInvoiceSchema.statics.get_train_invoices_info = async function(params){
  let invoices = await TourismInvoiceModel.find({})
                      // .populate({ path: 'client_id', select: 'name' })
                      // .populate({ path: 'group_invoice_id', select: 'group_name'})
                      // .populate({ path: 'service_type_id', select: 'name'})
                      // .populate({ path: 'provider_id', select: 'name'})
                      // .populate({ path: 'responsible_agent_id', select: 'name'})
                      // .populate({ path: 'agent_id', select: 'name'})
                      // .populate({ path: 'offer_currency_id', select: 'name'})
                      // .populate({ path: 'total_currency_id', select: 'name'})
                      // .populate({ path: 'organization_id', select: 'name'})
                      // .populate({ path: 'detail_info.surname', model: 'IndividualCounterpartyModel' })
                      // .populate({ path: 'detail_info.total_amount.currency_id', model: 'UnitClassifierModel' });
  return invoices;
}

TourismInvoiceSchema.statics.get_train_invoice_by_id = async function(query, projection, options){
  let invoices = await TourismInvoiceModel.findOne(query, projection, options)
                      // .populate({ path: 'client_id', select: 'name' })
                      // .populate({ path: 'group_invoice_id', select: 'group_name' })
                      // .populate({ path: 'offer_currency_id', select: 'name' })
                      // .populate({ path: 'total_currency_id', select: 'name' })
                      // .populate({ path: 'provider_id', select: 'name' })
                      // .populate({ path: 'taxes_payment_id', select: 'name' })
                      // .populate({ path: 'curator_id', select: 'name' })
                      // .populate({ path: 'currency_exchange_id', select: 'name' })
                      // .populate({ path: 'service_type_id', select: 'name' })
                      // .populate({ path: 'checking_account_id', select: 'name' })
                      // .populate({ path: 'responsible_agent_id', select: 'first_name last_name' })
                      // .populate({ path: 'agent_id', select: 'first_name last_name' })
                      // .populate({ path: 'organization_id', select: 'name' })

                      // .populate({ path: 'detail_info.surname_id', select: 'first_name_native last_name_native middle_name_native', model: 'IndividualCounterpartyModel' })
                      // .populate({ path: 'detail_info.departure_station_id', select: 'name_ukr name_rus', model: 'RailwayStationModel' })
                      
                      // .populate({ path: 'detail_info.arrival_station_id', select: 'name_ukr name_rus', model: 'RailwayStationModel' })
                      // .populate({ path: 'detail_info.supplier_cost.currency_id', select: 'name', model: 'UnitClassifierModel' })
                      // .populate({ path: 'detail_info.supplier_commision.currency_id', select: 'name', model: 'UnitClassifierModel' })
                      // .populate({ path: 'detail_info.forfeit.currency_id', select: 'name', model: 'UnitClassifierModel' })
                      // .populate({ path: 'detail_info.agency_services.currency_id', select: 'name', model: 'UnitClassifierModel' })
                      // .populate({ path: 'detail_info.other_services.currency_id', select: 'name', model: 'UnitClassifierModel' })
                      // .populate({ path: 'detail_info.total_amount.currency_id', select: 'name', model: 'UnitClassifierModel' });
  return invoices;
}

TourismInvoiceSchema.statics.get_normalize_invoice = function(invoice){
    // invoice.client_id = invoice.client_id._id;
    // invoice.group_invoice_id = invoice.group_invoice_id._id;
    // invoice.offer_currency_id = invoice.offer_currency_id._id;
    // invoice.total_currency_id = invoice.total_currency_id._id;
    // invoice.provider_id = invoice.provider_id._id;
    // invoice.taxes_payment_id = invoice.taxes_payment_id._id;
    // invoice.curator_id = invoice.curator_id._id;
    // invoice.currency_exchange_id = invoice.currency_exchange_id._id;
    // invoice.service_type_id = invoice.service_type_id._id;
    // invoice.checking_account_id = invoice.checking_account_id._id;
    // invoice.responsible_agent_id = invoice.responsible_agent_id._id;
    // invoice.agent_id = invoice.agent_id._id;
    // invoice.organization_id = invoice.organization_id._id;
    // invoice.detail_info.departure_station_id = invoice.detail_info.departure_station_id._id;
    // invoice.detail_info.arrival_station_id = invoice.detail_info.arrival_station_id._id;
    // invoice.detail_info.surname_id = invoice.detail_info.surname_id._id;
    // invoice.detail_info.supplier_cost.currency_id = invoice.detail_info.supplier_cost.currency_id._id;
    // invoice.detail_info.supplier_commision.currency_id = invoice.detail_info.supplier_commision.currency_id._id;
    // invoice.detail_info.forfeit.currency_id = invoice.detail_info.forfeit.currency_id._id;
    // invoice.detail_info.agency_services.currency_id = invoice.detail_info.agency_services.currency_id._id;
    // invoice.detail_info.other_services.currency_id = invoice.detail_info.other_services.currency_id._id;
    // invoice.detail_info.total_amount.currency_id = invoice.detail_info.total_amount.currency_id._id;


  return invoice;
}

TourismInvoiceSchema.statics.find_invoices = async function(conditions, options){
  // TODO: Add validation on incoming params
  conditions = {
    $and:[
      conditions,
      { is_deleted: false}
  ]}
  const tourism_invoice = await this.find(conditions, null, options);
  return tourism_invoice;
}


const TourismInvoiceModel = mongoose.model("TourismInvoiceModel", TourismInvoiceSchema);

export default TourismInvoiceModel;
