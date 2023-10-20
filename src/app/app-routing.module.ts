import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from './routes.routing';

const routes: Routes = [
  {
    path: AppRoutes.AUTH,
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: AppRoutes.DASHBOARD,
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: AppRoutes.USERS,
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: AppRoutes.EXERCISE,
    loadChildren: () => import('./exercise/exercise.module').then(m => m.ExerciseModule)
  },
  // {
  //   path: AppRoutes.ERROR_404,
  //   component: Error404PageComponent
  // },
  {
    path: AppRoutes.ANY_ROUTE,
    redirectTo: AppRoutes.USERS,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
