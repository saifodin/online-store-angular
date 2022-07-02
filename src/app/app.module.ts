import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsViewAdminComponent } from './products-view-admin/products-view-admin.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ProductEditAdminComponent } from './product-edit-admin/product-edit-admin.component';
import { FormsModule } from '@angular/forms';
import { ProductsListComponent } from './products-view-admin/products-list/products-list.component';
import { AlertConfirmComponent } from './alert-confirm/alert-confirm.component';
import { CategoryViewAdminComponent } from './category-view-admin/category-view-admin.component';
import { CategoryFormAdminComponent } from './category-form-admin/category-form-admin.component';
import { CategoriesListComponent } from './category-view-admin/categories-list/categories-list.component';
import { UploadImageComponent } from './product-edit-admin/upload-image/upload-image.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsViewAdminComponent,
    PaginationComponent,
    ProductEditAdminComponent,
    ProductsListComponent,
    AlertConfirmComponent,
    CategoryViewAdminComponent,
    CategoryFormAdminComponent,
    CategoriesListComponent,
    UploadImageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
