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
export class MilestoneCalendarStorageService {

  calendarMilestones: MilestoneCalendarData[] = [];
  calendarEvents: EventInput[] = [];

  isFetching = false;
  isFetchingSuccess = false;

  constructor(
    private appInfo: AppStorageService,
    private http: HttpClient
  ) {}

  getCalendarMilestones(): any {
    return new Promise((resolve, reject) => {
      this.isFetching = true;
      this.http.get(this.appInfo.constants.urls.getAllMilestones, this.appInfo.httpOptionsWithAuth).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            this.calendarMilestones = [];
            response.data.milestones.forEach(milestone => {
              this.calendarMilestones.push({
                milestoneId: milestone._id,
                index: milestone.index,
                title: milestone.title,
                timeline: milestone.timeline,
                linkedProjectId: milestone.linkedProjectId
              });
              this.calendarEvents.push({
                milestoneId: milestone._id,
                linkedProjectId: milestone.linkedProjectId,
                title: milestone.title,
                url: '/projects/' + milestone.linkedProjectId + '/milestones/' + milestone._id + '/pulses',
                start: new Date(milestone.timeline.begin),
                end: new Date(milestone.timeline.end),
                color: '#1b85b8'
              });
            });
            resolve(this.calendarMilestones);
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
          reject(this.appInfo.constants.messages.someErrorOccurred);
          this.isFetching = false;
          this.isFetchingSuccess = false;
        });
    });
  }

}
