import { BaseModel } from './base_model';

export class AirportReference extends BaseModel{
    _id: string = null;
    // Код
    Code: number = null;
    // Найменування
    Name: string = null;
    // Найменування на російській
    NameRus: string = null;
    // Найменування на англійській
    NameEng: string = null;
    // Найменування на українській
    NameUkr: string = null;
    // Місце на російській
    PlaceRus: string = null;
    // Місце на англійській
    PlaceEng: string = null;
    // Місце на українській
    PlaceUkr: string = null;
    // Країна на російській
    CountryRus: string = null;
    // Країна на англійській
    CountryEng: string = null;
    // Країна на українській
    CountryUkr: string = null;
    //
    latitude: number = 0;
    //
    longitude: number = 0;   
}


