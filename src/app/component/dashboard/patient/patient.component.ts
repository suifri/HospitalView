import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/shared/model/patient';
import { PatientDataService } from 'src/app/shared/service/patient-data.service';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { DeletePatientComponent } from './delete-patient/delete-patient.component';
import { requestPatientDto } from 'src/app/shared/model/requestPatientDto';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit, AfterViewInit{

  patientsArr : Patient[] = [];

  displayedColumns: string[] = ['name', 'email', 'gender', 'phone', 'condition', 'diagnosis', 'action'];
  dataSource !: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(public dialog : MatDialog, private dataApi: PatientDataService, private _snackBar: MatSnackBar)
  {


  }

  ngOnInit(): void {

      this.dataApi.getAllPatients().subscribe({
        next: (result) => {
          this.dataSource = new MatTableDataSource<Patient>(result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => console.error(error)
      }
      );

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllPatients()
  {
    this.dataApi.getAllPatients().subscribe({
      next: (result) => {
        this.dataSource = new MatTableDataSource<Patient>(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => console.error(error)
    }
    );
  }

  applyFilter(event: Event)
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator)
      {
        this.dataSource.paginator.firstPage();
      }
  }

  editPatient(row : any)
  {
    if(row.id == null)
      return;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = 'Edit patient';
    dialogConfig.data.buttonName = 'Update';
    dialogConfig.data.fName = row.patientFName;
    dialogConfig.data.lName = row.patientLName;
    dialogConfig.data.mobile = row.phone;
    dialogConfig.data.gender = (row.gender as string).toLowerCase();

    const dialogRef = this.dialog.open(EditPatientComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {

      console.log(data);
      let updatedPatient: requestPatientDto = {
        id: data.id,
        patientFName: data.firstName,
        patientLName: data.lastName,
        phone: data.mobile,
        gender: data.gender,
        admissionDate: data.admissionDate,
        email: data.email
      };
      console.log(updatedPatient);
      this.dataApi.updatePatient(updatedPatient).subscribe(() => this.getAllPatients());
      this.openSnackBar("Patient updated successfully.", "OK");
    }
      
    );
  }

  deletePatient(row : any)
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Delete patient',
      buttonName: 'Delete',
      patientName: row.name
    }

    const dialogRef = this.dialog.open(DeletePatientComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.dataApi.deletePatient(row.id).subscribe(() => this.getAllPatients());
      this.openSnackBar("Patient deleted successfully.", "OK");
    });
  }

  viewPatient(row : any)
  {
    window.open('/dashboard/patient/' + row.id, '_blank');
  }

  public openSnackBar(message: string, action: string)
  {
    this._snackBar.open(message, action);
  }
}
