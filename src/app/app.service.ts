import {
  Injectable
} from '@angular/core';
import {
  HttpHeaders
} from '@angular/common/http';

@Injectable()
export class AppStorageService {

  fetchConstantsURI = 'assets/files/constants.json';
  constants: any = '';

  user: any = '';

  httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };
  httpOptionsWithAuth: any = null;

  projects: any = null;
  milestones: any = null;
  pulses: any = null;
  allLocations: any = null;
  myTravels: any = null;

  roles = [{
    _id: '1',
    title: 'Super User',
    description: 'Super User who can do anything.',
    isSuperUser: true,
    canModifyUsersRole: true,
    canModifyLocations: true,
    canModifyProjects: true,
    canModifyMilestones: true,
    canModifyPulses: true
  }, {
    _id: '2',
    title: 'Project Manager',
    description: 'Just some designation',
    isSuperUser: false,
    canModifyUsersRole: true,
    canModifyLocations: true,
    canModifyProjects: true,
    canModifyMilestones: true,
    canModifyPulses: true
  }, {
    _id: '3',
    title: 'Project Member',
    description: 'Just some designation',
    isSuperUser: false,
    canModifyUsersRole: false,
    canModifyLocations: true,
    canModifyProjects: false,
    canModifyMilestones: false,
    canModifyPulses: true
  }, {
    _id: '4',
    title: 'That one guy',
    description: 'Just some designation',
    isSuperUser: false,
    canModifyUsersRole: false,
    canModifyLocations: true,
    canModifyProjects: false,
    canModifyMilestones: false,
    canModifyPulses: false
  }];

  otherHeader: any = '';
  navigationAddText = '';
  isNavigationAddTextVisible = false;
  selectedProjectId: any = null;
  selectedMilestoneId: any = null;
  selectedPulseId: any = null;

  constructor() {}

  getShortDate(date: number): string {
    const thisDate = new Date(date).toString();
    return thisDate.substr(0, 3) + ',' + thisDate.substr(3, 7);
  }

  getLongDate(date: number): string {
    const thisDate = new Date(date).toString();
    return thisDate.substr(0, 3) + ',' + thisDate.substr(3, 7) + ',' + thisDate.substr(10, 5);
  }

}
