import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from '../routes.routing';
import { UsersPageComponent } from './pages/users-page/users-page.component';

const routes: Routes = [
  {
    path: AppRoutes.EMPTY,
    component: UsersPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
