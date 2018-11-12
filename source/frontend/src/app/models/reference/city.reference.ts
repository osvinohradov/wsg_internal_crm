import { BaseModel } from './base_model';

export class CityReference extends BaseModel{
    _id: string = undefined;
    // Код
    Number: string = "";
    
    // Найменування
    Name: string = "";
    // Повна назва російською
    NameRus: string = "";
    // Повна назва англійською
    NameEng: string = "";
    // Повна назва українською
    NameUkr: string = "";
    // Код станції
    StationCode: number = 0;
}