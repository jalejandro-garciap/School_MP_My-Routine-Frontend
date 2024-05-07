import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input()
  public labels: string[] = [];

  @Input()
  public data: number[] = [];

  @Input()
  public chartType:string = 'pie';


  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Download', 'Sales', 'Mail Sales'], //* LABELS
    datasets: [
      {
        data: [300, 500, 100], //* DATA
      },
    ],
  };

  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DataLabelsPlugin];


  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    // ! === data ===
    if( (changes as any).data  || (changes as any).labels) { 
      this.data = this.data;
      this.labels = this.labels;
      this.ngOnInit();
    }

  }

  ngOnInit(): void {

    this.pieChartType = (this.chartType as ChartType);

    this.pieChartData = this.pieChartData = {
      labels: this.labels, //* LABELS
      datasets: [
        {
          data: this.data, //* DATA
        },
      ],
    };
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

}
