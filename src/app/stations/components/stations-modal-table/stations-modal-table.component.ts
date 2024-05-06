import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Station } from '../../interfaces/station.interface';

@Component({
  selector: 'app-stations-modal-table',
  templateUrl: './stations-modal-table.component.html',
  styleUrls: ['./stations-modal-table.component.scss']
})
export class StationsModalTableComponent {

  @Input()
  public stations: Station[] = [];

  @Output()
  public onId: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDeleteById: EventEmitter<string> = new EventEmitter();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['id', 'name', 'enable', 'actions'];
  public dataSource = new MatTableDataSource<Station>;

  constructor(
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.stations);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource( this.stations );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    // ! === stations ===
    if( (changes as any).stations ) { 
      this.dataSource.data = this.stations;
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
