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
export class MetaPulsesStorageService {

  metaPulses: MetaPulseData[] = [];
  idMapMetaPulses: any = {};

  constructor(
    private appInfo: AppStorageService,
    private http: HttpClient
  ) {}

  getMetaPulses(): any {
    return new Promise((resolve, reject) => {
      this.http.get(this.appInfo.constants.urls.getMetaPulses, this.appInfo.httpOptions).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            this.metaPulses = [{
              metaPulseId: null,
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
            this.idMapMetaPulses = response.data.idMap;
            response.data.metaPulses.forEach(metaPulse => {
              this.metaPulses.push({
                metaPulseId: metaPulse._id,
                index: metaPulse.index,
                title: metaPulse.title,
                description: metaPulse.description,
                fields: metaPulse.fields,
                meta: {
                  addedBy: metaPulse.meta.addedBy ? metaPulse.meta.addedBy : null,
                  addedOn: metaPulse.meta.addedOn ? metaPulse.meta.addedOn : null,
                  lastUpdatedBy: metaPulse.meta.lastUpdatedBy ? metaPulse.meta.lastUpdatedBy : null,
                  lastUpdatedOn: metaPulse.meta.lastUpdatedOn ? metaPulse.meta.lastUpdatedOn : null
                }
              });
            });
            resolve(this.metaPulses);
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
