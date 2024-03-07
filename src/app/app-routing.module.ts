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
  {
    path: AppRoutes.MEMBERS,
    loadChildren: () => import('./members/members.module').then(m => m.MembersModule),
    canActivate: [canActivateAuth],
    canMatch: [canMatchAuth]
  },
  {
    path: AppRoutes.HISTORIES,
    loadChildren: () => import('./histories/histories.module').then(m => m.HistoriesModule),
    canActivate: [canActivateAuth],
    canMatch: [canMatchAuth]
  },
  {
    path: AppRoutes.TRANSPORTS,
    loadChildren: () => import('./transports/transports.module').then(m => m.TransportsModule),
    canActivate: [canActivateAuth],
    canMatch: [canMatchAuth]
  },
  {
    path: AppRoutes.LINES,
    loadChildren: () => import('./lines/lines.module').then(m => m.LinesModule),
    canActivate: [canActivateAuth],
    canMatch: [canMatchAuth]
  },
  {
    path: AppRoutes.STATIONS,
    loadChildren: () => import('./stations/stations.module').then(m => m.StationsModule),
    canActivate: [canActivateAuth],
    canMatch: [canMatchAuth]
  },
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
