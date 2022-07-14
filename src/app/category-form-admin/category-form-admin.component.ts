import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Category } from '../models/category.model';
import { CategoryChild } from '../models/categoryChild.model';
import { CategoryWriteDTO } from '../models/categoryWriteDTO.model';
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
  errorMessage: string = '';
  originalCategory: Category = {
    categoryID: '',
    name: '',
    description: '',
    parentCategoryID: '',
    parentCategory: {
      categoryID: '',
      name: ''
    }
  };
  updatedCategory: CategoryWriteDTO = {
    categoryID: '',
    name: '',
    description: '',
    parentCategoryID: ''
  };
  formValues = {
    name: '',
    description: '',
    parentCategory: '',
  }

  constructor(private categoriesService: CategoriesService, private activatedRoute: ActivatedRoute, private router: Router) { }

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
    if (this.categoryForm?.valid && !this.testFunction()) {
      this.updatedCategory = {
        categoryID: this.categoryId,
        name: this.categoryForm.value.name,
        description: this.categoryForm.value.description,
        parentCategoryID: this.categoryForm.value.parentCategory == 'null' ? null : this.categoryForm.value.parentCategory,
      }
      if (this.componentName == "edit") {
        this.categoriesService.updateCategory(this.categoryId, this.updatedCategory).subscribe({
          next: (v) => this.router.navigate(['admin/categories/2/1']),
          error: (e) => console.log(e),
          complete: () => console.info('complete'),
        })
      } else {
        this.categoriesService.createCategory(this.updatedCategory).subscribe(data => {
          this.router.navigate(['admin/categories/2/1']);
        });
      }
    }
    else {
      this.categoryForm?.form.markAllAsTouched();
      if (this.testFunction()) {
        this.errorMessage = "You didn't change the data."
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
