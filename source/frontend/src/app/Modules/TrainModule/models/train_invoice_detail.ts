//import { BaseModel } from "./base_model";

export class TrainInvoiceDetail {// extends BaseModel {
  _id: string = undefined;
  // Номер
  Number: string = "";
  // Дата
  Date: Date = null;
  // Форма сплати (Готівка, Платіжна картка, Банківський кредит)
  PaymentForm: string = null;
  // Дата сплати
  PaymentDate: Date = null;
  // Кількість квитків
  TicketsCount: number = 1;
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
  GroupInvoiceId: any = {}; //:{ type: Schema.Types.ObjectId, ref: 'AviaGroupInvoice' },
  // Валюта пропозиції
  OfferCurrency: string = null; // :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' },
  // Підсумкова валюта
  TotalCurrency: string = null; // :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' },
  // Постачальник
  ProviderId: any = null; // :{ type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty' },
  // Сплата такси
  TaxesPayment: string = null;
  // Куратор
  CuratorId: any = null; // :{ type: Schema.Types.ObjectId, ref: 'ReferenceCurator' },
  // Код бронювання
  BookingCode: string = null;
  // Обмін валют
  CurrencyExchangeId: any = null; // :{ type: Schema.Types.ObjectId, ref: 'ReferenceCurrencyExchange' },
  // Вид сервісу
  ServiceTypeId: any = null; // :{ type: Schema.Types.ObjectId, ref: 'ReferenceServiceType' },
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
  DetailInfo: DetailInfo = null;
  created_at: Date = null;
}

class DetailInfo {
//   NameId: string = null; // ref: 'ReferenceIndividualCounterparties' },
//   TicketNumber: string = null;
//   PurchaseDate: Date = null;

//   SupplierCost: SupplierCost = null;
//   SupplierCommision: SupplierCommision = null;
//   Forfeit: Forfeit = null;
//   UsedSupplierRate: UsedSupplierRate = null;
//   AdditionalSupplierComission: AdditionalSupplierComission = null;
//   UsedTaxes: UsedTaxes = null;
//   AgencyServices: AgencyServices = null;
//   OtherServices: OtherServices = null;
//   TotalAmount: TotalAmount = null;

//   AdditionalInfo: string = "";

//   constructor(){
//       this.SupplierCost = new SupplierCost();
//       this.SupplierCommision = new SupplierCommision();
//       this.Forfeit = new Forfeit();
//       this.UsedSupplierRate = new UsedSupplierRate();
//       this.AdditionalSupplierComission = new AdditionalSupplierComission();
//       this.UsedTaxes = new UsedTaxes();
//       this.AgencyServices = new AgencyServices();
//       this.OtherServices = new OtherServices();
//       this.TotalAmount = new TotalAmount();
//   }
}