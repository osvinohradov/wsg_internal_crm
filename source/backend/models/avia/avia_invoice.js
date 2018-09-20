const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AviaInvoiceSchema = new Schema({
    // Номер
    Number              :{ type: Number, default: 0 },
    // Дата
    Date                :{ type: Date },
    // Форма сплати (Готівка, Платіжна картка, Банківський кредит)
    PaymentForm         :{ type: String },
    // Дата сплати
    PaymentDate         :{ type: Date },
    // Кількість квитків
    TicketsCount        :{ type: Number },
    // Всього
    TotalAmount         :{ type: Number },
    // Клієнт (посилання на Контрагентів)
    ClientId            :{ type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty' },
    // Дата послуг
    ServiceDate         :{ type: Date },
    // Без реалізації
    IsVoid              :{ type: Boolean },
    // Повернення
    IsReturned          :{ type: Boolean },
    // Сплачено
    IsPaid              :{ type: Boolean },
    // Групове замовлення
    GroupInvoiceId      :{ type: Schema.Types.ObjectId, ref: 'AviaGroupInvoice' },
    // Валюта пропозиції
    OfferCurrencyId       :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' },
    // Підсумкова валюта
    TotalCurrencyId       :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' },
    // Постачальник
    ProviderId            :{ type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty' },
    // Сплата такси
    TaxesPayment        :{ type: String },
    // Куратор
    CuratorId             :{ type: Schema.Types.ObjectId, ref: 'ReferenceCurator' },
    // Код бронювання
    BookingCode         :{ type: String },
    // Обмін валют
    CurrencyExchangeId    :{ type: Schema.Types.ObjectId, ref: 'ReferenceCurrencyExchange' },
    // Вид сервісу
    ServiceTypeId         :{ type: Schema.Types.ObjectId, ref: 'ReferenceServiceType' },
    // Розрахунковий рахунок (посилання на Банківські рахунки)
    CheckingAccount     :{ type: String },
    // Коментар
    Comment             :{ type: String },
    // Відповідальний
    ResponsibleAgent    :{ type: String },
    // Агент
    Agent               :{ type: String },
    // Код РМ
    PmCode              :{ type: String },
    // Открывался билет или нет
    IsProcessed         :{ type: Boolean },
    // Документ що повертається
    ReturnedDocument    :{ type: String },
    // Організація
    Organization        :{ type: String, default: "ВОРЛДСЕРВІС ГРУП"},
    // Детальна інформація
    DetailInfo          :{
                            type: {
                                // Поле "Прізвище", містить фамілію й ім'я
                                NameId                            :{ type: Schema.Types.ObjectId, ref: 'ReferenceIndividualCounterparties' },
                                // Номер квитка
                                TicketNumber                    :{ type: Number },
                                // Дата покупки
                                PurchaseDate                    :{ type: Date },
                                // Секція "Вартість постачальника"
                                SupplierCost                    :{ type: { 
                                    Sum         :{ type: Number },
                                    MPE         :{ type: Number },
                                    CurrencyId    :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' }
                                }},
                                // Секція "Комісія постачальника"
                                SupplierCommision               :{ type: { 
                                    Sum         :{ type: Number },
                                    MPE         :{ type: Number },
                                    Percent     :{ type: Number },
                                    CurrencyId    :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' }
                                }},
                                // Секція "Штраф"
                                Forfeit                         :{ type: { 
                                    Sum         :{ type: Number },
                                    MPE         :{ type: Number },
                                    CurrencyId    :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' }
                                }},
                                // Секція "Використанний тариф постачальника"
                                UsedSupplierRate                :{ type: { 
                                    Sum         :{ type: Number },
                                    MPE         :{ type: Number },
                                    CurrencyId    :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' }
                                }},
                                // Секція "Додаткова комісія постачальника"
                                AdditionalSupplierComission     :{ type: { 
                                    Sum         :{ type: Number },
                                    MPE         :{ type: Number },
                                    CashSum     :{ type: Number },
                                    CurrencyId    :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' }
                                }},
                                // Секція "Використанні такси"
                                UsedTaxes                       :{ type: { 
                                    Sum         :{ type: Number },
                                    MPE         :{ type: Number },
                                    CurrencyId    :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' }
                                }},
                                // Секція "Послуги агенції"
                                AgencyServices                  :{ type: { 
                                    Sum         :{ type: Number },
                                    MPE         :{ type: Number },
                                    Percent     :{ type: Number },
                                    BankPercent :{ type: Number },
                                    CurrencyId    :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' }
                                }},
                                // Секція "Інші послуги"
                                OtherServices                   :{ type: { 
                                    Sum         :{ type: Number },
                                    MPE         :{ type: Number },
                                    CurrencyId    :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' }
                                }},
                                // Секція "Всього"
                                TotalAmount                     :{ type: { 
                                    Sum         :{ type: Number },
                                    MPE         :{ type: Number },
                                    CurrencyId    :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' }
                                }},
                                // Додаткова інформація
                                AdditionalInfo                  :{ type: String }
                            }
                        },
    // Інформація про рейс
    FlightInfo          :{ type: [{
                                // Номер рейсу
                                FlightNumber        :{ type: String },
                                // Місце
                                Place               :{ type: String },
                                // Місце відправлення
                                DeparturePlace      :{ type: String },
                                // Місце прибуття
                                ArrivalPlace        :{ type: String },
                                // Вид сервісу
                                ServiceType         :{ type: String },
                                // Час відправлення
                                DepartureTime       :{ type: Date },
                                // Час прибуття
                                ArrivalTime         :{ type: Date },
    }] },
    // Квитки
    TicketsInfo         :{ type: [{
                                // Поле содержит имя и фамилию
                                Name                :{ type: String },
                                // Номер квитка
                                TicketNumber        :{ type: String }
    }] },
});

const AviaInvoice = mongoose.model('AviaInvocie', AviaInvoiceSchema);

export default AviaInvoice;