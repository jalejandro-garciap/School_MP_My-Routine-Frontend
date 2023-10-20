import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { CategoryModalButtonComponent } from './components/category-modal-button/category-modal-button.component';
import { CategoryModalFormComponent } from './components/category-modal-form/category-modal-form.component';
import { CategoryNavbarComponent } from './components/category-navbar/category-navbar.component';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoriesPageComponent,
    CategoryModalButtonComponent,
    CategoryModalFormComponent,
    CategoryNavbarComponent,
    CategoriesTableComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ]
})
export class CategoriesModule { }
