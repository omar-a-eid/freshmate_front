import { Component, OnInit } from '@angular/core';
import { RatingStarsComponent } from '../rating-stars/rating-stars.component';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingStarsComponent,CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent{
  currentImage: string = "../../assets/images/first.png";
  isHeartActive: boolean=false ;

  changeImage(imageName: string) {
    this.currentImage = "../../assets/images/" + imageName;
  }
  isHeartSolid: boolean = false;
  backgroundColor: string = 'white';

  toggleHeartIcon() {
    this.isHeartSolid = !this.isHeartSolid;
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

  
}
