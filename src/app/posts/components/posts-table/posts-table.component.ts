import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss']
})
export class PostsTableComponent {

  @Input()
  public posts: Post[] = [];

  @Output()
  public onId: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDeleteById: EventEmitter<string> = new EventEmitter();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['title', 'user', 'categories', 'actions'];
  public dataSource = new MatTableDataSource<Post>;

  constructor() {
    this.dataSource = new MatTableDataSource(this.posts);
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource( this.posts );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    // ! === posts ===
    if( (changes as any).posts ) { 
      this.dataSource.data = this.posts;
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
