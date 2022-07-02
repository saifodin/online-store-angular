import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertService } from 'src/app/alert-confirm/alert-confirm.service';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  loadedProducts: Product[] = [];
  isProductsLoading: boolean = true;
  productsPage = { productPerPage: 10, pageNumber: 1 };

  constructor(private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.fetchParamsRouting();
  }

  fetchParamsRouting(): void {
    this.route.params.subscribe((params: Params) => {
      this.productsPage = {
        productPerPage: params['productPerPage'],
        pageNumber: params['pageNumber'],
      }
      this.onFetchProducts(this.productsPage);
    })
  }

  onFetchProducts(productPage: any) {
    this.isProductsLoading = true;
    console.log("FetchProducts")
    this.productsService.getProducts(productPage.productPerPage, productPage.pageNumber).subscribe(products => {
      this.loadedProducts = products;
      this.isProductsLoading = false;
    })
  }

  onEdit(productID: string) {
    this.router.navigate([`editProduct/${productID}`])
  }

  onDeleteButton(productID: string, productImgPath: string) {
    this.alertService.setShow(true);
    this.alertService.confirmAlertChange.subscribe(value => {
      if (value) {
        this.onDeleteProduct(productID, productImgPath)
      }
    })
  }

  onDeleteProduct(productID: string, productImgPath: string) {
    this.productsService.deleteProduct(productID).subscribe(data => {
      this.fetchParamsRouting();
      this.deleteImgWhenDeleteProduct(productImgPath)
      //need to re render pagination
    })
  }

  deleteImgWhenDeleteProduct(productImgPath: string) {
    var request = `https://localhost:7159/api/Product/image/${productImgPath.slice(17)}`
    this.http.delete(request, { responseType: 'text' }).subscribe({
      next: (event) => {
        // console.log(event);
        // console.log("delete img because not submit")
      },
      error: (err: HttpErrorResponse) => {
        // console.log("delete error");
      }
    });
  }
}
