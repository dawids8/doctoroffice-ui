import {AfterViewChecked, Component, ElementRef, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ScheduleService} from "../_services/schedule.service";
import {GenerateAppointmentsRequest, Schedule, ScheduleDay, User} from "../_models";
import {AuthenticationService} from "../_services";
import {Subscription} from "rxjs";
import {UpdateScheduleRequest} from "../_models/update-schedule-request";
import {DateRange} from "@angular/material/datepicker";
import {AppointmentsService} from "../_services/appointments.service";

@Component({
  selector: 'app-doctor-scheduler',
  templateUrl: './doctor-scheduler.component.html',
  styleUrls: ['./doctor-scheduler.component.css']
})
export class DoctorSchedulerComponent implements OnInit {

  schedules: Schedule[];
  currentUser: User;
  currentUserSubscription: Subscription;
  generateStart: Date;
  generateEnd: Date;
  currentDate: Date;

  constructor(private scheduleService: ScheduleService, private appointmentService: AppointmentsService, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.getSchedulesByDoctorId(this.currentUser.username);
  }

  getSchedulesByDoctorId(username: string): void {
    this.scheduleService.getSchedulesByDoctorUsername(username).subscribe(response => {
      this.schedules = response;
    });
  }

  onClickSave() {
    const updateScheduleRequest = new UpdateScheduleRequest(this.currentUser.username, this.schedules);
    this.scheduleService.updateSchedules(updateScheduleRequest).subscribe(response => {
      this.schedules = response;
    });
  }

  onClickGenerateAppointments() {
    const generateAppointmentsRequest = new GenerateAppointmentsRequest(this.currentUser.username, this.generateStart, this.generateEnd);
    this.appointmentService.generateAppointments(generateAppointmentsRequest).subscribe();
  }
}
