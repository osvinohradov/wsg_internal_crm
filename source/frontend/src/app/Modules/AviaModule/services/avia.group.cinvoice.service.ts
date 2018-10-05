import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AviaInvoice } from '../models';

@Injectable()
export class AviaGroupInvoiceService {
  baseUrl: String = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {
  }

  get_avia_invoice_count(){
    return this.http.get<number>(this.baseUrl + `/avia/count/invoices`); 
  }

  get_avia_invoices(skip, limit){
    return this.http.get<AviaInvoice[]>(this.baseUrl + `/avia/invoice?skip=${skip}&limit=${limit}`);
  }

  get_avia_invoice_by_id(id: string) {
    return this.http.get(this.baseUrl + `/avia/invoice/${id}`);
  }

  update_avia_invoice(airport: AviaInvoice) {
    return this.http.put(this.baseUrl + `/avia/invoice/${airport._id}`, airport);
  }

  save_avia_invoice(airport: AviaInvoice){
    return this.http.post(this.baseUrl + `/avia/invoice`, airport);
  }

  remove_avia_invoice(id: string){
    return this.http.delete(this.baseUrl + `/references/airport/${id}`);
  }

  // организация всегда ворлдсервис груп
  // Клієнт - выбор клиннта из списка контрагентов (выбрать только имена)
  // окончательная валюта - временно сделать внутренним массивом (CAD, CHF, CZK, EUR, GBP, JPY, RUB, SEK, USD, grn)
  // Фамилия (Билеты) - выбрать из физические особы контрагентов
  // Форма оплаты - готывка платыжна картка банкывський кредит



} 
