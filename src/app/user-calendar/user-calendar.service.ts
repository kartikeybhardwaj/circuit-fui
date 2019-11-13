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

@Injectable()
export class UserCalendarStorageService {

  userPulses: UserCalendarData[] = [];
  idMapUserPulses: any = {};

  calendarEvents: EventInput[] = [];

  isFetching = false;
  isFetchingSuccess = false;

  constructor(
    public appInfo: AppStorageService,
    private http: HttpClient
  ) {}

  getUserPulses(username: string): any {
    return new Promise((resolve, reject) => {
      this.isFetching = true;
      const httpOptions = this.appInfo.httpOptions;
      httpOptions.params = {
        username
      };
      this.http.get(this.appInfo.constants.urls.getUserPulses, httpOptions).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            this.userPulses = [];
            this.idMapUserPulses = response.data.idMap;
            this.calendarEvents = [];
            response.data.pulses.forEach(pulse => {
              this.userPulses.push({
                pulseId: pulse._id,
                index: pulse.index,
                title: pulse.title,
                color: pulse.color,
                timeline: pulse.timeline,
                linkedProjectId: pulse.linkedProjectId,
                linkedMilestoneId: pulse.linkedMilestoneId
              });
              this.calendarEvents.push({
                pulseId: pulse._id,
                linkedMilestoneId: pulse.linkedMilestoneId,
                linkedProjectId: pulse.linkedProjectId,
                title: pulse.title,
                url: 'http://localhost:4200',
                start: new Date(pulse.timeline.begin),
                end: new Date(pulse.timeline.end),
                // tslint:disable-next-line: max-line-length
                color: pulse.color === 'blue' ? '#1b85b8' : pulse.color === 'black' ? '#5a5255' : pulse.color === 'green' ? '#559e83' : pulse.color === 'red' ? '#ae5a41' : null
              });
            });
            resolve(this.userPulses);
            this.isFetchingSuccess = true;
          } else {
            if (response.message) {
              reject(response.message);
            } else {
              reject(this.appInfo.constants.messages.someErrorOccurred);
            }
          }
          this.isFetching = false;
        },
        (error: any) => {
          this.isFetching = false;
          this.isFetchingSuccess = false;
          reject(this.appInfo.constants.messages.someErrorOccurred);
        });
    });
  }

}
