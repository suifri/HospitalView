import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './component/dashboard/patient/patient.component';
import { DoctorComponent } from './component/dashboard/doctor/doctor.component';
import { LoginComponent } from './component/auth/login/login.component';
import { ViewDoctorComponent } from './component/dashboard/doctor/view-doctor/view-doctor.component';
import { ViewPatientComponent } from './component/dashboard/patient/view-patient/view-patient.component';
import { AuthguardGuard } from './shared/guard/authguard.guard';
import { HomeComponent } from './component/patient-sidebar/home/home.component';
import { BillsComponent } from './component/patient-sidebar/bills/bills.component';
import { DoctorHomeComponent } from './component/doctor-sidebar/doctor-home/doctor-home.component';
import { SidebarComponent } from './component/dashboard/sidebar/sidebar.component';

const routes: Routes = [
  {path: 'doctorDashboard', children:[
    {path: 'home', component: DoctorHomeComponent}
  ]},
  {path: 'patientDashboard', children:[
    {path:'home', component: HomeComponent},
    {path:'bills', component: BillsComponent}
  ]},
{path: 'dashboard', children: [
  {path: '', component: SidebarComponent},
  {path: 'patient', component: PatientComponent},
  {path: 'patient/:id', component: ViewPatientComponent},
  {path: 'doctor', component: DoctorComponent},
  {path: 'doctor/:id', component: ViewDoctorComponent}
] , canActivate: [AuthguardGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
