import { NavbarComponent } from "../navbar/navbar.component";
import { ProductComponent } from "../product/product.component";
import { FooterComponent } from "../footer/footer.component";
import { PathbarComponent } from '../pathbar/pathbar.component';
import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpClientModule} from '@angular/common/http';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { ProductCarouselsComponent } from "../product-carousels/product-carousels.component";
import { RatingStarsComponent } from "../rating-stars/rating-stars.component";
import { CommonModule } from '@angular/common'; 
import { QuantityIncrementDecrementComponent } from "../quantity-increment-decrement/quantity-increment-decrement.component";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ProductService } from "../../services/product/product.service";
import { GalleryItem } from '@daelmaak/ngx-gallery';
import { GalleryComponent } from '@daelmaak/ngx-gallery';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MDBBootstrapModule,NavbarComponent, ProductComponent, FooterComponent, PathbarComponent,RatingStarsComponent,QuantityIncrementDecrementComponent,ProductCarouselsComponent,NgIf,NgFor,HttpClientModule, NgxGalleryModule,CommonModule, RouterModule,GalleryComponent ],
  templateUrl: './product-details.component.html',
  providers:[ProductService],
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  currentPath: string | undefined;


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


productId:any;
product: any;
constructor( myRoute:ActivatedRoute, private productService: ProductService, private router: Router) {
  this.productId = myRoute.snapshot.params["id"];
}
    
ngOnInit(): void {

this.productService.GetProduct(this.productId).subscribe({
  next: (data:any)=> {
      console.log(data);
      this.product = data;
  },
  error: (error: any) => console.log(error)
})
}



items: GalleryItem[] = [
  {
    src: 'https://cdn.pixabay.com/photo/2020/06/23/15/17/avocado-5332878_960_720.jpg',
    thumbSrc:
      'https://cdn.pixabay.com/photo/2020/06/23/15/17/avocado-5332878_960_720.jpg',
  },
  {
    src: 'https://cdn.pixabay.com/photo/2017/01/12/02/34/coffee-1973549_960_720.jpg',
    thumbSrc:
      'https://cdn.pixabay.com/photo/2017/01/12/02/34/coffee-1973549_960_720.jpg',
  },
  {
    src: 'https://cdn.pixabay.com/photo/2020/06/26/04/40/flower-5341644_960_720.jpg',
    thumbSrc:
      'https://cdn.pixabay.com/photo/2020/06/26/04/40/flower-5341644_960_720.jpg',
  },
  {
    src: 'https://cdn.pixabay.com/photo/2020/05/11/18/49/island-5159729_960_720.jpg',
    thumbSrc:
      'https://cdn.pixabay.com/photo/2020/05/11/18/49/island-5159729_960_720.jpg',
  },
  {
    src: 'https://cdn.pixabay.com/photo/2013/11/15/23/18/john-work-garrett-library-211375_960_720.jpg',
    thumbSrc:
      'https://cdn.pixabay.com/photo/2013/11/15/23/18/john-work-garrett-library-211375_960_720.jpg',
  },
];


}
