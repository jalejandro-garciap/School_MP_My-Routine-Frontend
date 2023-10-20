import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from '../routes.routing';
import { MessagesPageComponent } from './components/messages-page/messages-page.component';

const routes: Routes = [
  {
    path: AppRoutes.EMPTY,
    component: MessagesPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
