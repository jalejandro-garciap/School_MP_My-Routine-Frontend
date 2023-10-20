import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoleModalFormComponent } from '../role-modal-form/role-modal-form.component';

@Component({
  selector: 'app-role-modal-button',
  templateUrl: './role-modal-button.component.html',
  styleUrls: ['./role-modal-button.component.scss']
})
export class RoleModalButtonComponent {
  
  @Output()
  public onCreate: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openModal(): void {
    const dialogRef = this.dialog.open(RoleModalFormComponent, {
      data: { id: '' } // this value is empty to it can be created
    });

    dialogRef.afterClosed().subscribe( role => {
      if( role) {
        this.onCreate.emit(role);
      } 
    });
  }

}
