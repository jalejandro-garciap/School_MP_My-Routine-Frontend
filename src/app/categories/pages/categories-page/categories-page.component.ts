import { Component } from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { ConfirmModalService } from 'src/app/shared/services/confirm-modal.service';
import { CategoriesService } from '../../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalData } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { CategoryModalFormComponent } from '../../components/category-modal-form/category-modal-form.component';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent {

  public categories: Category[] = [];

  constructor(
    private _confirmModalService: ConfirmModalService,
    // private _toastService: ToastCustomService,
    private _categoriesService: CategoriesService,
    private _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this._categoriesService.getCategories().subscribe({
      next:  reponse => {
        const dbCategories = reponse.data;
        this.categories = dbCategories;
      },
      // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
    });
  }

  onCreate(category: Category):void {
    this._categoriesService.create( category ).subscribe({
      next: response => {
        const dbCategory = response.data; 
        this.categories.push(dbCategory);
        this.categories = [...this.categories];
        // this._toastService.success('Proyecto creado', `Se creó <b>${dbUser.name}</b> correctamente`);
      },
      // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
    });
  }

  onDeleteById(id:string) {
    this._categoriesService.getById( id ).subscribe({
      next: response => {
        const dbCategory = response.data;
        const message:ConfirmModalData = { body: `<< ${dbCategory.name} >>` };
        this._confirmModalService.openModal(message).subscribe(accept => {
          if( !accept ) return;

          this._categoriesService.deleteById( id ).subscribe({
            next: categoryDeleted => {
              const idx: number = this.categories.findIndex(m => m.id === dbCategory.id);
              this.categories.splice(idx, 1);
              this.categories = [...this.categories];
              // this._toastService.info('Proyecto eliminado', `Se eliminó <b>${dbProject.name}</b> correctamente`);
            }
          });
        });
      },
      // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
    });
  }

  editById( id:string ):void {
    const dialogRef = this._dialog.open(CategoryModalFormComponent, {
      data: { id }
    });

    dialogRef.afterClosed().subscribe( (category:Category)  => {
      if( !category ) return;

      this._categoriesService.update(category.id!.toString(), category).subscribe({
        next: response => {
          const categoryUpdated = response.data; 
          const idx:number = this.categories.findIndex( p => p.id === categoryUpdated.id);
          this.categories[idx] = categoryUpdated;
          this.categories = [...this.categories];
          // this._toastService.info('Proyecto editado', `Se editó <b>${userUpdated.name}</b> correctamente`);
        },
        // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
      });
    });
  }

}
