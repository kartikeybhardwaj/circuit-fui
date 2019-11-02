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
export class MilestoneStorageService {

  milestones: MilestoneData[] = [];
  idMapMilestones: any = {};

  constructor(
    private appInfo: AppStorageService,
    private http: HttpClient
  ) {}

  getMilestones(projectId: string): any {
    return new Promise((resolve, reject) => {
      const httpOptions = this.appInfo.httpOptions;
      httpOptions.params = {
        projectId
      };
      this.http.get(this.appInfo.constants.urls.getMilestones, httpOptions).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            this.milestones = [];
            this.idMapMilestones = response.data.idMap;
            response.data.milestones.forEach(milestone => {
              const pulsesList: string[] = [];
              milestone.pulsesList.forEach(pulse => {
                pulsesList.push(pulse);
              });
              this.milestones.push({
                milestoneId: milestone._id,
                index: milestone.index,
                title: milestone.title,
                description: milestone.description,
                timeline: milestone.timeline,
                pulsesList,
                pulsesListCount: milestone.pulsesList.length,
                milestoneMetaId: milestone.milestoneMetaId,
                fields: milestone.fields,
                linkedProjectId: milestone.linkedProjectId,
                meta: {
                  addedBy: milestone.meta.addedBy,
                  addedOn: milestone.meta.addedOn,
                  lastUpdatedBy: milestone.meta.lastUpdatedBy ? milestone.meta.lastUpdatedBy : null,
                  lastUpdatedOn: milestone.meta.lastUpdatedOn ? milestone.meta.lastUpdatedOn : null
                }
              });
            });
            resolve(this.milestones);
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
