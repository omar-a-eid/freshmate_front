import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private readonly http: HttpClient) { }

  private readonly URL_DB = "http://localhost:8000/api/wishlist";

  GetWishlist(userId: string, token: string) {
    return this.http.get(this.URL_DB + "/" + userId , {
      headers: {
        'Authorization': `Bearer ${token}`,
      }});
  }

  addItemToWishList(userId: string, productId: string[]) {
    return this.http.post(this.URL_DB + "/" + productId, userId);
  }

  removeItemFromWishlist(userId: string, productId: string) {
    return this.http.put(this.URL_DB + "/" + productId, userId);
  }
}
