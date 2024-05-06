import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Station } from '../../interfaces/station.interface';
import { ConfirmModalService } from 'src/app/shared/services/confirm-modal.service';
import { StationsService } from '../../services/stations.service';
import { ConfirmModalData } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { StationsModalFormComponent } from '../../components/stations-modal-form/stations-modal-form.component';

@Component({
  selector: 'app-stations-page',
  templateUrl: './stations-page.component.html',
  styleUrls: ['./stations-page.component.scss']
})
export class StationsPageComponent {

  public stations: Station[] = [];

  constructor(
    private _confirmModalService: ConfirmModalService,
    private _stationsService: StationsService,
    private _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadStations();
  }

  loadStations():void {
    this._stationsService.getStations().subscribe({
      next: response => {
        this.stations = response.data;
      }
    })
  }

  onCreate(station: Station):void {
    this._stationsService.create( station ).subscribe({
      next: response => {
        const newStation = response.data; 
        this.stations.push(newStation);
        this.stations = [...this.stations];
        // this._toastService.success('Proyecto creado', `Se creó <b>${dbUser.name}</b> correctamente`);
      },
      // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
    });
  }

  onDeleteById(id:string) {
    this._stationsService.getById( id ).subscribe({
      next: response => {
        const dbStation = response.data;
        const message:ConfirmModalData = { body: `<< ${dbStation.name} >>` };
        this._confirmModalService.openModal(message).subscribe(accept => {
          if( !accept ) return;

          this._stationsService.deleteById( id ).subscribe({
            next: () => {
              const idx: number = this.stations.findIndex(m => m.id === dbStation.id);
              this.stations.splice(idx, 1);
              this.stations = [...this.stations];
              // this._toastService.info('Proyecto eliminado', `Se eliminó <b>${dbProject.name}</b> correctamente`);
            }
          });
        });
      },
      // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
    });
  }

  editById( id:string ):void {
    const dialogRef = this._dialog.open(StationsModalFormComponent, {
      data: { id }
    });

    dialogRef.afterClosed().subscribe( (station:Station)  => {
      if( !station ) return;

      this._stationsService.update( station ).subscribe({
        next: response => {
          const stationUpdated = response.data; 
          const idx:number = this.stations.findIndex( p => p.id === stationUpdated.id);
          this.stations[idx] = stationUpdated;
          this.stations = [...this.stations];
          // this._toastService.info('Proyecto   editado', `Se editó <b>${userUpdated.name}</b> correctamente`);
        },
        // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
      });
    });
  }

}
