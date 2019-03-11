import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CityReference } from "../models";
import { HttpResponse } from "../../Common/models/HttpResponseModel";

@Injectable()
export class CityService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  get_cities_count() {
    return this.http.get<HttpResponse>(this.baseUrl + `/reference/count/city`);
  }

  get_cities(skip, limit) {
    return this.http.get<HttpResponse>(this.baseUrl + `/reference/city?skip=${skip}&limit=${limit}`);
  }

  get_city_by_id(id: string) {
    return this.http.get<HttpResponse>(this.baseUrl + `/reference/city/${id}`);
  }

  update_city(city: CityReference) {
    return this.http.put<HttpResponse>(this.baseUrl + `/reference/curator/${city._id}`, city);
  }

  save_city(city: CityReference) {
    return this.http.post<HttpResponse>(this.baseUrl + `/reference/city`, city);
  }

  remove_city(id: string) {
    return this.http.delete<HttpResponse>(this.baseUrl + `/reference/city/${id}`);
  }
}
