import { Component } from '@angular/core';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'app-benefits-section',
  standalone: true,
  imports: [],
  providers: [TranslationService],
  templateUrl: './benefits-section.component.html',
  styleUrl: './benefits-section.component.css'
})
export class BenefitsSectionComponent {
  lang:string = "en";
  ltr:boolean= false;
  leftItems:any =[
    { title: { en: "Gives energy and improves thinking", ar: "يمنح الطاقة ويحسن التفكير" }, img: "assets/icon1.webp" },
    { title: { en: "Promote heart health.", ar: "يعزز صحة القلب" }, img: "assets/icon2.webp" },
    { title: { en: "Coffee Protects Against Depression", ar: "القهوة تحمي من الاكتئاب" }, img: "assets/icon3.webp" },
    { title: { en: "Coffee Contains Antioxidants", ar: "القهوة تحتوي على مضادات الأكسدة" }, img: "assets/icon4.webp" }];

  rightItems:any =[
    { title: { en: "Gives energy and improves thinking", ar: "يمنح الطاقة ويحسن التفكير" }, img: "assets/icon5.webp" },
    { title: { en: "Promote heart health.", ar: "يعزز صحة القلب" }, img: "assets/icon6.webp" },
    { title: { en: "Coffee Protects Against Depression", ar: "القهوة تحمي من الاكتئاب" }, img: "assets/icon7.webp" },
    { title: { en: "Coffee Contains Antioxidants", ar: "القهوة تحتوي على مضادات الأكسدة" }, img: "assets/icon8.webp" }]

  constructor(private langService: TranslationService){
    this.lang = this.langService.lang();
    this.ltr = this.langService.isAr();
  }
}
