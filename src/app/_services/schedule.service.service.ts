import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Schedule} from "../_models";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  public getSchedulesByDoctorId(username: string): Observable<Schedule[]> {
    const param = new HttpParams().set('username', username);
    return this.http.get<Schedule[]>('http://localhost:8081/schedule/getSchedule', {params: param});
  }
}
