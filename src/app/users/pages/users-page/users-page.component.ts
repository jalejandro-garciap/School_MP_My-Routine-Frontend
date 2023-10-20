import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';
import { ConfirmModalData } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { ConfirmModalService } from 'src/app/shared/services/confirm-modal.service';
import { UserModalFormComponent } from '../../components/user-modal-form/user-modal-form.component';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent {

  public users: User[] = [];

  constructor(
    private _confirmModalService: ConfirmModalService,
    private _usersService: UsersService,
    private _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers():void {
    this._usersService.getUsers().subscribe({
      next: response => {
        this.users = response.data;
      }
    })
  }

  onCreate(user: User):void {
    console.log('user parent', user);
    this._usersService.create( user ).subscribe({
      next: response => {
        const dbUser = response.data; 
        this.users.push(dbUser);
        this.users = [...this.users];
        // this._toastService.success('Proyecto creado', `Se creó <b>${dbUser.name}</b> correctamente`);
      },
      // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
    });
  }

  onDeleteById(id:string) {
    this._usersService.getById( id ).subscribe({
      next: response => {
        const dbUser = response.data;
        const message:ConfirmModalData = { body: `<< ${dbUser.firstName} >>` };
        this._confirmModalService.openModal(message).subscribe(accept => {
          if( !accept ) return;

          this._usersService.deleteById( id ).subscribe({
            next: userDeleted => {
              const idx: number = this.users.findIndex(m => m.id === dbUser.id);
              this.users.splice(idx, 1);
              this.users = [...this.users];
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

    dialogRef.afterClosed().subscribe( (user:User)  => {
      if( !user ) return;

      this._usersService.update(user.id!.toString(), user).subscribe({
        next: response => {
          const userUpdated = response.data; 
          const idx:number = this.users.findIndex( p => p.id === userUpdated.id);
          this.users[idx] = userUpdated;
          this.users = [...this.users];
          // this._toastService.info('Proyecto editado', `Se editó <b>${userUpdated.name}</b> correctamente`);
        },
        // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
      });
    });
  }

}
