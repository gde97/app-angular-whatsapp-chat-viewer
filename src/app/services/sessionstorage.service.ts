import { Injectable } from '@angular/core';
import { User } from '../dataStructure';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  saveUser(user: User){
    sessionStorage.setItem('user', JSON.stringify(user))
  }

  getUser(){
    let user = sessionStorage.getItem('user')
    if (user != null){
      return JSON.parse(user)
    }
    return null;
  }

  clearAll(){
    sessionStorage.clear();
  }

}
