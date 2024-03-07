import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '../routes.routing';
import { TransportsPageComponent } from './pages/transports-page/transports-page.component';

const routes: Routes = [
  {
    path: AppRoutes.EMPTY,
    component: TransportsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportsRoutingModule { }
