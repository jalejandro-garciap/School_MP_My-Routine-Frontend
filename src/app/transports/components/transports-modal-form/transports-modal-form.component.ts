import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransportsService } from '../../services/transports.service';
import { Trim } from '../../../shared/utils/trim.class';
import { Transport } from '../../interfaces/transport.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transports-modal-form',
  templateUrl: './transports-modal-form.component.html',
  styleUrls: ['./transports-modal-form.component.scss']
})
export class TransportsModalFormComponent {

  public pageName: string = 'Transport';
  public transportId: string = '';

  public myForm: FormGroup = this._fb.group({
    name:         ['', Validators.required],
    description:  ['', Validators.required]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TransportsModalFormComponent>,
    private _transportsService: TransportsService,
    // private _toastService: ToastsService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {    
    this.transportId = this.data.id;
    if( !!this.transportId ) {
      this._transportsService.getById( this.transportId ).subscribe({
        next: response => {
          const dbTransport = response.data;
          const { id, ...transport }:Transport = dbTransport;
          this.myForm.patchValue({ ...transport });
        },
        error: (error: HttpErrorResponse) => {
          // this._toastService.error(error.error, error.message);
        }  
      });
    }
  }

  submit():void {
    if( this.myForm.invalid ) return;

    const newTransport = {
      ...Trim.trimProperties( this.myForm.value ),
    };

    //* EDIT
    if( this.transportId && this.myForm.valid) {
      const updateTransport = { ...newTransport, id: this.transportId }
      this.dialogRef.close( updateTransport );
      return;
    }

    //* CREATE
    this.dialogRef.close( newTransport );
  }

  close(): void { this.dialogRef.close() }

  get isEditing() {
    return !this.transportId;
  }

  get buttonTitle(): string {
    return (this.transportId.length === 0)
      ? 'Create'
      : 'Edit';
  }

  get modalIcon(): string {
    return ( this.transportId )
      ? 'edit'
      : 'settings_suggest';
  }

}
