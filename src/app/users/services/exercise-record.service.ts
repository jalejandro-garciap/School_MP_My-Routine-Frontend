import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/shared/interfaces/response.interface';
import { environment } from 'src/environments/environment.development';
import { ExerciseRecord } from '../interfaces/exercise-record.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseRecordService {

  private BASE_API:string = environment.BASE_API;
  private PATH_API:string = 'exercise-record';

  private token:string = '';
  private headers!: HttpHeaders;

  constructor(
    private _http: HttpClient,
    private _authService:AuthService,
  ) {
    this.token = this._authService.getAuthStorage()!.jwt;
    this.headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token })
  }

  getByUserId(id:number) {
    return this._http.get<ApiResponse<ExerciseRecord[]>>(`${this.BASE_API}/${this.PATH_API}/passenger/${id}`,  { headers: this.headers });
  }

  getAll() {
    return this._http.get<ApiResponse<ExerciseRecord[]>>(`${this.BASE_API}/${this.PATH_API}`,  { headers: this.headers });
  }

}
