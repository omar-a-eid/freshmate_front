import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private readonly http: HttpClient) {}
  private readonly URL_DB = 'http://localhost:8000/api/cart';

  GetCartItems(token: string) {
    return this.http.get(this.URL_DB, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  AddItemsToCart(productId: string, token: string) {
    const url = `${this.URL_DB}/${productId}`;
    return this.http.post(url, productId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  UpdateCartItemQuantity(productId: string, quantity: number, token: string) {
    const url = `${this.URL_DB}/${productId}`;
    return this.http.put(
      url,
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  RemoveItemsFromCart(productId: string, token: string) {
    const url = `${this.URL_DB}/${productId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(url, { headers });
  }
}
