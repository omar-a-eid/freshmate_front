import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'app-logos-section',
  standalone: true,
  imports: [SlickCarouselModule],
  providers:[TranslationService],
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

    lang:string = "en";
    ltr:boolean= false;
  
    constructor(private langService: TranslationService){
      this.lang = this.langService.lang();
      this.ltr = this.langService.isAr();
    }
  
}
