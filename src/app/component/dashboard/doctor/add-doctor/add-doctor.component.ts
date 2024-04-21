import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  form !: FormGroup;
  title !: string;
  name !: string;
  mobile !: string;
  email !: string;
  gender !: string;
  department !: string;
  birthdate !: Date;
  qualification !: string;
  id !: string; 

  buttonName !: string;

  departments : string[] = ["Cardiology"];

  constructor(
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<AddDoctorComponent>
  )
  {
    this.title = data.title;
    this.name = data.name;
    this.mobile = data.mobile;
    this.gender = data.gender;
    this.department = data.department;
    this.qualification = data.qualification;
    this.email = data.email;
    this.buttonName = data.buttonName;
  }

  ngOnInit(): void {
      this.form = this.fb.group({
        id: [this.id, []],
        name: [this.name, [Validators.required]],
        mobile: [this.mobile, [Validators.required, Validators.maxLength(12), Validators.minLength(10)]],
        email: [this.email, [Validators.required, Validators.email]],
        gender: [this.gender, [Validators.required]],
        department: [this.department, Validators.required],
        birthdate: ['', [Validators.required]],
        qualification: [this.qualification, Validators.required]
      })
  }

  public cancelRegistration() : void
  {
    this.dialogRef.close();
  }

  public registerDoctor(): void
  {
    this.dialogRef.close(this.form.value);
  }
}
