import { Component } from '@angular/core';
import { Role } from 'src/app/auth/interfaces/auth.interface';
import { Member } from '../../interfaces/member.interface';
import { ConfirmModalService } from 'src/app/shared/services/confirm-modal.service';
import { MembersService } from '../../services/members.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalData } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { MemberModalFormComponent } from '../../components/member-modal-form/member-modal-form.component';

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.scss']
})
export class MembersPageComponent {

  public members: Member[] = [];

  constructor(
    private _confirmModalService: ConfirmModalService,
    private _membersService: MembersService,
    private _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers():void {
    this._membersService.getMembers().subscribe({
      next: response => {
        this.members = response.data;
      }
    })
  }

  onCreate(member: Member):void {
    this._membersService.create( member ).subscribe({
      next: response => {
        const newMember = response.data; 
        this.members.push(newMember);
        this.members = [...this.members];
        // this._toastService.success('Proyecto creado', `Se creó <b>${dbUser.name}</b> correctamente`);
      },
      // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
    });
  }

  onDeleteById(id:string) {
    this._membersService.getById( id ).subscribe({
      next: response => {
        const dbMember = response.data;
        const message:ConfirmModalData = { body: `<< ${dbMember.username} >>` };
        this._confirmModalService.openModal(message).subscribe(accept => {
          if( !accept ) return;

          this._membersService.deleteById( id ).subscribe({
            next: memberDeleted => {
              const idx: number = this.members.findIndex(m => m.id === dbMember.id);
              this.members.splice(idx, 1);
              this.members = [...this.members];
              // this._toastService.info('Proyecto eliminado', `Se eliminó <b>${dbProject.name}</b> correctamente`);
            }
          });
        });
      },
      // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
    });
  }

  editById( id:string ):void {
    const dialogRef = this._dialog.open(MemberModalFormComponent, {
      data: { id }
    });

    dialogRef.afterClosed().subscribe( (member:Member)  => {
      if( !member ) return;

      this._membersService.update(member.id!.toString(), member).subscribe({
        next: response => {
          const memberUpdated = response.data; 
          const idx:number = this.members.findIndex( p => p.id === memberUpdated.id);
          this.members[idx] = memberUpdated;
          this.members = [...this.members];
          // this._toastService.info('Proyecto   editado', `Se editó <b>${userUpdated.name}</b> correctamente`);
        },
        // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
      });
    });
  }

}
