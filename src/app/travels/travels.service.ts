import {
  Injectable
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';

export interface MyTravelsList {
  index: number;
  _id: string;
  name: string;
  timeline: Timeline;
  isUpdating: boolean;
}

export interface Timeline {
  begin: string;
  end: string;
}

@Injectable()
export class TravelsStorageService {

  constructor(
    private appInfo: AppStorageService
  ) {}

  getMyTravels(): any {
    return new Promise((resolve, reject) => {
      this.appInfo.myTravels = [];
      for (let i = 0; i < this.appInfo.user.otherLocations.length; i++) {
        let locationName = '';
        this.appInfo.allLocations.some((thisLocation) => {
          if (thisLocation._id === this.appInfo.user.otherLocations[i].locationId) {
            locationName = thisLocation.name;
            return true;
          }
        });
        this.appInfo.myTravels.push({
          index: i + 1,
          _id: this.appInfo.user.otherLocations[i].locationId,
          name: locationName,
          timeline: this.appInfo.user.otherLocations[i].timeline,
          isUpdating: false
        });
      }
      resolve(this.appInfo.myTravels);
    });
  }

  getAllLocations(): any {
    return new Promise((resolve, reject) => {
      this.appInfo.allLocations = [{
        index: 1,
        _id: '1',
        name: 'Mysuru, India',
        meta: {
          addedBy: 'some user',
          addedOn: this.appInfo.getLongDate(new Date().getTime()),
          lastUpdatedBy: 'some user',
          lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
        }
      }, {
        index: 2,
        _id: '2',
        name: 'Bengaluru, India',
        meta: {
          addedBy: 'some user',
          addedOn: this.appInfo.getLongDate(new Date().getTime()),
          lastUpdatedBy: 'some user',
          lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
        }
      }, {
        index: 3,
        _id: '3',
        name: 'Hyderabad, India',
        meta: {
          addedBy: 'some user',
          addedOn: this.appInfo.getLongDate(new Date().getTime()),
          lastUpdatedBy: 'some user',
          lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
        }
      }, {
        index: 4,
        _id: '4',
        name: 'Maryland, USA',
        meta: {
          addedBy: 'some user',
          addedOn: this.appInfo.getLongDate(new Date().getTime()),
          lastUpdatedBy: 'some user',
          lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
        }
      }, {
        index: 5,
        _id: '5',
        name: 'Washington DC, USA',
        meta: {
          addedBy: 'some user',
          addedOn: this.appInfo.getLongDate(new Date().getTime()),
          lastUpdatedBy: 'some user',
          lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
        }
      }];
      resolve(this.appInfo.allLocations);
    });
  }

}
