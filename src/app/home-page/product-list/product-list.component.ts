import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { ProductInCart } from 'src/app/models/productInCart.model';
import { CategoriesService } from 'src/app/services/categories.service';
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
  productsTemp: any[] = []
  productsSearch: Product[] = [];
  typingTimer: any;
  delayAfterStopTyping: number = 600;
  searchInputLoading: boolean = false;
  searchFinish: boolean = false;
  inputSearchValue: string = '';
  categories: Category[] = [];
  currentCategorySelected: string = ''

  constructor(private productsService: ProductsService,
    private customerDataService: CustomerDataService,
    private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.products = [];
    this.twoIfAllRequestsDone = 0;
    this.fetchAllProducts();
    this.fetchAllProductsInCart();
    this.fetchAllCategories();
  }

  fetchAllProducts() {
    this.products = [];
    this.isProductsLoading = true;
    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        this.loadedProducts = products;
        this.isProductsLoading = false;
        console.log("fetchAllProducts")
        this.twoIfAllRequestsDone++;
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
      console.log(this.products);
      this.productsTemp = this.products;
      this.isProductsLoading = false;
    }
  }

  fetchAllCategories() {
    this.categoriesService.GetCategoriesWhichHaveProduct().subscribe({
      next: (value) => {
        this.categories = value;
      }
    })
  }

  onSearchKeyUp(event: any) {
    this.searchFinish = false;
    if (event.target.value.trim() !== '') {
      this.searchInputLoading = true;
      clearTimeout(this.typingTimer);

      this.typingTimer = setTimeout(() => {
        this.fetchProductsByName(event.target.value)
      }, this.delayAfterStopTyping)
    }
    else {
      this.onCancelSearch();
    }
  }

  fetchProductsByName(name: string) {
    if (name.trim() !== '') {
      this.productsService.getProductsByName(name).subscribe({
        next: (products) => {
          this.searchInputLoading = false;
          this.productsSearch = products;
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
    else {
      this.onCancelSearch();
    }
  }

  onCancelSearch() {
    this.inputSearchValue = '';
    this.searchInputLoading = false;
    this.productsSearch = []
    this.products = this.productsTemp;
  }

  selectFromSearch(productId: string, name: string) {
    this.searchInputLoading = false;
    this.inputSearchValue = name;
    this.productsSearch = []
    var productAfterSearch = this.productsTemp.find(p => p.productID == productId)
    // this.productsTemp = this.products;
    this.products = [];
    this.products.push(productAfterSearch);
    this.searchFinish = true;
  }

  filterByCategory(categoryId: string) {
    this.currentCategorySelected = categoryId
    var productsCategory = this.productsTemp.filter(p => p.category.categoryID == categoryId)
    this.products = productsCategory;
  }
  
  filterByAllCategory() {
    this.currentCategorySelected = '';
    this.products = this.productsTemp;
  }
}
