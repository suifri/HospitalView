import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { department } from '../model/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentDataServiceService {

  constructor(private http: HttpClient) { }

  getAllDepartments()
  {
    return this.http.get<department[]>('https://localhost:7065/Doctor/GetAllDepartments');
  }
}
