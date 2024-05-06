import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { Station } from '../../interfaces/station.interface';
import { StationsService } from '../../services/stations.service';
import { Trim } from '../../../shared/utils/trim.class';
import { LinesService } from 'src/app/lines/services/lines.service';
import { Line } from 'src/app/lines/interfaces/line.interface';

@Component({
  selector: 'app-stations-modal-form',
  templateUrl: './stations-modal-form.component.html',
  styleUrls: ['./stations-modal-form.component.scss']
})
export class StationsModalFormComponent {

  public lines: Line[]    = [];
  public pageName: string = 'Station';
  public stationId: string = '';

  public myForm: FormGroup = this._fb.group({
    name:       ['', Validators.required],
    enable:     ['', Validators.required],
    line:       [{}, Validators.required]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<StationsModalFormComponent>,
    private _stationsService: StationsService,
    private _linesService: LinesService,
    // private _toastService: ToastsService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {    
    this.loadLines();

    this.stationId = this.data.id;
    if( !!this.stationId ) {
      this._stationsService.getById( this.stationId ).subscribe({
        next: response => {
          const dbStation = response.data;
          const { id, ...station }:Station = dbStation;
          this.myForm.patchValue({ ...station, line: station.line.id });
          // this.myForm.patchValue({ ...line, transport: line.transport.id });
        },
        error: (error: HttpErrorResponse) => {
          // this._toastService.error(error.error, error.message);
        }  
      });
    }
  }

  loadLines():void {
    this._linesService.getLines().subscribe({
      next: (response) => {
        this.lines = response.data;
      } 
    })
  }

  submit():void {

    if( this.myForm.invalid ) return;
    
    const station = {
      ...Trim.trimProperties( this.myForm.value ),
    };

    const line:Line | undefined = this.lines.find( line => line.id === +station.line );

    if( !line ) return;

    const newLine = {
      ...station,
      line 
    };

    //* EDIT
    if( this.stationId && this.myForm.valid) {
      const updateStation = { ...newLine, id: this.stationId }
      this.dialogRef.close( updateStation );
      return;
    }

    //* CREATE
    this.dialogRef.close( newLine );
  }

  close(): void { this.dialogRef.close() }

  get isEditing() {
    return !this.stationId;
  }

  get buttonTitle(): string {
    return (this.stationId.length === 0)
      ? 'Create'
      : 'Edit';
  }

  get modalIcon(): string {
    return ( this.stationId )
      ? 'edit'
      : 'settings_suggest';
  }

}
