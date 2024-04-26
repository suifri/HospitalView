import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { Doctor } from 'src/app/shared/model/doctor';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit{

  form !: FormGroup;
  date!: string;
  time!: string;
  patientId!: string;
  doctorId!: string;

  myControl = new FormControl('');
  doctors: Doctor[] = [];
  doctorName!: string;

  hourOfAppointment!: string;
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  constructor(private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<AddAppointmentComponent>, private docApi: DataService)
  {
    this.patientId = data.id;
    
    this.form = this.fb.group({
      date: [this.date],
      doctorName: [this.doctorName],
      hourOfAppointment: [this.hourOfAppointment]
    })
  }

  today = new Date();

  ngOnInit(): void {
      
    this.docApi.getAllDoctors().subscribe((data: Doctor[]) => {
      this.doctors = data;
      console.log(data);
      this.options = this.doctors.map(item => item.empFName + ' ' + item.empLName);
      console.log(this.options);
      this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value || '')),);
    });

  }

  private _filter(value: string) : string[]
  {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  trackByFn(index: number, option: any): any {
    return option;
  }

  cancelRegistration()
  {
    this.dialogRef.close();
  }

  registerAppointment()
  {

    // this.doctorId = this.doctors.find(option => (option.empFName + ' ' + option.empLName) == this.form.value.doctorName)!.id;

    // this.form.value.doctorId = this.doctorId;
    console.log(this.form.value);
    this.dialogRef.close(this.form.value);
  }
}
