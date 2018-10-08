import { BaseModel } from "./base_model";

export class AviaGroupInvoice extends BaseModel {
  _id: string = undefined;
  // Номер
  Number: string = "";

  // Дата
  Date: Date = null;
  // Організація (ВОРЛДСЕРВІС ГРУП)
  Organization: string = null;
  // Оплачено
  IsPaid: boolean = false;
  // Клієнт
  ClientId: string = null;
  // Дата сплати
  PaymentDate: Date = null;
  // Дата послуг
  ServiseDate: Date = null;
  // Форма сплати (enumerate [Готівка, Платіжна картка, Банківський кредит])
  PaymentForm: string = null;
  // Розрахунковий рахунок (посилання на Банківській рахуеок)
  CheckingAccount: string = null;
  // Підсумкова валюта (посилання на Валютю)
  // TotalCurrency : { type: Schema.Types.ObjectId, ref: 'ReferenceCurrencyExchange' },
  TotalCurrencyId: string = null;
  // Сума всього
  TotalAmount: number = 0;
  // Контент
  Content: string = null;
  // Коментар
  Comment: string = null;
  // Відповідальний (посилання на таблицю Користувачі)
  ResponsibleAgentId: string = null;
  // Агент (посилання на таблицю Користувачі)
  AgentId: string = null;
  // Куратор (посилання на таблицю Куратори)
  // Curator : { type: Schema.Types.ObjectId, ref: 'ReferenceCurator' },
  CuratorId: string = null;
  // Без реалізації
  IsImplementation: boolean = null;
  // Загальний рахунок
  IsTotalAccount: boolean = null;
  // Зміст для загального рахунку
  CheckingAccountContent: string = null;

  AviaInvoices: any = [];
}
