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
  name !: string;
  mobile !: string;
  email !: string;
  gender !: string;
  id !: string;

  buttonName !: string;

  constructor(private fb : FormBuilder, @Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<EditPatientComponent>)
  {
    this.title = data.title;
    this.name = data.name;
    this.mobile = data.mobile;
    this.email = data.email;
    this.gender = data.gender;
    this.id = data.id;

    this.buttonName = data.buttonName;
  }

  ngOnInit(): void {
      this.form = this.fb.group({
        id: [this.id, []],
        name: [this.name, []],
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
