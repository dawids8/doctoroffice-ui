export class Schedule {

  id: number;
  start: Date;
  finish: Date;
  appointmentDuration: number;
  intervalMinutes: number;
  weekDay: string


  constructor(id: number, start: Date, finish: Date, appointmentDuration: number, intervalMinutes: number, weekDay: string) {
    this.id = id;
    this.start = start;
    this.finish = finish;
    this.appointmentDuration = appointmentDuration;
    this.intervalMinutes = intervalMinutes;
    this.weekDay = weekDay;
  }
}
