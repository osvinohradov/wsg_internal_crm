import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AirportModel } from "../models";
import { Observable } from "rxjs";

// TODO: Add return type for all functions, HTTPResponse
@Injectable()
export class AirportService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  // Отримати кількість записів в БД
  get_airports_count() {
    return this.http.get(this.baseUrl + `/reference/count/airport`);
  }
  // Отримати визначену кількість елементів з БД
  get_airports(skip, limit) {
    return this.http.get(this.baseUrl + `/reference/airports?skip=${skip}&limit=${limit}`);
  }
  // Отримати елемент за унікальним ідентифікатором
  get_airport_by_id(id: string) {
    console.log('airport id: ', id)
    return this.http.get<AirportModel>(this.baseUrl + `/reference/airport/${id}`);
  }
  // Оновити існуючий запис
  update_airport(airport: AirportModel) {
    return this.http.put(this.baseUrl + `/reference/airport/${airport._id}`, airport);
  }
  // Створити новий елемент
  create_airport(airport: AirportModel) {
    return this.http.post(this.baseUrl + `/reference/airport`, airport);
  }
  // Видалити елемент з БД
  delete_airport(id: string) {
    return this.http.delete(this.baseUrl + `/reference/airport/${id}`);
  }
}
