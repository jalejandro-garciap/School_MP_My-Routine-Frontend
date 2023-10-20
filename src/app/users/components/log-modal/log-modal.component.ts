import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExerciseRecordService } from '../../services/exercise-record.service';
import { ExerciseRecord, Passenger } from '../../interfaces/exercise-record.interface';
import { User } from '../../interfaces/user.interface';

interface ModalData {
  id:number;
}

@Component({
  selector: 'app-log-modal',
  templateUrl: './log-modal.component.html',
  styleUrls: ['./log-modal.component.scss']
})
export class LogModalComponent implements OnInit {

  public exerciseRecord!: ExerciseRecord;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private _exerciseRecordService: ExerciseRecordService,
    public dialogRef: MatDialogRef<LogModalComponent>   
  ) {}

  ngOnInit(): void {

    this._exerciseRecordService.getByUserId(this.data.id).subscribe({
      next: response => {
        console.log(response);

        if( !response.success ) {
          throw new Error(response.messsage);
        }
        this.exerciseRecord  = response.data[0];
      }
    });

  }

}
