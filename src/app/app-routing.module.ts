import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryFormAdminComponent } from './category-form-admin/category-form-admin.component';
import { CategoriesListComponent } from './category-view-admin/categories-list/categories-list.component';
import { CategoryViewAdminComponent } from './category-view-admin/category-view-admin.component';
import { ProductEditAdminComponent } from './product-edit-admin/product-edit-admin.component';
import { ProductsListComponent } from './products-view-admin/products-list/products-list.component';
import { ProductsViewAdminComponent } from './products-view-admin/products-view-admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/products/10/1', pathMatch: 'full' },
  {
    path: 'products', component: ProductsViewAdminComponent, children: [
      { path: '', redirectTo: '/products/10/1', pathMatch: 'full' },
      { path: ':productPerPage/:pageNumber', component: ProductsListComponent }
    ]
  },
  { path: 'createProduct', component: ProductEditAdminComponent, data: { componentType: 'create' } },
  { path: 'editProduct/:productId', component: ProductEditAdminComponent, data: { componentType: 'edit' } },


  {
    path: 'categories', component: CategoryViewAdminComponent, children: [
      { path: '', redirectTo: '/categories/5/1', pathMatch: 'full' },
      { path: ':categoriesPerPage/:pageNumber', component: CategoriesListComponent }
    ]
  },
  { path: 'createCategory', component: CategoryFormAdminComponent, data: { componentType: 'create' } },
  { path: 'editCategory/:categoryId', component: CategoryFormAdminComponent, data: { componentType: 'edit' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
