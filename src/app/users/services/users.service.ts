import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/shared/interfaces/response.interface';
import { User } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private BASE_API:string = environment.BASE_API;
  private PATH_API:string = 'passenger';

  constructor(private _http: HttpClient) { }

  getUsers() {
    return this._http.get<ApiResponse<User[]>>(`${this.BASE_API}/${this.PATH_API}`);
  }

  getById(id:string) {
    return this._http.get<ApiResponse<User>>(`${this.BASE_API}/${this.PATH_API}/${id}`);
  }

  create(user:User) {
    return this._http.post<ApiResponse<User>>(`${this.BASE_API}/${this.PATH_API}`, user);
  }  

  update(id:string, user:User) {
    return this._http.put<ApiResponse<User>>(`${this.BASE_API}/${this.PATH_API}/${id}`, user);
  }
  
  deleteById(id:string) {
    return this._http.delete<ApiResponse<User>>(`${this.BASE_API}/${this.PATH_API}/${id}`);
  }  

}
 