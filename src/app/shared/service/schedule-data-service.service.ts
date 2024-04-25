import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { schedule } from '../model/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleDataServiceService {

  constructor(private http: HttpClient) { }

  getAllSchedules()
  {
    return this.http.get<schedule[]>('https://localhost:7065/Doctor/GetAllSchedules');
  }
}
