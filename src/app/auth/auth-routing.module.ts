import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AppRoutes } from '../routes.routing';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
  { 
    path: AppRoutes.ANY_ROUTE,
    redirectTo: AppRoutes.LOGIN
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
