import {
  Component,
  OnInit
} from '@angular/core';
import {
  EventInput
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import {
  AppStorageService
} from '../app.service';

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
  calendarEvents: EventInput[] = [{
    _id: '1234567890',
    title: 'Some event name',
    url: 'https://www.google.com/',
    start: new Date(),
    end: new Date(),
    allDay: true,
    color: 'purple'
  }, {
    _id: '1234567890',
    title: 'Another event',
    url: 'https://www.google.com/',
    start: new Date('2019-10-30'),
    end: new Date('2019-10-30'),
    allDay: true
  }, {
    _id: '1234567890',
    title: 'Party event',
    url: 'https://www.google.com/',
    start: new Date('2019-10-09'),
    end: new Date('2019-10-09'),
    allDay: true,
    color: 'purple'
  }, {
    _id: '1234567890',
    title: 'Random event',
    url: 'https://www.google.com/',
    start: new Date('2019-10-20'),
    end: new Date('2019-10-22'),
    allDay: true
  }, {
    _id: '1234567890',
    title: 'Random event',
    url: 'https://www.google.com/',
    start: new Date('2019-10-20'),
    end: new Date('2019-10-22'),
    allDay: true
  }, {
    _id: '1234567890',
    title: 'Random event',
    url: 'https://www.google.com/',
    start: new Date('2019-10-20'),
    end: new Date('2019-10-22'),
    allDay: true
  }, {
    _id: '1234567890',
    title: 'Random event',
    url: 'https://www.google.com/',
    start: new Date('2019-10-20'),
    end: new Date('2019-10-22'),
    allDay: true
  }, {
    _id: '1234567890',
    title: 'Random event',
    url: 'https://www.google.com/',
    start: new Date('2019-10-20'),
    end: new Date('2019-10-22'),
    allDay: true
  }, {
    _id: '1234567890',
    title: 'Random event',
    url: 'https://www.google.com/',
    start: new Date('2019-10-20'),
    end: new Date('2019-10-22'),
    allDay: true
  }, {
    _id: '1234567890',
    title: 'Random event',
    url: 'https://www.google.com/',
    start: new Date('2019-10-20'),
    end: new Date('2019-10-22'),
    allDay: true
  }, {
    _id: '1234567890',
    title: 'Random event',
    url: 'https://www.google.com/',
    start: new Date('2019-10-20'),
    end: new Date('2019-10-22'),
    allDay: true
  }, {
    _id: '1234567890',
    title: 'Random event',
    url: 'https://www.google.com/',
    start: new Date('2019-10-20'),
    end: new Date('2019-10-22'),
    allDay: true
  }];

  constructor(
    public appInfo: AppStorageService
  ) {
    appInfo.selectedProjectId = null;
    appInfo.selectedMilestoneId = null;
    appInfo.selectedPulseId = null;
    appInfo.otherHeader = '';
    appInfo.navigationAddText = '';
    appInfo.isNavigationAddTextVisible = false;
  }

  ngOnInit() {}

  pulseClick(info: any): void {
    info.jsEvent.preventDefault(); // don't let the browser navigate
    console.log(info.event);
  }

  pulseDrop(info: any): void {
    info.jsEvent.preventDefault(); // don't let the browser navigate
    console.log(info.event);
  }

  pulseResize(info: any): void {
    info.jsEvent.preventDefault(); // don't let the browser navigate
    console.log(info.event);
  }

}
