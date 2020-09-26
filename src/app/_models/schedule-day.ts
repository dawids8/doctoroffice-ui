export class ScheduleDay {

  weekDay: string
  start: string;
  finish: string;
  appointmentDuration: number;
  intervalMinutes: number;


  constructor(weekDay: string, start: string, finish: string, appointmentDuration: number, intervalMinutes: number) {
    this.weekDay = weekDay;
    this.start = start;
    this.finish = finish;
    this.appointmentDuration = appointmentDuration;
    this.intervalMinutes = intervalMinutes;
  }
}
