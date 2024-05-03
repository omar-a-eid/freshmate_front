import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'app-collection-section',
  standalone: true,
  imports: [RouterModule],
  providers: [TranslationService],
  templateUrl: './collection-section.component.html',
  styleUrl: './collection-section.component.css'
})
export class CollectionSectionComponent {
  lang:string = "en";
  ltr:boolean= false;

  constructor(private langService: TranslationService){
    this.lang = this.langService.lang();
    this.ltr = this.langService.isAr();
  }
}
