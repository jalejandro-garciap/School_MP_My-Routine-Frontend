import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '../routes.routing';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';

const routes: Routes = [
  {
    path: AppRoutes.EMPTY,
    component: RolesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
