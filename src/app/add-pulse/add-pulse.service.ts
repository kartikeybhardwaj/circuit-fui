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
  AddPulsePayloadValidator
} from '../json-schema-validatior/add-pulse';

@Injectable()
export class AddPulseStorageService {

  constructor(
    private appInfo: AppStorageService,
    private addPulsePayloadValidator: AddPulsePayloadValidator,
    private http: HttpClient
  ) {}

  validateRequest(pulse: AddPulseData): [boolean, string] {
    return this.addPulsePayloadValidator.validateSchema(pulse);
  }

  addPulse(reqPayload: AddPulseData): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.appInfo.constants.urls.addPulse, JSON.stringify(reqPayload), this.appInfo.httpOptionsWithAuth).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            resolve([true, 'Pulse added', response.data]);
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
