import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AirportModel } from "../models";
import { Observable } from "rxjs";

@Injectable()
export class AirportService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  // Start Airports Service Block
  get_airports_count() {
    return this.http.get<number>(this.baseUrl + `/reference/count/airport`);
  }

  get_airports(skip, limit) {
    return this.http.get<AirportModel[]>(
      this.baseUrl + `/reference/airports?skip=${skip}&limit=${limit}`
    );
  }

  get_airport_by_id(id: string) {
    console.log('airport id: ', id)
    return this.http.get<AirportModel>(this.baseUrl + `/reference/airport/${id}`);
  }

  update_airport(airport: AirportModel) {
    return this.http.put(
      this.baseUrl + `/references/airport/${airport._id}`,
      airport
    );
  }

  save_airport(airport: AirportModel) {
    return this.http.post(this.baseUrl + `/references/airport`, airport);
  }

  remove_airport(id: string) {
    return this.http.delete(this.baseUrl + `/references/airport/${id}`);
  }
}
