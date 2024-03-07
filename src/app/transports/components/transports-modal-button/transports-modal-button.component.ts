import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Transport } from '../../interfaces/transport.interface';
import { TransportsModalFormComponent } from '../transports-modal-form/transports-modal-form.component';

@Component({
  selector: 'app-transports-modal-button',
  templateUrl: './transports-modal-button.component.html',
  styleUrls: ['./transports-modal-button.component.scss']
})
export class TransportsModalButtonComponent {

  @Output()
  public onCreate: EventEmitter<Transport> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openModal(): void {
    const dialogRef = this.dialog.open(TransportsModalFormComponent, {
      data: { id: '' } // this value is empty to it can be created
    });

    dialogRef.afterClosed().subscribe( transport => {
      if( transport) {
        this.onCreate.emit(transport);
      } 
    });
  }


}
