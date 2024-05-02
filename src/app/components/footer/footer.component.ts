import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  
  facebook_hovered = false;
  pinterest_hovered = false;
  instagram_hovered = false;
  twitter_hovered = false;
  tiktok_hovered = false;

  selectedLanguage: string = 'English';
  selectedCurrency: string = 'USD';

  selectCurrency(currency: string) {
    this.selectedCurrency = currency;
  }
  selectLanguage(language: string) {
    this.selectedLanguage = language;
  }
}
