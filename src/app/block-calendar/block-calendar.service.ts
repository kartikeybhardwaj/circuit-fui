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
export class BlockagesStorageService {

  nonAvailability: NonAvailabilityData[] = [];

  constructor(
    private appInfo: AppStorageService,
    private http: HttpClient
  ) {}

  addBlockage(reqPayload: AddNonAvailabilityData): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.appInfo.constants.urls.addBlockage, JSON.stringify(reqPayload), this.appInfo.httpOptions).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            this.nonAvailability.push({
              index: this.nonAvailability.length,
              reason: reqPayload.reason,
              timeline: reqPayload.timeline,
              isUpdating: false
            });
            resolve([true, 'Calendar blocked', response.data]);
          } else {
            if (response.message) {
              if (response.data && response.data.reason) {
                reject([false, response.message + ' - ' + response.data.reason.substr(0, 10) +
                  (response.data.reason.length > 10 ? '...' : ''), {}
                ]);
              } else {
                reject([false, response.message, {}]);
              }
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

  getMyBlockages(): any {
    return new Promise((resolve, reject) => {
      this.nonAvailability = [];
      for (let i = 0; i < this.appInfo.user.nonAvailability.length; i++) {
        this.nonAvailability.push({
          index: i + 1,
          reason: this.appInfo.user.nonAvailability[i].reason,
          timeline: this.appInfo.user.nonAvailability[i].timeline,
          isUpdating: false
        });
      }
      resolve(this.nonAvailability);
    });
  }

}
