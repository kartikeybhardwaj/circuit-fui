import {
  Injectable
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';

@Injectable()
export class ProjectStorageService {

  constructor(
    private appInfo: AppStorageService
  ) {}

  getProjects(): any {
    return new Promise((resolve, reject) => {
      this.appInfo.projects = [{
        index: 1,
        _id: '1234567890',
        title: 'this is some title',
        description: 'this is some description',
        visibility: 'public',
        visibilityIcon: 'public',
        members: [{
          _id: '1234567890',
          name: 'some user',
          roleId: '2',
          roleName: 'Project Manager'
        }, {
          _id: '1234567890',
          name: 'some user',
          roleId: '4',
          roleName: 'That one guy'
        }],
        milestonesList: [{
          _id: '1234567890',
          title: 'milestone title 1'
        }, {
          _id: '1234567890',
          title: 'milestone title 2'
        }],
        milestonesListCount: 4,
        projectMetaId: 'string',
        fields: [{
          key: 'key_1',
          key_1: 'value_1'
        }, {
          key: 'key_2',
          key_2: 'value_2'
        }, {
          key: 'key_3',
          key_3: 'value_3'
        }],
        meta: {
          addedBy: 'some user',
          addedOn: this.appInfo.getLongDate(new Date().getTime()),
          lastUpdatedBy: 'some user',
          lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
        }
      }, {
        index: 2,
        _id: '1234567890',
        title: 'this is some random title',
        description: 'this is some description',
        visibility: 'public',
        visibilityIcon: 'public',
        members: [{
          _id: '1234567890',
          name: 'some user',
          roleId: '2',
          roleName: 'Project Manager',

        }, {
          _id: '1234567890',
          name: 'some user',
          roleId: '4',
          roleName: 'That one guy',

        }],
        milestonesList: [{
          _id: '1234567890',
          title: 'milestone title 1'
        }, {
          _id: '1234567890',
          title: 'milestone title 2'
        }],
        milestonesListCount: 4,
        projectMetaId: 'string',
        fields: [{
          key: 'key_1',
          key_1: 'value_1'
        }, {
          key: 'key_2',
          key_2: 'value_2'
        }, {
          key: 'key_3',
          key_3: 'value_3'
        }],
        meta: {
          addedBy: 'some user',
          addedOn: this.appInfo.getLongDate(new Date().getTime()),
          lastUpdatedBy: 'some user',
          lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
        }
      }, {
        index: 3,
        _id: '1234567890',
        title: 'this is some random title',
        description: 'this is some description',
        visibility: 'private',
        visibilityIcon: this.appInfo.constants.buildingBlocks.icons.private,
        members: [{
          _id: '1234567890',
          name: 'some user',
          roleId: '2',
          roleName: 'Project Manager',
        }, {
          _id: '1234567890',
          name: 'some user',
          roleId: '4',
          roleName: 'That one guy',
        }],
        milestonesList: [{
          _id: '1234567890',
          title: 'milestone title 1'
        }, {
          _id: '1234567890',
          title: 'milestone title 2'
        }],
        milestonesListCount: 4,
        projectMetaId: 'string',
        fields: [{
          key: 'key_1',
          key_1: 'value_1'
        }, {
          key: 'key_2',
          key_2: 'value_2'
        }, {
          key: 'key_3',
          key_3: 'value_3'
        }],
        meta: {
          addedBy: 'some user',
          addedOn: this.appInfo.getLongDate(new Date().getTime()),
          lastUpdatedBy: 'some user',
          lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
        }
      }, {
        index: 4,
        _id: '1234567890',
        title: 'this is some random title',
        description: 'this is some description',
        visibility: 'internal',
        visibilityIcon: this.appInfo.constants.buildingBlocks.icons.internal,
        members: [{
          _id: '1234567890',
          name: 'some user',
          roleId: '2',
          roleName: 'Project Manager',
        }, {
          _id: '1234567890',
          name: 'some user',
          roleId: '4',
          roleName: 'That one guy',
        }],
        milestonesList: [{
          _id: '1234567890',
          title: 'milestone title 1'
        }, {
          _id: '1234567890',
          title: 'milestone title 2'
        }],
        milestonesListCount: 4,
        projectMetaId: 'string',
        fields: [{
          key: 'key_1',
          key_1: 'value_1'
        }, {
          key: 'key_2',
          key_2: 'value_2'
        }, {
          key: 'key_3',
          key_3: 'value_3'
        }],
        meta: {
          addedBy: 'some user',
          addedOn: this.appInfo.getLongDate(new Date().getTime()),
          lastUpdatedBy: 'some user',
          lastUpdatedOn: this.appInfo.getLongDate(new Date().getTime())
        }
      }];
      resolve(true);
    });
  }

}
