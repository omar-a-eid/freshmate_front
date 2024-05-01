import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  private readonly URL_DB = 'http://localhost:8000/api/products';

  GetAllProducts(token?: string) {
    if(token) {
      return this.http.get(this.URL_DB, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
    } else {
      return this.http.get(this.URL_DB);
    }
  }

  GetProduct(productId: string) {
    return this.http.get(this.URL_DB + '/' + productId);
  }
 


  // GetRandomProducts(count: number): Observable<any[]> {
  //   // Assuming you have an endpoint in your backend API to fetch random products
  //   const url = `http://your-api-url/random-products?count=${count}`;

  //   // Making a GET request to the backend API
  //   return this.http.get<any[]>("http://localhost:8000/api/products");
  // }


}
