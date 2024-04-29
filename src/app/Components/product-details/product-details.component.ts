import { NavbarComponent } from "../navbar/navbar.component";
import { ProductComponent } from "../product/product.component";
import { FooterComponent } from "../footer/footer.component";
import { PathbarComponent } from '../pathbar/pathbar.component';
import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpClientModule} from '@angular/common/http';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { ProductCarouselsComponent } from "../product-carousels/product-carousels.component";
import { RatingStarsComponent } from "../rating-stars/rating-stars.component";
import { CommonModule } from '@angular/common'; 
import { QuantityIncrementDecrementComponent } from "../quantity-increment-decrement/quantity-increment-decrement.component";
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MDBBootstrapModule,NavbarComponent, ProductComponent, FooterComponent, PathbarComponent,RatingStarsComponent,QuantityIncrementDecrementComponent,ProductCarouselsComponent,NgIf,NgFor,HttpClientModule, NgxGalleryModule,CommonModule, RouterModule ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  currentPath: string | undefined;

  constructor(private router: Router) { }

  // ngOnInit(): void {
  //   // Subscribe to router events
  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd)
  //   ).subscribe(() => {
  //     this.getCurrentPath();
  //   });
  // }

  // getCurrentPath(): void {
  //   this.currentPath = this.router.url;

  //   // Remove leading slash
  //   if (this.currentPath.startsWith('/')) {
  //     this.currentPath = this.currentPath.substr(1);
  //   }
  // }
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
    }, 3000);
  
    const closeToast = document.querySelector('[data-dismiss="toast"]');
    if (closeToast) { 
      closeToast.addEventListener("click", () => {
        passwordToast.style.display = "none";
      });
    }
  }

  showAddToCartButton: boolean = true;


  
  copyToClipboard(inputElement: HTMLInputElement): void {
    inputElement.select();
    document.execCommand('copy');
    
  }

}
