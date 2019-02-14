import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServiceTypeReference, RefServiceTypeNameModel } from "../models";
import { Observable } from "rxjs";

@Injectable()
export class RefServiceTypeService {
  baseUrl: String = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) {}



  get_service_types_names(service_type_name=''): Observable<RefServiceTypeNameModel[]> {
    const url = `${this.baseUrl}/ref/service_types/names`;
    
    return this.http.get<RefServiceTypeNameModel[]>(url, { params: {
      service_type_name: service_type_name
    }});
  }













  get_service_types_count() {
    return this.http.get<number>(
      this.baseUrl + `/references/count/service_type`
    );
  }

  get_service_types(skip, limit) {
    return this.http.get<ServiceTypeReference[]>(
      this.baseUrl + `/references/service_type?skip=${skip}&limit=${limit}`
    );
  }

  get_service_type_by_id(id: string) {
    return this.http.get(this.baseUrl + `/references/service_type/${id}`);
  }

  update_service_type(service_type: ServiceTypeReference) {
    return this.http.put(
      this.baseUrl + `/references/service_type/${service_type._id}`,
      service_type
    );
  }

  save_service_type(service_type: ServiceTypeReference) {
    return this.http.post(
      this.baseUrl + `/references/service_type`,
      service_type
    );
  }

  remove_service_type(id: string) {
    return this.http.delete(this.baseUrl + `/references/service_type/${id}`);
  }
}
