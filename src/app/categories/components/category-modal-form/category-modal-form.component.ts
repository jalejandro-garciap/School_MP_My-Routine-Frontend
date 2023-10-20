import { Component, Inject } from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../services/categories.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Trim } from '../../../shared/utils/trim.class';

@Component({
  selector: 'app-category-modal-form',
  templateUrl: './category-modal-form.component.html',
  styleUrls: ['./category-modal-form.component.scss']
})
export class CategoryModalFormComponent {

  public pageName: string = 'categoria';
  public categoryId = '';

  public categories: Category[] = [];
  
  public myForm: FormGroup = this._fb.group({
    name        : [''],
    description : ['']
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CategoryModalFormComponent>,
    private _categoriesService: CategoriesService,
    // private _toastService: ToastsService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {    
    this.categoryId = this.data.id;
    if( !!this.categoryId ) {
      this._categoriesService.getById( this.categoryId ).subscribe({
        next: response => {
          const dbCategory = response.data;
          const { id, ...category } = dbCategory;
          this.myForm.patchValue( category );
        },
        error: (error: HttpErrorResponse) => {
          // this._toastService.error(error.error, error.message);
        }  
      });
    }
  }

  submit():void {
    if( this.myForm.invalid ) return;

    const newCategory = {
      ...Trim.trimProperties( this.myForm.value ),
    };

    //* EDIT
    if( this.categoryId && this.myForm.valid) {
      const updateCategory = { ...newCategory, id: this.categoryId }
      this.dialogRef.close( updateCategory );
      return;
    }

    //* CREATE
    this.dialogRef.close( newCategory );
  }

  close(): void { this.dialogRef.close() }

  get buttonTitle(): string {
    return (this.categoryId.length === 0)
      ? 'Crear'
      : 'Editar';
  }

  get modalIcon(): string {
    return ( this.categoryId )
      ? 'edit'
      : 'settings_suggest';
  }

}
