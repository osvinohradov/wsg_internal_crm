import { BaseModel } from './base_model';

export class AviaCompanyReference extends BaseModel{
    _id: string = undefined;
    // Номер
    Number: string = "";

    
    // Найменування
    Name: string = "";
    // 
    Code: string = "";
    // IATA
    IATA: string = "";
}