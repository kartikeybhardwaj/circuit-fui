import {
  Injectable
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';

export interface MyBlockagesList {
  index: number;
  reason: string;
  timeline: Timeline;
  isUpdating: boolean;
}

export interface Timeline {
  begin: string;
  end: string;
}

@Injectable()
export class BlockagesStorageService {

  constructor(
    private appInfo: AppStorageService
  ) {}

  getMyBlockages(): any {
    return new Promise((resolve, reject) => {
      const blockages: MyBlockagesList[] = [];
      for (let i = 0; i < this.appInfo.user.nonAvailability.length; i++) {
        blockages.push({
          index: i + 1,
          reason: this.appInfo.user.nonAvailability[i].reason,
          timeline: this.appInfo.user.otherLocations[i].timeline,
          isUpdating: false
        });
      }
      this.appInfo.myBlockages = blockages;
      resolve(this.appInfo.myTravels);
    });
  }

}
