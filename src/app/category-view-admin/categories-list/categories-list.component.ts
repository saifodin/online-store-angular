import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertService } from 'src/app/alert-confirm/alert-confirm.service';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  loadedCategories: Category[] = [];
  isCategoriesLoading: boolean = true;
  categoriesPage = { categoryPerPage: 10, pageNumber: 1 };

  constructor(private categoriesService: CategoriesService, private route: ActivatedRoute, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    this.fetchParamsRouting();
  }

  fetchParamsRouting(): void {
    this.route.params.subscribe((params: Params) => {
      this.categoriesPage = {
        categoryPerPage: params['categoriesPerPage'],
        pageNumber: params['pageNumber'],
      }
      this.onFetchCategories(this.categoriesPage);
    })
  }

  onFetchCategories(categoriesPage: any) {
    this.isCategoriesLoading = true;
    this.categoriesService.getCategories(categoriesPage.categoryPerPage, categoriesPage.pageNumber).subscribe(categories => {
      this.loadedCategories = categories;
      this.isCategoriesLoading = false;
    })
  }

  onEdit(categoryID: string) {
    this.router.navigate([`admin/editCategory/${categoryID}`])
  }

  onDeleteButton(categoryId: string) {
    this.alertService.setShow(true);
    this.alertService.confirmAlertChange.subscribe(value => {
      if (value) {
        this.onDeleteCategory(categoryId);
        const afterDelete = this.loadedCategories.filter((c) => c.categoryID !== categoryId);
        this.loadedCategories = afterDelete;
      }
    })
  }

  onDeleteCategory(categoryId: string) {
    this.categoriesService.deleteCategory(categoryId).subscribe(data => {
      this.fetchParamsRouting();
    })
  }

}
