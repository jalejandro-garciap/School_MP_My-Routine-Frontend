import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { HistoriesService } from 'src/app/histories/services/histories.service';
import { History } from 'src/app/histories/interfaces/history.interface';

interface ModalData {
  id:number;
}

@Component({
  selector: 'app-log-modal',
  templateUrl: './log-modal.component.html',
  styleUrls: ['./log-modal.component.scss']
})
export class LogModalComponent implements OnInit {

  public exerciseRecord!: History;
  public isLoading:boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    private _historiesService: HistoriesService,
    public dialogRef: MatDialogRef<LogModalComponent>   
  ) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this._historiesService.historyByPassengerId(this.data.id).subscribe({
      next: response => {
        if( !response.success ) {
          throw new Error(response.messsage);
        }
        this.exerciseRecord  = response.data[0];
        this.isLoading = false;
      },
      error: () => {
        this.dialogRef.close();
      }
    });
  }

}
