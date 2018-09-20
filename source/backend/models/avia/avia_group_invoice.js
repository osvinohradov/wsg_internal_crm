import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Групові замовлення авіаквитків
const AviaGroupInvoiceSchema = new Schema({
    // Номер
    Number : { type: Number },
    // Дата
    Date : { type: Date },
    // Організація (ВОРЛДСЕРВІС ГРУП)
    Organization : { type: String },
    // Оплачено
    IsPaid : { type: Number },
    // Клієнт
    Client : { type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty' },
    // Дата сплати
    PaymentDate : { type: Date },
    // Дата послуг
    ServiseDate : { type: Date },
    // Форма сплати (enumerate [Готівка, Платіжна картка, Банківський кредит])
    PaymentForm : { type: String },
    // Розрахунковий рахунок (посилання на Банківській рахуеок)
    CheckingAccount : { type: String },
    // Підсумкова валюта (посилання на Валютю)
    TotalCurrency : { type: Schema.Types.ObjectId, ref: 'ReferenceCurrencyExchange' },
    // Сума всього
    TotalAmount : { type: Number },
    // Контент
    Content : { type: String },
    // Коментар
    Comment : { type: String },
    // Відповідальний (посилання на таблицю Користувачі)
    ResponsibleAgent : { type: String },
    // Агент (посилання на таблицю Користувачі)
    Agent : { type: String },
    // Куратор (посилання на таблицю Куратори)
    Curator : { type: Schema.Types.ObjectId, ref: 'ReferenceCurator' },
    // Без реалізації
    IsImplementation : { type: Boolean },
    // Загальний рахунок
    IsTotalAccount : { type: Boolean },
    // Зміст для загального рахунку
    CheckingAccountContent : { type: String }
});

const AviaGroupInvoice = mongoose.model('AviaGroupInvoice', AviaGroupInvoiceSchema);

export default AviaGroupInvoice