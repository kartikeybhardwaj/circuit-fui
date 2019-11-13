import {
  Component,
  OnInit
} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {
  MilestoneCalendarStorageService
} from './milestone-calendar.service';
import {
  AppStorageService
} from '../app.service';
import {
  Router
} from '@angular/router';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-milestone-calendar',
  templateUrl: './milestone-calendar.component.html',
  styleUrls: ['./milestone-calendar.component.css']
})
export class MilestoneCalendarComponent implements OnInit {

  calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin];
  calendarHeader = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  };
  calendarBusinessHours = {
    // days of week. an array of zero-based day of week integers (0=Sunday)
    daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
    startTime: '09:15',
    endTime: '17:30',
  };
  calendarWeekends = true;
  calendarWeekNumbers = true;
  calendarSelectable = false;
  calendarNowIndicator = true;
  calendarEventLimit = true;
  calendarEditable = false;

  constructor(
    public appInfo: AppStorageService,
    public milestoneCalendarInfo: MilestoneCalendarStorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.milestoneCalendarInfo.getCalendarMilestones();
  }

  milestoneClick(info: any): void {
    info.jsEvent.preventDefault(); // don't let the browser navigate
    const thisEvent = info.event;
    this.router.navigate([
      '/projects/' + thisEvent.extendedProps.linkedProjectId +
      '/milestones/' + thisEvent.extendedProps.milestoneId +
      '/pulses'
    ]);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'center', // left, right, start, end, center
      verticalPosition: 'bottom', // top, bottom
      duration: 3500
    });
  }

}
