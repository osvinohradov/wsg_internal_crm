import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CuratorReference, RefCuratorNameModel } from "../models";
import { Observable } from "rxjs";
import { HttpResponse } from "../../Common/models/HttpResponseModel";

@Injectable()
export class RefCuratorService {
  baseUrl: String = "http://localhost:8080/api/v1/reference";

  constructor(private http: HttpClient) {}


  get_curators_names(curator_name=''): Observable<HttpResponse>{
    const url = `${this.baseUrl}/curators/names`;
    
    return this.http.get<HttpResponse>(url, { params: {
      curator_name: curator_name
    }});
  }

  get_curators_count() {
    return this.http.get<HttpResponse>(`${this.baseUrl}/count/curator`);
  }

  get_curators(skip, limit) {
    return this.http.get<HttpResponse>(`${this.baseUrl}/curator?skip=${skip}&limit=${limit}`);
  }

  get_curator_by_id(id: string) {
    return this.http.get<HttpResponse>(this.baseUrl + `/curator/${id}`);
  }

  update_curator(curator: CuratorReference) {
    return this.http.put(`${this.baseUrl}/curator/${curator._id}`, curator);
  }

  save_curator(curator: CuratorReference) {
    return this.http.post<HttpResponse>(this.baseUrl + `/curator`, curator);
  }

  remove_curator(id: string) {
    return this.http.delete<HttpResponse>(this.baseUrl + `/curator/${id}`);
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
    return this.http.get<any[]>(`${this.baseUrl}/counterparty/search?name=${pattern}`)
    // Dummy route for get counterparty elements
  }
}
