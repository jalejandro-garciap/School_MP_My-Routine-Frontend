import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from './routes.routing';

const routes: Routes = [
  {
    path: AppRoutes.HOME,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: AppRoutes.AUTH,
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: AppRoutes.DASHBOARD,
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: AppRoutes.ROLES,
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule)
  },
  {
    path: AppRoutes.MESSAGES,
    loadChildren: () => import('./messages/messages.module').then(m => m.MessagesModule)
  },
  {
    path: AppRoutes.USERS,
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: AppRoutes.POSTS,
    loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)
  },
  {
    path: AppRoutes.CATEGORIES,
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: AppRoutes.REMINDERS,
    loadChildren: () => import('./reminders/reminders.module').then(m => m.RemindersModule)
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
