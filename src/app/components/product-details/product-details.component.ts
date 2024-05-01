import { NavbarComponent } from '../navbar/navbar.component';
import { ProductComponent } from '../product/product.component';
import { FooterComponent } from '../footer/footer.component';
import { PathbarComponent } from '../pathbar/pathbar.component';
import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import {
  Router,
  NavigationEnd,
  RouterModule,
  ActivatedRoute,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { RatingStarsComponent } from "../rating-stars/rating-stars.component";
import { CommonModule } from '@angular/common'; 
import { QuantityIncrementDecrementComponent } from "../quantity-increment-decrement/quantity-increment-decrement.component";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ProductService } from '../../services/product/product.service';
import { GalleryItem } from '@daelmaak/ngx-gallery';
import { GalleryComponent } from '@daelmaak/ngx-gallery';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    MDBBootstrapModule,
    NavbarComponent,
    ProductComponent,
    FooterComponent,
    PathbarComponent,
    RatingStarsComponent,
    QuantityIncrementDecrementComponent,
    NgIf,
    NgFor,
    HttpClientModule,
    NgxGalleryModule,
    CommonModule,
    RouterModule,
    GalleryComponent,
    SlickCarouselModule
  ],
  templateUrl: './product-details.component.html',
  providers: [ProductService, WishlistService, CartService],
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {

  products:any = [];
  slideConfig = { "infinite": true, "dots": true, 'slidesToShow': 4, "slidesToScroll": 2,'responsive': [
    {
      'breakpoint': 767,
      'settings': {
        'slidesToShow': 2,
        "slidesToScroll": 2,
      }
    }, 
    {
      'breakpoint': 1200,
      'settings': {
        'slidesToShow': 3,
        "slidesToScroll": 2,
      }
    }]};
  constructor(
    myRoute: ActivatedRoute,
    private productService: ProductService,
    private wishlistService: WishlistService,
    private router: Router,
    private cartService: CartService
  ) {
    this.productId = myRoute.snapshot.params['id'];
  }

  @Input() productid: any;

  currentPath: string | undefined;
  productId: any;
  product: any;
  productData: any;
  user: any;
  userSession: any;

  items: GalleryItem[] = [];

  isHeartSolid: boolean = false;
  isHeartActive: boolean = false;

  toggleHeartIcon() {
    console.log('we');
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
    }, 8000);

    const closeToast = document.querySelector('[data-dismiss="toast"]');
    if (closeToast) {
      closeToast.addEventListener('click', () => {
        passwordToast.style.display = 'none';
      });
    }
  }

  copyToClipboard(inputElement: HTMLInputElement): void {
    inputElement.select();
    document.execCommand('copy');
  }

  ngOnInit(): void {
    this.userSession = sessionStorage.getItem('user');
    this.user = JSON.parse(this.userSession);

    this.productService.GetProduct(this.productId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.product = data;

        if (this.product.images && this.product.images.length > 0) {
          this.items = [];

          this.product.images.forEach((imageUrl: string) => {
            const galleryItem = {
              src: imageUrl,
              thumbSrc: imageUrl,
            };

            this.items.push(galleryItem);
          });
        }
      },
      error: (error: any) => console.log(error),
    });

    this.productService.GetAllProducts().subscribe({
      next: (data:any) => {
        for (let index = 0; index < 6; index++) {
        this.products.push(data[index]);
        }
      },
      error: (error) => console.log(error)
    })
  }

  addToWishlist(productid: string) {
    this.userSession = sessionStorage.getItem('user');
    this.user = JSON.parse(this.userSession);
    console.log('inside', {
      productid: productid,
      user: sessionStorage.getItem('user'),
    });
    this.toggleHeartIcon();
    this.wishlistService
      .addItemToWishList(this.user.userId, [productid])
      .subscribe(
        () => {
          console.log('Product added to wishlist successfully');
        },
        (error: any) => {
          console.error('Error adding product to wishlist:', error);
        }
      );
  }

  addToCart(productId: string) {
    this.cartService.AddItemsToCart(productId, this.user.token).subscribe({
      next: () => {
        console.log('Product added to cart successfully');
      },
      error: (error) => {
        console.error('Error adding product to cart:', error);
      },
      complete: () => {
        this.router.navigate(['/cart']);
      },
    });
  }
}
