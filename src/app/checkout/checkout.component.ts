import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartTotalInfo } from '../models/cartTotalInfo.model';
import { ProductInCart } from '../models/productInCart.model';
import { CustomerDataService } from '../services/customer-data.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('checkoutForm') checkoutForm: NgForm | undefined;
  paymentMethod = ["Cash on delivery", "Vodafone cash "];
  productsInCart: ProductInCart[] = [];
  cartTotalInfo: CartTotalInfo = { cartCount: 0, cartTotalPrice: 0 }
  formValues = {
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
    setTimeout(() => {
      this.checkoutForm?.form.patchValue({
        paymentMethod: this.paymentMethod[0],
      })
    });
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
  }

  onSubmit() {
    if (this.checkoutForm?.valid) {
      this.formValues = {
        country: this.checkoutForm.value.country,
        city: this.checkoutForm.value.city,
        address: this.checkoutForm.value.address,
        phone: this.checkoutForm.value.phone,
        paymentMethod: this.checkoutForm.value.paymentMethod,
      }
      this.orderService.orderData = this.formValues;
      this.router.navigate(['home/confirm']);
    }
    else {
      this.checkoutForm?.form.markAllAsTouched();
    }
  }

  fetchAllProductsInCart() {
    this.customerDataService.getProductInCart().subscribe({
      next: (productsInCart) => {
        this.productsInCart = productsInCart;
      },
    })
  }
}
