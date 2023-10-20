import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent {

  @Input()
  public categories: Category[] = [];

  @Output()
  public onId: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDeleteById: EventEmitter<string> = new EventEmitter();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['name', 'description', 'actions'];
  public dataSource = new MatTableDataSource<Category>;

  constructor() {
    this.dataSource = new MatTableDataSource(this.categories);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource( this.categories );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    // ! === categories ===
    if( (changes as any).categories ) { 
      this.dataSource.data = this.categories;
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
