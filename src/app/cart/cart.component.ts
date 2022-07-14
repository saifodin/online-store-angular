import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductAndQuantity } from '../models/productAndQuantity.model';
import { CustomerDataService } from '../services/customer-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  // notAvailableProducts: ProductAndQuantity[] = []
  // cartCount: number = 0

  constructor(private router: Router, private customerDataService: CustomerDataService) { }

  ngOnInit(): void {
    // this.customerDataService.cartTotal.subscribe({
    //   next: (value) => {
    //     this.cartCount = value.cartCount;
    //   }
    // });
  }

  // onCheckoutButton() {
  //   if(this.cartCount > 0){
  //     this.customerDataService.checkProductsAvailability().subscribe({
  //       next: (value) => {
  //         this.notAvailableProducts = value;
  //         if (value.length == 0) {
  //           this.router.navigate([`checkout`]);
  //         }
  //       },
  //     })
  //   }
  // }
}
