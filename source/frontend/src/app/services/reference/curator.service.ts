import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CuratorReference }  from "../../models/reference";

@Injectable()
export class CuratorService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}

  get_curators_count() {
    return this.http.get<number>(this.baseUrl + `/references/count/curator`);
  }

  get_curators(skip, limit) {
    return this.http.get<CuratorReference[]>(
      this.baseUrl + `/references/curator?skip=${skip}&limit=${limit}`
    );
  }

  get_curator_by_id(id: string) {
    return this.http.get(this.baseUrl + `/references/curator/${id}`);
  }

  update_curator(curator: CuratorReference) {
    return this.http.put(
      this.baseUrl + `/references/curator/${curator._id}`,
      curator
    );
  }

  save_curator(curator: CuratorReference) {
    return this.http.post(this.baseUrl + `/references/curator`, curator);
  }

  remove_curator(id: string) {
    return this.http.delete(this.baseUrl + `/references/curator/${id}`);
  }

  /**
   * 
   * return object like this
   * {
   *    _id: ObjectId
   *    Name: String
   * }
   */
  get_counterparty_names(pattern){
    return this.http.get<any[]>(this.baseUrl + `/references/counterparty/search?name=${pattern}`)
    // Dummy route for get counterparty elements
  }
}
