import {
  Injectable
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  HttpClient
} from '@angular/common/http';
import {
  EventInput
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

@Injectable()
export class HomeStorageService {

  myPulses: PulseData[] = [];
  idMapMyPulses: any = {};

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
  calendarEvents: EventInput[] = [];

  isFetching = false;
  isFetchingSuccess = false;

  constructor(
    public appInfo: AppStorageService,
    private http: HttpClient
  ) {}

  getMyPulses(): any {
    return new Promise((resolve, reject) => {
      this.isFetching = true;
      this.http.get(this.appInfo.constants.urls.getMyPulses, this.appInfo.httpOptions).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            this.myPulses = [];
            this.idMapMyPulses = response.data.idMap;
            response.data.pulses.forEach(pulse => {
              this.myPulses.push({
                pulseId: pulse._id,
                index: pulse.index,
                title: pulse.title,
                description: pulse.description,
                color: pulse.color,
                timeline: pulse.timeline,
                assignees: pulse.assignees,
                assigneesListCount: pulse.assignees.length,
                comments: pulse.comments,
                pulseMetaId: pulse.pulseMetaId,
                fields: pulse.fields,
                linkedProjectId: pulse.linkedProjectId,
                linkedMilestoneId: pulse.linkedMilestoneId,
                meta: {
                  addedBy: pulse.meta.addedBy,
                  addedOn: pulse.meta.addedOn,
                  lastUpdatedBy: pulse.meta.lastUpdatedBy ? pulse.meta.lastUpdatedBy : null,
                  lastUpdatedOn: pulse.meta.lastUpdatedOn ? pulse.meta.lastUpdatedOn : null
                }
              });
              this.calendarEvents.push({
                pulseId: pulse._id,
                title: pulse.title,
                url: 'http://localhost:4200',
                start: new Date(pulse.timeline.begin),
                end: new Date(pulse.timeline.end),
                // tslint:disable-next-line: max-line-length
                color: pulse.color === 'blue' ? '#1b85b8' : pulse.color === 'black' ? '#5a5255' : pulse.color === 'green' ? '#559e83' : pulse.color === 'red' ? '#ae5a41' : null
              });
            });
            resolve(this.myPulses);
          } else {
            if (response.message) {
              reject(response.message);
            } else {
              reject(this.appInfo.constants.messages.someErrorOccurred);
            }
          }
          this.isFetching = false;
          this.isFetchingSuccess = true;
        },
        (error: any) => {
          this.isFetching = false;
          this.isFetchingSuccess = false;
          reject(error);
        });
    });
  }

}
