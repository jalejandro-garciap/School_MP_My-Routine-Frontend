import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { LoginCredential } from '../interfaces/login.interface';
import { ApiResponse } from 'src/app/shared/interfaces/response.interface';
import { Auth } from '../interfaces/auth.interface';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/routes.routing';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_API:string = environment.BASE_API;

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  auth(loginCredential:LoginCredential) {
    return this._http.post<ApiResponse<Auth>>(`${this.BASE_API}/auth/login`, loginCredential);
  }

  setAuthStorage( auth:Auth ) {
    localStorage.setItem(`_auth`, JSON.stringify(auth) );
  }

  getAuthStorage(): Auth {
    // const storageAuth = localStorage.getItem(`_auth`)!;

    // if( storageAuth === '' ) {
    //   localStorage.clear();
    //   sessionStorage.clear();
    //   this._router.navigate([AppRoutes.AUTH]);
    //     return;
    // }

    const auth: Auth = JSON.parse( localStorage.getItem(`_auth`)! );
    return auth;
  } 

  isAutenticate():boolean {
    return (this.getAuthStorage()) ? true : false ;
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this._router.navigate([AppRoutes.AUTH]);
  }

}
