import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModalFormComponent } from '../user-modal-form/user-modal-form.component';

@Component({
  selector: 'app-user-modal-button',
  templateUrl: './user-modal-button.component.html',
  styleUrls: ['./user-modal-button.component.scss']
})
export class UserModalButtonComponent {

  @Output()
  public onCreate: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openModal(): void {
    const dialogRef = this.dialog.open(UserModalFormComponent, {
      data: { id: '' } // this value is empty to it can be created
    });

    dialogRef.afterClosed().subscribe( user => {
      if( user) {
        this.onCreate.emit(user);
      } 
    });
  }

}
