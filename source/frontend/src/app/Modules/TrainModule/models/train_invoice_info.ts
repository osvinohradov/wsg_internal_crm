export class TrainInvoiceInfo {
  _id: string = null;
  // Номер
  number: string = "";
  // Дата
  date: Date = null;
  // Без реалізації
  is_void: boolean = false;
  // Повернення
  is_returned: boolean = false;
  // Сплачено
  is_paid: boolean = false;
  // Клієнт (посилання на Контрагентів)
  client_id: any = null; // { type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty' },
  // Групове замовлення
  group_invoice_id: any = {}; //:{ type: Schema.Types.ObjectId, ref: 'AviaGroupInvoice' },
  // Вид сервісу
  service_type_id: any = null; // :{ type: Schema.Types.ObjectId, ref: 'ReferenceServiceType' },
  // Content
  content: string = "";
  // Постачальник
  provider_id: any = null; // :{ type: Schema.Types.ObjectId, ref: 'ReferenceCounterparty' },
  //
  total_amount: number = 0;
  //
  mpe: number = 0;
  // Агент
  agent: string = null;
  // Відповідальний
  responsible_agent: string = null;
  // Валюта пропозиції
  offer_currency_id: string = null; // :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' },
  // Підсумкова валюта
  total_currency_id: string = null; // :{ type: Schema.Types.ObjectId, ref: 'ReferenceUnitClassifier' },
  organization: any = null;
  // Документ що повертається
  returned_document: string = null;
  payment_provider_dt: Date = null;
  // Форма сплати (Готівка, Платіжна картка, Банківський кредит)
  payment_form: string = null;
  // Дата сплати
  payment_date: Date = null;
  // Открывался билет или нет
  is_processed: boolean = false;
}
