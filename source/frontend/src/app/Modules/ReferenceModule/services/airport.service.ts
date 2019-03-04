import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AirportModel } from "../models";
import { Observable } from "rxjs";
import { HttpResponse } from "../../Common/models/HttpResponseModel";

// TODO: Add return type for all functions, HTTPResponse
@Injectable()
export class AirportService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  // Отримати кількість записів в БД
  get_airports_count(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(this.baseUrl + `/reference/count/airport`);
  }
  // Отримати визначену кількість елементів з БД
  get_airports(skip, limit): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(this.baseUrl + `/reference/airports?skip=${skip}&limit=${limit}`);
  }
  // Отримати елемент за унікальним ідентифікатором
  get_airport_by_id(id: string): Observable<HttpResponse> {
    console.log('airport id: ', id)
    return this.http.get<HttpResponse>(this.baseUrl + `/reference/airport/${id}`);
  }
  // Оновити існуючий запис
  update_airport(airport: AirportModel): Observable<HttpResponse> {
    return this.http.put<HttpResponse>(this.baseUrl + `/reference/airport/${airport._id}`, airport);
  }
  // Створити новий елемент
  create_airport(airport: AirportModel): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(this.baseUrl + `/reference/airport`, airport);
  }
  // Видалити елемент з БД
  delete_airport(id: string): Observable<HttpResponse> {
    return this.http.delete<HttpResponse>(this.baseUrl + `/reference/airport/${id}`);
  }
}
