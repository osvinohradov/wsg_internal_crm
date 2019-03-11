import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TrainInvoiceDetail, TrainInvoiceInfo } from "../models";
import { Observable } from "rxjs";
import { map, catchError} from 'rxjs/operators';
import { HttpResponse } from "../../Common/models/HttpResponseModel";

@Injectable()
export class TrainService {

  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  get_train_invoice_count() {
    return this.http.get<Number>(this.baseUrl + `/train/count/invoices`);
  }

  get_train_invoices(skip, limit): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(this.baseUrl + `/train/invoices?skip=${skip}&limit=${limit}`);
  }

  get_train_invoice_by_id(id: string) {
    return this.http.get<HttpResponse>(this.baseUrl + `/train/invoice/${id}`);
  }

  update_train_invoice(train: TrainInvoiceDetail) {
    return this.http.put<HttpResponse>(this.baseUrl + `/train/invoice`, train).toPromise();
  }

  create_train_invoice(train: TrainInvoiceDetail) {
    return this.http.post<HttpResponse>(this.baseUrl + `/train/invoice`, train).toPromise();
  }
//   remove_train_invoice(id: string) {
//     return this.http.delete(this.baseUrl + `/references/airport/${id}`);
//   }
}
