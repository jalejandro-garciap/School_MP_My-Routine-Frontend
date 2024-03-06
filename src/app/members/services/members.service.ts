import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ApiResponse } from 'src/app/shared/interfaces/response.interface';
import { environment } from 'src/environments/environment.development';
import { Member } from '../interfaces/member.interface';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private BASE_API:string = environment.BASE_API;
  private PATH:string = 'user';

  private headers!: HttpHeaders;

  constructor(
    private _http: HttpClient,
    private _authService:AuthService,
  ) { 
    this.headers = new HttpHeaders({'Authorization': 'Bearer ' + this.token })
  }

  getMembers() {
    return this._http.get<ApiResponse<Member[]>>(`${this.BASE_API}/${this.PATH}`, { headers: this.headers });
  }

  getById(id:string) {
    return this._http.get<ApiResponse<Member>>(`${this.BASE_API}/${this.PATH}/${id}`, { headers: this.headers });
  }

  create(member:Member) {
    return this._http.post<ApiResponse<Member>>(`${this.BASE_API}/${this.PATH}`, member, { headers: this.headers });
  }  

  update(id:string, member:Member) {
    return this._http.put<ApiResponse<Member>>(`${this.BASE_API}/${this.PATH}/${id}`, member, { headers: this.headers });
  }
  
  deleteById(id:string) {
    return this._http.delete<ApiResponse<Member>>(`${this.BASE_API}/${this.PATH}/${id}`, { headers: this.headers });
  }  

  get token() {
    return this._authService.getAuthStorage()!.jwt;
  }

}
