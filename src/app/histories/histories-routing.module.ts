import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '../routes.routing';
import { HistoriesPageComponent } from './pages/histories-page/histories-page.component';

const routes: Routes = [
  {
    path: AppRoutes.EMPTY,
    component: HistoriesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoriesRoutingModule { }
