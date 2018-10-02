import { BaseModel } from './base_model';

export class AviaCompanyReference extends BaseModel{
    _id: string = undefined;
    // Номер
    Number: number = 0;
    // Найменування
    Name: string = null;
    // 
    Code: string = null;
    // IATA
    IATA: string = null;
}