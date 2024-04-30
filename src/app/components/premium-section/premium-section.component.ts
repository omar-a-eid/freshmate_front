import { Component } from '@angular/core';

@Component({
  selector: 'app-premium-section',
  standalone: true,
  imports: [],
  templateUrl: './premium-section.component.html',
  styleUrl: './premium-section.component.css'
})
export class PremiumSectionComponent {
  items = [{text1: "Altitude", text2: "Up to ca. 800M", image: "assets/icon-b1.webp"}, {text1: "Temperature", text2:"22 - 30° C", image: "assets/icon-b3.webp"}, {text1:"Caffeine", text2:"2 - 4,5 %", image:"assets/icon-b2.webp"}, {text1:"Production", text2:"30% of the world market", image:"assets/icon-b4.webp"}]
}
