import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './Components/footer/footer.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ProductCarouselsComponent } from './Components/product-carousels/product-carousels.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ProductComponent } from './Components/product/product.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';

import { ContactUSComponent } from './components/contact-us/contact-us.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './modules/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProfileComponent,ContactUSComponent,NotFoundComponent,ProductComponent, HttpClientModule ,NavbarComponent, FooterComponent, ProductComponent,WishlistComponent,AboutUsComponent,ProductDetailsComponent,ProductCarouselsComponent,CommonModule, HomeComponent, RegistrationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'freshmate_front';
}
