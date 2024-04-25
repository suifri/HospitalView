import { Injectable } from '@angular/core';
import { Doctor } from '../model/doctor';
import { HttpClient } from '@angular/common/http';
import { requestDoctorDTO } from '../model/requestDoctorDto';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public addDoctor(doctor : requestDoctorDTO)
  {
    return this.http.post('https://localhost:7065/Doctor/Add', doctor);
  }

  getAllDoctors(){
    return this.http.get<Doctor[]>('https://localhost:7065/Doctor/GetAll');
  }

  updateDoctor(doctor: requestDoctorDTO)
  {
    return this.http.patch('https://localhost:7065/Doctor/Update', doctor); 
  }

  deleteDoctor(id : string){
    return this.http.delete('https://localhost:7065/Doctor/Delete?id=' + id);
  }

  getDoctorById(id: string)
  {
    return this.http.get<Doctor>('https://localhost:7065/Doctor/GetById?id=' + id);
  }
}
