import { BaseModel } from './base_model';

export class AviaCompanyReference extends BaseModel{
    _id: string = undefined;
    // Найменування
    Name: string = null;
    // Номер
    Number: number = null;
    // IATA
    IATA: string = null;
}