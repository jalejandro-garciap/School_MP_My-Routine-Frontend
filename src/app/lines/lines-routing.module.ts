import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '../routes.routing';
import { LinesPageComponent } from './pages/lines-page/lines-page.component';

const routes: Routes = [
  {
    path: AppRoutes.EMPTY,
    component: LinesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LinesRoutingModule { }
