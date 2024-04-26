import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appointmentRequestDto } from '../model/requestAppointmentDto';
import { appointment } from '../model/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentDataService {

  constructor(private http: HttpClient) { }

  getAllAppointmentsByEmail(email: string)
  {
    return this.http.get<appointment[]>('https://localhost:7065/Appointment/GetByDoctorEmail?email=' + email);
  }

  addAppointment(request: appointmentRequestDto)
  {
    this.http.post<appointmentRequestDto>('https://localhost:7065/Appointment/AddReal', request).subscribe();
  }
}
