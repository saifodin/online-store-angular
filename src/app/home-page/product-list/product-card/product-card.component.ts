import { Component, Input, OnInit } from '@angular/core';
import { CustomerDataService } from 'src/app/services/customer-data.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product: any;
  isProductUpdateLoading: boolean = false;

  constructor(private customerDataService: CustomerDataService) { }

  ngOnInit(): void {
  }

  onAddOneToCart(productId: string) {
    this.isProductUpdateLoading = true;
    this.customerDataService.addOneToCart(productId).subscribe({
      next: (res) => {
        this.customerDataService.getCartTotalInfo();
        console.log("onAddOneToCart request Success")
        this.isProductUpdateLoading = false;
        this.product.quantityInCart++;
      },
      error: (err) => {
        console.log("onAddOneToCart request Error")
        this.isProductUpdateLoading = false;
      }
    })
  }

  onRemoveOneFromCart(productId: string) {
    this.isProductUpdateLoading = true;
    this.customerDataService.removeOneFromCart(productId).subscribe({
      next: (res) => {
        this.customerDataService.getCartTotalInfo();
        this.isProductUpdateLoading = false;
        if (this.product.quantityInCart > 0)
          this.product.quantityInCart--;
      },
      error: (err) => {
        this.isProductUpdateLoading = false;
      }
    })
  }
}
