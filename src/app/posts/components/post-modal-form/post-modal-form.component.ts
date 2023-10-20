import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { CategoriesService } from 'src/app/categories/services/categories.service';
import { Trim } from '../../../shared/utils/trim.class';
import { Category } from 'src/app/categories/interfaces/category.interface';
import { PostsService } from '../../services/posts.service';
import { User } from 'src/app/users/interfaces/user.interface';

@Component({
  selector: 'app-post-modal-form',
  templateUrl: './post-modal-form.component.html',
  styleUrls: ['./post-modal-form.component.scss']
})
export class PostModalFormComponent {

  public pageName: string = 'post';
  public postId = '';

  public categoriesArray: Category[] = [];
  
  public myForm: FormGroup = this._fb.group({
    title       : [''],
    caption     : [''],
    body        : [''],
    url         : [''],
    user        : [''],
    categories  : [[]]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PostModalFormComponent>,
    private _categoriesService: CategoriesService,
    private _postsService: PostsService,
    // private _toastService: ToastsService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {    
    this.loadCategories();

    this.postId = this.data.id;
    if( !!this.postId ) {
      this._postsService.getById( this.postId ).subscribe({
        next: response => {
          const dbPost = response.data;
          const { id, ...post } = dbPost;
          const postCategories = post.categories.map(c => c.id);
          this.myForm.patchValue({...post, categories: postCategories});
        },
        error: (error: HttpErrorResponse) => {
          // this._toastService.error(error.error, error.message);
        }  
      });
    }
  }

  submit():void {
    if( this.myForm.invalid ) return;
    
    const newPost = {
      ...Trim.trimProperties( this.myForm.value ),
    };

    const user = JSON.parse( localStorage.getItem('_user')! );
    newPost.user = user;

    const postCategories = [...this.categoriesArray.filter( (c, idx) => c.id === newPost.categories[idx] )];
    newPost.categories = postCategories;

    //* EDIT
    if( this.postId && this.myForm.valid) {
      const updatePost = { ...newPost, id: this.postId }
      this.dialogRef.close( updatePost );
      return;
    }

    //* CREATE
    this.dialogRef.close( newPost );
  }

  close(): void { this.dialogRef.close() }

  loadCategories():void {
    this._categoriesService.getCategories().subscribe({
      next: response => {
        this.categoriesArray = response.data;
      }
    });
  }

  get buttonTitle(): string {
    return (this.postId.length === 0)
      ? 'Crear'
      : 'Editar';
  }

  get modalIcon(): string {
    return ( this.postId )
      ? 'edit'
      : 'settings_suggest';
  }

}
