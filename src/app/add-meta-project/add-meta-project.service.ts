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
  AddMetaProjectPayloadValidator
} from '../json-schema-validatior/add-meta-project';

@Injectable()
export class AddMetaProjectStorageService {

  constructor(
    private appInfo: AppStorageService,
    private addMetaProjectPayloadValidator: AddMetaProjectPayloadValidator,
    private http: HttpClient
  ) {}

  validateRequest(metaProject: AddMetaProjectData): [boolean, string] {
    return this.addMetaProjectPayloadValidator.validateSchema(metaProject);
  }

  addMetaProject(reqPayload: AddMetaProjectData): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.appInfo.constants.urls.addMetaProject, JSON.stringify(reqPayload), this.appInfo.httpOptionsWithAuth).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            resolve([true, this.appInfo.constants.messages.addedMetaProject, response.data]);
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
