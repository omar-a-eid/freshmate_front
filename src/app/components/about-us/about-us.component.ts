import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { PathbarComponent } from '../pathbar/pathbar.component';


@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,PathbarComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

}
