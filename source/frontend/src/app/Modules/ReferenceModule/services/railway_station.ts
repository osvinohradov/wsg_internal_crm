import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RefRailwayStationNameModel } from "../models";
import { Observable } from "rxjs";
import { HttpResponse } from "../../Common/models/HttpResponseModel";

@Injectable()
export class RefRailwayStationService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  get_railway_stations_names(railway_station_name: string): Observable<HttpResponse> {
    const url = `${this.baseUrl}/reference/railway_stations/names`;

    return this.http.get<HttpResponse>(url, {
      params: {
        railway_station_name: railway_station_name
      }
    });
  }
}
