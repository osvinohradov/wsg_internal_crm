import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RefCheckingAccountNameModel } from "../models";
import { Observable } from "rxjs";
import { HttpResponse } from "../../Common/models/HttpResponseModel";

@Injectable()
export class RefCheckingAccountService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  get_checking_accounts_names(checking_account_name=''): Observable<HttpResponse> {
    const url = `${this.baseUrl}/reference/checking_accounts/names`;
    
    return this.http.get<HttpResponse>(url, { params: {
        checking_account_name: checking_account_name
    }});
  }
}
