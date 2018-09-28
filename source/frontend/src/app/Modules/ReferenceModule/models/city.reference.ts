import { BaseModel } from './base_model';

export class CityReference extends BaseModel{
    _id: string = undefined;
    // Найменування
    Name: string = null;
    // Код
    Code: number = null;
    // Повна назва російською
    NameRus: string = null;
    // Повна назва англійською
    NameEng: string = null;
    // Повна назва українською
    NameUkr: string = null;
    // Код станції
    StationCode: number = null;
}