import {Schedule} from "./schedule";

export class UpdateScheduleRequest {

  username: string;
  schedules: Schedule[];

  constructor(username: string, schedules: Schedule[]) {
    this.username = username;
    this.schedules = schedules;
  }
}
