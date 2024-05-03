import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FooterComponent, NavbarComponent],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, TranslateService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'freshmate_front';
  constructor(@Inject(LOCALE_ID) private locale: string) {
    // this.translateService.setDefaultLang('en');
    // this.translateService.use(localStorage.getItem('lang') || 'en');
    console.log('Current Language:', this.locale);
  }
    
}
