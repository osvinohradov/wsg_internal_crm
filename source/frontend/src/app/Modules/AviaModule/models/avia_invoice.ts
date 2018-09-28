import { BaseModel } from './base_model';

export class AviaInvoice extends BaseModel{
    _id: string = undefined;
    // Номер
    Number: number = 0;
    // Дата
    Date: Date = null;
    // Форма сплати (Готівка, Платіжна картка, Банківський кредит)
    PaymentForm: string = null;
    // Дата сплати
    PaymentDate: Date = null;
    // Кількість квитків
    TicketsCount: number = 0;
    // Всього
    TotalAmount: number = 0;
    // Клієнт (посилання на Контрагентів)
    ClientId: any = null; // { type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty' },
    // Дата послуг
    ServiceDate: Date = null;
    // Без реалізації
    IsVoid: boolean = false;
    // Повернення
    IsReturned: boolean = false;
    // Сплачено
    IsPaid: boolean = false;
    // Групове замовлення
    GroupInvoiceId: any = null; //:{ type: Schema.Types.ObjectId, ref: 'AviaGroupInvoice' },
    // Валюта пропозиції
    OfferCurrencyId: any = null;    // :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' },
    // Підсумкова валюта
    TotalCurrencyId: any = null;    // :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' },
    // Постачальник
    ProviderId: any = null;     // :{ type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty' },
    // Сплата такси
    TaxesPayment: string = null;
    // Куратор
    CuratorId: any = null;      // :{ type: Schema.Types.ObjectId, ref: 'ReferenceCurator' },
    // Код бронювання
    BookingCode: string = null;
    // Обмін валют
    CurrencyExchangeId: any = null;     // :{ type: Schema.Types.ObjectId, ref: 'ReferenceCurrencyExchange' },
    // Вид сервісу
    ServiceTypeId: any = null;      // :{ type: Schema.Types.ObjectId, ref: 'ReferenceServiceType' },
    // Розрахунковий рахунок (посилання на Банківські рахунки)
    CheckingAccount: string = null;
    // Коментар
    Comment: string = null;
    // Відповідальний
    ResponsibleAgent: string = null;
    // Агент
    Agent: string = null;
    // Код РМ
    PmCode: string = null;
    // Открывался билет или нет
    IsProcessed: boolean = false;
    // Документ що повертається
    ReturnedDocument: string = null;
    // Організація
    Organization: string = null;
    // Детальна інформація
    DetailInfo: any = null;
    /*
    {
        NameId                            :{ type: Schema.Types.ObjectId, ref: 'ReferenceIndividualCounterparties' },
        TicketNumber                    :{ type: Number },
        PurchaseDate                    :{ type: Date },
        SupplierCost                    :{ type: { 
            Sum         :{ type: Number },
            MPE         :{ type: Number },
            CurrencyId    :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' }
        }},
        SupplierCommision               :{ type: { 
            Sum         :{ type: Number },
            MPE         :{ type: Number },
            Percent     :{ type: Number },
            CurrencyId    :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' }
        }},
        Forfeit                         :{ type: { 
            Sum         :{ type: Number },
            MPE         :{ type: Number },
            CurrencyId    :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' }
        }},
        UsedSupplierRate                :{ type: { 
            Sum         :{ type: Number },
            MPE         :{ type: Number },
            CurrencyId    :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' }
        }},
        AdditionalSupplierComission     :{ type: { 
            Sum         :{ type: Number },
            MPE         :{ type: Number },
            CashSum     :{ type: Number },
            CurrencyId    :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' }
        }},
        UsedTaxes                       :{ type: { 
            Sum         :{ type: Number },
            MPE         :{ type: Number },
            CurrencyId    :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' }
        }},
        AgencyServices                  :{ type: { 
            Sum         :{ type: Number },
            MPE         :{ type: Number },
            Percent     :{ type: Number },
            BankPercent :{ type: Number },
            CurrencyId    :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' }
        }},
        OtherServices                   :{ type: { 
            Sum         :{ type: Number },
            MPE         :{ type: Number },
            CurrencyId    :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' }
        }},
        TotalAmount                     :{ type: { 
            Sum         :{ type: Number },
            MPE         :{ type: Number },
            CurrencyId    :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' }
        }},
        AdditionalInfo                  :{ type: String }
    }
    */
    // Інформація про рейс
    FlightInfo: any = null;
    /*
    {
        FlightNumber        :{ type: String },
        Place               :{ type: String },
        DeparturePlace      :{ type: String },
        ArrivalPlace        :{ type: String },
        ServiceType         :{ type: String },
        DepartureTime       :{ type: Date },
        ArrivalTime         :{ type: Date },
    },
    */
    // Квитки
    TicketsInfo: any = null;
    /*
    {
        Name                :{ type: String },
        TicketNumber        :{ type: String }
    },
    */

    created_at: Date = null;
}