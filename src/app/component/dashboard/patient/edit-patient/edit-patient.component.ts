import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
        id: [this.id, []],
        firstName: [this.fName, []],
        lastName: [this.lName, []],
        mobile: [this.mobile, []],
        email: [this.email,[]],
        gender: [this.gender, []]
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
