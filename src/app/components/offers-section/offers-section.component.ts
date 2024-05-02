import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'app-offers-section',
  standalone: true,
  imports: [SlickCarouselModule],
  providers: [TranslationService],
  templateUrl: './offers-section.component.html',
  styleUrl: './offers-section.component.css'
})
export class OffersSectionComponent {
  lang:string = "en";
  ltr:boolean= false;
  
  items:any = [
    { title: { en: "Dessert Cake", ar: "كعك الحلوى" }, image: "assets/img1_home.avif" },
    { title: { en: "Arabica Coffee", ar: "قهوة عربية" }, image: "assets/img2_home.avif" },
    { title: { en: "Robusta Coffee", ar: "قهوة روبوستا" }, image: "assets/img3_home.avif" },
    { title: { en: "Cappuccino Coffee", ar: "قهوة كابتشينو" }, image: "assets/img4_home.avif" },
    { title: { en: "Coffee Machine", ar: "آلة القهوة" }, image: "assets/img5_home.avif" }
  ];
  
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
    constructor(private langService: TranslationService){
      this.lang = this.langService.lang();
      this.ltr = this.langService.isAr();
    }
    
}
