import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RatingStarsComponent } from '../rating-stars/rating-stars.component';



@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingStarsComponent,CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent{

  @Input() product: any;

  toaster=inject(ToastrService);

  currentImage: string = "../../assets/images/first.png";
  isHeartActive: boolean=false ;

  changeImage(imageName: string) {
    this.currentImage = "../../assets/images/" + imageName;
  }
  isHeartSolid: boolean = false;
  backgroundColor: string = 'white';

  toggleHeartIcon() {
    this.isHeartSolid = !this.isHeartSolid;
    if(this.isHeartSolid){
      this.showToast();
    }
  }
 

  imagesOnClick(){
    //appear a model that contains the product details
  }
  addToCartButton(){
    //move the product to the cart
  }
  productOnclick(){
    //move the product details page
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

  constructor(private router: Router) {
    if (this.router.url === 'localhost:4200/wishlist') {
      this.showAddToCartButton = false;
      
    }
  }
  
}
