import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiResponse } from 'src/app/shared/interfaces/response.interface';
import { User } from 'src/app/users/interfaces/user.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private BASE_API:string = environment.BASE_API;
  private PATH:string = 'role';

  private token:string = '';
  private headers!: HttpHeaders;

  constructor(
    private _http: HttpClient,
    private _authService:AuthService,
  ) { 
    this.token = this._authService.getAuthStorage()!.jwt;
    this.headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token })
  }

  getRoles() {
    return this._http.get<ApiResponse<Role[]>>(`${this.BASE_API}/${this.PATH}`, { headers: this.headers });
  }

  getById(id:string) {
    return this._http.get<ApiResponse<Role>>(`${this.BASE_API}/${this.PATH}/${id}`, { headers: this.headers });
  }

  create(role:Role) {
    return this._http.post<ApiResponse<Role>>(`${this.BASE_API}/${this.PATH}`, role, { headers: this.headers });
  }  

  update(id:string, role:Role) {
    return this._http.put<ApiResponse<Role>>(`${this.BASE_API}/${this.PATH}/${id}`, role, { headers: this.headers });
  }
  
  deleteById(id:string) {
    return this._http.delete<ApiResponse<Role>>(`${this.BASE_API}/${this.PATH}/${id}`, { headers: this.headers });
  }  

}
