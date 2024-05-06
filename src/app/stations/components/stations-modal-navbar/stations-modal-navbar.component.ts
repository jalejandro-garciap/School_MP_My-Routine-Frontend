import { Component, EventEmitter, Output } from '@angular/core';
import { Station } from '../../interfaces/station.interface';

@Component({
  selector: 'app-stations-modal-navbar',
  templateUrl: './stations-modal-navbar.component.html',
  styleUrls: ['./stations-modal-navbar.component.scss']
})
export class StationsModalNavbarComponent {

  public navbarTitle = 'STATIONS';

  @Output()
  public onCreate: EventEmitter<Station> = new EventEmitter();

  onEmitte( station: Station ) {
    this.onCreate.emit( station );
  }

}
