import { Injectable } from '@angular/core';
import { Patient } from '../model/patient';
import { HttpClient, HttpParams } from '@angular/common/http';
import { requestPatientDto } from '../model/requestPatientDto';
import { patientRegistrationDTO } from '../model/patientRegistrationDTO';

@Injectable({
  providedIn: 'root'
})
export class PatientDataService {

  constructor(private http: HttpClient) { }

  addPatient(patient: patientRegistrationDTO)
  {
    this.http.post('https://localhost:7065/Patient/AddByDto', patient).subscribe();
  }

  getAllPatients()
  {
    return this.http.get<Patient[]>('https://localhost:7065/patient/get');
  }

  updatePatient(patient: requestPatientDto)
  {
    return this.http.patch<Patient>('https://localhost:7065/Patient/Update', patient);
  }

  deletePatient(id: string)
  {
    return this.http.delete('https://localhost:7065/Patient/Delete?id=' + id);
  }

  getPatientById(id: string)
  {
      return this.http.get<Patient>('https://localhost:7065/Patient/GetById?id=' + id,);
  }

  getPatientByEmail(email: string)
  {
    return this.http.get<Patient>('https://localhost:7065/Patient/GetByEmail?email=' + email);
  }
}
