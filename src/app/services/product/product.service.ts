import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  private readonly URL_DB = 'http://localhost:8000/api/products';

  GetAllProducts(token: string) {
    return this.http.get(this.URL_DB, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  GetProduct(productId: string) {
    return this.http.get(this.URL_DB + '/' + productId);
  }
}
