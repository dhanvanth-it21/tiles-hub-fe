import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    console.log("AuthGuard activated");
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      setTimeout(() => this.router.navigate(['login']), 0); // Ensuring navigation happens properly
      return false;
    }
  }
}
