import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Subject, take } from 'rxjs';
import { CartTotalInfo } from '../models/cartTotalInfo.model';
import { ProductAndQuantity } from '../models/productAndQuantity.model';
import { ProductInCart } from '../models/productInCart.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  cartTotal = new Subject<CartTotalInfo>();


  constructor(private http: HttpClient, private authService: AuthService) { }

  getCustomerData() {
    return this.http.get('https://localhost:7159/api/Customer/data');
  }

  getProductInCart() {
    return this.http.get<ProductInCart[]>('https://localhost:7159/api/Cart');
  }

  addOneToCart(productId: string) {
    return this.http.post(`https://localhost:7159/api/Cart/addOne/${productId}`,
      null,
      { responseType: 'text' })
  }

  removeOneFromCart(productId: string) {
    return this.http.delete(`https://localhost:7159/api/Cart/removeOne/${productId}`,
      { responseType: 'text' }
    )
  }

  removeProductFromCart(productId: string) {
    return this.http.delete(`https://localhost:7159/api/Cart/deleteProduct/${productId}`,
      { responseType: 'text' }
    )
  }

  getCartTotalInfo() {
    return this.http.get<CartTotalInfo>(`https://localhost:7159/api/Cart/totalInfo`).subscribe({
      next: (value) => {
        this.cartTotal.next(value);
      },
    })
  }

  checkProductsAvailability() {
    return this.http.get<ProductAndQuantity[]>(`https://localhost:7159/api/Cart/checkAvailability`)
  }

}
