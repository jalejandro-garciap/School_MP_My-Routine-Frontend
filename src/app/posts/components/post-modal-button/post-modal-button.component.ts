import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostModalFormComponent } from '../post-modal-form/post-modal-form.component';

@Component({
  selector: 'app-post-modal-button',
  templateUrl: './post-modal-button.component.html',
  styleUrls: ['./post-modal-button.component.scss']
})
export class PostModalButtonComponent {

  @Output()
  public onCreate: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openModal(): void {
    const dialogRef = this.dialog.open(PostModalFormComponent, {
      data: { id: '' } // this value is empty to it can be created
    });

    dialogRef.afterClosed().subscribe( post => {
      if( post) {
        this.onCreate.emit(post);
      } 
    });
  }

}
