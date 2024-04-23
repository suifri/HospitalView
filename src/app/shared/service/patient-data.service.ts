import { Injectable } from '@angular/core';
import { Patient } from '../model/patient';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientDataService {

  constructor(private http: HttpClient) { }

  addPatient()
  {

  }

  getAllPatients()
  {
    return this.http.get<Patient[]>('https://localhost:7065/patient/get');
  }

  updatePatient(patient: Patient)
  {
    return this.http.put<Patient>('https://localhost:7065/Patient/Update', patient);
  }

  deletePatient(id: string)
  {
    return this.http.delete('https://localhost:7065/Patient/Delete?id=' + id);
  }

  getPatientById(id: string)
  {
      return this.http.get<Patient>('https://localhost:7065/Patient/GetById?id=' + id,);
  }
}
