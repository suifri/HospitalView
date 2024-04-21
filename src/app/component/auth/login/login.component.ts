import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/service/auth.service';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form !: FormGroup;
  email !: string;
  password !: string;

  constructor(private authService: AuthService, private fb : FormBuilder, private dialog: MatDialog)
  {
    this.form = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: [this.password, [Validators.required]]
    });
  }

  ngOnInit(): void {
      
  }

  login(){
    this.authService.login(this.form.value.email, this.form.value.password);
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

    //add afterClosed effect
  }
}
