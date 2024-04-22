import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { Doctor } from 'src/app/shared/model/doctor';

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

  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  constructor(private fb : FormBuilder,
    @Inject(MAT_DIALOG_DATA) data : any,
    private dialogRef : MatDialogRef<AddAppointmentComponent>)
  {
    this.patientId = data.id;
  }

  ngOnInit(): void {
      
    this.options = this.doctors.map(item => item.empFName + ' ' + item.empLName);

    this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map(value => this._filter(value || '')),);

    this.form = this.fb.group({
      date:[this.date],
      time:[this.time],
      patientId:[this.patientId],
      doctorId: [this.doctorId],
      doctorName: [this.doctorName]
    })
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

    this.doctorId = this.doctors.find(option => (option.empFName + ' ' + option.empLName) == this.form.value.doctorName)!.id;

    this.form.value.doctorId = this.doctorId;
    this.dialogRef.close(this.form.value);
  }
}
