import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private readonly http:HttpClient) {}

  private readonly URL_DB = "http://localhost:8000/api/users"

  login(user: any) {
    return this.http.post(this.URL_DB +"/login", user);
  }
  signup(newUser: any) {
    return this.http.post(this.URL_DB +"/signup", newUser);
  }
  signout() {
    sessionStorage.removeItem("user");
  }
  update(userId: string, token: string, editedUser:any) {//userid    token   editeduser 
    return this.http.put(this.URL_DB +"/"+ userId, editedUser,{
      headers: {
            'Authorization': `Bearer ${token}`,
          }});
  }
  getUsersById(userId:number,token: string){
    return this.http.get(this.URL_DB + "/" + userId , {
  headers: {
        'Authorization': `Bearer ${token}`,
      }});
  }


}
