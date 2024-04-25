import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {

  form !: FormGroup;
  title !: string;
  fName !: string;
  lName !: string;
  mobile !: string;
  email !: string;
  gender !: string;
  admissionDate !: string;
  id !: string;

  buttonName !: string;

  constructor(private fb : FormBuilder, @Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<EditPatientComponent>)
  {
    this.title = data.title;
    this.fName = data.fName;
    this.lName = data.lName;
    this.mobile = data.mobile;
    this.email = data.email;
    this.gender = data.gender;
    this.admissionDate = data.admissionDate;
    this.id = data.id;

    this.buttonName = data.buttonName;
  }

  ngOnInit(): void {
      this.form = this.fb.group({
        id: [this.id, [Validators.required]],
        firstName: [this.fName, [Validators.required]],
        lastName: [this.lName, [Validators.required]],
        mobile: [this.mobile, [Validators.required]],
        email: [this.email,[Validators.required]],
        gender: [this.gender, [Validators.required]],
        admissionDate: [this.admissionDate, [Validators.required]]
      })
  }

  cancelEditing()
  {
    this.dialogRef.close();
  }

  updatePatient()
  {
    this.dialogRef.close(this.form.value);
  }
}
