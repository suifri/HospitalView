import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/service/auth.service';
import { userSingleton } from './shared/model/userSingleton';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'HospitalView';

  userLoggedIn !: string;

  isAdmin!: boolean;

  admin: string = 'administrator';
  patient: string = 'patient';
  doctor: string = 'doctor';

  test: userSingleton = userSingleton.getInstance();

  constructor(private authApi : AuthService)
  {

  }

  ngOnInit(): void {
      let user = userSingleton.getInstance();
      console.log(user.role);
      this.isAdmin = (user.role == 'administrator');
  }

}
