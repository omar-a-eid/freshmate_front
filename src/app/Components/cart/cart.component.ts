import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  quantity: number = 1;
  itemPrice: number = 20;
  shippingCost: number = 10;
  shippingFree: number = 0;
  shipping: number = 0;

  @Input() products: any[] = [
    {
      name: 'Sweet Kiwi Green',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_f4498462-b4ec-4018-9b37-04619c42eab6_270x.jpg?v=1687762285',
      price: '$16.00',
    },
    {
      name: 'Sweet Corn',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_d697e61b-8f39-41e5-8b52-a7fb0e7becf5_270x.jpg?v=1687762079',
      price: '$14.00',
    },
    {
      name: 'Snapple Apple',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_0dafc4d3-f74e-4f7b-b78b-5092ecf4a173_270x.jpg?v=1687762292',
      price: '$17.00',
    },
    {
      name: 'Smoked Pork',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_b099aebb-2a68-467d-a7fa-54b384e8edf4_270x.jpg?v=1687762185',
      price: '$38.00',
    },
  ];

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
