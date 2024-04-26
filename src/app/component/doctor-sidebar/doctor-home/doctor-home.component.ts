import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { appointment } from 'src/app/shared/model/appointment';
import { Doctor } from 'src/app/shared/model/doctor';
import { userSingleton } from 'src/app/shared/model/userSingleton';
import { AppointmentDataService } from 'src/app/shared/service/appointment-data.service';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit, AfterViewInit{

  appointmentsArr: appointment[] = [];

  displayedColumns: string[] = ['date', 'time', 'name'];

  user: userSingleton = userSingleton.getInstance();

  doctor!: Doctor; 

  dataSource !: MatTableDataSource<appointment>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private doctorHttp: DataService, private appointmentHttp: AppointmentDataService)
  {

  }

  ngOnInit(): void {

      this.appointmentHttp.getAllAppointmentsByEmail(this.user.email).subscribe(
        {
          next: (result) => {
            this.dataSource = new MatTableDataSource<appointment>(result);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }
      );
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  getAllAppointments(){
    this.dataSource = new MatTableDataSource(this.appointmentsArr);
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
}
