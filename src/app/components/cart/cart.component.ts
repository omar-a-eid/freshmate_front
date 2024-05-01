import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart/cart.service';
import { PathbarComponent } from '../pathbar/pathbar.component';
import { ProductComponent } from '../product/product.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    PathbarComponent,
    ProductComponent,
    HttpClientModule,
  ],
  templateUrl: './cart.component.html',
  providers: [CartService],
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  @Input() allProducts: any;
  user: any;
  userSession: any;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.userSession = sessionStorage.getItem('user');
    this.user = JSON.parse(this.userSession);

    this.cartService.GetCartItems(this.user.token).subscribe({
      next: (data: any) => {
        // console.log(data);

        this.allProducts = data.products;
        console.log(this.allProducts);
      },
      // error: (error) => console.log(error),
    });
  }

  deleteProduct(productId: string, index: number, event: Event) {
    event.preventDefault();
    // Remove the product from the local array immediately
    this.allProducts.splice(index, 1);
    this.cartService.RemoveItemsFromCart(productId, this.user.token).subscribe({
      next: (response: any) => {
        console.log('Product deleted successfully');
      },
      error: (error: any) => {
        console.error('Error deleting product:', error);
      },
    });
  }

  @Input() products: any[] = [
    {
      name: 'Sweet Kiwi',
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
    for (const item of this.allProducts) {
      totalPrice += item.product.price * item.quantity;
    }
    return totalPrice;
  }
}
