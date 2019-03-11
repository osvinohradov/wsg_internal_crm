import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IndividualCounterpartyReference, IndividualCounterpartiesPassportReference, RefIndividualCounterpartyNameModel } from "../models";
import { Observable } from "rxjs";

@Injectable()
export class RefIndividualCounterpartyService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  get_individual_counterparties_names(individual_counterparty_name=''): Observable<RefIndividualCounterpartyNameModel[]> {
    const url = `${this.baseUrl}/reference/individual_counterparties/names`;
    
    return this.http.get<RefIndividualCounterpartyNameModel[]>(url, { params: {
      individual_counterparty_name: individual_counterparty_name
    }});
  }













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
