import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { CategoryChild } from '../models/categoryChild.model';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(numberOfRowsPerPage: number, pageProduct: number): Observable<Category[]> {
    return this.http.get<Category[]>(`https://localhost:7159/api/Category/${numberOfRowsPerPage}/${pageProduct}`);
  }

  getCategoriesCount(): Observable<number> {
    return this.http.get<number>('https://localhost:7159/api/category/count');
  }

  getCategoryById(id: string): Observable<Category> {
    console.log("Try getCategoryById ")
    return this.http.get<Category>(`https://localhost:7159/api/category/${id}`);
  }

  getCategoriesCanBeParent(): Observable<Category[]> {
    return this.http.get<Category[]>('https://localhost:7159/api/Category/canBeParent');
  }

  updateCategory(id: string, category: Category): Observable<string> {
    console.log("updateCategory", id, category);
    return this.http.put(`https://localhost:7159/api/category/${id}`,
      category,
      { responseType: 'text' }
    )
  }

  deleteCategory(id: string): Observable<string> {
    return this.http.delete<string>(`https://localhost:7159/api/category/${id}`);
  }

  createCategory(category: Category): Observable<any> {
    return this.http.post('https://localhost:7159/api/category',
      category,
      { responseType: 'text' }
    );
  }
}
