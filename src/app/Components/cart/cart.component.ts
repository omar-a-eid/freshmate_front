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
  @Input() allProducts: any[] = [
    {
      name: 'Product 1',
      price: 7.0,
      quantity: 1,
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/files/1_d00b934d-e940-49ff-a5fe-1056688cd479_90x.jpg?v=1690008374',
    },
    {
      name: 'Product 2',
      price: 20.0,
      quantity: 1,
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/files/1_d00b934d-e940-49ff-a5fe-1056688cd479_90x.jpg?v=1690008374',
    },
  ];
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

  // to increment quantity
  incrementQuantity(product: any) {
    product.quantity++;
  }

  // to decrement quantity
  decrementQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  // to calculate total price for a product
  getTotal(product: any): number {
    return product.price * product.quantity;
  }

  // to calculate the total price of all products
  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const product of this.allProducts) {
      totalPrice += product.price * product.quantity;
    }
    return totalPrice;
  }
}
