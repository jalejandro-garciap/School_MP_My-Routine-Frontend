import { Component } from '@angular/core';
import { History } from '../../interfaces/history.interface';
import { HistoriesService } from '../../services/histories.service';

@Component({
  selector: 'app-histories-page',
  templateUrl: './histories-page.component.html',
  styleUrls: ['./histories-page.component.scss']
})
export class HistoriesPageComponent {

  public histories: History[] = [];
  public isLoading:boolean    = false;

  constructor(
    private _historiesService: HistoriesService,
  ) {}

  ngOnInit(): void {
    this.loadHistories();
  }

  loadHistories():void {
    this.isLoading = true;
    this._historiesService.getHistories().subscribe({
      next: ({ data }) => {
        this.histories = data; 
        this.isLoading = false
      },
      error: () => this.isLoading = false
    })
  }
  

}
