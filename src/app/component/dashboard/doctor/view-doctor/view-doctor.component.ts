import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/shared/model/doctor';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent implements OnInit{

  id !: string;
  doctorObj !: Doctor;

  constructor(private route : ActivatedRoute, private dataApi: DataService)
  {
    this.id = route.snapshot.paramMap.get('id') as string;
  }

  ngOnInit(): void {
      this.getDoctorById();
  }

  getDoctorById(){
      this.dataApi.getDoctorById(this.id).subscribe(
        (data: Doctor) => this.doctorObj = data
      );
  }

}
