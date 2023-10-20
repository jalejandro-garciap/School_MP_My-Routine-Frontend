import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/shared/interfaces/response.interface';
import { environment } from 'src/environments/environment.development';
import { ExerciseRecord } from '../interfaces/exercise-record.interface';

@Injectable({
  providedIn: 'root'
})
export class ExerciseRecordService {

  private BASE_API:string = environment.BASE_API;
  private PATH_API:string = 'exercise-record';

  constructor(private _http: HttpClient) { }

  getByUserId(id:string) {
    return this._http.get<ApiResponse<ExerciseRecord[]>>(`${this.BASE_API}/${this.PATH_API}/${id}`);
  }

}
