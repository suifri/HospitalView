import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { 

  }

  login(email: string, password: string)
  {
    this.router.navigate(['/dashboard']);
  }

  logout(){
    //localStorage.setItem('user', 'null');
    this.router.navigate(['']);
  }

  isUserLoggedIn(){
    const user = JSON.parse(localStorage.getItem('user')!);
    //return user !== null ? true : false;
    return true;
  }
}
