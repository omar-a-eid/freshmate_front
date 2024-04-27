// navbar.component.ts
import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartProductsComponent } from '../cart-products/cart-products.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, CartProductsComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isHovered: boolean = false;
  viewCartBtnIsHovered: boolean = false;
  checkOutBtnIsHovered: boolean = false;
  shippingFree: number = 180;
  totalPrice: number = 20;


  onTotalChanged(total: number): void {
    this.totalPrice = total;
  }

  onShippingChanged(free: number): void {
    this.shippingFree = free;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered = false;
  }

  onMouseEnterViewCart() {
    this.viewCartBtnIsHovered = true;
  }

  onMouseLeaveViewCart() {
    this.viewCartBtnIsHovered = false;
  }

  onMouseEnterCheckOut() {
    this.checkOutBtnIsHovered = true;
  }

  onMouseLeaveCheckOut() {
    this.checkOutBtnIsHovered = false;
  }
}
