import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user.interface';
import { Trim } from '../../../shared/utils/trim.class';


@Component({
  selector: 'app-user-modal-form',
  templateUrl: './user-modal-form.component.html',
  styleUrls: ['./user-modal-form.component.scss']
})
export class UserModalFormComponent {

  public pageName: string = 'usuario';
  public userId = '';

  public users: User[] = [];
  public passengerTypes: string[] = ['STUDENTS', 'TEACHERS', 'DISABLED', 'ELDERLY', 'CHILDREN'];
  
  public myForm: FormGroup = this._fb.group({
    firstName       : [''],
    lastName        : [''],
    email           : [''],
    passengerType   : ['']
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserModalFormComponent>,
    private _usersService: UsersService,
    // private _toastService: ToastsService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {    
    this.userId = this.data.id;
    if( !!this.userId ) {
      this._usersService.getById( this.userId ).subscribe({
        next: response => {
          const dbUser = response.data;
          const { id, ...user } = dbUser;
          this.myForm.patchValue({...user});
        },
        error: (error: HttpErrorResponse) => {
          // this._toastService.error(error.error, error.message);
        }  
      });
    }
  }

  submit():void {
    if( this.myForm.invalid ) return;

    const newUser = {
      ...Trim.trimProperties( this.myForm.value ),
    };

    //* EDIT
    if( this.userId && this.myForm.valid) {
      const updateUser = { ...newUser, id: this.userId }
      this.dialogRef.close( updateUser );
      return;
    }

    //* CREATE
    this.dialogRef.close( newUser );
  }

  close(): void { this.dialogRef.close() }

  get hasUserId():boolean {
    return this.userId.length <= 0;
  }

  get buttonTitle(): string {
    return (this.userId.length === 0)
      ? 'Crear'
      : 'Editar';
  }

  get modalIcon(): string {
    return ( this.userId )
      ? 'edit'
      : 'settings_suggest';
  }

}
