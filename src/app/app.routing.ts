import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './login/login.component';
import {DoctorDashboardComponent} from './doctor-dashboard/doctor-dashboard.component';
import {PatientDashboardComponent} from './patient-dashboard/patient-dashboard.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './_helpers/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'doctordashboard', component: DoctorDashboardComponent, canActivate: [AuthGuard] },
  { path: 'patientdashboard', component: PatientDashboardComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
