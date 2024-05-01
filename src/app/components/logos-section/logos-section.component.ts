import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-logos-section',
  standalone: true,
  imports: [SlickCarouselModule],
  templateUrl: './logos-section.component.html',
  styleUrl: './logos-section.component.css'
})
export class LogosSectionComponent {
  logos = ["assets/brand-1.webp", "assets/brand-2.webp", "assets/brand-3.webp", "assets/brand-4.webp" ,"assets/brand-5.webp", "assets/brand-6.webp"];
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
        'slidesToShow': 4,
        "slidesToScroll": 2,
      }
    }]};
  
}
