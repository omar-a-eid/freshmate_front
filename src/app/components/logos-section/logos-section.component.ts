import { Component } from '@angular/core';

@Component({
  selector: 'app-logos-section',
  standalone: true,
  imports: [],
  templateUrl: './logos-section.component.html',
  styleUrl: './logos-section.component.css'
})
export class LogosSectionComponent {
  logos = ["/assets/brand-1.webp", "/assets/brand-2.webp", "/assets/brand-3.webp", "/assets/brand-4.webp" ,"/assets/brand-5.webp", "/assets/brand-6.webp"];
  
}
