import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NomenclatureReference } from "../models";

@Injectable()
export class RefNomenclatureService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}


  get_ref_unit_clasifiers_names() {
    return this.http.get<number>(this.baseUrl + `/reference/unit_classifiers/names`).toPromise();
  }

// get_nomenclature_count() {
//   return this.http.get<number>(this.baseUrl + `/references/count/nomenclature`);
// }

// get_nomenclatures(skip, limit) {
//   return this.http.get<NomenclatureReference[]>(
//     this.baseUrl + `/references/nomenclature?skip=${skip}&limit=${limit}`
//   );
// }

// get_nomenclature_by_id(id: string) {
//   return this.http.get(this.baseUrl + `/references/nomenclature/${id}`);
// }

// update_nomenclature(nomenclature: NomenclatureReference) {
//   return this.http.put(
//     this.baseUrl + `/references/nomenclature/${nomenclature._id}`,
//     nomenclature
//   );
// }

// save_nomenclature(nomenclature: NomenclatureReference) {
//   return this.http.post(this.baseUrl + `/references/nomenclature`, nomenclature);
// }

// remove_nomenclature(id: string) {
//   return this.http.delete(this.baseUrl + `/references/nomenclature/${id}`);
// }
}
