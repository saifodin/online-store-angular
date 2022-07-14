import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartTotalInfo } from 'src/app/models/cartTotalInfo.model';
import { ProductAndQuantity } from 'src/app/models/productAndQuantity.model';
import { ProductInCart } from 'src/app/models/productInCart.model';
import { CustomerDataService } from 'src/app/services/customer-data.service';

@Component({
  selector: 'app-product-cart-list',
  templateUrl: './product-cart-list.component.html',
  styleUrls: ['./product-cart-list.component.scss']
})
export class ProductCartListComponent implements OnInit {
  notAvailableProducts: ProductAndQuantity[] = []
  cartCount: number = 0
  productsInCart: ProductInCart[] = []
  isProductsInCartLoading: boolean = false;
  cartTotalInfo: CartTotalInfo = { cartCount: 0, cartTotalPrice: 0 }


  constructor(private customerDataService: CustomerDataService, private router: Router) { }

  ngOnInit(): void {
    this.fetchAllProductsInCart();
    this.customerDataService.cartTotal.subscribe({
      next: (value) => {
        this.cartCount = value.cartCount;
      }
    });

    this.customerDataService.getCartTotalInfo();
    this.customerDataService.cartTotal.subscribe({
      next: (value) => {
        this.cartTotalInfo = {
          cartCount: value.cartCount,
          cartTotalPrice: value.cartTotalPrice
        }
      }
    });
  }

  fetchAllProductsInCart() {
    this.isProductsInCartLoading = true;
    this.customerDataService.getProductInCart().subscribe({
      next: (productsInCart) => {
        this.productsInCart = productsInCart;
        this.isProductsInCartLoading = false;
      },
    })
  }

  onCheckoutButton() {
    if(this.cartCount > 0){
      this.customerDataService.checkProductsAvailability().subscribe({
        next: (value) => {
          this.notAvailableProducts = value;
          if (value.length == 0) {
            this.router.navigate([`home/checkout`]);
          }
        },
      })
    }
  }

  
}
