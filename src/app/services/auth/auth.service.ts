import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSession: any;
  user:any;
  
  constructor() { 
    this.userSession = sessionStorage.getItem("user");
    this.user = JSON.parse(this.userSession);
  }

  isLoggedIn() {
    if(this.user) return true;

    return false;
  }

  isAdmin() {
    if(this.user) {
      if(this.user.userId == "661f932c4c1b91f4ec7cce36") return true
    }
    return false;
  }
}
