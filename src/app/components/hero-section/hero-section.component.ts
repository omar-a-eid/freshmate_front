import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterModule],
  providers: [TranslationService],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  lang:string = "en";
  ltr:boolean= false;
  constructor(private langService: TranslationService) {
    this.lang = this.langService.lang();
    this.ltr = this.langService.isAr();
  }

}
