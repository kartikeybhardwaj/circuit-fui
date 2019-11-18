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
  AddBlockagePayloadValidator
} from '../json-schema-validatior/add-blockage';

@Injectable()
export class BlockagesStorageService {

  nonAvailability: NonAvailabilityData[] = [];

  constructor(
    private appInfo: AppStorageService,
    private addBlockagesPayloadValidator: AddBlockagePayloadValidator,
    private http: HttpClient
  ) {}

  validateRequest(blockage: AddNonAvailabilityData): [boolean, string] {
    return this.addBlockagesPayloadValidator.validateSchema(blockage);
  }

  addBlockage(reqPayload: AddNonAvailabilityData): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.appInfo.constants.urls.addBlockage, JSON.stringify(reqPayload), this.appInfo.httpOptionsWithAuth).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            this.nonAvailability.push({
              index: this.nonAvailability.length + 1,
              reason: reqPayload.reason,
              timeline: {
                begin: new Date(reqPayload.timeline.begin),
                end: new Date(reqPayload.timeline.end)
              },
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
        const thisBlockage = JSON.parse(JSON.stringify(this.appInfo.user.nonAvailability[i]));
        this.nonAvailability.push({
          index: i + 1,
          reason: thisBlockage.reason,
          timeline: {
            begin: new Date(thisBlockage.timeline.begin),
            end: new Date(thisBlockage.timeline.end)
          },
          isUpdating: false
        });
      }
      resolve(this.nonAvailability);
    });
  }

}
