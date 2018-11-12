import { BaseModel } from './base_model';

export class ServiceTypeReference extends BaseModel{
    _id: string = undefined;
    Number: string = "";


    // Найменування
    Name: string = null;
    // Постачальник (посилання на Контрагентів)
    ProviderId: string = null; 
    // Додатковий постачальник (посилання на Контрагентів)
    AdditionalProviderId: string = null;
    // Каталог номенклатури (посилання на Номенклатура)
    NomenclatureCatalogId: string = null;
    // Коротке найменування квитка
    TicketShortName: string = null;
    // Повне найменування квитка
    TicketFullName: string = null;
    // Підлегла номенклатура (як послуга)
    NomenclatureAsServiceId: string = null;
    // Основні послуги
    MainServices: string = null;
    // Послуги агенства
    AgencyServices: string = null;
    // Інші сервіси
    OtherServices: string = null;
    // Штрафні санкції
    Forfeit: number = 0;
    // Ставка ПДВ (перечисление возможно из обмена валют)
    MPE: number = 0;
}