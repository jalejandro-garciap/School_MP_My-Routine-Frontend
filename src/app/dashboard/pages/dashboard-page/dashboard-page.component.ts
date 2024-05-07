import { Component, OnInit } from '@angular/core';

import { HistoriesService } from 'src/app/histories/services/histories.service';
import { ExerciseRecord } from 'src/app/users/interfaces/exercise-record.interface';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  public _categoryLabels:  string[]  = [];
  public _categoryData:    number[]  = [];

  public _stationLabels:  string[]  = [];
  public _stationData:    number[]  = [];

  public _exerciseLabels:  string[]  = [];
  public _exerciseData:    number[]  = [];

  constructor(
    private _historiesService:HistoriesService    
  ) {}

  ngOnInit(): void {
    this.loadHistories();
  }

  loadHistories():void {
    this._historiesService.getHistories().subscribe({
      next: (response) => {

        const categoryCount = response.data.reduce((acc, curr) => {
          const category = curr.passenger.category;
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});
        
        this._categoryLabels = Object.keys(categoryCount);
        this._categoryData = Object.values(categoryCount);


        const stationCount = response.data.reduce((acc, curr) => {
          const stationName = curr.station.name;
          acc[stationName] = (acc[stationName] || 0) + 1;
          return acc;
        }, {});
        
        this._stationLabels = Object.keys(stationCount);
        this._stationData = Object.values(stationCount);
        

        const exerciseData = response.data.reduce((acc, curr) => {
          const exerciseName = curr.exercise;
          acc[exerciseName] = (acc[exerciseName] || 0) + curr.repetitionsDone;
          return acc;
        }, {});
        
        this._exerciseLabels = Object.keys(exerciseData);
        this._exerciseData = Object.values(exerciseData);        
        
      }
    });
  }

  get categoryLabels() {
    return this._categoryLabels;
  }

  get categoryData() {
    return this._categoryData;
  }

  get stationLabels() {
    return this._stationLabels;
  }

  get stationData() {
    return this._stationData;
  }

  get exerciseLabels() {
    return this._exerciseLabels;
  }

  get exerciseData() {
    return this._exerciseData;
  }

}
