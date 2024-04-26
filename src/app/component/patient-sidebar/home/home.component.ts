import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patient } from 'src/app/shared/model/patient';
import { DataService } from 'src/app/shared/service/data.service';
import { AddAppointmentComponent } from '../add-appointment/add-appointment.component';
import { PatientDataService } from 'src/app/shared/service/patient-data.service';
import { userSingleton } from 'src/app/shared/model/userSingleton';
import { appointmentRequestDto } from 'src/app/shared/model/requestAppointmentDto';
import { AppointmentDataService } from 'src/app/shared/service/appointment-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {
    this.dataApi.getPatientByEmail(this.user.email).subscribe((data: Patient) => 
      {
      this.patient = data;
      console.log(this.patient);
      }
    );
  }

  patient !: Patient;
  user: userSingleton = userSingleton.getInstance();

  constructor(public dialog: MatDialog, private dataApi: PatientDataService, private _snackBar: MatSnackBar, private http: AppointmentDataService)
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

    dialogRef.afterClosed().subscribe(data => 
      {
        console.log(data);
        let appointment: appointmentRequestDto ={
          doctorName: data.doctorName,
          patientEmail: this.patient.email,
          time: "" + data.hourOfAppointment + "",
          date: (data.date as Date).getFullYear().toString() + '/' + (data.date as Date).getMonth().toString() + '/' + (data.date as Date).getDay().toString()
        };
        console.log(appointment);
        this.http.addAppointment(appointment);
        this.openSnackBar("Registration of appointment is successful.", "OK");
  } );

  }

  public openSnackBar(message: string, action: string)
{
  this._snackBar.open(message, action);
}

  getPatientInfo()
  {

  }
}
