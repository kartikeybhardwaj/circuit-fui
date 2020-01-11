import {
  Injectable
} from '@angular/core';

@Injectable()
export class AppStorageService {

  fetchConstantsURI = 'assets/files/constants.json';
  constants: any = '';

  user: any = '';

  httpOptions: any = {
    withCredentials: true
  };
  httpOptionsWithAuth: any = null;

  otherHeader: any = '';
  navigationAddText = '';
  isNavigationAddTextVisible = false;
  selectedProjectId: any = null;
  selectedMilestoneId: any = null;
  selectedPulseId: any = null;

  localStorage: any = null;

  constructor() {
    this.localStorage = window.localStorage;
  }

  getShortDate(date: number): string {
    const thisDate = new Date(date).toString();
    return thisDate.substr(0, 3) + ',' + thisDate.substr(3, 7);
  }

  getLongDate(date: number): string {
    const thisDate = new Date(date).toString();
    return thisDate.substr(0, 3) + ',' + thisDate.substr(3, 7) + ',' + thisDate.substr(10, 5);
  }

}
