import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
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
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomePageComponent } from './home-page/home-page.component';
import { InterceptorService } from './services/interceptor.service';
import { ProductListComponent } from './home-page/product-list/product-list.component';
import { ProductCardComponent } from './home-page/product-list/product-card/product-card.component';
import { CartComponent } from './cart/cart.component';
import { ProductCartListComponent } from './cart/product-cart-list/product-cart-list.component';
import { ProductCartComponent } from './cart/product-cart-list/product-cart/product-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ProductConfirmComponent } from './confirm/product-confirm/product-confirm.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderDetailsComponent } from './profile/order-details/order-details.component';

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
    AuthComponent,
    AdminComponent,
    SignInComponent,
    SignUpComponent,
    HomePageComponent,
    ProductListComponent,
    ProductCardComponent,
    CartComponent,
    ProductCartListComponent,
    ProductCartComponent,
    CheckoutComponent,
    ConfirmComponent,
    ProductConfirmComponent,
    ProfileComponent,
    OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
