import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { map, catchError} from 'rxjs/operators';
import { GroupInvoiceNameModel } from "../models";

@Injectable()
export class GroupInvoiceService {

  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  get_group_invoices_names(group_invoice_name): Observable<GroupInvoiceNameModel[]> {
    const url = `${this.baseUrl}/group/invoices/names`;

    return this.http.get<GroupInvoiceNameModel[]>(url, {
      params: {
        group_invoice_name: group_invoice_name
      }
    });
  }

}
