import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  
  return true;
};

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService){}
}