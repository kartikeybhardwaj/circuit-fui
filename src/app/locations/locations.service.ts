import {
  Injectable
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  HttpClient
} from '@angular/common/http';

@Injectable()
export class LocationStorageService {

  locations: LocationData[] = [];
  idMapLocations: any = {};

  constructor(
    private appInfo: AppStorageService,
    private http: HttpClient
  ) {}

  getLocations(): any {
    return new Promise((resolve, reject) => {
      this.http.get(this.appInfo.constants.urls.getLocations, this.appInfo.httpOptionsWithAuth).subscribe(
        (response: any) => {
          if (response.responseId && response.responseId === 211) {
            this.locations = [];
            this.idMapLocations = response.data.idMap;
            response.data.locations.forEach(location => {
              this.locations.push({
                locationId: location._id,
                index: location.index,
                city: location.city,
                country: location.country,
                meta: {
                  addedBy: location.meta.addedBy ? location.meta.addedBy : null,
                  addedOn: location.meta.addedOn ? location.meta.addedOn : null,
                  lastUpdatedBy: location.meta.lastUpdatedBy ? location.meta.lastUpdatedBy : null,
                  lastUpdatedOn: location.meta.lastUpdatedOn ? location.meta.lastUpdatedOn : null
                }
              });
            });
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
