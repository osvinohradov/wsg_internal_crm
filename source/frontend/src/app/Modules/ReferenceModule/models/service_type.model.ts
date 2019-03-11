import { BaseModel } from './base_model';

export class ServiceTypeModel extends BaseModel{
    _id: string = null;
    // Найменування
    name: string = '';
    // Постачальник (посилання на Контрагентів)
    provider_id: any = null;
    // Додатковий постачальник (посилання на Контрагентів)
    additional_provider_id: any = null;
    // Каталог номенклатури (посилання на Номенклатура)
    nomenclature_catalog_id: any = null;
    
    ticket_short_name: string = '';
    ticket_full_name: string = '';
    nomenclature_as_service_id: any = null;
    main_services: string = '';
    agency_services: string = '';
    other_services: string = '';
    forfeit: number = 0;
    mpe: number = 0;

    updated_at: Date = null;
    created_at: Date = null;   
}