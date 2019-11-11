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
export class MetaMilestonesStorageService {

  metaMilestones: MetaMilestoneData[] = [];
  idMapMetaMilestones: any = {};

  constructor(
    private appInfo: AppStorageService,
    private http: HttpClient
  ) {}

  getMetaMilestones(): any {
    return new Promise((resolve, reject) => {
      this.http.get(this.appInfo.constants.urls.getMetaMilestones, this.appInfo.httpOptions).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            this.metaMilestones = [{
              metaMilestoneId: null,
              index: null,
              title: 'None',
              description: '',
              fields: [],
              meta: {
                addedBy: null,
                addedOn: null,
                lastUpdatedBy: null,
                lastUpdatedOn: null
              }
            }];
            this.idMapMetaMilestones = response.data.idMap;
            response.data.metaMilestones.forEach(metaMilestone => {
              this.metaMilestones.push({
                metaMilestoneId: metaMilestone._id,
                index: metaMilestone.index,
                title: metaMilestone.title,
                description: metaMilestone.description,
                fields: metaMilestone.fields,
                meta: {
                  addedBy: metaMilestone.meta.addedBy ? metaMilestone.meta.addedBy : null,
                  addedOn: metaMilestone.meta.addedOn ? metaMilestone.meta.addedOn : null,
                  lastUpdatedBy: metaMilestone.meta.lastUpdatedBy ? metaMilestone.meta.lastUpdatedBy : null,
                  lastUpdatedOn: metaMilestone.meta.lastUpdatedOn ? metaMilestone.meta.lastUpdatedOn : null
                }
              });
            });
            resolve(this.metaMilestones);
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
