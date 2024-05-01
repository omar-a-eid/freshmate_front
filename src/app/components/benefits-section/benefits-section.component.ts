import { Component } from '@angular/core';

@Component({
  selector: 'app-benefits-section',
  standalone: true,
  imports: [],
  templateUrl: './benefits-section.component.html',
  styleUrl: './benefits-section.component.css'
})
export class BenefitsSectionComponent {
  leftItems =[{title:"Gives energy and improves thinking", img: "assets/icon1.webp"},{title:"Promote heart health.", img: "assets/icon2.webp"},{title:"Coffee Protects Against Depression", img: "assets/icon3.webp"},{title:"Coffee Contains Antioxidants", img: "assets/icon4.webp"}];
  rightItems =[{title:"Gives energy and improves thinking", img: "assets/icon5.webp"},{title:"Promote heart health.", img: "assets/icon6.webp"},{title:"Coffee Protects Against Depression", img: "assets/icon7.webp"},{title:"Coffee Contains Antioxidants", img: "assets/icon8.webp"}]
}
