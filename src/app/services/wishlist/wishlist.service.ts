import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private readonly http: HttpClient) { }

  private readonly URL_DB = "http://localhost:8000/api/wishlist";

  token:any=JSON.parse(sessionStorage.getItem("user") as string);
  private wishlist: any[] = [];

  GetWishlist(token: string) {
    return this.http.get(this.URL_DB, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
  }
  
  addItemToWishList(userId: string, productId: string[]) {
    return this.http.post(this.URL_DB + "/" + productId, userId,{
      headers: {
        'Authorization': `Bearer ${this.token.token}`,
      }

    });
  }

  removeItemFromWishlist(productId: string[]) {
    return this.http.delete(this.URL_DB + "/" + productId, {
      headers: {
        'Authorization': `Bearer ${this.token.token}`,
      }
  
    });
  }

  getNumberOfProducts(): number {
    return this.wishlist.length;
  }
  updateWishlist(newWishlist: any[]): void {
    this.wishlist = newWishlist;
  }

}
