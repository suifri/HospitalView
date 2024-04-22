import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patient } from 'src/app/shared/model/patient';
import { DataService } from 'src/app/shared/service/data.service';
import { AddAppointmentComponent } from '../add-appointment/add-appointment.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {
      
  }

  patient !: Patient;

  constructor(public dialog: MatDialog, private dataApi: DataService, private _snackBar: MatSnackBar)
  {
  }

  addAppointment()
  {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: this.patient.id
    }

    const dialogRef = this.dialog.open(AddAppointmentComponent, dialogConfig);

    this.openSnackBar("Registration of appointment is successful.", "OK");
  }

  public openSnackBar(message: string, action: string)
{
  this._snackBar.open(message, action);
}

  getPatientInfo()
  {

  }
}
