import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CurrencyExchangeReference } from "../models";

@Injectable()
export class CurrencyExchangeService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  get_currency_exchange_count() {
    return this.http.get<number>(this.baseUrl + `/references/count/currency_exchange`);
  }

  get_currency_exchanges(skip, limit) {
    return this.http.get<CurrencyExchangeReference[]>(
      this.baseUrl + `/references/currency_exchange?skip=${skip}&limit=${limit}`
    );
  }

  get_currency_exchange_by_id(id: string) {
    return this.http.get(this.baseUrl + `/references/currency_exchange/${id}`);
  }

  update_currency_exchange(curator: CurrencyExchangeReference) {
    return this.http.put(
      this.baseUrl + `/references/currency_exchange/${curator._id}`,
      curator
    );
  }

  save_currency_exchange(curator: CurrencyExchangeReference) {
    return this.http.post(this.baseUrl + `/references/currency_exchange`, curator);
  }

  remove_currency_exchange(id: string) {
    return this.http.delete(this.baseUrl + `/references/currency_exchange/${id}`);
  }
}
