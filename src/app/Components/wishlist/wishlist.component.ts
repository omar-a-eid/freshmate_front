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
    Title ="here in wishlist";
    constructor(private WishlistService: WishlistService) {}
    
    ngOnInit(): void {
        this.WishlistService.GetWishlist("662ed90d28fd4fb2b27e92c5", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9tZXJ4NDQ0NEBnbWFpbC5jb20iLCJ1c2VySWQiOiI2NjJlZDkwZDI4ZmQ0ZmIyYjI3ZTkyYzUiLCJpYXQiOjE3MTQzNDYzMjQsImV4cCI6MTcxNDM4MjMyNH0.VgNk6C5aEj9RAoJVVCQb2KNb0oXNWUK-7ShJBX8C7fs").subscribe({
            next: (data)=> {
                console.log(data);
            },
            error: error => console.log(error)
        })
    }


}
