import { Component, EventEmitter, Output } from '@angular/core';
import { Role } from 'src/app/auth/interfaces/auth.interface';
import { Member } from '../../interfaces/member.interface';

@Component({
  selector: 'app-member-navbar',
  templateUrl: './member-navbar.component.html',
  styleUrls: ['./member-navbar.component.scss']
})
export class MemberNavbarComponent {

  public navbarTitle = 'MEMBERS';

  @Output()
  public onCreate: EventEmitter<Member> = new EventEmitter();

  onEmitte(member: Member) {
    this.onCreate.emit( member );
  }

}
