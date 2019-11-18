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
  AddMetaPulsePayloadValidator
} from '../json-schema-validatior/add-meta-pulse';

@Injectable()
export class AddMetaPulseStorageService {

  constructor(
    private appInfo: AppStorageService,
    private addMetaPulsePayloadValidator: AddMetaPulsePayloadValidator,
    private http: HttpClient
  ) {}

  validateRequest(metaPulse: AddMetaPulseData): [boolean, string] {
    return this.addMetaPulsePayloadValidator.validateSchema(metaPulse);
  }

  addMetaPulse(reqPayload: AddMetaPulseData): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.appInfo.constants.urls.addMetaPulse, JSON.stringify(reqPayload), this.appInfo.httpOptionsWithAuth).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            resolve([true, 'Meta pulse added', response.data]);
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
