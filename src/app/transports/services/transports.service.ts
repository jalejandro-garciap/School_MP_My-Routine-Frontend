import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiResponse } from 'src/app/shared/interfaces/response.interface';
import { environment } from 'src/environments/environment.development';
import { Transport } from '../interfaces/transport.interface';

@Injectable({
  providedIn: 'root'
})
export class TransportsService {

  private BASE_API:string = environment.BASE_API;
  private PATH_API:string = 'transport';

  private headers!: HttpHeaders;

  constructor(
    private _http: HttpClient,
    private _authService:AuthService,
  ) { 
    this.headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token })
  }

  getTransports() {
    return this._http.get<ApiResponse<Transport[]>>(`${this.BASE_API}/${this.PATH_API}`, { headers: this.headers });
  }

  getById(id:string) {
    return this._http.get<ApiResponse<Transport>>(`${this.BASE_API}/${this.PATH_API}/${id}`, { headers: this.headers });
  }

  create(transport:Transport) {
    return this._http.post<ApiResponse<Transport>>(`${this.BASE_API}/${this.PATH_API}`, transport, { headers: this.headers });
  }  

  update(transport:Transport) {
    return this._http.put<ApiResponse<Transport>>(`${this.BASE_API}/${this.PATH_API}`, transport, { headers: this.headers });
  }
  
  deleteById(id:string) {
    return this._http.delete<ApiResponse<Transport>>(`${this.BASE_API}/${this.PATH_API}/${id}`, { headers: this.headers });
  }

  get token() {
    return this._authService.getAuthStorage()!.jwt;
  }

}
