import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CounterpartyModel, CounterpartyNameModel } from "../models";
import { __core_private_testing_placeholder__ } from "@angular/core/testing";

import { Observable } from "rxjs";
import { HttpResponse } from "../../Common/models/HttpResponseModel";

@Injectable()
export class CounterpartyService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}


  get_counterparties_names(counterparty_name=''): Observable<CounterpartyNameModel[]> {
    const url = `${this.baseUrl}/reference/counterparties/names`;
    
    return this.http.get<CounterpartyNameModel[]>(url, { params: {
      counterparty_name: counterparty_name
    }});
  }

  get_counterparties(): Observable<HttpResponse> {
    const url = `${this.baseUrl}/reference/counterparties`;
    return this.http.get<HttpResponse>(url);
  }

  get_counterparty_by_id(id: string): Observable<HttpResponse> {
    const url = `${this.baseUrl}/reference/counterparty/${id}`;
    return this.http.get<HttpResponse>(url);
  }

  create_counterparty(service_type: CounterpartyModel): Observable<HttpResponse> {
    const url = `${this.baseUrl}/reference/service_type`;
    return this.http.post<HttpResponse>(url, service_type);
  }

  update_counterparty(service_type: CounterpartyModel): Observable<HttpResponse> {
    const url = `${this.baseUrl}/reference/counterparty/${service_type._id}`;
    return this.http.put<HttpResponse>(url, service_type);
  }

  delete_counterparty(id: string): Observable<HttpResponse> {
    const url = `${this.baseUrl}/reference/counterparty/${id}`;
    return this.http.delete<HttpResponse>(url);
  }

  get_counterparty_count(): Observable<HttpResponse> {
    const url = `${this.baseUrl}/reference/count/counterparty`;
    return this.http.get<HttpResponse>(url);
  }
}
