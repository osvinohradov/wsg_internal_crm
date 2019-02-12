import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RefRailwayStationNameModel } from "../models";
import { Observable } from "rxjs";

@Injectable()
export class RefRailwayStationService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  get_railway_stations_names(railway_station_name: string): Observable<RefRailwayStationNameModel[]> {
    const url = `${this.baseUrl}/ref/railway_station/names`;

    return this.http.get<RefRailwayStationNameModel[]>(url, {
      params: {
        railway_station_name: railway_station_name
      }
    });
  }
}
