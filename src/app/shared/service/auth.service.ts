import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { login } from '../model/login';
import { role } from '../model/roleResponse';
import { userSingleton } from '../model/userSingleton';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userRole!: string;

  constructor(private router: Router, private http: HttpClient) { 

  }

  login(userLogin: login)
  {
    console.log(userLogin);

    this.http.post('https://localhost:7065/Account/LoginByModel', userLogin).subscribe(data => {
      let role: role = (data as role);
      this.userRole = role.role;
      let userSingleton_: userSingleton = userSingleton.getInstance();
      userSingleton_.email = userLogin.email;
      userSingleton_.role = role.role;

      if(role.role == 'administrator')
        this.router.navigate(['/dashboard']);
      if(role.role == 'patient')
        this.router.navigate(['/patientDashboard']);
      if(role.role == 'doctor')
        this.router.navigate(['/doctorDashboard']);
    });

  }

  logout(){
    //localStorage.setItem('user', 'null');
    this.router.navigate(['']);
  }

  isUserLoggedIn(){
    console.log(this.userRole);
    return this.userRole;
  }
}
