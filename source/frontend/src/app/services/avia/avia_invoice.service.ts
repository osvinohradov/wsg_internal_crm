import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { AviaInvoiceModel } from '../../models/avia/avia_invoice.model';

@Injectable()
export class AviaInvoiceService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  get_avia_invoice_count() {
    return this.http.get<number>(this.baseUrl + `/avia/count/invoices`);
  }

  get_avia_invoices(skip, limit) {
    return this.http.get<AviaInvoiceModel[]>(
      this.baseUrl + `/avia/invoice?skip=${skip}&limit=${limit}`
    );
  }

  get_avia_invoice_by_id(id: string) {
    return this.http.get(this.baseUrl + `/avia/invoice/${id}`);
  }

  update_avia_invoice(airport: AviaInvoiceModel) {
    return this.http.put(
      this.baseUrl + `/avia/invoice/${airport._id}`,
      airport
    );
  }

  save_avia_invoice(airport: AviaInvoiceModel) {
    return this.http.post(this.baseUrl + `/avia/invoice`, airport);
  }

  remove_avia_invoice(id: string) {
    return this.http.delete(this.baseUrl + `/references/airport/${id}`);
  }
}
