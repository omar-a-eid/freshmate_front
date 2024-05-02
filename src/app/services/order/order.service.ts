import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  private URL_DB = "http://localhost:8000/api/orders/";

  GetAllOrders(token: string){
    return this.http.get(this.URL_DB + "admin" , {
      headers: {
        'Authorization': `Bearer ${token}`,
      }});
  }

  GetAllOrdersForUser(userId:number,token: string){
    return this.http.get(this.URL_DB +"user/" + userId , {
  headers: {
        'Authorization': `Bearer ${token}`,
      }});
  }

  UpdateOrder(orderId:string, status:any, token:string) {
    return this.http.put(this.URL_DB + orderId, status,{
      headers: {
            'Authorization': `Bearer ${token}`,
          }});
  }
  
  CreateOrder(status:string, token:any) {
    return this.http.post(this.URL_DB, status, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
  }


  DeleteOrder(orderId:string, token:string) {
    return this.http.delete(this.URL_DB + orderId, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
  }
}



