import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from '../routes.routing';
import { MembersPageComponent } from './pages/members-page/members-page.component';

const routes: Routes = [
  {
    path:AppRoutes.EMPTY,
    component: MembersPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
