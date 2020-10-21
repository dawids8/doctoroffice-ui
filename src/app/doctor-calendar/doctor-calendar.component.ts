import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, OnInit, OnDestroy,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import {Subject, Subscription} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {Appointment, User} from "../_models";
import {AppointmentsService} from "../_services/appointments.service";
import {AuthenticationService} from "../_services";
import {AppointmentDetailsComponent} from "../appointment-details/appointment-details.component";

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-doctor-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './doctor-calendar.component.html',
  styleUrls: ['./doctor-calendar.component.css']
})
export class DoctorCalendarComponent implements OnInit, OnDestroy {

  currentUser: User;
  currentUserSubscription: Subscription;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = true;
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[];

  constructor(private modalService: NgbModal, private authenticationService: AuthenticationService, private appointmentsService: AppointmentsService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    this.loadAppointmentsByDoctorUsername(this.currentUser.username);
  }

  loadAppointmentsByDoctorUsername(username: string): void {
    this.appointmentsService.getAllAppointmentsByDoctorUsername(username).subscribe(response => {
        this.events = this.mapAppointmentsToCalendarEvents(response);
      });
  }

  mapAppointmentsToCalendarEvents(appointments: Appointment[]): CalendarEvent[] {
    let calendarEvents:CalendarEvent[] = new Array(appointments.length);

    for (let i = 0; i < appointments.length; i++) {
      calendarEvents[i] = this.mapAppointmentToCalendarEvent(appointments[i]);
    }

    return calendarEvents;
  }

  mapAppointmentToCalendarEvent(appointment: Appointment): CalendarEvent {
    let calendarEvent:CalendarEvent = {
        start: new Date(appointment.startDate),
        end: new Date(appointment.endDate),
        title: 'Wizyta: ' + appointment.startDate,
        color: colors.blue,
        actions: this.actions,
        meta: appointment
    };

    return calendarEvent;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({event, newStart, newEnd,}: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    const modalRef = this.modalService.open(AppointmentDetailsComponent);
    modalRef.componentInstance.appointment = event.meta;
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }
}
