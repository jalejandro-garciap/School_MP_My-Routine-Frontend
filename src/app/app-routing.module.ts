import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from './routes.routing';
import { canActivateAuth, canMatchAuth, canMatchIsNotAutenticated } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: AppRoutes.AUTH,
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
    canMatch: [canMatchIsNotAutenticated]
  },
  {
    path: AppRoutes.DASHBOARD,
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [canActivateAuth],
    canMatch: [canMatchAuth]
  },
  {
    path: AppRoutes.USERS,
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [canActivateAuth],
    canMatch: [canMatchAuth]
  },
  // {
  //   path: AppRoutes.ERROR_404,
  //   component: Error404PageComponent
  // },
  {
    path: AppRoutes.ANY_ROUTE,
    redirectTo: AppRoutes.AUTH,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
