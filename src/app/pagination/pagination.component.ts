import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {

  @Input() itemsName: string = '';
  numberOfRowsPerPage: number = 10;
  numberOfTotalItems: number = 130;
  numberOfPages: number = 0;
  currentPage = 1;
  arrayNumberOfPages: number[] = [];
  arrayNumberOfPagesInMiddle: number[] = [];
  case: string = "first";
  isPaginationLoading = false;

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCountOfTotalItems();
    this.changeCase();
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.changeCase();
    if (this.itemsName == "products") {
      this.router.navigate([`products/${this.numberOfRowsPerPage}/${this.currentPage}`]);
    }
    else if (this.itemsName == "categories") {
      this.router.navigate([`categories/${this.numberOfRowsPerPage}/${this.currentPage}`]);
    }
  }

  getCountOfTotalItems() {
    this.isPaginationLoading = true;
    if (this.itemsName == "products") {
      this.numberOfRowsPerPage = 10;
      this.productsService.getProductsCount().subscribe(count => {
        this.numberOfTotalItems = count;
        this.numberOfPages = Math.ceil(this.numberOfTotalItems / this.numberOfRowsPerPage);
        this.arrayNumberOfPages = Array(this.numberOfPages).fill(undefined).map((_, i) => i + 1);
      })
    }
    else if (this.itemsName == "categories") {
      this.numberOfRowsPerPage = 5;
      this.categoriesService.getCategoriesCount().subscribe(count => {
        this.numberOfTotalItems = count;
        this.numberOfPages = Math.ceil(this.numberOfTotalItems / this.numberOfRowsPerPage);
        this.arrayNumberOfPages = Array(this.numberOfPages).fill(undefined).map((_, i) => i + 1);
      })
    }
    this.isPaginationLoading = false;
  }

  goToNextPage(): void {
    if (this.currentPage < this.numberOfPages)
      this.goToPage(this.currentPage + 1)
  }

  goToPrevPage(): void {
    if (this.currentPage > 1)
      this.goToPage(this.currentPage - 1)
  }

  changeCase() {
    if (this.numberOfPages < 7)
      this.case = "first";
    else if (this.currentPage < 4)
      this.case = "second";
    else if (this.currentPage > 3 && this.currentPage < this.numberOfPages - 2)
      this.case = "third";
    else
      this.case = "fourth";

    this.arrayNumberOfPagesInMiddle = Array(5).fill(undefined).map((_, i) => this.currentPage - 2 + i);
  }

}
