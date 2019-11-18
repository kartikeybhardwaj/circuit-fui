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
  LocationStorageService
} from '../locations/locations.service';
import {
  AddTravelPayloadValidator
} from '../json-schema-validatior/add-travel';

@Injectable()
export class TravelsStorageService {

  travels: TravelData[] = [];

  constructor(
    private appInfo: AppStorageService,
    private locationInfo: LocationStorageService,
    private addTravelPayloadValidator: AddTravelPayloadValidator,
    private http: HttpClient
  ) {}

  updateBaseLocation(reqPayload: any): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.appInfo.constants.urls.updateBaseLocation, JSON.stringify(reqPayload), this.appInfo.httpOptionsWithAuth).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            resolve([true, 'Base location updated', response.data]);
          } else {
            if (response.message) {
              reject([false, response.message, {}]);
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

  validateRequest(travel: AddTravelData): [boolean, string] {
    return this.addTravelPayloadValidator.validateSchema(travel);
  }

  addTravel(reqPayload: AddTravelData): any {
    return new Promise((resolve, reject) => {
      this.http.post(this.appInfo.constants.urls.addTravel, JSON.stringify(reqPayload), this.appInfo.httpOptionsWithAuth).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            this.travels.push({
              locationId: reqPayload.locationId,
              index: this.travels.length + 1,
              name: this.locationInfo.idMapLocations[reqPayload.locationId],
              timeline: {
                begin: new Date(reqPayload.timeline.begin),
                end: new Date(reqPayload.timeline.end)
              },
              isUpdating: false
            });
            resolve([true, 'Travel added', response.data]);
          } else {
            if (response.message) {
              if (response.data && response.data.locationId) {
                reject([false, response.message + ' - ' + this.locationInfo.idMapLocations[response.data.locationId], {}]);
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

  getMyTravels(): any {
    return new Promise((resolve, reject) => {
      this.travels = [];
      for (let i = 0; i < this.appInfo.user.otherLocations.length; i++) {
        const thisTravel = JSON.parse(JSON.stringify(this.appInfo.user.otherLocations[i]));
        this.travels.push({
          locationId: thisTravel.locationId,
          index: i + 1,
          name: this.locationInfo.idMapLocations[thisTravel.locationId],
          timeline: {
            begin: new Date(thisTravel.timeline.begin),
            end: new Date(thisTravel.timeline.end)
          },
          isUpdating: false
        });
      }
      resolve(this.travels);
    });
  }

}
