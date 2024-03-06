import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { History } from '../../interfaces/history.interface';

@Component({
  selector: 'app-histories-table',
  templateUrl: './histories-table.component.html',
  styleUrls: ['./histories-table.component.scss']
})
export class HistoriesTableComponent {

  @Input()
  public histories: History[] = [];

  @Output()
  public onId: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDeleteById: EventEmitter<string> = new EventEmitter();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['passenger', 'station', 'challengeCompleted', 'targetReps', 'repetitionsDone', 'exercise', 'date'];
  public dataSource = new MatTableDataSource<History>;

  constructor(
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.histories);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource( this.histories );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    // ! === passengers ===
    if( (changes as any).histories ) { 
      this.dataSource.data = this.histories;
    }
  }

  onEdit(id:string):void {
    this.onId.emit(id);
  }

  onDelete(id:string):void {
    if( !id ) return;
    this.onDeleteById.emit(id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  get hasDataTable() {
    return this.dataSource.data.length > 0;
  }

}
