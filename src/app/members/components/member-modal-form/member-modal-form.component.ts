import { Component, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Trim } from '../../../shared/utils/trim.class';
import { MembersService } from '../../services/members.service';
import { Role } from 'src/app/auth/interfaces/auth.interface';
import { RolesService } from 'src/app/roles/services/roles.service';
import { Member } from '../../interfaces/member.interface';

interface MemberForm {
  username:       string;
  email:          string;
  password:       string;
  confirmPassword:string;
  role:           string;
}

@Component({
  selector: 'app-member-modal-form',
  templateUrl: './member-modal-form.component.html',
  styleUrls: ['./member-modal-form.component.scss']
})
export class MemberModalFormComponent {

  public roles: Role[]    = [];
  public pageName: string = 'Member';
  public memberId: string = '';

  public myForm: FormGroup = this._fb.group({
    username:         ['', Validators.required],
    email:            ['', Validators.required],
    password:         ['', Validators.required],
    confirmPassword:  ['', Validators.required],
    role:             ['', Validators.required]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MemberModalFormComponent>,
    private _membersService: MembersService,
    private _rolesService: RolesService,
    // private _toastService: ToastsService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {    
    this.loadRoles();

    this.memberId = this.data.id;
    if( !!this.memberId ) {
      this._membersService.getById( this.memberId ).subscribe({
        next: response => {
          const dbMember = response.data;
          const { id, ...member }:Member = dbMember;
          this.myForm.patchValue({ ...member, role: member.roles[0].id });
          // Default value to let it edit it
          this.myForm.patchValue({
            password: 'x',
            confirmPassword: 'x'
          });
        },
        error: (error: HttpErrorResponse) => {
          // this._toastService.error(error.error, error.message);
        }  
      });
    }
  }

  submit():void {
    if( this.myForm.invalid ) return;


    
    const { confirmPassword, ...member }:MemberForm = {
      ...Trim.trimProperties( this.myForm.value ),
    };
    
    const roles:Role[] = []; 
    const role:Role | undefined = this.roles.find( role => role.id === +member.role );

    if( !role ) return;
    roles.push( role );

    const newMember = {
      ...member,
      roles
    };

    //* EDIT
    if( this.memberId && this.myForm.valid) {
      const updateMember = { ...newMember, id: this.memberId }
      this.dialogRef.close( updateMember );
      return;
    }

    //* CREATE
    this.dialogRef.close( newMember );
  }

  close(): void { this.dialogRef.close() }

  loadRoles():void {
    this._rolesService.getRoles().subscribe({
      next: (response) => {
        this.roles = response.data;
      } 
    })
  }

  get isEditing() {
    return !this.memberId;
  }

  get hasMemberId():boolean {
    return this.memberId.length <= 0;
  }

  get buttonTitle(): string {
    return (this.memberId.length === 0)
      ? 'Create'
      : 'Edit';
  }

  get modalIcon(): string {
    return ( this.memberId )
      ? 'edit'
      : 'settings_suggest';
  }

}
