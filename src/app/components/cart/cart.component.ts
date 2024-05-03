import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { TranslationService } from '../../services/translation/translation.service';
import { PathbarComponent } from '../pathbar/pathbar.component';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    PathbarComponent,
    ProductComponent,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './cart.component.html',
  providers: [CartService, TranslationService],
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {

  lang:string = "en";
  ltr:boolean= false;
  // @Output() totalChanged: EventEmitter<number> = new EventEmitter<number>();
  // @Output() totalShipping: EventEmitter<number> = new EventEmitter<number>();

  userSession: any;
  user: any;
  allProducts:any = [];
  shippingThreshold: number = 200;
  shippingCost: number = 10;

  constructor(private cartService: CartService, private router: Router, private langService: TranslationService) {
    this.lang = this.langService.lang();
    this.ltr = this.langService.isAr();
  }


  ngOnInit(): void {
    this.userSession = sessionStorage.getItem('user');
    this.user = JSON.parse(this.userSession);
  
    this.cartService.GetCartItems(this.user.token).subscribe({
      next: (data: any) => {
        this.allProducts = data.products;
        // this.updateProductsQuantity();
      },
      // error: (error) => console.log(error),
    });
  }

  // @Input() allProducts: any;
  // isSmallScreen: boolean = false;
  // productsQuantity: number = 0;


  // Inside your CartComponent class
  incrementQuantity(item: any) {
    if(item.quantity != item.product.quantity) {
      item.quantity++;
      this.updateQuantity(item);
    }
  }

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateQuantity(item);
    }
  }

  updateQuantity(item: any) {
    this.cartService
      .UpdateCartItemQuantity(item.product._id, item.quantity, this.user.token)
      .subscribe({
        next: () => {
          // this.updateProductsQuantity();
        },

        error: (error) => {
          console.error('Error updating quantity:', error);
        },
      });
  }

  deleteProduct(productId: string, index: number, event: Event) {
    event.preventDefault();
    // Remove the product from the local array immediately
    this.allProducts.splice(index, 1);
    this.cartService.RemoveItemsFromCart(productId, this.user.token).subscribe({
      next: (response: any) => {
        console.log('Product deleted successfully');
        // this.updateProductsQuantity();
      },
      error: (error: any) => {
        console.error('Error deleting product:', error);
      },
    });
  }

  products: any[] = [
    {
      name: 'Sweet Kiwi',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_f4498462-b4ec-4018-9b37-04619c42eab6_270x.jpg?v=1687762285',
      price: 16.00,
    },
    {
      name: 'Sweet Corn',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_d697e61b-8f39-41e5-8b52-a7fb0e7becf5_270x.jpg?v=1687762079',
      price: 14.00,
    },
    {
      name: 'Snapple Apple',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_0dafc4d3-f74e-4f7b-b78b-5092ecf4a173_270x.jpg?v=1687762292',
      price: 17.00,
    },
    {
      name: 'Smoked Pork',
      image:
        'https://nov-freshmate.myshopify.com/cdn/shop/products/1_b099aebb-2a68-467d-a7fa-54b384e8edf4_270x.jpg?v=1687762185',
      price: 38.00,
    },
  ];



  // // to calculate total price for a product
  // getTotal(product: any): number {
  //   return product.price * product.quantity;
  // }

  // to calculate the total price of all products
  calculateTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.allProducts) {
      totalPrice += item.product.price * item.quantity;
    }

    let shipping = 0;
    if (totalPrice >= this.shippingThreshold) {
      shipping = 0;
    } else {
      shipping = this.shippingCost;
    }

    // this.totalChanged.emit(totalPrice);
    // this.totalShipping.emit(shipping);

    return totalPrice;
  }

  // updateProductsQuantity(): void {
  //   this.productsQuantity = this.allProducts.reduce(
  //     (total: number, item: any) => total + item.quantity,
  //     0
  //   );
  // }
}
