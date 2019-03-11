import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RefUnitClassifierNameModel } from "../models";
import { Observable } from "rxjs";

@Injectable()
export class RefUnitClassifierService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}


  get_ref_unit_clasifiers_names(ref_unit_classifier_name=''): Observable<RefUnitClassifierNameModel[]> {
      const url = `${this.baseUrl}/reference/unit_classifiers/names`;

    return this.http.get<RefUnitClassifierNameModel[]>(url, { params: {
      ref_unit_classifier_name: ref_unit_classifier_name
    }});
  }

}