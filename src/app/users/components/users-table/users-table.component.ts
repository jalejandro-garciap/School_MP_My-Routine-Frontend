import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { LogModalComponent } from '../log-modal/log-modal.component';
import { Passenger } from '../../interfaces/passenger.interface';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent {

  @Input()
  public passengers: Passenger[] = [];

  @Output()
  public onId: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDeleteById: EventEmitter<string> = new EventEmitter();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['firstName', 'category', 'active', 'log', 'actions'];
  public dataSource = new MatTableDataSource<Passenger>;

  constructor(
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.passengers);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource( this.passengers );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    // ! === passengers ===
    if( (changes as any).passengers ) { 
      this.dataSource.data = this.passengers;
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

  openLogModal( id:number ): void {
    const dialogRef = this.dialog.open(LogModalComponent, {
      data: { id:id } // this value is empty to it can be created
    });
  }

  get hasDataTable() {
    return this.dataSource.data.length > 0;
  }

}
