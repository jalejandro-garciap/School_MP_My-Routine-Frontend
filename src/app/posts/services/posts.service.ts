import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/shared/interfaces/response.interface';
import { environment } from 'src/environments/environment.development';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private BASE_API:string = environment.BASE_API;
  private PATH_API:string = 'posts';

  constructor(private _http: HttpClient) { }

  getPosts() {
    return this._http.get<ApiResponse<Post[]>>(`${this.BASE_API}/${this.PATH_API}`);
  }

  getById(id:string) {
    return this._http.get<ApiResponse<Post>>(`${this.BASE_API}/${this.PATH_API}/${id}`);
  }

  create(post:Post) {
    return this._http.post<ApiResponse<Post>>(`${this.BASE_API}/${this.PATH_API}`, post);
  }  

  update(id:string, post:Post) {
    return this._http.put<ApiResponse<Post>>(`${this.BASE_API}/${this.PATH_API}/${id}`, post);
  }
  
  deleteById(id:string) {
    return this._http.delete<ApiResponse<Post>>(`${this.BASE_API}/${this.PATH_API}/${id}`);
  }  

}
