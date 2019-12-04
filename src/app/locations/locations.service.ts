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
  AddLocationsPayloadValidator
} from '../json-schema-validatior/add-locations';

@Injectable()
export class LocationStorageService {

  locations: LocationData[] = [];
  idMapLocations: any = {};

  constructor(
    private appInfo: AppStorageService,
    private addLocationsPayloadValidator: AddLocationsPayloadValidator,
    private http: HttpClient
  ) {}

  validateRequest(locations: AddLocationsData): [boolean, string] {
    return this.addLocationsPayloadValidator.validateSchema(locations);
  }

  addLocations(reqPayload: AddLocationsData): any {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.appInfo.constants.urls.addLocations,
        JSON.stringify(reqPayload),
        this.appInfo.httpOptionsWithAuth
      ).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            if (response.data.alreadyExists.length > 0) {
              resolve([true, 'Location already exists', response.data]);
            } else {
              resolve([true, 'Location added', response.data]);
              this.getLocations();
            }
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

  getLocations(): any {
    return new Promise((resolve, reject) => {
      this.http.get(this.appInfo.constants.urls.getLocations, this.appInfo.httpOptionsWithAuth).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            this.locations = [];
            this.idMapLocations = response.data.idMap;
            for (let i = 0; i < response.data.locations.length; i++) {
              const location = response.data.locations[i];
              this.locations.push({
                locationId: location._id,
                index: i + 1,
                city: location.city,
                country: location.country,
                isUpdating: false,
                meta: {
                  addedBy: location.meta.addedBy ? location.meta.addedBy : null,
                  addedOn: location.meta.addedOn ? location.meta.addedOn : null,
                  lastUpdatedBy: location.meta.lastUpdatedBy ? location.meta.lastUpdatedBy : null,
                  lastUpdatedOn: location.meta.lastUpdatedOn ? location.meta.lastUpdatedOn : null
                }
              });
            }
            resolve(this.locations);
          } else {
            if (response.message) {
              reject(response.message);
            } else {
              reject(this.appInfo.constants.messages.someErrorOccurred);
            }
          }
        },
        (error: any) => {
          reject(this.appInfo.constants.messages.someErrorOccurred);
        });
    });
  }

}
