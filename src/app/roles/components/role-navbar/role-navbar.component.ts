import { Component, EventEmitter, Output } from '@angular/core';
import { Role } from '../../interfaces/role.interface';

@Component({
  selector: 'app-role-navbar',
  templateUrl: './role-navbar.component.html',
  styleUrls: ['./role-navbar.component.scss']
})
export class RoleNavbarComponent {

  public navbarTitle = 'ROLES';

  @Output()
  public onCreate: EventEmitter<Role> = new EventEmitter();

  onEmitte(role: Role) {
    this.onCreate.emit( role );
  }

}
