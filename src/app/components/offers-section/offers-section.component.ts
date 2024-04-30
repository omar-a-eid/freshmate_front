import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-offers-section',
  standalone: true,
  imports: [SlickCarouselModule],
  templateUrl: './offers-section.component.html',
  styleUrl: './offers-section.component.css'
})
export class OffersSectionComponent {
  items=[{title: "Dessert Cake", image: "assets/img1_home.avif"},{title: "Arabica Coffee",image: "assets/img2_home.avif"},{title: "Robusta Coffee",image: "assets/img3_home.avif"},{title: "Cappuccino Coffee",image: "assets/img4_home.avif"},{title: "Coffee Machine",image: "assets/img5_home.avif"}];

  slideConfig = { "infinite": true, 'slidesToShow': 5,'responsive': [
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

}
