import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MemberModalFormComponent } from '../member-modal-form/member-modal-form.component';
import { Member } from '../../interfaces/member.interface';

@Component({
  selector: 'app-member-modal-button',
  templateUrl: './member-modal-button.component.html',
  styleUrls: ['./member-modal-button.component.scss']
})
export class MemberModalButtonComponent {

  @Output()
  public onCreate: EventEmitter<Member> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openModal(): void {
    const dialogRef = this.dialog.open(MemberModalFormComponent, {
      data: { id: '' } // this value is empty to it can be created
    });

    dialogRef.afterClosed().subscribe( member => {
      if( member) {
        this.onCreate.emit(member);
      } 
    });
  }

}
