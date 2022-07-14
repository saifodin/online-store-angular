import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { CategoryChild } from '../models/categoryChild.model';
import { Product } from '../models/product.model';
import { ProductWriteDTO } from '../models/productWriteDTO.model';
import { Vendor } from '../models/vendorChild.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-edit-admin',
  templateUrl: './product-edit-admin.component.html',
  styleUrls: ['./product-edit-admin.component.scss']
})
export class ProductEditAdminComponent implements OnInit {

  @ViewChild('form') productForm: NgForm | undefined;
  dbPath: string = '';
  componentName = 'edit';
  productId: string = '495ffc9c-88d0-4f0c-b5a7-fcda2c84c8e4';
  vendors: Vendor[] = [];
  isSubmit: boolean = false;
  categories: CategoryChild[] = [];
  originalProduct: Product = {
    productID: '',
    name: '',
    arabicName: '',
    description: '',
    price: 0,
    quantity: 0,
    imagePath: '',
    category: {
      categoryID: '',
      name: '',
    },
    vendor: {
      vendorID: '',
      name: '',
    }
  };
  updatedProduct: ProductWriteDTO = {
    productID: '',
    name: '',
    arabicName: '',
    description: '',
    price: 0,
    quantity: 0,
    categoryID: '',
    vendorID: '',
    imagePath: '',
  };
  formValues = {
    name: '',
    arabicName: '',
    description: '',
    quantity: 0,
    price: 0,
    vendor: '',
    category: '',
  }
  errorMessage: string = '';
  errorMessageOnImg: string = '';

  constructor(private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.fetchParamsForRouting();
  }

  onReset(): void {
    this.productForm?.setValue(
      this.formValues = {
        name: this.originalProduct.name,
        arabicName: this.originalProduct.arabicName,
        description: this.originalProduct.description,
        quantity: this.originalProduct.quantity,
        price: this.originalProduct.price,
        vendor: this.originalProduct.vendor.vendorID,
        category: this.originalProduct.category.categoryID,
      }
    );
  }

  fetchParamsForRouting() {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.componentName = data['componentType'];
    })

    this.activatedRoute.params.subscribe((params: Params) => {
      if (this.componentName == "edit") {
        this.productId = params['productId'];
        this.onFetchProductData(this.productId);
      }
      else {
        this.putDefaultValueForSelect();
      }

      this.onFetchAllVendors();
      this.onFetchAllCategories();
    })
  }

  onFetchProductData(productId: string) {
    this.productsService.getProductById(productId).subscribe(product => {
      this.originalProduct = product;
      console.log(this.originalProduct);
      this.onReset();
    })
  }

  onFetchAllVendors(): void {
    this.productsService.getAllVendors().subscribe(vendors => {
      this.vendors = vendors;
    })
  }

  onFetchAllCategories(): void {
    this.productsService.getLeafCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  uploadFinished(event: any) {
    console.log("event form upload component to product-from-component", event);
    this.dbPath = event.dbPath;
    console.log("this.dbPath form upload component to product-from-component", this.dbPath);
  }

  onSubmit() {
    console.log("last day this.dbPath",this.dbPath)
    if (this.productForm?.valid && !this.isAllDataSame() && this.dbPath !== null) {
      this.errorMessage = ''
      this.updatedProduct = {
        productID: this.productId,
        name: this.productForm.value.name,
        arabicName: this.productForm.value.arabicName,
        description: this.productForm.value.description,
        price: this.productForm.value.price,
        quantity: this.productForm.value.quantity,
        categoryID: this.productForm.value.category,
        vendorID: this.productForm.value.vendor,
        imagePath: this.dbPath,
      }
      if (this.componentName == "edit") {
        this.productsService.updateProduct(this.productId, this.updatedProduct).subscribe({
          next: (v) => {
            this.isSubmit = true;
            this.deleteOldImgWhenUpdate();
            console.log("Product Update Successfully")
            this.router.navigate(['admin/products/10/1'])
          },
          error: (e) => {
            console.log("Product Update Error")
          },
        })
      } else {
        this.productsService.createProduct(this.updatedProduct).subscribe({
          next: (v) => {
            this.isSubmit = true;
            console.log("Product Create Successfully")
            this.router.navigate(['admin/products/10/1'])
          },
          error: (e) => {
            console.log("Product Create Error")
          },
        });
      }
    }
    else {
      this.productForm?.form.markAllAsTouched();
      if (this.isAllDataSame()) {
        this.errorMessage = "You didn't change the data."
      }
      if(this.dbPath == null){
        this.errorMessageOnImg = "Upload Img is required"
      }
    }
  }

  isAllDataSame() {
    return (
      JSON.stringify(this.productForm?.value) === JSON.stringify(this.formValues) &&
      this.originalProduct.imagePath === this.dbPath
    );
  }

  putDefaultValueForSelect() {
    setTimeout(() => {
      this.productForm?.form.patchValue({
        vendor: "default",
        category: "default",
      })
    });
  }

  ngOnDestroy() {
    this.deleteTestImgWhenLeaveFormWithoutSave()
  }

  deleteOldImgWhenUpdate() {
    //* update img and submit => delete the old img and keep the updated one
    if (this.originalProduct.imagePath !== this.dbPath) {
      var request = `https://localhost:7159/api/Product/image/${this.originalProduct.imagePath.slice(17)}`
      this.http.delete(request, { responseType: 'text' }).subscribe({
        next: (event) => {
        },
        error: (err: HttpErrorResponse) => {
        }
      });
    }
  }

  deleteTestImgWhenLeaveFormWithoutSave() {
    //* update img but no submit => delete the updated img and keep the old one
    if (!this.isSubmit && this.dbPath !== null && this.originalProduct.imagePath !== this.dbPath) {
      var request = `https://localhost:7159/api/Product/image/${this.dbPath.slice(17)}`
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

}
