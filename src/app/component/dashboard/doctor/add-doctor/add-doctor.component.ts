import { DataSource } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { department } from 'src/app/shared/model/department';
import { schedule } from 'src/app/shared/model/schedule';
import { DepartmentDataServiceService } from 'src/app/shared/service/department-data-service.service';
import { ScheduleDataServiceService } from 'src/app/shared/service/schedule-data-service.service';


@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  form !: FormGroup;
  title !: string;
  email !: string;
  department !: string;
  schedule !: string;
  birthdate !: Date;
  qualification !: string;
  specialization !: string;
  scheduledId !: string;
  empFName !: string;
  empLName !: string;
  dateJoining !: string;
  empType !: string;
  address !: string;
  ssn !: number;
  departmentId !: string;
  id !: string; 
  scheduleId !: string;
  


  buttonName !: string;

  departments : string[] = [];
  realDepartments: department[] = [];
  schedules: schedule[] = [];
  listSchedules: string[] = [];

  constructor(
    private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<AddDoctorComponent>,
    private departmentAPI : DepartmentDataServiceService,
    private scheduleAPI : ScheduleDataServiceService
  )
  {
    this.title = data.title;
    this.empFName = data.empFName;
    this.empLName = data.empLName;
    this.department = data.department;
    this.qualification = data.qualification;
    this.specialization = data.specialization;
    this.ssn = data.ssn;
    this.department = data.department;
    this.scheduleId = data.schedule;
    this.empType = data.empType;
    this.email = data.email;
    this.buttonName = data.buttonName;
    this.address = data.address;
    this.id = data.id;
    console.log(data.id);
  }

  ngOnInit(): void {
      this.form = this.fb.group({
        id: [this.id, []],
        empFName: [this.empFName, [Validators.required]],
        empLName: [this.empLName, [Validators.required]],
        email: [this.email, [Validators.required, Validators.email]],
        specialization: [this.specialization, [Validators.required]],
        department: [this.department, Validators.required],
        dateJoining: [this.dateJoining, [Validators.required]],
        qualification: [this.qualification, Validators.required],
        address: [this.address, Validators.required],
        ssn: [this.ssn, Validators.required],
        departmentId:[this.departmentId, []],
        scheduleId: [this.scheduleId, []],
        empType: [this.empType, []]
      })

      this.form.get('scheduleId')?.setValue(this.scheduleId);
      this.form.get('department')!.setValue(this.department);

      this.departmentAPI.getAllDepartments().subscribe({
        next: (result) => {
          if (result !== undefined) {
            this.realDepartments = result;
            this.departments = this.realDepartments.map(x => x.deptName);
          }
        },
        error: (error) => console.log(error)
      });

      this.scheduleAPI.getAllSchedules().subscribe(
        {
          next: (result) => {
            if (result !== undefined) {
              this.schedules = result;
              this.listSchedules = this.schedules.map(x => x.startHour + ' ' + x.endHour);
            }
          },
          error: (error) => console.log(error)
        }
      );
      

  }

  public cancelRegistration() : void
  {
    this.dialogRef.close();
  }

  public registerDoctor(): void
  {
    this.form.value.departmentId = this.realDepartments.find(x => x.deptName == this.form.value.department)?.id;
    this.form.value.scheduleId = this.schedules.find(x => (x.startHour + ' ' + x.endHour) == this.form.value.scheduleId)?.id;

    this.dialogRef.close(this.form.value);
  }
}
