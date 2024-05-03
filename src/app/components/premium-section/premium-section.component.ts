import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'app-premium-section',
  standalone: true,
  imports: [],
  providers: [TranslationService],
  templateUrl: './premium-section.component.html',
  styleUrl: './premium-section.component.css'
})
export class PremiumSectionComponent {
  lang:string = "en";
  ltr:boolean= false;
  items:any = [
    { title: { en: "Altitude", ar: "الارتفاع" }, subtitle: { en: "Up to ca. 800M", ar: "تصل إلى حوالي 800 متر" }, image: "assets/icon-b1.webp" },
    { title: { en: "Temperature", ar: "درجة الحرارة" }, subtitle: { en: "22 - 30° C", ar: "22 - 30° مئوية" }, image: "assets/icon-b3.webp" },
    { title: { en: "Caffeine", ar: "الكافيين" }, subtitle: { en: "2 - 4,5 %", ar: "2 - 4.5%" }, image: "assets/icon-b2.webp" },
    { title: { en: "Production", ar: "الإنتاج" }, subtitle: { en: "30% of the world market", ar: "30% من السوق العالمي" }, image: "assets/icon-b4.webp" }
  ]
  constructor(private langService: TranslationService){
    this.lang = this.langService.lang();
    this.ltr = this.langService.isAr();
  }
}
