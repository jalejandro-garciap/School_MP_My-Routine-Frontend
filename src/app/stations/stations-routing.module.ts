import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '../routes.routing';
import { StationsPageComponent } from './pages/stations-page/stations-page.component';

const routes: Routes = [
  {
    path: AppRoutes.EMPTY,
    component: StationsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationsRoutingModule { }
