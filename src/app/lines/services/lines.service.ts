import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiResponse } from 'src/app/shared/interfaces/response.interface';
import { environment } from 'src/environments/environment.development';
import { Line } from '../interfaces/line.interface';

@Injectable({
  providedIn: 'root'
})
export class LinesService {

  private BASE_API:string = environment.BASE_API;
  private PATH_API:string = 'line';

  private headers!: HttpHeaders;

  constructor(
    private _http: HttpClient,
    private _authService:AuthService,
  ) { 
    this.headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token })
  }

  getLines() {
    return this._http.get<ApiResponse<Line[]>>(`${this.BASE_API}/${this.PATH_API}`, { headers: this.headers });
  }

  getById(id:string) {
    return this._http.get<ApiResponse<Line>>(`${this.BASE_API}/${this.PATH_API}/${id}`, { headers: this.headers });
  }

  create(line:Line) {
    return this._http.post<ApiResponse<Line>>(`${this.BASE_API}/${this.PATH_API}`, line, { headers: this.headers });
  }  

  update(line:Line) {
    return this._http.put<ApiResponse<Line>>(`${this.BASE_API}/${this.PATH_API}`, line, { headers: this.headers });
  }
  
  deleteById(id:string) {
    return this._http.delete<ApiResponse<Line>>(`${this.BASE_API}/${this.PATH_API}/${id}`, { headers: this.headers });
  }

  get token() {
    return this._authService.getAuthStorage()!.jwt;
  }
  
}
