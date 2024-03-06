import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Member } from '../../interfaces/member.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { LogModalComponent } from 'src/app/users/components/log-modal/log-modal.component';

@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html'
})
export class MembersTableComponent {

  @Input()
  public members: Member[] = [];

  @Output()
  public onId: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDeleteById: EventEmitter<string> = new EventEmitter();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['username', 'email', 'status', 'roles', 'actions'];
  public dataSource = new MatTableDataSource<Member>;

  constructor(
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.members);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource( this.members );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    // ! === members ===
    if( (changes as any).members ) { 
      this.dataSource.data = this.members;
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
