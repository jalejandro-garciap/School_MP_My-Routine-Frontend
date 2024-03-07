import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Transport } from '../../interfaces/transport.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-transports-modal-table',
  templateUrl: './transports-modal-table.component.html'
})
export class TransportsModalTableComponent {

  @Input()
  public transports: Transport[] = [];

  @Output()
  public onId: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDeleteById: EventEmitter<string> = new EventEmitter();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  public dataSource = new MatTableDataSource<Transport>;

  constructor(
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.transports);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource( this.transports );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    // ! === transport ===
    if( (changes as any).transports ) { 
      this.dataSource.data = this.transports;
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
