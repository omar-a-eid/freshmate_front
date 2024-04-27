import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-products',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cart-products.component.html',
  providers: [CurrencyPipe],
  styleUrl: './cart-products.component.css',
})
export class CartProductsComponent {
  quantity: number = 1;
  itemPrice: number = 20;
  shippingCost: number = 10;
  shippingFree: number = 0;
  shipping: number = 0;

  @Output() totalChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() totalShipping: EventEmitter<number> = new EventEmitter<number>();


  calculateTotal(): void {
    const total =
      this.quantity * this.itemPrice +
      (this.itemPrice * this.quantity >= 200 ? (this.shippingCost = 0) : 10);
    this.shipping = 200 - (total - 10);
    if (total === 200) {
      this.shipping = 0;
    } else if (this.shipping < 0) {
      this.shipping = 0;
    }
    this.totalChanged.emit(total);
    this.totalShipping.emit(this.shipping);
  }

  incrementQuantity() {
    this.quantity++;
    this.calculateTotal();
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.calculateTotal();
    }
  }

}
