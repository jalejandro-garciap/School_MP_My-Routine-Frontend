import { Component, EventEmitter, Output } from '@angular/core';
import { Line } from '../../interfaces/line.interface';
import { MatDialog } from '@angular/material/dialog';
import { LineModalFormComponent } from '../line-modal-form/line-modal-form.component';

@Component({
  selector: 'app-line-modal-button',
  templateUrl: './line-modal-button.component.html',
  styleUrls: ['./line-modal-button.component.scss']
})
export class LineModalButtonComponent {

  @Output()
  public onCreate: EventEmitter<Line> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openModal(): void {
    const dialogRef = this.dialog.open(LineModalFormComponent, {
      data: { id: '' } // this value is empty to it can be created
    });

    dialogRef.afterClosed().subscribe( line => {
      if( line) {
        this.onCreate.emit(line);
      } 
    });
  }

}
