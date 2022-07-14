import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CartTotalInfo } from 'src/app/models/cartTotalInfo.model';
import { ProductAndQuantity } from 'src/app/models/productAndQuantity.model';
import { ProductInCart } from 'src/app/models/productInCart.model';
import { CustomerDataService } from 'src/app/services/customer-data.service';

@Component({
  selector: 'app-product-confirm',
  templateUrl: './product-confirm.component.html',
  styleUrls: ['../confirm.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductConfirmComponent implements OnInit, OnChanges {
  @Input() isAllProductAvailable: boolean = true;
  @Input() product: ProductInCart | null = null;
  cartTotalInfo: CartTotalInfo = { cartCount: 0, cartTotalPrice: 0 }
  onlyAvailableInStock: number | null = null;

  constructor(private customerDataService: CustomerDataService) { }

  ngOnChanges(changes: SimpleChanges): void {
    // const { isAllProductAvailable } = changes
    // if (isAllProductAvailable) {
    //   this.onlyAvailableInStock = null;
    //   console.log(changes)
    //   for (let notAvailableProduct of this.notAvailableProducts) {
    //     if (this.product?.productId == notAvailableProduct.productId) {
    //       this.onlyAvailableInStock = notAvailableProduct.quantity
    //     }
    //   }
    // }
  }

  ngOnInit(): void {
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


}
