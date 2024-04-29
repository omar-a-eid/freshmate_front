import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  private URL_DB = "http://localhost:8000/api/orders/";

  // GetAllOrders(){
  //   return(this.http.get(this.URL_DB + "admin"))
  //   // headers: {
  //   //   'Authorization': `Bearer ${token}`,
  //   // }
  // }

  // GetAllOrdersForUser(userId:number){
  //   return(this.http.get(this.url_DB +"/"+ id ))
  // headers: {
  //     'Authorization': `Bearer ${token}`,
  //   }
  // }

  // GetOrdersById(userId: String) {
  //   return (this.http.get(this.URL_DB + userId))
  //   headers: {
  //     'Authorization': `Bearer ${token}`,
  //       }
  // }


  // CreateOrder(body: any) {
  //   return (this.http.post(this.URL_DB, body))
  //   headers: {
  //     'Authorization': `Bearer ${token}`,
  //         }
  // }


  // DeleteOrder(userId: String) {
  //   return (this.http.delete(this.URL_DB + userId))
  //   headers: {
  //     'Authorization': `Bearer ${token}`,
  //             }
  // }


  // UpdateOrders(userId: String, body: any) {
  //   return (this.http.put(this.URL_DB + userId, body))
  //   headers: {
  //     'Authorization': `Bearer ${token}`,
  //                 }
  // }


  // GetWishlist(userId: string, token: string) {
  //   return this.http.get(this.URL_DB + "/" + userId, {
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //     }
  //   });
  // }


}



