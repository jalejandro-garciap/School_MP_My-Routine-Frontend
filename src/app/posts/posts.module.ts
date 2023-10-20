import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsPageComponent } from './pages/posts-page/posts-page.component';
import { PostModalButtonComponent } from './components/post-modal-button/post-modal-button.component';
import { PostModalFormComponent } from './components/post-modal-form/post-modal-form.component';
import { PostNavbarComponent } from './components/post-navbar/post-navbar.component';
import { PostsTableComponent } from './components/posts-table/posts-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';


@NgModule({
  declarations: [
    PostsPageComponent,
    PostModalButtonComponent,
    PostModalFormComponent,
    PostNavbarComponent,
    PostsTableComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ]
})
export class PostsModule { }
