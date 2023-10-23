import { Component } from '@angular/core';
import { LoginCredential } from '../../interfaces/login.interface';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/routes.routing';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(
    private _authService: AuthService,
    private _router:Router
  ) {}

  onAuth( credentials:LoginCredential ) {

    this._authService.auth( credentials ).subscribe({
      next: reseponse => {
        this._authService.setAuthStorage( reseponse.data );
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
        this._router.navigate([AppRoutes.USERS]);
      },
      error: (e:any ) => {
        console.log(e);
        Swal.fire(`${e.error.data.errors}`)
      } 
    });
  }

}
