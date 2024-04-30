import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { PathbarComponent } from '../pathbar/pathbar.component';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../../services/product/product.service';
import { HttpClientModule } from '@angular/common/http';
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
  ],
  providers: [ProductService],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent implements OnInit {
  products: any[] = [];
  user: any;
  userSession: any;

  value: number = 0;
  highValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 100,
  };

  constructor(private ProductService: ProductService) {
    // Initialize your items array with data
    // For example:
    // this.items = yourDataService.getItems();
    // Set the total number of pages
    // this.totalPages = Math.ceil(this.items.length / this.pageSize);
  }

  ngOnInit(): void {
    this.userSession = sessionStorage.getItem('user');
    this.user = JSON.parse(this.userSession);
    console.log(this.user);
    this.ProductService.GetAllProducts(this.user.token).subscribe({
      next: (data: any) => {
        this.products = data;
        console.log(data);
        console.log(this.user.token);
      },
      error: (error) => console.log(error),
    });
  }

  // used with clear all button
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
        this.products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'option2':
        // Sort alphabetically, Z-A
        this.products.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'option3':
        // Sort by price, low to high
        this.products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'option4':
        // Sort by price, high to low
        this.products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      default:
        break;
    }
  }

  isExpanded: boolean = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  // test array

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
