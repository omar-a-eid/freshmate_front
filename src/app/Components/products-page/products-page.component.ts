import { AfterViewInit, Component, HostListener, Input } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { Options } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';
import { PathbarComponent } from '../pathbar/pathbar.component';
import { CustomButtonComponent } from '../../custom-button/custom-button.component';
import { RatingStarsComponent } from '../rating-stars/rating-stars.component';

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
  constructor() {}

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
    { id: 'option5', value: 'Old To New', label: 'Date, old to new' },
  ];

  selectedSortOption: string = '';
  selectedSortOptionText: string = '';

  onSortOptionSelected() {
    console.log('Selected Sort Option:', this.selectedSortOption);
    this.selectedSortOptionText =
      this.sortOptions.find(
        (option) => option.value === this.selectedSortOption
      )?.label || '';
  }

  isExpanded: boolean = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
