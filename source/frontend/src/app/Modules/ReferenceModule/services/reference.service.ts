import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  AirportReference,
  AviaCompanyReference,
  CityReference,
  CuratorReference,
  ServiceTypeReference
} from "../models";

@Injectable()
export class ReferenceService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  // Start Airports Service Block
  get_airports_count() {
    return this.http.get<number>(this.baseUrl + `/references/count/airport`);
  }

  get_airports(skip, limit) {
    return this.http.get<AirportReference[]>(
      this.baseUrl + `/references/airport?skip=${skip}&limit=${limit}`
    );
  }

  get_airport_by_id(id: string) {
    return this.http.get(this.baseUrl + `/references/airport/${id}`);
  }

  update_airport(airport: AirportReference) {
    return this.http.put(
      this.baseUrl + `/references/airport/${airport._id}`,
      airport
    );
  }

  save_airport(airport: AirportReference) {
    return this.http.post(this.baseUrl + `/references/airport`, airport);
  }

  remove_airport(id: string) {
    return this.http.delete(this.baseUrl + `/references/airport/${id}`);
  }
  // End Airports Service Block

  // Start Avia Company Service Block
  get_avia_company_count() {
    return this.http.get<number>(
      this.baseUrl + `/references/count/avia_company`
    );
  }

  get_avia_companies(skip, limit) {
    return this.http.get<AviaCompanyReference[]>(
      this.baseUrl + `/references/avia_company?skip=${skip}&limit=${limit}`
    );
  }

  get_avia_company_by_id(id: string) {
    return this.http.get(this.baseUrl + `/references/avia_company/${id}`);
  }

  update_avia_company(avia_company: AviaCompanyReference) {
    return this.http.put(
      this.baseUrl + `/references/avia_company/${avia_company._id}`,
      avia_company
    );
  }

  save_avia_company(avia_company: AviaCompanyReference) {
    return this.http.post(
      this.baseUrl + `/references/avia_company`,
      avia_company
    );
  }

  remove_avia_company(id: string) {
    return this.http.delete(this.baseUrl + `/references/avia_company/${id}`);
  }
  // End Avia Company Service Block

  // Start Service Type Service Block
  get_service_types_count() {
    return this.http.get<number>(
      this.baseUrl + `/references/count/service_type`
    );
  }

  get_service_types(skip, limit) {
    return this.http.get<ServiceTypeReference[]>(
      this.baseUrl + `/references/service_type?skip=${skip}&limit=${limit}`
    );
  }

  get_service_type_by_id(id: string) {
    return this.http.get(this.baseUrl + `/references/service_type/${id}`);
  }

  update_service_type(service_type: ServiceTypeReference) {
    return this.http.put(
      this.baseUrl + `/references/service_type/${service_type._id}`,
      service_type
    );
  }

  save_service_type(service_type: ServiceTypeReference) {
    return this.http.post(
      this.baseUrl + `/references/service_type`,
      service_type
    );
  }

  remove_service_type(id: string) {
    return this.http.delete(this.baseUrl + `/references/service_type/${id}`);
  }
  // End Service Type Service Block

  // Start Curators Service Block
  get_curators_count() {
    return this.http.get<number>(this.baseUrl + `/references/count/curator`);
  }

  get_curators(skip, limit) {
    return this.http.get<CuratorReference[]>(
      this.baseUrl + `/references/curator?skip=${skip}&limit=${limit}`
    );
  }

  get_curator_by_id(id: string) {
    return this.http.get(this.baseUrl + `/references/curator/${id}`);
  }

  update_curator(curator: CuratorReference) {
    return this.http.put(
      this.baseUrl + `/references/curator/${curator._id}`,
      curator
    );
  }

  save_curator(curator: CuratorReference) {
    return this.http.post(this.baseUrl + `/references/curator`, curator);
  }

  remove_curator(id: string) {
    return this.http.delete(this.baseUrl + `/references/curator/${id}`);
  }


  get_counterparty_names(pattern){
    return this.http.get<any[]>(this.baseUrl + `/references/counterparty/search?q=${pattern}`)
    // Dummy route for get counterparty elements
    
  }
  // End Curators Service Block
}
