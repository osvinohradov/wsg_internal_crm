import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServiceTypeModel, ServiceTypeNameModel } from "../models";
import { Observable } from "rxjs";
import { HttpResponse } from "../../Common/models/HttpResponseModel";

@Injectable()
export class ServiceTypeService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}


  get_service_types_names(service_type_name=''): Observable<HttpResponse> {
    const url = `${this.baseUrl}/reference/service_types/names`;
    
    return this.http.get<HttpResponse>(url, { params: {
      service_type_name: service_type_name
    }});
  }

  get_service_types(): Observable<HttpResponse> {
    const url = `${this.baseUrl}/reference/service_types`;
    return this.http.get<HttpResponse>(url);
  }

  get_service_type_by_id(id: string): Observable<HttpResponse> {
    const url = `${this.baseUrl}/reference/service_type/${id}`;
    return this.http.get<HttpResponse>(url);
  }

  create_servive_type(service_type: ServiceTypeModel): Observable<HttpResponse> {
    const url = `${this.baseUrl}/reference/service_type`;
    return this.http.post<HttpResponse>(url, service_type);
  }

  update_service_type(service_type: ServiceTypeModel): Observable<HttpResponse> {
    const url = `${this.baseUrl}/reference/service_type/${service_type._id}`;
    return this.http.put<HttpResponse>(url, service_type);
  }

  delete_service_type(id: string): Observable<HttpResponse> {
    const url = `${this.baseUrl}/reference/service_type/${id}`;
    return this.http.delete<HttpResponse>(url);
  }

  get_service_types_count(): Observable<HttpResponse> {
    const url = `${this.baseUrl}/reference/count/service_type`;
    return this.http.get<HttpResponse>(url);
  }
}
