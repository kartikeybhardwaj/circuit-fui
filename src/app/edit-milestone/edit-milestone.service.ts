import {
  Injectable
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  HttpClient
} from '@angular/common/http';
import { MetaMilestonesStorageService } from '../meta-milestones/meta-milestones.service';

@Injectable()
export class EditMilestoneStorageService {

  milestone: AddMilestoneData = {
    title: '',
    description: '',
    timeline: {
      begin: null,
      end: null
    },
    locationId: null,
    milestoneMetaId: null,
    fields: [],
    linkedProjectId: null
  };
  selectedMilestoneMeta: any = null;
  timeline = null;

  constructor(
    private appInfo: AppStorageService,
    private metaMilestoneInfo: MetaMilestonesStorageService,
    private http: HttpClient
  ) {}

  getMilestone(projectId: string, milestoneId: string): any {
    return new Promise((resolve, reject) => {
      const httpOptions = this.appInfo.httpOptionsWithAuth;
      httpOptions.params = {
        projectId,
        milestoneId
      };
      this.http.get(this.appInfo.constants.urls.getMilestone, httpOptions).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            this.milestone = {
              title: response.data.milestone.title,
              description: response.data.milestone.description,
              timeline: {
                begin: new Date(response.data.milestone.timeline.begin).toISOString(),
                end: new Date(response.data.milestone.timeline.begin).toISOString()
              },
              locationId: response.data.milestone.locationId,
              milestoneMetaId: response.data.milestone.milestoneMetaId,
              fields: response.data.milestone.fields,
              linkedProjectId: response.data.milestone.linkedProjectId
            };
            this.metaMilestoneInfo.metaMilestones.some((metaMilestone) => {
              if (metaMilestone.metaMilestoneId === response.data.milestone.milestoneMetaId) {
                this.selectedMilestoneMeta = metaMilestone;
                return true;
              }
            });
            this.timeline = {
              begin: new Date(response.data.milestone.timeline.begin),
              end: new Date(response.data.milestone.timeline.begin)
            };
            resolve(response.data);
          } else {
            if (response.message) {
              reject(response.message);
            } else {
              reject(this.appInfo.constants.messages.someErrorOccurred);
            }
          }
        },
        (error: any) => {
          reject(this.appInfo.constants.messages.someErrorOccurred);
        });
    });
  }

}
