import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IndividualCounterpartyReference, IndividualCounterpartiesPassportReference } from "../models";

@Injectable()
export class IndividualCounterpartyService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  get_individual_counterparties_count() {
    return this.http.get<number>(this.baseUrl + `/references/count/individual_counterparty`);
  }

  get_individual_counterparties(skip, limit) {
    return this.http.get<IndividualCounterpartyReference[]>(
      this.baseUrl + `/references/individual_counterparty?skip=${skip}&limit=${limit}`
    );
  }

  get_individual_counterparty_by_id(id: string) {
    return this.http.get(this.baseUrl + `/references/individual_counterparty/${id}`);
  }

  update_individual_counterparty(individual_counterparty: IndividualCounterpartyReference) {
    return this.http.put(
      this.baseUrl + `/references/individual_counterparty/${individual_counterparty._id}`,individual_counterparty);
  }

  save_individual_counterparty(individual_counterparty: IndividualCounterpartyReference) {
    return this.http.post(this.baseUrl + `/references/individual_counterparty`, individual_counterparty);
  }

  remove_individual_counterparty(id: string) {
    return this.http.delete(this.baseUrl + `/references/individual_counterparty/${id}`);
  }
}
