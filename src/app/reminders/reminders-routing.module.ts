import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from '../routes.routing';
import { RemindersPageComponent } from './pages/reminders-page/reminders-page.component';

const routes: Routes = [
  {
    path: AppRoutes.EMPTY,
    component: RemindersPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemindersRoutingModule { }
