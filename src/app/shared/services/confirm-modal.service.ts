import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent, ConfirmModalData } from '../components/confirm-modal/confirm-modal.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {
  
  public matIcon: string = '';

  public buttonText: string = 'text default';

  public matButtonColor: string = 'primary';

  constructor(public dialog: MatDialog) {}

  openModal(content:ConfirmModalData) {
    return new Observable<boolean>( observer  => {
      const dialogRef = this.dialog.open(ConfirmModalComponent, {
        data: content
      });
  
      dialogRef.afterClosed().subscribe( isConfirm => {
        observer.next( isConfirm );
      });
    })
  }

}
