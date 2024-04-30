import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart/cart.service';
import { ProductService } from '../../services/product/product.service';
import { RatingStarsComponent } from '../rating-stars/rating-stars.component';



@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingStarsComponent, CommonModule, RouterModule, HttpClientModule],
  providers: [ProductService, CartService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  user: any;
  userSession: any;
  toaster = inject(ToastrService);

  currentImage: string = '../../assets/images/first.png';
  isHeartActive: boolean = false;

  addToCart(productId: string) {
    this.cartService.AddItemsToCart(productId, this.user.token).subscribe({
      next: (response: any) => {
        console.log('Product added to cart successfully');
      },
      error: (error: any) => {
        console.error('Error adding product to cart:', error);
      },
    });
  }

  changeImage(imageName: string) {
    this.currentImage = '../../assets/images/' + imageName;
  }
  isHeartSolid: boolean = false;
  backgroundColor: string = 'white';

  toggleHeartIcon() {
    this.isHeartSolid = !this.isHeartSolid;
    if (this.isHeartSolid) {
      this.showToast();
    }
  }

  imagesOnClick() {
    //appear a model that contains the product details
  }
  addToCartButton() {
    //move the product to the cart
  }
  productOnclick() {
    //move the product details page
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

  showAddToCartButton: boolean = true;

  // constructor(private router: Router) {
  //   if (this.router.url === 'localhost:4200/wishlist') {
  //     this.showAddToCartButton = false;

  //   }
  // }
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  productId: any;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {
    if (this.router.url === 'localhost:4200/wishlist') {
      this.showAddToCartButton = false;
    }
  }

  ngOnInit(): void {
    this.productService.GetProduct(this.productId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.product = data;
      },
      error: (error: any) => console.log(error),
    });
  }
}
