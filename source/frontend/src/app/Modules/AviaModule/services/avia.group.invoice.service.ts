import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AviaGroupInvoice } from '../models';

@Injectable()
export class AviaGroupInvoiceService {
  baseUrl: String = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {
  }

  get_avia_group_invoices_count(){
    return this.http.get<number>(this.baseUrl + `/avia/group/count/invoices`); 
  }

  get_avia_group_invoices(skip, limit){
    return this.http.get<AviaGroupInvoice[]>(this.baseUrl + `/avia/group/invoice?skip=${skip}&limit=${limit}`);
  }

  get_avia_group_invoice_by_id(id: string) {
    return this.http.get(this.baseUrl + `/avia/group/invoice${id}`);
  }

  update_avia_group_invoice(avia_group_invoice: AviaGroupInvoice) {
    return this.http.put(this.baseUrl + `/avia/group/invoice/${avia_group_invoice._id}`, avia_group_invoice);
  }

  save_avia_group_invoice(avia_group_invoice: AviaGroupInvoice){
    return this.http.post(this.baseUrl + `/avia/group/invoice`, avia_group_invoice);
  }

  remove_avia_group_invoice(id: string){
    return this.http.delete(this.baseUrl + `/avia/group/invoice/${id}`);
  }

  get_avia_group_invoice_content(pattern){
    let query_string = pattern ? `?name=${pattern}` : ""
    return this.http.get(this.baseUrl + `/avia/group/search/invoices${query_string}`)
  }

  // организация всегда ворлдсервис груп
  // Клієнт - выбор клиннта из списка контрагентов (выбрать только имена)
  // окончательная валюта - временно сделать внутренним массивом (CAD, CHF, CZK, EUR, GBP, JPY, RUB, SEK, USD, grn)
  // Фамилия (Билеты) - выбрать из физические особы контрагентов
  // Форма оплаты - готывка платыжна картка банкывський кредит



} 
