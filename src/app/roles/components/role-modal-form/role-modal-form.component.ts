import { Component, Inject } from '@angular/core';
import { Role } from '../../interfaces/role.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RolesService } from '../../services/roles.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Trim } from '../../../shared/utils/trim.class';

@Component({
  selector: 'app-role-modal-form',
  templateUrl: './role-modal-form.component.html',
  styleUrls: ['./role-modal-form.component.scss']
})
export class RoleModalFormComponent {

  public pageName: string = 'role';
  public roleId = '';

  public roles: Role[] = [];
  
  public myForm: FormGroup = this._fb.group({
    name        : [''],
    description : ['']
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RoleModalFormComponent>,
    private _rolesService: RolesService,
    // private _toastService: ToastsService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {    
    this.roleId = this.data.id;
    if( !!this.roleId ) {
      this._rolesService.getById( this.roleId ).subscribe({
        next: response => {
          const dbRole = response.data;
          const { id, ...role } = dbRole;
          this.myForm.patchValue( role );
        },
        error: (error: HttpErrorResponse) => {
          // this._toastService.error(error.error, error.message);
        }  
      });
    }
  }

  submit():void {
    if( this.myForm.invalid ) return;

    const newRole = {
      ...Trim.trimProperties( this.myForm.value ),
    };

    //* EDIT
    if( this.roleId && this.myForm.valid) {
      const updateRole = { ...newRole, id: this.roleId }
      this.dialogRef.close( updateRole );
      return;
    }

    //* CREATE
    this.dialogRef.close( newRole );
  }

  close(): void { this.dialogRef.close() }

  get buttonTitle(): string {
    return (this.roleId.length === 0)
      ? 'Crear'
      : 'Editar';
  }

  get modalIcon(): string {
    return ( this.roleId )
      ? 'edit'
      : 'settings_suggest';
  }

}
