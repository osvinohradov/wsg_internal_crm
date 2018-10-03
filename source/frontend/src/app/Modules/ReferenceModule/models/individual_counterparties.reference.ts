import { BaseModel } from './base_model';

export class IndividualCounterpartyReference extends BaseModel{
    _id: string = undefined;
   // Прізвище (стандарт)
   LastNameEng: string = null;
   // Ім'я (стандарт)
   FirstNameEng: string = null;
   // По-батькові (стандарт)
   MiddleNameEng: string = null;
   // Прізвище (місцеве)
   LastNameNative: string = null;
   // Ім'я (місцеве)
   FirstNameNative: string = null;
   // По-батькові (місцеве)
   MiddleNameNative: string = null;
   // Організація 
   Organisation: string = null; // ref: 'ReferenceCounterparty',
   // Дата народження
   Birthday: string = null;
   // ИПН
   IPN: Date = null;
   // Країна народження
   BornCountry: string = null;
   // Коментар
   Comment: string = null;
   // Паспортні данні
   PassportIds: string = null;  // ref: 'ReferenceIndividualCounterpartiesPassport'
   // поштова скринька
   Email: string = null;
   // Телефон
   Telephone: string = null;
   // Мобільний
   Cellphone: string = null;
   // Факс
   Fax: string = null;
   // Адреса
   Address: string = null;
   // Адреса доставки
   DeliveryAddress: string = null;
   //Поштовий індекс
   PostIndex: string = null;

}

export class IndividualCounterpartiesPassportReference extends BaseModel{
    _id: string = undefined;
   // Серія та номер паспорту
   PassportNumber: string = null;
   // Прізвище
   LastName: string = null;
   // Ім'я
   FirstName: string = null;
   // Дата видачі
   ProductionDate: string = null;
   // Ким випущенний
   Organinization: string = null;
   // Країна
   Country: string = null;
   // Національність
   Nationality: string = null;

}