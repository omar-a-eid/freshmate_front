import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';

import { CommonModule } from '@angular/common';
import { ProductComponent } from './Components/product/product.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { ProductsPageComponent } from './Components/products-page/products-page.component';
import { PathbarComponent } from './Components/pathbar/pathbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    NavbarComponent,
    FooterComponent,
    ProductComponent,
    WishlistComponent,
    ProductsPageComponent,
    PathbarComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'freshmate_front';
}
