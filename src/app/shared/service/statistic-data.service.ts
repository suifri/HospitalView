import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { patientStats } from '../model/patientStat';

@Injectable({
  providedIn: 'root'
})
export class StatisticDataService {

  constructor(private http: HttpClient) { }

  getStatByYear(year: number)
  {
    return this.http.get<patientStats[]>('https://localhost:7065/api/File?year=' + year);
  }
}
