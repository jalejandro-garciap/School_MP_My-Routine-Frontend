import { Component, EventEmitter, Output } from '@angular/core';
import { Station } from '../../interfaces/station.interface';
import { MatDialog } from '@angular/material/dialog';
import { StationsModalFormComponent } from '../stations-modal-form/stations-modal-form.component';

@Component({
  selector: 'app-stations-modal-button',
  templateUrl: './stations-modal-button.component.html',
  styleUrls: ['./stations-modal-button.component.scss']
})
export class StationsModalButtonComponent {

  @Output()
  public onCreate: EventEmitter<Station> = new EventEmitter();

  constructor( public dialog: MatDialog ) {}

  openModal(): void {
    const dialogRef = this.dialog.open(StationsModalFormComponent, {
      data: { id: '' } // this value is empty to it can be created
    });

    dialogRef.afterClosed().subscribe( station => {
      if( station) {
        this.onCreate.emit(station);
      } 
    });
  }

}
