import { Component } from '@angular/core';
import { Role } from '../../interfaces/role.interface';
import { ConfirmModalService } from 'src/app/shared/services/confirm-modal.service';
import { RolesService } from '../../services/roles.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalData } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { RoleModalFormComponent } from '../../components/role-modal-form/role-modal-form.component';

@Component({
  selector: 'app-roles-page',
  templateUrl: './roles-page.component.html',
  styleUrls: ['./roles-page.component.scss']
})
export class RolesPageComponent {

  public roles: Role[] = [];

  constructor(
    private _confirmModalService: ConfirmModalService,
    // private _toastService: ToastCustomService,
    private _rolesService: RolesService,
    private _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this._rolesService.getRoles().subscribe({
      next:  reponse => {
        const dbRoles = reponse.data;
        this.roles = dbRoles;
      },
      // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
    });
  }

  onCreate(role: Role):void {
    this._rolesService.create( role ).subscribe({
      next: response => {
        const dbRole = response.data; 
        this.roles.push(dbRole);
        this.roles = [...this.roles];
        // this._toastService.success('Proyecto creado', `Se creó <b>${dbUser.name}</b> correctamente`);
      },
      // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
    });
  }

  onDeleteById(id:string) {
    this._rolesService.getById( id ).subscribe({
      next: response => {
        const dbRole = response.data;
        const message:ConfirmModalData = { body: `<< ${dbRole.name} >>` };
        this._confirmModalService.openModal(message).subscribe(accept => {
          if( !accept ) return;

          this._rolesService.deleteById( id ).subscribe({
            next: roleDeleted => {
              const idx: number = this.roles.findIndex(m => m.id === dbRole.id);
              this.roles.splice(idx, 1);
              this.roles = [...this.roles];
              // this._toastService.info('Proyecto eliminado', `Se eliminó <b>${dbProject.name}</b> correctamente`);
            }
          });
        });
      },
      // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
    });
  }

  editById( id:string ):void {
    const dialogRef = this._dialog.open(RoleModalFormComponent, {
      data: { id }
    });

    dialogRef.afterClosed().subscribe( (role:Role)  => {
      if( !role ) return;

      this._rolesService.update(role.id!.toString(), role).subscribe({
        next: response => {
          const roleUpdated = response.data; 
          const idx:number = this.roles.findIndex( p => p.id === roleUpdated.id);
          this.roles[idx] = roleUpdated;
          this.roles = [...this.roles];
          // this._toastService.info('Proyecto editado', `Se editó <b>${userUpdated.name}</b> correctamente`);
        },
        // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
      });
    });
  }

}
