import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesPageComponent } from './pages/roles-page/roles-page.component';
import { RolesTableComponent } from './components/roles-table/roles-table.component';
import { RoleNavbarComponent } from './components/role-navbar/role-navbar.component';
import { RoleModalButtonComponent } from './components/role-modal-button/role-modal-button.component';
import { RoleModalFormComponent } from './components/role-modal-form/role-modal-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';


@NgModule({
  declarations: [
    RolesPageComponent,
    RolesTableComponent,
    RoleNavbarComponent,
    RoleModalButtonComponent,
    RoleModalFormComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ]
})
export class RolesModule { }
