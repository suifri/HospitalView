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

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit, AfterViewInit{

  patientsArr : Patient[] = [];

  displayedColumns: string[] = ['name', 'email', 'gender', 'action'];
  dataSource !: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  test: Patient = {
    id: 'vsdvabbv',
    patientFName: 'Illia',
    patientLName: 'Khveshchuk',
    phone: '39287587325',
    bloodType: 'AA',
    email: 'Illia@gmail.com',
    gender: 'male',
    condition: 'critical',
    diagnosis: 'COVID-19',
    rhesus: true
  };

  constructor(public dialog : MatDialog, private dataApi: PatientDataService, private _snackBar: MatSnackBar)
  {}

  ngOnInit(): void {
      this.dataSource = new MatTableDataSource(this.patientsArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.patientsArr.push(this.test);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllPatients()
  {
      this.dataSource = new MatTableDataSource(this.patientsArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

    const dialogRef = this.dialog.open(EditPatientComponent, dialogConfig);

    //dialogRef.afterClosed() --add updating patient by ID
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
