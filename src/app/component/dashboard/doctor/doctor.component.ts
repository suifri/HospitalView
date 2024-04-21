import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { DataService } from 'src/app/shared/service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Doctor } from 'src/app/shared/model/doctor';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { DeleteDoctorComponent } from './delete-doctor/delete-doctor.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})

export class DoctorComponent implements OnInit, AfterViewInit {

  doctorsArr : Doctor[] = [];

  test: Doctor = {
    id: '24facuca',
    qualifications: "MBSS",
    specialization: "Cardiologist",
    scheduleId: 'feyahfa23',
    empFName: 'Illia',
    empLName: 'Khveshchuk',
    email: 'illia@gmail.com',
    address: 'Lukasha 5',
    SSN: 'fgsilvha',
    departmentId: 'afytfyia' 
  }

  displayedColumns: string[] = ['name', 'mobile', 'email', 'department', 'gender', 'action'];
  dataSource !: MatTableDataSource<Doctor>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(public dialog: MatDialog, private dataApi : DataService, private _snackBar: MatSnackBar) 
{}

ngOnInit(): void {

  this.dataSource = new MatTableDataSource(this.doctorsArr);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.doctorsArr.push(this.test);
}

ngAfterViewInit(): void{
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

addDoctor()
{
  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
    title : 'Register doctor',
    buttonName: 'Register'
  }

  const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(data => {
    if(data){
      this.dataApi.addDoctor(data);
      this.openSnackBar("Registration of doctor is successful.", "OK")
    }
  } )
}

getAllDoctors(){


  this.dataSource = new MatTableDataSource(this.doctorsArr);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

public applyFilter(event: Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if(this.dataSource.paginator)
    {
      this.dataSource.paginator.firstPage();
    }
}

public openSnackBar(message: string, action: string)
{
  this._snackBar.open(message, action);
}

public editDoctor(row : any){

  if(row.id == null)
    return;

  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = row;
  dialogConfig.data.title = 'Edit doctor';
  dialogConfig.data.buttonName = 'Update';
  //dialogConfig.data.birthdate = row.birthdate.toDate();

  const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig);

  //dialogRef.afterClosed() --add updating doctor by API
}

deleteDoctor(row : any)
{
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.autoFocus = true;

  dialogConfig.data = {
    title: 'Delete doctor',
    buttonName: 'Delete',
    doctorName: row.name
  }

  const dialogRef = this.dialog.open(DeleteDoctorComponent, dialogConfig);
}

viewDoctor(row : any)
{
  window.open('/dashboard/doctor/' + row.id,'_blank');
}

}
