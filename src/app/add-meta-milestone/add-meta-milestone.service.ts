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
  AddMetaMilestonePayloadValidator
} from '../json-schema-validatior/add-meta-milestone';

@Injectable()
export class AddMetaMilestoneStorageService {

  constructor(
    private appInfo: AppStorageService,
    private addMetaMilestonePayloadValidator: AddMetaMilestonePayloadValidator,
    private http: HttpClient
  ) {}

  validateRequest(metaMilestone: AddMetaMilestoneData): [boolean, string] {
    return this.addMetaMilestonePayloadValidator.validateSchema(metaMilestone);
  }

  addMetaMilestone(reqPayload: AddMetaMilestoneData): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.appInfo.constants.urls.addMetaMilestone, JSON.stringify(reqPayload), this.appInfo.httpOptionsWithAuth).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            resolve([true, this.appInfo.constants.messages.addedMetaMilestone, response.data]);
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
