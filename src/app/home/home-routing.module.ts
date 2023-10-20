import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '../routes.routing';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: AppRoutes.EMPTY, // home
    component: HomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
