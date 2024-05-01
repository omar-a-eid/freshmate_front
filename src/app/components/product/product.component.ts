import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart/cart.service';
import { ProductService } from '../../services/product/product.service';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { RatingStarsComponent } from '../rating-stars/rating-stars.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingStarsComponent, CommonModule, RouterModule, HttpClientModule],
  providers: [ProductService, CartService,WishlistService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  @Input() productid: any;
  user:any;
  userSession: any;
  productId: any;
  toaster = inject(ToastrService);
  isHeartSolid: boolean = false;
  backgroundColor: string = 'white';
  currentImage: string = '';
  isHeartActive: boolean = false;
  showAddToCartButton: boolean = true;
  wishlist: any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private wishlistService: WishlistService,
    // private location:Location
  ) {
    if (this.router.url === 'localhost:4200/wishlist') {
      this.showAddToCartButton = false;
    }
  }
  getCurrentUrl(): string {
    return this.router.url;
  }

  changeImage(imageUrl: string): void {
    this.currentImage = imageUrl;
  }
  
  resetImage(): void {
    if (this.product && this.product.images && this.product.images.length > 0) {
      this.currentImage = this.product.images[0];
    }
  }

  toggleHeartIcon() {
    this.isHeartSolid = !this.isHeartSolid;
    if (this.isHeartSolid) {
      this.showToast();
    }
  }

  showToast() {
    const passwordToast = document.getElementById('passwordToast');
    if (!passwordToast) return;

    const toastBody = passwordToast.querySelector('.toast-body');
    if (!toastBody) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    passwordToast.style.display = 'block';
    passwordToast.classList.add('show');

    var scrollY =
      window.scrollY ||
      window.scrollTo({ top: 0, behavior: 'smooth' }) ||
      document.documentElement.scrollTop;
    var topPosition = Math.max(20, scrollY + 20);

    passwordToast.style.top = topPosition + 'px';

    setTimeout(() => {
      passwordToast.classList.remove('show');
      passwordToast.style.display = 'none';
    }, 3000);

    const closeToast = document.querySelector('[data-dismiss="toast"]');
    if (closeToast) {
      closeToast.addEventListener('click', () => {
        passwordToast.style.display = 'none';
      });
    }
  }

  ngOnInit(): void {
    this.userSession = sessionStorage.getItem('user');
    this.user = JSON.parse(this.userSession);
    if(this.productId){
      this.productService.GetProduct(this.productId).subscribe({
        next: (data: any) => {
          console.log(data);
          this.product = data;
          console.log(this.product);
        },
        error: (error: any) => console.log(error),
      });
    }

    if (this.product && this.product.images && this.product.images.length > 0) {
      this.currentImage = this.product.images[0];
    }
  }

  addToCart(productId: string) {
    if (!this.user || !this.user.token) {
      console.error('User token is missing.');
      return;
    }

    this.cartService.AddItemsToCart(productId, this.user.token).subscribe(
      () => {
        console.log('Product added to cart successfully');
      },
      (error) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }

  addToWishlist(productid: string) {
    this.userSession = sessionStorage.getItem("user");
    this.user = JSON.parse(this.userSession);
    console.log("inside", {productid:productid, user:sessionStorage.getItem("user")});

    this.wishlistService.addItemToWishList(this.user.userId, [productid]).subscribe(
      () => {
        console.log('Product added to wishlist successfully');
      },
      (error: any) => {
        console.error('Error adding product to wishlist:', error);
      }
    );


  }
  
  deleteProductFromWishlist(productId: string): void {
    this.wishlistService.removeItemFromWishlist([productId]).subscribe({
      next: (response: any) => {
        console.log('Product removed from wishlist:', response);
        location.reload();
        console.log("product is deleted")
      },
      error: (error: any) => {
        console.error('Error removing product from wishlist:', error);
      }
    });
  }
}
