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
  AddMilestonePayloadValidator
} from '../json-schema-validatior/add-milestone';

@Injectable()
export class AddMilestoneStorageService {

  constructor(
    private appInfo: AppStorageService,
    private addMilestonePayloadValidator: AddMilestonePayloadValidator,
    private http: HttpClient
  ) {}

  validateRequest(milestone: AddMilestoneData): [boolean, string] {
    return this.addMilestonePayloadValidator.validateSchema(milestone);
  }

  addMilestone(reqPayload: AddMilestoneData): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.appInfo.constants.urls.addMilestone, JSON.stringify(reqPayload), this.appInfo.httpOptions).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            resolve([true, 'Milestone added', response.data]);
          } else if (response.message) {
            reject([false, response.message, {}]);
          } else {
            reject([false, 'Some error occurred', {}]);
          }
        },
        (error: any) => {
          reject([false, 'Some error occurred', {}]);
        });
    });
  }

}
