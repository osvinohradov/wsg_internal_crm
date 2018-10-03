import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CounterpartyReference } from "../models";

@Injectable()
export class CounterpartyService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  // Start Service Type Service Block
  get_counterparties_count() {
    return this.http.get<number>(
      this.baseUrl + `/references/count/counterparty`
    );
  }

  get_counterparties(skip, limit) {
    return this.http.get<CounterpartyReference[]>(
      this.baseUrl + `/references/counterparty?skip=${skip}&limit=${limit}`
    );
  }

  get_counterparty_by_id(id: string) {
    return this.http.get(this.baseUrl + `/references/counterparty/${id}`);
  }

  update_counterparty(counterparty: CounterpartyReference) {
    return this.http.put(
      this.baseUrl + `/references/counterparty/${counterparty._id}`, counterparty);
  }

  save_counterparty(counterparty: CounterpartyReference) {
    return this.http.post(
      this.baseUrl + `/references/counterparty`, counterparty);
  }

  remove_counterparty(id: string) {
    return this.http.delete(this.baseUrl + `/references/counterparty/${id}`);
  }
}
