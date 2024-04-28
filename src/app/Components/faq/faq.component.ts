import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { PathbarComponent } from '../pathbar/pathbar.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,PathbarComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {

}
