import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { PathbarComponent } from '../pathbar/pathbar.component';
import { ProductComponent } from "../product/product.component";

@Component({
    selector: 'app-wishlist',
    standalone: true,
    templateUrl: './wishlist.component.html',
    providers: [WishlistService],
    styleUrl: './wishlist.component.css',
    imports: [NavbarComponent, ProductComponent, FooterComponent, PathbarComponent, HttpClientModule]
})

/***
 *When the page load 
 *Get wishlist
 *loop over the component (product)
 *add the data of the wishlist to the component
 *
 *
 *
 */
export class WishlistComponent implements OnInit{
    wishlist:any;
    user:any;
    userSession: any;
    constructor(private WishlistService: WishlistService) {}
    
    ngOnInit(): void {
        this.userSession = sessionStorage.getItem("user");
        this.user = JSON.parse(this.userSession);

        this.WishlistService.GetWishlist(this.user.userId, this.user.token).subscribe({
            next: (data:any)=> {
                this.wishlist = data.products;
            },
            error: error => console.log(error)
        })
    }


}