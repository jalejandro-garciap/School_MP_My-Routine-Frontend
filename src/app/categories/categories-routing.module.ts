import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from '../routes.routing';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';

const routes: Routes = [
  {
    path: AppRoutes.EMPTY,
    component: CategoriesPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
