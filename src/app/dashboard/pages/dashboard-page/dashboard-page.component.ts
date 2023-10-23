import { Component, OnInit } from '@angular/core';
import { ExerciseRecord } from 'src/app/users/interfaces/exercise-record.interface';
import { ExerciseRecordService } from 'src/app/users/services/exercise-record.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  public labels1: string[] = [];
  public data1: number[] = [];

  
  public labels2: string[] = [];
  public data2: number[] = [];

  constructor(
    private _exerciseRecord: ExerciseRecordService
  ) {
    
    this._exerciseRecord.getAll().subscribe({
      next: response => {
        
        const line1: number = response.data.filter( exerciseRecord => exerciseRecord.station === 'L1' ).length;
        const line2: number = response.data.filter( exerciseRecord => exerciseRecord.station === 'L2' ).length;
        const line3: number = response.data.filter( exerciseRecord => exerciseRecord.station === 'L3' ).length;

        const CHILDREN = response.data.filter( exercise => exercise.passenger.passengerType === 'CHILDREN' ).length;
        const STUDENTS = response.data.filter( exercise => exercise.passenger.passengerType === 'STUDENTS' ).length;
        const TEACHERS = response.data.filter( exercise => exercise.passenger.passengerType === 'TEACHERS' ).length;
        const DISABLED = response.data.filter( exercise => exercise.passenger.passengerType === 'DISABLED' ).length;
        const ELDERLY = response.data.filter( exercise => exercise.passenger.passengerType === 'ELDERLY' ).length;        

        this.labels2 = ['LINE 1', 'LINE 2', 'LINE 3'];
        this.data2 = [...[line1, line2, line3]];

        const sort = [CHILDREN, STUDENTS, TEACHERS, DISABLED, ELDERLY].sort(function(a, b) {
          return b - a;
        });


        const CHILDREN_VALUE = CHILDREN;
        const STUDENTS_VALUE = STUDENTS;
        const TEACHERS_VALUE = TEACHERS;
        const DISABLED_VALUE = DISABLED;
        const ELDERLY_VALUE = ELDERLY;


        const newLabels1: string[] = [];
        const top3 = sort.slice(0, 3);

        top3.forEach( top => {
          if(top === CHILDREN_VALUE) newLabels1.push('CHILDREN');
          if(top === STUDENTS_VALUE) newLabels1.push('STUDENTS');
          if(top === TEACHERS_VALUE) newLabels1.push('TEACHERS');
          if(top === DISABLED_VALUE) newLabels1.push('DISABLED');
          if(top === ELDERLY_VALUE) newLabels1.push('ELDERLY');
        });

        this.labels1 = [...newLabels1];
        this.data1 = [...top3];
      }
    });


    // this.data2 = [18, 30, 9];

  }
  ngOnInit(): void {

  }


}
