import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly http: HttpClient) { }

  private readonly URL_DB = "http://localhost:8000/api/products";

  GetAllProducts() {
    return this.http.get(this.URL_DB);
  }
  GetProduct(productId: string) {
    return this.http.get(this.URL_DB + "/" + productId);

  }
  addProduct(product: any){
    return this.http.post<any>(this.URL_DB, product);
  }

  // Update an existing product
  updateProduct(productId: string, product: any){
    const url = `${this.URL_DB}/${productId}`;
    return this.http.put<any>(url, product);
  }

  // Delete a product by its ID
  deleteProduct(productId: string){
    const url = `${this.URL_DB}/${productId}`;
    return this.http.delete<any>(url);
  }

  // addWishlist(userId: string, productsId: string[]) {
  //   return this.http.post(this.URL_DB + "/" + userId, productsId);
  // }

  // updateWishlist(userId: string, productId: string) {
  //   return this.http.put(this.URL_DB + "/" + userId, productId);
  // }

}
