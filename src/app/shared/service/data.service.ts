import { Injectable } from '@angular/core';
import { Doctor } from '../model/doctor';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public addDoctor(doctor : Doctor) : void
  {

  }

  getAllDoctors(){
    
  }

  updateDoctor(doctor: Doctor)
  {
    return; //add doctor update
  }

  deleteDoctor(id : string){
    //add doctor deletin
  }

  getDoctorById(id: string)
  {
     let test: Doctor = {
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
    return test;
  }
}
