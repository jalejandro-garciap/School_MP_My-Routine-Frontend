import { Component, OnInit } from '@angular/core';

import { HistoriesService } from 'src/app/histories/services/histories.service';
import { ExerciseRecord } from 'src/app/users/interfaces/exercise-record.interface';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  public _labels1:  string[]  = [];
  public _data1:    number[]  = [];

  public _labels3:  string[]  = [];
  public _data3:    number[]  = [];

  public completedChallenges: ExerciseRecord[] = [];

  constructor(
    private _historiesService:HistoriesService    
  ) {}

  ngOnInit(): void {
    this.loadHistories();
  }

  loadHistories():void {
    this._historiesService.getHistories().subscribe({
      next: (response) => {

        const exerciseFilter = response.data.map( history => history.exercise);

        const exerciseFilterLabel = ['Squats', 'Push ups'];
        const squatsCount: number   = exerciseFilter.filter( exercise => exercise === 'Squats').length;
        const pushUpsCount: number  = exerciseFilter.filter( exercise => exercise === 'Push ups').length;
        this._labels3 = [...exerciseFilterLabel];
        this._data3   = [ squatsCount, pushUpsCount ];

        console.log({ exerciseFilter });
      }
    });
  }

  get labels1() {
    return this._labels1;
  }

  get data1() {
    return this._data1;
  }

  get labels2() {
    return ['Periferico Norte', 'Circunvalacion Country', 'CUCEI', 'Plaza Universidad', 'Patria', 'Zapopan Centro', 'Lazaro Cardenas'];
  }

  get data2() {
    return [1,3,11,1,1,2,1];
  }

  get labels3() {
    return this._labels3;
  }

  get data3() {
    return this._data3;
  }

}
