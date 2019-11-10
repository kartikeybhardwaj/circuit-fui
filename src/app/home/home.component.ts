import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  HomeStorageService
} from './home.service';
import {
  HeaderStorageService
} from '../header/header.service';
import {
  Router
} from '@angular/router';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
  calendarSelectable = true;
  calendarNowIndicator = true;
  calendarEventLimit = true;
  calendarEditable = true;

  constructor(
    public appInfo: AppStorageService,
    public homeInfo: HomeStorageService,
    private headerInfo: HeaderStorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    appInfo.selectedProjectId = null;
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = '';
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
  }

  ngOnInit() {
    this.homeInfo.getMyPulses();
  }

  pulseClick(info: any): void {
    info.jsEvent.preventDefault(); // don't let the browser navigate
    console.log(this.createReqObject(info.event));
  }

  pulseDrop(info: any): void {
    info.jsEvent.preventDefault(); // don't let the browser navigate
    this.updateTimeline(info.event);
  }

  pulseResize(info: any): void {
    info.jsEvent.preventDefault(); // don't let the browser navigate
    this.updateTimeline(info.event);
  }

  createReqObject(eventInfo: any): any {
    return {
      pulseId: eventInfo.extendedProps.pulseId,
      milestoneId: eventInfo.extendedProps.linkedMilestoneId,
      projectId: eventInfo.extendedProps.linkedProjectId,
      timeline: {
        begin: eventInfo.start.toISOString(),
        end: eventInfo.end.toISOString()
      }
    };
  }

  updateTimeline(eventInfo: any): void {
    const reqPayload = this.createReqObject(eventInfo);
    this.headerInfo.isWorking = true;
    this.homeInfo.updatePulseTimeline(reqPayload)
      .then((resp) => {
        this.headerInfo.isWorking = false;
        this.openSnackBar(resp[1], null);
      })
      .catch((error) => {
        this.headerInfo.isWorking = false;
        this.openSnackBar(error[1], null);
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'center', // left, right, start, end, center
      verticalPosition: 'bottom', // top, bottom
      duration: 3500
    });
  }

}
