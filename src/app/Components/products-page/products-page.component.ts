import { Component, HostListener, Input } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { Options } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';
import { PathbarComponent } from '../pathbar/pathbar.component';
import { CustomButtonComponent } from '../../custom-button/custom-button.component';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
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
  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent {
  value: number = 0;
  highValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 100,
  };

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

  @Input() products: any[] = [
    {
      name: 'dweet Kiwi Green',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_f4498462-b4ec-4018-9b37-04619c42eab6_270x.jpg?v=1687762285',
      price: '16.00',
    },
    {
      name: 'fweet Corn',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_d697e61b-8f39-41e5-8b52-a7fb0e7becf5_270x.jpg?v=1687762079',
      price: '14.00',
    },
    {
      name: 'enapple Apple',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_0dafc4d3-f74e-4f7b-b78b-5092ecf4a173_270x.jpg?v=1687762292',
      price: '17.00',
    },
    {
      name: 'ymoked Pork',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_b099aebb-2a68-467d-a7fa-54b384e8edf4_270x.jpg?v=1687762185',
      price: '38.00',
    },
    {
      name: 'aweet Kiwi Green',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_f4498462-b4ec-4018-9b37-04619c42eab6_270x.jpg?v=1687762285',
      price: '16.00',
    },
    {
      name: 'oweet Corn',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_d697e61b-8f39-41e5-8b52-a7fb0e7becf5_270x.jpg?v=1687762079',
      price: '14.00',
    },
    {
      name: 'pnapple Apple',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_0dafc4d3-f74e-4f7b-b78b-5092ecf4a173_270x.jpg?v=1687762292',
      price: '17.00',
    },
    {
      name: 'lmoked Pork',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_b099aebb-2a68-467d-a7fa-54b384e8edf4_270x.jpg?v=1687762185',
      price: '38.00',
    },
    {
      name: 'wweet Kiwi Green',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_f4498462-b4ec-4018-9b37-04619c42eab6_270x.jpg?v=1687762285',
      price: '16.00',
    },
    {
      name: 'mweet Corn',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_d697e61b-8f39-41e5-8b52-a7fb0e7becf5_270x.jpg?v=1687762079',
      price: '14.00',
    },
    {
      name: 'qnapple Apple',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_0dafc4d3-f74e-4f7b-b78b-5092ecf4a173_270x.jpg?v=1687762292',
      price: '17.00',
    },
    {
      name: 'kmoked Pork',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_b099aebb-2a68-467d-a7fa-54b384e8edf4_270x.jpg?v=1687762185',
      price: '38.00',
    },
    {
      name: 'bweet Kiwi Green',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_f4498462-b4ec-4018-9b37-04619c42eab6_270x.jpg?v=1687762285',
      price: '16.00',
    },
    {
      name: 'cweet Corn',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_d697e61b-8f39-41e5-8b52-a7fb0e7becf5_270x.jpg?v=1687762079',
      price: '14.00',
    },
    {
      name: 'inapple Apple',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_0dafc4d3-f74e-4f7b-b78b-5092ecf4a173_270x.jpg?v=1687762292',
      price: '17.00',
    },
    {
      name: 'rmoked Pork',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_b099aebb-2a68-467d-a7fa-54b384e8edf4_270x.jpg?v=1687762185',
      price: '38.00',
    },
  ];

  pageSize: number = 5; // Number of items per page
  currentPage: number = 1; // Current page
  totalPages: number = 5; // Total number of pages

  constructor() {
    // Initialize your items array with data
    // For example:
    // this.items = yourDataService.getItems();
    // Set the total number of pages
    // this.totalPages = Math.ceil(this.items.length / this.pageSize);
  }

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
