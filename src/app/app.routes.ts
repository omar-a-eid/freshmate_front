import { Routes } from '@angular/router';
import {WishlistComponent} from './Components/wishlist/wishlist.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { FaqComponent } from './Components/faq/faq.component';
import { CartComponent } from './Components/cart/cart.component';



export const routes: Routes = [
    { path: 'wishlist', component: WishlistComponent },
    { path: 'aboutus', component: AboutUsComponent },
    { path: 'faq', component: FaqComponent  },
    { path: 'cart', component: CartComponent }

];
