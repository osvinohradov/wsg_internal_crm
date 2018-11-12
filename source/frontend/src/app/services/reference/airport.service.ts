import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AirportReferenceModel } from "../../models/reference";

@Injectable()
export class AirportService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  // Start Airports Service Block
  get_airports_count() {
    return this.http.get<number>(this.baseUrl + `/references/count/airport`);
  }

  get_airports(skip, limit) {
    return this.http.get<AirportReferenceModel[]>(
      this.baseUrl + `/references/airport?skip=${skip}&limit=${limit}`
    );
  }

  get_airport_by_id(id: string) {
    return this.http.get(this.baseUrl + `/references/airport/${id}`);
  }

  update_airport(airport: AirportReferenceModel) {
    return this.http.put(
      this.baseUrl + `/references/airport/${airport._id}`,
      airport
    );
  }

  save_airport(airport: AirportReferenceModel) {
    return this.http.post(this.baseUrl + `/references/airport`, airport);
  }

  remove_airport(id: string) {
    return this.http.delete(this.baseUrl + `/references/airport/${id}`);
  }
}
