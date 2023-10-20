import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent {

  public navbarTitle = 'USUARIOS';

  @Output()
  public onCreate: EventEmitter<User> = new EventEmitter();

  onEmitte(user: User) {
    this.onCreate.emit( user );
  }

}
