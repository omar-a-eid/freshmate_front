import { Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactUSComponent } from './components/contact-us/contact-us.component';
import { FaqComponent } from './components/faq/faq.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { userGuard } from './guards/user.guard';
import { HomeComponent } from './pages/home/home.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "faq", component: FaqComponent},
    {path: "aboutus", component: AboutUsComponent},
    {path: 'contactus', component: ContactUSComponent},
    {path: "wishlist", component: WishlistComponent, canActivate: [userGuard]},
    {path: "products", component: ProductsPageComponent, canActivate: [userGuard]},
    {path: "product/:id", component: ProductDetailsComponent, canActivate: [userGuard]},
    {path: 'cart', component: CartComponent, canActivate: [userGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [userGuard]},
    {path: 'checkout', component: CheckoutComponent, canActivate: [userGuard]},
    {path: 'admin/create', component: ProductFormComponent},
    {path: 'admin/edit/:id', component: ProductFormComponent},
    {path: '**', component: NotFoundComponent},

   ];
