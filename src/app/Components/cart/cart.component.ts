import { Component, EventEmitter, Input, Output } from '@angular/core';import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  quantity: number = 1;
  itemPrice: number = 20;
  shippingCost: number = 10;
  shippingFree: number = 0;
  shipping: number = 0;

  @Input() name: string = '';
  @Input() imageUrl: string = '../../assets/images/first.png';

  @Output() totalChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() totalShipping: EventEmitter<number> = new EventEmitter<number>();
  @Output() quantityChanged: EventEmitter<number> = new EventEmitter<number>();

  private emitQuantity() {
    this.quantityChanged.emit(this.quantity);
  }

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
    this.emitQuantity();
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.calculateTotal();
      this.emitQuantity();
    }
  }
}
