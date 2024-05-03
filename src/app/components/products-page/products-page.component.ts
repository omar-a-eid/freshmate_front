import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductService } from '../../services/product/product.service';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { PathbarComponent } from '../pathbar/pathbar.component';
import { ProductComponent } from '../product/product.component';
@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    CustomButtonComponent,
    ProductComponent,
    CommonModule,
    NgxSliderModule,
    FormsModule,
    PathbarComponent,
    NgxPaginationModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [ProductService],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  user: any;
  userSession: any;

  // For Range bar
  value: number = 0;
  highValue: number = 100;

  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
  };

  resetSliderValues() {
    this.value = 0;
    this.highValue = 100;
    this.filteredProducts = [];
  }

  filterProductsByPrice() {
    this.filteredProducts = this.products.filter((product) => {
      const productPrice = product.price;
      return productPrice >= this.value && productPrice <= this.highValue;
    });
  }

  constructor(private ProductService: ProductService, private router: Router) {}

  // Get all products once page is loaded
  ngOnInit(): void {
    this.userSession = sessionStorage.getItem('user');
    this.user = JSON.parse(this.userSession);
    this.ProductService.GetAllProducts(this.user.token).subscribe({
      next: (data: any) => {
        this.products = data;
        this.filterProductsByPrice();
      },
      error: (error) => console.log(error),
    });
  }

  // Used with clear all button
  isHovered: boolean = false;
  @HostListener('mouseenter') onMouseEnter() {
    this.isHovered = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isHovered = false;
  }

  // In sort drop down list
  sortOptions = [
    { id: 'option1', value: 'A-Z', label: 'Alphabetically, A-Z' },
    { id: 'option2', value: 'Z-A', label: 'Alphabetically, Z-A' },
    { id: 'option3', value: 'Low To High', label: 'Price, low to high' },
    { id: 'option4', value: 'High To Low', label: 'Price, high to low' },
  ];

  selectedSortOption: string = '';
  selectedSortOptionText: string = '';

  onSortOptionSelected(sortOption: string) {
    switch (sortOption) {
      case 'option1':
        // Sort alphabetically, A-Z
        if (this.filteredProducts.length != 0) {
          this.filteredProducts.sort((a, b) =>
            a.title.en.localeCompare(b.title.en)
          );
        } else {
          this.products.sort((a, b) => a.title.en.localeCompare(b.title.en));
        }
        break;
      case 'option2':
        // Sort alphabetically, Z-A
        if (this.filteredProducts.length != 0) {
          this.filteredProducts.sort((a, b) =>
            b.title.en.localeCompare(a.title.en)
          );
        } else {
          this.products.sort((a, b) => b.title.en.localeCompare(a.title.en));
        }

        break;
      case 'option3':
        // Sort by price, low to high
        if (this.filteredProducts.length != 0) {
          this.filteredProducts.sort(
            (a, b) => parseFloat(a.price) - parseFloat(b.price)
          );
        } else {
          this.products.sort(
            (a, b) => parseFloat(a.price) - parseFloat(b.price)
          );
        }
        break;
      case 'option4':
        // Sort by price, high to low
        if (this.filteredProducts.length != 0) {
          this.filteredProducts.sort(
            (a, b) => parseFloat(b.price) - parseFloat(a.price)
          );
        } else {
          this.products.sort(
            (a, b) => parseFloat(b.price) - parseFloat(a.price)
          );
        }
        break;
      default:
        break;
    }
  }

  // Sidebar
  isExpanded: boolean = false;
  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  //Pagination
  pageSize: number = 6; // Number of items per page
  currentPage: number = 1; // Current page
  totalPages: number = 5; // Total number of pages

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
