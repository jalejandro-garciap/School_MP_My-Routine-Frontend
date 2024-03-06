import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MembersPageComponent } from './pages/members-page/members-page.component';
import { MemberModalButtonComponent } from './components/member-modal-button/member-modal-button.component';
import { MemberModalFormComponent } from './components/member-modal-form/member-modal-form.component';
import { MemberNavbarComponent } from './components/member-navbar/member-navbar.component';
import { MembersTableComponent } from './components/members-table/members-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [
    MembersPageComponent,
    MemberModalButtonComponent,
    MemberModalFormComponent,
    MemberNavbarComponent,
    MembersTableComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class MembersModule { }
