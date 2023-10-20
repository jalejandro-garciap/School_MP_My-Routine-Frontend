import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExercisePageComponent } from './pages/exercise-page/exercise-page.component';
import { AppRoutes } from '../routes.routing';

const routes: Routes = [
  {
    path: AppRoutes.EMPTY,
    component: ExercisePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseRoutingModule { }
