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
import { requestDoctorDTO } from 'src/app/shared/model/requestDoctorDto';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})

export class DoctorComponent implements OnInit, AfterViewInit {

  doctorsArr : Doctor[] = [];


  displayedColumns: string[] = ['name', 'specialization', 'qualification', 'email', 'address', 'action'];
  dataSource !: MatTableDataSource<Doctor>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(public dialog: MatDialog, private dataApi : DataService, private _snackBar: MatSnackBar) 
{}

ngOnInit(): void {

  this.dataApi.getAllDoctors().subscribe({
    next: (result) => {
      this.dataSource = new MatTableDataSource<Doctor>(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error: (error) => console.error(error)
  });
   
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

      let test: requestDoctorDTO ={
        departmentID: data.departmentId,
        empFName: data.empFName,
        empLName: data.empLName,
        email: data.email,
        specialization: data.specialization,
        dateJoining: (data.dateJoining as Date).getFullYear().toString() + '/' + 
        (data.dateJoining as Date).getMonth().toString() + '/' + (data.dateJoining as Date).getDay().toString(),
        qualifications: data.qualification,
        address: data.address,
        ssn: data.ssn,
        empType: data.empType,
        scheduleId: data.scheduleId
      };

      this.dataApi.addDoctor(test).subscribe(r => {});
      this.getAllDoctors();
      this.openSnackBar("Registration of doctor is successful.", "OK")
    }
  } )
}

getAllDoctors(){

  this.dataApi.getAllDoctors().subscribe({
    next: (result) => {
      this.dataSource = new MatTableDataSource<Doctor>(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    error: (error) => console.error(error)
  });

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

  const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(data=>{
    let test: requestDoctorDTO ={
      departmentID: data.departmentId,
      empFName: data.empFName,
      empLName: data.empLName,
      email: data.email,
      specialization: data.specialization,
      dateJoining: (data.dateJoining as Date).getFullYear().toString() + '/' + 
      (data.dateJoining as Date).getMonth().toString() + '/' + (data.dateJoining as Date).getDay().toString(),
      qualifications: data.qualification,
      address: data.address,
      ssn: data.ssn.toString(),
      empType: data.empType,
      scheduleId: data.scheduleId,
      Id: data.id
    };
    console.log(test);
    this.dataApi.updateDoctor(test).subscribe();
    this.openSnackBar("Updating of doctor is successful.", "OK")
  });
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

  dialogRef.afterClosed().subscribe(data => {
    this.dataApi.deleteDoctor(row.id).subscribe(() => this.getAllDoctors());
    this.openSnackBar("Doctor deleted successfully.", "OK");
  });
}

viewDoctor(row : any)
{
  window.open('/dashboard/doctor/' + row.id,'_blank');
}

}
