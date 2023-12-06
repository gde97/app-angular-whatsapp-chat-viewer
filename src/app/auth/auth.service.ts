import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean

  constructor() {
    this.isLoggedIn = false
  }

  isAuthenticated(){
    return this.isLoggedIn
  }

}
