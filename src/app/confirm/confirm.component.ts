import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartTotalInfo } from '../models/cartTotalInfo.model';
import { ProductAndQuantity } from '../models/productAndQuantity.model';
import { ProductInCart } from '../models/productInCart.model';
import { CustomerDataService } from '../services/customer-data.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  // notAvailableProducts: ProductAndQuantity[] = []
  isAllProductAvailable: boolean = true;
  productsInCart: ProductInCart[] = [];
  cartTotalInfo: CartTotalInfo = { cartCount: 0, cartTotalPrice: 0 }
  cartCount: number = 0
  orderData = {
    country: '',
    city: '',
    address: '',
    phone: '',
    paymentMethod: '',
  };


  constructor(private customerDataService: CustomerDataService,
    private orderService: OrderService,
    private router: Router) { }

  ngOnInit(): void {
    this.fetchAllProductsInCart();
    this.customerDataService.getCartTotalInfo();
    this.customerDataService.cartTotal.subscribe({
      next: (value) => {
        this.cartTotalInfo = {
          cartCount: value.cartCount,
          cartTotalPrice: value.cartTotalPrice
        }
      }
    });
    // this.orderService.orderData
    // if(this.orderService.orderData.phone == ''){
    //   this.router.navigate(['home/cart'])
    // }
    this.orderData = this.orderService.orderData;

  }

  fetchAllProductsInCart() {
    this.customerDataService.getProductInCart().subscribe({
      next: (productsInCart) => {
        this.productsInCart = productsInCart;
      },
    })
  }

  onConfirmButton() {
    if (this.productsInCart.length != 0) {
      this.checkProductsAvailability();
    }
  }

  checkProductsAvailability() {
    this.customerDataService.checkProductsAvailability().subscribe({
      next: (value) => {
        this.isAllProductAvailable = true;
        if (value.length == 0) {
          this.makeOrder();
        }
        else{
          this.isAllProductAvailable = false;
        }
      },
    })
  }

  makeOrder() {
    this.orderService.makeOrder().subscribe({
      next: (v) => {
        this.router.navigate([`home/profile`]);
      }
    })
  }
}
