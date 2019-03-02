import { BaseModel } from './base_model';

export class AirportModel extends BaseModel{
    _id: string = null;
    // Код
    name: string = '';
    // Найменування на російській
    name_rus: string = '';
    // Найменування на англійській
    name_eng: string = '';
    // Найменування на українській
    name_ukr: string = '';
    // Місце на російській
    place_rus: string = '';
    // Місце на англійській
    place_eng: string = '';
    // Місце на українській
    place_ukr: string = '';
    // Країна на російській
    country_rus: string = '';
    // Країна на англійській
    country_eng: string = '';
    // Країна на українській
    country_ukr: string = '';
    //
    latitude: number = 0;
    //
    longitude: number = 0;   
}


