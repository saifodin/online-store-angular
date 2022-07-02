import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { Category } from '../models/category.model';
import { CategoryChild } from '../models/categoryChild.model';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-category-form-admin',
  templateUrl: './category-form-admin.component.html',
  styleUrls: ['./category-form-admin.component.scss']
})
export class CategoryFormAdminComponent implements OnInit {

  @ViewChild('form') categoryForm: NgForm | undefined;
  componentName = 'edit';
  categoryId: string = '495ffc9c-88d0-4f0c-b5a7-fcda2c84c8e4';
  categoriesCanBeParent: Category[] = [];
  originalCategory: Category = {
    categoryID: '',
    name: '',
    description: '',
    parentCategoryID: '',
  };
  updatedCategory: Category = {
    categoryID: '',
    name: '',
    description: '',
    parentCategoryID: '',
  };
  formValues = {
    name: '',
    description: '',
    parentCategory: '',
  }

  constructor(private categoriesService: CategoriesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchParamsForRouting();
  }



  fetchParamsForRouting() {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.componentName = data['componentType'];
    })

    this.activatedRoute.params.subscribe((params: Params) => {
      if (this.componentName == "edit") {
        this.categoryId = params['categoryId'];
        this.onFetchCategoryData(this.categoryId);
      }
      else {
        this.putDefaultValueForSelect();
      }

      this.onFetchCategoriesCanBeParent();
    })
  }

  onFetchCategoryData(categoryId: string) {
    this.categoriesService.getCategoryById(categoryId).subscribe(category => {
      this.originalCategory = category;
      console.log(category);
      this.onReset();
    })
  }

  onReset(): void {
    this.categoryForm?.setValue(
      this.formValues = {
        name: this.originalCategory.name,
        description: this.originalCategory.description,
        parentCategory: this.originalCategory.parentCategoryID == null ? 'null' : this.originalCategory.parentCategoryID,
      }
    );
    console.log(this.formValues);
    console.log(this.categoryForm?.value)
  }

  onFetchCategoriesCanBeParent(): void {
    this.categoriesService.getCategoriesCanBeParent().subscribe(categories => {
      this.categoriesCanBeParent = categories;
    })
  }

  onSubmit() {
    if (this.categoryForm?.valid) {
      this.updatedCategory = {
        categoryID: this.categoryId,
        name: this.categoryForm.value.name,
        description: this.categoryForm.value.description,
        parentCategoryID: this.categoryForm.value.parentCategory == 'null' ? null : this.categoryForm.value.parentCategory,
      }
      if (this.componentName == "edit") {
        this.categoriesService.updateCategory(this.categoryId, this.updatedCategory).subscribe({
          next: (v) => console.log(v),
          error: (e) => console.log(e),
          complete: () => console.info('complete'),
        })
      } else {
        this.categoriesService.createCategory(this.updatedCategory).subscribe(data => {
          console.log("success");
        });
      }

    }
  }

  testFunction() {
    return JSON.stringify(this.categoryForm?.value) === JSON.stringify(this.formValues);
  }

  putDefaultValueForSelect() {
    setTimeout(() => {
      this.categoryForm?.form.patchValue({
        parentCategory: "null",
      })
    });
  }

}
