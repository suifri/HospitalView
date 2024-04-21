import { Injectable } from '@angular/core';
import { Patient } from '../model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientDataService {

  constructor() { }

  addPatient()
  {

  }

  getAllPatients()
  {

  }

  updatePatient()
  {

  }

  deletePatient()
  {

  }

  getPatientById(id: string)
  {
      let test: Patient = {
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

    return test;
  }
}
