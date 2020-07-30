import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Appointment} from "../_models";

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  constructor(private http: HttpClient) { }

  public getAllAppointmentsByDoctorUsername(username: string): Observable<Appointment[]> {
    const param = new HttpParams().set('username', username);
    return this.http.get<Appointment[]>('http://localhost:8081/appointment/getAllByDoctorUsername', {params: param});
  }
}
