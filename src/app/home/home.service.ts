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
export class HomeStorageService {

  myPulses: PulseData[] = [];
  idMapMyPulses: any = {};

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
      this.http.get(
        this.appInfo.constants.urls.getMyPulses,
        this.appInfo.httpOptionsWithAuth).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            this.myPulses = [];
            this.idMapMyPulses = response.data.idMap;
            this.calendarEvents = [];
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
            this.appInfo.user.nonAvailability.forEach(thisBlockage => {
              this.calendarEvents.push({
                start: new Date(thisBlockage.timeline.begin),
                end: new Date(thisBlockage.timeline.end),
                rendering: 'background',
                allDay: true
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
          reject(this.appInfo.constants.messages.someErrorOccurred);
        });
    });
  }

  updatePulseTimeline(reqPayload: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.appInfo.constants.urls.updatePulseTimeline,
        JSON.stringify(reqPayload),
        this.appInfo.httpOptionsWithAuth).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            resolve([
              true,
              this.appInfo.constants.buildingBlocks.labels.pulse + ' timeline updated',
              response.data
            ]);
          } else {
            if (response.message) {
              reject([false, response.message, {}]);
            } else {
              reject([false, this.appInfo.constants.messages.someErrorOccurred, {}]);
            }
          }
        },
        (error: any) => {
          reject([false, this.appInfo.constants.messages.someErrorOccurred, {}]);
        });
    });
  }

}
