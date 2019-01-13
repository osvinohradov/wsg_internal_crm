import mongoose from 'mongoose';

import { BaseModel } from '../lib';

const Schema = mongoose.Schema;

const TrainInvoiceSchema = new BaseModel({
  // Номер
  number: { type: Number, required: true },
  // Дата
  date: { type: Date },
  // Форма сплати (Готівка, Платіжна картка, Банківський кредит)
  payment_form: { type: String },
  // Дата сплати
  payment_date: { type: Date },
  // Кількість квитків
  tickets_count: { type: Number, default: 0 },
  // Всього
  total_amount: { type: Number, default: 0 },
  // Клієнт (посилання на Контрагентів)
  client_id: { type: Schema.Types.ObjectId, ref: "ReferenceCounterparty" },
  // Дата послуг
  service_date: { type: Date },
  // Без реалізації
  is_void: { type: Boolean },
  // Повернення
  is_returned: { type: Boolean },
  // Сплачено
  is_paid: { type: Boolean },
  // Групове замовлення (посилання на Групове замовлення)
  group_invoice_id: { type: Schema.Types.ObjectId, ref: "GroupInvoice" },
  // Валюта пропозиції
  offer_currency_id: {
    type: Schema.Types.ObjectId,
    ref: "ReferenceUnitClassifier"
  },
  // Підсумкова валюта
  total_currency_id: {
    type: Schema.Types.ObjectId,
    ref: "ReferenceUnitClassifier"
  },
  // Постачальник (посилання на Контрагентів)
  provider_id: { type: Schema.Types.ObjectId, ref: "ReferenceCounterparty" },
  // Сплата такси
  taxes_payment: { type: String },
  // Куратор
  curator_id             :{ type: Schema.Types.ObjectId, ref: 'ReferenceCurator' },
  // Код бронювання
  // booking_code         :{ type: String },
  // Обмін валют (посилання на Обмін валют)
  currency_exchange_id: {
    type: Schema.Types.ObjectId,
    ref: "ReferenceCurrencyExchange"
  },
  // Вид сервісу (посилання на Вид сервісу)
  service_type_id: { type: Schema.Types.ObjectId, ref: "ReferenceServiceType" },
  // Розрахунковий рахунок (посилання на Банківські рахунки)
  checking_account     :{ type: String },
  // Коментар
  comment: { type: String },
  // Відповідальний (посилання на Користувачі)
  responsible_agent: { type: String },
  // Агент (посилання на Користувачі)
  agent               :{ type: String },
  // Показую відкривався киток чи ні
  is_processed: { type: Boolean },
  // Документ що повертається
  // returned_document    :{ type: String },
  // Організація
  // organization        :{ type: String, default: "ВОРЛДСЕРВІС ГРУП"},
  // Детальна інформація
  detail_info: {
    type: {
      //  Номер поезда
      train_number: { type: String },
      // Номер вагона
      carriage_number: { type: String },
      // место
      place: { type: String },
      // Вид сервиса
      service_type: { type: String },
      // Дата и время прибытия
      arrival_dt: { type: Date },
      // Дата и время отправления
      departure_dt: { type: Date },
      // Дата покупки у поставщика
      payment_provider_dt: { type: Date },
      // откуда
      departure_station: { type: String },
      // куда
      arrival_station: { type: String },

      surname: { type: String },
      //
      ticket_number: { type: String },

      // Секція "Вартість постачальника"
      supplier_cost: {
        type: {
          sum: { type: Number },
          mpe: { type: Number },
          currency_id: {
            type: Schema.Types.ObjectId,
            ref: "ReferenceUnitClassifier"
          }
        }
      },
      // Секція "Комісія постачальника"
      supplier_commision: {
        type: {
          sum: { type: Number },
          mpe: { type: Number },
          percent: { type: Number },
          currency_id: {
            type: Schema.Types.ObjectId,
            ref: "ReferenceUnitClassifier"
          }
        }
      },
      // Секція "Штраф"
      forfeit: {
        type: {
          sum: { type: Number },
          mpe: { type: Number },
          currency_id: {
            type: Schema.Types.ObjectId,
            ref: "ReferenceUnitClassifier"
          }
        }
      },
      // Секція "Послуги агенції"
      agency_services: {
        type: {
          sum: { type: Number },
          mpe: { type: Number },
          percent: { type: Number },
          bank_percent: { type: Number },
          currency_id: {
            type: Schema.Types.ObjectId,
            ref: "ReferenceUnitClassifier"
          }
        }
      },
      // Секція "Інші послуги"
      other_services: {
        type: {
          sum: { type: Number },
          mpe: { type: Number },
          currency_id: {
            type: Schema.Types.ObjectId,
            ref: "ReferenceUnitClassifier"
          }
        }
      },
      // Секція "Всього"
      total_amount: {
        type: {
          sum: { type: Number },
          mpe: { type: Number },
          currency_id: {
            type: Schema.Types.ObjectId,
            ref: "ReferenceUnitClassifier"
          }
        }
      },
      // Додаткова інформація
      additional_info: { type: String },
      total_amount_ucop: { type: Number },
      ucop_mpe: { type: Number }
    }
  },
  created_at: { type: Date, default: Date.now() }
});

const TrainInvoiceModel = mongoose.model("TrainInvoice", TrainInvoiceSchema);

export default TrainInvoiceModel;
