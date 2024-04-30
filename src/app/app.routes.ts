import { Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CartComponent } from './components/cart/cart.component';
import { FaqComponent } from './components/faq/faq.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'products', component: ProductsPageComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: RegistrationComponent },
  { path: '**', component: NotFoundComponent },
];
