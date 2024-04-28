import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ProductComponent } from "../product/product.component";
import { FooterComponent } from "../footer/footer.component";
import { PathbarComponent } from '../pathbar/pathbar.component';

@Component({
    selector: 'app-wishlist',
    standalone: true,
    templateUrl: './wishlist.component.html',
    styleUrl: './wishlist.component.css',
    imports: [NavbarComponent, ProductComponent, FooterComponent, PathbarComponent]
})
export class WishlistComponent {

}
