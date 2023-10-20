import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmModalData {
  title?:    string;
  body:     string;
}

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  public title: string = 'Estas seguro de eliminar el siguiente elemento?';
  public body:  string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmModalComponent,
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
  ) {
    if( data.title ) {
      this.title  = data.title;
    }
    this.body   = data.body;  
  }

  closeModal( isConfirm:boolean ) {
    this.dialogRef.close( isConfirm );
  }

}
