import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {

  @Input()
  public users: User[] = [];

  @Output()
  public onId: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDeleteById: EventEmitter<string> = new EventEmitter();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['firstName', 'lastName', 'email', 'passengerType', 'log', 'actions'];
  public dataSource = new MatTableDataSource<User>;

  constructor() {
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource( this.users );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    // ! === users ===
    if( (changes as any).users ) { 
      this.dataSource.data = this.users;
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
