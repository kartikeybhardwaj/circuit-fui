import {
  Injectable
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  HttpClient
} from '@angular/common/http';

@Injectable()
export class PulseStorageService {

  pulses: PulseData[] = [];
  idMapPulses: any = {};

  constructor(
    private appInfo: AppStorageService,
    private http: HttpClient
  ) {}

  getPulses(projectId: string, milestoneId: string): any {
    return new Promise((resolve, reject) => {
      const httpOptions = this.appInfo.httpOptionsWithAuth;
      httpOptions.params = {
        projectId,
        milestoneId
      };
      this.http.get(this.appInfo.constants.urls.getPulses, httpOptions).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            this.pulses = [];
            this.idMapPulses = response.data.idMap;
            response.data.pulses.forEach(pulse => {
              this.pulses.push({
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
            });
            resolve(this.pulses);
          } else {
            if (response.message) {
              reject(response.message);
            } else {
              reject(this.appInfo.constants.messages.someErrorOccurred);
            }
          }
        },
        (error: any) => {
          reject(error);
        });
    });
  }

}
