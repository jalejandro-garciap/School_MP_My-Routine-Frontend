import { Component, EventEmitter, Output } from '@angular/core';
import { Line } from '../../interfaces/line.interface';

@Component({
  selector: 'app-line-navbar',
  templateUrl: './line-navbar.component.html',
  styleUrls: ['./line-navbar.component.scss']
})
export class LineNavbarComponent {

  public navbarTitle = 'LINES';

  @Output()
  public onCreate: EventEmitter<Line> = new EventEmitter();

  onEmitte(line: Line) {
    this.onCreate.emit( line );
  }

}
