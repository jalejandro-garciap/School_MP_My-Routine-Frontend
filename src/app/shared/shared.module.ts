import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CircleLoaderComponent } from './components/circle-loader/circle-loader.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    Error404PageComponent,
    ConfirmModalComponent,
    NavbarComponent,
    CircleLoaderComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
  ],
  exports: [
    NavbarComponent,
    CircleLoaderComponent,
  ]
})
export class SharedModule { }
