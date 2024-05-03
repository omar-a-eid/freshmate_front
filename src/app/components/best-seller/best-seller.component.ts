import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductService } from '../../services/product/product.service';
import { TranslationService } from '../../services/translation/translation.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [HttpClientModule, ProductComponent, SlickCarouselModule],
  providers: [ProductService, TranslationService],
  templateUrl: './best-seller.component.html',
  styleUrl: './best-seller.component.css',
})
export class BestSellerComponent implements OnInit {
  products:any = [];
  lang:string = "en";
  ltr:boolean= false;
  slideConfig = { "infinite": true, "dots": true, 'slidesToShow': 4, "slidesToScroll": 2,'responsive': [
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
  constructor(private ProductService: ProductService, private langService : TranslationService) {
        this.lang = this.langService.lang();
        this.ltr = this.langService.isAr();
  }
  
  ngOnInit(): void {
    this.ProductService.GetAllProducts().subscribe({
      next: (data:any) => {
        for (let index = 0; index < 6; index++) {
        this.products.push(data[index]);
        }
      },
      error: (error) => console.log(error)
    })
  }
}
