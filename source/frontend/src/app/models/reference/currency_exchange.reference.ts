import { BaseModel } from './base_model';

export class CurrencyExchangeReference extends BaseModel{
    _id: string = undefined;
    // 
    Number: number = 0;

    
    // Найменування
    Name: string = null;
    // Коефіцієнт
    Сoefficient: number = 0;
}