import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IndividualCounterpartyReference, IndividualCounterpartiesPassportReference } from "../models";

@Injectable()
export class RefRailwayStationService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  get_railway_stations_names(name) {
    return this.http.get<number>(this.baseUrl + `/ref/railway_station/names?railway_station_name=${name}`).toPromise();
  }
}
