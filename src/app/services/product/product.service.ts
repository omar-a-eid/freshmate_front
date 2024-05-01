import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  private readonly URL_DB = 'http://localhost:8000/api/products';

  // token:any=JSON.parse(sessionStorage.getItem("user") as string);

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
 
  addProduct(product: any, token:string){
    return this.http.post<any>(this.URL_DB, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Update an existing product
  updateProduct(productId: string, product: any , token:string){
    const url = `${this.URL_DB}/${productId}`;
    return this.http.put<any>(url,product,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Delete a product by its ID
  deleteProduct(productId: string , token:string){
    const url = `${this.URL_DB}/${productId}`;
    return this.http.delete<any>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

}
