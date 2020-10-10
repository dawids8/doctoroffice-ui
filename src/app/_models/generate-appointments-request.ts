import {Schedule} from "./schedule";

export class GenerateAppointmentsRequest {

  doctorUsername: string;
  startDate: Date;
  endDate: Date;

  constructor(doctorUsername: string, startDate: Date, endDate: Date) {
    this.doctorUsername = doctorUsername;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
