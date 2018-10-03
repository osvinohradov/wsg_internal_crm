import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CityReference } from "../models";

@Injectable()
export class CityService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  get_cities_count() {
    return this.http.get<number>(this.baseUrl + `/references/count/city`);
  }

  get_cities(skip, limit) {
    return this.http.get<CityReference[]>(
      this.baseUrl + `/references/city?skip=${skip}&limit=${limit}`
    );
  }

  get_city_by_id(id: string) {
    return this.http.get(this.baseUrl + `/references/city/${id}`);
  }

  update_city(city: CityReference) {
    return this.http.put(
      this.baseUrl + `/references/curator/${city._id}`, city);
  }

  save_city(city: CityReference) {
    return this.http.post(this.baseUrl + `/references/city`, city);
  }

  remove_city(id: string) {
    return this.http.delete(this.baseUrl + `/references/city/${id}`);
  }
}
