import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  facebook_hovered = false;
  pinterest_hovered = false;
  instagram_hovered = false;
  twitter_hovered = false;
  tiktok_hovered = false;
  
  selectedLanguage: string = 'en';
  selectedCurrency: string = 'USD';
  
  ngOnInit(): void {
    this.selectedLanguage = 'en';
  
  }
  
  constructor(private router: Router) {}
  selectCurrency(currency: string) {
    this.selectedCurrency = currency;
  }
  selectLanguage(language: string) {
    this.selectedLanguage = language;
    // this.router.navigate(['/' + language]);
    window.location.href = language;
  }
}
