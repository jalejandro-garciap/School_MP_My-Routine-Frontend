import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Transport } from 'src/app/transports/interfaces/transport.interface';
import { TransportsService } from 'src/app/transports/services/transports.service';
import { LinesService } from '../../services/lines.service';
import { Line } from '../../interfaces/line.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Trim } from '../../../shared/utils/trim.class';

@Component({
  selector: 'app-line-modal-form',
  templateUrl: './line-modal-form.component.html',
  styleUrls: ['./line-modal-form.component.scss']
})
export class LineModalFormComponent {

  public transports: Transport[]    = [];
  public pageName: string = 'Line';
  public lineId: string = '';

  public myForm: FormGroup = this._fb.group({
    name:          ['', Validators.required],
    enable:        ['', Validators.required],
    transport:     [{}, Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<LineModalFormComponent>,
    private _linesService: LinesService,
    private _transportsService: TransportsService,
    // private _toastService: ToastsService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {    
    this.loadTransports();

    this.lineId = this.data.id;
    if( !!this.lineId ) {
      this._linesService.getById( this.lineId ).subscribe({
        next: response => {
          const dbLine = response.data;
          const { id, ...line }:Line = dbLine;
          this.myForm.patchValue({ ...line, transport: line.transport.id });
          // Default value to let it edit it
          // this.myForm.patchValue({
          //   password: 'x',
          //   confirmPassword: 'x'
          // });
        },
        error: (error: HttpErrorResponse) => {
          // this._toastService.error(error.error, error.message);
        }  
      });
    }
  }

  submit():void {
    if( this.myForm.invalid ) return;


    
    const line = {
      ...Trim.trimProperties( this.myForm.value ),
    };
    
    const transport:Transport | undefined = this.transports.find( transport => transport.id === +line.transport );

    if( !transport ) return;

    const newLine = {
      ...line,
      transport 
    };

    //* EDIT
    if( this.lineId && this.myForm.valid) {
      const updateLine = { ...newLine, id: this.lineId }
      this.dialogRef.close( updateLine );
      return;
    }

    //* CREATE
    this.dialogRef.close( newLine );
  }

  close(): void { this.dialogRef.close() }

  loadTransports():void {
    this._transportsService.getTransports().subscribe({
      next: (response) => {
        this.transports = response.data;
      } 
    })
  }

  get isEditing() {
    return !this.lineId;
  }

  get buttonTitle(): string {
    return (this.lineId.length === 0)
      ? 'Create'
      : 'Edit';
  }

  get modalIcon(): string {
    return ( this.lineId )
      ? 'edit'
      : 'settings_suggest';
  }

}
