import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from '../routes.routing';
import { PostsPageComponent } from './pages/posts-page/posts-page.component';

const routes: Routes = [
  {
    path: AppRoutes.EMPTY,
    component: PostsPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
