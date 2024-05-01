import { NavbarComponent } from "../navbar/navbar.component";
import { ProductComponent } from "../product/product.component";
import { FooterComponent } from "../footer/footer.component";
import { PathbarComponent } from '../pathbar/pathbar.component';
import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpClientModule} from '@angular/common/http';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { RatingStarsComponent } from "../rating-stars/rating-stars.component";
import { CommonModule } from '@angular/common'; 
import { QuantityIncrementDecrementComponent } from "../quantity-increment-decrement/quantity-increment-decrement.component";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ProductService } from "../../services/product/product.service";
import { GalleryItem } from '@daelmaak/ngx-gallery';
import { GalleryComponent } from '@daelmaak/ngx-gallery';
import { WishlistService } from "../../services/wishlist/wishlist.service";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MDBBootstrapModule,NavbarComponent, ProductComponent, FooterComponent, PathbarComponent,RatingStarsComponent,QuantityIncrementDecrementComponent,NgIf,NgFor,HttpClientModule, NgxGalleryModule,CommonModule, RouterModule,GalleryComponent ],
  templateUrl: './product-details.component.html',
  providers:[ProductService, WishlistService],
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  constructor( myRoute:ActivatedRoute, private productService: ProductService, private wishlistService: WishlistService,private router: Router) {
    this.productId = myRoute.snapshot.params["id"];
  }

  currentPath: string | undefined;
  productId:any;
  product: any;
  productData: any;
   
  items: GalleryItem[] = [];

  isHeartSolid: boolean = false;
  isHeartActive: boolean=false ;


  toggleHeartIcon() {
    this.isHeartSolid = !this.isHeartSolid;
    if(this.isHeartSolid){
       this.showToast();
    }
  }

  showToast() {
    const passwordToast = document.getElementById('passwordToast');
    if (!passwordToast) return; 
  
    const toastBody = passwordToast.querySelector('.toast-body');
    if (!toastBody) return; 
  
    window.scrollTo({ top: 0, behavior: 'smooth' });
  
    passwordToast.style.display = "block";
    passwordToast.classList.add('show');
  
    var scrollY = window.scrollY || window.scrollTo({ top: 0, behavior: 'smooth' }) || document.documentElement.scrollTop;
    var topPosition = Math.max(20, scrollY + 20);
  
    passwordToast.style.top = topPosition + 'px';
  
    setTimeout(() => {
        passwordToast.classList.remove('show');
        passwordToast.style.display = "none";
    }, 8000);
  
    const closeToast = document.querySelector('[data-dismiss="toast"]');
    if (closeToast) { 
      closeToast.addEventListener("click", () => {
        passwordToast.style.display = "none";
      });
    }
  }

  copyToClipboard(inputElement: HTMLInputElement): void {
    inputElement.select();
    document.execCommand('copy');
    
  }
  user:any;
  userSession: any;
  ngOnInit(): void {

    this.userSession = sessionStorage.getItem("user");
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
      error: (error: any) => console.log(error)
    });


  
  

  }





  @Input() productid: any; // Assuming you have productId as input


  addToWishlist(productid: string) {
    // Assuming you have userId and token available
    console.log("inside");
    this.userSession = sessionStorage.getItem("user");
    this.user = JSON.parse(this.userSession);
    console.log("inside", {productid:productid, user:sessionStorage.getItem("user")});

    // Call addWishlist method to add product to wishlist
    this.wishlistService.addItemToWishList(this.user.userId, [productid]).subscribe(
      () => {
        console.log('Product added to wishlist successfully');
        // Handle success response
      },
      (error: any) => {
        console.error('Error adding product to wishlist:', error);
        // Handle error response
      }
    );


  }
  









}
