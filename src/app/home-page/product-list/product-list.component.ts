import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductInCart } from 'src/app/models/productInCart.model';
import { CustomerDataService } from 'src/app/services/customer-data.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  loadedProducts: Product[] = [];
  twoIfAllRequestsDone: number = 0;
  productsInCart: ProductInCart[] = [];
  isProductsLoading: boolean = true;
  products: any[] = [];


  constructor(private productsService: ProductsService, private customerDataService: CustomerDataService) { }

  ngOnInit(): void {
    this.products = [];
    this.twoIfAllRequestsDone = 0;
    this.fetchAllProducts();
    this.fetchAllProductsInCart();
  }

  fetchAllProducts() {
    this.products = [];
    this.isProductsLoading = true;
    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        this.loadedProducts = products;
        this.isProductsLoading = false;
        console.log("fetchAllProducts")
        this.twoIfAllRequestsDone++
        this.createGeneralProductsAndInCart();
      }
    })
  }

  fetchAllProductsInCart() {
    this.products = [];
    this.isProductsLoading = true;
    this.customerDataService.getProductInCart().subscribe({
      next: (productsInCart) => {
        this.productsInCart = productsInCart;
        console.log("fetchAllProductsInCart")
        this.twoIfAllRequestsDone++
        this.createGeneralProductsAndInCart();
      },
    })
  }

  createGeneralProductsAndInCart() {
    if (this.twoIfAllRequestsDone == 2 && (this.loadedProducts.length > 0 || this.productsInCart.length > 0)) {
      console.log("createGeneralProductsAndInCart");
      for (let product of this.loadedProducts) {
        let clone = JSON.parse(JSON.stringify(product));
        clone.quantityInCart = 0;
        for (let inCart of this.productsInCart) {
          if (product.productID == inCart.productId) 
            clone.quantityInCart = inCart.quantity;
        }
        this.products.push(clone);
      }
      this.isProductsLoading = false;
    }
  }
}
