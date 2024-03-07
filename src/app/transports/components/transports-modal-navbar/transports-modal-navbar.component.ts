import { Component, EventEmitter, Output } from '@angular/core';
import { Transport } from '../../interfaces/transport.interface';

@Component({
  selector: 'app-transports-modal-navbar',
  templateUrl: './transports-modal-navbar.component.html',
  styleUrls: ['./transports-modal-navbar.component.scss']
})
export class TransportsModalNavbarComponent {

  public navbarTitle = 'TRANSPORTS';

  @Output()
  public onCreate: EventEmitter<Transport> = new EventEmitter();

  onEmitte(transport: Transport) {
    this.onCreate.emit( transport );
  }

}
