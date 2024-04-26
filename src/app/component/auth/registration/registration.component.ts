import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  duration : string = '2000';
  conditions: string[] = ['Stable', "Critical", "Deteriorating", "Improving", "Post-operative", "Chronic", "Rehabilitation"];
  bloodTypes: string[] = ['A', 'O', 'B', 'AB'];

  firstFormGroup !: FormGroup;
  secondFormGroup !: FormGroup;
  thirdFormGroup !: FormGroup;

  title !: string;

  fName!: string;
  lName!: string;
  mobile !: string;
  email !: string;
  password!: string;
  gender !: string;

  condition!: string;
  bloodType!: string;
  rhesus!: string;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<RegistrationComponent>, @Inject(MAT_DIALOG_DATA) data: any)
  {
    this.title = data.title;
  }

  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      fName: [this.fName,[Validators.required]],
      lName: [this.lName, [Validators.required]],
      email: [this.email, [Validators.required, Validators.email]],
      password: [this.password, [Validators.required]],
      gender: [this.gender, [Validators.required]],
      mobile: [this.mobile, [Validators.required]]
    });

    this.secondFormGroup = this.fb.group({
      condition: [this.condition, [Validators.required]],
      bloodType: [this.bloodType, [Validators.required]],
      rhesus: [this.rhesus, Validators.required]
    });
  }

  signUp()
  {
    console.log({...this.firstFormGroup.value, ...this.secondFormGroup.value});

    this.dialogRef.close({...this.firstFormGroup.value, ...this.secondFormGroup.value});//add return value
  }

  cancelResgistration()
  {
    this.dialogRef.close();
  }
}
