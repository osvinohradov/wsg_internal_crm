import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RefOrganizationNameModel } from "../models";
import { Observable } from "rxjs";
import { HttpResponse } from "../../Common/models/HttpResponseModel";

@Injectable()
export class RefOrganizationService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  get_organizations_names(organization_name=''): Observable<HttpResponse> {
    const url = `${this.baseUrl}/organizations/names`;
    
    return this.http.get<HttpResponse>(url, { params: {
        organization_name: organization_name
    }});
  }
}
