import { BaseModel } from "./base_model";

export class IndividualCounterpartyReference extends BaseModel {
  _id: string = undefined;
  Number: string = "";

  // Прізвище (стандарт)
  LastNameEng: string = "";
  // Ім'я (стандарт)
  FirstNameEng: string = "";
  // По-батькові (стандарт)
  MiddleNameEng: string = "";
  // Прізвище (місцеве)
  LastNameNative: string = "";
  // Ім'я (місцеве)
  FirstNameNative: string = "";
  // По-батькові (місцеве)
  MiddleNameNative: string = "";
  // Організація
  OrganisationId: string = ""; // ref: 'ReferenceCounterparty',
  // Дата народження
  Birthday: string = "";
  // ИПН
  IPN: Date = null;
  // Країна народження
  BornCountry: string = "";
  // Коментар
  Comment: string = "";
  // Паспортні данні
  Passports: IndividualCounterpartiesPassportReference[] = null; // ref: 'ReferenceIndividualCounterpartiesPassport'
  // поштова скринька
  Email: string = "";
  // Телефон
  Telephone: string = "";
  // Мобільний
  Cellphone: string = "";
  // Факс
  Fax: string = "";
  // Адреса
  Address: string = "";
  // Адреса доставки
  DeliveryAddress: string = "";
  //Поштовий індекс
  PostIndex: string = "";

  /**
   *
   */
  constructor() {
    super();
    this.Passports = [];
  }
}

export class IndividualCounterpartiesPassportReference extends BaseModel {
  // Серія та номер паспорту
  PassportNumber: string = "";
  // Прізвище
  LastName: string = "";
  // Ім'я
  FirstName: string = "";
  // Дата видачі
  ProductionDate: string = "";
  // Ким випущенний
  Organinization: string = "";
  // Країна
  Country: string = "";
  // Національність
  Nationality: string = "";
}
