import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from '../../interfaces/category.interface';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.scss']
})
export class CategoryNavbarComponent {

  public navbarTitle = 'CATEGORIAS';

  @Output()
  public onCreate: EventEmitter<Category> = new EventEmitter();

  onEmitte(category: Category) {
    this.onCreate.emit( category );
  }

}
