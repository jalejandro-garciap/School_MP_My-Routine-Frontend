import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/shared/interfaces/response.interface';
import { User } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment.development';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private BASE_API:string = environment.BASE_API;
  private PATH_API:string = 'passenger';

  private headers!: HttpHeaders;

  constructor(
    private _http: HttpClient,
    private _authService:AuthService,
  ) { 
    this.headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token })
  }

  getUsers() {
    return this._http.get<ApiResponse<User[]>>(`${this.BASE_API}/${this.PATH_API}`, { headers: this.headers });
  }

  getById(id:string) {
    return this._http.get<ApiResponse<User>>(`${this.BASE_API}/${this.PATH_API}/${id}`, { headers: this.headers });
  }

  create(user:User) {
    return this._http.post<ApiResponse<User>>(`${this.BASE_API}/${this.PATH_API}`, user, { headers: this.headers });
  }  

  update(id:string, user:User) {
    return this._http.put<ApiResponse<User>>(`${this.BASE_API}/${this.PATH_API}/${id}`, user, { headers: this.headers });
  }
  
  deleteById(id:string) {
    return this._http.delete<ApiResponse<User>>(`${this.BASE_API}/${this.PATH_API}/${id}`, { headers: this.headers });
  }

  get token() {
    return this._authService.getAuthStorage()!.jwt;
  }

}
 