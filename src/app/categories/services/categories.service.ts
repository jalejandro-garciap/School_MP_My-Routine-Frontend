import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/shared/interfaces/response.interface';
import { environment } from 'src/environments/environment.development';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private BASE_API:string = environment.BASE_API;
  private PATH_API:string = 'categories';

  constructor(private _http: HttpClient) { }

  getCategories() {
    return this._http.get<ApiResponse<Category[]>>(`${this.BASE_API}/${this.PATH_API}`);
  }

  getById(id:string) {
    return this._http.get<ApiResponse<Category>>(`${this.BASE_API}/${this.PATH_API}/${id}`);
  }

  create(category:Category) {
    return this._http.post<ApiResponse<Category>>(`${this.BASE_API}/${this.PATH_API}`, category);
  }  

  update(id:string, category:Category) {
    return this._http.put<ApiResponse<Category>>(`${this.BASE_API}/${this.PATH_API}/${id}`, category);
  }
  
  deleteById(id:string) {
    return this._http.delete<ApiResponse<Category>>(`${this.BASE_API}/${this.PATH_API}/${id}`);
  }

}
