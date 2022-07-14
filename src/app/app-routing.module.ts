import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CartComponent } from './cart/cart.component';
import { CategoryFormAdminComponent } from './category-form-admin/category-form-admin.component';
import { CategoriesListComponent } from './category-view-admin/categories-list/categories-list.component';
import { CategoryViewAdminComponent } from './category-view-admin/category-view-admin.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductEditAdminComponent } from './product-edit-admin/product-edit-admin.component';
import { ProductsListComponent } from './products-view-admin/products-list/products-list.component';
import { ProductsViewAdminComponent } from './products-view-admin/products-view-admin.component';
import { OrderDetailsComponent } from './profile/order-details/order-details.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductListComponent } from './home-page/product-list/product-list.component';

const routes: Routes = [
  
  { path: '', redirectTo: 'auth' ,pathMatch: 'full'},
  { path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: '/admin/products/10/1', pathMatch: 'full' },
      { path: 'products', component: ProductsViewAdminComponent, children: [
          { path: '', redirectTo: '/admin/products/10/1', pathMatch: 'full' },
          { path: ':productPerPage/:pageNumber', component: ProductsListComponent }
        ]
      },
      { path: 'createProduct', component: ProductEditAdminComponent, data: { componentType: 'create' } },
      { path: 'editProduct/:productId', component: ProductEditAdminComponent, data: { componentType: 'edit' } },
      { path: 'categories', component: CategoryViewAdminComponent, children: [
          { path: '', redirectTo: '/admin/categories/2/1', pathMatch: 'full' },
          { path: ':categoriesPerPage/:pageNumber', component: CategoriesListComponent }
        ]
      },
      { path: 'createCategory', component: CategoryFormAdminComponent, data: { componentType: 'create' } },
      { path: 'editCategory/:categoryId', component: CategoryFormAdminComponent, data: { componentType: 'edit' } },
    ]
  },
  { path: 'auth', component: AuthComponent, children: [
    { path: '', redirectTo: '/auth/signIn', pathMatch: 'full'},
    { path: 'signIn', component: SignInComponent},
    { path: 'signUp', component: SignUpComponent},
  ]},
  { path: 'home', component: HomePageComponent, children:[
    { path: '', redirectTo: '/home/products', pathMatch:'full'},
    { path: 'products', component: ProductListComponent},
    { path: 'cart', component: CartComponent},
    { path: 'checkout', component: CheckoutComponent},
    { path: 'confirm', component: ConfirmComponent},
    { path: 'profile', component: ProfileComponent, children: [
      { path: ':orderId', component: OrderDetailsComponent}
    ]}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
