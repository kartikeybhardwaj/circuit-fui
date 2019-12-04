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
  MetaMilestonesStorageService
} from '../meta-milestones/meta-milestones.service';
import {
  UpdateMilestonePayloadValidator
} from '../json-schema-validatior/update-milestone';

@Injectable()
export class EditMilestoneStorageService {

  milestone: EditMilestoneData = {
    projectId: '',
    milestoneId: '',
    title: '',
    description: '',
    timeline: {
      begin: null,
      end: null
    },
    locationId: null,
    milestoneMetaId: null,
    fields: []
  };
  selectedMilestoneMeta: any = null;
  timeline = null;

  constructor(
    private appInfo: AppStorageService,
    private metaMilestoneInfo: MetaMilestonesStorageService,
    private updateMilestonePayloadValidator: UpdateMilestonePayloadValidator,
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
              projectId,
              milestoneId,
              title: response.data.milestone.title,
              description: response.data.milestone.description,
              timeline: {
                begin: new Date(response.data.milestone.timeline.begin).toISOString(),
                end: new Date(response.data.milestone.timeline.end).toISOString()
              },
              locationId: response.data.milestone.locationId,
              milestoneMetaId: response.data.milestone.milestoneMetaId,
              fields: response.data.milestone.fields
            };
            this.metaMilestoneInfo.metaMilestones.some((metaMilestone) => {
              if (metaMilestone.metaMilestoneId === response.data.milestone.milestoneMetaId) {
                this.selectedMilestoneMeta = metaMilestone;
                return true;
              }
            });
            this.timeline = {
              begin: new Date(response.data.milestone.timeline.begin),
              end: new Date(response.data.milestone.timeline.end)
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

  validateRequest(milestone: EditMilestoneData): [boolean, string] {
    return this.updateMilestonePayloadValidator.validateSchema(milestone);
  }

  updateMilestone(reqPayload: EditMilestoneData): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.appInfo.constants.urls.updateMilestone, JSON.stringify(reqPayload), this.appInfo.httpOptionsWithAuth).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            resolve([true, this.appInfo.constants.messages.updatedMilestone, response.data]);
          } else if (response.message) {
            reject([false, response.message, {}]);
          } else {
            reject([false, this.appInfo.constants.messages.someErrorOccurred, {}]);
          }
        },
        (error: any) => {
          reject([false, this.appInfo.constants.messages.someErrorOccurred, {}]);
        });
    });
  }

}
