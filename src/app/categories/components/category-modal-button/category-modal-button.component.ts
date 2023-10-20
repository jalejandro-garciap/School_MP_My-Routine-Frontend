import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryModalFormComponent } from '../category-modal-form/category-modal-form.component';

@Component({
  selector: 'app-category-modal-button',
  templateUrl: './category-modal-button.component.html',
  styleUrls: ['./category-modal-button.component.scss']
})
export class CategoryModalButtonComponent {

  @Output()
  public onCreate: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openModal(): void {
    const dialogRef = this.dialog.open(CategoryModalFormComponent, {
      data: { id: '' } // this value is empty to it can be created
    });

    dialogRef.afterClosed().subscribe( category => {
      if( category) {
        this.onCreate.emit(category);
      } 
    });
  }

}
