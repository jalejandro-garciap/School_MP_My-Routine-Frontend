import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiResponse } from 'src/app/shared/interfaces/response.interface';
import { environment } from 'src/environments/environment.development';
import { History } from '../interfaces/history.interface';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoriesService {

  private BASE_API:string = environment.BASE_API;
  private PATH_API:string = 'history';

  private headers!: HttpHeaders;

  constructor(
    private _http: HttpClient,
    private _authService:AuthService,
  ) { 
    this.headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token })
  }

  getHistories() {
    return this._http.get<ApiResponse<History[]>>(`${this.BASE_API}/${this.PATH_API}`, { headers: this.headers });
  }

  historyByPassengerId(id:number) {
    return this._http.get<ApiResponse<History[]>>(`${this.BASE_API}/${this.PATH_API}/passenger/${id}`, { headers: this.headers });
  }

  // getById(id:string) {
  //   return this._http.get<ApiResponse<User>>(`${this.BASE_API}/${this.PATH_API}/${id}`, { headers: this.headers });
  // }

  // create(user:User) {
  //   return this._http.post<ApiResponse<User>>(`${this.BASE_API}/${this.PATH_API}`, user, { headers: this.headers });
  // }  

  // update(id:string, user:User) {
  //   return this._http.put<ApiResponse<User>>(`${this.BASE_API}/${this.PATH_API}/${id}`, user, { headers: this.headers });
  // }
  
  // deleteById(id:string) {
  //   return this._http.delete<ApiResponse<User>>(`${this.BASE_API}/${this.PATH_API}/${id}`, { headers: this.headers });
  // }

  get token() {
    return this._authService.getAuthStorage()!.jwt;
  }

}
