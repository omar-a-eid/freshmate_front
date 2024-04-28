import { Routes } from '@angular/router';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { ProductsPageComponent } from './Components/products-page/products-page.component';

export const routes: Routes = [
  { path: 'wishlist', component: WishlistComponent },
  { path: 'products', component: ProductsPageComponent },
];
