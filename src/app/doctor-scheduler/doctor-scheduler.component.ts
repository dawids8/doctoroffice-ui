import { Component, OnInit } from '@angular/core';
import {ScheduleService} from "../_services/schedule.service.service";
import {Schedule, User} from "../_models";
import {AuthenticationService} from "../_services";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-doctor-scheduler',
  templateUrl: './doctor-scheduler.component.html',
  styleUrls: ['./doctor-scheduler.component.css']
})
export class DoctorSchedulerComponent implements OnInit {

  schedules: Schedule[];
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(private scheduleService: ScheduleService, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    this.getSchedulesByDoctorId(this.currentUser.username);
  }

  getSchedulesByDoctorId(username: string): void {
    this.scheduleService.getSchedulesByDoctorId(username).subscribe(response => {
      this.schedules = response;
      console.log(this.schedules);
    });
  }
}
