import { Component, Output, EventEmitter } from '@angular/core';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-post-navbar',
  templateUrl: './post-navbar.component.html',
  styleUrls: ['./post-navbar.component.scss']
})
export class PostNavbarComponent {

  public navbarTitle = 'POSTS';

  @Output()
  public onCreate: EventEmitter<Post> = new EventEmitter();

  onEmitte(post: Post) {
    this.onCreate.emit( post );
  }

}
