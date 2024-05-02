// navbar.component.ts
import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CartService } from '../../services/cart/cart.service';
import { ProductService } from '../../services/product/product.service';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { CartProductsComponent } from '../cart-products/cart-products.component';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CartProductsComponent,
    RouterModule,
    RegistrationComponent,
    CurrencyPipe,
  ],
  providers: [WishlistService, ProductService, AuthService, CartService],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isHovered: boolean = false;
  viewCartBtnIsHovered: boolean = false;
  checkOutBtnIsHovered: boolean = false;
  isLoggedIn: any;
  searchKeyword: string;
  @Input() allProducts: any;
  shippingThreshold: number = 200;
  shippingCost: number = 10;
  productsQuantity: number = 0;
  @Output() totalChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() totalShipping: EventEmitter<number> = new EventEmitter<number>();
  @Output() quantityChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoggedIn = sessionStorage.getItem('user');
    this.searchKeyword = '';
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

  wishlist: any[] = [];
  userSession: any;
  user: any;
  numberOfProducts: number = 0;
  isAdmin: boolean = false;

  ngOnInit(): void {
    this.userSession = sessionStorage.getItem('user');
    this.user = JSON.parse(this.userSession);
    if(this.user) {
      this.wishlistService.GetWishlist(this.user.token).subscribe({
        next: (data: any) => {
          this.wishlist = data.products;
        },
        error: (error) => console.log(error),
      });
      this.loadWishlistData();
      this.isAdmin = this.authService.isAdmin();
  
      // get all cart products
      this.cartService.GetCartItems(this.user.token).subscribe({
        next: (data: any) => {
          // console.log(data);
  
          this.allProducts = data.products;
          this.updateProductsQuantity();
        },
        error: (error) => console.log(error),
      });
    }
  }

  loadWishlistData(): void {
    this.userSession = sessionStorage.getItem('user');
    this.user = JSON.parse(this.userSession);

    this.wishlistService.GetWishlist(this.user.token).subscribe({
      next: (data: any) => {
        this.wishlistService.updateWishlist(data.products);
        this.numberOfProducts = this.wishlistService.getNumberOfProducts();
      },
      error: (error) => console.log(error),
    });
  }

  // Inside your CartComponent class
  incrementQuantity(item: any) {
    item.quantity++;
    this.updateQuantity(item);
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
          console.log('Quantity updated successfully');
          this.calculateTotalPrice();
          this.updateProductsQuantity();
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
        this.calculateTotalPrice();
        this.updateProductsQuantity();
      },
      error: (error: any) => {
        console.error('Error deleting product:', error);
      },
    });
  }
  // to calculate total price for a product
  getTotal(product: any): number {
    return product.price * product.quantity;
  }

  // to calculate the total price of all products

  calculateTotalPrice(): number {
    let totalPrice = 0;
    if(this.allProducts) {
      for (const item of this.allProducts) {
        totalPrice += item.product.price * item.quantity;
      }
    }
    let shipping = 0;
    if (totalPrice >= this.shippingThreshold) {
      shipping = 0;
    } else {
      shipping = this.shippingCost;
    }

    this.totalChanged.emit(totalPrice);
    this.totalShipping.emit(shipping);

    return totalPrice;

  }

  navigateToCheckout() {
    this.router.navigate(['/checkout']);
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  navigateToSingleProduct(productId: string) {
    this.router.navigate(['/product', productId]);
  }

  updateProductsQuantity(): void {
    if(this.allProducts) {
      this.productsQuantity = this.allProducts.reduce(
        (total: number, item: any) => total + item.quantity,
        0
      );
    }
  }
}
