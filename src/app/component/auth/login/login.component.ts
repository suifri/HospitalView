import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/service/auth.service';
import { RegistrationComponent } from '../registration/registration.component';
import { Route, Router } from '@angular/router';
import { login } from 'src/app/shared/model/login';
import { patientRegistrationDTO } from 'src/app/shared/model/patientRegistrationDTO';
import { PatientDataService } from 'src/app/shared/service/patient-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form !: FormGroup;
  email !: string;
  password !: string;

  constructor(private authService: AuthService, private fb : FormBuilder, private dialog: MatDialog, private router: Router, private http: PatientDataService)
  {
    this.form = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: [this.password, [Validators.required]]
    });
  }

  ngOnInit(): void {
      
  }

  login(){

    let log: login = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.authService.login(log);
  }

  register()
  {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Registration'
    }

    const dialogRef = this.dialog.open(RegistrationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe( data => {
      console.log(data);
      let pat: patientRegistrationDTO = {
        bloodType: data.bloodType,
        patientFName: data.fName,
        patientLName: data.lName,
        email: data.email,
        password: data.password,
        gender: data.gender,
        condition: data.condition,
        phone: data.mobile,
        rhesus: (data.rhesus as string) == 'positive'
      };

      this.http.addPatient(pat);
    }
      
    );

    //add afterClosed effect
  }
}
