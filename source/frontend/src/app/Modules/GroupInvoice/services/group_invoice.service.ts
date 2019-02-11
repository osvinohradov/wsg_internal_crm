import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { map, catchError} from 'rxjs/operators';

@Injectable()
export class GroupInvoiceService {

  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  get_group_invoices_names() {
    return this.http.get(
      this.baseUrl + `/group/invoices/names`
    ).toPromise();
  }

}
