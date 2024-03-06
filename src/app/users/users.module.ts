import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UserModalButtonComponent } from './components/user-modal-button/user-modal-button.component';
import { UserModalFormComponent } from './components/user-modal-form/user-modal-form.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LogModalComponent } from './components/log-modal/log-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UsersPageComponent,
    UserModalButtonComponent,
    UserModalFormComponent,
    UserNavbarComponent,
    UsersTableComponent,
    LogModalComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class UsersModule { }
