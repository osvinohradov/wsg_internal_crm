import { BaseModel } from './base_model';

export class ServiceTypeReference extends BaseModel{
    _id: string = undefined;

    Number: number = 0;
    // Найменування
    Name: string = null;
    // Постачальник (посилання на Контрагентів)
    ProviderId: any = {}
    // Додатковий постачальник (посилання на Контрагентів)
    AdditionalProviderId: any = {};
    // Каталог номенклатури (посилання на Номенклатура)
    NomenclatureCatalogId: any = {};
    // Коротке найменування квитка
    TicketShortName: string = null;
    // Повне найменування квитка
    TicketFullName: string = null;
    // Підлегла номенклатура (як послуга)
    NomenclatureAsServiceId: any = {};
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