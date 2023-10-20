import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    Error404PageComponent,
    ConfirmModalComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AppRoutingModule,
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
