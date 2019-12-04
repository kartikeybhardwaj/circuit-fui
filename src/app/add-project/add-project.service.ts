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
  AddProjectPayloadValidator
} from '../json-schema-validatior/add-project';

@Injectable()
export class AddProjectStorageService {

  constructor(
    private appInfo: AppStorageService,
    private addProjectPayloadValidator: AddProjectPayloadValidator,
    private http: HttpClient
  ) {}

  validateRequest(project: AddProjectData): [boolean, string] {
    return this.addProjectPayloadValidator.validateSchema(project);
  }

  addProject(reqPayload: AddProjectData): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.appInfo.constants.urls.addProject, JSON.stringify(reqPayload), this.appInfo.httpOptionsWithAuth).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            resolve([true, this.appInfo.constants.messages.addedProject, response.data]);
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
