// navbar.component.ts
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartProductsComponent } from '../cart-products/cart-products.component';
import { RegistrationComponent } from '../registration/registration.component';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { AuthService } from '../../services/auth/auth.service';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, CartProductsComponent, RouterModule, RegistrationComponent],
  providers:[WishlistService, ProductService, AuthService],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isHovered: boolean = false;
  viewCartBtnIsHovered: boolean = false;
  checkOutBtnIsHovered: boolean = false;
  shippingFree: number = 180;
  totalPrice: number = 20;
  productsQuantity: number = 1;
  isLoggedIn:any;
  searchKeyword :string;

    constructor(private wishlistService: WishlistService, private productService: ProductService, private authService: AuthService) {
    this.isLoggedIn =sessionStorage.getItem("user");
    this.searchKeyword = '';
  }

  onQuantityChanged(quantity: number): void {
    this.productsQuantity = quantity;
  }

  updateQuantity(newQuantity: number) {
    this.productsQuantity = newQuantity;
  }

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

  wishlist: any[] = [];
  userSession: any;
  user: any;
  numberOfProducts: number = 0;
  isAdmin: boolean = false;


  ngOnInit(): void {
    this.userSession = sessionStorage.getItem("user");
    this.user = JSON.parse(this.userSession);
  
    this.wishlistService.GetWishlist(this.user.token).subscribe({
      next: (data: any) => {
        this.wishlist = data.products;
      },
      error: error => console.log(error)
    });
    this.loadWishlistData();
    this.isAdmin = this.authService.isAdmin();

  }

 
  loadWishlistData(): void {
    this.userSession = sessionStorage.getItem("user");
    this.user = JSON.parse(this.userSession);
  
    this.wishlistService.GetWishlist(this.user.token).subscribe({
      next: (data: any) => {
          this.wishlistService.updateWishlist(data.products);
          this.numberOfProducts = this.wishlistService.getNumberOfProducts();
        },
        error: error => console.log(error)
      });
    }
  
}
