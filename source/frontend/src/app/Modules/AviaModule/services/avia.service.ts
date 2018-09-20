import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AviaService {
  baseUrl: String = 'http://localhost:8080/api/v1';
  constructor(private http: HttpClient) {
  }

  get_avia_invoices() {
    return this.http.get(this.baseUrl + '/avia_invoice');
  }

  get_avia_invoice_by_id(id: any) {
    return this.http.get(this.baseUrl + `/avia_invoice?id=${id}`);
  }

  update_avia_invoice(id, invoice: any) {
    return this.http.put(this.baseUrl + `/avia_invoice?id=${id}`, invoice);
  }

  create_avia_invoice(invoice: any) {
    return this.http.post(this.baseUrl + `/avia_invoice`, invoice);
  }

  printAct() {
    console.log('Get avia invoice full');
  }

  printInvoice() {
    console.log('Get avia invoice full');
  }

  printScore() {
    console.log('Get avia invoice full');
  }

  printScoreWithStamp() {
    console.log('Get avia invoice full');
  }
} 
