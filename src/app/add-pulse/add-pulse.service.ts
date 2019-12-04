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
import {
  GetUsersAvailabilityCreatingPulsePayloadValidator
} from '../json-schema-validatior/get-users-availability-creating-pulse';

@Injectable()
export class AddPulseStorageService {

  constructor(
    private appInfo: AppStorageService,
    private addPulsePayloadValidator: AddPulsePayloadValidator,
    private checkUsersAvailabilityPayloadValidator: GetUsersAvailabilityCreatingPulsePayloadValidator,
    private http: HttpClient
  ) {}

  validateRequestCheckAvailability(usersAvailability: CheckUsersAvailabilityData): [boolean, string] {
    return this.checkUsersAvailabilityPayloadValidator.validateSchema(usersAvailability);
  }

  validateRequestAddPulse(pulse: AddPulseData): [boolean, string] {
    return this.addPulsePayloadValidator.validateSchema(pulse);
  }

  getUsersAvailability(reqPayload: CheckUsersAvailabilityData): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.appInfo.constants.urls.getOverlapsCreatingPulse,
        JSON.stringify(reqPayload),
        this.appInfo.httpOptionsWithAuth).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            resolve([true, '', response.data]);
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

  addPulse(reqPayload: AddPulseData): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.appInfo.constants.urls.addPulse, JSON.stringify(reqPayload), this.appInfo.httpOptionsWithAuth).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            resolve([true, this.appInfo.constants.messages.addedPulse, response.data]);
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
