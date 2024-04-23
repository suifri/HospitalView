import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/shared/model/patient';
import { PatientDataService } from 'src/app/shared/service/patient-data.service';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit{

  id !: string;
  patientObj !: Patient;

  constructor(private route : ActivatedRoute, private dataApi: PatientDataService)
  {
    this.id = route.snapshot.paramMap.get('id') as string;
  }

  ngOnInit(): void {
      this.getDoctorById();
  }

  getDoctorById(){
    this.dataApi.getPatientById(this.id).subscribe(
      (data: Patient) => this.patientObj = data
    );
   
  }
}
