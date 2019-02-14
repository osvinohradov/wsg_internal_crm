import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RefUnitClassifierNameModel, RefUserNameModel } from "../models";
import { Observable } from "rxjs";

@Injectable()
export class RefUserService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}


  get_users_names(user_name=''): Observable<RefUserNameModel[]> {
      const url = `${this.baseUrl}/users/names`;

    return this.http.get<RefUserNameModel[]>(url, { params: {
        user_name: user_name
    }});
  }

}