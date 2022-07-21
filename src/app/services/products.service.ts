import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CategoryChild } from '../models/categoryChild.model';
import { Product } from '../models/product.model';
import { ProductWriteDTO } from '../models/productWriteDTO.model';
import { Vendor } from '../models/vendorChild.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`https://localhost:7159/api/Product`);
  }

  getProductsByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`https://localhost:7159/api/Product/getByName/${name}`);
  }

  getProducts(numberOfRowsPerPage: number, pageProduct: number): Observable<Product[]> {
    return this.http.get<Product[]>(`https://localhost:7159/api/Product/${numberOfRowsPerPage}/${pageProduct}`);
  }

  getProductsCount(): Observable<number> {
    return this.http.get<number>('https://localhost:7159/api/Product/count');
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`https://localhost:7159/api/Product/${id}`);
  }

  getAllVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>('https://localhost:7159/api/Vendor');
  }

  getLeafCategories(): Observable<CategoryChild[]> {
    return this.http.get<CategoryChild[]>('https://localhost:7159/api/Category/leaves');
  }

  updateProduct(id: string, product: ProductWriteDTO): Observable<string> {
    return this.http.put(`https://localhost:7159/api/Product/${id}`,
      product,
      { responseType: 'text' }
    )
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`https://localhost:7159/api/Product/${id}`,
      { responseType: 'text' }
    );
  }

  createProduct(product: ProductWriteDTO): Observable<any> {
    return this.http.post('https://localhost:7159/api/Product',
      product,
      { responseType: 'text' }
    );
  }
}

