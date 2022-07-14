import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartTotalInfo } from '../models/cartTotalInfo.model';
import { AuthService } from '../services/auth.service';
import { CustomerDataService } from '../services/customer-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private customerSubs: Subscription | undefined;
  cartTotalInfo: CartTotalInfo = { cartCount: 0, cartTotalPrice: 0 }

  constructor(private AuthService: AuthService,
    private customerDataService: CustomerDataService,
    private router: Router) { }

  ngOnInit(): void {
    // this.customerSubs = this.AuthService.customer.subscribe(customer => {
    //   this.isAuthenticated = !!customer;
    // });

    // if(!this.isAuthenticated)
    //   this.router.navigate(['auth']);

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

  ngOnDestroy(): void {
    // this.customerSubs?.unsubscribe();
  }

  onTestAuth() {
    this.customerDataService.getCustomerData().subscribe({
      next: (value) => {
        console.log(value);
        console.log("getCustomerData Success", value)
      },
      error: (err) => {
        console.log("getCustomerData Error", err)
        console.log(err)
      }
    })
  }

  onNavigateToCart(){
    this.router.navigate([`home/cart`]);
  }

}
