import { BaseModel } from './base_model';

export class AirportReference extends BaseModel{
    _id: string = null;
    // Код
    Number: string = "";


    // Найменування
    Name: string = "";
    // Найменування на російській
    NameRus: string = "";
    // Найменування на англійській
    NameEng: string = "";
    // Найменування на українській
    NameUkr: string = "";
    // Місце на російській
    PlaceRus: string = "";
    // Місце на англійській
    PlaceEng: string = "";
    // Місце на українській
    PlaceUkr: string = "";
    // Країна на російській
    CountryRus: string = "";
    // Країна на англійській
    CountryEng: string = "";
    // Країна на українській
    CountryUkr: string = "";
    //
    latitude: number = 0;
    //
    longitude: number = 0;   
}


