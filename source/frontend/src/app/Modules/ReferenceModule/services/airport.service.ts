import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AirportModel } from "../models";
import { Observable } from "rxjs";
import { HttpResponse } from "../../Common/models/HttpResponseModel";

// TODO: Add return type for all functions, HTTPResponse
@Injectable()
export class AirportService {
  baseUrl: string = 'http://localhost:8080/api/v1/reference';

  constructor(private http: HttpClient) {}

  // Отримати кількість записів в БД
  get_airports_count(): Observable<HttpResponse> {
    const url = `${this.baseUrl}/count/airport`
    return this.http.get<HttpResponse>(url);
  }
  // Отримати визначену кількість елементів з БД
  get_airports(skip, limit): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(this.baseUrl + `/airports?skip=${skip}&limit=${limit}`);
  }
  // Отримати елемент за унікальним ідентифікатором
  get_airport_by_id(id: string): Observable<HttpResponse> {
    console.log('airport id: ', id)
    return this.http.get<HttpResponse>(this.baseUrl + `/airport/${id}`);
  }
  // Оновити існуючий запис
  update_airport(airport: AirportModel): Observable<HttpResponse> {
    return this.http.put<HttpResponse>(this.baseUrl + `/airport/${airport._id}`, airport);
  }
  // Створити новий елемент
  create_airport(airport: AirportModel): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(this.baseUrl + `/airport`, airport);
  }
  // Видалити елемент з БД
  delete_airport(id: string): Observable<HttpResponse> {
    return this.http.delete<HttpResponse>(this.baseUrl + `/airport/${id}`);
  }
}
