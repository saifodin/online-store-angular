import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ProductAndQuantity } from 'src/app/models/productAndQuantity.model';
import { ProductInCart } from 'src/app/models/productInCart.model';
import { CustomerDataService } from 'src/app/services/customer-data.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['../product-cart-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductCartComponent implements OnInit, OnChanges {
  @Input() notAvailableProducts: ProductAndQuantity[] = []
  @Input() product: ProductInCart | null = null
  isProductUpdateLoading: boolean = false;
  onlyAvailableInStock: number | null = null;

  constructor(private customerDataService: CustomerDataService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { notAvailableProducts } = changes;
    if (notAvailableProducts) {
      this.onlyAvailableInStock = null;
      for (let notAvailableProduct of this.notAvailableProducts) {
        if (this.product?.productId == notAvailableProduct.productId) {
          this.onlyAvailableInStock = notAvailableProduct.quantity
        }
      }
    }
  }

  ngOnInit(): void {
  }

  onAddOneToCart(productId: string) {
    this.customerDataService.addOneToCart(productId).subscribe({
      next: (res) => {
        this.customerDataService.getCartTotalInfo();
        console.log("onAddOneToCart request Success");
        this.isProductUpdateLoading = false;
        if (this.product?.quantity) this.product.quantity++;
      },
      error: (err) => {
        console.log("onAddOneToCart request Error")
        this.isProductUpdateLoading = false;
      }
    })
  }

  onRemoveOneFromCart(productId: string) {
    this.isProductUpdateLoading = true;
    if (this.product?.quantity && this.product?.quantity > 1) {
      this.customerDataService.removeOneFromCart(productId).subscribe({
        next: (res) => {
          this.customerDataService.getCartTotalInfo();
          this.isProductUpdateLoading = false;
          if (this.product?.quantity) this.product.quantity--;
        },
        error: (err) => {
          this.isProductUpdateLoading = false;
        }
      })
    }
    else
      this.isProductUpdateLoading = false;
  }

  onRemoveProductFromCart(productId: string) {
    this.isProductUpdateLoading = true;
    this.customerDataService.removeProductFromCart(productId).subscribe({
      next: (value) => {
        this.customerDataService.getCartTotalInfo();
        this.isProductUpdateLoading = false;
        this.product = null;
        console.log(value);
      }
    })
  }

}
