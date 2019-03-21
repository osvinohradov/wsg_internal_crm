import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { map, catchError} from 'rxjs/operators';
import { HttpResponse } from "../../Common/models/HttpResponseModel";
import { TourismInvoiceDetail } from "../models/tourism_invoice_detail";

@Injectable()
export class TourismService {

  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  get_tourism_invoice_count() {
    return this.http.get<Number>(this.baseUrl + `/train/count/invoices`);
  }

  get_tourism_invoices(skip, limit): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(this.baseUrl + `/train/invoices?skip=${skip}&limit=${limit}`);
  }

  get_tourism_invoice_by_id(id: string) {
    return this.http.get<HttpResponse>(this.baseUrl + `/train/invoice/${id}`);
  }

  update_tourism_invoice(train: TourismInvoiceDetail) {
    return this.http.put<HttpResponse>(this.baseUrl + `/train/invoice`, train).toPromise();
  }

  create_tourism_invoice(train: TourismInvoiceDetail) {
    return this.http.post<HttpResponse>(this.baseUrl + `/train/invoice`, train).toPromise();
  }
//   remove_tourism_invoice(id: string) {
//     return this.http.delete(this.baseUrl + `/references/airport/${id}`);
//   }
}
