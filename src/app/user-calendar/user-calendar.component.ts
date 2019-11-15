import {
  Component,
  OnInit
} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import {
  AppStorageService
} from '../app.service';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  UserCalendarStorageService
} from './user-calendar.service';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.css']
})
export class UserCalendarComponent implements OnInit {

  username = '';

  calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin];
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
    public userCalendarInfo: UserCalendarStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const activatedRouteSnapshot = activatedRoute.snapshot;
    if (activatedRouteSnapshot.params && activatedRouteSnapshot.params.username) {
      this.username = activatedRouteSnapshot.params.username;
    }
    appInfo.selectedProjectId = null;
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = this.username;
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
  }

  ngOnInit() {
    this.userCalendarInfo.getUserPulses(this.username)
      .then((response) => {})
      .catch((error) => {
        this.openSnackBar(error, null);
      });
  }

  pulseClick(info: any): void {
    info.jsEvent.preventDefault(); // don't let the browser navigate
    console.log(info.event);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'end', // left, right, start, end, center
      verticalPosition: 'top', // top, bottom
      duration: 3500
    });
  }

}
