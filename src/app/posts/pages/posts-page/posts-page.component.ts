import { Component } from '@angular/core';
import { ConfirmModalService } from 'src/app/shared/services/confirm-modal.service';
import { PostsService } from '../../services/posts.service';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '../../interfaces/post.interface';
import { ConfirmModalData } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { PostModalFormComponent } from '../../components/post-modal-form/post-modal-form.component';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent {

  public posts: Post[] = [];

  constructor(
    private _confirmModalService: ConfirmModalService,
    // private _toastService: ToastCustomService,
    private _postsService: PostsService,
    private _dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this._postsService.getPosts().subscribe({
      next:  reponse => {
        const dbPosts = reponse.data;
        this.posts = dbPosts;
      },
      // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
    });
  }

  onCreate(post: Post):void {
    this._postsService.create( post ).subscribe({
      next: response => {
        const dbPost = response.data; 
        this.posts.push(dbPost);
        this.posts = [...this.posts];
        // this._toastService.success('Proyecto creado', `Se creó <b>${dbUser.name}</b> correctamente`);
      },
      // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
    });
  }

  onDeleteById(id:string) {
    this._postsService.getById(id).subscribe({
      next: response => {
        const dbPost = response.data;
        const message:ConfirmModalData = { body: `<< ${dbPost.title} >>` };
        this._confirmModalService.openModal(message).subscribe(accept => {
          if( !accept ) return;

          this._postsService.deleteById(id).subscribe({
            next: postDeleted => {
              const idx: number = this.posts.findIndex(m => m.id === dbPost.id);
              this.posts.splice(idx, 1);
              this.posts = [...this.posts];
              // this._toastService.info('Proyecto eliminado', `Se eliminó <b>${dbProject.name}</b> correctamente`);
            },
            error: () => {
              //! This is temporaly
              const idx: number = this.posts.findIndex(m => m.id === dbPost.id);
              this.posts.splice(idx, 1);
              this.posts = [...this.posts];
            }
          });
        });
      },
      // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
    });
  }

  editById( id:string ):void {
    const dialogRef = this._dialog.open(PostModalFormComponent, {
      data: { id }
    });

    dialogRef.afterClosed().subscribe( (post:Post)  => {
      if( !post ) return;

      this._postsService.update(post.id!.toString(), post).subscribe({
        next: response => {
          const postUpdated = response.data; 
          const idx:number = this.posts.findIndex( p => p.id === postUpdated.id);
          this.posts[idx] = postUpdated;
          this.posts = [...this.posts];
          // this._toastService.info('Proyecto editado', `Se editó <b>${userUpdated.name}</b> correctamente`);
        },
        // error: (error:HttpErrorResponse) => {this._toastService.errorHandler(error)}
      });
    });
  }

}
