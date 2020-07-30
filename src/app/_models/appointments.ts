import {Patient} from "./patient";
import {Doctor} from "./doctor";

export class Appointment {
  id: number;
  date: Date;
  diagnosis: string;
  prescription: string;
  doctor: Doctor;
  patient: Patient;
  appointmentStatus: string;
}
