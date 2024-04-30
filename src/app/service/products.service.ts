import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = 'http://localhost:8000/api/products'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get<any>(url);
  }

  // Fetch a product by its ID
  getProductById(productId: any): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<any>(url);
  }

  // Add a new product

}