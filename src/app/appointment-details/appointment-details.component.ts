import {Component, Input, OnInit} from '@angular/core';
import {Appointment} from "../_models";

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {
  @Input() appointment: Appointment;

  constructor() { }

  ngOnInit(): void {
    console.log(this.appointment);
  }

  onDelete() {
    console.log('Usuwam appointement od id ' + this.appointment.id );
    //strzelic delete na backend z tym id
  }
}
