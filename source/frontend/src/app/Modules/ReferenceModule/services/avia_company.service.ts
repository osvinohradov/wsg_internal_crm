import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AviaCompanyReference } from "../models";
import { HttpResponse } from "../../Common/models/HttpResponseModel";

@Injectable()
export class AviaCompanyService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  // Start Avia Company Service Block
  get_avia_company_count() {
    return this.http.get<HttpResponse>(
      this.baseUrl + `/reference/count/avia_company`
    );
  }

  get_avia_companies(skip, limit) {
    return this.http.get<HttpResponse>(
      this.baseUrl + `/reference/avia_company?skip=${skip}&limit=${limit}`
    );
  }

  get_avia_company_by_id(id: string) {
    return this.http.get(this.baseUrl + `/reference/avia_company/${id}`);
  }

  update_avia_company(avia_company: AviaCompanyReference) {
    return this.http.put(
      this.baseUrl + `/reference/avia_company/${avia_company._id}`,
      avia_company
    );
  }

  save_avia_company(avia_company: AviaCompanyReference) {
    return this.http.post<HttpResponse>(
      this.baseUrl + `/reference/avia_company`,
      avia_company
    );
  }

  remove_avia_company(id: string) {
    return this.http.delete<HttpResponse>(this.baseUrl + `/reference/avia_company/${id}`);
  }
}
