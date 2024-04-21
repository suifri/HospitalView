import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-patient',
  templateUrl: './delete-patient.component.html',
  styleUrls: ['./delete-patient.component.css']
})
export class DeletePatientComponent implements OnInit{

  patientName !: string;
  title !: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<DeletePatientComponent>)
  {
    this.patientName = data.patientName;
    this.title = data.title;
  }

  ngOnInit(): void {
      
  }

  delete()
  {
    const deletePatient = true;
    this.dialogRef.close(deletePatient);
  }

  close()
  {
    this.dialogRef.close();
  }
}
