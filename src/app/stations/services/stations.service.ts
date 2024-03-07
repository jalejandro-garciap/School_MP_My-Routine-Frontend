import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiResponse } from 'src/app/shared/interfaces/response.interface';
import { environment } from 'src/environments/environment.development';
import { Station } from '../interfaces/station.interface';

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  private BASE_API:string = environment.BASE_API;
  private PATH_API:string = 'station';

  private headers!: HttpHeaders;

  constructor(
    private _http: HttpClient,
    private _authService:AuthService,
  ) { 
    this.headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token })
  }

  getStations() {
    return this._http.get<ApiResponse<Station[]>>(`${this.BASE_API}/${this.PATH_API}`, { headers: this.headers });
  }

  getById(id:string) {
    return this._http.get<ApiResponse<Station>>(`${this.BASE_API}/${this.PATH_API}/${id}`, { headers: this.headers });
  }

  create(station:Station) {
    return this._http.post<ApiResponse<Station>>(`${this.BASE_API}/${this.PATH_API}`, station, { headers: this.headers });
  }  

  update(id:string, station:Station) {
    return this._http.put<ApiResponse<Station>>(`${this.BASE_API}/${this.PATH_API}/${id}`, station, { headers: this.headers });
  }
  
  deleteById(id:string) {
    return this._http.delete<ApiResponse<Station>>(`${this.BASE_API}/${this.PATH_API}/${id}`, { headers: this.headers });
  }

  get token() {
    return this._authService.getAuthStorage()!.jwt;
  }

}
