import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiResponse } from 'src/app/shared/interfaces/response.interface';
import { environment } from 'src/environments/environment.development';
import { Passenger } from '../interfaces/passenger.interface';

@Injectable({
  providedIn: 'root'
})
export class PassengersService {

  private BASE_API:string = environment.BASE_API;
  private PATH:string = 'passenger';

  private headers!: HttpHeaders;

  constructor(
    private _http: HttpClient,
    private _authService:AuthService,
  ) { 
    this.headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token })
  }

  getPassengers() {
    return this._http.get<ApiResponse<Passenger[]>>(`${this.BASE_API}/${this.PATH}`, { headers: this.headers });
  }

  getById(id:string) {
    return this._http.get<ApiResponse<Passenger>>(`${this.BASE_API}/${this.PATH}/${id}`, { headers: this.headers });
  }

  create(passenger:Passenger) {
    return this._http.post<ApiResponse<Passenger>>(`${this.BASE_API}/${this.PATH}`, passenger, { headers: this.headers });
  }  

  update(id:string, passenger:Passenger) {
    return this._http.put<ApiResponse<Passenger>>(`${this.BASE_API}/${this.PATH}/${id}`, passenger, { headers: this.headers });
  }
  
  deleteById(id:string) {
    return this._http.delete<ApiResponse<Passenger>>(`${this.BASE_API}/${this.PATH}/${id}`, { headers: this.headers });
  }  

  get token() {
    return this._authService.getAuthStorage()!.jwt;
  }
  
}
