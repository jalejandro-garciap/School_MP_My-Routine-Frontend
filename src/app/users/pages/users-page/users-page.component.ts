import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmModalData } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { ConfirmModalService } from 'src/app/shared/services/confirm-modal.service';
import { UserModalFormComponent } from '../../components/user-modal-form/user-modal-form.component';
import { PassengersService } from '../../services/passengers.service';
import { Passenger } from '../../interfaces/passenger.interface';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent {

  public passengers: Passenger[] = [];

  constructor(
    private _confirmModalService: ConfirmModalService,
    private _passengersService: PassengersService,
    private _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadPassengers();
  }

  loadPassengers():void {
    this._passengersService.getPassengers().subscribe({
      next: response => {
        this.passengers = response.data;
      }
    })
  }

  onCreate(passenger: Passenger):void {
    this._passengersService.create( passenger ).subscribe({
      next: response => {
        const dbUser = response.data; 
        this.passengers.push(dbUser);
        this.passengers = [...this.passengers];
        // this._toastService.success('Proyecto creado', `Se creó <b>${dbUser.name}</b> correctamente`);
      },
      // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
    });
  }

  onDeleteById(id:string) {
    this._passengersService.getById( id ).subscribe({
      next: response => {
        const dbUser = response.data;
        const message:ConfirmModalData = { body: `<< ${dbUser.firstName} >>` };
        this._confirmModalService.openModal(message).subscribe(accept => {
          if( !accept ) return;

          this._passengersService.deleteById( id ).subscribe({
            next: userDeleted => {
              const idx: number = this.passengers.findIndex(m => m.id === dbUser.id);
              this.passengers.splice(idx, 1);
              this.passengers = [...this.passengers];
              // this._toastService.info('Proyecto eliminado', `Se eliminó <b>${dbProject.name}</b> correctamente`);
            }
          });
        });
      },
      // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
    });
  }

  editById( id:string ):void {
    const dialogRef = this._dialog.open(UserModalFormComponent, {
      data: { id }
    });

    dialogRef.afterClosed().subscribe( (passenger:Passenger)  => {
      if( !passenger ) return;

      this._passengersService.update(passenger.id!.toString(), passenger).subscribe({
        next: response => {
          const userUpdated = response.data; 
          const idx:number = this.passengers.findIndex( p => p.id === userUpdated.id);
          this.passengers[idx] = userUpdated;
          this.passengers = [...this.passengers];
          // this._toastService.info('Proyecto editado', `Se editó <b>${userUpdated.name}</b> correctamente`);
        },
        // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
      });
    });
  }

}
