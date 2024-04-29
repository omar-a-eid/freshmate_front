import { Routes } from '@angular/router';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { CartComponent } from './Components/cart/cart.component';
import { FaqComponent } from './Components/faq/faq.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';

export const routes: Routes = [
    // {path: "", redirectTo:"students", pathMatch:"full"},
    {path: "wishlist", component: WishlistComponent},
    {path: "aboutus", component: AboutUsComponent},
    {path: "product", component: ProductDetailsComponent},
    {path: "faq", component: FaqComponent},
       { path: 'cart', component: CartComponent }

   ];
