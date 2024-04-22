import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { appointment } from 'src/app/shared/model/appointment';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit, AfterViewInit{

  appointmentsArr: appointment[] = [];

  displayedColumns: string[] = ['date', 'time', 'patientName'];

  dataSource !: MatTableDataSource<appointment>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor()
  {

  }

  ngOnInit(): void {
      this.dataSource = new MatTableDataSource(this.appointmentsArr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
