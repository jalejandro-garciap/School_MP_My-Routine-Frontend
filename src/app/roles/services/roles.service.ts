import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/shared/interfaces/response.interface';
import { environment } from 'src/environments/environment.development';
import { Role } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private BASE_API:string = environment.BASE_API;
  private PATH_API:string = 'roles';

  constructor(private _http: HttpClient) { }

  getRoles() {
    return this._http.get<ApiResponse<Role[]>>(`${this.BASE_API}/${this.PATH_API}`);
  }

  getById(id:string) {
    return this._http.get<ApiResponse<Role>>(`${this.BASE_API}/${this.PATH_API}/${id}`);
  }

  create(role:Role) {
    return this._http.post<ApiResponse<Role>>(`${this.BASE_API}/${this.PATH_API}`, role);
  }  

  update(id:string, role:Role) {
    return this._http.put<ApiResponse<Role>>(`${this.BASE_API}/${this.PATH_API}/${id}`, role);
  }
  
  deleteById(id:string) {
    return this._http.delete<ApiResponse<Role>>(`${this.BASE_API}/${this.PATH_API}/${id}`);
  }  

}
