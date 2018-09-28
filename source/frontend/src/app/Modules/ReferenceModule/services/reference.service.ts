import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AirportReference } from '../models/airport.reference';
import { AviaCompanyReference } from '../models/avia_company.reference'

@Injectable()
export class ReferenceService {
  baseUrl: String = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {
  }

  // Start Airports Service Block
  get_airports_count(){
    return this.http.get<number>(this.baseUrl + `/references/count/airport`); 
  }

  get_airports(skip, limit){
    return this.http.get<AirportReference[]>(this.baseUrl + `/references/airport?skip=${skip}&limit=${limit}`);
  }

  get_airport_by_id(id: string) {
    return this.http.get(this.baseUrl + `/references/airport/${id}`);
  }

  update_airport(airport: AirportReference) {
    return this.http.put(this.baseUrl + `/references/airport/${airport._id}`, airport);
  }

  save_airport(airport: AirportReference){
    return this.http.post(this.baseUrl + `/references/airport`, airport);
  }

  remove_airport(id: string){
    return this.http.delete(this.baseUrl + `/references/airport/${id}`);
  }
  // End Airports Service Block

  // Start Avia Company Service Block
  get_avia_company_count(){
    return this.http.get<Number>(this.baseUrl + `/references/count/avia_company`); 
  }

  get_avia_companies(skip, limit){
    return this.http.get<AviaCompanyReference[]>(this.baseUrl + `/references/avia_company?skip=${skip}&limit=${limit}`);
  }

  get_avia_company_by_id(id: string) {
    return this.http.get(this.baseUrl + `/references/avia_company/${id}`);
  }

  update_avia_company(avia_company: AviaCompanyReference) {
    return this.http.put(this.baseUrl + `/references/avia_company/${avia_company._id}`, avia_company);
  }

  save_avia_company(avia_company: AviaCompanyReference){
    return this.http.post(this.baseUrl + `/references/avia_company`, avia_company);
  }

  remove_avia_company(id: string){
    return this.http.delete(this.baseUrl + `/references/avia_company/${id}`);
  }
  // End Avia Company Service Block
}
