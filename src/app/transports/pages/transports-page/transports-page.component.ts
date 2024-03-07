import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalService } from 'src/app/shared/services/confirm-modal.service';
import { TransportsService } from '../../services/transports.service';
import { Transport } from '../../interfaces/transport.interface';
import { ConfirmModalData } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { TransportsModalFormComponent } from '../../components/transports-modal-form/transports-modal-form.component';

@Component({
  selector: 'app-transports-page',
  templateUrl: './transports-page.component.html',
  styleUrls: ['./transports-page.component.scss']
})
export class TransportsPageComponent {

  public transports: Transport[] = [];

  constructor(
    private _confirmModalService: ConfirmModalService,
    private _transportsService: TransportsService,
    private _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadTransports();
  }

  loadTransports():void {
    this._transportsService.getTransports().subscribe({
      next: response => {
        this.transports = response.data;
      }
    })
  }

  onCreate(transport: Transport):void {
    this._transportsService.create( transport ).subscribe({
      next: response => {
        const newMember = response.data; 
        this.transports.push(newMember);
        this.transports = [...this.transports];
        // this._toastService.success('Proyecto creado', `Se creó <b>${dbUser.name}</b> correctamente`);
      },
      // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
    });
  }

  onDeleteById(id:string) {
    this._transportsService.getById( id ).subscribe({
      next: response => {
        const dbMember = response.data;
        const message:ConfirmModalData = { body: `<< ${dbMember.name} >>` };
        this._confirmModalService.openModal(message).subscribe(accept => {
          if( !accept ) return;

          this._transportsService.deleteById( id ).subscribe({
            next: () => {
              const idx: number = this.transports.findIndex(m => m.id === dbMember.id);
              this.transports.splice(idx, 1);
              this.transports = [...this.transports];
              // this._toastService.info('Proyecto eliminado', `Se eliminó <b>${dbProject.name}</b> correctamente`);
            }
          });
        });
      },
      // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
    });
  }

  editById( id:string ):void {
    const dialogRef = this._dialog.open(TransportsModalFormComponent, {
      data: { id }
    });

    dialogRef.afterClosed().subscribe( (transport:Transport)  => {
      if( !transport ) return;

      this._transportsService.update(transport).subscribe({
        next: response => {
          const transportUpdated = response.data; 
          const idx:number = this.transports.findIndex( p => p.id === transportUpdated.id);
          this.transports[idx] = transportUpdated;
          this.transports = [...this.transports];
          // this._toastService.info('Proyecto   editado', `Se editó <b>${userUpdated.name}</b> correctamente`);
        },
        // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
      });
    });
  }

}
