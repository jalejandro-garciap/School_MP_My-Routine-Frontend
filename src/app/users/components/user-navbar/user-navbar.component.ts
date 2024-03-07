import { Component, EventEmitter, Output } from '@angular/core';
import { Passenger } from '../../interfaces/passenger.interface';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent {

  public navbarTitle = 'PASSENGERS';

  @Output()
  public onCreate: EventEmitter<Passenger> = new EventEmitter();

  onEmitte(passenger: Passenger) {
    this.onCreate.emit( passenger );
  }

}
